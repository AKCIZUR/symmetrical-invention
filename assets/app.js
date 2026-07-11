import { DATA } from './content.js';

const LOCALES = ['cs', 'en'];
const DEFAULT_LOCALE = localStorage.getItem('vicsdocs-locale') || 'cs';

const state = {
  locale: DEFAULT_LOCALE,
  route: `/${DEFAULT_LOCALE}/home`,
  searchOpen: false,
  paletteOpen: false,
  mobileOpen: false,
};

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineFormat(text) {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safe = /^https?:\/\//.test(url) || url.startsWith('#') || url.startsWith('/') ? url : '#';
    return `<a href="${safe}" class="text-accent underline-offset-4 hover:underline">${label}</a>`;
  });
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function highlightLine(line, lang) {
  let s = escapeHtml(line);
  const keyword = (re) => s.replace(re, '<span class="tok-kw">$1</span>');
  if (lang === 'js' || lang === 'javascript' || lang === 'ts' || lang === 'typescript' || lang === 'json') {
    s = s.replace(/(\/\/.*$)/, '<span class="tok-com">$1</span>');
    s = s.replace(/("(?:\\.|[^"])*")/g, '<span class="tok-str">$1</span>');
    s = s.replace(/\b(const|let|var|function|return|if|else|for|while|true|false|null|undefined|async|await|import|from|export|default|class|new|this|extends|typeof|switch|case|break|catch|try|throw)\b/g, '<span class="tok-kw">$1</span>');
    s = s.replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>');
  } else if (lang === 'css') {
    s = s.replace(/(\/\*.*?\*\/)/g, '<span class="tok-com">$1</span>');
    s = s.replace(/([a-z-]+)(\s*:)/g, '<span class="tok-prop">$1</span>$2');
    s = s.replace(/("(?:\\.|[^"])*")/g, '<span class="tok-str">$1</span>');
    s = s.replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>');
  } else if (lang === 'html') {
    s = s.replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g, '$1<span class="tok-tag">$2</span>');
    s = s.replace(/([a-zA-Z-:]+)=(&quot;[^&]*&quot;)/g, '<span class="tok-attr">$1</span>=$2');
  } else if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    s = s.replace(/(#.*$)/, '<span class="tok-com">$1</span>');
    s = s.replace(/(\$[A-Za-z_][A-Za-z0-9_]*)/g, '<span class="tok-var">$1</span>');
  }
  return s;
}

function renderCodeBlock(code, lang) {
  const lines = code.split('\n').map((line) => highlightLine(line, lang)).join('\n');
  const label = (lang || 'text').toUpperCase();
  return `
    <div class="code-block" data-lang="${escapeHtml(lang || 'text')}">
      <div class="code-top">
        <span class="code-lang">${escapeHtml(label)}</span>
        <div class="code-actions">
          <button class="mini-btn code-copy" type="button">Copy</button>
          <button class="mini-btn code-wrap" type="button">Wrap</button>
        </div>
      </div>
      <pre class="code-pre"><code>${lines}</code></pre>
    </div>
  `;
}

