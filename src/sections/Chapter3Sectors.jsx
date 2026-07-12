import portImage from "../../assets/cảng.jpg";
import parliamentImage from "../../assets/quochoi (2).jpg";
import industryImage from "../../assets/industrial-area.jpg";

const principles = [
  {
    image: portImage,
    alt: "Cảng hàng hóa với nhiều chủ thể cùng tham gia hoạt động kinh tế",
    title: "Nhiều thành phần cùng tồn tại",
    body: "Kinh tế nhà nước, kinh tế tư nhân, kinh tế có vốn FDI và kinh tế tập thể cùng hợp tác, cạnh tranh theo pháp luật."
  },
  {
    image: parliamentImage,
    alt: "Tòa nhà Quốc hội đại diện cho vai trò định hướng và điều tiết của Nhà nước",
    title: "Nhà nước giữ vai trò chủ đạo",
    body: "Nhà nước định hướng, điều tiết và giữ quyền chi phối ở điện, nước, tiền tệ, quốc phòng cùng các hạ tầng chiến lược."
  },
  {
    image: industryImage,
    alt: "Khu công nghiệp đại diện cho mục tiêu phát triển kinh tế và lợi ích chung",
    title: "Hướng tới lợi ích chung",
    body: "Vai trò của Nhà nước nhằm ổn định kinh tế vĩ mô, bảo đảm an sinh xã hội, quốc phòng, an ninh và lợi ích công cộng."
  }
];

export default function Chapter3Sectors() {
  return (
    <div className="vn-chapter-band">
      <div className="vn-chapter-band__bg" aria-hidden="true"></div>

      <section className="vn-frame" id="s-vietnam">
        <div className="vn-frame-inner">
          <div className="vn-frame-copy">
            <span className="kicker">Chương 3 · Vận dụng tại Việt Nam</span>
            <h2 className="reveal">Thị trường vận hành, Nhà nước định hướng</h2>
            <p className="vn-lead reveal">Việt Nam vận hành nền kinh tế thị trường định hướng xã hội chủ nghĩa, với nhiều thành phần kinh tế cùng tồn tại, hợp tác và cạnh tranh theo pháp luật.</p>
            <p className="vn-distinction reveal"><strong>Khác biệt cốt lõi</strong>Vai trò chủ đạo của Nhà nước tại Việt Nam không nhằm thu lợi nhuận độc quyền cao, mà hướng tới ổn định và lợi ích công cộng.</p>
          </div>
          <div className="vn-principles" aria-label="Ba đặc điểm của nền kinh tế thị trường định hướng xã hội chủ nghĩa">
            {principles.map((principle, index) => (
              <article className="vn-principle reveal" key={principle.title}>
                <img src={principle.image} alt={principle.alt} />
                <div className="vn-principle-shade" aria-hidden="true"></div>
                <span className="vn-principle-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="vn-principle-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
                <i className="vn-principle-line" aria-hidden="true"></i>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
