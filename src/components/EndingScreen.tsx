import { useEffect, useState } from "react";
import type { Ending } from "../game/types";

interface EndingScreenProps {
  ending: Ending;
  onRestart: () => void;
}

const FINAL_STAT_LABELS: { key: keyof Ending["finalStats"]; label: string; suffix: string }[] = [
  { key: "money",   label: "Tiền",    suffix: "M" },
  { key: "burnout", label: "Burnout", suffix: "%" },
  { key: "flexing", label: "Flexing", suffix: "%" },
  { key: "skill",   label: "Kỹ năng", suffix: "%" }
];

export function EndingScreen({ ending, onRestart }: EndingScreenProps) {
  const [flipped, setFlipped] = useState(false);

  // Auto-flip after a beat — feels like the cards reveal themselves.
  useEffect(() => {
    const t = window.setTimeout(() => setFlipped(true), 900);
    return () => window.clearTimeout(t);
  }, [ending.id]);

  return (
    <div className="ending-stage">
      <div
        className={"ending-card" + (flipped ? " flipped" : "")}
        onClick={() => !flipped && setFlipped(true)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? `Kết cục: ${ending.title}` : "Nhấn để lật bài"}
        onKeyDown={(e) => {
          if (!flipped && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setFlipped(true);
          }
        }}
      >
        {/* Back of card — propaganda poster */}
        <div className="ending-face ending-back" aria-hidden={flipped}>
          <div style={{ display: "grid", placeItems: "center", padding: 24, position: "relative", zIndex: 1 }}>
            <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <radialGradient id="gold" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffe082" />
                  <stop offset="60%" stopColor="#f4c430" />
                  <stop offset="100%" stopColor="#b8860b" />
                </radialGradient>
              </defs>
              {/* Outer ring */}
              <circle cx="100" cy="100" r="92" fill="none" stroke="url(#gold)" strokeWidth="3" />
              <circle cx="100" cy="100" r="82" fill="none" stroke="url(#gold)" strokeWidth="1" opacity="0.7" />
              {/* Inner big star */}
              <polygon
                points="100,24 119,82 180,82 131,118 150,178 100,142 50,178 69,118 20,82 81,82"
                fill="url(#gold)"
                stroke="#b8860b"
                strokeWidth="1"
              />
              {/* Small radiating stars */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const cx = 100 + Math.cos(angle) * 70;
                const cy = 100 + Math.sin(angle) * 70;
                return (
                  <circle key={i} cx={cx} cy={cy} r="2.5" fill="url(#gold)" opacity="0.7" />
                );
              })}
            </svg>
            <div className="back-title">VÁN BÀI LẬT NGỬA</div>
            <div className="back-sub">Nhấn để lật bài</div>
          </div>
        </div>

        {/* Front of card — revealed ending */}
        <div className="ending-face ending-front" aria-hidden={!flipped}>
          <span className="ribbon">Kết cục — Lời Host</span>
          <h1>{ending.title}</h1>
          <p className="summary">{ending.summary}</p>

          <div className="final-stats">
            {FINAL_STAT_LABELS.map(({ key, label, suffix }) => (
              <div className="final-stat" key={key}>
                <span className="fs-name">{label}</span>
                <span className="fs-val">
                  {ending.finalStats[key]}<small style={{ fontSize: "0.6em", marginLeft: 1, opacity: 0.7 }}>{suffix}</small>
                </span>
              </div>
            ))}
          </div>

          <div className="host-block">
            <div className="host-lead">★ Lời Host — Phân tích học thuật</div>
            <p>{ending.hostCommentary}</p>
          </div>

          <div className="concept-tags" aria-label="Khái niệm liên quan">
            {ending.conceptTags.map((tag) => (
              <span className="tag" key={tag}>#{tag}</span>
            ))}
          </div>

          <div className="ending-actions">
            <button type="button" className="btn btn-primary" onClick={onRestart}>
              ♻ Chơi lại ván mới
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setFlipped(false)}
            >
              ↺ Úp lại bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