function parseMarkdown(md) {
  const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  const toc = [];
  let i = 0;
  let para = [];
  let list = null; // {type:'ul'|'ol', items:[]}
  let quote = [];
  let table = null;
  let code = null; // {lang, lines}
  function flushPara() {
    if (!para.length) return;
    out.push(`<p>${inlineFormat(para.join(' ').trim())}</p>`);
    para = [];
  }
  function flushList() {
    if (!list) return;
    const tag = list.type === 'ol' ? 'ol' : 'ul';
    out.push(`<${tag}>${list.items.map((item) => `<li>${inlineFormat(item)}</li>`).join('')}</${tag}>`);
    list = null;
  }
  function flushQuote() {
    if (!quote.length) return;
    out.push(`<blockquote>${quote.map((q) => `<p>${inlineFormat(q)}</p>`).join('')}</blockquote>`);
    quote = [];
  }
  function flushTable() {
    if (!table) return;
    const [header, ...rows] = table;
    const headCells = header.split('|').map((c) => c.trim()).filter(Boolean);
    const bodyRows = rows.filter((row) => !/^\s*\|?\s*[-: ]+(\|\s*[-: ]+)+\|?\s*$/.test(row));
    const parsedRows = bodyRows.map((row) => row.split('|').map((c) => c.trim()).filter(Boolean));
    out.push('<table><thead><tr>' + headCells.map((c) => `<th>${inlineFormat(c)}</th>`).join('') + '</tr></thead><tbody>' +
      parsedRows.map((cells) => '<tr>' + cells.map((c) => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>').join('') +
      '</tbody></table>');
    table = null;
  }
  function flushCode() {
    if (!code) return;
    out.push(renderCodeBlock(code.lines.join('\n'), code.lang));
    code = null;
  }

  while (i < lines.length) {
    const line = lines[i];
    const next = lines[i + 1] ?? '';

    if (code) {
      if (line.startsWith('```')) {
        flushCode();
      } else {
        code.lines.push(line);
      }
      i += 1;
      continue;
    }

    if (table) {
      if (line.trim() === '') {
        flushTable();
        i += 1;
        continue;
      }
      if (line.includes('|')) {
        table.push(line);
        i += 1;
        continue;
      }
      flushTable();
      continue;
    }

    if (quote.length) {
      if (line.startsWith('>')) {
        quote.push(line.replace(/^>\s?/, ''));
        i += 1;
        continue;
      }
      flushQuote();
    }

    if (list) {
      const match = list.type === 'ol' ? line.match(/^\s*\d+\.\s+(.*)$/) : line.match(/^\s*[-*]\s+(.*)$/);
      if (match) {
        list.items.push(match[1]);
        i += 1;
        continue;
      }
      if (line.trim() === '') {
        flushList();
        i += 1;
        continue;
      }
      flushList();
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushPara();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      if (level <= 4) toc.push({ id, label: text, level });
      out.push(`<h${level} id="${id}">${inlineFormat(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      flushPara();
      flushList();
      flushQuote();
      const meta = line.slice(3).trim();
      const [lang] = meta.split(/\s+/);
      code = { lang: lang || 'text', lines: [] };
      i += 1;
      continue;
    }

    if (line.startsWith('>')) {
      flushPara();
      quote.push(line.replace(/^>\s?/, ''));
      i += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushPara();
      if (!list) list = { type: 'ul', items: [] };
      list.items.push(line.replace(/^\s*[-*]\s+/, ''));
      i += 1;
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara();
      if (!list) list = { type: 'ol', items: [] };
      list.items.push(line.replace(/^\s*\d+\.\s+/, ''));
      i += 1;
      continue;
    }

    if (line.includes('|') && /^\s*\|?\s*[-:| ]+\|?\s*$/.test(next)) {
      flushPara();
      flushList();
      flushQuote();
      table = [line, next];
      i += 2;
      while (i < lines.length) {
        const row = lines[i];
        if (!row.trim()) break;
        if (!row.includes('|')) break;
        table.push(row);
        i += 1;
      }
      flushTable();
      continue;
    }

    if (line.trim() === '') {
      flushPara();
      flushList();
      flushQuote();
      i += 1;
      continue;
    }

    para.push(line.trim());
    i += 1;
  }

  flushPara();
  flushList();
  flushQuote();
  flushTable();
  flushCode();

  return { html: out.join('\n'), toc };
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s/.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeOf(locale, section, slug) {
  if (section === 'home') return `/${locale}/home`;
  if (section === 'docs') return slug ? `/${locale}/docs/${slug}` : `/${locale}/docs`;
  if (section === 'blog') return slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;
  if (section === 'api') return slug ? `/${locale}/api/${slug}` : `/${locale}/api`;
  return `/${locale}/home`;
}

function parseRoute(hash) {
  const raw = (hash || location.hash || '').replace(/^#/, '').replace(/^\//, '');
  const parts = raw.split('/').filter(Boolean);
  const locale = LOCALES.includes(parts[0]) ? parts[0] : state.locale;
  const section = parts[1] || 'home';
  const slug = parts.slice(2).join('/') || '';
  return { locale, section, slug };
}

function setHash(route, replace = false) {
  if (replace) {
    history.replaceState(null, '', `#${route}`);
  } else {
    location.hash = route;
  }
}

function currentText(locale, key) {
  return DATA.ui[locale][key] || DATA.ui.cs[key] || key;
}

function docsList(locale) {
  return [...DATA.docs[locale]].sort((a, b) => (a.group === b.group ? a.order - b.order : a.group.localeCompare(b.group)));
}

function blogList(locale) {
  return [...DATA.blog[locale]].sort((a, b) => b.date.localeCompare(a.date));
}

function apiList(locale) {
  return [...DATA.api[locale]];
}

function buildRegistry(locale) {
  const items = [];
  items.push({
    type: 'page',
    kind: 'home',
    section: 'home',
    route: routeOf(locale, 'home'),
    title: currentText(locale, 'nav_home'),
    description: DATA.site.description[locale],
    tags: ['home', 'overview'],
    text: normalize(`${DATA.site.description[locale]} ${DATA.site.tagline[locale]}`)
  });
  for (const page of docsList(locale)) {
    items.push({
      type: 'doc',
      kind: 'doc',
      section: 'docs',
      route: routeOf(locale, 'docs', page.slug),
      title: page.title,
      description: page.description,
      tags: [page.group, 'docs'],
      text: normalize(`${page.title} ${page.description} ${page.body}`),
      group: page.group,
    });
  }
  for (const post of blogList(locale)) {
    items.push({
      type: 'post',
      kind: 'blog',
      section: 'blog',
      route: routeOf(locale, 'blog', post.slug),
      title: post.title,
      description: post.excerpt,
      tags: post.tags,
      text: normalize(`${post.title} ${post.excerpt} ${post.body}`),
      date: post.date,
    });
  }
  for (const endpoint of apiList(locale)) {
    items.push({
      type: 'api',
      kind: 'api',
      section: 'api',
      route: routeOf(locale, 'api', endpoint.slug),
      title: `${endpoint.method} ${endpoint.path}`,
      description: endpoint.summary,
      tags: [endpoint.method, 'api'],
      text: normalize(`${endpoint.method} ${endpoint.path} ${endpoint.summary} ${endpoint.body}`),
      endpoint,
    });
  }
  return items;
}

function searchRegistry(locale, query) {
  const q = normalize(query);
  if (!q) return [];
  const reg = buildRegistry(locale);
  const scored = reg.map((item) => {
    const hay = normalize(`${item.title} ${item.description} ${item.text} ${(item.tags || []).join(' ')}`);
    let score = 0;
    for (const token of q.split(' ')) {
      if (!token) continue;
      if (hay.includes(token)) score += 1;
    }
    if (hay.startsWith(q)) score += 1;
    return { ...item, score };
  }).filter((item) => item.score > 0);
  return scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function docsMeta(locale, slug) {
  return docsList(locale).find((page) => page.slug === slug);
}

function blogMeta(locale, slug) {
  return blogList(locale).find((post) => post.slug === slug);
}

function apiMeta(locale, slug) {
  return apiList(locale).find((endpoint) => endpoint.slug === slug);
}

function contentPath(route) {
  const { locale, section, slug } = parseRoute(route);
  if (section === 'docs') return `content/docs/${slug || 'index'}.md`;
  if (section === 'blog') return `content/blog/${slug || 'index'}.md`;
  if (section === 'api') return `content/api/${slug || 'index'}.md`;
  return `content/home.md`;
}

function prevNext(locale, slug) {
  const list = docsList(locale);
  const idx = list.findIndex((item) => item.slug === slug);
  return {
    prev: idx > 0 ? list[idx - 1] : null,
    next: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
  };
}

function latestPosts(locale, count = 3) {
  return blogList(locale).slice(0, count);
}

function relatedPosts(locale, post) {
  const posts = blogList(locale);
  const ranked = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const overlap = p.tags.filter((t) => post.tags.includes(t)).length;
      return { ...p, overlap };
    })
    .filter((p) => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.date.localeCompare(a.date));
  return ranked.slice(0, 3);
}

function renderHeader(locale, section) {
  const nav = `
    <nav class="top-links">
      <a class="nav-link ${section === 'home' ? 'active' : ''}" href="#${routeOf(locale, 'home')}">${currentText(locale, 'nav_home')}</a>
      <a class="nav-link ${section === 'docs' ? 'active' : ''}" href="#${routeOf(locale, 'docs')}">${currentText(locale, 'nav_docs')}</a>
      <a class="nav-link ${section === 'blog' ? 'active' : ''}" href="#${routeOf(locale, 'blog')}">${currentText(locale, 'nav_blog')}</a>
      <a class="nav-link ${section === 'api' ? 'active' : ''}" href="#${routeOf(locale, 'api')}">${currentText(locale, 'nav_api')}</a>
      <a class="nav-link ${section === 'roadmap' ? 'active' : ''}" href="#${routeOf(locale, 'docs', 'roadmap')}">${currentText(locale, 'nav_roadmap')}</a>
    </nav>`;
  return `
    <header class="topbar glass">
      <a class="brand" href="#${routeOf(locale, 'home')}" aria-label="VICSDOCS home">
        <img src="./assets/logo.svg" alt="" width="148" height="28" />
      </a>
      ${nav}
      <div class="top-actions">
        <button class="icon-btn" type="button" data-open-search aria-label="${currentText(locale, 'search')}">⌕</button>
        <button class="icon-btn" type="button" data-open-palette aria-label="${currentText(locale, 'command')}">⌘K</button>
        <button class="icon-btn mobile-menu-toggle" type="button" aria-label="Menu">☰</button>
        <div class="locale-switch">
          <button class="chip ${locale === 'cs' ? 'active' : ''}" data-switch-locale="cs" type="button">CZ</button>
          <button class="chip ${locale === 'en' ? 'active' : ''}" data-switch-locale="en" type="button">EN</button>
        </div>
      </div>
    </header>
  `;
}

function renderMobileNav(locale, section) {
  const links = [
    ['home', currentText(locale, 'nav_home')],
    ['docs', currentText(locale, 'nav_docs')],
    ['blog', currentText(locale, 'nav_blog')],
    ['api', currentText(locale, 'nav_api')],
    ['docs/roadmap', currentText(locale, 'nav_roadmap')],
  ].map(([path, label]) => {
    const target = path === 'home' ? routeOf(locale, 'home') :
      path === 'docs' ? routeOf(locale, 'docs') :
      path === 'blog' ? routeOf(locale, 'blog') :
      path === 'api' ? routeOf(locale, 'api') :
      routeOf(locale, 'docs', 'roadmap');
    return `<a class="mobile-link ${section === path.split('/')[0] ? 'active' : ''}" href="#${target}">${label}</a>`;
  }).join('');
  return `
    <div class="mobile-drawer ${state.mobileOpen ? 'open' : ''}">
      <div class="mobile-sheet glass">
        <div class="mobile-head">
          <strong>${DATA.site.name}</strong>
          <button class="icon-btn" type="button" data-close-mobile>✕</button>
        </div>
        <div class="mobile-stack">
          ${links}
          <div class="mobile-locale">
            <span>${currentText(locale, 'language')}</span>
            <div class="locale-switch">
              <button class="chip ${locale === 'cs' ? 'active' : ''}" data-switch-locale="cs" type="button">CZ</button>
              <button class="chip ${locale === 'en' ? 'active' : ''}" data-switch-locale="en" type="button">EN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSidebar(locale, activeSlug) {
  const groups = DATA.nav[locale].map((group) => {
    const items = group.items.map((slug) => {
      const page = docsMeta(locale, slug);
      if (!page) return '';
      const active = slug === activeSlug ? 'active' : '';
      return `<a class="sidebar-link ${active}" href="#${routeOf(locale, 'docs', slug)}"><span>${page.title}</span><small>${page.description}</small></a>`;
    }).join('');
    return `
      <div class="side-group">
        <div class="side-group-title">${group.label}</div>
        <div class="side-group-items">${items}</div>
      </div>
    `;
  }).join('');
  return `
    <aside class="sidebar glass">
      <div class="side-label">${currentText(locale, 'sidebar_title')}</div>
      ${groups}
    </aside>
  `;
}

function renderToc(toc, locale) {
  if (!toc || !toc.length) return '';
  const items = toc.map((item) => `<a href="#${item.id}" class="toc-link level-${item.level}">${item.label}</a>`).join('');
  return `
    <aside class="toc glass">
      <div class="side-label">${currentText(locale, 'toc_title')}</div>
      ${items}
    </aside>
  `;
}

function breadcrumbs(locale, crumbs) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${crumbs.map((c, idx) => idx === crumbs.length - 1
        ? `<span class="crumb current">${c.label}</span>`
        : `<a class="crumb" href="#${c.route}">${c.label}</a>`).join('<span class="crumb-sep">/</span>')}
    </nav>
  `;
}

function statCard(title, value, note) {
  return `<div class="stat glass"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(title)}</span><small>${escapeHtml(note || '')}</small></div>`;
}

function featureCard(title, text, route, accent) {
  return `
    <a class="feature-card glass" href="#${route}">
      <span class="feature-accent">${escapeHtml(accent || '•')}</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(text)}</p>
    </a>
  `;
}

function releaseBadge(text) {
  return `<span class="badge">${escapeHtml(text)}</span>`;
}

function renderHome(locale) {
  const docsCount = docsList(locale).length;
  const blogCount = blogList(locale).length;
  const apiCount = apiList(locale).length;
  const latest = latestPosts(locale, 3).map((post) => `
    <a class="post-card glass" href="#${routeOf(locale, 'blog', post.slug)}">
      <div class="post-meta">${post.date} · ${post.tags.join(' · ')}</div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
    </a>
  `).join('');
  const features = [
    [currentText(locale, 'architecture'), currentText(locale, 'docs_intro'), routeOf(locale, 'docs', 'architecture'), '01'],
    [currentText(locale, 'design_tokens'), currentText(locale, 'docs_intro'), routeOf(locale, 'docs', 'design-system'), '02'],
    [currentText(locale, 'search_title'), currentText(locale, 'docs_intro'), routeOf(locale, 'docs', 'navigation-search'), '03'],
    [currentText(locale, 'deployment'), currentText(locale, 'docs_intro'), routeOf(locale, 'docs', 'deployment'), '04'],
  ].map((item) => featureCard(item[0], item[1], item[2], item[3])).join('');

  return `
    ${breadcrumbs(locale, [{ label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') }])}
    <section class="hero glass">
      <div class="hero-copy">
        <div class="eyebrow">${DATA.site.name} · ${DATA.site.tagline[locale]}</div>
        <h1>${DATA.site.description[locale]}</h1>
        <p>${currentText(locale, 'docs_intro')}</p>
        <div class="hero-actions">
          <a class="btn primary" href="#${routeOf(locale, 'docs')}">${currentText(locale, 'open_docs')}</a>
          <a class="btn secondary" href="#${routeOf(locale, 'blog')}">${currentText(locale, 'view_blog')}</a>
        </div>
      </div>
      <div class="hero-panel">
        <div class="code-block">
          <div class="code-top">
            <span class="code-lang">JSON</span>
            <div class="code-actions">
              <span class="mini-btn ghost">${releaseBadge('v1')}</span>
            </div>
          </div>
          <pre class="code-pre"><code>{
  "docs": ${docsCount},
  "blog": ${blogCount},
  "api": ${apiCount},
  "locale": "${locale}"
}</code></pre>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      ${statCard(currentText(locale, 'featured'), `${docsCount + blogCount + apiCount}`, locale === 'cs' ? 'Připravené cesty' : 'Ready routes')}
      ${statCard(currentText(locale, 'quick_start'), '1', locale === 'cs' ? 'Stránka, která vysvětlí všechno' : 'One page to explain it all')}
      ${statCard(currentText(locale, 'release_notes'), latestPosts(locale, 1)[0]?.date || '2026-07-11', locale === 'cs' ? 'Nejnovější změna' : 'Latest update')}
      ${statCard('GitHub Pages', 'Static', locale === 'cs' ? 'Bez serveru' : 'No server')}
    </section>

    <section class="section-grid">
      <div class="panel-column">
        <div class="section-head">
          <h2>${currentText(locale, 'featured')}</h2>
          <p>${currentText(locale, 'system_map')}</p>
        </div>
        <div class="feature-grid">
          ${features}
        </div>
      </div>
      <div class="panel-column">
        <div class="section-head">
          <h2>${currentText(locale, 'latest_posts')}</h2>
          <p>${currentText(locale, 'blog_intro')}</p>
        </div>
        <div class="post-grid">
          ${latest}
        </div>
      </div>
    </section>
  `;
}

function renderDocsIndex(locale) {
  const groups = DATA.nav[locale].map((group) => {
    const cards = group.items.map((slug) => {
      const page = docsMeta(locale, slug);
      return `<a class="doc-card glass" href="#${routeOf(locale, 'docs', slug)}"><strong>${escapeHtml(page.title)}</strong><p>${escapeHtml(page.description)}</p></a>`;
    }).join('');
    return `
      <section class="doc-group">
        <div class="section-head">
          <h2>${escapeHtml(group.label)}</h2>
        </div>
        <div class="doc-grid">${cards}</div>
      </section>
    `;
  }).join('');
  return `
    ${breadcrumbs(locale, [
      { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
      { label: currentText(locale, 'nav_docs'), route: routeOf(locale, 'docs') },
    ])}
    <section class="page-head glass">
      <h1>${currentText(locale, 'docs_overview')}</h1>
      <p>${currentText(locale, 'docs_intro')}</p>
    </section>
    ${groups}
  `;
}

function renderBlogIndex(locale) {
  const posts = blogList(locale).map((post) => `
    <a class="post-card glass" href="#${routeOf(locale, 'blog', post.slug)}">
      <div class="post-meta">${post.date} · ${post.tags.join(' · ')} · ${post.reading} min</div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
    </a>
  `).join('');
  return `
    ${breadcrumbs(locale, [
      { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
      { label: currentText(locale, 'nav_blog'), route: routeOf(locale, 'blog') },
    ])}
    <section class="page-head glass">
      <h1>${currentText(locale, 'nav_blog')}</h1>
      <p>${currentText(locale, 'blog_intro')}</p>
    </section>
    <section class="post-grid">${posts}</section>
  `;
}

function renderBlogPost(locale, slug) {
  const post = blogMeta(locale, slug);
  if (!post) return renderNotFound(locale);
  const parsed = parseMarkdown(post.body);
  const related = relatedPosts(locale, post).map((item) => `
    <a class="post-card glass" href="#${routeOf(locale, 'blog', item.slug)}">
      <div class="post-meta">${item.date} · ${item.tags.join(' · ')}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.excerpt)}</p>
    </a>
  `).join('');
  return `
    ${breadcrumbs(locale, [
      { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
      { label: currentText(locale, 'nav_blog'), route: routeOf(locale, 'blog') },
      { label: post.title, route: routeOf(locale, 'blog', slug) },
    ])}
    <article class="article glass">
      <header class="article-head">
        <div class="eyebrow">${post.date} · ${post.tags.join(' · ')}</div>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(post.excerpt)}</p>
      </header>
      <div class="prose">${parsed.html}</div>
    </article>
    <section class="related">
      <div class="section-head">
        <h2>${locale === 'cs' ? 'Související články' : 'Related posts'}</h2>
      </div>
      <div class="post-grid">${related}</div>
    </section>
  `;
}

function renderApiIndex(locale) {
  const cards = apiList(locale).map((endpoint) => `
    <a class="api-card glass" href="#${routeOf(locale, 'api', endpoint.slug)}">
      <div class="api-meta"><span class="method">${endpoint.method}</span><span>${endpoint.path}</span></div>
      <strong>${escapeHtml(endpoint.title)}</strong>
      <p>${escapeHtml(endpoint.summary)}</p>
    </a>
  `).join('');
  return `
    ${breadcrumbs(locale, [
      { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
      { label: currentText(locale, 'nav_api'), route: routeOf(locale, 'api') },
    ])}
    <section class="page-head glass">
      <h1>${currentText(locale, 'nav_api')}</h1>
      <p>${currentText(locale, 'api_intro')}</p>
    </section>
    <section class="api-grid">${cards}</section>
  `;
}

function renderApiEndpoint(locale, slug) {
  const endpoint = apiMeta(locale, slug);
  if (!endpoint) return renderNotFound(locale);
  const parsed = parseMarkdown(endpoint.body);
  return `
    ${breadcrumbs(locale, [
      { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
      { label: currentText(locale, 'nav_api'), route: routeOf(locale, 'api') },
      { label: endpoint.path, route: routeOf(locale, 'api', slug) },
    ])}
    <article class="article glass">
      <header class="article-head">
        <div class="api-meta"><span class="method">${endpoint.method}</span><span>${endpoint.path}</span></div>
        <h1>${escapeHtml(endpoint.title)}</h1>
        <p>${escapeHtml(endpoint.summary)}</p>
      </header>
      <div class="prose">${parsed.html}</div>
    </article>
  `;
}

function renderDocPage(locale, slug) {
  const page = docsMeta(locale, slug);
  if (!page) return renderNotFound(locale);
  const parsed = parseMarkdown(page.body);
  const { prev, next } = prevNext(locale, slug);
  const editPath = `content/docs/${slug}.md`;
  const toc = renderToc(parsed.toc, locale);
  const breadcrumbItems = [
    { label: currentText(locale, 'breadcrumbs_home'), route: routeOf(locale, 'home') },
    { label: currentText(locale, 'nav_docs'), route: routeOf(locale, 'docs') },
    { label: page.title, route: routeOf(locale, 'docs', slug) },
  ];
  return `
    ${breadcrumbs(locale, breadcrumbItems)}
    <div class="doc-shell">
      ${renderSidebar(locale, slug)}
      <article class="article glass">
        <header class="article-head">
          <div class="eyebrow">${page.group} · ${page.updated}</div>
          <h1>${escapeHtml(page.title)}</h1>
          <p>${escapeHtml(page.description)}</p>
          <div class="article-actions">
            <a class="btn secondary" href="${DATA.site.editBase}${editPath}" target="_blank" rel="noreferrer">${currentText(locale, 'edit_github')}</a>
            <span class="badge">${currentText(locale, 'nav_docs')}</span>
          </div>
        </header>
        <div class="prose">${parsed.html}</div>
        <div class="doc-footer">
          ${prev ? `<a class="nav-card glass" href="#${routeOf(locale, 'docs', prev.slug)}"><span>← ${escapeHtml(prev.title)}</span><small>${escapeHtml(prev.description)}</small></a>` : '<span></span>'}
          ${next ? `<a class="nav-card glass" href="#${routeOf(locale, 'docs', next.slug)}"><span>${escapeHtml(next.title)} →</span><small>${escapeHtml(next.description)}</small></a>` : '<span></span>'}
        </div>
      </article>
      ${toc}
    </div>
  `;
}

function renderNotFound(locale) {
  return `
    <section class="page-head glass">
      <h1>404</h1>
      <p>${locale === 'cs' ? 'Tato cesta neexistuje. Zkus sidebar nebo vyhledávání.' : 'This route does not exist. Try the sidebar or search.'}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#${routeOf(locale, 'home')}">${currentText(locale, 'nav_home')}</a>
        <a class="btn secondary" href="#${routeOf(locale, 'docs')}">${currentText(locale, 'nav_docs')}</a>
      </div>
    </section>
  `;
}

function renderSearchModal(locale) {
  const placeholder = currentText(locale, 'search_placeholder');
  return `
    <div class="overlay ${state.searchOpen ? 'open' : ''}" data-overlay-search>
      <div class="modal glass search-modal">
        <div class="modal-head">
          <strong>${currentText(locale, 'search_title')}</strong>
          <button class="icon-btn" type="button" data-close-search>✕</button>
        </div>
        <input class="search-input" data-search-input placeholder="${placeholder}" />
        <div class="modal-sub">${currentText(locale, 'search_results')}</div>
        <div class="results" data-search-results></div>
      </div>
    </div>
  `;
}

function renderPalette(locale) {
  const actions = [
    { label: currentText(locale, 'nav_home'), route: routeOf(locale, 'home') },
    { label: currentText(locale, 'nav_docs'), route: routeOf(locale, 'docs') },
    { label: currentText(locale, 'nav_blog'), route: routeOf(locale, 'blog') },
    { label: currentText(locale, 'nav_api'), route: routeOf(locale, 'api') },
    { label: currentText(locale, 'open_locale'), action: 'toggle-locale' },
    { label: currentText(locale, 'search_title'), action: 'open-search' },
  ];
  return `
    <div class="overlay ${state.paletteOpen ? 'open' : ''}" data-overlay-palette>
      <div class="modal glass palette-modal">
        <div class="modal-head">
          <strong>${currentText(locale, 'command')}</strong>
          <button class="icon-btn" type="button" data-close-palette>✕</button>
        </div>
        <div class="palette-items">
          ${actions.map((a) => `
            <button class="palette-item" type="button" data-palette-action="${a.action || a.route}" data-palette-label="${escapeHtml(a.label)}">
              <span>${escapeHtml(a.label)}</span>
              <small>${escapeHtml(a.route || '')}</small>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderMobile(locale, section) {
  return renderMobileNav(locale, section);
}

function renderApp() {
  const parsed = parseRoute();
  state.locale = LOCALES.includes(parsed.locale) ? parsed.locale : DEFAULT_LOCALE;
  localStorage.setItem('vicsdocs-locale', state.locale);
  const locale = state.locale;
  const section = parsed.section;
  const slug = parsed.slug;
  state.route = routeOf(locale, section, slug);

  let mainHtml = '';
  if (section === 'home') mainHtml = renderHome(locale);
  else if (section === 'docs' && !slug) mainHtml = renderDocsIndex(locale);
  else if (section === 'docs') mainHtml = renderDocPage(locale, slug);
  else if (section === 'blog' && !slug) mainHtml = renderBlogIndex(locale);
  else if (section === 'blog') mainHtml = renderBlogPost(locale, slug);
  else if (section === 'api' && !slug) mainHtml = renderApiIndex(locale);
  else if (section === 'api') mainHtml = renderApiEndpoint(locale, slug);
  else mainHtml = renderNotFound(locale);

  const body = document.body;
  body.className = `locale-${locale} section-${section}`;

  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderHeader(locale, section)}
    ${renderMobile(locale, section)}
    <main class="layout">
      ${section === 'docs' && slug ? '' : ''}
      <section class="main-column">
        ${mainHtml}
      </section>
    </main>
    ${renderSearchModal(locale)}
    ${renderPalette(locale)}
  `;

  bindActions();
  bindSearch(locale);
  bindPalette(locale);
  bindCodeActions();
  syncTitle(locale, section, slug);
}

function syncTitle(locale, section, slug) {
  let title = DATA.site.name;
  if (section === 'home') title = `${DATA.site.name} · ${DATA.site.tagline[locale]}`;
  else if (section === 'docs' && slug) title = `${docsMeta(locale, slug)?.title || 'Docs'} · ${DATA.site.name}`;
  else if (section === 'blog' && slug) title = `${blogMeta(locale, slug)?.title || 'Blog'} · ${DATA.site.name}`;
  else if (section === 'api' && slug) title = `${apiMeta(locale, slug)?.title || 'API'} · ${DATA.site.name}`;
  else if (section === 'docs') title = `${currentText(locale, 'nav_docs')} · ${DATA.site.name}`;
  else if (section === 'blog') title = `${currentText(locale, 'nav_blog')} · ${DATA.site.name}`;
  else if (section === 'api') title = `${currentText(locale, 'nav_api')} · ${DATA.site.name}`;
  document.title = title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) {
    if (section === 'home') desc.setAttribute('content', DATA.site.description[locale]);
    else if (section === 'docs' && slug) desc.setAttribute('content', docsMeta(locale, slug)?.description || DATA.site.description[locale]);
    else if (section === 'blog' && slug) desc.setAttribute('content', blogMeta(locale, slug)?.excerpt || DATA.site.description[locale]);
    else if (section === 'api' && slug) desc.setAttribute('content', apiMeta(locale, slug)?.summary || DATA.site.description[locale]);
    else desc.setAttribute('content', DATA.site.description[locale]);
  }
  document.documentElement.lang = locale;
}

function bindActions() {
  document.querySelectorAll('[data-switch-locale]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextLocale = btn.getAttribute('data-switch-locale');
      const { section, slug } = parseRoute();
      const nextRoute = routeOf(nextLocale, section, slug);
      state.locale = nextLocale;
      localStorage.setItem('vicsdocs-locale', nextLocale);
      setHash(nextRoute);
    });
  });

  const searchBtns = document.querySelectorAll('[data-open-search]');
  searchBtns.forEach((btn) => btn.addEventListener('click', () => openSearch()));
  const paletteBtns = document.querySelectorAll('[data-open-palette]');
  paletteBtns.forEach((btn) => btn.addEventListener('click', () => openPalette()));

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) mobileToggle.addEventListener('click', () => { state.mobileOpen = true; renderApp(); });
  const closeMobile = document.querySelector('[data-close-mobile]');
  if (closeMobile) closeMobile.addEventListener('click', () => { state.mobileOpen = false; renderApp(); });

  const overlaySearch = document.querySelector('[data-overlay-search]');
  if (overlaySearch) {
    overlaySearch.addEventListener('click', (e) => {
      if (e.target === overlaySearch) closeSearch();
    });
  }
  const overlayPalette = document.querySelector('[data-overlay-palette]');
  if (overlayPalette) {
    overlayPalette.addEventListener('click', (e) => {
      if (e.target === overlayPalette) closePalette();
    });
  }

  document.querySelectorAll('a[href^="#/"]').forEach((a) => {
    a.addEventListener('click', () => {
      state.mobileOpen = false;
    });
  });
}

function openSearch() {
  state.searchOpen = true;
  state.paletteOpen = false;
  renderApp();
  const input = document.querySelector('[data-search-input]');
  if (input) {
    input.focus();
    runSearch(input.value);
  }
}
function closeSearch() {
  state.searchOpen = false;
  renderApp();
}

function openPalette() {
  state.paletteOpen = true;
  state.searchOpen = false;
  renderApp();
}
function closePalette() {
  state.paletteOpen = false;
  renderApp();
}

function runSearch(query) {
  const resultsEl = document.querySelector('[data-search-results]');
  if (!resultsEl) return;
  const items = searchRegistry(state.locale, query);
  if (!query.trim()) {
    const defaults = buildRegistry(state.locale).slice(0, 8);
    resultsEl.innerHTML = defaults.map(searchItemHtml).join('');
    return;
  }
  if (!items.length) {
    resultsEl.innerHTML = `<div class="empty-state">${currentText(state.locale, 'no_results')}</div>`;
    return;
  }
  resultsEl.innerHTML = items.slice(0, 10).map(searchItemHtml).join('');
  resultsEl.querySelectorAll('[data-go-route]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setHash(btn.getAttribute('data-go-route'));
      closeSearch();
    });
  });
}

function searchItemHtml(item) {
  return `
    <button class="search-item" type="button" data-go-route="${escapeHtml(item.route)}">
      <span class="search-kind">${escapeHtml(item.type)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.description || '')}</small>
    </button>
  `;
}

function bindSearch(locale) {
  const input = document.querySelector('[data-search-input]');
  if (!input) return;
  input.addEventListener('input', (e) => runSearch(e.target.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'Enter') {
      const first = document.querySelector('[data-search-results] [data-go-route]');
      if (first) {
        setHash(first.getAttribute('data-go-route'));
        closeSearch();
      }
    }
  });
  runSearch(input.value);
  document.querySelectorAll('[data-go-route]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const route = btn.getAttribute('data-go-route');
      if (route) {
        setHash(route);
        closeSearch();
      }
    });
  });
}

function bindPalette(locale) {
  const items = document.querySelectorAll('[data-palette-action]');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-palette-action');
      if (!action) return;
      if (action === 'toggle-locale') {
        const nextLocale = locale === 'cs' ? 'en' : 'cs';
        const { section, slug } = parseRoute();
        setHash(routeOf(nextLocale, section, slug));
      } else if (action === 'open-search') {
        closePalette();
        openSearch();
      } else {
        setHash(action);
        closePalette();
      }
    });
  });
}

function bindCodeActions() {
  document.querySelectorAll('.code-block').forEach((block) => {
    const wrapBtn = block.querySelector('.code-wrap');
    const copyBtn = block.querySelector('.code-copy');
    const pre = block.querySelector('pre');
    const code = block.querySelector('code');
    if (wrapBtn && pre) {
      wrapBtn.addEventListener('click', () => {
        pre.classList.toggle('wrapped');
        wrapBtn.textContent = pre.classList.contains('wrapped') ? 'No wrap' : 'Wrap';
      });
    }
    if (copyBtn && code) {
      copyBtn.addEventListener('click', async () => {
        const text = code.textContent || '';
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1200);
        } catch (err) {
          copyBtn.textContent = 'Error';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1200);
        }
      });
    }
  });
}

window.addEventListener('hashchange', renderApp);
window.addEventListener('keydown', (e) => {
  const meta = e.metaKey || e.ctrlKey;
  if (e.key === '/' && !meta && !e.altKey && !e.shiftKey) {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault();
      openSearch();
    }
  }
  if (meta && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
  if (e.key === 'Escape') {
    if (state.searchOpen) closeSearch();
    if (state.paletteOpen) closePalette();
    if (state.mobileOpen) { state.mobileOpen = false; renderApp(); }
  }
});

if (!location.hash || location.hash === '#') {
  setHash(`/${DEFAULT_LOCALE}/home`, true);
}

renderApp();
