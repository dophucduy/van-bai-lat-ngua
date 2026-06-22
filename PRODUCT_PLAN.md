# Product Plan: Ván Bài Lật Ngửa

## 1. Đánh Giá Tên Sản Phẩm

**"Ván Bài Lật Ngửa" hợp lý và có liên quan.**

Lý do:

- "Ván bài" gợi đúng tính chất game: người chơi chọn bài, chọn đường, tưởng mình đang nắm quyền kiểm soát.
- "Lật ngửa" hợp với twist cuối: những lựa chọn tưởng có lợi dần dần lộ ra cơ chế thật sự của nền tảng, thuật toán và tư bản.
- Tên có liên hệ với phim chính trị Việt Nam "Ván bài lật ngửa", nên tạo được sắc thái chính trị, chiến lược, đấu trí.
- Với môn Kinh tế chính trị Mác - Lênin, tên này còn gợi ý việc vạch trần bản chất phía sau hiện tượng: FOMO, flexing, tự do ảo, gig economy.

Lưu ý: không nên dùng hình ảnh, logo, nhân vật, câu thoại hay nhạc phim để tránh dính bản quyền. Chỉ nên mượn tinh thần "lật mặt vấn đề chính trị - xã hội". Có thể đặt subtitle để rõ nghĩa hơn:

**Ván Bài Lật Ngửa: Gig-FOMO và Cái Bẫy Thuật Toán**

## 2. Định Vị Sản Phẩm

Sản phẩm nên là một **interactive narrative game** thay vì chỉ là slide thuyết trình. Mục tiêu là để người chơi tự trải nghiệm cảm giác "lựa chọn nào cũng có giá", rồi mới được host giải thích bằng lý thuyết Mác - Lênin.

Core loop:

1. Đọc tình huống.
2. Chọn 1 trong 2-3 quyết định.
3. Chỉ số thay đổi: tiền, burnout, flexing, kỹ năng.
4. Hệ thống đưa ra hậu quả ngắn hạn.
5. Cuối game "lật bài" bằng kết cục và giải thích học thuật.

## 3. MVP Nên Làm

MVP cần đủ:

- Màn hình game chính chia 2 cột.
- 6 bước cốt truyện.
- Cây lựa chọn có nhánh A/B, A1/A2, B1/B2, X/Y.
- 4 chỉ số:
  - Tiền
  - Burnout
  - Flexing
  - Kỹ năng
- 3 kết cục.
- Màn hình kết cục có "Lời Host" giải thích bằng khái niệm kinh tế chính trị.
- Nút chơi lại.
- Có thể chạy local và trình chiếu trên projector.

Không nên làm quá sớm:

- Đăng nhập tài khoản
- Database
- Multiplayer
- Backend riêng
- Hệ thống achievement phức tạp

## 4. Tech Stack Đề Xuất

- React + Vite + TypeScript
- CSS thường hoặc Tailwind nếu nhóm quen
- State game lưu trong frontend
- Data cốt truyện đặt trong file `src/data/story.ts`
- Deploy bằng GitHub Pages hoặc Vercel

Lý do: nhẹ, nhanh, hợp demo lớp, ít rủi ro.

## 5. Kiến Trúc Thư Mục

```text
van-bai-lat-ngua/
  README.md
  PRODUCT_PLAN.md
  package.json
  index.html
  src/
    main.tsx
    App.tsx
    data/
      story.ts
    components/
      StoryPanel.tsx
      ChoiceButton.tsx
      StatsPanel.tsx
      EndingScreen.tsx
    styles/
      theme.css
```

## 6. Phân Việc Cho 2 Dev

### Dev 1: Game Logic + Nội Dung

Trách nhiệm:

- Chuyển nội dung từ `MLN2.md` thành data có cấu trúc.
- Định nghĩa model:
  - `StoryNode`
  - `Choice`
  - `Stats`
  - `Ending`
