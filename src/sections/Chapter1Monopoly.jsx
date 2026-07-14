import { Bubbles } from "../components/Particles.jsx";
import bubbleSvg from "../../assets/bubble.svg";
import businessMergerSvg from "../../assets/Business merger-bro.svg";
import growingSvg from "../../assets/Growing-bro.svg";
import marketplaceSvg from "../../assets/Marketplace-pana.svg";
import mountainOceanSvg from "../../assets/moutain-ocean.svg";
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
              <span className="kicker">Chương 1 · Độc quyền</span>
              <h2>Khi dòng chảy thị trường<br />bị gom về một điểm</h2>
            </figcaption>
          </figure>
        </section>
        {/* 05 ARTICLE + YELLOW CIRCLE */}
        <section className="article" id="s-article">
          <div className="article-layout">
            <article className="monopoly-article reveal" aria-label="Khái niệm và đặc điểm của độc quyền">
              <section className="monopoly-article__section monopoly-definition" aria-labelledby="monopoly-definition">
                <h3 id="monopoly-definition">Khái niệm</h3>
                <ul className="monopoly-definition-list">
                  <li>Là sự liên minh giữa các <strong>doanh nghiệp lớn</strong>.</li>
                  <li>Có khả năng <strong>chi phối</strong> việc sản xuất và tiêu thụ một số loại hàng hóa.</li>
                  <li>Có khả năng định ra giá cả độc quyền.</li>
                  <li>Mục đích cuối cùng là <strong>thu lợi nhuận độc quyền cao</strong>.</li>
                </ul>
                <aside className="monopoly-note">
                  <strong>Lưu ý:</strong>
                  <span>Độc quyền không nhất thiết chỉ có một doanh nghiệp; nó có thể tồn tại dưới dạng <strong>độc quyền nhóm</strong>, khi một số ít doanh nghiệp lớn cùng chi phối thị trường.</span>
                </aside>
              </section>

              <section className="monopoly-article__section monopoly-traits" aria-labelledby="monopoly-traits">
                <h3 id="monopoly-traits">Đặc điểm</h3>
                <ul>
                  <li>Chiếm thị phần rất lớn.</li>
                  <li>Có khả năng quyết định hoặc chi phối giá cả.</li>
                  <li>Có khả năng kiểm soát sản lượng.</li>
                  <li>Doanh nghiệp mới khó gia nhập thị trường.</li>
                  <li>Hạn chế cạnh tranh.</li>
                  <li>Có khả năng thu lợi nhuận độc quyền cao.</li>
                </ul>
              </section>

            </article>
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
              <p>Trong nền kinh tế thị trường, độc quyền có thể được hình thành <span className="text-highlight">một cách tự nhiên</span>, cũng có thể được hình thành bởi <span className="text-highlight">ý chí của Nhà nước</span> tạo ra các tổ chức độc quyền.</p>
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
      <section className="causes-chapter-intro light" id="s-stages">
        <div className="causes-chapter-intro__bubbles" aria-hidden="true">
          <Bubbles count={20} />
        </div>
        <header className="causes-heading reveal">
          <span className="kicker causes-chapter-label">Chương 2 · Nguyên nhân hình thành độc quyền</span>
          <h2>Độc quyền được hình thành như thế nào?</h2>
        </header>
      </section>

      <section className="stages causes-sec light">
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
                <h3>Lực lượng sản xuất phát triển</h3>
                <ul>
                  <li>Khoa học - kỹ thuật phát triển → yêu cầu vốn đầu tư lớn.</li>
                  <li>Doanh nghiệp tăng cường tích tụ và tập trung sản xuất.</li>
                  <li>Hình thành các doanh nghiệp quy mô lớn → dẫn đến độc quyền.</li>
                </ul>
                <p className="cause-example"><em>Ví dụ:</em> Ngành sản xuất chip bán dẫn (TSMC, Samsung, Intel).</p>
              </div>
            </li>
            <li className="cause-step" data-step="2">
              <div className="cause-fig">
                <img className="cause-illust" src={marketplaceSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Cạnh tranh gay gắt</h3>
                <ul>
                  <li>Cạnh tranh làm doanh nghiệp yếu bị loại bỏ.</li>
                  <li>Doanh nghiệp lớn liên kết, sáp nhập hoặc mua lại đối thủ.</li>
                  <li>Tập trung sản xuất ngày càng cao → hình thành độc quyền.</li>
                </ul>
                <p className="cause-example"><em>Ví dụ:</em> Grab mua lại Uber.</p>
              </div>
            </li>
            <li className="cause-step" data-step="3">
              <div className="cause-fig">
                <img className="cause-illust" src={businessMergerSvg} alt="" />
              </div>
              <div className="cause-card">
                <h3>Khủng hoảng kinh tế và hệ thống tín dụng</h3>
                <ul>
                  <li>Khủng hoảng kinh tế làm nhiều doanh nghiệp nhỏ phá sản.</li>
                  <li>Hệ thống tín dụng và công ty cổ phần giúp huy động nguồn vốn lớn.</li>
                  <li>Thúc đẩy tập trung tư bản, tập trung sản xuất và sự ra đời của các tổ chức độc quyền.</li>
                </ul>
                <p className="cause-example"><em>Ví dụ:</em> Doanh nghiệp lớn mua lại doanh nghiệp nhỏ sau khủng hoảng.</p>
              </div>
            </li>
          </ol>
          <div className="cause-quote-group" data-cause-reveal>
            <blockquote className="cause-quote">
              <p>“Tự do cạnh tranh đẻ ra tập trung sản xuất, và tập trung sản xuất phát triển đến một mức độ nhất định sẽ dẫn tới độc quyền.”</p>
              <cite>V.I. Lênin</cite>
            </blockquote>
            <p className="source-note">Nguồn: Giáo trình Kinh tế chính trị Mác-Lênin, Chương 4.</p>
          </div>
        </div>
      </section>    </>
  );
}
