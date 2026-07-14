import "../sections/css/style-nav.css";

export default function ChapterNav() {
  const jumpToChapter = (event) => {
    const target = document.querySelector(event.target.value);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="chapter-nav" id="chapterNav" aria-label="Mục lục">
      <a href="#s-cover" className="active">Độc quyền</a>
      <a href="#s-stages">Nguyên nhân</a>
      <a href="#s-state">Độc quyền nhà nước</a>
      <a href="#s-vietnam">Liên hệ VN &amp; Điện nước</a>
      <a href="#s-final">Kết luận</a>
      <label className="chapter-nav-mobile">
        <span>Đang xem</span>
        <select defaultValue="#s-cover" onChange={jumpToChapter} aria-label="Chọn chương">
          <option value="#s-cover">Chương 1 · Độc quyền</option>
          <option value="#s-stages">Chương 2 · Nguyên nhân</option>
          <option value="#s-state">Chương 3 · Độc quyền nhà nước</option>
          <option value="#s-vietnam">Chương 4 · Liên hệ Việt Nam và Điện &amp; nước</option>
          <option value="#s-final">Chương 5 · Kết luận</option>
        </select>
      </label>
      <div className="scroll-progress nav-progress" aria-hidden="true"><span id="progressBar"></span></div>
    </nav>
  );
}
