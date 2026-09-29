/**
 * Physic Lab - Modern UI Controller
 * High-Tech Glassmorphic Science Lab Interface
 * Made by baobg and Ryan
 */

(function () {
  "use strict";

  // Set new branding in document
  document.title = "Physic Lab - made by baobg and Ryan";

  // Reactive UI State Tracker (Prevents redundant DOM updates and eliminates flickering)
  const uiState = {
    paused: null,
    mouseSize: null,
    currentElement: null,
    searchSelectedIndex: -1,
  };

  // --- SVG Icons Library ---
  const ICONS = {
    atom: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"></ellipse></svg>`,
    play: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    pause: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
    step: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4" fill="currentColor"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>`,
    minus: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    plus: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    reset: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`,
    replace: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
    search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    saves: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    fullscreen: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
    // Tool Icons
    heat: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"></path></svg>`,
    cool: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="20" y1="7" x2="4" y2="17"></line><line x1="20" y1="17" x2="4" y2="7"></line></svg>`,
    pick: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14 7 3 3-9 9H5v-3l9-9Z"></path><path d="m16 5 3 3"></path></svg>`,
    erase: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path></svg>`,
    mix: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"></path><path d="M4 20L21 3"></path><path d="M21 16v5h-5"></path><path d="M15 15l6 6"></path><path d="M4 4l5 5"></path></svg>`,
    smash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5c-.8.8-2.2.8-3 0 0 0 0 0 0 0-.8-.8-.8-2.2 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 3.26-6.36 6.36"></path></svg>`,
    clone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    shock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    prop: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`
  };

  // --- Main Modern UI Initializer ---
  function initModernUI() {
    console.log("[Physic Lab] Initializing premium lab UI by baobg and Ryan...");

    // 1. Create and inject Top Bar
    createTopBar();

    // 2. Enhance Tool Controls (Toolbar)
    enhanceToolbar();

    // 3. Setup Category Horizontal Wheel Scroll
    setupCategoryScroll();

    // 4. Enhance & Observe #category-tools
    observeCategoryTools();

    // 5. Enhance & Observe Element Controls (turn into high-tech material cards)
    observeElementControls();

    // 6. Enhance canvas rendering (smaller pixels, smoother look)
    enhanceCanvasRendering();

    // 7. Setup Reactive Event Hooks
    setupHooks();

    // 8. Update initial display with force flag
    updateActiveElementBadge(true);
    updateSimulationStatus(true);
    updateBrushSizeBadge(true);

    const extraName = document.getElementById("extraInfo-name");
    if (extraName) extraName.innerText = "Physic Lab ";
  }

  // --- Canvas Pixel Enhancement ---
  // Reduces pixel size for higher resolution particles and enables smooth rendering
  function enhanceCanvasRendering() {
    try {
      // Only reduce if user hasn't customized their pixel size setting
      const currentSetting = window.settings && window.settings.pixelsize;
      if (!currentSetting || currentSetting === "6" || currentSetting === 6) {
        // Set pixel size to 4 (Large mode) for higher resolution particles
        if (typeof window.setSetting === "function") {
          window.setSetting("pixelsize", "4");
        } else if (window.settings) {
          window.settings.pixelsize = "4";
        }

        // Update the dropdown to reflect the new size
        const dropdown = document.querySelector('select[onchange*="pixelsize"]');
        if (dropdown) {
          dropdown.value = "4";
        }

        // Trigger canvas resize if no pixels exist yet (fresh load)
        if (typeof window.autoResizeCanvas === "function" &&
            (!window.currentPixels || window.currentPixels.length === 0)) {
          window.autoResizeCanvas(false);
        }

        console.log("[Physic Lab] Canvas enhanced: pixel size set to 4 (higher resolution)");
      }

      // Apply smooth rendering to canvas contexts after a short delay
      // (canvas contexts are created by the game engine)
      setTimeout(() => {
        const gameCanvas = document.getElementById("game");
        if (gameCanvas) {
          const ctx = gameCanvas.getContext("2d");
          if (ctx) {
            // Enable image smoothing for softer particle edges
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
          }
        }
      }, 500);
    } catch (e) {
      console.warn("[Physic Lab] Canvas enhancement error:", e);
    }
  }

  // --- Top Bar Builder ---
  function createTopBar() {
    if (document.getElementById("modern-top-bar")) return;

    const topBar = document.createElement("header");
    topBar.id = "modern-top-bar";
    topBar.innerHTML = `
      <div class="modern-brand" id="modernBrandLogo" title="Physic Lab by baobg and Ryan">
        <div class="modern-logo-icon">${ICONS.atom}</div>
        <div class="modern-brand-info">
          <span class="modern-brand-title">Physic Lab</span>
          <span class="modern-brand-subtitle">made by <span class="author">baobg</span> and <span class="author">Ryan</span></span>
        </div>
      </div>

      <div class="modern-center-info">
        <div class="modern-active-elem-badge" id="modernActiveBadge" title="Click to view element information">
          <span class="modern-elem-swatch" id="modernElemSwatch"></span>
          <span id="modernElemName">Sand</span>
        </div>

        <div class="modern-search-box">
          <span class="modern-search-icon">${ICONS.search}</span>
          <input type="text" class="modern-search-input" id="modernQuickSearch" placeholder="Quick search elements..." autocomplete="off" spellcheck="false">
          <span class="modern-search-kbd">/</span>
          <div class="modern-search-results" id="modernSearchResults"></div>
        </div>
      </div>

      <div class="modern-top-actions">
        <div class="modern-status-indicator" id="modernSimStatus">
          <span class="modern-status-dot"></span>
          <span id="modernSimStatusText">RUNNING</span>
        </div>
        <button class="modern-icon-btn" id="modernInfoBtn" title="Element Information (I)">${ICONS.info}</button>
        <button class="modern-icon-btn" id="modernSavesBtn" title="Save & Load Simulation">${ICONS.saves}</button>
        <button class="modern-icon-btn" id="modernSettingsBtn" title="Settings">${ICONS.settings}</button>
        <button class="modern-icon-btn" id="modernFullscreenBtn" title="Toggle Fullscreen (F11)">${ICONS.fullscreen}</button>
      </div>
    `;

    document.body.insertBefore(topBar, document.body.firstChild);

    // Click brand logo to focus game
    document.getElementById("modernBrandLogo").addEventListener("click", () => {
      if (window.focusGame) window.focusGame();
    });

    // Click active badge to show element info
    document.getElementById("modernActiveBadge").addEventListener("click", () => {
      if (window.showingMenu !== "info") {
        if (window.closeMenu) window.closeMenu();
        if (window.showInfo) window.showInfo(window.currentElement || "");
      } else {
        if (window.closeMenu) window.closeMenu();
      }
    });

    // Top Bar actions
    document.getElementById("modernInfoBtn").addEventListener("click", () => {
      if (window.showingMenu !== "info") {
        if (window.closeMenu) window.closeMenu();
        if (window.showInfo) window.showInfo("");
      } else {
        if (window.closeMenu) window.closeMenu();
      }
    });

    document.getElementById("modernSavesBtn").addEventListener("click", () => {
      if (window.showingMenu !== "saves") {
        if (window.closeMenu) window.closeMenu();
        if (window.showSaves) window.showSaves();
      } else {
        if (window.closeMenu) window.closeMenu();
      }
    });

    document.getElementById("modernSettingsBtn").addEventListener("click", () => {
      if (window.showingMenu !== "settings") {
        if (window.closeMenu) window.closeMenu();
        if (window.showSettings) window.showSettings();
      } else {
        if (window.closeMenu) window.closeMenu();
      }
    });

    document.getElementById("modernFullscreenBtn").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    setupQuickSearch();
  }

  // --- Quick Search Setup with Keyboard Navigation ---
  function setupQuickSearch() {
    const input = document.getElementById("modernQuickSearch");
    const resultsContainer = document.getElementById("modernSearchResults");
    if (!input || !resultsContainer) return;

    function renderResults(q) {
      if (!window.elements) return;

      const matches = Object.keys(window.elements)
        .filter((key) => {
          const el = window.elements[key];
          if (el.hidden && (!window.settings || !window.settings.unlocked || !window.settings.unlocked[key])) {
            return false;
          }
          const name = (el.name || key).toLowerCase();
          return name.includes(q) || key.toLowerCase().includes(q);
        })
        .slice(0, 20);

      uiState.searchSelectedIndex = -1;

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="padding: 12px; color: var(--ml-text-dim); text-align: center; font-size: 0.82rem;">No matching elements found</div>`;
      } else {
        resultsContainer.innerHTML = matches
          .map((key, index) => {
            const el = window.elements[key];
            const name = el.name || key;
            const cat = el.category || "other";
            let color = "#ffffff";
            if (el.color) {
              color = Array.isArray(el.color) ? el.color[0] : el.color;
            }
            return `
            <div class="modern-search-item" data-elem="${key}" data-index="${index}">
              <span class="modern-elem-swatch" style="background-color: ${color}; box-shadow: 0 0 8px ${color};"></span>
              <span style="font-weight: 600;">${name}</span>
              <span class="modern-search-item-cat">${cat}</span>
            </div>
          `;
          })
          .join("");
      }

      resultsContainer.style.display = "block";
    }

    input.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsContainer.style.display = "none";
        resultsContainer.innerHTML = "";
        return;
      }
      renderResults(q);
    });

    // Keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
    input.addEventListener("keydown", (e) => {
      const items = resultsContainer.querySelectorAll(".modern-search-item");
      if (!items || items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        uiState.searchSelectedIndex = (uiState.searchSelectedIndex + 1) % items.length;
        highlightSelectedItem(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        uiState.searchSelectedIndex = (uiState.searchSelectedIndex - 1 + items.length) % items.length;
        highlightSelectedItem(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        let targetItem = null;
        if (uiState.searchSelectedIndex >= 0 && uiState.searchSelectedIndex < items.length) {
          targetItem = items[uiState.searchSelectedIndex];
        } else if (items.length > 0) {
          targetItem = items[0];
        }
        if (targetItem) {
          selectItem(targetItem);
        }
      } else if (e.key === "Escape") {
        resultsContainer.style.display = "none";
        input.blur();
      }
    });

    function highlightSelectedItem(items) {
      items.forEach((item, idx) => {
        if (idx === uiState.searchSelectedIndex) {
          item.classList.add("selected");
          item.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } else {
          item.classList.remove("selected");
        }
      });
    }

    function selectItem(item) {
      const elemKey = item.getAttribute("data-elem");
      if (elemKey && window.selectElement) {
        window.selectElement(elemKey);
        if (window.elements[elemKey] && window.selectCategory) {
          window.selectCategory(window.elements[elemKey].category);
        }
        updateActiveElementBadge(true);

        // Smooth scroll the selected element button into view
        const btn = document.getElementById("elementButton-" + elemKey);
        if (btn) {
          btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
      resultsContainer.style.display = "none";
      input.value = "";
      input.blur();
      if (window.focusGame) window.focusGame();
    }

    resultsContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".modern-search-item");
      if (item) {
        selectItem(item);
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = "none";
      }
    });

    // Global Hotkey: Press '/' to quickly focus search
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // --- Toolbar Enhancement (Micro-interactions & Clean Dock) ---
  function enhanceToolbar() {
    const pauseBtn = document.getElementById("pauseButton");
    const frameBtn = document.getElementById("frameButton");
    const sizeDownBtn = document.getElementById("sizeDownButton");
    const sizeUpBtn = document.getElementById("sizeUpButton");
    const resetBtn = document.getElementById("resetButton");
    const replaceBtn = document.getElementById("replaceButton");
    const elemSelectBtn = document.getElementById("elemSelectButton");
    const editModeBtn = document.getElementById("editModeButton");

    if (pauseBtn && !pauseBtn.hasAttribute("data-modern")) {
      pauseBtn.setAttribute("data-modern", "true");
      const pauseText = pauseBtn.innerText.replace(/[▶⏸]/g, "").trim() || "Pause";
      pauseBtn.innerHTML = `${ICONS.pause} <span>${pauseText}</span>`;
    }
    if (frameBtn && !frameBtn.hasAttribute("data-modern")) {
      frameBtn.setAttribute("data-modern", "true");
      frameBtn.innerHTML = `${ICONS.step} <span>&gt;</span>`;
    }
    if (resetBtn && !resetBtn.hasAttribute("data-modern")) {
      resetBtn.setAttribute("data-modern", "true");
      const resetText = resetBtn.innerText.trim() || "Reset";
      resetBtn.innerHTML = `${ICONS.reset} <span>${resetText}</span>`;
    }
    if (replaceBtn && !replaceBtn.hasAttribute("data-modern")) {
      replaceBtn.setAttribute("data-modern", "true");
      const replaceText = replaceBtn.innerText.trim() || "Replace";
      replaceBtn.innerHTML = `${ICONS.replace} <span>${replaceText}</span>`;
    }

    if (elemSelectBtn && !elemSelectBtn.hasAttribute("data-modern")) {
      elemSelectBtn.setAttribute("data-modern", "true");
      const elemText = elemSelectBtn.innerText.trim() || "Elem";
      elemSelectBtn.innerHTML = `${ICONS.search} <span>${elemText}</span>`;
    }
    if (editModeBtn && !editModeBtn.hasAttribute("data-modern")) {
      editModeBtn.setAttribute("data-modern", "true");
      const editText = editModeBtn.innerText.trim() || "Edit";
      editModeBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> <span>${editText}</span>`;
    }
    const infoBtn = document.getElementById("infoButton");
    if (infoBtn && !infoBtn.hasAttribute("data-modern")) {
      infoBtn.setAttribute("data-modern", "true");
      const infoText = infoBtn.innerText.trim() || "Info";
      infoBtn.innerHTML = `${ICONS.info} <span>${infoText}</span>`;
    }
    const savesBtn = document.getElementById("savesButton");
    if (savesBtn && !savesBtn.hasAttribute("data-modern")) {
      savesBtn.setAttribute("data-modern", "true");
      const savesText = savesBtn.innerText.trim() || "Saves";
      savesBtn.innerHTML = `${ICONS.saves} <span>${savesText}</span>`;
    }
    const modsBtn = document.getElementById("modsButton");
    if (modsBtn && !modsBtn.hasAttribute("data-modern")) {
      modsBtn.setAttribute("data-modern", "true");
      const modsText = modsBtn.innerText.trim() || "Mods";
      modsBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568c.47-.47.47-1.233 0-1.704l-1.996-1.996c-.47-.47-1.233-.47-1.704 0l-1.568 1.568c-.23.23-.556.338-.878.289A4.5 4.5 0 0 0 10.5 4.5V3a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1v1.5a4.5 4.5 0 0 0-4.648 4.648c-.049.322.059.648.289.878l1.568 1.568c.47.47.47 1.233 0 1.704l-1.568 1.568c-.23.23-.338.556-.289.878A4.5 4.5 0 0 0 5.5 19.5V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1.5a4.5 4.5 0 0 0 4.648-4.648c.049-.322-.059-.648-.289-.878l-1.568-1.568c-.47-.47-.47-1.233 0-1.704l1.568-1.568c.23-.23.338-.556.289-.878A4.5 4.5 0 0 0 19.5 10.5V9a1 1 0 0 0-1-1h-1.5a4.5 4.5 0 0 0-4.648-4.648z"></path></svg> <span>${modsText}</span>`;
    }
    const settingsBtn = document.getElementById("settingsButton");
    if (settingsBtn && !settingsBtn.hasAttribute("data-modern")) {
      settingsBtn.setAttribute("data-modern", "true");
      const settingsText = settingsBtn.innerText.trim() || "Settings";
      settingsBtn.innerHTML = `${ICONS.settings} <span>${settingsText}</span>`;
    }

    // Modern Brush Size Pill Dock
    if (sizeDownBtn && sizeUpBtn && !document.getElementById("brushSizeDisplay")) {
      sizeDownBtn.innerHTML = ICONS.minus;
      sizeUpBtn.innerHTML = ICONS.plus;

      const brushControl = document.createElement("div");
      brushControl.className = "modern-brush-control";

      const badge = document.createElement("span");
      badge.id = "brushSizeDisplay";
      badge.className = "modern-brush-badge";
      badge.innerText = `Size: ${window.mouseSize || 1}px`;

      const parent = sizeDownBtn.parentNode;
      parent.insertBefore(brushControl, sizeDownBtn);
      brushControl.appendChild(sizeDownBtn);
      brushControl.appendChild(badge);
      brushControl.appendChild(sizeUpBtn);
    }
  }

  // --- Horizontal Smooth Scroll for Category Tabs ---
  function setupCategoryScroll() {
    const catControls = document.getElementById("categoryControls");
    if (!catControls) return;

    catControls.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        catControls.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
      }
    }, { passive: false });
  }

  // --- Enhance #category-tools with Clean Layout & Icons ---
  function enhanceCategoryTools() {
    const catTools = document.getElementById("category-tools");
    if (!catTools) return;

    const toolButtons = catTools.querySelectorAll("button, .elementButton");
    toolButtons.forEach((btn) => {
      const elemName = (btn.getAttribute("element") || btn.innerText || "").trim().toLowerCase();
      if (ICONS[elemName] && !btn.querySelector("svg")) {
        const text = btn.innerText.trim();
        btn.innerHTML = `${ICONS[elemName]} <span>${text}</span>`;
      }
    });
  }

  function observeCategoryTools() {
    const catTools = document.getElementById("category-tools");
    if (!catTools) return;

    enhanceCategoryTools();

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        enhanceCategoryTools();
      });
      observer.observe(catTools, { childList: true });
    }
  }

  // --- Modernize Element Buttons: Turn Old Colored Blocks into High-Tech Material Cards ---
  function modernizeElementButton(btn) {
    if (!btn || btn.getAttribute("data-modernized") === "true") return;
    const elemKey = btn.getAttribute("element");
    if (!elemKey) return;
    btn.setAttribute("data-modernized", "true");

    const el = window.elements ? window.elements[elemKey] : null;
    let color = "#38bdf8";
    let colorStyle = "#38bdf8";

    if (el && el.color) {
      if (Array.isArray(el.color)) {
        color = el.color[0];
        colorStyle = "linear-gradient(135deg, " + el.color.join(", ") + ")";
      } else {
        color = el.color;
        colorStyle = el.color;
      }
    } else if (btn.style.backgroundColor) {
      color = btn.style.backgroundColor;
      colorStyle = color;
    }

    btn.style.setProperty("--elem-color", color);

    const rawText = btn.innerText.trim();
    if (rawText) {
      btn.innerHTML = `<span class="modern-elem-dot" style="background:${colorStyle};box-shadow:0 0 7px ${color};"></span><span class="modern-elem-text">${rawText}</span>`;
    }
  }

  function modernizeAllElementButtons() {
    const buttons = document.querySelectorAll("#elementControls .elementButton");
    for (let i = 0; i < buttons.length; i++) {
      modernizeElementButton(buttons[i]);
    }
  }

  function observeElementControls() {
    const elControls = document.getElementById("elementControls");
    if (!elControls) return;
    modernizeAllElementButtons();

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        modernizeAllElementButtons();
      });
      observer.observe(elControls, { childList: true, subtree: true });
    }
  }

  // --- Reactive UI State Updaters (0 Flicker, 0 Lag) ---

  /**
   * Only updates Simulation Status and Pause button DOM when state actually changes!
   */
  function updateSimulationStatus(force = false) {
    const isPaused = Boolean(window.paused);
    if (!force && uiState.paused === isPaused) return; // Guard clause
    uiState.paused = isPaused;

    const statusEl = document.getElementById("modernSimStatus");
    const statusText = document.getElementById("modernSimStatusText");
    const pauseBtn = document.getElementById("pauseButton");

    if (statusEl && statusText) {
      if (isPaused) {
        statusEl.className = "modern-status-indicator paused";
        statusText.innerText = "PAUSED";
      } else {
        statusEl.className = "modern-status-indicator";
        statusText.innerText = "RUNNING";
      }
    }

    if (pauseBtn) {
      pauseBtn.setAttribute("on", isPaused ? "true" : "false");
      pauseBtn.innerHTML = isPaused
        ? `${ICONS.play} <span>Resume</span>`
        : `${ICONS.pause} <span>Pause</span>`;
      pauseBtn.setAttribute("title", isPaused ? "Resume simulation (Space)" : "Pause simulation (Space)");
    }
  }

  /**
   * Only updates Brush Size badge DOM when mouseSize actually changes!
   */
  function updateBrushSizeBadge(force = false) {
    const currentSize = window.mouseSize !== undefined ? window.mouseSize : 1;
    if (!force && uiState.mouseSize === currentSize) return; // Guard clause
    uiState.mouseSize = currentSize;

    const badge = document.getElementById("brushSizeDisplay");
    if (badge) {
      badge.innerText = `Size: ${currentSize}px`;
    }
  }

  /**
   * Only updates Active Element badge DOM when currentElement actually changes!
   */
  function updateActiveElementBadge(force = false) {
    const currentElem = window.currentElement || "sand";
    if (!force && uiState.currentElement === currentElem) return; // Guard clause
    uiState.currentElement = currentElem;

    const elemNameEl = document.getElementById("modernElemName");
    const elemSwatchEl = document.getElementById("modernElemSwatch");
    const elemBadge = document.getElementById("modernActiveBadge");
    if (!elemNameEl || !window.elements) return;

    const el = window.elements[currentElem];
    const name = el && el.name ? el.name : currentElem;
    elemNameEl.innerText = name.charAt(0).toUpperCase() + name.slice(1);

    if (el && el.color && elemSwatchEl) {
      const color = Array.isArray(el.color) ? el.color[0] : el.color;
      elemSwatchEl.style.backgroundColor = color;
      elemSwatchEl.style.boxShadow = `0 0 10px ${color}`;
    }
  }

  // --- Hook Game Functions for Zero-Latency Synchronous Updates ---
  function setupHooks() {
    // 1. Hook selectElement
    if (window.selectElement) {
      const originalSelectElement = window.selectElement;
      window.selectElement = function (elem) {
        originalSelectElement.apply(this, arguments);
        updateActiveElementBadge();
      };
    }

    // 2. Hook checkPause
    if (window.checkPause) {
      const originalCheckPause = window.checkPause;
      window.checkPause = function () {
        originalCheckPause.apply(this, arguments);
        updateSimulationStatus();
      };
    }

    // 3. Hook checkMouseSize
    if (window.checkMouseSize) {
      const originalCheckMouseSize = window.checkMouseSize;
      window.checkMouseSize = function () {
        originalCheckMouseSize.apply(this, arguments);
        updateBrushSizeBadge();
      };
    }

    // 4. Hook createElementButton to enhance buttons when added
    if (window.createElementButton) {
      const originalCreateElementButton = window.createElementButton;
      window.createElementButton = function (element) {
        originalCreateElementButton.apply(this, arguments);
        const btn = document.getElementById("elementButton-" + element);
        if (btn) {
          modernizeElementButton(btn);
        }
        if (window.elements[element] && window.elements[element].category === "tools") {
          setTimeout(enhanceCategoryTools, 10);
        }
      };
    }

    // 5. Lightweight safety polling:
    // With state caching, this will NOT mutate the DOM if nothing has changed!
    setInterval(() => {
      updateSimulationStatus();
      updateBrushSizeBadge();
      updateActiveElementBadge();
    }, 400);
  }

  // Run when document is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initModernUI);
  } else {
    setTimeout(initModernUI, 250);
  }
})();
