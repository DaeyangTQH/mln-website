import { Hotspot } from "../components/Hotspot.jsx";
import parliamentImage from "../../assets/nhanuoc.jpg";
import industryImage from "../../assets/kcn-ver.jpg";
import nationalAssemblyImage from "../../assets/quochoi (2).jpg";
import portImage from "../../assets/cảng.jpg";
import industrialAreaImage from "../../assets/industrial-area.jpg";

export default function Chapter2State() {
  return (
    <>
      <div className="deepwater-band">
        <div className="deepwater-bg" aria-hidden="true"></div>

        <section className="public-net pub-editorial" id="s-bridge">
          <div className="pub-ed">
            <div className="pub-left">
              <figure className="pub-img pub-tall reveal"><img src={nationalAssemblyImage} alt="Tòa nhà Quốc hội, biểu tượng cho quyền lực và chính sách của Nhà nước" /></figure>
              <figure className="pub-img pub-wide reveal"><img src={portImage} alt="Cảng hàng hóa quy mô lớn, gợi lên vai trò của hạ tầng then chốt trong nền kinh tế" /></figure>
            </div>
            <div className="pub-right">
              <figure className="pub-img pub-pop reveal"><img src={industrialAreaImage} alt="Khu công nghiệp rộng lớn, biểu hiện sự tập trung sản xuất và tư bản" /></figure>
              <h2 className="pub-title reveal">Vì sao độc quyền tư nhân lại cần đến<br /> <span>quyền lực Nhà nước?</span></h2>
              <div className="pub-body reveal">
                <p>Một doanh nghiệp lớn có thể chi phối một thị trường. Nhưng khi nhiều tổ chức độc quyền cùng vươn tới ngân hàng, công nghiệp, hạ tầng và chính sách, câu chuyện không còn chỉ nằm trong phạm vi mua bán thông thường.</p>
                <p>Ở điểm đó, quyền lực kinh tế bắt đầu tạo ra những áp lực vượt khỏi từng doanh nghiệp riêng lẻ. Phần tiếp theo lần theo các áp lực ấy để thấy vì sao Nhà nước ngày càng bị kéo sâu vào nền kinh tế.</p>
                <a className="pub-btn" href="#s-state">Xem vai trò điều tiết</a>
              </div>
            </div>
          </div>
          <p className="route-note pub-note reveal">Nguồn: Giáo trình Kinh tế chính trị Mác-Lênin, Chương 4-5.</p>
        </section>

        <section className="migration-intro" id="s-state">
          <div className="mi-content">
            <span className="kicker">Chương 3 · Độc quyền nhà nước và liên hệ</span>
            <h2 className="reveal">Độc quyền nhà nước là gì?</h2>
            <ul className="mi-concept-list">
              <li className="reveal">Nhà nước giữ vị thế độc quyền ở lĩnh vực then chốt.</li>
              <li className="reveal">Kết hợp sức mạnh Nhà nước và tư bản độc quyền.</li>
              <li className="reveal">Mang tính phổ biến trong nền kinh tế thị trường.</li>
            </ul>
          </div>
          <div className="mi-concept-note reveal">
            <span className="mi-concept-note__lead">Độc quyền nhà nước trong chủ nghĩa tư bản<br/> <strong>không chỉ là Nhà nước sở hữu doanh nghiệp</strong></span>
            <span className="mi-concept-note__body">mà là sự kết hợp giữa quyền lực nhà nước và các tổ chức tư bản độc quyền.</span>
          </div>
        </section>

      </div>

      <section className="mapsec network-sec regulator-sec" id="s-network">
        <div className="regulator-stage">
          <div className="regulator-visual regulation-landscape river-scene" role="img" aria-label="Dòng chảy thị trường đi qua các trạm van điều tiết của Nhà nước">
            {/* lớp ảnh minh hoạ: mỗi bước 1 ảnh phủ trọn khung, đổi khi cuộn */}
            <div className="reg-camera">
              <div className="river-photos" aria-hidden="true">
                <div className="river-photo" data-step="1" style={{ backgroundImage: "url('/assets/reg5-city.jpg')" }} />
                <div className="river-photo" data-step="2" style={{ backgroundImage: "url('/assets/reg1-price.jpg')" }} />
                <div className="river-photo" data-step="3" style={{ backgroundImage: "url('/assets/reg4-rural.jpg')" }} />
                <div className="river-photo" data-step="4" style={{ backgroundImage: "url('/assets/reg3-grid.jpg')" }} />
              </div>
              <div className="river-fog" aria-hidden="true" />
              <svg className="regulator-svg river-svg" viewBox="0 0 900 620" aria-hidden="true">
                <defs>
                  <radialGradient id="zoneGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F5C542" stopOpacity=".82" />
                    <stop offset="52%" stopColor="#F5C542" stopOpacity=".16" />
                    <stop offset="100%" stopColor="#F5C542" stopOpacity="0" />
                  </radialGradient>
                  {/* dòng chảy = NƯỚC: xanh sáng ở nguồn → xanh dương sâu ở đích */}
                  <linearGradient id="riverGold" gradientUnits="userSpaceOnUse" x1="40" y1="560" x2="868" y2="120">
                    <stop offset="0" stopColor="#9AE9F2" />
                    <stop offset=".5" stopColor="#4FB8C9" />
                    <stop offset="1" stopColor="#3E86C9" />
                  </linearGradient>
                  {/* gợn sóng mặt nước */}
                </defs>
                {/* chiều sâu địa hình */}
                <path className="terrain-fill" d="M0,602 C160,566 340,588 520,560 C690,536 800,548 900,512 L900,640 L0,640 Z" />
                <path className="terrain-ridge" d="M0,286 L60,200 L120,262 L185,172 L250,268 L300,214" />
                <path className="city-block" d="M726,150 v-28 h14 v28 M752,150 v-46 h16 v46 M782,150 v-22 h14 v22 M806,150 v-36 h16 v36" />
                {/* dòng chảy thị trường: tự do (trái) → lợi ích công cộng (phải) */}
                <g className="river-body">
                  <path className="river-bed" d="M40,560 C90,520 120,500 165,470 C215,438 270,470 320,495 C375,522 420,400 470,355 C520,312 575,345 625,320 C685,290 735,240 775,195 C815,158 845,140 868,120" />
                  <path className="river-base" id="riverPath" d="M40,560 C90,520 120,500 165,470 C215,438 270,470 320,495 C375,522 420,400 470,355 C520,312 575,345 625,320 C685,290 735,240 775,195 C815,158 845,140 868,120" />
                  <path className="river-lit" pathLength="100" d="M40,560 C90,520 120,500 165,470 C215,438 270,470 320,495 C375,522 420,400 470,355 C520,312 575,345 625,320 C685,290 735,240 775,195 C815,158 845,140 868,120" />
                  <path className="river-flow" d="M40,560 C90,520 120,500 165,470 C215,438 270,470 320,495 C375,522 420,400 470,355 C520,312 575,345 625,320 C685,290 735,240 775,195 C815,158 845,140 868,120" />
                  <path className="river-foam" d="M40,560 C90,520 120,500 165,470 C215,438 270,470 320,495 C375,522 420,400 470,355 C520,312 575,345 625,320 C685,290 735,240 775,195 C815,158 845,140 868,120" />
                </g>
                {/* hạt sáng: dòng chảy chuyển động */}
                <circle className="river-drop" r="3"><animateMotion dur="6.5s" repeatCount="indefinite"><mpath href="#riverPath" /></animateMotion></circle>
                <circle className="river-drop" r="2.4"><animateMotion dur="6.5s" begin="-2.2s" repeatCount="indefinite"><mpath href="#riverPath" /></animateMotion></circle>
                <circle className="river-drop" r="2.8"><animateMotion dur="6.5s" begin="-4.3s" repeatCount="indefinite"><mpath href="#riverPath" /></animateMotion></circle>
                {/* 4 trạm nguyên nhân hình thành độc quyền nhà nước */}
                <g className="station" data-step="1" transform="translate(165,470)">
                  <circle className="st-glow" r="80" />
                  <circle className="st-ripple st-ripple-1" r="38" />
                  <circle className="st-ripple st-ripple-2" r="38" />
                  <circle className="st-gate" r="30" />
                  <circle className="st-socket" r="40" />
                </g>
                <g className="station" data-step="2" transform="translate(320,495)">
                  <circle className="st-glow" r="80" />
                  <circle className="st-ripple st-ripple-1" r="38" />
                  <circle className="st-ripple st-ripple-2" r="38" />
                  <circle className="st-gate" r="30" />
                  <circle className="st-socket" r="40" />
                </g>
                <g className="station" data-step="3" transform="translate(470,355)">
                  <circle className="st-glow" r="80" />
                  <circle className="st-ripple st-ripple-1" r="38" />
                  <circle className="st-ripple st-ripple-2" r="38" />
                  <circle className="st-gate" r="30" />
                  <circle className="st-socket" r="40" />
                </g>
                <g className="station" data-step="4" transform="translate(742,230)">
                  <circle className="st-glow" r="80" />
                  <circle className="st-ripple st-ripple-1" r="38" />
                  <circle className="st-ripple st-ripple-2" r="38" />
                  <circle className="st-gate" r="30" />
                  <circle className="st-socket" r="40" />
                </g>
                <text className="river-label" x="34" y="596">thị trường tự do</text>
                <text className="river-label end" x="878" y="120" textAnchor="end">quyền lực nhà nước</text>
              </svg>
              <Hotspot className="regulator-hotspot" regStep={1} index={1} icon="factory" title="Tích tụ và tập trung sản xuất" body="Sản xuất ngày càng tập trung vào các tổ chức độc quyền lớn, làm quyền lực kinh tế vượt khỏi phạm vi từng doanh nghiệp và đòi hỏi sự can thiệp sâu hơn của Nhà nước." style={{ left: "18.3%", top: "75.8%" }} />
              <Hotspot className="regulator-hotspot" regStep={2} index={2} icon="landmark" title="Tư nhân không đủ khả năng đầu tư" body="Một số ngành cần lượng vốn rất lớn, thời gian thu hồi dài hoặc lợi nhuận thấp, khiến tư nhân không muốn hoặc không đủ khả năng đầu tư. Nhà nước phải trực tiếp đảm nhận hoặc hỗ trợ." style={{ left: "35.6%", top: "79.8%" }} />
              <Hotspot className="regulator-hotspot" regStep={3} index={3} icon="triangle-alert" title="Mâu thuẫn xã hội" body="Khủng hoảng, thất nghiệp, phân hóa và bất ổn xã hội buộc Nhà nước can thiệp để điều tiết, làm dịu mâu thuẫn và duy trì sự ổn định của hệ thống." style={{ left: "52.2%", top: "57.3%" }} />
              <Hotspot className="regulator-hotspot" regStep={4} index={4} icon="globe" title="Quốc tế hóa kinh tế" body="Thương mại, đầu tư và cạnh tranh vượt ra ngoài biên giới khiến Nhà nước phải hỗ trợ các tổ chức độc quyền trong nước và bảo vệ lợi ích của tư bản quốc gia trên thị trường thế giới." style={{ left: "82.4%", top: "37.1%" }} />
            </div>
          </div>
          <aside className="regulator-panel">
            <span className="kicker">Nguyên nhân hình thành</span>
            <h2 id="regulatorTitle">Vì sao Nhà nước ngày càng can thiệp sâu?</h2>
            <p id="regulatorBody">Tập trung sản xuất, nhu cầu đầu tư lớn, mâu thuẫn xã hội và quốc tế hóa kinh tế khiến Nhà nước ngày càng can thiệp sâu vào nền kinh tế.</p>
            <div className="regulator-meter" aria-hidden="true">
              <span id="regulatorMetric">4 nguyên nhân</span>
              <i></i>
            </div>
          </aside>
        </div>
      </section>

      <section className="state-essence" id="s-quote">
        <div className="essence-editorial">
          <div className="essence-manifesto reveal">
            <span className="kicker">Bản chất</span>
            <h2>Can thiệp sâu hơn, bản chất không đổi</h2>
            <p className="essence-thesis">Độc quyền nhà nước trong chủ nghĩa tư bản là hình thức vận động mới của quan hệ sản xuất tư bản chủ nghĩa. Giúp chủ nghĩa tư bản thích nghi với điều kiện lịch sử mới và tiếp tục phát triển.</p>
          </div>

          <figure className="essence-diptych reveal" aria-label="Sự kết hợp giữa quyền lực Nhà nước và tư bản độc quyền">
            <div className="essence-photo state-power">
              <img src={parliamentImage} alt="Tòa nhà Quốc hội, biểu tượng cho quyền lực Nhà nước" />
              <span>Quyền lực Nhà nước</span>
            </div>
            <div className="essence-photo monopoly-power">
              <img src={industryImage} alt="Khu công nghiệp, biểu tượng cho sức mạnh tư bản độc quyền" />
              <span>Tư bản độc quyền</span>
            </div>
          </figure>

          <div className="essence-facts reveal">
            <article>
              <strong>Mục đích</strong>
              <ul>
                <li>Phục vụ lợi ích của các tổ chức độc quyền tư nhân.</li>
                <li>Duy trì và phát triển chủ nghĩa tư bản.</li>
              </ul>
            </article>
            <article>
              <strong>Đặc điểm</strong>
              <ul>
                <li>Tăng sức mạnh của các tổ chức độc quyền.</li>
                <li>Tăng vai trò can thiệp của Nhà nước vào nền kinh tế.</li>
                <li>Kết hợp sức mạnh của tư bản độc quyền với sức mạnh của Nhà nước.</li>
                <li>Bộ máy nhà nước ngày càng phụ thuộc vào các tổ chức độc quyền.</li>
              </ul>
            </article>
            <article className="essence-role">
              <strong>Vai trò của Nhà nước</strong>
              <p>Nhà nước không chỉ ban hành luật và thu thuế, mà còn trực tiếp:</p>
              <ul>
                <li>Sở hữu doanh nghiệp.</li>
                <li>Tổ chức và quản lý khu vực kinh tế nhà nước.</li>
                <li>Điều tiết sản xuất, phân phối, trao đổi và tiêu dùng.</li>
              </ul>
            </article>
          </div>

        </div>
      </section>
    </>
  );
}
