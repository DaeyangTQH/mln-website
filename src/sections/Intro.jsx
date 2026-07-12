import "./css/style-intro.css";

export default function Intro() {
  return (
    <section className="intro" id="s-intro">
      <div className="intro-grid">
        <div className="intro-main">
          <p className="intro-lead">Một thị trường có thể rất hiệu quả khi người mua dễ lựa chọn. Nhưng với điện và nước, lựa chọn không chỉ là giá rẻ hơn: đó là an ninh hệ thống, chất lượng sống và quyền tiếp cận dịch vụ thiết yếu.</p>
          <p className="intro-body">Trang này lần theo mạch từ độc quyền, nguyên nhân hình thành độc quyền, độc quyền nhà nước, đến trường hợp ngành điện và ngành nước ở Việt Nam. Trọng tâm không phải phủ nhận thị trường, mà là xác định khâu nào có thể cạnh tranh và khâu nào cần Nhà nước điều tiết vì lợi ích công cộng.</p>
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
