const SITE_PAGES = [
  { title: "Domů", path: "/index.html", description: "Úvodní stránka se shrnutím funkcí a rychlým vstupem do dokumentace.", tags: ["home", "landing"] },
  { title: "Dokumentace", path: "/docs/index.html", description: "Přehled struktury, fungování a editace projektu.", tags: ["docs", "overview"] },
  { title: "Začátek", path: "/docs/zacatek.html", description: "Klonování, spuštění a první úpravy.", tags: ["start", "install"] },
  { title: "Design systém", path: "/docs/design.html", description: "B&W styl, glass, typografie a barevné code bloky.", tags: ["design", "theme"] },
  { title: "Komponenty", path: "/docs/komponenty.html", description: "Karty, tlačítka, callouty a code blocks.", tags: ["components", "ui"] },
  { title: "Navigace", path: "/docs/navigace.html", description: "Megamenu, TOC a page transitions.", tags: ["nav", "menu"] },
  { title: "GitHub Pages", path: "/docs/github-pages.html", description: "Deploy workflow a publikace do gh-pages.", tags: ["deploy", "pages"] },
  { title: "Troubleshooting", path: "/docs/troubleshooting.html", description: "Rychlá diagnostika a opravy.", tags: ["debug", "fix"] },
  { title: "Markdown a obsah", path: "/docs/markdown.html", description: "Pravidla pro psaní a udržení konzistence.", tags: ["markdown", "content"] }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const SITE_BASE = window.__SITE_BASE__ || "";
const resolve = (path) => /^https?:\/\//.test(path) ? path : `${SITE_BASE}${path.replace(/^\//, "")}`;

function normalize(str) {
  return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function navigate(href) {
  if (!href || href.startsWith("#")) return;
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.pathname === location.pathname && url.hash) return;
  document.body.classList.add("is-leaving");
  window.setTimeout(() => { window.location.href = resolve(url.pathname.replace(/^\//, "") + url.search + url.hash); }, 120);
}

function setupTransitions() {
  document.body.classList.add("is-ready");
  $$('a[href]').forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) return;
    a.addEventListener("click", (e) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(a.href);
    });
  });
}

function setupNav() {
  const menu = $("#menu");
  const toggle = $("#menuToggle");
  const paletteToggle = $("[data-open-palette]");

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (e) => {
    $$(".menu__group").forEach(item => {
      if (!item.contains(e.target)) item.open = false;
    });
    if (e.target.closest("[data-open-palette]")) openPalette();
  });

  $$("[data-contrast-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const html = document.documentElement;
      const state = html.dataset.contrast === "soft" ? "hard" : "soft";
      html.dataset.contrast = state;
      localStorage.setItem("contrast", state);
    });
  });

  const saved = localStorage.getItem("contrast");
  if (saved) document.documentElement.dataset.contrast = saved;

  paletteToggle?.addEventListener("click", openPalette);
}

function setupMegaMenus() {
  $$("details.menu__group").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        $$("details.menu__group").forEach(other => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });
}

function setupTOC() {
  const toc = $(".toc");
  if (!toc) return;
  const headings = $$("article h2, article h3").filter(h => h.id);
  if (!headings.length) {
    toc.remove();
    return;
  }
  toc.innerHTML = "<h3>Obsah stránky</h3>" + headings.map(h => `<a href="#${h.id}" data-toc-link>${h.textContent}</a>`).join("");
  const links = $$("[data-toc-link]", toc);
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] });
  headings.forEach(h => observer.observe(h));
}

function setupCopyButtons() {
  $$("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const block = btn.closest(".codeblock");
      const code = block?.querySelector("code")?.innerText || "";
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy"), 1100);
      } catch {
        btn.textContent = "Error";
        setTimeout(() => (btn.textContent = "Copy"), 1100);
      }
    });
  });
}

function setupPalette() {
  const palette = $("#palette");
  const input = $("#paletteInput");
  const results = $("#paletteResults");
  if (!palette || !input || !results) return;

  function render(query = "") {
    const q = normalize(query);
    const items = SITE_PAGES.filter(page => {
      if (!q) return true;
      return normalize(page.title).includes(q) || normalize(page.description).includes(q) || page.tags.some(tag => normalize(tag).includes(q));
    });

    results.innerHTML = items.map(page => `
      <button class="palette__item" data-palette-item data-href="${resolve(page.path)}">
        ${page.title}
        <span class="palette__meta">${page.description}</span>
      </button>
    `).join("") || '<div class="palette__item">Nic nenalezeno</div>';

    $$("[data-palette-item]", results).forEach(btn => {
      btn.addEventListener("click", () => navigate(btn.dataset.href));
    });
  }

  function open() {
    palette.classList.add("is-open");
    input.value = "";
    render("");
    window.setTimeout(() => input.focus(), 0);
  }

  function close() {
    palette.classList.remove("is-open");
  }

  window.openPalette = open;
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open();
    }
    if (e.key === "Escape") close();
  });

  palette.addEventListener("click", (e) => {
    if (e.target === palette) close();
  });

  input.addEventListener("input", () => render(input.value));
}

function setupSearchOnHome() {
  const input = $("#homeSearch");
  const list = $("#homeSearchResults");
  if (!input || !list) return;
  function render() {
    const q = normalize(input.value);
    const items = SITE_PAGES.filter(page => normalize(page.title).includes(q) || normalize(page.description).includes(q) || page.tags.some(tag => normalize(tag).includes(q)));
    list.innerHTML = items.slice(0, 8).map(page => `
      <a class="palette__item" href="${resolve(page.path)}">
        ${page.title}
        <span class="palette__meta">${page.description}</span>
      </a>
    `).join("");
  }
  input.addEventListener("input", render);
  render();
}

setupTransitions();
setupNav();
setupMegaMenus();
setupTOC();
setupCopyButtons();
setupPalette();
setupSearchOnHome();
