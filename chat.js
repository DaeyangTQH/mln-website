(function () {
  const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
  const MAX_HISTORY = 12;
  const MIN_SELECTION = 12; // ký tự tối thiểu để hiện nút hỏi-tại-chỗ

  const MODES = [
    { id: "default", label: "Trả lời nhanh", icon: "⚡", hint: "Trả lời trực tiếp, rõ ràng." },
    { id: "socratic", label: "Socratic", icon: "💡", hint: "AI hỏi ngược, gợi mở từng bước." },
    { id: "debate", label: "Phản biện", icon: "⚖", hint: "AI đóng vai phản biện học thuật." },
  ];

  let bubble; // gán khi React đã render (xem whenBubbleReady ở cuối file)

  let panel;
  let log;
  let form;
  let input;
  let sendButton;
  let pinnedBox;
  let history = [];
  let isOpen = false;
  let isSending = false;
  let currentMode = "default";
  let pinnedText = "";
  let selectionButton; // nút nổi "Hỏi đoạn này"

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderText(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function ensurePanel() {
    if (panel) return;

    panel = document.createElement("aside");
    panel.className = "rag-chat";
    panel.setAttribute("aria-label", "Trợ giảng AI MLN121");
    panel.innerHTML = `
      <div class="rag-chat-head">
        <div class="rag-chat-id">
          <span class="rag-chat-kicker">Trợ giảng AI</span>
          <span class="rag-chat-title-row"><strong>MLN121 AI</strong><span class="rag-chat-badge">Trợ giảng</span></span>
        </div>
        <button class="rag-chat-close" type="button" aria-label="Đóng trợ giảng"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="rag-tabs" role="tablist">
        <button type="button" class="rag-tab active" data-view="chat">Trò chuyện</button>
        <button type="button" class="rag-tab" data-view="summary">Tóm tắt</button>
        <button type="button" class="rag-tab" data-view="quiz">Quiz</button>
      </div>

      <section class="rag-view active" data-view="chat">
        <div class="rag-chat-log" role="log" aria-live="polite"></div>
        <div class="rag-pinned-box" hidden></div>
        <form class="rag-chat-form">
          <div class="rag-composer">
            <textarea rows="1" placeholder="Hỏi về độc quyền, điện, nước..." aria-label="Câu hỏi"></textarea>
            <div class="rag-composer-bar">
              <div class="rag-mode-wrap">
                <button type="button" class="rag-mode-trigger" aria-haspopup="menu" aria-expanded="false"><span class="rag-mode-ico">${MODES[0].icon}</span><span class="rag-mode-name">${MODES[0].label}</span><span class="rag-mode-caret">⌃</span></button>
                <div class="rag-mode-menu" role="menu" hidden>
                  <p class="rag-mode-menu-title">Chế độ trả lời</p>
                  ${MODES.map((m, i) => `<button type="button" class="rag-mode-item${i === 0 ? " active" : ""}" role="menuitemradio" aria-checked="${i === 0}" data-mode="${m.id}"><span class="rag-mode-item-ico">${m.icon}</span><span class="rag-mode-item-text"><strong>${m.label}</strong><small>${m.hint}</small></span><span class="rag-mode-check" aria-hidden="true">✓</span></button>`).join("")}
                </div>
              </div>
              <button type="submit" class="rag-send" aria-label="Gửi câu hỏi">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8-3-8Z"/><path d="M7 12h13"/></svg>
                <span class="rag-send-loader" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </form>
      </section>

      <section class="rag-view" data-view="summary">
        <div class="rag-tool-bar">
          <select class="rag-sum-scope" aria-label="Phạm vi tóm tắt"><option value="all">Cả bài</option></select>
          <div class="rag-seg" role="group" aria-label="Độ sâu">
            <button type="button" class="rag-seg-btn active" data-depth="short">Ngắn</button>
            <button type="button" class="rag-seg-btn" data-depth="detailed">Chi tiết</button>
          </div>
          <button type="button" class="rag-sum-run">Tóm tắt</button>
        </div>
        <div class="rag-sum-out rag-chat-log" aria-live="polite"><p class="rag-empty">Chọn phạm vi rồi bấm “Tóm tắt”. Map-reduce chạy trên cây cấu trúc bài học.</p></div>
      </section>

      <section class="rag-view" data-view="quiz">
        <div class="rag-tool-bar">
          <select class="rag-quiz-scope" aria-label="Phạm vi quiz"></select>
          <select class="rag-quiz-n" aria-label="Số câu">
            <option value="3">3 câu</option><option value="5" selected>5 câu</option><option value="8">8 câu</option>
          </select>
          <button type="button" class="rag-quiz-run">Tạo quiz</button>
        </div>
        <div class="rag-quiz-out rag-chat-log"><p class="rag-empty">Tạo bộ câu hỏi trắc nghiệm + tự luận từ một chương để ôn tập. AI chấm câu tự luận.</p></div>
      </section>

    `;
    document.body.appendChild(panel);

    log = panel.querySelector('.rag-view[data-view="chat"] .rag-chat-log');
    form = panel.querySelector(".rag-chat-form");
    input = panel.querySelector(".rag-chat-form textarea");
    sendButton = panel.querySelector(".rag-send");
    pinnedBox = panel.querySelector(".rag-pinned-box");

    const modeTrigger = panel.querySelector(".rag-mode-trigger");
    const modeMenu = panel.querySelector(".rag-mode-menu");
    modeTrigger.addEventListener("click", () => {
      modeMenu.hidden = !modeMenu.hidden;
      modeTrigger.setAttribute("aria-expanded", String(!modeMenu.hidden));
    });
    modeMenu.addEventListener("click", (event) => {
      const btn = event.target.closest(".rag-mode-item");
      if (!btn) return;
      currentMode = btn.dataset.mode;
      const meta = MODES.find((mode) => mode.id === currentMode) || MODES[0];
      modeTrigger.querySelector(".rag-mode-ico").textContent = meta.icon;
      modeTrigger.querySelector(".rag-mode-name").textContent = meta.label;
      modeMenu.querySelectorAll(".rag-mode-item").forEach((item) => item.classList.toggle("active", item === btn));
      modeMenu.hidden = true;
      modeTrigger.setAttribute("aria-expanded", "false");
      input.focus();
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".rag-mode-wrap")) {
        modeMenu.hidden = true;
        modeTrigger.setAttribute("aria-expanded", "false");
      }
    });
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
    });

    // Tab switching
    panel.querySelector(".rag-tabs").addEventListener("click", (event) => {
      const btn = event.target.closest(".rag-tab");
      if (!btn) return;
      const view = btn.dataset.view;
      panel.querySelectorAll(".rag-tab").forEach((b) => b.classList.toggle("active", b === btn));
      panel.querySelectorAll(".rag-view").forEach((v) => v.classList.toggle("active", v.dataset.view === view));
      if (view === "chat") input.focus();
    });

    wireSummary();
    wireQuiz();
    loadScopes();

    panel.querySelector(".rag-chat-close").addEventListener("click", closePanel);
    form.addEventListener("submit", submitQuestion);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    addMessage(
      "assistant",
      "Ta có thể trả lời dựa trên giáo trình, bản tổng hợp, Luật Điện lực và tài liệu về nguồn nước sạch."
    );
  }

  function openPanel() {
    ensurePanel();
    isOpen = true;
    panel.classList.add("open");
    bubble?.classList.add("active");
    bubble?.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input.focus(), 60);
  }

  function closePanel() {
    isOpen = false;
    panel?.classList.remove("open");
    bubble?.classList.remove("active");
    bubble?.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    if (isOpen) closePanel();
    else openPanel();
  }

  function addMessage(role, text) {
    const item = document.createElement("article");
    item.className = `rag-msg ${role}`;
    const mascotSrc = bubble?.querySelector(".cb-avatar")?.src || "";
    const avatar = role === "assistant"
      ? `<div class="rag-avatar" aria-hidden="true">${mascotSrc ? `<img src="${escapeHtml(mascotSrc)}" alt="">` : ""}</div>`
      : "";
    item.innerHTML = `${avatar}<div class="rag-msg-bubble">${renderText(text)}</div>`;
    log.appendChild(item);
    log.scrollTop = log.scrollHeight;
    return item.querySelector(".rag-msg-bubble");
  }

  function addSources(sources, warnings) {
    if ((!sources || !sources.length) && (!warnings || !warnings.length)) return;

    const box = document.createElement("div");
    box.className = "rag-sources";
    const sourceItems = (sources || [])
      .slice(0, 6)
      .map((source) => {
        const label = escapeHtml(source.label || "Nguồn");
        if (source.source_url) {
          return `<li><a href="${escapeHtml(source.source_url)}" target="_blank" rel="noreferrer">${label}</a></li>`;
        }
        return `<li>${label}</li>`;
      })
      .join("");
    const warningItems = (warnings || []).map((warning) => `<li>${escapeHtml(warning)}</li>`).join("");

    box.innerHTML = `
      ${sourceItems ? `<strong>Nguồn đã dùng</strong><ol>${sourceItems}</ol>` : ""}
      ${warningItems ? `<strong>Cảnh báo</strong><ul>${warningItems}</ul>` : ""}
    `;
    log.appendChild(box);
    log.scrollTop = log.scrollHeight;
  }

  function setSending(value) {
    isSending = value;
    sendButton.disabled = value;
    input.disabled = value;
    sendButton.classList.toggle("sending", value);
    sendButton.setAttribute("aria-label", value ? "Đang gửi" : "Gửi tin nhắn");
  }

  function parseSse(buffer, onEvent) {
    const parts = buffer.split("\n\n");
    const rest = parts.pop() || "";
    for (const part of parts) {
      const dataLines = part
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim());
      if (!dataLines.length) continue;
      try {
        onEvent(JSON.parse(dataLines.join("\n")));
      } catch (error) {
        console.warn("Invalid SSE payload", error);
      }
    }
    return rest;
  }

  async function submitQuestion(event) {
    event.preventDefault();
    if (isSending) return;

    const question = input.value.trim() || (pinnedText ? "Giải thích đoạn này giúp mình." : "");
    if (!question) return;

    const sentPinned = pinnedText;
    input.value = "";
    addMessage("user", sentPinned ? `“${sentPinned.slice(0, 120)}${sentPinned.length > 120 ? "…" : ""}”\n${question}` : question);
    clearPinned();
    const assistantBubble = addMessage("assistant", "");
    assistantBubble.classList.add("typing");
    setSending(true);

    let answer = "";
    let buffer = "";

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: history.filter((message) => message.content && message.content.trim()).slice(-MAX_HISTORY),
          mode: currentMode,
          pinned: sentPinned || null,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API trả HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        buffer = parseSse(buffer, (payload) => {
          if (payload.type === "token") {
            answer += payload.token;
            assistantBubble.classList.remove("typing");
            assistantBubble.innerHTML = renderText(answer);
            log.scrollTop = log.scrollHeight;
          }
          if (payload.type === "sources") {
            addSources(payload.sources, payload.warnings);
          }
          if (payload.type === "error") {
            throw new Error(payload.message || "API error");
          }
        });
      }

      if (!answer) {
        assistantBubble.classList.remove("typing");
        assistantBubble.textContent = "Không nhận được nội dung trả lời từ API.";
      }

      if (answer.trim()) {
        history.push({ role: "user", content: question }, { role: "assistant", content: answer });
        history = history.slice(-MAX_HISTORY);
      }
    } catch (error) {
      assistantBubble.classList.remove("typing");
      assistantBubble.innerHTML = renderText(
        `Chưa gọi được API. Kiểm tra backend đang chạy ở ${API_BASE}.\n${error.message || error}`
      );
    } finally {
      setSending(false);
      input.focus();
    }
  }

  // --- SSE helper dùng chung ---
  async function streamSse(url, body, onEvent) {
    const response = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok || !response.body) throw new Error(`API trả HTTP ${response.status}`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      buffer = parseSse(buffer, onEvent);
    }
  }

  // --- Nạp danh sách phạm vi (chương) ---
  async function loadScopes() {
    const sumSel = panel.querySelector(".rag-sum-scope");
    const quizSel = panel.querySelector(".rag-quiz-scope");
    try {
      const res = await fetch(`${API_BASE}/api/scopes`);
      const data = await res.json();
      const scopes = data.scopes || [];
      sumSel.innerHTML = scopes
        .map((s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.label)}</option>`)
        .join("");
      quizSel.innerHTML = scopes
        .filter((s) => s.id !== "all")
        .map((s) => `<option value="${escapeHtml(s.id)}"${s.id === "Chương 4" ? " selected" : ""}>${escapeHtml(s.label)}</option>`)
        .join("");
    } catch (error) {
      console.warn("Không nạp được scopes", error);
    }
  }

  // --- Tóm tắt đa tầng ---
  function wireSummary() {
    const seg = panel.querySelector('.rag-view[data-view="summary"] .rag-seg');
    let depth = "short";
    seg.addEventListener("click", (event) => {
      const btn = event.target.closest(".rag-seg-btn");
      if (!btn) return;
      depth = btn.dataset.depth;
      seg.querySelectorAll(".rag-seg-btn").forEach((b) => b.classList.toggle("active", b === btn));
    });
    panel.querySelector(".rag-sum-run").addEventListener("click", () => runSummary(depth));
  }

  async function runSummary(depth) {
    const out = panel.querySelector(".rag-sum-out");
    const runBtn = panel.querySelector(".rag-sum-run");
    const scope = panel.querySelector(".rag-sum-scope").value;
    runBtn.disabled = true;
    out.innerHTML = `<p class="rag-status">Đang chuẩn bị…</p><div class="rag-sum-body"></div>`;
    const statusEl = out.querySelector(".rag-status");
    const bodyEl = out.querySelector(".rag-sum-body");
    let text = "";
    try {
      await streamSse("/api/summarize", { scope, depth }, (payload) => {
        if (payload.type === "status") statusEl.textContent = payload.message;
        if (payload.type === "token") {
          text += payload.token;
          statusEl.style.display = "none";
          bodyEl.innerHTML = renderText(text);
          out.scrollTop = out.scrollHeight;
        }
        if (payload.type === "error") throw new Error(payload.message);
      });
      if (!text) statusEl.textContent = "Không nhận được tóm tắt.";
    } catch (error) {
      out.innerHTML = `<p class="rag-status">Lỗi: ${escapeHtml(error.message || String(error))}. Kiểm tra API ở ${API_BASE}.</p>`;
    } finally {
      runBtn.disabled = false;
    }
  }

  // --- Quiz / flashcard ---
  function wireQuiz() {
    panel.querySelector(".rag-quiz-run").addEventListener("click", runQuiz);
  }

  async function runQuiz() {
    const out = panel.querySelector(".rag-quiz-out");
    const runBtn = panel.querySelector(".rag-quiz-run");
    const scope = panel.querySelector(".rag-quiz-scope").value;
    const n = Number(panel.querySelector(".rag-quiz-n").value) || 5;
    runBtn.disabled = true;
    runBtn.textContent = "Đang tạo…";
    out.innerHTML = `<p class="rag-status">Đang sinh câu hỏi từ ${escapeHtml(scope)}…</p>`;
    try {
      const res = await fetch(`${API_BASE}/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, n }),
      });
      const data = await res.json();
      if (data.error || !(data.questions || []).length) {
        out.innerHTML = `<p class="rag-status">${escapeHtml(data.error || "Không tạo được câu hỏi.")}</p>`;
        return;
      }
      renderQuiz(out, data.questions);
    } catch (error) {
      out.innerHTML = `<p class="rag-status">Lỗi: ${escapeHtml(error.message || String(error))}. Kiểm tra API ở ${API_BASE}.</p>`;
    } finally {
      runBtn.disabled = false;
      runBtn.textContent = "Tạo quiz";
    }
  }

  function renderQuiz(out, questions) {
    out.innerHTML = "";
    questions.forEach((q, i) => {
      const card = document.createElement("article");
      card.className = "rag-q";
      const src = `${escapeHtml(q.source_label || "Nguồn")} · tr.${q.page_start}${q.page_end && q.page_end !== q.page_start ? "-" + q.page_end : ""}`;
      if (q.kind === "mcq" && Array.isArray(q.options)) {
        card.innerHTML = `
          <p class="rag-q-title"><span>Câu ${i + 1}</span> ${renderText(q.question)}</p>
          <div class="rag-q-options">${q.options
            .map((opt, oi) => `<button type="button" class="rag-opt" data-i="${oi}">${escapeHtml(String.fromCharCode(65 + oi))}. ${escapeHtml(opt)}</button>`)
            .join("")}</div>
          <div class="rag-q-feedback" hidden></div>
          <p class="rag-q-src">${src}</p>`;
        const fb = card.querySelector(".rag-q-feedback");
        card.querySelector(".rag-q-options").addEventListener("click", (event) => {
          const btn = event.target.closest(".rag-opt");
          if (!btn) return;
          const chosen = Number(btn.dataset.i);
          card.querySelectorAll(".rag-opt").forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.answer_index) b.classList.add("correct");
            else if (bi === chosen) b.classList.add("wrong");
          });
          fb.hidden = false;
          fb.innerHTML = `<strong>${chosen === q.answer_index ? "✓ Đúng" : "✗ Chưa đúng"}</strong>${q.explanation ? "<br>" + renderText(q.explanation) : ""}`;
        });
      } else {
        card.innerHTML = `
          <p class="rag-q-title"><span>Câu ${i + 1}</span> ${renderText(q.question)}</p>
          <textarea class="rag-q-answer" rows="3" placeholder="Nhập câu trả lời của bạn…"></textarea>
          <button type="button" class="rag-q-grade">Chấm</button>
          <div class="rag-q-feedback" hidden></div>
          <p class="rag-q-src">${src}</p>`;
        const gradeBtn = card.querySelector(".rag-q-grade");
        const fb = card.querySelector(".rag-q-feedback");
        gradeBtn.addEventListener("click", async () => {
          const answer = card.querySelector(".rag-q-answer").value.trim();
          if (!answer) return;
          gradeBtn.disabled = true;
          gradeBtn.textContent = "Đang chấm…";
          try {
            const res = await fetch(`${API_BASE}/api/grade`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                question: q.question,
                user_answer: answer,
                source_text: q.source_text,
                key_points: q.key_points || [],
              }),
            });
            const g = await res.json();
            fb.hidden = false;
            const miss = (g.missing || []).length ? `<br>Còn thiếu: ${(g.missing || []).map(escapeHtml).join("; ")}` : "";
            fb.innerHTML = `<strong>Điểm: ${g.score ?? "?"}/10 (${escapeHtml(g.verdict || "")})</strong><br>${renderText(g.feedback || "")}${miss}`;
          } catch (error) {
            fb.hidden = false;
            fb.textContent = `Lỗi chấm: ${error.message || error}`;
          } finally {
            gradeBtn.disabled = false;
            gradeBtn.textContent = "Chấm";
          }
        });
      }
      out.appendChild(card);
    });
  }

  // --- Hỏi-tại-chỗ: ghim đoạn text ---

  function renderPinned() {
    if (!pinnedBox) return;
    if (!pinnedText) {
      pinnedBox.hidden = true;
      pinnedBox.innerHTML = "";
      return;
    }
    pinnedBox.hidden = false;
    const preview = pinnedText.length > 180 ? `${pinnedText.slice(0, 180)}…` : pinnedText;
    pinnedBox.innerHTML = `
      <div class="rag-pinned-head">
        <span class="rag-pinned-label"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M14 2l8 8-3 1-4 4-1 5-2-2-4 4-1-1 4-4-2-2 5-1 4-4 1-3z"/></svg>Đoạn đã ghim</span>
        <button class="rag-pinned-clear" type="button" aria-label="Bỏ ghim đoạn ngữ cảnh"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <p class="rag-pinned-text">${renderText(preview)}</p>
    `;
    pinnedBox.querySelector(".rag-pinned-clear").addEventListener("click", clearPinned);
  }

  function setPinned(text) {
    pinnedText = (text || "").trim();
    renderPinned();
  }

  function clearPinned() {
    pinnedText = "";
    renderPinned();
  }

  function askAboutSelection(text) {
    ensurePanel();
    setPinned(text);
    openPanel();
    input.placeholder = "Hỏi gì về đoạn đã ghim? (để trống = giải thích)";
  }

  // Nút nổi xuất hiện khi bôi đen text trong nội dung slide.
  function ensureSelectionButton() {
    if (selectionButton) return;
    selectionButton = document.createElement("button");
    selectionButton.type = "button";
    selectionButton.className = "rag-ask-selection";
    selectionButton.textContent = "Hỏi đoạn này";
    selectionButton.hidden = true;
    selectionButton.addEventListener("mousedown", (event) => {
      // giữ selection: xử lý trước khi selection bị xoá bởi click
      event.preventDefault();
    });
    selectionButton.addEventListener("click", () => {
      const text = selectionButton.dataset.text || "";
      hideSelectionButton();
      if (text) askAboutSelection(text);
    });
    document.body.appendChild(selectionButton);
  }

  function hideSelectionButton() {
    if (selectionButton) selectionButton.hidden = true;
  }

  function isInsideChat(node) {
    if (!node) return false;
    const el = node.nodeType === 1 ? node : node.parentElement;
    return !!(el && el.closest(".rag-chat"));
  }

  function handleSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      hideSelectionButton();
      return;
    }
    const text = selection.toString().trim();
    if (text.length < MIN_SELECTION || isInsideChat(selection.anchorNode)) {
      hideSelectionButton();
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect.width && !rect.height) {
      hideSelectionButton();
      return;
    }
    ensureSelectionButton();
    selectionButton.dataset.text = text;
    selectionButton.hidden = false;
    const top = window.scrollY + rect.top - 44;
    const left = window.scrollX + rect.left + rect.width / 2;
    selectionButton.style.top = `${Math.max(window.scrollY + 8, top)}px`;
    selectionButton.style.left = `${left}px`;
  }

  document.addEventListener("mouseup", () => window.setTimeout(handleSelection, 10));
  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) hideSelectionButton();
  });
  document.addEventListener("scroll", hideSelectionButton, { passive: true });

  // Nút bong bóng do React render bất đồng bộ, nên chờ nó xuất hiện rồi mới gắn.
  function initBubble(el) {
    bubble = el;
    bubble.setAttribute("aria-expanded", "false");
    bubble.addEventListener("click", togglePanel);
  }

  function whenBubbleReady() {
    const existing = document.querySelector(".chat-bubble");
    if (existing) {
      initBubble(existing);
      return;
    }
    const observer = new MutationObserver(() => {
      const el = document.querySelector(".chat-bubble");
      if (el) {
        observer.disconnect();
        initBubble(el);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  whenBubbleReady();
})();
