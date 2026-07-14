import mixedEconomyImage from "../../assets/lhvn/nhieutptt.jpg";
import stateRoleImage from "../../assets/lhvn/nnuoc.jpg";
import publicInterestImage from "../../assets/lhvn/loiichchung.jpg";

const principles = [
  {
    image: mixedEconomyImage,
    alt: "Khu công nghiệp quy mô lớn với nhiều thành phần kinh tế cùng tham gia sản xuất",
    title: "Nhiều thành phần cùng tồn tại",
    body: "Kinh tế nhà nước, kinh tế tư nhân, kinh tế có vốn FDI và kinh tế tập thể cùng hợp tác, cạnh tranh theo pháp luật."
  },
  {
    image: stateRoleImage,
    alt: "Công trình Nhà nước Việt Nam đại diện cho vai trò định hướng và điều tiết nền kinh tế",
    title: "Nhà nước giữ vai trò chủ đạo",
    body: "Nhà nước định hướng, điều tiết và giữ quyền chi phối ở điện, nước, tiền tệ, quốc phòng cùng các hạ tầng chiến lược."
  },
  {
    image: publicInterestImage,
    alt: "Mạng lưới kết nối con người đại diện cho mục tiêu ổn định và lợi ích chung",
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
            <span className="kicker">Chương 3 · Liên hệ tại Việt Nam</span>
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