- Xử lý logic điều hướng nhánh.
- Xử lý cộng/trừ chỉ số.
- Viết điều kiện kết cục:
  - Có chọn A1 hoặc B1 -> kết cục 1
  - Chọn Y và không bị khóa -> kết cục 2
  - Chọn X -> kết cục 3
- Viết nội dung "Lời Host" gọn, đúng khái niệm môn học.

Deliverable:

- `src/data/story.ts`
- Game flow chạy đúng từ đầu đến cuối
- Nút restart
- Test tay tất cả nhánh kết cục

### Dev 2: UI/UX + Trình Chiếu

Trách nhiệm:

- Thiết kế giao diện 2 cột.
- Làm typewriter effect cho cột truyện.
- Làm progress/stat bars có màu:
  - Tiền: xanh/neutral
  - Burnout: vàng -> đỏ
  - Flexing: tím/hồng
  - Kỹ năng: xanh lam
- Làm animation khi chỉ số thay đổi.
- Làm màn hình kết cục có cảm giác "lật bài".
- Đảm bảo responsive cho laptop/projector.
- Chuẩn bị deploy GitHub Pages/Vercel.

Deliverable:

- `StoryPanel`
- `StatsPanel`
- `ChoiceButton`
- `EndingScreen`
- CSS/theme
- Bản demo trình chiếu ổn định

## 7. Timeline Đề Xuất

### Ngày 1

- Tạo repo.
- Khởi tạo Vite React TypeScript.
- Chốt data model và UI wireframe.
- Dev 1 nhập nội dung 6 bước.
- Dev 2 dựng layout chính.

### Ngày 2

- Dev 1 hoàn thành game flow và kết cục.
- Dev 2 hoàn thành stat bars, animation, typewriter.
- Hợp nhất và test tất cả nhánh.

### Ngày 3

- Làm polish: âm thanh click nhẹ, hiệu ứng lật bài, màu sắc.
- Rút gọn lời host cho dễ thuyết trình.
- Deploy.
- Chuẩn bị script thuyết trình 3-5 phút.

## 8. GitHub Repo

Repo đề xuất:

```text
van-bai-lat-ngua
```

Lệnh tạo repo nếu dùng GitHub CLI:

```powershell
gh repo create van-bai-lat-ngua --public --description "Interactive Marxist political economy game about Gen Z, gig work, FOMO, AI, and surplus value." --source . --remote origin --push
```

Nếu muốn private:

```powershell
gh repo create van-bai-lat-ngua --private --description "Interactive Marxist political economy game about Gen Z, gig work, FOMO, AI, and surplus value." --source . --remote origin --push
```

Cần chốt trước khi tạo thật:

- GitHub account/organization nào?
- Public hay private?
- Có muốn repo tên tiếng Việt có dấu không? Khuyến nghị không, dùng `van-bai-lat-ngua` để URL sạch.

## 9. Rủi Ro Nội Dung

- Nội dung đang dùng ngôn ngữ Gen Z và hơi "gắt", cần cân bằng để không bị thầy/cô đánh giá là quá meme.
- Nên thêm 1-2 màn hình giải thích học thuật ngắn sau mỗi kết cục.
- Nên tránh khẳng định "AI là con đường duy nhất" theo nghĩa cực đoan. Nên diễn đạt là "nâng cấp tri thức và kỹ năng" mới là điểm chính.
- Nên tránh dùng thương hiệu TikTok/Grab quá trực diện nếu lo rủi ro; có thể đổi thành "nền tảng video ngắn" và "app giao hàng".

## 10. Hướng Thuyết Trình

Mở bài:

> Nhóm em không muốn biến Kinh tế chính trị thành một bài học thuật ngữ khó nhớ. Vì vậy, chúng em làm một game để người chơi tự trải nghiệm cảm giác bị thị trường, FOMO và thuật toán chi phối.

Chốt bài:

> Khi ván bài được lật ngửa, người chơi nhận ra vấn đề không chỉ là chăm hay lười, mà là cách sức lao động bị định giá, khai thác và thay thế trong nền kinh tế nền tảng hiện đại.

