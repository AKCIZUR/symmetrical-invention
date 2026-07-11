import { DATA } from './content.js';

const state = {
  locale: 'cs',
  route: 'home',
  searchOpen: false,
  paletteOpen: false,
  mobileOpen: false,
};

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripHtml(html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLocale() {
  const hash = location.hash || '#/cs/home';
  const route = hash.slice(2).split('/').filter(Boolean);
  const loc = route[0] === 'en' ? 'en' : 'cs';
  state.locale = loc;
  return loc;
}

function getRouteParts() {
  const hash = location.hash || '#/cs/home';
  return hash.slice(2).split('/').filter(Boolean);
}

function currentLabel(key) {
  return DATA.ui[state.locale][key];
}

function getDocs() {
  return DATA.docs[state.locale];
}

function getBlog() {
  return DATA.blog[state.locale];
}

function findDoc(slug) {
  return getDocs().find(d => d.slug === slug);
}

function findBlog(slug) {
  return getBlog().find(p => p.slug === slug);
}

function setHash(hash) {
  if (location.hash !== hash) location.hash = hash;
}

function setLocale(locale) {
  const route = getRouteParts();
  route[0] = locale;
  if (!route[1]) route[1] = 'home';
  setHash('#/' + route.join('/'));
}

function routeDescriptor() {
  const parts = getRouteParts();
  const locale = parts[0] === 'en' ? 'en' : 'cs';
  const section = parts[1] || 'home';
  const slug = parts[2] || '';
  return { locale, section, slug };
}

function ensureRoute() {
  if (!location.hash) location.hash = '#/cs/home';
}

function render() {
  ensureRoute();
  const { locale, section, slug } = routeDescriptor();
  state.locale = locale;
  state.route = section;
  document.documentElement.lang = locale;
  document.title = locale === 'cs'
    ? 'VICSDOCS | Dokumentace jinak'
    : 'VICSDOCS | Docs reimagined';

  $('#langSwitch').textContent = locale.toUpperCase();
  $('#searchBtn span').textContent = currentLabel('search');
  $('#cmdBtn span').textContent = currentLabel('command');

  $('#topNavDocs').textContent = currentLabel('nav_docs');
  $('#topNavBlog').textContent = currentLabel('nav_blog');
  $('#topNavApi').textContent = currentLabel('nav_api');

  renderSidebar();
  renderMain();
  renderToc();
  renderMobileDrawer();
  renderFooter();
  syncActiveChip();
}

function syncActiveChip() {
  const searchField = $('#searchField');
  if (searchField) searchField.placeholder = currentLabel('search_placeholder');
  const paletteField = $('#paletteField');
  if (paletteField) paletteField.placeholder = currentLabel('palette_placeholder');
}

function renderSidebar() {
  const sidebar = $('#sidebarTree');
  const docs = getDocs();
  const groups = [...new Set(docs.map(d => d.group))];
  const { section, slug } = routeDescriptor();
  const activeSlug = section === 'docs' ? slug : '';
  const html = groups.map(group => {
    const items = docs.filter(d => d.group === group).sort((a, b) => a.order - b.order);
    return `
      <div class="group">${escapeHtml(group)}</div>
      ${items.map(item => `
        <a class="${item.slug === activeSlug ? 'active' : ''}" href="#/${state.locale}/docs/${item.slug}">
          <span>${escapeHtml(item.title)}</span>
          <span aria-hidden="true">›</span>
        </a>
      `).join('')}
    `;
  }).join('');
  sidebar.innerHTML = html;
}

function renderMain() {
  const main = $('#main');
  const { locale, section, slug } = routeDescriptor();
  const ui = DATA.ui[locale];
  if (section === 'home') {
    main.innerHTML = renderHome();
    return;
  }
  if (section === 'docs') {
    const page = findDoc(slug) || getDocs()[0];
    main.innerHTML = renderDoc(page);
    return;
  }
  if (section === 'blog') {
    if (!slug) {
      main.innerHTML = renderBlogIndex();
      return;
    }
    const post = findBlog(slug) || getBlog()[0];
    main.innerHTML = renderBlogPost(post);
    return;
  }
  if (section === 'api') {
    main.innerHTML = renderApi();
    return;
  }
  main.innerHTML = renderHome();
}

function renderHome() {
  const locale = state.locale;
  const ui = DATA.ui[locale];
  const docs = getDocs();
  const featured = docs.slice(0, 3);
  const posts = getBlog().slice(0, 3);
  return `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">✨ ${escapeHtml(DATA.site.tagline[locale])}</div>
          <h1>${escapeHtml(ui.welcome)}</h1>
          <p>${escapeHtml(ui.subtitle)}</p>
          <div class="hero-actions">
            <a class="primary-btn" href="#/${locale}/docs/${featured[0].slug}">${escapeHtml(ui.hero_cta)} →</a>
            <a class="ghost-btn secondary-btn" href="#/${locale}/blog">${escapeHtml(ui.hero_secondary)}</a>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat">
            <strong>5</strong>
            <span>${locale === 'cs' ? 'ukázkových docs stránek' : 'sample docs pages'}</span>
          </div>
          <div class="stat">
            <strong>3</strong>
            <span>${locale === 'cs' ? 'blogové články' : 'blog posts'}</span>
          </div>
          <div class="stat">
            <strong>2</strong>
            <span>${locale === 'cs' ? 'jazyky' : 'languages'}</span>
          </div>
          <div class="stat">
            <strong>1</strong>
            <span>${locale === 'cs' ? 'statický zip-ready balík' : 'static zip-ready bundle'}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(ui.features)}</h2>
          <p>${locale === 'cs' ? 'Sidebar, TOC, search a command palette v jednom balíku.' : 'Sidebar, TOC, search, and a command palette in one bundle.'}</p>
        </div>
        <a class="nav-pill" href="#/${locale}/docs/${docs[0].slug}">${escapeHtml(ui.start_here)}</a>
      </div>
      <div class="feature-grid">
        <article class="feature-card"><h3>${locale === 'cs' ? 'Rychlý search' : 'Fast search'}</h3><p>${locale === 'cs' ? 'Okamžitě filtruje obsah dokumentace, blog i API.' : 'Instantly filters docs, blog, and API content.'}</p></article>
        <article class="feature-card"><h3>${locale === 'cs' ? 'Dvojjazyčnost' : 'Bilingual'}</h3><p>${locale === 'cs' ? 'Přepneš mezi češtinou a angličtinou jedním klikem.' : 'Switch between Czech and English with one click.'}</p></article>
        <article class="feature-card"><h3>${locale === 'cs' ? 'GitHub Pages ready' : 'GitHub Pages ready'}</h3><p>${locale === 'cs' ? 'Bez serveru, bez build zmatku, bez drama.' : 'No server, no build drama, no fuss.'}</p></article>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(ui.latest_posts)}</h2>
          <p>${locale === 'cs' ? 'Krátké články a praktické poznámky k designu i publikování.' : 'Short posts and practical notes about design and publishing.'}</p>
        </div>
        <a class="nav-pill" href="#/${locale}/blog">${escapeHtml(ui.all_posts)}</a>
      </div>
      <div class="post-grid">
        ${posts.map(post => `
          <article class="post-card">
            <time>${post.date}</time>
            <h3>${escapeHtml(post.title)}</h3>
            <div class="meta">${post.tags.map(t => `<span class="chip">#${escapeHtml(t)}</span>`).join('')}</div>
            <p>${escapeHtml(post.description)}</p>
            <div style="margin-top:14px"><a class="ghost-btn" href="#/${locale}/blog/${post.slug}">${escapeHtml(ui.read_more)} →</a></div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(ui.api_title)}</h2>
          <p>${locale === 'cs' ? 'Ukázkové endpointy, které se hodí pro veřejnou referenci.' : 'Sample endpoints that work well as a public reference.'}</p>
        </div>
      </div>
      <div class="api-grid">
        ${DATA.api.map(item => `
          <article class="api-item">
            <div class="badge">${escapeHtml(item.method)}</div>
            <h3><code>${escapeHtml(item.path)}</code></h3>
            <p>${escapeHtml(item.summary)}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderDoc(page) {
  const locale = state.locale;
  const ui = DATA.ui[locale];
  const prevNext = docPrevNext(page.slug);
  const sections = [
    [ui.breadcrumbs_home, `#/${locale}/home`],
    [ui.nav_docs, `#/${locale}/docs/${page.slug}`],
  ];
  return `
    <div class="breadcrumbs">
      ${sections.map((item, idx) => `${idx ? '<span class="sep">/</span>' : ''}<a href="${item[1]}">${escapeHtml(item[0])}</a>`).join('')}
    </div>
    <article class="content-panel">
      <h1>${escapeHtml(page.title)}</h1>
      <p class="lead">${escapeHtml(page.description)}</p>
      <div class="article-meta">
        <span>${locale === 'cs' ? 'Sekce' : 'Section'}: ${escapeHtml(page.group)}</span>
        <span>•</span>
        <a href="#/${locale}/blog">${escapeHtml(ui.nav_blog)}</a>
      </div>
      ${page.content}
      <div class="section-header" style="margin-top:28px">
        <div></div>
        <div class="hero-actions" style="margin-top:0">
          ${prevNext.prev ? `<a class="nav-pill" href="#/${locale}/docs/${prevNext.prev.slug}">← ${escapeHtml(prevNext.prev.title)}</a>` : ''}
          ${prevNext.next ? `<a class="nav-pill" href="#/${locale}/docs/${prevNext.next.slug}">${escapeHtml(prevNext.next.title)} →</a>` : ''}
        </div>
      </div>
      <div class="callout" style="margin-top: 18px">
        <strong>${escapeHtml(ui.edit_github)}:</strong> <span class="muted">github.com/your-name/vicsdocs</span>
      </div>
    </article>
  `;
}

function docPrevNext(slug) {
  const docs = getDocs().slice().sort((a, b) => a.order - b.order);
  const idx = docs.findIndex(d => d.slug === slug);
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx >= 0 && idx < docs.length - 1 ? docs[idx + 1] : null,
  };
}

