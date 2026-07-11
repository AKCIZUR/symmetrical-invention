export const DATA = {
  site: {
    name: "VICSDOCS",
    tagline: {
      cs: "Dokumentace jinak.",
      en: "Docs, reimagined."
    },
    description: {
      cs: "Statický docs starter s tmavým designem, vyhledáváním, blogem a dvojjazyčným rozhraním.",
      en: "A static docs starter with dark design, search, blog, and bilingual UI."
    },
    github: "https://github.com/yourname/vicsdocs"
  },
  ui: {
    cs: {
      nav_home: "Domů",
      nav_docs: "Dokumentace",
      nav_blog: "Blog",
      nav_api: "API",
      search: "Hledat",
      command: "Příkazová paleta",
      language: "Jazyk",
      hero_cta: "Otevřít dokumentaci",
      hero_secondary: "Zobrazit blog",
      features: "Klíčové vlastnosti",
      latest_posts: "Nejnovější články",
      api_title: "API reference",
      start_here: "Začít tady",
      welcome: "Vítej ve VICSDOCS",
      subtitle: "Tmavý docs starter s vyhledáváním, blogem, API a vícejazyčným rozhraním.",
      search_placeholder: "Hledat stránku, článek nebo endpoint…",
      palette_placeholder: "Napiš akci, cestu nebo příkaz…",
      sidebar_title: "Obsah",
      toc_title: "Na této stránce",
      breadcrumbs_home: "Domů",
      edit_github: "Upravit na GitHubu",
      all_posts: "Všechny články",
      read_more: "Přečíst",
      prev: "Předchozí",
      next: "Další",
      related: "Související",
      no_results: "Nic jsme nenašli.",
      search_hint: "Použij / nebo Ctrl+K",
      open_menu: "Otevřít menu",
      docs_intro: "Úvod",
      docs_arch: "Architektura",
      docs_nav: "Navigace",
      docs_search: "Vyhledávání",
      docs_deploy: "Nasazení",
      docs_toc: "Obsah",
      blog_tags: "Štítky",
      api_base: "Základ",
      api_auth: "Autentizace",
      api_docs: "Dokumentace",
      created: "Vytvořeno",
      updated: "Aktualizováno"
    },
    en: {
      nav_home: "Home",
      nav_docs: "Docs",
      nav_blog: "Blog",
      nav_api: "API",
      search: "Search",
      command: "Command palette",
      language: "Language",
      hero_cta: "Open docs",
      hero_secondary: "View blog",
      features: "Key features",
      latest_posts: "Latest posts",
      api_title: "API reference",
      start_here: "Start here",
      welcome: "Welcome to VICSDOCS",
      subtitle: "A dark docs starter with search, blog, API, and bilingual UI.",
      search_placeholder: "Search a page, post, or endpoint…",
      palette_placeholder: "Type an action, route, or command…",
      sidebar_title: "Contents",
      toc_title: "On this page",
      breadcrumbs_home: "Home",
      edit_github: "Edit on GitHub",
      all_posts: "All posts",
      read_more: "Read more",
      prev: "Previous",
      next: "Next",
      related: "Related",
      no_results: "No results found.",
      search_hint: "Use / or Ctrl+K",
      open_menu: "Open menu",
      docs_intro: "Intro",
      docs_arch: "Architecture",
      docs_nav: "Navigation",
      docs_search: "Search",
      docs_deploy: "Deploy",
      docs_toc: "Table of contents",
      blog_tags: "Tags",
      api_base: "Base",
      api_auth: "Authentication",
      api_docs: "Documentation",
      created: "Created",
      updated: "Updated"
    }
  },
  docs: {
    cs: [
      {
        slug: "uvod",
        title: "Úvod",
        description: "Co je VICSDOCS a proč je to víc než jen šablona.",
        section: "docs",
        order: 1,
        group: "Start",
        readingTime: "3 min",
        body: `
          <p>VICSDOCS je statický dokumentační starter pro projekty, které chtějí působit rychle, čitelně a prémiově. Je navržený pro GitHub Pages, takže po nasazení nepotřebuje server ani databázi.</p>
          <h2>Cíl</h2>
          <p>Vytvořit dokumentaci, která pomáhá čtenáři najít odpověď během pár vteřin. Sidebar, breadcrumbs, vyhledávání a TOC spolu drží kurz jako dobře vyladěná navigace na moři textu.</p>
          <h2>Co je v balíčku</h2>
          <ul>
            <li>tmavý layout s glass panely</li>
            <li>automatický sidebar a breadcrumbs</li>
            <li>fulltext search a command palette</li>
            <li>blog, API reference a i18n</li>
          </ul>
          <h2>Jak je web strukturovaný</h2>
          <p>Obsah je rozdělený do dokumentace, blogu a API. Všechny části sdílejí stejný vizuální jazyk, ale každá má vlastní rytmus a účel.</p>
        `
      },
      {
        slug: "architektura",
        title: "Architektura",
        description: "Jak funguje routing, layout a datový model.",
        section: "docs",
        order: 2,
        group: "Systém",
        readingTime: "4 min",
        body: `
          <p>Web běží jako statická single-page aplikace s hash routingem, aby byl kompatibilní s GitHub Pages bez další konfigurace.</p>
          <h2>Datový model</h2>
          <p>Veškerý obsah žije v jednom datovém souboru. To je pro starter ideální: přehledné, snadno upravitelné a rychlé.</p>
          <h3>Proč je to praktické</h3>
          <p>Není potřeba build step, Content Collections ani server. Přesto appka umí strukturu, vyhledávání i sekce s obsahem.</p>
          <h2>Renderovací pipeline</h2>
          <pre><code>route -> locale -> section -> renderer -> sidebar/toc/search index</code></pre>
        `
      },
      {
        slug: "navigace",
        title: "Navigace",
        description: "Sidebar, breadcrumbs, prev/next a mobilní menu.",
        section: "docs",
        order: 3,
        group: "UI",
        readingTime: "4 min",
        body: `
          <p>Navigace je postavená tak, aby uživatel nemusel lovit po lese odkazů. Místo toho dostane strom, drobečky a rychlé skoky.</p>
          <h2>Sidebar</h2>
          <p>Sidebar se skládá z kategorií a položek. Aktivní větev je zvýrazněná a na mobilech se přesouvá do overlay menu.</p>
          <h2>Breadcrumbs</h2>
          <p>Breadcrumbs zobrazují cestu od domova až k aktuální stránce.</p>
          <h2>Prev / next</h2>
          <p>Na konci stránky jsou odkazy na předchozí a další kapitolu podle pořadí v sidebaru.</p>
        `
      },
      {
        slug: "vyhledavani",
        title: "Vyhledávání",
        description: "Globální search modal a command palette.",
        section: "docs",
        order: 4,
        group: "UI",
        readingTime: "5 min",
        body: `
          <p>Vyhledávání je rychlé, lokální a bez serveru. Dotaz se filtruje nad všemi docs, blogem i API endpointy.</p>
          <h2>Search modal</h2>
          <p>Otevírá se klávesou <kbd>/</kbd> nebo tlačítkem v horní liště.</p>
          <h2>Command palette</h2>
          <p>Otevírá se pomocí <kbd>Ctrl</kbd> + <kbd>K</kbd> nebo <kbd>Cmd</kbd> + <kbd>K</kbd>. Umí skákat na sekce, přepínat jazyk a otevírat nejdůležitější stránky.</p>
          <h2>UX poznámka</h2>
          <p>Když se hledání otevře, fokus jde přímo do inputu. To je malý detail, ale dělá velký rozdíl.</p>
        `
      },
      {
        slug: "nasazeni",
        title: "Nasazení",
        description: "GitHub Pages ready, zero drama deployment.",
        section: "docs",
        order: 5,
        group: "Release",
        readingTime: "3 min",
        body: `
          <p>Protože je aplikace statická, stačí ji nahrát na GitHub Pages, Netlify nebo vlastní hosting.</p>
          <h2>Jak publikovat</h2>
          <ol>
            <li>nakopíruj soubory do repozitáře</li>
            <li>zapni Pages nebo static hosting</li>
            <li>otevři <code>index.html</code></li>
          </ol>
          <h2>Co zůstává po ruce</h2>
          <p>README, data i styl jsou oddělené, takže změny jsou rychlé a bezpečné.</p>
        `
      }
    ],
    en: [
      {
        slug: "introduction",
        title: "Introduction",
        description: "What VICSDOCS is and why it is more than a template.",
        section: "docs",
        order: 1,
        group: "Start",
        readingTime: "3 min",
        body: `
          <p>VICSDOCS is a static documentation starter for projects that want to feel fast, clear, and premium. It is designed for GitHub Pages, so it does not need a server or a database.</p>
          <h2>Goal</h2>
          <p>Create documentation that helps readers find an answer in seconds. Sidebar, breadcrumbs, search, and TOC work together like a tidy compass for text-heavy journeys.</p>
          <h2>What is included</h2>
          <ul>
            <li>dark layout with glass panels</li>
            <li>automatic sidebar and breadcrumbs</li>
            <li>fulltext search and command palette</li>
            <li>blog, API reference, and i18n</li>
          </ul>
        `
      },
      {
        slug: "architecture",
        title: "Architecture",
        description: "How routing, layout, and the content model work.",
        section: "docs",
        order: 2,
        group: "System",
        readingTime: "4 min",
        body: `
          <p>The site runs as a static single-page application with hash routing, which keeps it compatible with GitHub Pages without extra configuration.</p>
          <h2>Data model</h2>
          <p>All content lives in one data file. For a starter, that means less friction and more clarity.</p>
          <h2>Render pipeline</h2>
          <pre><code>route -> locale -> section -> renderer -> sidebar/toc/search index</code></pre>
        `
      },
      {
        slug: "navigation",
        title: "Navigation",
        description: "Sidebar, breadcrumbs, prev/next and mobile menu.",
        section: "docs",
        order: 3,
        group: "UI",
        readingTime: "4 min",
        body: `
          <p>Navigation is designed so users do not have to wander through a forest of links. They get a tree, breadcrumbs, and fast jumps instead.</p>
          <h2>Sidebar</h2>
          <p>The sidebar is built from categories and items. The active branch is highlighted and the mobile version becomes an overlay menu.</p>
          <h2>Breadcrumbs</h2>
          <p>Breadcrumbs show the path from home to the current page.</p>
        `
      },
      {
        slug: "search",
        title: "Search",
        description: "Global search modal and command palette.",
        section: "docs",
        order: 4,
        group: "UI",
        readingTime: "5 min",
        body: `
          <p>Search is fast, local, and serverless. The query filters across docs, blog posts, and API endpoints.</p>
          <h2>Search modal</h2>
          <p>Open it with <kbd>/</kbd> or the button in the top bar.</p>
          <h2>Command palette</h2>
          <p>Open it with <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>Cmd</kbd> + <kbd>K</kbd>.</p>
        `
      },
      {
        slug: "deployment",
        title: "Deployment",
        description: "GitHub Pages ready, zero drama deployment.",
        section: "docs",
        order: 5,
        group: "Release",
        readingTime: "3 min",
        body: `
          <p>Because the app is static, you can publish it to GitHub Pages, Netlify, or your own host.</p>
          <h2>How to publish</h2>
          <ol>
            <li>copy the files into a repo</li>
            <li>enable Pages or static hosting</li>
            <li>open <code>index.html</code></li>
          </ol>
        `
      }
    ]
  },
  blog: {
    cs: [
      {
        slug: "design-system-dark",
        title: "Design systém, který nešustí",
        date: "2026-06-18",
        tags: ["design", "ui", "docs"],
        excerpt: "Jak udržet dark UI čisté, čitelné a bez vizuálního hluku.",
        body: `
          <p>Dark interface je jako noční studio. Když přidáš moc světel, ztratí atmosféru. Proto VICSDOCS používá silné kontrasty, jemné panely a minimum barev.</p>
          <h2>Principy</h2>
          <p>Čitelnost, vzduch, konzistence. Všechno ostatní je bonus.</p>
        `
      },
      {
        slug: "search-behaves-like-superpower",
        title: "Vyhledávání, které se chová jako superschopnost",
        date: "2026-06-24",
        tags: ["search", "productivity", "navigation"],
        excerpt: "Search modal a command palette nejsou ozdoba, ale pracovní nástroj.",
        body: `
          <p>Dobré vyhledávání je rozdíl mezi „kde to je?“ a „aha, tady to je“. Tohle je přesně ten typ funkce, který vrací čas zpět uživateli.</p>
          <h2>UX návyk</h2>
          <p>Klávesové zkratky drží prsty v pohybu a hlavu v obsahu.</p>
        `
      }
    ],
    en: [
      {
        slug: "dark-system-design",
        title: "A design system that stays quiet",
        date: "2026-06-18",
        tags: ["design", "ui", "docs"],
        excerpt: "How to keep a dark UI clean, readable, and free from visual noise.",
        body: `
          <p>A dark interface is like a night studio. Add too many lights and the mood disappears. VICSDOCS keeps contrast strong and the palette restrained.</p>
        `
      },
      {
        slug: "search-as-a-superpower",
        title: "Search that behaves like a superpower",
        date: "2026-06-24",
        tags: ["search", "productivity", "navigation"],
        excerpt: "Search modal and command palette are not ornaments, they are tools.",
        body: `
          <p>Good search changes the question from “where is it?” to “there it is.” That is time returned to the user.</p>
        `
      }
    ]
  },
  api: {
    cs: [
      {
        slug: "zaklad",
        title: "Základní endpointy",
        description: "Přehled core endpointů a jejich chování.",
        methods: ["GET /v1/docs", "GET /v1/blog", "GET /v1/search"],
        body: `
          <p>API část je dokumentační ukázka. Ukazuje, jak by se v opravdovém projektu popsaly klíčové endpointy.</p>
          <h2>Formát odpovědi</h2>
          <pre><code>{
  "ok": true,
  "items": []
}</code></pre>
        `
      },
      {
        slug: "autentizace",
        title: "Autentizace",
        description: "Token-based přístup pro chráněné endpointy.",
        methods: ["POST /v1/auth/login", "POST /v1/auth/logout"],
        body: `
          <p>VICSDOCS jako starter žádnou autentizaci nepotřebuje. Sekce je tu ale připravená pro projekty, které ji budou chtít doplnit.</p>
        `
      }
    ],
    en: [
      {
        slug: "base",
        title: "Base endpoints",
        description: "Overview of core endpoints and behavior.",
        methods: ["GET /v1/docs", "GET /v1/blog", "GET /v1/search"],
        body: `
          <p>The API section is a documentation example. It shows how a real project could describe its key endpoints.</p>
        `
      },
      {
        slug: "authentication",
        title: "Authentication",
        description: "Token-based access for protected endpoints.",
        methods: ["POST /v1/auth/login", "POST /v1/auth/logout"],
        body: `
          <p>VICSDOCS itself does not need auth. This section exists for projects that want to add it later.</p>
        `
      }
    ]
  }
};

