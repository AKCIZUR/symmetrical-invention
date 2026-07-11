export const DATA = {
  "site": {
    "name": "VICSDOCS",
    "tagline": {
      "cs": "Dokumentace jinak.",
      "en": "Docs, reimagined."
    },
    "description": {
      "cs": "Moderní, tmavý a rychlý dokumentační starter pro projekty, které chtějí být vidět.",
      "en": "A modern, dark, and fast documentation starter for projects that want to stand out."
    }
  },
  "ui": {
    "cs": {
      "nav_docs": "Dokumentace",
      "nav_blog": "Blog",
      "nav_api": "API",
      "search": "Hledat",
      "command": "Příkazová paleta",
      "language": "Jazyk",
      "hero_cta": "Spustit dokumentaci",
      "hero_secondary": "Prohlédnout blog",
      "features": "Klíčové vlastnosti",
      "latest_posts": "Nejnovější články",
      "api_title": "API reference",
      "start_here": "Začít tady",
      "welcome": "Vítej v VICSDOCS",
      "subtitle": "Tmavý docs starter s vyhledáváním, blogem a vícejazyčným rozhraním.",
      "search_placeholder": "Hledat stránku, článek nebo endpoint…",
      "palette_placeholder": "Napiš akci nebo cestu…",
      "sidebar_title": "Obsah",
      "toc_title": "Na této stránce",
      "breadcrumbs_home": "Domů",
      "edit_github": "Upravit na GitHubu",
      "all_posts": "Všechny články",
      "read_more": "Přečíst"
    },
    "en": {
      "nav_docs": "Docs",
      "nav_blog": "Blog",
      "nav_api": "API",
      "search": "Search",
      "command": "Command palette",
      "language": "Language",
      "hero_cta": "Open docs",
      "hero_secondary": "View blog",
      "features": "Key features",
      "latest_posts": "Latest posts",
      "api_title": "API reference",
      "start_here": "Start here",
      "welcome": "Welcome to VICSDOCS",
      "subtitle": "A dark docs starter with search, blog, and bilingual UI.",
      "search_placeholder": "Search a page, post, or endpoint…",
      "palette_placeholder": "Type an action or route…",
      "sidebar_title": "Contents",
      "toc_title": "On this page",
      "breadcrumbs_home": "Home",
      "edit_github": "Edit on GitHub",
      "all_posts": "All posts",
      "read_more": "Read more"
    }
  },
  "docs": {
    "cs": [
      {
        "slug": "uvod",
        "title": "Úvod",
        "description": "Co je VICSDOCS a jak funguje.",
        "group": "Začínáme",
        "order": 1,
        "toc": [
          {
            "id": "co-je-vicsdocs",
            "label": "Co je VICSDOCS",
            "level": 2
          },
          {
            "id": "pro-koho-je",
            "label": "Pro koho je",
            "level": 2
          },
          {
            "id": "co-dostanes",
            "label": "Co dostaneš v balíku",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">VICSDOCS je tmavý, vzdušný a přehledný dokumentační starter pro projekty, které chtějí působit jako prémiový nástroj, ne jako zaprášený manuál.</p>\n          <h2 id=\"co-je-vicsdocs\">Co je VICSDOCS</h2>\n          <p>Je to statický docs web s jasným stromem, vyhledáváním, blogem, API sekcí a dvojjazyčným rozhraním. Vše běží bez serveru, takže se hodí pro GitHub Pages.</p>\n          <div class=\"callout\">\n            <strong>Designová osa:</strong> tmavé pozadí, glass panely, jemné animace, čistá typografie a minimum vizuálního hluku.\n          </div>\n          <h2 id=\"pro-koho-je\">Pro koho je</h2>\n          <ul>\n            <li>pro open-source projekty, které chtějí reprezentativní dokumentaci</li>\n            <li>pro technické týmy s Markdown obsahem a potřebou rychlé editace</li>\n            <li>pro každého, kdo chce docs, které nepůsobí jako školní sešit s přelepenou krycí fólií</li>\n          </ul>\n          <h2 id=\"co-dostanes\">Co dostaneš v balíku</h2>\n          <pre><code class=\"language-bash\"># start locally\npython -m http.server 4173</code></pre>\n          <p>V balíku najdeš landing page, sidebar, breadcrumbs, TOC, search modal, command palette, blog list, API reference a hotové ukázkové texty v češtině i angličtině.</p>\n        "
      },
      {
        "slug": "instalace",
        "title": "Instalace",
        "description": "Jak projekt spustit lokálně.",
        "group": "Začínáme",
        "order": 2,
        "toc": [
          {
            "id": "pozemni-stanice",
            "label": "Příprava",
            "level": 2
          },
          {
            "id": "spusteni",
            "label": "Spuštění",
            "level": 2
          },
          {
            "id": "deploy",
            "label": "Deploy na Pages",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Nepotřebuješ složitý build. Stačí otevřít projekt přes statický server a stránka funguje okamžitě.</p>\n          <h2 id=\"pozemni-stanice\">Příprava</h2>\n          <p>Rozbal zip, nahradíš obsah textů, upravíš odkazy a máš hotovo. Pro lokální náhled je ideální jednoduchý server.</p>\n          <h2 id=\"spusteni\">Spuštění</h2>\n          <pre><code class=\"language-bash\">cd vicsdocs-standalone\npython -m http.server 4173</code></pre>\n          <h2 id=\"deploy\">Deploy na Pages</h2>\n          <p>Stačí nahrát soubory do repozitáře a GitHub Pages je servíruje jako statický web. Cesty jsou hashované, takže nepotřebuješ přepisování URL na serveru.</p>\n          <div class=\"callout\">Pro produkci doporučuji přidat vlastní doménu a zapnout HTTPS.</div>\n        "
      },
      {
        "slug": "komponenty",
        "title": "Komponenty",
        "description": "Sidebar, TOC, search a code blocky.",
        "group": "Komponenty",
        "order": 3,
        "toc": [
          {
            "id": "sidebar",
            "label": "Sidebar",
            "level": 2
          },
          {
            "id": "toc",
            "label": "TOC",
            "level": 2
          },
          {
            "id": "search",
            "label": "Search",
            "level": 2
          },
          {
            "id": "code-block",
            "label": "Code block",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Komponenty jsou psané tak, aby zůstaly lehké, čitelné a snadno rozšiřitelné. Žádná divoká akrobacie, spíš přesný rytmus.</p>\n          <h2 id=\"sidebar\">Sidebar</h2>\n          <p>Generuje se ze stromu dat a umí zvýraznit aktivní sekci. Na mobilu se schová pod spodní panel.</p>\n          <h2 id=\"toc\">TOC</h2>\n          <p>Pravý panel sbírá nadpisy stránky a naviguje na konkrétní kotvy.</p>\n          <h2 id=\"search\">Search</h2>\n          <p>Hledání běží klientsky přes jednoduchý index, takže je rychlé a bez serverových závislostí.</p>\n          <h2 id=\"code-block\">Code block</h2>\n          <pre><code class=\"language-ts\">export function greet(name: string) {\n  return `Ahoj, ${name}!`;\n}</code></pre>\n        "
      },
      {
        "slug": "vyhledavani",
        "title": "Vyhledávání",
        "description": "Command palette a fulltext.",
        "group": "Komponenty",
        "order": 4,
        "toc": [
          {
            "id": "fulltext",
            "label": "Fulltext",
            "level": 2
          },
          {
            "id": "command-palette",
            "label": "Command palette",
            "level": 2
          },
          {
            "id": "zkratky",
            "label": "Klávesové zkratky",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Paleta a search jsou dva odlišné nástroje: jeden hledá text, druhý spouští akce. Dvojice, co drží produkt pohromadě jako suchý zip a klidný nervový systém.</p>\n          <h2 id=\"fulltext\">Fulltext</h2>\n          <p>Vyhledávání prochází názvy, popisy i obsah stránek a vrací okamžité výsledky.</p>\n          <h2 id=\"command-palette\">Command palette</h2>\n          <p>Otevřeš ji pomocí <kbd>Ctrl</kbd> + <kbd>K</kbd>. Obsahuje rychlé akce pro navigaci, přepnutí jazyka a otevření blogu.</p>\n          <h2 id=\"zkratky\">Klávesové zkratky</h2>\n          <ul>\n            <li><kbd>/</kbd> otevře search</li>\n            <li><kbd>Esc</kbd> zavře modální okna</li>\n            <li><kbd>Ctrl</kbd> + <kbd>K</kbd> otevře command palette</li>\n          </ul>\n        "
      },
      {
        "slug": "prispevani",
        "title": "Přispívání",
        "description": "Jak přidat novou stránku.",
        "group": "Obsah",
        "order": 5,
        "toc": [
          {
            "id": "novy-clanek",
            "label": "Nový článek",
            "level": 2
          },
          {
            "id": "struktura",
            "label": "Struktura",
            "level": 2
          },
          {
            "id": "styl",
            "label": "Styl psaní",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Nová stránka by měla mít krátký název, jasný účel a jednu hlavní myšlenku na sekci. Čitelnost je královna.</p>\n          <h2 id=\"novy-clanek\">Nový článek</h2>\n          <p>Zkopíruj existující stránku, přejmenuj slug a doplň obsah.</p>\n          <h2 id=\"struktura\">Struktura</h2>\n          <pre><code class=\"language-text\">docs/\n  uvod\n  instalace\n  komponenty\n  vyhledavani\n  prispevani</code></pre>\n          <h2 id=\"styl\">Styl psaní</h2>\n          <p>Piš stručně, srozumitelně a s odstavci, které mají dech. Technologie se mění, dobrý rytmus textu ne.</p>\n        "
      }
    ],
    "en": [
      {
        "slug": "introduction",
        "title": "Introduction",
        "description": "What VICSDOCS is and why it exists.",
        "group": "Getting started",
        "order": 1,
        "toc": [
          {
            "id": "what-it-is",
            "label": "What it is",
            "level": 2
          },
          {
            "id": "who-it-is-for",
            "label": "Who it is for",
            "level": 2
          },
          {
            "id": "what-you-get",
            "label": "What you get",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">VICSDOCS is a dark, airy documentation starter for teams that want docs to feel like a premium product instead of a dusty manual.</p>\n          <h2 id=\"what-it-is\">What it is</h2>\n          <p>A static documentation site with a clear tree, search, blog, API section, and bilingual UI. It runs without a server, so GitHub Pages is a perfect home.</p>\n          <div class=\"callout\"><strong>Design line:</strong> dark background, glass panels, soft motion, crisp typography, minimal visual noise.</div>\n          <h2 id=\"who-it-is-for\">Who it is for</h2>\n          <ul>\n            <li>open-source projects that need polished docs</li>\n            <li>technical teams with Markdown content and quick editing needs</li>\n            <li>anyone who wants docs that do not look like a laminated spreadsheet</li>\n          </ul>\n          <h2 id=\"what-you-get\">What you get</h2>\n          <pre><code class=\"language-bash\"># start locally\npython -m http.server 4173</code></pre>\n          <p>The starter includes landing, sidebar, breadcrumbs, TOC, search, command palette, blog list, API reference, and ready-made copy in Czech and English.</p>\n        "
      },
      {
        "slug": "installation",
        "title": "Installation",
        "description": "How to run it locally.",
        "group": "Getting started",
        "order": 2,
        "toc": [
          {
            "id": "prep",
            "label": "Prep",
            "level": 2
          },
          {
            "id": "run",
            "label": "Run",
            "level": 2
          },
          {
            "id": "pages",
            "label": "Pages deploy",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">No complicated build chain required. Open the project through a static server and you are live.</p>\n          <h2 id=\"prep\">Prep</h2>\n          <p>Unzip, edit the copy, update links, and you are ready to go.</p>\n          <h2 id=\"run\">Run</h2>\n          <pre><code class=\"language-bash\">cd vicsdocs-standalone\npython -m http.server 4173</code></pre>\n          <h2 id=\"pages\">Pages deploy</h2>\n          <p>Drop the files into a repository and GitHub Pages can serve them immediately. Hash routing avoids server rewrites.</p>\n          <div class=\"callout\">For production, point a custom domain at the repo and enable HTTPS.</div>\n        "
      },
      {
        "slug": "components",
        "title": "Components",
        "description": "Sidebar, TOC, search, and code blocks.",
        "group": "Components",
        "order": 3,
        "toc": [
          {
            "id": "sidebar",
            "label": "Sidebar",
            "level": 2
          },
          {
            "id": "toc",
            "label": "TOC",
            "level": 2
          },
          {
            "id": "search",
            "label": "Search",
            "level": 2
          },
          {
            "id": "code-block",
            "label": "Code block",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Each component stays light, readable, and easy to extend. No circus tricks, just a clean pulse.</p>\n          <h2 id=\"sidebar\">Sidebar</h2>\n          <p>Generated from the content tree, with the active branch highlighted.</p>\n          <h2 id=\"toc\">TOC</h2>\n          <p>The right panel tracks headings and jumps to anchors.</p>\n          <h2 id=\"search\">Search</h2>\n          <p>The search tool walks titles, descriptions, and page bodies to return instant results.</p>\n          <h2 id=\"code-block\">Code block</h2>\n          <pre><code class=\"language-ts\">export function greet(name: string) {\n  return `Hello, ${name}!`;\n}</code></pre>\n        "
      },
      {
        "slug": "search",
        "title": "Search",
        "description": "Command palette and full-text search.",
        "group": "Components",
        "order": 4,
        "toc": [
          {
            "id": "fulltext",
            "label": "Full-text",
            "level": 2
          },
          {
            "id": "palette",
            "label": "Command palette",
            "level": 2
          },
          {
            "id": "shortcuts",
            "label": "Shortcuts",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">Search and the palette do different jobs. One finds text, the other triggers actions. Together they keep the product neatly stitched.</p>\n          <h2 id=\"fulltext\">Full-text</h2>\n          <p>Search scans page titles, descriptions, and content to surface matching docs and posts.</p>\n          <h2 id=\"palette\">Command palette</h2>\n          <p>Open it with <kbd>Ctrl</kbd> + <kbd>K</kbd>. It includes quick navigation, language switch, and blog access.</p>\n          <h2 id=\"shortcuts\">Shortcuts</h2>\n          <ul>\n            <li><kbd>/</kbd> opens search</li>\n            <li><kbd>Esc</kbd> closes modals</li>\n            <li><kbd>Ctrl</kbd> + <kbd>K</kbd> opens the palette</li>\n          </ul>\n        "
      },
      {
        "slug": "contributing",
        "title": "Contributing",
        "description": "How to add a new page.",
        "group": "Content",
        "order": 5,
        "toc": [
          {
            "id": "new-page",
            "label": "New page",
            "level": 2
          },
          {
            "id": "structure",
            "label": "Structure",
            "level": 2
          },
          {
            "id": "writing-style",
            "label": "Writing style",
            "level": 2
          }
        ],
        "content": "\n          <p class=\"lead\">A new page should have a short name, a clear purpose, and one main idea per section. Clarity is the crown jewel.</p>\n          <h2 id=\"new-page\">New page</h2>\n          <p>Copy an existing page, rename the slug, then add your content.</p>\n          <h2 id=\"structure\">Structure</h2>\n          <pre><code class=\"language-text\">docs/\n  introduction\n  installation\n  components\n  search\n  contributing</code></pre>\n          <h2 id=\"writing-style\">Writing style</h2>\n          <p>Write with pace, clarity, and enough breathing room between paragraphs. Tech shifts, good rhythm does not.</p>\n        "
      }
    ]
  },
  "blog": {
    "cs": [
      {
        "slug": "glass-ui-principles",
        "title": "Glass UI principles for docs",
        "description": "How to keep glassmorphism subtle and usable.",
        "date": "2026-06-12",
        "readTime": "4 min",
        "tags": [
          "design",
          "ui",
          "docs"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">A little blur goes a long way. Docs should feel tactile without turning into a pane of frosted chaos.</p>\n          <h2 id=\"softness\">Softness with purpose</h2>\n          <p>Use translucent surfaces only where they help hierarchy. Keep contrast strong and spacing generous.</p>\n          <h2 id=\"motion\">Motion that breathes</h2>\n          <p>Hover, focus, and open states should feel like a whisper, not a whoosh.</p>\n        "
      },
      {
        "slug": "github-pages-workflow",
        "title": "Shipping to GitHub Pages",
        "description": "A clean path from edits to deployment.",
        "date": "2026-05-28",
        "readTime": "3 min",
        "tags": [
          "deploy",
          "pages",
          "workflow"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">Static sites like this are happiest on GitHub Pages: simple, predictable, and easy to hand over.</p>\n          <h2 id=\"workflow\">Workflow</h2>\n          <p>Edit content, push to the repository, and let Pages serve the build. The fewer moving parts, the fewer edge-case gremlins.</p>\n          <h2 id=\"checklist\">Checklist</h2>\n          <p>Verify links, metadata, and the mobile layout before you publish.</p>\n        "
      },
      {
        "slug": "writing-docs-with-rhythm",
        "title": "Writing docs with rhythm",
        "description": "Tiny structure choices that make content easy to scan.",
        "date": "2026-04-09",
        "readTime": "5 min",
        "tags": [
          "content",
          "writing",
          "ux"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">Good documentation sounds like a calm metronome. Headings, examples, and notes each deserve their own beat.</p>\n          <h2 id=\"sections\">Sections</h2>\n          <p>One section, one purpose. That rule keeps pages from becoming document soup.</p>\n          <h2 id=\"examples\">Examples</h2>\n          <pre><code class=\"language-ts\">export const docs = {\n  crisp: true,\n  noisy: false,\n};</code></pre>\n        "
      }
    ],
    "en": [
      {
        "slug": "glass-ui-principles",
        "title": "Glass UI principles for docs",
        "description": "How to keep glassmorphism subtle and usable.",
        "date": "2026-06-12",
        "readTime": "4 min",
        "tags": [
          "design",
          "ui",
          "docs"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">A little blur goes a long way. Docs should feel tactile without turning into a pane of frosted chaos.</p>\n          <h2 id=\"softness\">Softness with purpose</h2>\n          <p>Use translucent surfaces only where they help hierarchy. Keep contrast strong and spacing generous.</p>\n          <h2 id=\"motion\">Motion that breathes</h2>\n          <p>Hover, focus, and open states should feel like a whisper, not a whoosh.</p>\n        "
      },
      {
        "slug": "github-pages-workflow",
        "title": "Shipping to GitHub Pages",
        "description": "A clean path from edits to deployment.",
        "date": "2026-05-28",
        "readTime": "3 min",
        "tags": [
          "deploy",
          "pages",
          "workflow"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">Static sites like this are happiest on GitHub Pages: simple, predictable, and easy to hand over.</p>\n          <h2 id=\"workflow\">Workflow</h2>\n          <p>Edit content, push to the repository, and let Pages serve the build. The fewer moving parts, the fewer edge-case gremlins.</p>\n          <h2 id=\"checklist\">Checklist</h2>\n          <p>Verify links, metadata, and the mobile layout before you publish.</p>\n        "
      },
      {
        "slug": "writing-docs-with-rhythm",
        "title": "Writing docs with rhythm",
        "description": "Tiny structure choices that make content easy to scan.",
        "date": "2026-04-09",
        "readTime": "5 min",
        "tags": [
          "content",
          "writing",
          "ux"
        ],
        "locale": [
          "cs",
          "en"
        ],
        "content": "\n          <p class=\"lead\">Good documentation sounds like a calm metronome. Headings, examples, and notes each deserve their own beat.</p>\n          <h2 id=\"sections\">Sections</h2>\n          <p>One section, one purpose. That rule keeps pages from becoming document soup.</p>\n          <h2 id=\"examples\">Examples</h2>\n          <pre><code class=\"language-ts\">export const docs = {\n  crisp: true,\n  noisy: false,\n};</code></pre>\n        "
      }
    ]
  },
  "api": [
    {
      "method": "GET",
      "path": "/api/docs",
      "summary": "Returns the documentation tree for the current locale."
    },
    {
      "method": "GET",
      "path": "/api/search?q=...",
      "summary": "Searches across docs, blog posts, and API entries."
    },
    {
      "method": "GET",
      "path": "/api/sitemap",
      "summary": "Builds a sitemap-like listing of all routes."
    }
  ]
};
