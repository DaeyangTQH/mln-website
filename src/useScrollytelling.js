import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============ MLN121 monopoly scrollytelling interactions ============
   Toàn bộ logic được port nguyên trạng từ app.js gốc, chỉ khác:
   - GSAP/ScrollTrigger nhập từ npm thay cho thẻ <script>.
   - Các phần tử động (bubbles, sao, thanh waveform, seam, icon hotspot) đã
     được render sẵn bằng JSX, nên phần "dựng DOM" trong app.js được bỏ đi.
   - Bổ sung cleanup để chạy an toàn với React (HMR / unmount). */
export function useScrollytelling() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hasGSAP = true;
    const hasST = true;
    const cleanups = [];

    const STATIC = location.search.includes("static");
    const reduce =
      (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) || STATIC;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

    if (STATIC) {
      document.documentElement.style.scrollBehavior = "auto";
      const st = document.createElement("style");
      st.textContent = `
        .reveal,.ql,.cause-step,.yellow-circle,.final-circle{opacity:1!important;transform:none!important;filter:none!important}
        .market-core{opacity:1!important;transform:translate(-50%,-50%) scale(1)!important;filter:none!important}
        .hotspot{transform:translate(-50%,-50%) scale(1)!important}
        .hotspot.mini{transform:scale(1)!important}
        .wave-line{width:min(70vw,860px)!important}
        .wave-bars i{transform:scaleY(1)!important}
        .btn-play{opacity:1!important;transform:none!important}
        .route-flow{display:none!important}
        .net-line,.route-path,.svc-line,#lineartSvg .draw{stroke-dashoffset:0!important}`;
      document.head.appendChild(st);
      cleanups.push(() => st.remove());
      const shot = new URLSearchParams(location.search).get("shot");
      if (shot) {
        const isolate = () =>
          setTimeout(() => {
            $$(".landing > section").forEach((s) => {
              if (s.id !== shot) s.style.display = "none";
            });
            const nav = $("#chapterNav");
            if (nav) nav.style.position = "static";
            scrollTo(0, 0);
          }, 30);
        // 'load' có thể đã bắn trước khi React mount → chạy ngay nếu trang đã sẵn sàng
        if (document.readyState === "complete") isolate();
        else addEventListener("load", isolate);
      }
    }

    /* -------- reveal + parallax + staged animation -------- */
    if (!reduce && hasGSAP) {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });

      gsap.to(".hero-title", {
        y: -260,
        opacity: 0.88,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      const heroIntroVisual = $(".hero-intro-visual");
      if (heroIntroVisual) {
        gsap.to(heroIntroVisual, {
          y: -120,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: "#s-hero",
            start: "top top",
            end: () => "+=" + Math.round(innerHeight * 1.55),
            scrub: true,
          },
        });
        gsap.fromTo(heroIntroVisual, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power2.out" });
      }
      // cinematic entrance: title lands line by line, keyword pops
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".badge", { y: -18, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.1)
        .from(".hero-title .row", { y: 52, opacity: 0, duration: 0.9, stagger: 0.16 }, 0.25)
        .from(".hero-title .w", { scale: 0.84, opacity: 0, duration: 0.85, ease: "back.out(1.7)" }, "-=0.35")
        .fromTo(".hero-flow", { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=0.6");
      // intro: left text lands first, then the divider runs top->bottom while the rest appears
      gsap
        .timeline({ scrollTrigger: { trigger: ".intro", start: "top 66%" } })
        .from(".intro-lead", { opacity: 0, y: 44, duration: 0.9, ease: "power3.out" })
        .fromTo(".intro-line", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 1.15, ease: "power2.inOut" }, ">-0.05")
        .from(".intro-body", { opacity: 0, y: 30, duration: 0.85, ease: "power2.out" }, "<0.18")
        .from(".intro-meta .meta-item", { opacity: 0, y: 24, duration: 0.7, stagger: 0.14, ease: "power2.out" }, "<0.15");

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: -70,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.utils.toArray("[data-parallax-slow]").forEach((el) => {
        gsap.to(el, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      const vnPrinciples = gsap.utils.toArray(".vn-principle");
  if (vnPrinciples.length) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".vn-frame",
          start: "top 68%",
          refreshPriority: -10,
          invalidateOnRefresh: true,
        },
      })
       .from(".vn-principles", { y: 58, opacity: 0, duration: .9, ease: "power3.out" })
          .from(".vn-principle > img", { scale: 1.1, duration: 1.15, stagger: .14, ease: "power2.out" }, "<")
          .from(".vn-principle-line", { scaleX: 0, duration: .75, stagger: .14, ease: "power2.inOut" }, "<.18");
      }

      gsap.utils.toArray("[data-float]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.82, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
      gsap.utils.toArray(".pimg").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.closest("section"), start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Cụm 2 khung ảnh nước (Maglr): ẢNH BÊN TRONG khung scale nhẹ 1.12→1.0 khi cuộn
      // (cinematic, mượt, không bounce; khung giữ nguyên, chỉ ảnh co lại).
      gsap.utils.toArray("[data-shrink] img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: { trigger: img.closest("[data-shrink]"), start: "top 82%", end: "bottom 45%", scrub: 0.8 },
          }
        );
      });

      // Breakout stack (ảnh + cutout tràn khung) trôi cùng nhau khi cuộn — animate CẢ stack,
      // không animate riêng cutout để không lệch. Reveal (opacity/y) nằm trên .breakout cha.
      gsap.utils.toArray(".breakout__stack").forEach((stack) => {
        gsap.fromTo(
          stack,
          { yPercent: 7 },
          {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: stack.closest("section"), start: "top bottom", end: "bottom top", scrub: 0.7 },
          }
        );
      });

      const causeSteps = gsap.utils.toArray(".cause-step");
      const spineFill = $("#spineFill");
      const bubbleLayer = $("#stageBubbles");
      if (causeSteps.length) {
        const shouldPinCauses = innerWidth >= 960 && innerHeight >= 720;
        if (!shouldPinCauses) {
          causeSteps.forEach((s) => s.classList.add("in"));
          if (bubbleLayer) bubbleLayer.style.transform = "";
        } else {
          ScrollTrigger.create({
            trigger: ".stages",
            start: "top top",
            end: "+=1800",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (spineFill) spineFill.style.width = (p * 100).toFixed(1) + "%";
              causeSteps.forEach((s, i) => {
                const inTh = i === 0 ? 0.02 : i * 0.17;
                const ghostTh = inTh - 0.05;
                s.classList.toggle("in", p >= inTh);
                s.classList.toggle("ghost", p >= ghostTh && p < inTh);
              });
              // bubble layer drifts upward as the section scrolls (parallax, như bản mẫu)
              if (bubbleLayer) bubbleLayer.style.transform = `translateY(${(-p * 85).toFixed(1)}%)`;
            },
          });
        }
      }

      gsap.to(".quote .ql", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: { trigger: ".quote", start: "top 58%" },
      });

      drawLines(".net-line", { trigger: ".network-sec", start: "top 62%", duration: 1.1, stagger: 0.08 });
      drawLines(".route-path", { trigger: ".route-section", start: "top 68%", end: "bottom 46%", scrub: 0.5 });
      drawLines("#lineartSvg .draw", { trigger: "#lineartSvg", start: "top 78%", duration: 1.2, stagger: 0.1 });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stats", start: "top 72%" },
      });
      ScrollTrigger.create({ trigger: ".stats", start: "top 66%", once: true, onEnter: runStats });
      ScrollTrigger.create({
        trigger: ".final-lineart",
        start: "top 78%",
        once: true,
        onEnter: () => gsap.to("#s-final .hotspot", { scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }),
      });
      gsap.to(".hotspot", {
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".network-sec", start: "top 72%" },
      });

      const reasonSection = $(".utility-reasons");
      const reasonSteps = $$("[data-reason-step]");
      const reasonImages = $$("[data-reason-image]");
      const reasonMarkers = $$("[data-reason-marker]");
      if (reasonSection && reasonSteps.length) {
        const activateReason = (index) => {
          reasonSection.dataset.activeReason = String(index);
          reasonSteps.forEach((step, i) => step.classList.toggle("is-active", i === index));
          reasonImages.forEach((image, i) => image.classList.toggle("is-active", i === index));
          reasonMarkers.forEach((marker, i) => marker.classList.toggle("is-active", i === index));
        };
        const shouldPinReasons = innerWidth >= 960 && innerHeight >= 680;
        if (shouldPinReasons) {
          ScrollTrigger.create({
            trigger: reasonSection,
            start: "top top",
            end: "+=3200",
            scrub: 0.55,
            pin: true,
            anticipatePin: 1,
            refreshPriority: -10,
            invalidateOnRefresh: true,
            onUpdate: (self) => activateReason(Math.min(reasonSteps.length - 1, Math.floor(self.progress * reasonSteps.length))),
          });
        } else {
          reasonSteps.forEach((step) => step.classList.add("is-active"));
        }
      }
    } else {
      $$(".reveal").forEach((e) => {
        e.style.opacity = 1;
        e.style.transform = "none";
        e.style.filter = "none";
      });
      $$(".hotspot").forEach((e) => {
        e.style.transform = e.classList.contains("mini") ? "scale(1)" : "translate(-50%,-50%) scale(1)";
      });
      $$(".cause-step").forEach((e) => e.classList.add("in"));
      $$("[data-reason-step]").forEach((e) => e.classList.add("is-active"));
      const spineFill = $("#spineFill");
      if (spineFill) spineFill.style.width = "100%";
      runStats();
    }

    function drawLines(selector, cfg) {
      if (!hasGSAP || reduce) return;
      const lines = $$(selector);
      if (!lines.length) return;
      lines.forEach((line) => {
        const len = line.getTotalLength ? line.getTotalLength() : 600;
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len;
      });
      const vars = { strokeDashoffset: 0, ease: cfg.scrub ? "none" : "power1.inOut" };
      if (cfg.duration) vars.duration = cfg.duration;
      if (cfg.stagger) vars.stagger = cfg.stagger;
      vars.scrollTrigger = {
        trigger: cfg.trigger,
        start: cfg.start || "top 70%",
        end: cfg.end,
        scrub: cfg.scrub,
      };
      gsap.to(selector, vars);
    }

    /* -------- count-up + gauge -------- */
    function runStats() {
      $$(".count").forEach((el) => {
        const to = parseFloat(el.dataset.to || "0");
        const suffix = (el.dataset.suffix || "").trim();
        const render = (v) => {
          const num = Number.isInteger(to) ? Math.round(v) : v.toFixed(1);
          el.innerHTML = num + (suffix ? `<sup class="suf">${suffix}</sup>` : "");
        };
        if (reduce || !hasGSAP) {
          render(to);
          return;
        }
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.4, ease: "power1.out", onUpdate: () => render(o.v) });
      });
      $$(".stat-bar i").forEach((bar) => {
        const w = parseFloat(bar.dataset.fill || "0") + "%";
        if (reduce || !hasGSAP) {
          bar.style.width = w;
          return;
        }
        gsap.fromTo(bar, { width: "0%" }, { width: w, duration: 1.4, ease: "power2.out" });
      });
      const arc = $(".gauge-arc");
      const fill = 0.66; // share of the dial the needle points to
      if (arc && arc.getTotalLength) {
        const len = arc.getTotalLength();
        arc.style.strokeDasharray = len;
        if (reduce || !hasGSAP) arc.style.strokeDashoffset = len * (1 - fill);
        else gsap.fromTo(arc, { strokeDashoffset: len }, { strokeDashoffset: len * (1 - fill), duration: 1.4, ease: "power1.inOut" });
      }
      const needle = $(".gauge-needle");
      if (needle) {
        const target = (fill - 0.5) * 180; // -90deg (left) .. +90deg (right)
        if (reduce || !hasGSAP) needle.style.transform = `rotate(${target}deg)`;
        else gsap.fromTo(needle, { rotation: -72, svgOrigin: "120 132" }, { rotation: target, svgOrigin: "120 132", duration: 1.4, ease: "power2.out" });
      }
    }

    /* -------- sticky chapter nav -------- */
    const nav = $("#chapterNav");
    const progress = $("#progressBar");
    const links = nav ? $$("a", nav) : [];
    const secs = links.map((a) => $(a.getAttribute("href")));
    function onScroll() {
      const doc = document.documentElement;
      const sc = scrollY || doc.scrollTop || document.body.scrollTop || 0;
      const max = Math.max(doc.scrollHeight, document.body.scrollHeight) - innerHeight;
      const pct = Math.max(0, Math.min(100, (sc / Math.max(max, 1)) * 100));
      if (progress) progress.style.width = pct.toFixed(2) + "%";
      if (nav) {
        const r = nav.getBoundingClientRect();
        const navTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
        nav.classList.toggle("is-stuck", r.top <= navTop + 1);
        const probeY = Math.min(innerHeight - 1, r.bottom + 80);
        const behind = document.elementFromPoint(innerWidth / 2, probeY);
        const lightByPoint = behind && behind.closest(".light");
        const lightByRect = $$(".light").some((sec) => {
          const sr = sec.getBoundingClientRect();
          return sr.top <= r.bottom + 120 && sr.bottom >= r.top;
        });
        const light = lightByPoint || lightByRect;
        const intro = $("#s-intro");
        const introRect = intro ? intro.getBoundingClientRect() : null;
        const onIntro = introRect && introRect.top <= r.bottom + 80 && introRect.bottom >= r.top + 20;
        nav.classList.toggle("on-light", !!light);
        nav.classList.toggle("on-dark", !light);
        nav.classList.toggle("on-intro", !!onIntro);
        let idx = 0;
        const activeLine = r.bottom + 80;
        secs.forEach((s, i) => {
          if (s && s.getBoundingClientRect().top <= activeLine) idx = i;
        });
        links.forEach((l, i) => l.classList.toggle("active", i === idx));
      }
    }
    addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => removeEventListener("scroll", onScroll));
    onScroll();
    const navClickHandlers = [];
    links.forEach((l) => {
      const handler = (e) => {
        const t = $(l.getAttribute("href"));
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        }
      };
      l.addEventListener("click", handler);
      navClickHandlers.push([l, handler]);
    });
    cleanups.push(() => navClickHandlers.forEach(([l, h]) => l.removeEventListener("click", h)));
    const toTop = $("#toTop");
    const toTopHandler = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    toTop?.addEventListener("click", toTopHandler);
    cleanups.push(() => toTop?.removeEventListener("click", toTopHandler));

    /* -------- state network: gold energy visibly flowing INWARD to the core -------- */
    (function netFlows() {
      const netSvg = document.getElementById("stateNetwork");
      if (!netSvg || reduce) return;
      const NS = "http://www.w3.org/2000/svg";
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "net-flows");
      g.setAttribute("aria-hidden", "true");
      $$(".net-line", netSvg).forEach((ln, i) => {
        const f = document.createElementNS(NS, "path");
        f.setAttribute("class", "net-flow");
        f.setAttribute("d", ln.getAttribute("d"));
        f.setAttribute("fill", "none");
        f.style.animationDelay = i * 0.16 + "s";
        g.appendChild(f);
      });
      const nodes = netSvg.querySelector(".net-nodes");
      netSvg.insertBefore(g, nodes || null);
    })();

    /* -------- regulation valve: scroll reveals the points of intervention -------- */
    (function regulatorValve() {
      const section = $("#s-network.regulator-sec");
      if (!section) return;
      const zones = $$(".station", section);
      const nodes = $$(".regulator-hotspot", section);
      if (reduce) {
        const svg = section.querySelector(".river-svg");
        if (svg && svg.pauseAnimations) svg.pauseAnimations();
      }
      const title = $("#regulatorTitle");
      const body = $("#regulatorBody");
      const metric = $("#regulatorMetric");
      const states = [
        {
          title: "Vì sao Nhà nước ngày càng can thiệp sâu?",
          body: "Tập trung sản xuất, nhu cầu đầu tư lớn, mâu thuẫn xã hội và quốc tế hóa kinh tế khiến Nhà nước ngày càng can thiệp sâu vào nền kinh tế.",
          metric: "4 nguyên nhân",
        },
        {
          title: "Tích tụ và tập trung sản xuất ngày càng cao",
          body: "Sản xuất ngày càng tập trung vào các tổ chức độc quyền lớn, làm quyền lực kinh tế vượt khỏi phạm vi từng doanh nghiệp và đòi hỏi sự can thiệp sâu hơn của Nhà nước.",
          metric: "Tập trung sản xuất",
        },
        {
          title: "Tư nhân không muốn hoặc không đủ khả năng đầu tư",
          body: "Một số ngành cần lượng vốn rất lớn, thời gian thu hồi dài hoặc lợi nhuận thấp, khiến tư nhân không muốn hoặc không đủ khả năng đầu tư. Nhà nước phải trực tiếp đảm nhận hoặc hỗ trợ.",
          metric: "Khoảng trống đầu tư",
        },
        {
          title: "Giải quyết mâu thuẫn xã hội",
          body: "Khủng hoảng, thất nghiệp, phân hóa và bất ổn xã hội buộc Nhà nước can thiệp để điều tiết, làm dịu mâu thuẫn và duy trì sự ổn định của hệ thống.",
          metric: "Mâu thuẫn xã hội",
        },
        {
          title: "Quốc tế hóa đời sống kinh tế",
          body: "Thương mại, đầu tư và cạnh tranh vượt ra ngoài biên giới khiến Nhà nước phải hỗ trợ các tổ chức độc quyền trong nước và bảo vệ lợi ích của tư bản quốc gia trên thị trường thế giới.",
          metric: "Quốc tế hóa kinh tế",
        },
      ];
      let current = -1;
      function setStep(step) {
        const idx = Math.max(0, Math.min(states.length - 1, step));
        if (idx === current) return;
        current = idx;
        const state = states[idx];
        section.dataset.step = String(idx);
        section.classList.toggle("has-active", idx > 0);
        zones.forEach((zone) => zone.classList.toggle("active", Number(zone.dataset.step) === idx));
        nodes.forEach((node) => node.classList.toggle("active", Number(node.dataset.regStep) === idx));
        if (title) title.textContent = state.title;
        if (body) body.textContent = state.body;
        if (metric) metric.textContent = state.metric;
      }
      nodes.forEach((node) => {
        const step = Number(node.dataset.regStep || 0);
        node.addEventListener("mouseenter", () => setStep(step));
        node.addEventListener("focus", () => setStep(step));
        node.addEventListener("click", () => setStep(step));
      });
      setStep(0);
      if (hasST && !reduce) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.round(innerHeight * 2.05),
          pin: true,
          scrub: true,
          onUpdate: (self) => setStep(Math.round(self.progress * (states.length - 1))),
          onLeaveBack: () => setStep(0),
          onLeave: () => setStep(states.length - 1),
        });
      }
    })();

    /* -------- hotspot tooltips -------- */
    const tip = $("#tooltip");
    const tipT = tip ? $("strong", tip) : null;
    const tipB = tip ? $("p", tip) : null;
    const arrow = tip ? $(".tt-arrow", tip) : null;
    function showTip(btn) {
      if (!tip || !tipT || !tipB) return;
      const title = btn.dataset.title;
      if (!title) return;
      tipT.textContent = title;
      tipB.textContent = btn.dataset.body || "";
      tip.classList.add("show");
      const r = btn.getBoundingClientRect();
      const tw = tip.offsetWidth || 240;
      const th = tip.offsetHeight || 100;
      const left = Math.max(12, Math.min(r.left + r.width / 2 - 24, innerWidth - tw - 12));
      let top = r.top - th - 14;
      if (arrow) {
        if (top < 72) {
          top = r.bottom + 14;
          arrow.style.top = "-6px";
          arrow.style.bottom = "auto";
          arrow.style.transform = "rotate(225deg)";
        } else {
          arrow.style.bottom = "-6px";
          arrow.style.top = "auto";
          arrow.style.transform = "rotate(45deg)";
        }
      }
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    }
    function hideTip() {
      if (tip) tip.classList.remove("show");
    }
    $$(".hotspot[data-title]").forEach((btn) => {
      btn.addEventListener("mouseenter", () => showTip(btn));
      btn.addEventListener("mouseleave", hideTip);
      btn.addEventListener("focus", () => showTip(btn));
      btn.addEventListener("blur", hideTip);
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        showTip(btn);
        setTimeout(hideTip, 2800);
      });
    });

    /* -------- state network: light up the spoke tied to each node -------- */
    const netHotspots = $$(".net-hotspot");
    const netLines = $$(".net-line");
    if (netHotspots.length && netHotspots.length === netLines.length) {
      netHotspots.forEach((btn, i) => {
        const line = netLines[i];
        const on = () => line.classList.add("lit");
        const off = () => line.classList.remove("lit");
        btn.addEventListener("mouseenter", on);
        btn.addEventListener("mouseleave", off);
        btn.addEventListener("focus", on);
        btn.addEventListener("blur", off);
      });
    }

    /* -------- debate slider -------- */
    (function debate() {
      const range = $("#debateRange");
      const readout = $("#sliderReadout");
      const market = $("#marketSide");
      const state = $("#stateSide");
      const section = $(".privatization-balance");
      if (!range || !readout || !market || !state || !section) return;

      function update() {
        const v = +range.value;
        market.classList.remove("dim", "spot");
        state.classList.remove("dim", "spot");
        if (v <= 35) {
          market.classList.add("spot");
          state.classList.add("dim");
          readout.innerHTML =
            "Nghiêng về <b style='color:var(--electric)'>thị trường</b>: huy động thêm vốn và công nghệ, nhưng không thể giao luôn hạ tầng độc quyền tự nhiên.";
        } else if (v >= 65) {
          state.classList.add("spot");
          market.classList.add("dim");
          readout.innerHTML =
            "Nghiêng về <b style='color:var(--gold)'>Nhà nước</b>: bảo đảm an sinh và an ninh hệ thống, nhưng vẫn cần áp lực hiệu quả ở các khâu có thể cạnh tranh.";
        } else {
          readout.innerHTML =
            "Cân bằng: <b>Nhà nước giữ khâu cốt lõi, tư nhân tham gia khâu phù hợp</b> trong khuôn khổ kiểm soát giá, chất lượng và nghĩa vụ phục vụ.";
        }
      }
      range.addEventListener("input", update);
      update();
    })();

    if (hasST) ScrollTrigger.refresh();
    // ảnh (breakout/tile) load xong có thể đổi chiều cao → refresh lại để margin âm & pin khớp
    const onImgLoad = () => hasST && ScrollTrigger.refresh();
    addEventListener("load", onImgLoad);
    const refreshTimer = setTimeout(onImgLoad, 600);
    cleanups.push(() => {
      removeEventListener("load", onImgLoad);
      clearTimeout(refreshTimer);
    });

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch (e) {}
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);
}
