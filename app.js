(() => {
  const DATASETS = [window.EMBEDDED_QUIZ_DATA, window.COMPONENT_QUIZ_DATA].filter(Boolean);
  const EXAM_DATA = window.EXAM_QUIZ_DATA || null;
  const STORAGE_KEY = "embedded-quiz-progress-v1";
  const STUDY_SESSION_KEY = "embedded-quiz-study-session-v1";
  const ACTIVE_SECTION_KEY = "embedded-quiz-active-section";
  const THEME_KEY = "embedded-quiz-theme";
  const APP_NOTICE = "Lưu ý : Bộ câu hỏi này chỉ mang tính chất tham khảo, ôn tập, không phải đề đã thi hay chính thức";
  const app = document.querySelector("#app");
  const letters = ["A", "B", "C", "D"];

  if (!DATASETS.length) {
    app.innerHTML = `<main class="main"><section class="empty-state">Chưa có dữ liệu học tập.</section></main>`;
    return;
  }

  let progress = loadProgress();
  let activeSectionId = localStorage.getItem(ACTIVE_SECTION_KEY) || DATASETS[0].section.id;
  let activeTheme = loadTheme();
  let route = { name: "chapters" };
  let session = null;

  applyTheme(activeTheme);

  if (!datasetById(activeSectionId) && !isExamSection(activeSectionId)) activeSectionId = DATASETS[0].section.id;

  function datasetById(id) {
    return DATASETS.find((data) => data.section.id === id);
  }

  function isExamSection(id = activeSectionId) {
    return Boolean(EXAM_DATA && EXAM_DATA.section.id === id);
  }

  function activeData() {
    return datasetById(activeSectionId) || DATASETS[0];
  }

  function activeSectionInfo() {
    return isExamSection() ? EXAM_DATA.section : activeData().section;
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { answers: {}, lastSet: {}, examAttempts: {} };
      const parsed = JSON.parse(raw);
      return {
        answers: parsed.answers || {},
        lastSet: parsed.lastSet || {},
        examAttempts: parsed.examAttempts || {}
      };
    } catch {
      return { answers: {}, lastSet: {}, examAttempts: {} };
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function datasetForChapter(chapterId) {
    return DATASETS.find((data) => data.chapters.some((chapter) => chapter.id === chapterId));
  }

  function loadTheme() {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    activeTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = activeTheme;
  }

  function setTheme(theme) {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, activeTheme);
    render();
  }

  function pct(value, total) {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  }

  function allQuestions(data = activeData()) {
    return data.chapters.flatMap((chapter) => chapter.questions);
  }

  function chapterById(id, data = activeData()) {
    return data.chapters.find((chapter) => chapter.id === id);
  }

  function questionById(chapter, id) {
    return chapter.questions.find((question) => question.id === id);
  }

  function normalizeStudySession(value) {
    if (!value || !["set", "review"].includes(value.mode)) return null;
    const data = datasetById(value.sectionId) || datasetForChapter(value.chapterId);
    const chapter = data?.chapters.find((item) => item.id === value.chapterId);
    if (!data || !chapter) return null;

    const validIds = new Set(chapter.questions.map((question) => question.id));
    const queue = Array.isArray(value.queue)
      ? value.queue.filter((id) => validIds.has(id))
      : [];
    if (!queue.length) return null;

    const pointerValue = Number(value.pointer);
    const pointer = Math.min(Math.max(Number.isFinite(pointerValue) ? Math.trunc(pointerValue) : 0, 0), queue.length - 1);
    const question = questionById(chapter, queue[pointer]);
    if (!question) return null;

    const selected = Number.isInteger(value.selected) && value.selected >= 0 && value.selected < question.choices.length
      ? value.selected
      : null;
    const checked = Boolean(value.checked) && selected !== null;
    const setIndexValue = Number(value.setIndex);
    const setIndex = value.mode === "set"
      ? Math.min(Math.max(Number.isFinite(setIndexValue) ? Math.trunc(setIndexValue) : 0, 0), 9)
      : null;
    const startedIds = Array.isArray(value.startedIds)
      ? [...new Set(value.startedIds.filter((id) => validIds.has(id)))]
      : [...new Set(queue)];

    return {
      mode: value.mode,
      sectionId: data.section.id,
      chapterId: chapter.id,
      setIndex,
      queue,
      pointer,
      selected,
      checked,
      lastResult: checked && typeof value.lastResult === "boolean" ? value.lastResult : null,
      startedIds: startedIds.length ? startedIds : [...new Set(queue)],
      autoResume: value.autoResume !== false,
      savedAt: value.savedAt || new Date().toISOString()
    };
  }

  function loadStudySession() {
    try {
      const raw = localStorage.getItem(STUDY_SESSION_KEY);
      if (!raw) return null;
      const normalized = normalizeStudySession(JSON.parse(raw));
      if (!normalized) localStorage.removeItem(STUDY_SESSION_KEY);
      return normalized;
    } catch {
      localStorage.removeItem(STUDY_SESSION_KEY);
      return null;
    }
  }

  function saveStudySession(autoResume = true) {
    if (!session || !["set", "review"].includes(session.mode)) return;
    const normalized = normalizeStudySession({
      ...session,
      sectionId: activeSectionId,
      autoResume,
      savedAt: new Date().toISOString()
    });
    if (!normalized) return;
    localStorage.setItem(STUDY_SESSION_KEY, JSON.stringify(normalized));
  }

  function clearStudySession() {
    localStorage.removeItem(STUDY_SESSION_KEY);
  }

  function savedStudySessionForChapter(chapterId) {
    const saved = loadStudySession();
    return saved?.chapterId === chapterId ? saved : null;
  }

  function savedStudySessionForSet(chapterId, setIndex) {
    const saved = savedStudySessionForChapter(chapterId);
    return saved?.mode === "set" && saved.setIndex === setIndex ? saved : null;
  }

  function resumeStudySession(saved = loadStudySession(), autoResume = true) {
    const normalized = normalizeStudySession(saved);
    if (!normalized) return false;
    activeSectionId = normalized.sectionId;
    localStorage.setItem(ACTIVE_SECTION_KEY, activeSectionId);
    session = { ...normalized, autoResume };
    if (session.mode === "set") {
      progress.lastSet[session.chapterId] = session.setIndex;
      saveProgress();
    }
    route = { name: "quiz" };
    saveStudySession(autoResume);
    render();
    return true;
  }

  function restoreStudySessionOnLoad() {
    const saved = loadStudySession();
    if (!saved?.autoResume || saved.sectionId !== activeSectionId) return false;
    session = saved;
    route = { name: "quiz" };
    return true;
  }

  function getAnswer(questionId) {
    return progress.answers[questionId] || { attempts: 0, wrongCount: 0, correctEver: false };
  }

  function chapterStats(chapter) {
    const total = chapter.questions.length;
    const correct = chapter.questions.filter((question) => getAnswer(question.id).correctEver).length;
    const attempts = chapter.questions.reduce((sum, question) => sum + getAnswer(question.id).attempts, 0);
    const wrong = chapter.questions.reduce((sum, question) => sum + getAnswer(question.id).wrongCount, 0);
    return { total, correct, attempts, wrong, percent: pct(correct, total) };
  }

  function setStats(chapter, setIndex) {
    const questions = chapter.questions.filter((question) => question.setIndex === setIndex);
    const correct = questions.filter((question) => getAnswer(question.id).correctEver).length;
    const attempts = questions.reduce((sum, question) => sum + getAnswer(question.id).attempts, 0);
    return { total: questions.length, correct, attempts, percent: pct(correct, questions.length) };
  }

  function globalStats(data = activeData()) {
    const questions = allQuestions(data);
    const correct = questions.filter((question) => getAnswer(question.id).correctEver).length;
    const attempts = questions.reduce((sum, question) => sum + getAnswer(question.id).attempts, 0);
    const wrong = questions.reduce((sum, question) => sum + getAnswer(question.id).wrongCount, 0);
    return { total: questions.length, correct, attempts, wrong, percent: pct(correct, questions.length) };
  }

  function recordAnswer(question, choiceIndex, isCorrect) {
    const current = getAnswer(question.id);
    progress.answers[question.id] = {
      attempts: current.attempts + 1,
      wrongCount: current.wrongCount + (isCorrect ? 0 : 1),
      correctEver: current.correctEver || isCorrect,
      lastCorrect: isCorrect,
      lastChoice: choiceIndex,
      updatedAt: new Date().toISOString()
    };
    saveProgress();
  }

  function switchSection(sectionId) {
    if (session?.mode === "set" || session?.mode === "review") saveStudySession(false);
    if (isExamSection(sectionId)) {
      activeSectionId = sectionId;
      localStorage.setItem(ACTIVE_SECTION_KEY, activeSectionId);
      route = { name: "exams" };
      session = null;
      render();
      return;
    }
    if (!datasetById(sectionId)) return;
    activeSectionId = sectionId;
    localStorage.setItem(ACTIVE_SECTION_KEY, activeSectionId);
    route = { name: "chapters" };
    session = null;
    render();
  }

  function resetActiveProgress(data) {
    const questionIds = new Set(allQuestions(data).map((question) => question.id));
    const chapterIds = new Set(data.chapters.map((chapter) => chapter.id));

    Object.keys(progress.answers).forEach((id) => {
      if (questionIds.has(id)) delete progress.answers[id];
    });
    Object.keys(progress.lastSet).forEach((id) => {
      if (chapterIds.has(id)) delete progress.lastSet[id];
    });
    const saved = loadStudySession();
    if (saved && chapterIds.has(saved.chapterId)) clearStudySession();
    saveProgress();
  }

  function shell(content) {
    const tabs = DATASETS.map((dataset) => `
      <button class="tab-button ${dataset.section.id === activeSectionId ? "active" : ""}" data-section="${dataset.section.id}">
        ${escapeHtml(dataset.section.title)}
      </button>
    `).join("");
    const examTab = EXAM_DATA
      ? `
        <button class="tab-button ${isExamSection() ? "active" : ""}" data-section="${EXAM_DATA.section.id}">
          ${escapeHtml(EXAM_DATA.section.title)}
        </button>
      `
      : `<button class="tab-button" disabled>Đề thi</button>`;
    const themeToggle = `
      <div class="theme-switch" role="group" aria-label="Chọn giao diện sáng hoặc tối">
        <button class="theme-option ${activeTheme === "light" ? "active" : ""}" data-theme-choice="light" aria-pressed="${activeTheme === "light"}" title="Giao diện sáng">
          ${themeIcon("sun")}
          <span class="sr-only">Giao diện sáng</span>
        </button>
        <button class="theme-option ${activeTheme === "dark" ? "active" : ""}" data-theme-choice="dark" aria-pressed="${activeTheme === "dark"}" title="Giao diện tối">
          ${themeIcon("moon")}
          <span class="sr-only">Giao diện tối</span>
        </button>
      </div>
    `;

    app.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="topbar-inner">
            <div class="brand">
              <h1 class="brand-title">Quiz hệ thống nhúng</h1>
              <span class="brand-subtitle">${APP_NOTICE}</span>
            </div>
            <nav class="section-tabs" aria-label="Các phần học">
              ${tabs}
              ${examTab}
            </nav>
            ${themeToggle}
          </div>
        </header>
        <main class="main">${content}</main>
      </div>
    `;

    app.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => switchSection(button.dataset.section));
    });

    app.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
    });
  }

  function themeIcon(type) {
    if (type === "sun") {
      return `
        <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
    }
    return `
      <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.99 12.36A8.5 8.5 0 1 1 11.64 3.01a6.5 6.5 0 0 0 9.35 9.35Z"></path>
      </svg>
    `;
  }

  function progressBar(percent) {
    return `<div class="progress" aria-label="Tiến độ ${percent}%"><span style="width:${percent}%"></span></div>`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function chapterActions(chapter) {
    if (chapter.lessonSlides?.length) {
      return `
        <button class="ghost-button" data-open-lesson="${chapter.id}">Bài giảng</button>
        <button class="primary-button" data-open-chapter="${chapter.id}">Luyện tập</button>
      `;
    }
    return `<button class="primary-button" data-open-chapter="${chapter.id}">Mở chương</button>`;
  }

  function renderChapters() {
    const data = activeData();
    const stats = globalStats(data);
    const cards = data.chapters.map((chapter) => {
      const chapterProgress = chapterStats(chapter);
      return `
        <article class="chapter-card">
          <div class="chapter-top">
            <div>
              <h3 class="chapter-title">${escapeHtml(chapter.title)}</h3>
              <p class="chapter-subtitle">${escapeHtml(chapter.subtitle)}</p>
            </div>
            <span class="pill teal">${escapeHtml(chapter.sourceRange)}</span>
          </div>
          ${progressBar(chapterProgress.percent)}
          <div class="card-footer">
            <span class="metric-note">${chapterProgress.correct}/${chapterProgress.total} câu đã chắc</span>
            <div class="toolbar-actions">${chapterActions(chapter)}</div>
          </div>
        </article>
      `;
    }).join("");

    shell(`
      <section class="summary-band">
        <div class="summary-panel">
          <span class="metric-label">Tổng tiến độ</span>
          <span class="metric-value">${stats.percent}%</span>
          <span class="metric-note">${stats.correct}/${stats.total} câu đã trả lời đúng ít nhất một lần</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Chương</span>
          <span class="metric-value">${data.chapters.length}</span>
          <span class="metric-note">100 câu/chương</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Lượt làm</span>
          <span class="metric-value">${stats.attempts}</span>
          <span class="metric-note">Tính cả câu ôn lại</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Câu sai</span>
          <span class="metric-value">${stats.wrong}</span>
          <span class="metric-note">Đã được ghi nhận</span>
        </div>
      </section>
      <section class="section-header">
        <div>
          <h2 class="section-title">${escapeHtml(data.section.title)}</h2>
          <div class="section-meta">${data.chapters.length} chương, mỗi chương 10 bộ nhỏ.</div>
        </div>
        <div class="toolbar-actions">
          <button class="ghost-button" data-reset-progress>Đặt lại tiến độ</button>
        </div>
      </section>
      <section class="chapters-grid">${cards}</section>
    `);

    app.querySelectorAll("[data-open-chapter]").forEach((button) => {
      button.addEventListener("click", () => {
        route = { name: "chapter", chapterId: button.dataset.openChapter };
        render();
      });
    });

    app.querySelectorAll("[data-open-lesson]").forEach((button) => {
      button.addEventListener("click", () => startLesson(button.dataset.openLesson, 0));
    });

    app.querySelector("[data-reset-progress]")?.addEventListener("click", () => {
      if (!confirm(`Đặt lại toàn bộ tiến độ phần ${data.section.title}?`)) return;
      resetActiveProgress(data);
      render();
    });
  }

  function renderChapter() {
    const chapter = chapterById(route.chapterId);
    if (!chapter) {
      route = { name: "chapters" };
      render();
      return;
    }

    const stats = chapterStats(chapter);
    const savedSession = savedStudySessionForChapter(chapter.id);
    const reviewIds = chapter.questions
      .filter((question) => getAnswer(question.id).wrongCount > 0)
      .map((question) => question.id);
    const lessonButton = chapter.lessonSlides?.length
      ? `<button class="ghost-button" data-open-lesson="${chapter.id}">Bài giảng</button>`
      : "";
    const setButtons = Array.from({ length: 10 }, (_, setIndex) => {
      const set = setStats(chapter, setIndex);
      const savedSet = savedSession?.mode === "set" && savedSession.setIndex === setIndex ? savedSession : null;
      return `
        <button class="set-button ${set.percent === 100 ? "done" : ""} ${savedSet ? "in-progress" : ""}" data-start-set="${setIndex}">
          <span class="set-title-row">
            <span class="set-title">Bộ ${setIndex + 1}</span>
            <span class="set-percent">${set.percent}%</span>
          </span>
          ${progressBar(set.percent)}
          <span class="metric-note">${set.correct}/${set.total} câu đã chắc</span>
          ${savedSet ? `<span class="resume-note">Đang dở: lượt ${savedSet.pointer + 1}/${savedSet.queue.length}</span>` : ""}
        </button>
      `;
    }).join("");
    const continueButton = savedSession
      ? `<button class="primary-button" data-resume-study>Tiếp tục lượt ${savedSession.pointer + 1}/${savedSession.queue.length}</button>`
      : `<button class="primary-button" data-start-set="${progress.lastSet[chapter.id] || 0}">Học tiếp</button>`;

    shell(`
      <section class="section-header">
        <div>
          <button class="ghost-button" data-back>Trở lại</button>
          <h2 class="section-title with-back">${escapeHtml(chapter.title)}</h2>
          <div class="section-meta">${escapeHtml(chapter.subtitle)}</div>
        </div>
        <div class="toolbar-actions">
          <span class="pill teal">${escapeHtml(chapter.sourceRange)}</span>
          <span class="pill amber">${stats.percent}% hoàn thành</span>
        </div>
      </section>
      <section class="chapter-layout">
        <aside class="set-panel">
          <span class="metric-label">Tiến độ chương</span>
          <span class="metric-value">${stats.percent}%</span>
          <span class="metric-note">${stats.correct}/${stats.total} câu đã đúng</span>
          <div class="progress-wrap">${progressBar(stats.percent)}</div>
          <div class="toolbar-actions action-stack">
            ${lessonButton}
            ${continueButton}
            <button class="ghost-button" data-review ${reviewIds.length ? "" : "disabled"}>Ôn câu sai</button>
          </div>
        </aside>
        <section class="set-panel">
          <div class="set-list">${setButtons}</div>
        </section>
      </section>
    `);

    app.querySelector("[data-back]")?.addEventListener("click", () => {
      route = { name: "chapters" };
      render();
    });

    app.querySelector("[data-open-lesson]")?.addEventListener("click", () => startLesson(chapter.id, 0));
    app.querySelector("[data-resume-study]")?.addEventListener("click", () => resumeStudySession(savedSession));

    app.querySelectorAll("[data-start-set]").forEach((button) => {
      button.addEventListener("click", () => startSet(chapter.id, Number(button.dataset.startSet)));
    });

    app.querySelector("[data-review]")?.addEventListener("click", () => startReview(chapter.id, reviewIds));
  }

  function startLesson(chapterId, slideIndex) {
    const chapter = chapterById(chapterId);
    if (!chapter?.lessonSlides?.length) {
      route = { name: "chapter", chapterId };
      render();
      return;
    }
    route = {
      name: "lesson",
      chapterId,
      slideIndex: Math.min(Math.max(slideIndex, 0), chapter.lessonSlides.length - 1)
    };
    session = null;
    render();
  }

  function renderLesson() {
    const chapter = chapterById(route.chapterId);
    if (!chapter?.lessonSlides?.length) {
      route = { name: "chapters" };
      render();
      return;
    }

    const slideIndex = Math.min(Math.max(route.slideIndex || 0, 0), chapter.lessonSlides.length - 1);
    const slide = chapter.lessonSlides[slideIndex];
    const visual = slide.visualHtml
      ? slide.visualHtml
      : `
        <figure class="official-figure">
          <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.imageAlt || slide.title)}" loading="eager" />
          <figcaption>${escapeHtml(slide.imageAlt || slide.title)}</figcaption>
        </figure>
      `;
    const paragraphs = (slide.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const keyPoints = (slide.keyPoints || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("");
    const source = slide.sourceUrl
      ? `<a class="source-link" href="${escapeHtml(slide.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(slide.source)}</a>`
      : `<span class="source-link">${escapeHtml(slide.source || chapter.sourceRange)}</span>`;

    shell(`
      <section class="lesson-shell">
        <div class="lesson-head">
          <div>
            <button class="ghost-button" data-back-chapter>Về chương</button>
            <h2 class="section-title with-back">${escapeHtml(chapter.title)}</h2>
            <div class="section-meta">Slide ${slideIndex + 1}/${chapter.lessonSlides.length}</div>
          </div>
          <div class="toolbar-actions">
            <button class="ghost-button" data-prev-slide ${slideIndex === 0 ? "disabled" : ""}>Trước</button>
            <button class="primary-button" data-next-slide>${slideIndex === chapter.lessonSlides.length - 1 ? "Luyện tập" : "Tiếp"}</button>
          </div>
        </div>

        <article class="lesson-frame">
          <div class="lesson-title-row">
            <span class="pill teal">Bài giảng</span>
            <span class="pill">${slideIndex + 1}/${chapter.lessonSlides.length}</span>
          </div>
          <h3 class="lesson-title">${escapeHtml(slide.title)}</h3>
          <p class="lesson-lead">${escapeHtml(slide.lead)}</p>
          <div class="lesson-layout">
            <div class="slide-canvas">
              <div class="slide-visual">${visual}</div>
            </div>
            <aside class="lesson-text">
              <div class="lesson-paragraphs">${paragraphs}</div>
              <ul class="key-points">${keyPoints}</ul>
              <div class="lesson-source">Nguồn: ${source}</div>
            </aside>
          </div>
        </article>
      </section>
    `);

    app.querySelector("[data-back-chapter]")?.addEventListener("click", () => {
      route = { name: "chapter", chapterId: chapter.id };
      render();
    });

    app.querySelector("[data-prev-slide]")?.addEventListener("click", () => startLesson(chapter.id, slideIndex - 1));
    app.querySelector("[data-next-slide]")?.addEventListener("click", () => {
      if (slideIndex === chapter.lessonSlides.length - 1) startSet(chapter.id, progress.lastSet[chapter.id] || 0);
      else startLesson(chapter.id, slideIndex + 1);
    });
  }

  function startSet(chapterId, setIndex, options = {}) {
    const chapter = chapterById(chapterId);
    if (!chapter) return;
    const safeSetIndex = Math.min(Math.max(setIndex, 0), 9);
    if (!options.restart) {
      const saved = savedStudySessionForSet(chapter.id, safeSetIndex);
      if (saved) {
        resumeStudySession(saved);
        return;
      }
    }
    const queue = chapter.questions
      .filter((question) => question.setIndex === safeSetIndex)
      .map((question) => question.id);
    progress.lastSet[chapterId] = safeSetIndex;
    saveProgress();
    session = {
      mode: "set",
      chapterId,
      setIndex: safeSetIndex,
      queue,
      pointer: 0,
      selected: null,
      checked: false,
      lastResult: null,
      startedIds: [...queue]
    };
    route = { name: "quiz" };
    saveStudySession(true);
    render();
  }

  function startReview(chapterId, ids, options = {}) {
    const saved = savedStudySessionForChapter(chapterId);
    if (!options.restart && saved?.mode === "review") {
      resumeStudySession(saved);
      return;
    }
    const queue = ids.slice(0, 20);
    if (!queue.length) return;
    session = {
      mode: "review",
      chapterId,
      setIndex: null,
      queue,
      pointer: 0,
      selected: null,
      checked: false,
      lastResult: null,
      startedIds: [...queue]
    };
    route = { name: "quiz" };
    saveStudySession(true);
    render();
  }

  function scheduleAgain(questionId) {
    const futureIndex = Math.min(session.pointer + 3, session.queue.length);
    const alreadyScheduled = session.queue.indexOf(questionId, session.pointer + 1) !== -1;
    if (!alreadyScheduled) session.queue.splice(futureIndex, 0, questionId);
  }

  function currentQuestion() {
    const chapter = chapterById(session.chapterId);
    return chapter ? questionById(chapter, session.queue[session.pointer]) : null;
  }

  function submitCurrent() {
    if (session.selected === null || session.checked) return;
    const question = currentQuestion();
    const isCorrect = question.choices[session.selected].correct;
    recordAnswer(question, session.selected, isCorrect);
    if (!isCorrect) scheduleAgain(question.id);
    session.checked = true;
    session.lastResult = isCorrect;
    saveStudySession(true);
    render();
  }

  function nextQuestion() {
    if (session.pointer >= session.queue.length - 1) {
      route = { name: "finish" };
      clearStudySession();
      render();
      return;
    }
    session.pointer += 1;
    session.selected = null;
    session.checked = false;
    session.lastResult = null;
    saveStudySession(true);
    render();
  }

  function renderQuiz() {
    if (!session) {
      route = { name: "chapters" };
      render();
      return;
    }
    const chapter = chapterById(session.chapterId);
    const question = currentQuestion();
    if (!chapter || !question) {
      clearStudySession();
      session = null;
      route = { name: "chapters" };
      render();
      return;
    }
    const progressInSession = pct(session.pointer + 1, session.queue.length);
    const choices = question.choices.map((choice, index) => {
      const selected = session.selected === index;
      const checkedClass = session.checked && choice.correct ? "correct" : "";
      const wrongClass = session.checked && selected && !choice.correct ? "wrong" : "";
      return `
        <button class="choice-button ${selected ? "selected" : ""} ${checkedClass} ${wrongClass}" data-choice="${index}" ${session.checked ? "disabled" : ""}>
          <span class="choice-letter">${letters[index]}</span>
          <span class="choice-text">${escapeHtml(choice.text)}</span>
        </button>
      `;
    }).join("");

    const feedback = session.checked ? `
      <section class="feedback ${session.lastResult ? "good" : "bad"}">
        <h3 class="feedback-title">${session.lastResult ? "Đúng" : "Chưa đúng"}</h3>
        <div>${session.lastResult ? "Câu này đã được ghi nhận." : "Đã xếp câu này quay lại sau vài lượt."}</div>
        <div class="explain-list">
          ${question.choices.map((choice, index) => `
            <div class="explain-item">
              <strong>${letters[index]}. ${choice.correct ? "Đáp án đúng" : "Không chọn"}</strong>
              <span>${escapeHtml(choice.reason)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    ` : "";

    shell(`
      <section class="quiz-shell">
        <div class="quiz-panel">
          <div class="quiz-head">
            <div class="quiz-kicker">
              <button class="icon-button" data-exit-quiz title="Thoát">←</button>
              <span class="pill teal">${escapeHtml(question.type)}</span>
              <span class="pill">${escapeHtml(question.source)}</span>
            </div>
            <span class="question-count">Lượt ${session.pointer + 1}/${session.queue.length}</span>
          </div>
          ${progressBar(progressInSession)}
          <h2 class="question-title">${escapeHtml(question.stem)}</h2>
          <section class="choices">${choices}</section>
          ${feedback}
          <div class="quiz-actions">
            <span class="metric-note">${escapeHtml(chapter.title)}${session.mode === "set" ? ` · Bộ ${session.setIndex + 1}` : " · Ôn câu sai"}</span>
            <div class="toolbar-actions">
              <button class="ghost-button" data-skip ${session.checked ? "" : "disabled"}>Tiếp tục</button>
              <button class="primary-button" data-submit ${session.selected === null || session.checked ? "disabled" : ""}>Kiểm tra</button>
            </div>
          </div>
        </div>
      </section>
    `);

    app.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        session.selected = Number(button.dataset.choice);
        saveStudySession(true);
        render();
      });
    });

    app.querySelector("[data-submit]")?.addEventListener("click", submitCurrent);
    app.querySelector("[data-skip]")?.addEventListener("click", nextQuestion);
    app.querySelector("[data-exit-quiz]")?.addEventListener("click", () => {
      saveStudySession(false);
      route = { name: "chapter", chapterId: session.chapterId };
      session = null;
      render();
    });
  }

  function renderFinish() {
    const chapter = chapterById(session.chapterId);
    const uniqueIds = [...new Set(session.startedIds)];
    const correct = uniqueIds.filter((id) => getAnswer(id).correctEver).length;
    const attempts = uniqueIds.reduce((sum, id) => sum + getAnswer(id).attempts, 0);
    const wrong = uniqueIds.reduce((sum, id) => sum + getAnswer(id).wrongCount, 0);
    const setLabel = session.mode === "set" ? `Bộ ${session.setIndex + 1}` : "Ôn câu sai";

    shell(`
      <section class="quiz-shell">
        <div class="finish-panel">
          <span class="pill teal">${escapeHtml(chapter.title)}</span>
          <h2>${setLabel} hoàn thành</h2>
          <div class="finish-stats">
            <div class="summary-panel">
              <span class="metric-label">Đã chắc</span>
              <span class="metric-value">${correct}/${uniqueIds.length}</span>
            </div>
            <div class="summary-panel">
              <span class="metric-label">Lượt làm</span>
              <span class="metric-value">${attempts}</span>
            </div>
            <div class="summary-panel">
              <span class="metric-label">Lượt sai</span>
              <span class="metric-value">${wrong}</span>
            </div>
          </div>
          <div class="toolbar-actions finish-actions">
            ${session.mode === "set" && session.setIndex < 9 ? `<button class="primary-button" data-next-set>Học bộ ${session.setIndex + 2}</button>` : ""}
            <button class="ghost-button" data-repeat>Học lại</button>
            <button class="ghost-button" data-back-chapter>Về chương</button>
          </div>
        </div>
      </section>
    `);

    app.querySelector("[data-next-set]")?.addEventListener("click", () => startSet(chapter.id, session.setIndex + 1));
    app.querySelector("[data-repeat]")?.addEventListener("click", () => {
      if (session.mode === "set") startSet(chapter.id, session.setIndex, { restart: true });
      else startReview(chapter.id, session.startedIds, { restart: true });
    });
    app.querySelector("[data-back-chapter]")?.addEventListener("click", () => {
      route = { name: "chapter", chapterId: chapter.id };
      session = null;
      render();
    });
  }

  function examById(id) {
    return EXAM_DATA?.exams.find((exam) => exam.id === id);
  }

  function examAttempt(examId) {
    return progress.examAttempts?.[examId] || null;
  }

  function saveExamAttempt(exam, attempt) {
    const current = examAttempt(exam.id);
    progress.examAttempts = progress.examAttempts || {};
    progress.examAttempts[exam.id] = {
      attempts: (current?.attempts || 0) + 1,
      bestScore: Math.max(current?.bestScore || 0, attempt.score),
      bestPercent: Math.max(current?.bestPercent || 0, attempt.percent),
      lastScore: attempt.score,
      lastPercent: attempt.percent,
      total: attempt.total,
      submittedAt: new Date().toISOString()
    };
    saveProgress();
  }

  function renderExams() {
    if (!EXAM_DATA) return;

    const completed = EXAM_DATA.exams.filter((exam) => examAttempt(exam.id)).length;
    const bestAverage = EXAM_DATA.exams.reduce((sum, exam) => sum + (examAttempt(exam.id)?.bestPercent || 0), 0);
    const avg = EXAM_DATA.exams.length ? Math.round(bestAverage / EXAM_DATA.exams.length) : 0;
    const blueprint = EXAM_DATA.blueprint.map((item) => `
      <div class="blueprint-row">
        <span>${escapeHtml(item.label)}</span>
        <strong>${item.percent}%</strong>
      </div>
    `).join("");
    const assumptions = EXAM_DATA.assumptions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const cards = EXAM_DATA.exams.map((exam) => {
      const attempt = examAttempt(exam.id);
      return `
        <article class="exam-card">
          <div class="chapter-top">
            <div>
              <h3 class="chapter-title">${escapeHtml(exam.title)}</h3>
              <p class="chapter-subtitle">${escapeHtml(exam.focus)}</p>
            </div>
            <span class="pill teal">${exam.mcqCount} TN + 1 TL tham khảo</span>
          </div>
          <div class="exam-meta-grid">
            <span><strong>${exam.durationMinutes}</strong> phút</span>
            <span><strong>${attempt ? `${attempt.bestScore}/${attempt.total}` : "--"}</strong> tốt nhất</span>
          </div>
          <div class="card-footer">
            <span class="metric-note">${attempt ? `Đã làm ${attempt.attempts} lượt, lần gần nhất ${attempt.lastPercent}%` : "Chưa làm"}</span>
            <button class="primary-button" data-start-exam="${exam.id}">Làm đề</button>
          </div>
        </article>
      `;
    }).join("");

    shell(`
      <section class="summary-band">
        <div class="summary-panel">
          <span class="metric-label">Đề đã làm</span>
          <span class="metric-value">${completed}/${EXAM_DATA.exams.length}</span>
          <span class="metric-note">Tính theo đề đã xem kết quả ít nhất một lần</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Điểm tốt nhất TB</span>
          <span class="metric-value">${avg}%</span>
          <span class="metric-note">Tính theo điểm cao nhất từng đề</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Mỗi đề</span>
          <span class="metric-value">30</span>
          <span class="metric-note">Câu trắc nghiệm</span>
        </div>
        <div class="summary-panel">
          <span class="metric-label">Tự luận</span>
          <span class="metric-value">1</span>
          <span class="metric-note">Câu tham khảo để tự luyện lập luận</span>
        </div>
      </section>

      <section class="section-header">
        <div>
          <h2 class="section-title">Đề thi mô phỏng</h2>
          <div class="section-meta">30 bộ đề mô phỏng theo ma trận kiến thức hệ thống nhúng, cấu kiện ứng dụng và các bẫy khái niệm thường gặp.</div>
        </div>
        <div class="toolbar-actions">
          <button class="ghost-button" data-reset-exams>Đặt lại điểm đề</button>
        </div>
      </section>

      <section class="exam-blueprint">
        <div>
          <h3>Ma trận suy luận</h3>
          <div class="blueprint-list">${blueprint}</div>
        </div>
        <div>
          <h3>Giả định khi ra đề</h3>
          <ul>${assumptions}</ul>
        </div>
      </section>

      <section class="exam-grid">${cards}</section>
    `);

    app.querySelectorAll("[data-start-exam]").forEach((button) => {
      button.addEventListener("click", () => startExam(button.dataset.startExam));
    });

    app.querySelector("[data-reset-exams]")?.addEventListener("click", () => {
      if (!confirm("Đặt lại toàn bộ điểm phần Đề thi?")) return;
      progress.examAttempts = {};
      saveProgress();
      render();
    });
  }

  function startExam(examId) {
    const exam = examById(examId);
    if (!exam) return;
    session = {
      mode: "exam",
      examId,
      pointer: 0,
      answers: {}
    };
    route = { name: "exam" };
    render();
  }

  function currentExam() {
    return examById(session.examId);
  }

  function submitExam() {
    const exam = currentExam();
    const total = exam.questions.length;
    const score = exam.questions.filter((question) => {
      const selected = session.answers[question.id];
      return selected !== undefined && question.choices[selected]?.correct;
    }).length;
    const attempt = {
      score,
      total,
      percent: pct(score, total),
      answers: { ...session.answers }
    };
    saveExamAttempt(exam, attempt);
    session.lastAttempt = attempt;
    route = { name: "examFinish" };
    render();
  }

  function renderExam() {
    const exam = currentExam();
    if (!exam) {
      route = { name: "exams" };
      render();
      return;
    }
    if (!exam.questions.length) {
      route = { name: "exams" };
      render();
      return;
    }
    session.pointer = Math.min(Math.max(session.pointer || 0, 0), exam.questions.length - 1);

    const totalSteps = exam.questions.length;
    const progressInExam = pct(session.pointer + 1, totalSteps);
    const body = (() => {
      const question = exam.questions[session.pointer];
      const selectedIndex = session.answers[question.id];
      const choices = question.choices.map((choice, index) => `
        <button class="choice-button ${selectedIndex === index ? "selected" : ""}" data-exam-choice="${index}">
          <span class="choice-letter">${letters[index]}</span>
          <span class="choice-text">${escapeHtml(choice.text)}</span>
        </button>
      `).join("");
      return `
        <div class="quiz-head">
          <div class="quiz-kicker">
            <span class="pill teal">${escapeHtml(question.type)}</span>
            <span class="pill">${escapeHtml(question.source)}</span>
          </div>
          <span class="question-count">Câu ${session.pointer + 1}/${exam.questions.length}</span>
        </div>
        <h2 class="question-title">${escapeHtml(question.stem)}</h2>
        <section class="choices">${choices}</section>
      `;
    })();

    shell(`
      <section class="quiz-shell">
        <div class="quiz-panel">
          <div class="quiz-head">
            <div class="quiz-kicker">
              <button class="icon-button" data-exit-exam title="Thoát">←</button>
              <span class="pill teal">${escapeHtml(exam.title)}</span>
              <span class="pill">${exam.durationMinutes} phút</span>
            </div>
            <span class="question-count">${session.pointer + 1}/${totalSteps}</span>
          </div>
          ${progressBar(progressInExam)}
          ${body}
          <div class="quiz-actions">
            <span class="metric-note">${escapeHtml(exam.focus)}</span>
            <div class="toolbar-actions">
              <button class="ghost-button" data-prev-exam ${session.pointer === 0 ? "disabled" : ""}>Trước</button>
              ${session.pointer === exam.questions.length - 1
                ? `<button class="primary-button" data-finish-exam>Xem kết quả</button>`
                : `<button class="primary-button" data-next-exam>Tiếp</button>`}
            </div>
          </div>
        </div>
      </section>
    `);

    app.querySelectorAll("[data-exam-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const question = exam.questions[session.pointer];
        session.answers[question.id] = Number(button.dataset.examChoice);
        render();
      });
    });

    app.querySelector("[data-prev-exam]")?.addEventListener("click", () => {
      session.pointer = Math.max(0, session.pointer - 1);
      render();
    });

    app.querySelector("[data-next-exam]")?.addEventListener("click", () => {
      session.pointer = Math.min(totalSteps - 1, session.pointer + 1);
      render();
    });

    app.querySelector("[data-finish-exam]")?.addEventListener("click", submitExam);
    app.querySelector("[data-exit-exam]")?.addEventListener("click", () => {
      if (!confirm("Thoát đề hiện tại? Các lựa chọn chưa xem kết quả sẽ mất.")) return;
      session = null;
      route = { name: "exams" };
      render();
    });
  }

  function renderExamFinish() {
    const exam = currentExam();
    const attempt = session.lastAttempt;
    if (!exam || !attempt) {
      route = { name: "exams" };
      render();
      return;
    }

    const review = exam.questions.map((question, index) => {
      const selected = attempt.answers[question.id];
      const selectedLabel = selected === undefined ? "Chưa chọn" : `${letters[selected]}. ${escapeHtml(question.choices[selected].text)}`;
      const correctIndex = question.choices.findIndex((choice) => choice.correct);
      const isCorrect = selected !== undefined && question.choices[selected]?.correct;
      const explanations = question.choices.map((choice, choiceIndex) => `
        <div class="explain-item">
          <strong>${letters[choiceIndex]}. ${choice.correct ? "Đáp án đúng" : "Không chọn"}</strong>
          <span>${escapeHtml(choice.reason)}</span>
        </div>
      `).join("");
      return `
        <details class="exam-review-item">
          <summary>
            <span>Câu ${index + 1}: ${isCorrect ? "Đúng" : "Sai"}</span>
            <strong>${letters[correctIndex]}</strong>
          </summary>
          <h4>${escapeHtml(question.stem)}</h4>
          <p><strong>Bạn chọn:</strong> ${selectedLabel}</p>
          <div class="explain-list">${explanations}</div>
        </details>
      `;
    }).join("");
    const expected = exam.essay.expected.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    shell(`
      <section class="quiz-shell wide">
        <div class="finish-panel">
          <span class="pill teal">${escapeHtml(exam.title)}</span>
          <h2>Kết quả trắc nghiệm: ${attempt.score}/${attempt.total}</h2>
          <div class="finish-stats">
            <div class="summary-panel">
              <span class="metric-label">Điểm</span>
              <span class="metric-value">${attempt.percent}%</span>
            </div>
            <div class="summary-panel">
              <span class="metric-label">Đúng</span>
              <span class="metric-value">${attempt.score}</span>
            </div>
            <div class="summary-panel">
              <span class="metric-label">Sai hoặc bỏ</span>
              <span class="metric-value">${attempt.total - attempt.score}</span>
            </div>
          </div>
          <div class="toolbar-actions finish-actions">
            <button class="primary-button" data-repeat-exam>Làm lại đề</button>
            <button class="ghost-button" data-back-exams>Về danh sách đề</button>
          </div>
        </div>

        <section class="essay-review">
          <h3>Câu tự luận tham khảo: ${escapeHtml(exam.essay.title)}</h3>
          <p>${escapeHtml(exam.essay.prompt)}</p>
          <p class="metric-note">Phần này chỉ dùng để tự ôn và tự đối chiếu, không tính vào điểm trắc nghiệm.</p>
          <div class="essay-columns single">
            <div>
              <h4>Đáp án gợi ý tham khảo</h4>
              <ul>${expected}</ul>
            </div>
          </div>
        </section>

        <section class="exam-review-list">${review}</section>
      </section>
    `);

    app.querySelector("[data-repeat-exam]")?.addEventListener("click", () => startExam(exam.id));
    app.querySelector("[data-back-exams]")?.addEventListener("click", () => {
      session = null;
      route = { name: "exams" };
      render();
    });
  }

  function render() {
    if (isExamSection()) {
      if (route.name === "chapters") route = { name: "exams" };
      if (route.name === "exams") renderExams();
      if (route.name === "exam") renderExam();
      if (route.name === "examFinish") renderExamFinish();
      return;
    }
    if (route.name === "chapters") renderChapters();
    if (route.name === "chapter") renderChapter();
    if (route.name === "lesson") renderLesson();
    if (route.name === "quiz") renderQuiz();
    if (route.name === "finish") renderFinish();
  }

  restoreStudySessionOnLoad();
  render();
})();
