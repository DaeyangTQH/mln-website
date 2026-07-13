import { useEffect, useState } from "react";
import { Hotspot } from "../components/Hotspot.jsx";

import mindmapImage from "../../assets/mindmap.png";

export default function Chapter5Final() {
  const [mindmapOpen, setMindmapOpen] = useState(false);

  useEffect(() => {
    if (!mindmapOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMindmapOpen(false);
    };
    document.body.classList.add("mindmap-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("mindmap-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mindmapOpen]);

  return (
    <section className="final" id="s-final">
      <section className="mindmap-summary" aria-labelledby="mindmap-title">
        <header className="mindmap-summary__head reveal">
          <span className="kicker">Tổng kết chuyên đề</span>
          <h2 id="mindmap-title">Toàn bộ nội dung<br />trong một sơ đồ</h2>
          <p>Từ khái niệm và nguyên nhân hình thành độc quyền đến độc quyền nhà nước và vấn đề tư nhân hóa điện, nước tại Việt Nam.</p>
        </header>

        <button className="mindmap-summary__figure reveal" type="button" onClick={() => setMindmapOpen(true)} aria-label="Mở sơ đồ tư duy toàn màn hình">
          <img src={mindmapImage} alt="Sơ đồ tư duy tổng hợp chuyên đề độc quyền, độc quyền nhà nước và tư nhân hóa điện nước tại Việt Nam" />
          <span>Xem toàn màn hình</span>
        </button>
        <p className="mindmap-summary__hint reveal">Nhấn vào sơ đồ để xem chi tiết.</p>
      </section>

      {mindmapOpen && (
        <div className="mindmap-lightbox" role="dialog" aria-modal="true" aria-label="Sơ đồ tư duy tổng kết" onClick={() => setMindmapOpen(false)}>
          <button type="button" className="mindmap-lightbox__close" onClick={() => setMindmapOpen(false)} aria-label="Đóng sơ đồ">×</button>
          <div className="mindmap-lightbox__viewport" onClick={(event) => event.stopPropagation()}>
            <img src={mindmapImage} alt="Sơ đồ tư duy tổng hợp chuyên đề" />
          </div>
        </div>
      )}

      <button className="to-top" id="toTop" aria-label="Về đầu trang">↑</button>
    </section>
  );
}
