const reasons = [
  {
    title: "Độc quyền tự nhiên",
    lead: "Chi phí đầu tư hạ tầng rất lớn.",
    body: "Việc nhiều doanh nghiệp cùng xây các hệ thống hạ tầng song song vừa lãng phí vừa kém hiệu quả.",
    facts: [
      "Không thể mỗi công ty điện xây một hệ thống đường dây truyền tải riêng.",
      "Không thể mỗi công ty nước xây một mạng lưới ống nước riêng.",
    ],
    image: "assets/electric-pylon.jpg",
    alt: "Hệ thống đường dây truyền tải điện cao áp",
  },
  {
    title: "Ngành thiết yếu",
    lead: "Điện và nước duy trì hoạt động của toàn xã hội.",
    body: "Khả năng tiếp cận hai dịch vụ này ảnh hưởng trực tiếp đến nhiều lĩnh vực quan trọng.",
    facts: ["Đời sống người dân", "Hoạt động của doanh nghiệp", "Quốc phòng và an ninh", "Phát triển kinh tế – xã hội"],
    image: "assets/reg5-city.jpg",
    alt: "Đô thị phụ thuộc vào nguồn cung điện và nước ổn định",
  },
  {
    title: "Tránh độc quyền tư nhân",
    lead: "Tư nhân hóa hoàn toàn không đồng nghĩa với cạnh tranh.",
    body: "Khi hạ tầng vẫn chỉ có một mạng lưới, quyền lực độc quyền có thể chuyển từ Nhà nước sang doanh nghiệp tư nhân.",
    facts: ["Giá dịch vụ có nguy cơ tăng cao", "Khó phục vụ vùng sâu, vùng xa", "Lợi ích công cộng có thể bị ảnh hưởng"],
    image: "assets/reg1-price.jpg",
    alt: "Hạ tầng cấp nước phục vụ khu dân cư",
  },
];

export default function Chapter4Debate() {
  return (
    <>
      <section className="privatization-cover" id="s-debate">
        <div className="privatization-cover__media" aria-hidden="true">
          <figure><img src="assets/reg5-city.jpg" alt="" /></figure>
          <figure><img src="assets/reg2-quality.jpg" alt="" /></figure>
        </div>
        <div className="privatization-cover__shade" aria-hidden="true"></div>
        <div className="privatization-cover__copy">
          <span className="kicker">Chương 4 · Điện và nước tại Việt Nam</span>
          <h2>Vì sao chưa tư nhân hóa hoàn toàn?</h2>
          <p>Đây không phải lựa chọn tuyệt đối giữa Nhà nước và tư nhân, mà là cách phân chia vai trò phù hợp với đặc điểm của hạ tầng thiết yếu.</p>
        </div>
      </section>

      <section className="editorial-reasons" aria-labelledby="editorial-reasons-title">
        <header className="editorial-reasons__head">
          <span className="kicker">Ba lý do cốt lõi</span>
          <h2 id="editorial-reasons-title">Những giới hạn<br />của tư nhân hóa hoàn toàn</h2>
        </header>

        <div className="editorial-reasons__list">
          {reasons.map((reason, index) => (
            <article className="editorial-reason" key={reason.title}>
              <div className="editorial-reason__copy">
                <span className="editorial-reason__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{reason.title}</h3>
                <strong>{reason.lead}</strong>
                <p>{reason.body}</p>
                <ul>
                  {reason.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </div>
              <figure className="editorial-reason__media">
                <img src={reason.image} alt={reason.alt} />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="vn-policy" aria-labelledby="vn-policy-title">
        <div className="vn-policy__head">
          <span className="kicker">Hướng đi của Việt Nam</span>
          <h2 id="vn-policy-title">Giữ khâu lõi.<br />Mở khâu có thể cạnh tranh.</h2>
          <p>Nhà nước và tư nhân được phân vai theo tính chất của từng khâu trong hệ thống.</p>
        </div>

        <div className="vn-policy__split">
          <article className="vn-policy__side vn-policy__side--state">
            <span>Nhà nước giữ quyền chi phối</span>
            <h3>Bảo vệ hệ thống cốt lõi</h3>
            <ul><li>Truyền tải điện</li><li>Điều tiết hệ thống</li><li>Hạ tầng thiết yếu</li></ul>
          </article>
          <article className="vn-policy__side vn-policy__side--market">
            <span>Tư nhân được tham gia</span>
            <h3>Mở những khâu có thể cạnh tranh</h3>
            <ul><li>Phát điện</li><li>Năng lượng tái tạo</li><li>Công nghệ và dịch vụ</li></ul>
          </article>
        </div>

      </section>
    </>
  );
}
