import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import introVideo from "../../assets/video/dien-nuoc-video.mp4";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeVideo();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section className="hero" id="s-hero">
        <div className="hero-flow" aria-hidden="true"></div>
        <div className="badges">
          <span className="badge badge-navy">Kinh tế chính trị Mác-Lênin</span>
          <span className="badge badge-gold">Chuyên đề độc quyền</span>
        </div>
        <h1 className="hero-title">
          <span className="row"><b>Nếu điện</b><i>&amp;</i></span>
          <span className="row"><b>nước</b><i className="hero-highlight">được giao</i></span>
          <span className="row"><i>hoàn toàn cho</i><b className="w">thị trường?</b></span>
        </h1>

        <button
          className="hero-video-trigger"
          type="button"
          onClick={() => setIsVideoOpen(true)}
          aria-haspopup="dialog"
        >
          <span className="hero-video-trigger__icon" aria-hidden="true">▶</span>
          <span>
            <strong>Xem video mở đầu</strong>
            <small>Điện, nước và bài toán thị trường</small>
          </span>
        </button>
      </section>

      {isVideoOpen && createPortal(
        <div className="hero-video-modal" role="presentation" onMouseDown={closeVideo}>
          <div
            className="hero-video-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Video mở đầu"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="hero-video-modal__close"
              type="button"
              onClick={closeVideo}
              aria-label="Đóng video"
            >
              ×
            </button>
            <video ref={videoRef} controls autoPlay playsInline preload="metadata">
              <source src={introVideo} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