function renderBlogIndex() {
  const locale = state.locale;
  const ui = DATA.ui[locale];
  const posts = getBlog();
  return `
    <div class="breadcrumbs">
      <a href="#/${locale}/home">${escapeHtml(ui.breadcrumbs_home)}</a>
      <span class="sep">/</span>
      <span>${escapeHtml(ui.nav_blog)}</span>
    </div>
    <section class="section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(ui.nav_blog)}</h2>
          <p>${locale === 'cs' ? 'Krátké zápisky o designu, publikování a produkčním klidu.' : 'Short notes on design, publishing, and production calm.'}</p>
        </div>
      </div>
      <div class="post-grid">
        ${posts.map(post => `
          <article class="post-card">
            <time>${post.date}</time>
            <h3>${escapeHtml(post.title)}</h3>
            <div class="meta">
              <span>${escapeHtml(post.readTime)}</span>
              <span>•</span>
              <span>${post.tags.map(t => `#${escapeHtml(t)}`).join(' ')}</span>
            </div>
            <p>${escapeHtml(post.description)}</p>
            <div style="margin-top:14px"><a class="ghost-btn" href="#/${locale}/blog/${post.slug}">${escapeHtml(ui.read_more)} →</a></div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderBlogPost(post) {
  const locale = state.locale;
  const ui = DATA.ui[locale];
  const related = getBlog().filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag))).slice(0, 2);
  return `
    <div class="breadcrumbs">
      <a href="#/${locale}/home">${escapeHtml(ui.breadcrumbs_home)}</a>
      <span class="sep">/</span>
      <a href="#/${locale}/blog">${escapeHtml(ui.nav_blog)}</a>
      <span class="sep">/</span>
      <span>${escapeHtml(post.title)}</span>
    </div>
    <article class="content-panel">
      <h1>${escapeHtml(post.title)}</h1>
      <div class="article-meta">
        <span>${post.date}</span>
        <span>•</span>
        <span>${escapeHtml(post.readTime)}</span>
      </div>
      <div class="chips">${post.tags.map(t => `<span class="chip">#${escapeHtml(t)}</span>`).join('')}</div>
      ${post.content}
      <div class="section-header" style="margin-top:28px">
        <div>
          <h2>${locale === 'cs' ? 'Související články' : 'Related posts'}</h2>
          <p>${locale === 'cs' ? 'Příbuzné čtení podle tagů.' : 'Tag-based related reading.'}</p>
        </div>
      </div>
      <div class="post-grid">
        ${related.map(item => `
          <article class="post-card">
            <time>${item.date}</time>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div style="margin-top:14px"><a class="ghost-btn" href="#/${locale}/blog/${item.slug}">${escapeHtml(ui.read_more)} →</a></div>
          </article>
        `).join('') || `<div class="callout">${locale === 'cs' ? 'Zatím bez podobných článků.' : 'No related articles yet.'}</div>`}
      </div>
    </article>
  `;
}

function renderApi() {
  const locale = state.locale;
  const ui = DATA.ui[locale];
  return `
    <div class="breadcrumbs">
      <a href="#/${locale}/home">${escapeHtml(ui.breadcrumbs_home)}</a>
      <span class="sep">/</span>
      <span>${escapeHtml(ui.nav_api)}</span>
    </div>
    <section class="section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(ui.api_title)}</h2>
          <p>${locale === 'cs' ? 'Ukázkové endpointy pro dokumentaci veřejného rozhraní.' : 'Sample endpoints for a public API reference.'}</p>
        </div>
      </div>
      <div class="api-grid">
        ${DATA.api.map(item => `
          <article class="api-item">
            <div class="badge">${escapeHtml(item.method)}</div>
            <h3><code>${escapeHtml(item.path)}</code></h3>
            <p>${escapeHtml(item.summary)}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderToc() {
  const toc = $('#toc');
  const parts = routeDescriptor();
  if (parts.section !== 'docs') {
    toc.innerHTML = `
      <div class="panel-head"><h3>${escapeHtml(currentLabel('toc_title'))}</h3></div>
      <div class="muted">${parts.locale === 'cs' ? 'Obsah se ukáže na stránkách dokumentace.' : 'The table of contents appears on docs pages.'}</div>
    `;
    return;
  }
  const page = findDoc(parts.slug) || getDocs()[0];
  toc.innerHTML = `
    <div class="panel-head"><h3>${escapeHtml(currentLabel('toc_title'))}</h3></div>
    <div class="toc-list">
      ${page.toc.map(item => `<a href="#${item.id}">${escapeHtml(item.label)}</a>`).join('')}
    </div>
  `;
}

function renderMobileDrawer() {
  const drawer = $('#mobileDrawer');
  const open = state.mobileOpen;
  drawer.classList.toggle('hide', !open);
  if (!open) return;
  const docs = getDocs().slice().sort((a, b) => a.order - b.order);
  drawer.innerHTML = `
    <div class="panel-head">
      <h3>${escapeHtml(currentLabel('sidebar_title'))}</h3>
      <button class="ghost-btn" data-close-mobile>✕</button>
    </div>
    <nav>
      <a class="nav-pill" href="#/${state.locale}/home">${escapeHtml(currentLabel('breadcrumbs_home'))}</a>
      <a class="nav-pill" href="#/${state.locale}/blog">${escapeHtml(currentLabel('nav_blog'))}</a>
      <a class="nav-pill" href="#/${state.locale}/api">${escapeHtml(currentLabel('nav_api'))}</a>
      ${docs.map(d => `<a class="nav-pill" href="#/${state.locale}/docs/${d.slug}">${escapeHtml(d.title)}</a>`).join('')}
    </nav>
  `;
}

function renderFooter() {
  const footer = $('#footer');
  footer.innerHTML = `
    <span>© ${new Date().getFullYear()} VICSDOCS</span>
    <span>${state.locale === 'cs' ? 'Tmavý static-first starter' : 'Dark static-first starter'}</span>
  `;
}

function openModal(which) {
  state[which] = true;
  $(`#${which}Backdrop`).classList.remove('hide');
  $(`#${which}Modal`).classList.remove('hide');
  const field = which === 'searchOpen' ? $('#searchField') : $('#paletteField');
  field?.focus();
}

function closeModal(which) {
  state[which] = false;
  $(`#${which}Backdrop`).classList.add('hide');
  $(`#${which}Modal`).classList.add('hide');
}

function toggleMobile() {
  state.mobileOpen = !state.mobileOpen;
  renderMobileDrawer();
  $('#mobileBackdrop').classList.toggle('hide', !state.mobileOpen);
}

function createSearchIndex() {
  const pages = [];
  for (const locale of ['cs', 'en']) {
    for (const doc of DATA.docs[locale]) {
      pages.push({
        type: 'doc',
        locale,
        slug: `/${locale}/docs/${doc.slug}`,
        title: doc.title,
        description: doc.description,
        text: stripHtml(doc.content),
      });
    }
    for (const post of DATA.blog[locale]) {
      pages.push({
        type: 'blog',
        locale,
        slug: `/${locale}/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        text: stripHtml(post.content),
      });
    }
    pages.push({
      type: 'api',
      locale,
      slug: `/${locale}/api`,
      title: DATA.ui[locale].nav_api,
      description: DATA.ui[locale].api_title,
      text: DATA.api.map(x => `${x.method} ${x.path} ${x.summary}`).join(' '),
    });
  }
  return pages;
}

const SEARCH_INDEX = createSearchIndex();

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter(item => (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.text.toLowerCase().includes(q)
  )).slice(0, 8);
}

function renderSearchResults(list, target) {
  target.innerHTML = list.length ? list.map(item => `
    <a class="result" href="#${item.slug}">
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.description)}</small>
    </a>
  `).join('') : `<div class="callout">${state.locale === 'cs' ? 'Nic nenalezeno.' : 'Nothing found.'}</div>`;
}

function setupSearch() {
  const field = $('#searchField');
  const results = $('#searchResults');
  field.addEventListener('input', () => renderSearchResults(runSearch(field.value), results));
  renderSearchResults([], results);
}

function setupPalette() {
  const field = $('#paletteField');
  const results = $('#paletteResults');
  const commands = [
    { label: state.locale === 'cs' ? 'Otevřít dokumentaci' : 'Open docs', action: () => setHash(`#/${state.locale}/docs/${getDocs()[0].slug}`) },
    { label: state.locale === 'cs' ? 'Otevřít blog' : 'Open blog', action: () => setHash(`#/${state.locale}/blog`) },
    { label: state.locale === 'cs' ? 'Otevřít API' : 'Open API', action: () => setHash(`#/${state.locale}/api`) },
    { label: state.locale === 'cs' ? 'Přepnout na English' : 'Switch to Czech', action: () => setLocale(state.locale === 'cs' ? 'en' : 'cs') },
  ];
  function draw(q) {
    const needle = q.trim().toLowerCase();
    const all = [
      ...commands.map(c => ({ label: c.label, hint: state.locale === 'cs' ? 'Akce' : 'Action', action: c.action })),
      ...SEARCH_INDEX.map(item => ({ label: item.title, hint: item.slug, action: () => setHash(`#${item.slug}`) })),
    ];
    const filtered = needle
      ? all.filter(item => (item.label + ' ' + item.hint).toLowerCase().includes(needle)).slice(0, 10)
      : all.slice(0, 10);
    results.innerHTML = filtered.map((item, idx) => `
      <button class="palette-item" data-palette-index="${idx}">
        ${escapeHtml(item.label)}
        <small>${escapeHtml(item.hint)}</small>
      </button>
    `).join('');
    results.querySelectorAll('[data-palette-index]').forEach((btn, idx) => {
      btn.addEventListener('click', () => filtered[idx].action());
    });
    results._filtered = filtered;
  }
  field.addEventListener('input', () => draw(field.value));
  draw('');
}

function setupGlobalInteractions() {
  $('#searchBtn').addEventListener('click', () => openModal('searchOpen'));
  $('#cmdBtn').addEventListener('click', () => openModal('paletteOpen'));
  $('#langSwitch').addEventListener('click', () => setLocale(state.locale === 'cs' ? 'en' : 'cs'));
  $('#mobileBtn').addEventListener('click', toggleMobile);
  $('#searchBackdrop').addEventListener('click', () => closeModal('searchOpen'));
  $('#paletteBackdrop').addEventListener('click', () => closeModal('paletteOpen'));
  $('#mobileBackdrop').addEventListener('click', () => { state.mobileOpen = false; $('#mobileBackdrop').classList.add('hide'); $('#mobileDrawer').classList.add('hide'); });
  $('#searchClose').addEventListener('click', () => closeModal('searchOpen'));
  $('#paletteClose').addEventListener('click', () => closeModal('paletteOpen'));
  $('#searchField').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal('searchOpen');
  });
  $('#paletteField').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal('paletteOpen');
    if (e.key === 'Enter') {
      const first = $('#paletteResults .palette-item');
      first?.click();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName || '')) {
      e.preventDefault();
      openModal('searchOpen');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal('paletteOpen');
    }
    if (e.key === 'Escape') {
      closeModal('searchOpen');
      closeModal('paletteOpen');
      state.mobileOpen = false;
      $('#mobileBackdrop').classList.add('hide');
      $('#mobileDrawer').classList.add('hide');
    }
  });

  document.addEventListener('click', async (e) => {
    const target = e.target;
    if (target && target.matches('.copy-btn')) {
      const code = target.closest('pre')?.querySelector('code')?.innerText || '';
      await navigator.clipboard?.writeText(code);
      const old = target.textContent;
      target.textContent = state.locale === 'cs' ? 'Zkopírováno' : 'Copied';
      setTimeout(() => target.textContent = old, 1200);
    }
  });
}

