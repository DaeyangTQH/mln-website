import "../sections/css/style-nav.css";

export default function ChapterNav() {
  return (
    <nav className="chapter-nav" id="chapterNav" aria-label="Mục lục">
      <a href="#s-cover" className="active">Độc quyền</a>
      <a href="#s-state">Độc quyền nhà nước</a>
      <a href="#s-vietnam">Liên hệ Việt Nam</a>
      <a href="#s-debate">Điện &amp; nước</a>
      <a href="#s-final">Kết luận</a>
      <div className="scroll-progress nav-progress" aria-hidden="true"><span id="progressBar"></span></div>
    </nav>
  );
}
