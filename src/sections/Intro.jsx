import "./css/style-intro.css";

export default function Intro() {
  return (
    <section className="intro" id="s-intro">
      <div className="intro-grid">
        <div className="intro-main">
          <p className="intro-lead">Một thị trường có thể rất hiệu quả khi người mua dễ lựa chọn. Nhưng với điện và nước, lựa chọn không chỉ là giá rẻ hơn: đó là an ninh hệ thống, chất lượng sống và quyền tiếp cận dịch vụ thiết yếu.</p>
          <p className="intro-body">Trang này phân tích quá trình hình thành và vận động của độc quyền, từ cạnh tranh tự do đến độc quyền nhà nước và vai trò điều tiết đối với ngành điện, nước tại Việt Nam.</p>
        </div>
        <div className="intro-line"></div>
        <aside className="intro-meta">
          <div className="meta-item"><span>Chuyên đề</span><strong>MLN121</strong></div>
          <div className="meta-item"><span>Nội dung</span><strong>Giáo trình KTCT Mác-Lênin, Ch.2,4,5</strong></div>
          <div className="meta-item"><span>Chính sách</span><strong>Luật Điện lực 61/2024/QH15 · VBHN 51/VBHN-BXD</strong></div>
        </aside>
      </div>
    </section>
  );
}
