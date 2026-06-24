import { useMemo } from "react";
import { storyData } from "../data/story";

interface HomeScreenProps {
  onStart: () => void;
}

const STATS_PREVIEW = [
  { key: "money",   label: "Tiền",    desc: "Tài sản và dòng tiền sống còn",        color: "var(--c-stat-money)" },
  { key: "burnout", label: "Burnout", desc: "Mức kiệt sức khi bán sức lao động",    color: "var(--c-stat-burnout-high)" },
  { key: "flexing", label: "Flexing", desc: "Vốn xã hội ảo trên nền tảng",          color: "var(--c-stat-flexing)" },
  { key: "skill",   label: "Kỹ năng", desc: "Giá trị sức lao động được nâng cấp",   color: "var(--c-stat-skill)" }
];

export function HomeScreen({ onStart }: HomeScreenProps) {
  // Derive counts from story data so UI keeps in sync if Dev 1 extends it.
  const { stepCount, endingCount, estMinutes } = useMemo(() => {
    const narrativeNodes = storyData.nodes.filter((n) => !n.id.startsWith("ending-"));
    const stepNums = narrativeNodes.map((n) => n.step);
    const steps = stepNums.length ? Math.max(...stepNums) : 0;
    const endings = storyData.endings.length;
    // Rough estimate: ~1.2 min per step (read + decide). Adjust if needed.
    const minutes = Math.max(2, Math.round(steps * 1.2));
    return { stepCount: steps, endingCount: endings, estMinutes: minutes };
  }, []);

  return (
    <div className="home-stage">
      <div className="home-rays" aria-hidden="true" />

      <div className="home-card">
        <div className="home-eyebrow">
          <span className="line" />
          <span>Kinh Tế Chính Trị Mác - Lênin · Đề Tài Tương Tác</span>
          <span className="line" />
        </div>

        <div className="home-seal" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <radialGradient id="homeGold" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffe082" />
                <stop offset="60%" stopColor="#f4c430" />
                <stop offset="100%" stopColor="#b8860b" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="none" stroke="url(#homeGold)" strokeWidth="3" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="url(#homeGold)" strokeWidth="1" opacity="0.7" />
            <polygon
              points="100,24 119,82 180,82 131,118 150,178 100,142 50,178 69,118 20,82 81,82"
              fill="url(#homeGold)"
              stroke="#b8860b"
              strokeWidth="1"
            />
          </svg>
        </div>

        <h1 className="home-title">VÁN BÀI LẬT NGỬA</h1>
        <p className="home-subtitle">Gig-FOMO &amp; Cái Bẫy Thuật Toán</p>

        <p className="home-lead">
          Bạn vừa tốt nghiệp. Trong túi còn {storyData.initialStats.money} triệu. Mạng xã hội đang gào lên rằng
          ai cũng giàu, ai cũng tự do, ai cũng đang vượt mặt bạn.
          <br />
          Hãy thử chơi {stepCount} lượt bài — rồi xem ai mới thực sự đang nắm chuôi dao.
        </p>

        <div className="home-stats-preview" aria-label="Bốn chỉ số bạn sẽ theo dõi">
          {STATS_PREVIEW.map((s) => (
            <div className="home-stat" key={s.key}>
              <span className="dot" style={{ background: s.color }} />
              <div>
                <strong>{s.label}</strong>
                <span>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="home-cta" onClick={onStart}>
          <span className="cta-icon">★</span>
          <span className="cta-text">Lật Lá Bài Đầu Tiên</span>
          <span className="cta-arrow">→</span>
        </button>

        <div className="home-meta">
          <span>{stepCount} lựa chọn</span>
          <span aria-hidden="true">·</span>
          <span>{endingCount} kết cục</span>
          <span aria-hidden="true">·</span>
          <span>~ {estMinutes} phút / ván</span>
        </div>

        <div className="home-quote">
          <em>
            "Lịch sử của mọi xã hội từ trước đến nay là lịch sử đấu tranh giai cấp."
          </em>
          <small>— Tuyên ngôn của Đảng Cộng sản, 1848</small>
        </div>
      </div>
    </div>
  );
}
