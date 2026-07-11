import { DATA, NAV, ROUTES, DOC_ICONS } from './content.js';

const state = {
  locale: 'cs',
  section: 'home',
  slug: '',
  searchOpen: false,
  paletteOpen: false,
  mobileOpen: false,
  query: ''
};

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

const ICONS = {
  home: '⌂',
  docs: '◫',
  blog: '✎',
  api: '↗',
  search: '⌕',
  palette: '⌘',
  language: 'A/文',
  menu: '☰',
  close: '✕'
};

function currentUI() { return DATA.ui[state.locale]; }
function currentDocs() { return DATA.docs[state.locale]; }
function currentBlog() { return DATA.blog[state.locale]; }
function currentApi() { return DATA.api[state.locale]; }

function routeFromHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  const locale = parts[0] === 'en' ? 'en' : 'cs';
  const section = parts[1] || 'home';
  const slug = parts[2] || '';
  return { locale, section, slug };
}

function setHash(locale, section, slug = '') {
  const parts = [locale, section];
  if (slug) parts.push(slug);
  location.hash = '#/' + parts.join('/');
}

function syncStateFromHash() {
  const r = routeFromHash();
  state.locale = r.locale;
  state.section = r.section;
  state.slug = r.slug;
}

function findDoc(slug) { return currentDocs().find(item => item.slug === slug); }
function findBlog(slug) { return currentBlog().find(item => item.slug === slug); }
function findApi(slug) { return currentApi().find(item => item.slug === slug); }

