import { useEffect, useRef, useState } from "react";
import type { Stats, StatKey, Choice } from "../game/types";

interface StatsPanelProps {
  stats: Stats;
  totalSteps: number;
  currentStep: number;
  lastChoice: Choice | null;
}

const STAT_META: Record<StatKey, { label: string; suffix: string; max: number }> = {
  money:   { label: "Tiền",      suffix: "M",  max: 30  },
  burnout: { label: "Burnout",   suffix: "%",  max: 100 },
  flexing: { label: "Flexing",   suffix: "%",  max: 100 },
  skill:   { label: "Kỹ năng",   suffix: "%",  max: 100 }
};

const STAT_ORDER: StatKey[] = ["money", "burnout", "flexing", "skill"];

interface DeltaToken { id: number; key: StatKey; value: number; }

export function StatsPanel({ stats, totalSteps, currentStep, lastChoice }: StatsPanelProps) {
  const prevStatsRef = useRef<Stats>(stats);
  const [pulseKeys, setPulseKeys] = useState<Set<StatKey>>(new Set());
  const [deltas, setDeltas] = useState<DeltaToken[]>([]);
  const tokenIdRef = useRef(0);

  // When stats change, pulse the value and float a delta marker.
  useEffect(() => {
    const prev = prevStatsRef.current;
    const changed = new Set<StatKey>();
    const newDeltas: DeltaToken[] = [];

    for (const k of STAT_ORDER) {
      const diff = stats[k] - prev[k];
      if (diff !== 0) {
        changed.add(k);
        tokenIdRef.current += 1;
        newDeltas.push({ id: tokenIdRef.current, key: k, value: diff });
      }
    }

    if (changed.size > 0) {
      setPulseKeys(changed);
      setDeltas((curr) => [...curr, ...newDeltas]);

      const pulseTimer = window.setTimeout(() => setPulseKeys(new Set()), 800);
      const deltaTimer = window.setTimeout(() => {
        setDeltas((curr) => curr.filter((d) => !newDeltas.some((nd) => nd.id === d.id)));
      }, 1700);

      prevStatsRef.current = stats;
      return () => {
        window.clearTimeout(pulseTimer);
        window.clearTimeout(deltaTimer);
      };
    }
    prevStatsRef.current = stats;
  }, [stats]);

  return (
    <aside className="stats-panel" aria-label="Bảng chỉ số">
      <header className="stats-header">
        <svg className="star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.6L6 22l1.5-7.3L2 10l7.1-1.1L12 2z" />
        </svg>
        <span className="label">Hồ sơ Lao động</span>
      </header>

      <div className="stat-list">
        {STAT_ORDER.map((k) => {
          const meta = STAT_META[k];
          const raw = stats[k];
          const widthPct = Math.min(100, Math.max(0, (raw / meta.max) * 100));
          const isPulsing = pulseKeys.has(k);
          const ownDeltas = deltas.filter((d) => d.key === k);
          return (
            <div className="stat" data-key={k} key={k}>
              <span className="name">{meta.label}</span>
              <span className={"value" + (isPulsing ? " pulse" : "")}>
                {k === "money" ? raw : raw}
                <small style={{ marginLeft: 2, opacity: 0.7 }}>{meta.suffix}</small>
                {ownDeltas.map((d) => (
                  <span
                    key={d.id}
                    className={"delta " + (d.value > 0 ? "up" : "down")}
                  >
                    {d.value > 0 ? "+" : ""}{d.value}
                  </span>
                ))}
              </span>
              <div className={"bar" + (isPulsing ? " changing" : "")}>
                <div
                  className="fill"
                  style={{ width: widthPct + "%" }}
                  role="progressbar"
                  aria-valuenow={Math.round(widthPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={meta.label}
                />
              </div>
            </div>
          );
        })}
      </div>

      {lastChoice && (
        <div className="effect-card">
          <span className="lead">Hậu quả lựa chọn vừa rồi</span>
          {lastChoice.effectText}
        </div>
      )}

      <div className="progress-dots" aria-label={`Tiến trình: bước ${currentStep} trên ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          let cls = "dot";
          if (stepNum < currentStep) cls += " done";
          if (stepNum === currentStep) cls += " current";
          return <span className={cls} key={i} />;
        })}
      </div>

      <footer className="stats-footer">
        Tự do là sự nhận thức được tất yếu — F. Engels
      </footer>
    </aside>
  );
}
