import type { CSSProperties } from "react";
import type { MotionVisual } from "../game/types";

interface MotionSceneProps {
  visual: MotionVisual;
}

export function MotionScene({ visual }: MotionSceneProps) {
  return (
    <figure className={`motion-scene motion-${visual.kind}`} aria-label={visual.title}>
      <div className="motion-header">
        <span className="motion-kicker">Hoạt họa khái niệm</span>
        <strong>{visual.title}</strong>
      </div>

      <div className="motion-stage" aria-hidden="true">
        {visual.kind === "crossroads" && <CrossroadsScene />}
        {visual.kind === "invoice" && <InvoiceScene />}
        {visual.kind === "attention" && <AttentionScene />}
        {visual.kind === "debt" && <DebtScene />}
        {visual.kind === "ai-studio" && <AiStudioScene />}
        {visual.kind === "ai-map" && <AiMapScene />}
        {visual.kind === "reveal" && <RevealScene />}
      </div>

      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}

function CrossroadsScene() {
  return (
    <>
      <div className="city-line">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="road-split">
        <div className="road left-road">CONTENT</div>
        <div className="road right-road">GIAO HÀNG</div>
      </div>
      <div className="worker-token">SỨC LAO ĐỘNG</div>
    </>
  );
}

function InvoiceScene() {
  const rows = ["Tiền công", "Phí nền tảng", "Quảng cáo", "Lợi nhuận"];
  return (
    <div className="invoice-card">
      {rows.map((row, index) => (
        <div className="invoice-row" key={row} style={{ "--i": index } as CSSProperties}>
          <span>{row}</span>
          <b>{index === 0 ? "18%" : index === 1 ? "22%" : index === 2 ? "25%" : "35%"}</b>
        </div>
      ))}
    </div>
  );
}

function AttentionScene() {
  return (
    <div className="feed-grid">
      {["Vị trí vàng", "Ad bid", "Creator", "Brand", "Dữ liệu", "Địa tô"].map((item, index) => (
        <span key={item} className={index === 0 || index === 5 ? "hot" : ""}>
          {item}
        </span>
      ))}
    </div>
  );
}

function DebtScene() {
  return (
    <div className="debt-loop">
      <span>Xe</span>
      <span>Điện thoại</span>
      <span>Lãi suất</span>
      <span>Ca sau</span>
      <div className="debt-arrow" />
    </div>
  );
}

function AiStudioScene() {
  return (
    <div className="ai-pipeline">
      {["Script", "Avatar", "Cắt dựng", "A/B test"].map((item) => (
        <span key={item}>{item}</span>
      ))}
      <div className="ai-core">AI</div>
    </div>
  );
}

function AiMapScene() {
  return (
    <div className="map-grid">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} className={(index % 7 === 0 || index % 11 === 0) ? "hot" : index % 5 === 0 ? "warm" : ""} />
      ))}
      <div className="route-dot start" />
      <div className="route-dot end" />
      <div className="route-line" />
    </div>
  );
}

function RevealScene() {
  return (
    <div className="reveal-cards">
      {["Lợi nhuận", "Thương nghiệp", "Lãi suất", "Địa tô"].map((card, index) => (
        <span key={card} style={{ "--i": index } as CSSProperties}>
          {card}
        </span>
      ))}
    </div>
  );
}