function enhanceCodeBlocks() {
  $$('.content-panel pre').forEach(pre => {
    if (pre.dataset.enhanced === 'true') return;
    pre.dataset.enhanced = 'true';
    const code = pre.querySelector('code');
    const lang = [...code.classList].find(cls => cls.startsWith('language-'))?.replace('language-', '') || 'text';
    const wrapper = document.createElement('div');
    wrapper.className = 'code-toolbar';
    wrapper.innerHTML = `<span>${lang.toUpperCase()}</span><button class="copy-btn" type="button">${state.locale === 'cs' ? 'Kopírovat' : 'Copy'}</button>`;
    pre.prepend(wrapper);
  });
}

function setReducedMotionFlag() {
  document.body.dataset.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'true' : 'false';
}

function bindRoute() {
  window.addEventListener('hashchange', () => {
    state.mobileOpen = false;
    $('#mobileBackdrop').classList.add('hide');
    $('#mobileDrawer').classList.add('hide');
    render();
    afterRender();
  });
}

function afterRender() {
  syncActiveChip();
  setupSearch();
  setupPalette();
  enhanceCodeBlocks();
  $('#mobileBackdrop').classList.add('hide');
  $('#mobileDrawer').classList.add('hide');
  if (!state.searchOpen) {
    $('#searchOpenBackdrop').classList.add('hide');
    $('#searchOpenModal').classList.add('hide');
  }
  if (!state.paletteOpen) {
    $('#paletteOpenBackdrop').classList.add('hide');
    $('#paletteOpenModal').classList.add('hide');
  }
}

function init() {
  setReducedMotionFlag();
  setupGlobalInteractions();
  bindRoute();
  render();
  afterRender();
}

init();
