import { Bubbles } from "../components/Particles.jsx";
import bubbleSvg from "../../assets/bubble.svg";
import businessMergerSvg from "../../assets/Business merger-bro.svg";
import growingSvg from "../../assets/Growing-bro.svg";
import marketplaceSvg from "../../assets/Marketplace-pana.svg";
import mountainOceanSvg from "../../assets/moutain-ocean.svg";
import successFactorsSvg from "../../assets/Success factors-amico.svg";
import chapterCover from "../../assets/pin-c1.jpg";
import "./css/style-c1.css";

export default function Chapter1Monopoly() {
  return (
    <>
      <div className="chapter-opening">
        {/* 04 CHAPTER COVER */}
        <section className="cover" id="s-cover">
          <figure className="cover-frame reveal">
            <img src={chapterCover} alt="Nhiều đường hạ tầng hội tụ về một trung tâm" />
            <figcaption>
              <span className="kicker">Chương 1 · Độc quyền là gì</span>
              <h2>Khi dòng chảy thị trường<br />bị gom về một điểm</h2>
            </figcaption>
          </figure>
        </section>
        {/* 05 ARTICLE + YELLOW CIRCLE */}
        <section className="article" id="s-article">
          <div className="article-layout">
            <div className="monopoly-grid reveal">
              <div className="monopoly-cluster monopoly-definition" role="group" aria-labelledby="monopoly-definition">
                <h3 id="monopoly-definition">Khái niệm</h3>
                <ul className="monopoly-definition-list">
                  <li>Là sự liên minh giữa các <strong>doanh nghiệp lớn</strong>.</li>
                  <li>Có khả năng <strong>chi phối</strong> việc sản xuất và tiêu thụ một số loại hàng hóa.</li>
                  <li>Có khả năng định ra giá cả độc quyền.</li>
                  <li>Mục đích cuối cùng là <strong>thu lợi nhuận độc quyền cao</strong>.</li>
                </ul>
              </div>
              <div className="monopoly-cluster monopoly-traits" role="group" aria-labelledby="monopoly-traits">
                <h3 id="monopoly-traits">Đặc điểm</h3>
                <ul>
                  <li>Chiếm thị phần rất lớn.</li>
                  <li>Có khả năng quyết định hoặc chi phối giá cả.</li>
                  <li>Có khả năng kiểm soát sản lượng.</li>
                  <li>Doanh nghiệp mới khó gia nhập thị trường.</li>
                  <li>Hạn chế cạnh tranh.</li>
                  <li>Có khả năng thu lợi nhuận độc quyền cao.</li>
                </ul>
              </div>
              <div className="monopoly-cluster" role="group" aria-labelledby="monopoly-note">
                <h3 id="monopoly-note">Lưu ý</h3>
                <ul>
                  <li>Độc quyền không nhất thiết chỉ có một doanh nghiệp. Nó có thể tồn tại dưới dạng <strong>độc quyền nhóm</strong>, khi một số ít doanh nghiệp lớn cùng chi phối thị trường.</li>
                </ul>
              </div>
              <div className="monopoly-cluster monopoly-example" role="group" aria-labelledby="monopoly-example">
                <h3 id="monopoly-example">Ví dụ</h3>
                <ul>
                  <li>Grab tiếp nhận hoạt động của Uber tại Đông Nam Á khiến số đối thủ lớn giảm, thị trường gọi xe tập trung hơn và quyền lực thị trường của Grab tăng lên.</li>
                </ul>
              </div>
            </div>
            <div className="article-side">
              <div className="yellow-circle" data-float="">
                <span className="ghost-num">1</span>
                <strong>Một nhóm lớn <br/> chi phối thị trường</strong>
                <span className="cir-sub">giá cả · sản lượng · điều kiện mua bán</span>
              </div>
            </div>
          </div>
          <div className="seabed flow-seabed" aria-hidden="true">
            <img className="flow-seabed__mountain" src={mountainOceanSvg} alt="" />
            <img className="flow-seabed__bubbles" src={bubbleSvg} alt="" />
          </div>
        </section>
        {/* Cơ chế hình thành */}
        <section className="monopoly-paths light" id="s-paths">
          <div className="monopoly-paths__atmos" aria-hidden="true">
            <Bubbles id="pathBubbles" count={34} className="bubbles monopoly-paths__bubbles" />
          </div>
          <div className="monopoly-paths__inner">
            <header className="monopoly-paths__head reveal">
              <span className="kicker">Cơ chế hình thành</span>
              <h2>Hai con đường dẫn tới độc quyền</h2>
              <p>Trong nền kinh tế thị trường, độc quyền có thể được hình thành một cách tự nhiên, cũng có thể được hình thành bởi ý chí của Nhà nước tạo ra các tổ chức độc quyền.</p>
            </header>

            <div className="monopoly-paths__compare">
              <article className="monopoly-path reveal">
                <h3>Độc quyền hình thành một cách tự nhiên</h3>
                <div className="monopoly-path__sequence" aria-label="Tiến trình hình thành độc quyền một cách tự nhiên">
                  <span>Cạnh tranh</span><i aria-hidden="true">↓</i>
                  <span>Doanh nghiệp mạnh phát triển</span><i aria-hidden="true">↓</i>
                  <span>Tích tụ và tập trung sản xuất</span><i aria-hidden="true">↓</i>
                  <span>Sáp nhập - mua lại</span><i aria-hidden="true">↓</i>
                  <span>Độc quyền hình thành</span>
                </div>
                <strong className="monopoly-path__label">Đặc điểm:</strong>
                <ul>
                  <li>Không có sự áp đặt của Nhà nước.</li>
                  <li>Hình thành do quy luật cạnh tranh của thị trường.</li>
                  <li>Doanh nghiệp lớn dần chiếm ưu thế và chi phối thị trường.</li>
                </ul>
              </article>

              <article className="monopoly-path reveal">
                <h3>Độc quyền do ý chí của Nhà nước</h3>
                <p className="monopoly-path__intro">Trong một số lĩnh vực đặc biệt, Nhà nước chủ động trao quyền độc quyền hoặc trực tiếp thành lập các tổ chức độc quyền nhằm bảo đảm lợi ích quốc gia, an ninh và lợi ích công cộng.</p>
                <strong className="monopoly-path__label">Đặc điểm:</strong>
                <ul>
                  <li>Hình thành thông qua pháp luật hoặc quyết định của Nhà nước.</li>
                  <li>Thường xuất hiện ở các lĩnh vực liên quan đến an ninh, quốc phòng hoặc độc quyền tự nhiên.</li>
                </ul>
              </article>
            </div>

          </div>
        </section>
      </div>
      {/* 06 CAUSE TIMELINE — nguyên nhân hình thành độc quyền */}
      <section className="stages causes-sec light" id="s-stages">
        <div className="causes-atmos" aria-hidden="true">
          <Bubbles id="stageBubbles" count={46} />
        </div>
        <div className="causes-inner">
          <ol className="cause-timeline">
            <li className="cause-step" data-step="1">
              <div className="cause-fig">
                <img className="cause-illust" src={growingSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Lực lượng<br />sản xuất</h3>
                <span className="cause-phase">Vốn và công nghệ lớn</span>
                <p>Khoa học - kỹ thuật phát triển làm sản xuất cần máy móc, công nghệ và vốn đầu tư ngày càng lớn. Doanh nghiệp phải tăng cường tích tụ và tập trung sản xuất, từ đó hình thành những doanh nghiệp quy mô lớn có khả năng chi phối thị trường, như trong ngành chip bán dẫn.</p>
              </div>
            </li>
            <li className="cause-step" data-step="2">
              <div className="cause-fig">
                <img className="cause-illust" src={marketplaceSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Cạnh tranh<br />gay gắt</h3>
                <span className="cause-phase">Đào thải và thâu tóm</span>
                <p>Cạnh tranh thúc đẩy cải tiến nhưng cũng loại bỏ doanh nghiệp yếu. Những doanh nghiệp còn lại liên kết, sáp nhập hoặc mua lại đối thủ, làm sản xuất ngày càng tập trung và dẫn tới độc quyền, như trường hợp Grab tiếp nhận hoạt động của Uber tại Đông Nam Á.</p>
              </div>
            </li>
            <li className="cause-step" data-step="3">
              <div className="cause-fig">
                <img className="cause-illust" src={businessMergerSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Khủng hoảng<br />và tín dụng</h3>
                <span className="cause-phase">Tập trung tư bản nhanh hơn</span>
                <p>Khủng hoảng làm nhiều doanh nghiệp nhỏ phá sản, còn doanh nghiệp lớn có thể mua lại tài sản và thị phần. Tín dụng, ngân hàng và công ty cổ phần giúp huy động nguồn vốn lớn, thúc đẩy tập trung tư bản, tập trung sản xuất và sự ra đời của các tổ chức độc quyền.</p>
              </div>
            </li>
            <li className="cause-step climax" data-step="4">
              <div className="cause-fig">
                <img className="cause-illust" src={successFactorsSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Độc quyền hình thành</h3>
                <span className="cause-phase">Chi phối thị trường</span>
                <p>Khi sản xuất tập trung vào số ít doanh nghiệp lớn, họ có khả năng chi phối thị trường, kiểm soát giá, sản lượng và điều kiện mua bán. Đây là điểm cạnh tranh tự do chuyển hóa thành độc quyền.</p>
              </div>
            </li>
          </ol>
          <blockquote className="cause-quote reveal">
            <p>“Tự do cạnh tranh đẻ ra tập trung sản xuất, và tập trung sản xuất phát triển đến một mức độ nhất định sẽ dẫn tới độc quyền.”</p>
            <cite>V.I. Lênin</cite>
          </blockquote>
          <p className="source-note reveal">Nguồn: Giáo trình Kinh tế chính trị Mác-Lênin, Chương 4.</p>
        </div>
      </section>    </>
  );
}
