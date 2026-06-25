import { type CSSProperties, useMemo, useState } from "react";
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
  const [showArchive, setShowArchive] = useState(false);

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

        <ArchiveReel onOpen={() => setShowArchive(true)} />

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

      {showArchive && <ArchiveModal onClose={() => setShowArchive(false)} />}
    </div>
  );
}

function ArchiveReel({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="archive-reel" aria-label="Tư liệu mở màn: từ bao cấp đến nền tảng số">
      <button type="button" className="archive-open" onClick={onOpen}>
        Xem tư liệu 60s
      </button>

      <div className="reel-screen">
        <div className="film-strip" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="archive-frame">
          <div className="archive-year">1976-1986</div>
          <div className="archive-scene bao-cap">
            <span className="coupon">TEM PHIẾU</span>
            <span className="counter">MẬU DỊCH</span>
            <span className="queue q1" />
            <span className="queue q2" />
            <span className="queue q3" />
          </div>
          <p>Bao cấp: hàng hóa được phân phối bằng tem phiếu, thị trường bị kiểm soát chặt.</p>
        </div>

        <div className="archive-frame">
          <div className="archive-year">1986</div>
          <div className="archive-scene doi-moi">
            <span className="gate left" />
            <span className="gate right" />
            <span className="market-sign">ĐỔI MỚI</span>
            <span className="rice-sack">GẠO</span>
            <span className="shop">CHỢ</span>
          </div>
          <p>Đổi Mới: thị trường, giá cả, tư nhân và lưu thông hàng hóa dần được mở rộng.</p>
        </div>

        <div className="archive-frame">
          <div className="archive-year">HIỆN NAY</div>
          <div className="archive-scene platform">
            <span className="phone">APP</span>
            <span className="coin c1" />
            <span className="coin c2" />
            <span className="coin c3" />
            <span className="flow-line" />
          </div>
          <p>Trong kinh tế nền tảng, giá trị thặng dư đổi mặt nạ: lợi nhuận, lãi suất, địa tô và phí trung gian.</p>
        </div>
      </div>
    </section>
  );
}

function ArchiveModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="archive-modal" role="dialog" aria-modal="true" aria-label="Tư liệu 60 giây">
      <div className="archive-modal-card">
        <header className="archive-modal-header">
          <div>
            <span>Tư liệu 60s</span>
            <h2>Từ bao cấp đến kinh tế nền tảng</h2>
          </div>
          <button type="button" className="archive-close" onClick={onClose} aria-label="Đóng tư liệu">
            ×
          </button>
        </header>

        <div className="archive-long-reel">
          {[
            {
              year: "1976-1986",
              title: "Cơ chế bao cấp",
              text: "Hàng hóa khan hiếm, phân phối bằng tem phiếu, giá cả không vận động như thị trường.",
              tag: "Phân phối"
            },
            {
              year: "1986",
              title: "Đổi Mới",
              text: "Việt Nam mở rộng lưu thông hàng hóa, thừa nhận nhiều thành phần kinh tế và vai trò của thị trường.",
              tag: "Thị trường"
            },
            {
              year: "1990s",
              title: "Sản xuất và thương nghiệp",
              text: "Hàng hóa lưu thông mạnh hơn. Giá trị thặng dư bắt đầu hiện ra rõ qua lợi nhuận và lợi nhuận thương nghiệp.",
              tag: "Lợi nhuận"
            },
            {
              year: "2000s",
              title: "Tín dụng và tiêu dùng",
              text: "Vay, trả góp, lãi suất và chi phí tái sản xuất sức lao động trở thành một phần đời sống kinh tế.",
              tag: "Lãi suất"
            },
            {
              year: "2010s",
              title: "Mặt bằng số",
              text: "Vị trí trên sàn, feed, quảng cáo và dữ liệu người dùng tạo ra một dạng địa tô mới.",
              tag: "Địa tô"
            },
            {
              year: "Hiện nay",
              title: "Nền tảng và thuật toán",
              text: "App điều phối lao động, chia phí, đặt thưởng, gom đơn và biến giá trị thặng dư thành nhiều mặt nạ khó nhận ra.",
              tag: "Thuật toán"
            }
          ].map((item, index) => (
            <article className="archive-chapter" key={item.year} style={{ "--i": index } as CSSProperties}>
              <span className="chapter-year">{item.year}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <em>{item.tag}</em>
            </article>
          ))}
        </div>

        <footer className="archive-modal-footer">
          <span>Ý chính: thị trường không làm giá trị thặng dư biến mất, mà làm nó xuất hiện dưới nhiều hình thức.</span>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Vào game
          </button>
        </footer>
      </div>
    </div>
  );
}