export const NAV = {
  cs: [
    { label: "Start", items: ["uvod", "architektura"] },
    { label: "UI", items: ["navigace", "vyhledavani"] },
    { label: "Release", items: ["nasazeni"] }
  ],
  en: [
    { label: "Start", items: ["introduction", "architecture"] },
    { label: "UI", items: ["navigation", "search"] },
    { label: "Release", items: ["deployment"] }
  ]
};

export const ROUTES = {
  cs: {
    home: { title: "Domů", description: "VICSDOCS – dokumentace jinak." },
    docs: { title: "Dokumentace", description: "Průchod dokumentací VICSDOCS." },
    blog: { title: "Blog", description: "Články a poznámky k designu a produktu." },
    api: { title: "API", description: "Ukázková API reference." }
  },
  en: {
    home: { title: "Home", description: "VICSDOCS – docs, reimagined." },
    docs: { title: "Docs", description: "Walk through VICSDOCS documentation." },
    blog: { title: "Blog", description: "Articles and notes about design and product." },
    api: { title: "API", description: "Sample API reference." }
  }
};

export const DOC_ICONS = {
  uvod: "✦",
  architektura: "⌂",
  navigace: "☰",
  vyhledavani: "⌕",
  nasazeni: "↗",
  introduction: "✦",
  architecture: "⌂",
  navigation: "☰",
  search: "⌕",
  deployment: "↗"
};