function stripTags(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function excerpt(text, len = 120) {
  const s = String(text).replace(/\s+/g, ' ').trim();
  return s.length > len ? s.slice(0, len - 1).trimEnd() + '…' : s;
}

function buildSearchIndex() {
  const items = [];
  for (const locale of ['cs', 'en']) {
    for (const item of DATA.docs[locale]) {
      items.push({
        locale,
        section: 'docs',
        slug: item.slug,
        title: item.title,
        description: item.description,
        text: stripTags(item.body)
      });
    }
    for (const item of DATA.blog[locale]) {
      items.push({
        locale,
        section: 'blog',
        slug: item.slug,
        title: item.title,
        description: item.excerpt,
        text: stripTags(item.body) + ' ' + item.tags.join(' ')
      });
    }
    for (const item of DATA.api[locale]) {
      items.push({
        locale,
        section: 'api',
        slug: item.slug,
        title: item.title,
        description: item.description,
        text: stripTags(item.body) + ' ' + item.methods.join(' ')
      });
    }
  }
  return items;
}

const SEARCH_INDEX = buildSearchIndex();

function docList(locale) {
  const groups = NAV[locale];
  const docs = currentDocs();
  return groups.map(group => ({
    label: group.label,
    items: group.items.map(slug => docs.find(d => d.slug === slug)).filter(Boolean)
  }));
}

function routeLabel() {
  return ROUTES[state.locale][state.section] || ROUTES[state.locale].home;
}

function localePath(section, slug = '') {
  return `#/${state.locale}/${section}${slug ? '/' + slug : ''}`;
}

function setMeta(title, description) {
  document.title = `${title} · ${DATA.site.name}`;
  const desc = $('meta[name="description"]');
  if (desc) desc.setAttribute('content', description);
  const og = $('meta[property="og:description"]');
  if (og) og.setAttribute('content', description);
  const ogTitle = $('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
}

function renderTopbar() {
  $('#brandTitle').textContent = DATA.site.name;
  $('#brandSub').textContent = DATA.site.tagline[state.locale];
  $('#navHome').textContent = currentUI().nav_home;
  $('#navDocs').textContent = currentUI().nav_docs;
  $('#navBlog').textContent = currentUI().nav_blog;
  $('#navApi').textContent = currentUI().nav_api;
  $('#navHome').href = localePath('home');
  $('#navDocs').href = localePath('docs', currentDocs().sort((a,b) => a.order-b.order)[0]?.slug || '');
  $('#navBlog').href = localePath('blog');
  $('#navApi').href = localePath('api');
  $('#searchBtnText').textContent = currentUI().search;
  $('#cmdBtnText').textContent = currentUI().command;
  $('#langSwitch').textContent = state.locale.toUpperCase();
  $('#mobileBtn').setAttribute('aria-label', currentUI().open_menu);
}

function renderTree(hostSelector = '#sidebarTree', activeDocSlug = state.slug) {
  const host = $(hostSelector);
  if (!host) return;
  const groups = docList(state.locale);
  host.innerHTML = groups.map(group => `
    <div class="tree-group">
      <div class="tree-group-title">${group.label}</div>
      ${group.items.map(item => `
        <a class="tree-link ${state.section === 'docs' && activeDocSlug === item.slug ? 'active' : ''}" href="${localePath('docs', item.slug)}">
          <span class="icon">${DOC_ICONS[item.slug] || '•'}</span>
          <span class="meta">
            <strong>${item.title}</strong>
            <small>${item.description}</small>
          </span>
        </a>
      `).join('')}
    </div>
  `).join('');
}

function renderSidebar() {
  renderTree('#sidebarTree');
  renderTree('#mobileTree');
}

function renderBreadcrumbs(parts) {
  const host = $('#breadcrumbs');
  host.innerHTML = parts.map((p, idx) => {
    if (idx === parts.length - 1) return `<span>${p}</span>`;
    return `<a href="${p.href}">${p.label}</a> <span>›</span>`;
  }).join(' ');
}

function getDocNavOrder(locale) {
  return currentDocs().slice().sort((a, b) => a.order - b.order);
}

function renderToc() {
  const tocHost = $('#toc');
  const headings = $$('.content h2, .content h3');
  if (!headings.length) {
    tocHost.innerHTML = `<div class="panel-head"><h3>${currentUI().toc_title}</h3></div><p class="muted">${state.locale === 'cs' ? 'Žádné nadpisy.' : 'No headings.'}</p>`;
    return;
  }
  const links = headings.map((h, idx) => {
    if (!h.id) h.id = slugify(h.textContent);
    return `<a class="toc-link level-${h.tagName.toLowerCase() === 'h3' ? '3' : '2'}" href="#${h.id}">${h.textContent}</a>`;
  }).join('');
  tocHost.innerHTML = `<div class="panel-head"><h3>${currentUI().toc_title}</h3><span>${headings.length}</span></div><div class="toc-list">${links}</div>`;
  const onScroll = () => {
    const pos = window.scrollY + 110;
    let active = null;
    for (const h of headings) {
      if (h.offsetTop <= pos) active = h;
    }
    $$('.toc-link', tocHost).forEach(a => a.classList.toggle('active', active && a.getAttribute('href') === '#' + active.id));
  };
  onScroll();
  window.removeEventListener('scroll', renderToc._scroll);
  renderToc._scroll = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
}

function renderHome() {
  const ui = currentUI();
  setMeta(`${DATA.site.name} · ${DATA.site.tagline[state.locale]}`, DATA.site.description[state.locale]);
  const blog = currentBlog().slice(0, 2);
  const docs = currentDocs().slice().sort((a, b) => a.order - b.order).slice(0, 3);
  $('#main').innerHTML = `
    <section class="hero panel">
      <div class="kicker-row">
        <span class="hero-kicker"><span class="icon-dot"></span> ${ui.welcome}</span>
        <span class="mini-note">${ui.search_hint}</span>
      </div>
      <h1>${DATA.site.tagline[state.locale]}</h1>
      <p>${DATA.site.description[state.locale]}</p>
      <div class="hero-actions">
        <a class="primary" href="${localePath('docs', docs[0]?.slug || '')}">${ui.hero_cta} →</a>
        <a class="pill" href="${localePath('blog')}">${ui.hero_secondary}</a>
      </div>
    </section>

    <section class="grid-3">
      <div class="card stat">
        <strong>01</strong>
        <span>${ui.features}: sidebar, TOC, breadcrumbs, prev/next.</span>
      </div>
      <div class="card stat">
        <strong>02</strong>
        <span>Search modal + command palette with instant filtering.</span>
      </div>
      <div class="card stat">
        <strong>03</strong>
        <span>GitHub Pages friendly, pure static output, no build drama.</span>
      </div>
    </section>

    <section class="split">
      <div class="stack">
        <div class="section-title">
          <h2>${ui.start_here}</h2>
          <span>${currentDocs().length} docs</span>
        </div>
        <div class="article-list">
          ${docs.map(item => `
            <article class="article">
              <div class="meta"><span class="tag">${item.group}</span><span>${item.readingTime}</span></div>
              <h3><a href="${localePath('docs', item.slug)}">${item.title}</a></h3>
              <p>${item.description}</p>
            </article>
          `).join('')}
        </div>
      </div>

      <aside class="stack">
        <div class="section-title">
          <h2>${ui.latest_posts}</h2>
          <a href="${localePath('blog')}">${ui.all_posts}</a>
        </div>
        <div class="article-list">
          ${blog.map(post => `
            <article class="article">
              <div class="meta"><span>${post.date}</span><span>${post.tags.join(' · ')}</span></div>
              <h3><a href="${localePath('blog', post.slug)}">${post.title}</a></h3>
              <p>${post.excerpt}</p>
            </article>
          `).join('')}
        </div>
      </aside>
    </section>
  `;
}

function renderDoc() {
  const doc = findDoc(state.slug) || currentDocs().sort((a,b) => a.order-b.order)[0];
  if (!doc) {
    $('#main').innerHTML = `<section class="doc panel"><h1>404</h1><p>Missing document.</p></section>`;
    return;
  }
  setMeta(doc.title, doc.description);
  const ordered = getDocNavOrder(state.locale);
  const idx = ordered.findIndex(x => x.slug === doc.slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null;
  $('#main').innerHTML = `
    <section class="doc panel">
      <div class="breadcrumbs" id="breadcrumbs"></div>
      <div class="meta" style="margin-top:10px">
        <span class="tag">${doc.group}</span>
        <span>${doc.readingTime}</span>
        <span>${currentUI().edit_github}</span>
      </div>
      <h1>${doc.title}</h1>
      <p class="mini-note">${doc.description}</p>
      <div class="content">${doc.body}</div>
      <div class="inline-actions">
        ${prev ? `<a class="pill" href="${localePath('docs', prev.slug)}">← ${currentUI().prev}: ${prev.title}</a>` : ''}
        ${next ? `<a class="pill" href="${localePath('docs', next.slug)}">${currentUI().next}: ${next.title} →</a>` : ''}
      </div>
    </section>
  `;
  renderBreadcrumbs([
    { label: currentUI().breadcrumbs_home, href: localePath('home') },
    { label: currentUI().nav_docs, href: localePath('docs') },
    { label: doc.title, href: localePath('docs', doc.slug) }
  ]);
  renderToc();
}

function renderBlog() {
  const ui = currentUI();
  const posts = currentBlog();
  if (state.slug) {
    const post = findBlog(state.slug);
    if (post) {
      setMeta(post.title, post.excerpt);
      const related = posts.filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag))).slice(0, 2);
      $('#main').innerHTML = `
        <section class="article panel">
          <div class="breadcrumbs" id="breadcrumbs"></div>
          <div class="meta" style="margin-top:10px">
            <span>${post.date}</span>
            <span>${post.tags.map(t => `#${t}`).join(' ')}</span>
          </div>
          <h1>${post.title}</h1>
          <p class="mini-note">${post.excerpt}</p>
          <div class="content">${post.body}</div>
        </section>

        <section class="split">
          <div class="card">
            <div class="section-title"><h2>${ui.related}</h2></div>
            <div class="article-list">
              ${related.length ? related.map(r => `
                <article class="article">
                  <div class="meta"><span>${r.date}</span><span>${r.tags.join(' · ')}</span></div>
                  <h3><a href="${localePath('blog', r.slug)}">${r.title}</a></h3>
                  <p>${r.excerpt}</p>
                </article>
              `).join('') : `<p class="muted">${ui.no_results}</p>`}
            </div>
          </div>

          <div class="card">
            <div class="section-title"><h2>${ui.blog_tags}</h2></div>
            <div class="article-list">
              ${[...new Set(posts.flatMap(p => p.tags))].map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
            </div>
          </div>
        </section>
      `;
      renderBreadcrumbs([
        { label: currentUI().breadcrumbs_home, href: localePath('home') },
        { label: ui.nav_blog, href: localePath('blog') },
        { label: post.title, href: localePath('blog', post.slug) }
      ]);
      renderToc();
      return;
    }
  }
  setMeta(ui.nav_blog, DATA.site.description[state.locale]);
  $('#main').innerHTML = `
    <section class="panel card">
      <div class="section-title">
        <h2>${ui.nav_blog}</h2>
        <span>${posts.length} posts</span>
      </div>
      <div class="article-list">
        ${posts.map(post => `
          <article class="article">
            <div class="meta"><span>${post.date}</span><span>${post.tags.map(t => `#${t}`).join(' ')}</span></div>
            <h3><a href="${localePath('blog', post.slug)}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <a class="pill" href="${localePath('blog', post.slug)}">${ui.read_more} →</a>
          </article>
        `).join('')}
      </div>
    </section>
  `;
  renderBreadcrumbs([
    { label: currentUI().breadcrumbs_home, href: localePath('home') },
    { label: ui.nav_blog, href: localePath('blog') }
  ]);
  renderToc();
}

function renderApi() {
  const ui = currentUI();
  const endpoint = state.slug ? findApi(state.slug) : currentApi()[0];
  if (!endpoint) return;
  setMeta(ui.api_title, endpoint.description);
  $('#main').innerHTML = `
    <section class="api-box panel">
      <div class="breadcrumbs" id="breadcrumbs"></div>
      <div class="meta" style="margin-top:10px">
        <span class="tag">${ui.api_title}</span>
        <span>${endpoint.methods.join(' · ')}</span>
      </div>
      <h1>${endpoint.title}</h1>
      <p class="mini-note">${endpoint.description}</p>
      <div class="content">${endpoint.body}</div>
    </section>
    <section class="grid-2">
      ${currentApi().map(item => `
        <article class="card ${item.slug === endpoint.slug ? '' : ''}">
          <div class="meta"><span>${item.methods.join(' · ')}</span></div>
          <h3><a href="${localePath('api', item.slug)}">${item.title}</a></h3>
          <p>${item.description}</p>
        </article>
      `).join('')}
    </section>
  `;
  renderBreadcrumbs([
    { label: currentUI().breadcrumbs_home, href: localePath('home') },
    { label: ui.nav_api, href: localePath('api') },
    { label: endpoint.title, href: localePath('api', endpoint.slug) }
  ]);
  renderToc();
}

function renderSection() {
  $('#sidebarTree').innerHTML = '';
  renderSidebar();
  renderTopbar();
  document.body.dataset.locale = state.locale;
  const mobileActions = $('#mobileOverlay .actions');
  if (mobileActions) {
    mobileActions.innerHTML = `
      <a class="pill" href="${localePath('home')}">${currentUI().nav_home}</a>
      <a class="pill" href="${localePath('docs', currentDocs().sort((a,b) => a.order-b.order)[0]?.slug || '')}">${currentUI().nav_docs}</a>
      <a class="pill" href="${localePath('blog')}">${currentUI().nav_blog}</a>
      <a class="pill" href="${localePath('api')}">${currentUI().nav_api}</a>
    `;
  }

  if (state.section === 'home') renderHome();
  else if (state.section === 'docs') renderDoc();
  else if (state.section === 'blog') renderBlog();
  else if (state.section === 'api') renderApi();
  else renderHome();
}

function filterSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX.filter(item => item.locale === state.locale).slice(0, 8);
  return SEARCH_INDEX.filter(item =>
    item.locale === state.locale &&
    (item.title + ' ' + item.description + ' ' + item.text).toLowerCase().includes(q)
  ).slice(0, 12);
}

function openSearch() {
  state.searchOpen = true;
  $('#searchOverlay').classList.remove('hidden');
  $('#searchInput').value = state.query || '';
  $('#searchInput').focus();
  renderSearchResults();
}
function closeSearch() {
  state.searchOpen = false;
  $('#searchOverlay').classList.add('hidden');
}
function openPalette() {
  state.paletteOpen = true;
  $('#paletteOverlay').classList.remove('hidden');
  $('#paletteInput').value = '';
  $('#paletteInput').focus();
  renderPaletteResults('');
}
function closePalette() {
  state.paletteOpen = false;
  $('#paletteOverlay').classList.add('hidden');
}
function openMobile() {
  state.mobileOpen = true;
  $('#mobileOverlay').classList.remove('hidden');
}
function closeMobile() {
  state.mobileOpen = false;
  $('#mobileOverlay').classList.add('hidden');
}

function renderSearchResults() {
  const list = filterSearch($('#searchInput').value);
  const host = $('#searchResults');
  const ui = currentUI();
  host.innerHTML = list.length ? list.map(item => `
    <a class="result" href="${localePath(item.section, item.slug)}">
      <strong>${item.title}</strong>
      <small>${item.description}</small>
      <small>${item.section.toUpperCase()}</small>
    </a>
  `).join('') : `<p class="muted">${ui.no_results}</p>`;
}

function paletteItems() {
  const base = [
    { label: currentUI().nav_docs, desc: 'Open docs home', href: localePath('docs', currentDocs().sort((a,b) => a.order-b.order)[0]?.slug || '') },
    { label: currentUI().nav_blog, desc: 'Open blog', href: localePath('blog') },
    { label: currentUI().nav_api, desc: 'Open API', href: localePath('api') },
    { label: state.locale === 'cs' ? 'English' : 'Čeština', desc: 'Switch language', action: () => setHash(state.locale === 'cs' ? 'en' : 'cs', state.section, state.slug) }
  ];
  for (const item of currentDocs()) {
    base.push({ label: item.title, desc: item.description, href: localePath('docs', item.slug) });
  }
  return base;
}

function renderPaletteResults(query) {
  const q = query.trim().toLowerCase();
  const host = $('#paletteResults');
  const items = paletteItems().filter(item => !q || (item.label + ' ' + item.desc).toLowerCase().includes(q));
  host.innerHTML = items.slice(0, 10).map(item => `
    <button class="result" type="button" data-href="${item.href || ''}" data-action="${item.action ? '1' : ''}">
      <strong>${item.label}</strong>
      <small>${item.desc}</small>
    </button>
  `).join('');
  $$('.result', host).forEach(btn => {
    btn.addEventListener('click', () => {
      const href = btn.dataset.href;
      if (href) location.hash = href;
      closePalette();
      if (btn.dataset.action) paletteItems().find(x => x.action)?.action();
    });
  });
}

function handleHash() {
  syncStateFromHash();
  if (!location.hash) {
    setHash('cs', 'home');
    return;
  }
  renderSection();
}

function bindEvents() {
  $('#searchBtn').addEventListener('click', openSearch);
  $('#cmdBtn').addEventListener('click', openPalette);
  $('#mobileBtn').addEventListener('click', openMobile);
  $('#langSwitch').addEventListener('click', () => setHash(state.locale === 'cs' ? 'en' : 'cs', state.section, state.slug));
  $('#searchInput').addEventListener('input', renderSearchResults);
  $('#paletteInput').addEventListener('input', e => renderPaletteResults(e.target.value));
  $('#searchOverlay').addEventListener('click', e => { if (e.target.id === 'searchOverlay') closeSearch(); });
  $('#paletteOverlay').addEventListener('click', e => { if (e.target.id === 'paletteOverlay') closePalette(); });
  $('#mobileOverlay').addEventListener('click', e => { if (e.target.id === 'mobileOverlay') closeMobile(); });
  $('#searchClose').addEventListener('click', closeSearch);
  $('#paletteClose').addEventListener('click', closePalette);
  $('#mobileClose').addEventListener('click', closeMobile);

  window.addEventListener('hashchange', handleHash);
  window.addEventListener('keydown', e => {
    if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) && !e.altKey) {
      e.preventDefault();
      if (e.key === '/') openSearch(); else openPalette();
    }
    if (e.key === 'Escape') {
      closeSearch(); closePalette(); closeMobile();
    }
  });
}

function init() {
  if (!location.hash) location.hash = '#/cs/home';
  bindEvents();
  handleHash();
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

window.addEventListener('DOMContentLoaded', init);
