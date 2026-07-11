export const DATA = {
  "site": {
    "name": "VICSDOCS",
    "tagline": {
      "cs": "Dokumentace jinak.",
      "en": "Docs, reimagined."
    },
    "description": {
      "cs": "Koherentní, statický a tmavý docs starter pro GitHub Pages s blogem, API, vyhledáváním a dvojjazyčným rozhraním.",
      "en": "A coherent static docs starter for GitHub Pages with blog, API, search, and bilingual UI."
    },
    "github": "https://github.com/your-org/vicsdocs",
    "editBase": "https://github.com/your-org/vicsdocs/edit/main/"
  },
  "ui": {
    "cs": {
      "nav_home": "Domů",
      "nav_docs": "Dokumentace",
      "nav_blog": "Blog",
      "nav_api": "API",
      "nav_roadmap": "Roadmapa",
      "search": "Hledat",
      "command": "Příkazová paleta",
      "language": "Jazyk",
      "sidebar_title": "Obsah",
      "toc_title": "Na této stránce",
      "edit_github": "Upravit na GitHubu",
      "breadcrumbs_home": "Domů",
      "open_docs": "Otevřít dokumentaci",
      "view_blog": "Zobrazit blog",
      "latest_posts": "Nejnovější články",
      "featured": "Co je uvnitř",
      "system_map": "Mapa systému",
      "quick_start": "Rychlý start",
      "architecture": "Architektura",
      "design_tokens": "Design tokeny",
      "deployment": "Nasazení",
      "release_notes": "Poznámky k vydání",
      "search_placeholder": "Hledat stránku, článek nebo endpoint…",
      "palette_placeholder": "Napiš akci nebo cestu…",
      "all_posts": "Všechny články",
      "all_endpoints": "Všechny endpointy",
      "docs_overview": "Přehled dokumentace",
      "docs_intro": "Všechno podstatné je připravené jako statická, přehledná a snadno rozšiřitelná kostra.",
      "blog_intro": "Záznamy o rozhodnutích, designu a provozu.",
      "api_intro": "Strukturovaný popis datových a referenčních endpointů.",
      "roadmap_intro": "Co je hotové, co je další a co si zaslouží vlastní iteraci.",
      "search_title": "Vyhledávání",
      "search_results": "Výsledky",
      "no_results": "Nic nenalezeno. Zkus kratší výraz.",
      "open_locale": "Přepnout jazyk"
    },
    "en": {
      "nav_home": "Home",
      "nav_docs": "Docs",
      "nav_blog": "Blog",
      "nav_api": "API",
      "nav_roadmap": "Roadmap",
      "search": "Search",
      "command": "Command palette",
      "language": "Language",
      "sidebar_title": "Contents",
      "toc_title": "On this page",
      "edit_github": "Edit on GitHub",
      "breadcrumbs_home": "Home",
      "open_docs": "Open docs",
      "view_blog": "View blog",
      "latest_posts": "Latest posts",
      "featured": "What is inside",
      "system_map": "System map",
      "quick_start": "Quick start",
      "architecture": "Architecture",
      "design_tokens": "Design tokens",
      "deployment": "Deployment",
      "release_notes": "Release notes",
      "search_placeholder": "Search a page, post, or endpoint…",
      "palette_placeholder": "Type an action or route…",
      "all_posts": "All posts",
      "all_endpoints": "All endpoints",
      "docs_overview": "Docs overview",
      "docs_intro": "Everything important is packaged as a static, clear, and easily extensible foundation.",
      "blog_intro": "Notes about decisions, design, and operations.",
      "api_intro": "Structured reference for data and endpoint contracts.",
      "roadmap_intro": "What is done, what comes next, and what deserves its own iteration.",
      "search_title": "Search",
      "search_results": "Results",
      "no_results": "No results. Try a shorter query.",
      "open_locale": "Switch language"
    }
  },
  "docs": {
    "cs": [
      {
        "slug": "getting-started",
        "title": "Úvod a rychlý start",
        "description": "Co VICSDOCS je, pro koho je a jak se v něm pohybovat.",
        "group": "Začínáme",
        "order": 1,
        "body": "# Úvod a rychlý start\n\nVICSDOCS je statický docs starter navržený tak, aby působil jako hotový produkt, ne jako šablona ve výrobním skladu. Cíl je jednoduchý: otevřít projekt, pochopit strukturu a začít psát.\n\n## Proč existuje\n\n- dokumentace má být rychlá, čitelná a snadno rozšiřitelná\n- obsah má být připravený pro GitHub Pages bez serveru\n- design má pomáhat orientaci, ne ji zakrývat\n\n## Jak je postaven\n\n- landing page pro první orientaci\n- docs strom s breadcrumbs, sidebar a TOC\n- blog s články a tagy\n- API reference jako statická dokumentace\n- vyhledávání a příkazová paleta pro rychlé přesuny\n\n## Co dostaneš\n\n| Oblast | Co obsahuje |\n| --- | --- |\n| Navigace | sidebar, breadcrumbs, prev/next, mobilní menu |\n| Obsah | docs, blog, API, release notes |\n| Interakce | search modal, command palette, language switch |\n| Styl | dark glass UI, jemné stíny, výrazná typografie |\n\n## První krok\n\n```bash\npython -m http.server 4173\n```\n\nOtevři `http://localhost:4173` a zkus projít dokumentaci, blog i API. Všechno je připravené jako koherentní celek.",
        "updated": "2026-07-11"
      },
      {
        "slug": "installation",
        "title": "Instalace a spuštění",
        "description": "Jak projekt spustit lokálně i nasadit na GitHub Pages.",
        "group": "Začínáme",
        "order": 2,
        "body": "# Instalace a spuštění\n\nProjekt je postavený jako čistý static bundle. Nepotřebuje build chain, Node ani server. Stačí ho otevřít přes libovolný statický server.\n\n## Lokálně\n\n```bash\npython -m http.server 4173\n```\n\n## Na GitHub Pages\n\n1. nahraj celé repo\n2. nastav Pages deployment z hlavní větve nebo z `gh-pages`\n3. nechej běžet statické soubory bez další konfigurace\n\n## Doporučená struktura\n\n```text\n/\n├── index.html\n├── assets/\n│   ├── app.js\n│   ├── content.js\n│   └── styles.css\n└── README.md\n```\n\n## Proč je to takto\n\n- jednoduchý start bez překvapení\n- rychlé kopírování do nového projektu\n- minimum pohyblivých částí, maximum předvídatelnosti\n\n> Čím méně kouzel, tím méně kouřových signálů při debugování.",
        "updated": "2026-07-11"
      },
      {
        "slug": "architecture",
        "title": "Architektura a routing",
        "description": "Jak funguje hash routing, registry a koherentní navigace.",
        "group": "Obsah",
        "order": 3,
        "body": "# Architektura a routing\n\nVICSDOCS používá jednoduchý hash router. Díky tomu funguje i na hostingu bez serverových přepisů a každá stránka má stabilní adresu.\n\n## Princip\n\n- `/cs/home` a `/en/home` jsou vstupní body\n- docs, blog i API mají vlastní sekce\n- každá položka v registru má typ, route, title, description a text pro vyhledávání\n\n## Datový model\n\n```json\n{\n  \"type\": \"doc\",\n  \"route\": \"/cs/docs/getting-started\",\n  \"title\": \"Úvod a rychlý start\",\n  \"group\": \"Začínáme\"\n}\n```\n\n## Co z toho plyne\n\n- sidebar se generuje z dat, ne ručně\n- search modal prohledává všechno v jednom indexu\n- command palette pracuje se stejným registry modelem\n\n## Výhoda\n\nJedna mapa dat znamená méně slepých uliček. Uživatel se pohybuje přirozeně, bez tření mezi sekcemi.",
        "updated": "2026-07-11"
      },
      {
        "slug": "design-system",
        "title": "Design system a tokeny",
        "description": "Barvy, panelové vrstvy, typografie a komponentový jazyk.",
        "group": "UI systém",
        "order": 4,
        "body": "# Design system a tokeny\n\nVizuální jazyk stojí na tmavém pozadí, skleněných panelech a minimální barevnosti. Barva se používá cíleně, ne jako dekorativní konfety.\n\n## Tokeny\n\n| Token | Role |\n| --- | --- |\n| `--bg` | hlavní pozadí |\n| `--panel` | karta nebo panel |\n| `--line` | jemná hranice |\n| `--accent` | aktivní prvek |\n| `--muted` | sekundární text |\n\n## Doporučené komponenty\n\n- panel\n- badge\n- button\n- sidebar item\n- search result\n- callout\n\n## Příklad komponenty\n\n```html\n<button class=\"btn btn-primary\">Spustit dokumentaci</button>\n```\n\n## Designové pravidlo\n\nKaždý prvek má být čitelný i bez barevného efektu. Pokud se ztratí význam po vypnutí akcentů, je design ještě příliš ukecaný.",
        "updated": "2026-07-11"
      },
      {
        "slug": "navigation-search",
        "title": "Navigace, hledání a paleta",
        "description": "Sidebar, TOC, search modal a příkazová paleta jako jeden tok.",
        "group": "Povrch",
        "order": 5,
        "body": "# Navigace, hledání a paleta\n\nTahle část drží dohromady orientaci v aplikaci. Sidebar ukazuje strom, TOC ukazuje aktuální kapitolu a vyhledávání řeší přesné skoky.\n\n## Ovládání\n\n- `/` otevře search modal\n- `Ctrl/Cmd + K` otevře command palette\n- kliknutí v sidebaru mění stránku\n- breadcrumbs pomáhají vracet se o úroveň zpět\n\n## Co paleta umí\n\n```text\nopen docs\nopen blog\nopen api\nswitch language\nsearch\n```\n\n## Vyhledávání\n\nVýsledky se skládají z dokumentace, blogu i API. Každý výsledek má typ, kontext a cestu.\n\n## Malý detail\n\nNa mobilu se sidebar přesune do plátna, na desktopu zůstává kotvou. Stejná logika, jiné proporce.",
        "updated": "2026-07-11"
      },
      {
        "slug": "writing-content",
        "title": "Psaní obsahu",
        "description": "Jak přidávat nové kapitoly, články a API záznamy.",
        "group": "Obsah",
        "order": 6,
        "body": "# Psaní obsahu\n\nObsah je rozdělený do tří hlavních vrstev: dokumentace, blog a API reference. Každá vrstva používá stejný obsahový rytmus.\n\n## Doporučení pro text\n\n- jeden nápad na odstavec\n- nadpisy jako orientační bójky\n- příklady mezi vysvětlením, ne před ním\n\n## Soubory a názvy\n\n```text\ndocs/getting-started.md\nblog/glass-ui-principles.md\napi/search-index.md\n```\n\n## Struktura stránky\n\n1. titulek\n2. krátký úvod\n3. jasné sekce\n4. příklady\n5. krátké shrnutí\n\n## Rada\n\nPsaní dokumentace není proslov před stadionem. Čím přímější a konkrétnější, tím lépe.",
        "updated": "2026-07-11"
      },
      {
        "slug": "deployment",
        "title": "Nasazení a GitHub Pages",
        "description": "Jak z toho udělat stabilní static deployment bez překvapení.",
        "group": "Operace",
        "order": 7,
        "body": "# Nasazení a GitHub Pages\n\nCílový způsob nasazení je jednoduchý: statické soubory, žádný backend, žádný build server v produkci.\n\n## Doporučený tok\n\n```yaml\nname: deploy\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo \"build static site\"\n      - run: echo \"publish to gh-pages\"\n```\n\n## Co kontrolovat\n\n- správný base path\n- funkční assety\n- 404 fallback pro hash route\n- validní metadata a canonical odkazy\n\n## Stav po nasazení\n\n- homepage dostupná\n- docs, blog i API klikatelné\n- search modal funkční\n- locale přepínač zachovaný\n\nTohle je ten moment, kdy se projekt přestane tvářit jako prototyp a začne fungovat jako nástroj.",
        "updated": "2026-07-11"
      },
      {
        "slug": "roadmap",
        "title": "Roadmapa a další kroky",
        "description": "Co je součástí v1 a kam se dá pokračovat dál.",
        "group": "Operace",
        "order": 8,
        "body": "# Roadmapa a další kroky\n\nV1 má být kompletní, koherentní a použitelná. Další iterace mohou přidat ještě víc hloubky, ale základ už musí držet.\n\n## V1\n\n- landing page\n- docs tree\n- blog\n- API reference\n- search\n- command palette\n- bilingual UI\n\n## V2\n\n- reálný markdown parser\n- syntax highlighting rozšířený o víc jazyků\n- exportované JSON feedy\n- více detailních blogových šablon\n- lepší table rendering\n\n## V3\n\n- přístupové role\n- editace obsahu přes CMS\n- komentáře u článků\n- automatické generování screenshots a OG náhledů\n\n## Kontrola kvality\n\n- každý nový obsah musí mít cestu, titulek a popis\n- každá sekce musí být dohledatelná\n- každá navigační změna musí být logická i na mobilu",
        "updated": "2026-07-11"
      },
      {
        "slug": "components",
        "title": "Komponenty a patterny",
        "description": "Jak skládat karty, badge, tlačítka a layoutové patterny.",
        "group": "UI systém",
        "order": 5,
        "body": "# Komponenty a patterny\n\nKomponentový jazyk drží celý web pohromadě. Každý prvek má jasný účel a jasnou velikost.\n\n## Základní stavebnice\n\n- button\n- badge\n- card\n- panel\n- callout\n- sidebar item\n\n## Patterny\n\n1. nadpis\n2. krátké vysvětlení\n3. karta nebo příklad\n4. poznámka nebo další krok\n\n## Příklad\n\n```html\n<div class=\"card glass\">\n  <h3>Feature</h3>\n  <p>Short description.</p>\n</div>\n```\n\n## Poznámka\n\nKomponenty by měly být malé, znovupoužitelné a bez „tajné postranní magie“.",
        "updated": "2026-07-11"
      },
      {
        "slug": "contributing",
        "title": "Přispívání a workflow",
        "description": "Jak přidat obsah, změnit vzhled a držet repo čisté.",
        "group": "Operace",
        "order": 9,
        "body": "# Přispívání a workflow\n\nKdyž se do projektu zapojí další člověk, musí pochopit strukturu dřív, než začně přepisovat panely.\n\n## Doporučený postup\n\n1. otevři správnou sekci\n2. změň obsah v `content.js`\n3. zkontroluj navigaci\n4. vyzkoušej search modal\n5. zkontroluj mobile layout\n\n## Co hlídat v PR\n\n- srozumitelné názvy\n- žádný rozbitý routing\n- konzistence v češtině i angličtině\n- krátké a konkrétní popisy\n\n## Závěr\n\nNejlepší přispění je to, které nezanechá v projektu odpadní tepelnou mapu.",
        "updated": "2026-07-11"
      }
    ],
    "en": [
      {
        "slug": "getting-started",
        "title": "Introduction and quick start",
        "description": "What VICSDOCS is, who it is for, and how to move through it.",
        "group": "Getting started",
        "order": 1,
        "body": "# Introduction and quick start\n\nVICSDOCS is a static docs starter designed to feel like a finished product, not a factory-floor template. The goal is simple: open the project, understand the structure, and start writing.\n\n## Why it exists\n\n- documentation should be fast, legible, and easy to extend\n- content should be ready for GitHub Pages without a server\n- design should support orientation, not bury it\n\n## What is inside\n\n- landing page for first orientation\n- docs tree with breadcrumbs, sidebar, and TOC\n- blog with posts and tags\n- API reference as static documentation\n- search and command palette for fast navigation\n\n## Your first step\n\n```bash\npython -m http.server 4173\n```\n\nOpen `http://localhost:4173` and walk through docs, blog, and API. Everything is packaged as one coherent system.",
        "updated": "2026-07-11"
      },
      {
        "slug": "installation",
        "title": "Installation and launch",
        "description": "How to run locally and ship to GitHub Pages.",
        "group": "Getting started",
        "order": 2,
        "body": "# Installation and launch\n\nThe project is built as a clean static bundle. It does not need a build chain, Node, or a server. Just open it through any static host.\n\n## Locally\n\n```bash\npython -m http.server 4173\n```\n\n## On GitHub Pages\n\n1. upload the whole repo\n2. enable Pages deployment from the main branch or `gh-pages`\n3. serve the static files without extra configuration\n\n## Recommended structure\n\n```text\n/\n├── index.html\n├── assets/\n│   ├── app.js\n│   ├── content.js\n│   └── styles.css\n└── README.md\n```\n\n## Why it is shaped this way\n\n- simple start with no surprises\n- easy to copy into a new project\n- minimal moving parts, maximum predictability\n\n> Fewer spells, fewer smoke signals while debugging.",
        "updated": "2026-07-11"
      },
      {
        "slug": "architecture",
        "title": "Architecture and routing",
        "description": "How hash routing, registry, and coherent navigation work.",
        "group": "Content",
        "order": 3,
        "body": "# Architecture and routing\n\nVICSDOCS uses a simple hash router. That keeps it working on hosts without server rewrites and gives every page a stable address.\n\n## Principle\n\n- `/cs/home` and `/en/home` are entry points\n- docs, blog, and API each have their own section\n- every registry item has a type, route, title, description, and search text\n\n## Data model\n\n```json\n{\n  \"type\": \"doc\",\n  \"route\": \"/en/docs/getting-started\",\n  \"title\": \"Introduction and quick start\",\n  \"group\": \"Getting started\"\n}\n```\n\n## Consequences\n\n- the sidebar is generated from data, not manually\n- the search modal queries a single index\n- the command palette uses the same registry model\n\n## Benefit\n\nOne data map means fewer dead ends. The user moves naturally, without friction between sections.",
        "updated": "2026-07-11"
      },
      {
        "slug": "design-system",
        "title": "Design system and tokens",
        "description": "Colors, panel layers, typography, and component language.",
        "group": "UI system",
        "order": 4,
        "body": "# Design system and tokens\n\nThe visual language is built on a dark background, glass panels, and restrained color. Color is used with intent, not as decorative confetti.\n\n## Tokens\n\n| Token | Role |\n| --- | --- |\n| `--bg` | main background |\n| `--panel` | card or surface |\n| `--line` | subtle border |\n| `--accent` | active element |\n| `--muted` | secondary text |\n\n## Suggested components\n\n- panel\n- badge\n- button\n- sidebar item\n- search result\n- callout\n\n## Example component\n\n```html\n<button class=\"btn btn-primary\">Open docs</button>\n```\n\n## Design rule\n\nEvery element should remain legible even without color effects. If meaning collapses when accents vanish, the design is still talking too much.",
        "updated": "2026-07-11"
      },
      {
        "slug": "navigation-search",
        "title": "Navigation, search, and palette",
        "description": "Sidebar, TOC, search modal, and command palette as one flow.",
        "group": "Surface",
        "order": 5,
        "body": "# Navigation, search, and palette\n\nThis section keeps orientation together. The sidebar shows the tree, the TOC shows the current chapter, and search handles exact jumps.\n\n## Controls\n\n- `/` opens the search modal\n- `Ctrl/Cmd + K` opens the command palette\n- clicking in the sidebar changes pages\n- breadcrumbs make backtracking easy\n\n## What the palette can do\n\n```text\nopen docs\nopen blog\nopen api\nswitch language\nsearch\n```\n\n## Search\n\nResults are pulled from docs, blog, and API. Every result includes type, context, and route.\n\n## Small detail\n\nOn mobile, the sidebar turns into a canvas layer, while on desktop it stays as an anchor. Same logic, different proportions.",
        "updated": "2026-07-11"
      },
      {
        "slug": "writing-content",
        "title": "Writing content",
        "description": "How to add new chapters, posts, and API records.",
        "group": "Content",
        "order": 6,
        "body": "# Writing content\n\nContent is split into three main layers: docs, blog, and API reference. Each layer uses the same narrative rhythm.\n\n## Text recommendations\n\n- one idea per paragraph\n- headings as orientation buoys\n- examples after explanation, not before it\n\n## Files and names\n\n```text\ndocs/getting-started.md\nblog/glass-ui-principles.md\napi/search-index.md\n```\n\n## Page structure\n\n1. title\n2. short introduction\n3. clear sections\n4. examples\n5. short summary\n\n## Advice\n\nDocumentation is not a stadium speech. The more direct and concrete, the better.",
        "updated": "2026-07-11"
      },
      {
        "slug": "deployment",
        "title": "Deployment and GitHub Pages",
        "description": "How to turn it into a stable static deployment without surprises.",
        "group": "Operations",
        "order": 7,
        "body": "# Deployment and GitHub Pages\n\nThe target deployment path is straightforward: static files, no backend, no production build server.\n\n## Suggested flow\n\n```yaml\nname: deploy\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo \"build static site\"\n      - run: echo \"publish to gh-pages\"\n```\n\n## What to verify\n\n- correct base path\n- working assets\n- 404 fallback for the hash router\n- valid metadata and canonical links\n\n## After deployment\n\n- homepage available\n- docs, blog, and API clickable\n- search modal working\n- locale switch preserved\n\nThis is the moment the project stops pretending to be a prototype and starts behaving like a tool.",
        "updated": "2026-07-11"
      },
      {
        "slug": "roadmap",
        "title": "Roadmap and next steps",
        "description": "What belongs in v1 and where the next steps can go.",
        "group": "Operations",
        "order": 8,
        "body": "# Roadmap and next steps\n\nV1 should be complete, coherent, and usable. Later iterations can add more depth, but the base must already hold together.\n\n## V1\n\n- landing page\n- docs tree\n- blog\n- API reference\n- search\n- command palette\n- bilingual UI\n\n## V2\n\n- real markdown parser\n- broader syntax highlighting coverage\n- exported JSON feeds\n- richer blog page templates\n- better table rendering\n\n## V3\n\n- access roles\n- content editing via CMS\n- article comments\n- automated screenshots and OG previews\n\n## Quality check\n\n- every new piece of content must have a route, title, and description\n- every section must remain searchable\n- every navigation change must make sense on mobile too",
        "updated": "2026-07-11"
      },
      {
        "slug": "components",
        "title": "Components and patterns",
        "description": "How to compose cards, badges, buttons, and layout patterns.",
        "group": "UI system",
        "order": 5,
        "body": "# Components and patterns\n\nThe component language holds the whole site together. Every piece should have a clear job and a clear size.\n\n## Core building blocks\n\n- button\n- badge\n- card\n- panel\n- callout\n- sidebar item\n\n## Patterns\n\n1. heading\n2. short explanation\n3. card or example\n4. note or next step\n\n## Example\n\n```html\n<div class=\"card glass\">\n  <h3>Feature</h3>\n  <p>Short description.</p>\n</div>\n```\n\n## Note\n\nComponents should be small, reusable, and free of hidden side magic.",
        "updated": "2026-07-11"
      },
      {
        "slug": "contributing",
        "title": "Contributing and workflow",
        "description": "How to add content, change the look, and keep the repo tidy.",
        "group": "Operations",
        "order": 9,
        "body": "# Contributing and workflow\n\nWhen another person joins the project, they should understand the structure before rewriting the panels.\n\n## Suggested flow\n\n1. open the right section\n2. edit content in `content.js`\n3. check the navigation\n4. test the search modal\n5. verify the mobile layout\n\n## PR checklist\n\n- clear names\n- no broken routing\n- consistency in Czech and English\n- short and concrete descriptions\n\n## Closing note\n\nThe best contribution is the one that does not leave a thermal mess behind.",
        "updated": "2026-07-11"
      }
    ]
  },
  "blog": {
    "cs": [
      {
        "slug": "glass-ui-principles",
        "title": "Glass UI principy pro docs",
        "excerpt": "Proč glassmorphism funguje, když se použije jako akcent a ne jako maska pro chaos.",
        "date": "2026-07-01",
        "tags": [
          "design",
          "ux",
          "ui"
        ],
        "body": "# Glass UI principy pro docs\n\nGlass není dekorace. Je to filtr, který pomáhá oddělit vrstvy obsahu.\n\n## Pravidla\n\n- pozadí má zůstat tmavé a klidné\n- panely mají mít jemný kontrast\n- stíny mají být hluboké, ne těžké\n- text má vyhrávat nad efektem\n\n## Co se osvědčilo\n\n```css\n.panel {\n  backdrop-filter: blur(20px);\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.08);\n}\n```\n\n## Závěr\n\nKdyž je sklo všude, přestane být sklo. Když je jen tam, kde pomůže vrstvení, začne fungovat jako navigační prostor.",
        "reading": 4
      },
      {
        "slug": "shipping-to-github-pages",
        "title": "Nasazení na GitHub Pages bez nervů",
        "excerpt": "Statický deployment má být nudný v tom nejlepším smyslu.",
        "date": "2026-06-22",
        "tags": [
          "deployment",
          "ci",
          "github"
        ],
        "body": "# Nasazení na GitHub Pages bez nervů\n\nNejlepší deployment je ten, který se neprojevuje. Prostě proběhne.\n\n## Checklist\n\n1. správná base path\n2. statické assety\n3. canonical odkazy\n4. čisté metadata\n5. fallback pro hash router\n\n## Co hlídat\n\n- neodkazovat na localhost\n- nečekat serverovou logiku\n- držet build výstup co nejmenší\n\n> Nasazení má být poslední krok, ne nová kapitola dramatu.",
        "reading": 4
      },
      {
        "slug": "writing-docs-with-rhythm",
        "title": "Psaní docs s rytmem",
        "excerpt": "Jak udržet text živý, ale ne roztěkaný.",
        "date": "2026-06-10",
        "tags": [
          "writing",
          "content",
          "docs"
        ],
        "body": "# Psaní docs s rytmem\n\nDokumentace potřebuje rytmus, protože rytmus je způsob, jak se mozek orientuje bez námahy.\n\n## Praktické zásady\n\n- krátký úvod\n- jasná sekce\n- příklad\n- poznámka\n- shrnutí\n\n## Mini vzor\n\n```md\n## Co to dělá\nJedna věta vysvětlení.\n\n## Příklad\nKód nebo postup.\n\n## Poznámka\nNěco, co by člověk snadno přehlédl.\n```\n\n## Výsledek\n\nText je čitelnější, rozhodnutí rychlejší a čtenář nemusí odhazovat mentalní batoh při každém nadpisu.",
        "reading": 4
      },
      {
        "slug": "search-design-notes",
        "title": "Poznámky k designu hledání",
        "excerpt": "Dobré hledání není o tom najít všechno, ale správně zúžit prostor.",
        "date": "2026-05-28",
        "tags": [
          "search",
          "navigation",
          "ux"
        ],
        "body": "# Poznámky k designu hledání\n\nSearch není samostatný ostrov. Patří do stejné navigační vrstvy jako sidebar a command palette.\n\n## Jak má působit\n\n- rychlé otevření\n- jasný klávesový vstup\n- okamžitá odezva\n- viditelný kontext výsledku\n\n## Co pomáhá\n\n- zvýrazněná shoda\n- typ výsledku\n- návrat na správnou sekci\n- minimum vizuálního bordelu\n\n## Závěr\n\nDobré hledání je jako dobrá police v knihovně: nepoutá pozornost, ale bez něj by se všechno rozpadlo do hromady.",
        "reading": 4
      }
    ],
    "en": [
      {
        "slug": "glass-ui-principles",
        "title": "Glass UI principles for docs",
        "excerpt": "Why glassmorphism works when used as an accent and not as a disguise for chaos.",
        "date": "2026-07-01",
        "tags": [
          "design",
          "ux",
          "ui"
        ],
        "body": "# Glass UI principles for docs\n\nGlass is not decoration. It is a filter that helps separate content layers.\n\n## Rules\n\n- background should stay dark and calm\n- panels should have subtle contrast\n- shadows should feel deep, not heavy\n- text should beat the effect\n\n## What worked\n\n```css\n.panel {\n  backdrop-filter: blur(20px);\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.08);\n}\n```\n\n## Closing note\n\nWhen glass is everywhere, it stops being glass. When it appears only where layering helps, it starts doing real navigational work.",
        "reading": 4
      },
      {
        "slug": "shipping-to-github-pages",
        "title": "Shipping to GitHub Pages without nerves",
        "excerpt": "Static deployment should be boring in the best possible way.",
        "date": "2026-06-22",
        "tags": [
          "deployment",
          "ci",
          "github"
        ],
        "body": "# Shipping to GitHub Pages without nerves\n\nThe best deployment is the one that stays invisible. It simply happens.\n\n## Checklist\n\n1. correct base path\n2. static assets\n3. canonical links\n4. clean metadata\n5. fallback for the hash router\n\n## What to watch\n\n- do not link to localhost\n- do not expect server logic\n- keep the build output as small as possible\n\n> Deployment should be the final step, not a new chapter of drama.",
        "reading": 4
      },
      {
        "slug": "writing-docs-with-rhythm",
        "title": "Writing docs with rhythm",
        "excerpt": "How to keep text alive without making it restless.",
        "date": "2026-06-10",
        "tags": [
          "writing",
          "content",
          "docs"
        ],
        "body": "# Writing docs with rhythm\n\nDocumentation needs rhythm, because rhythm is how the brain orients itself without strain.\n\n## Practical rules\n\n- short introduction\n- clear section\n- example\n- note\n- summary\n\n## Mini pattern\n\n```md\n## What it does\nOne sentence explanation.\n\n## Example\nCode or steps.\n\n## Note\nSomething a reader might easily miss.\n```\n\n## Result\n\nThe text becomes easier to read, decisions arrive sooner, and the reader does not have to drop a mental backpack at every heading.",
        "reading": 4
      },
      {
        "slug": "search-design-notes",
        "title": "Search design notes",
        "excerpt": "Good search is not about finding everything, but about narrowing the space correctly.",
        "date": "2026-05-28",
        "tags": [
          "search",
          "navigation",
          "ux"
        ],
        "body": "# Search design notes\n\nSearch is not a separate island. It belongs to the same navigation layer as the sidebar and command palette.\n\n## How it should feel\n\n- fast to open\n- clear keyboard entry\n- immediate feedback\n- visible result context\n\n## What helps\n\n- highlighted match\n- result type\n- return to the right section\n- very little visual clutter\n\n## Closing note\n\nGood search is like a well-built library shelf: it does not demand attention, but without it everything would collapse into a pile.",
        "reading": 4
      }
    ]
  },
  "api": {
    "cs": [
      {
        "slug": "site-json",
        "method": "GET",
        "path": "/api/site.json",
        "title": "Metadata webu",
        "summary": "Vrací název, slogan, popis a odkazy na repozitář.",
        "body": "# Metadata webu\n\nTahle položka popisuje základní identitu webu a může být použita pro generování hlaviček nebo build metadat.\n\n## Návratová struktura\n\n```json\n{\n  \"name\": \"VICSDOCS\",\n  \"tagline\": \"Dokumentace jinak.\",\n  \"description\": \"Koherentní docs starter pro GitHub Pages\"\n}\n```\n\n## Použití\n\n- Open Graph metadata\n- title a canonical generátor\n- landing page hero"
      },
      {
        "slug": "navigation-json",
        "method": "GET",
        "path": "/api/navigation.json",
        "title": "Strom navigace",
        "summary": "Popisuje docs sidebar, skupiny a pořadí položek.",
        "body": "# Strom navigace\n\nTento endpoint by v plném produktu vracel kompletní sidebar strom.\n\n## Co obsahuje\n\n- skupiny\n- pořadí\n- cesty\n- aktivní větev\n\n## Příklad\n\n```json\n{\n  \"groups\": [\n    {\n      \"label\": \"Začínáme\",\n      \"items\": [\"getting-started\", \"installation\"]\n    }\n  ]\n}\n```"
      },
      {
        "slug": "search-index-json",
        "method": "GET",
        "path": "/api/search-index.json",
        "title": "Vyhledávací index",
        "summary": "Zjednodušený katalog všech stránek pro search modal.",
        "body": "# Vyhledávací index\n\nSearch modal používá stejný registry model jako sidebar a command palette.\n\n## Pole\n\n- type\n- title\n- description\n- route\n- tags\n\n## Poznámka\n\nV této standalone verzi je index generovaný přímo v prohlížeči z datového objektu."
      },
      {
        "slug": "rss-xml",
        "method": "GET",
        "path": "/rss.xml",
        "title": "RSS feed",
        "summary": "Nové články a release notes v jednoduše čitelném feedu.",
        "body": "# RSS feed\n\nRSS je vhodné pro blog a oznámení. V produkční verzi by obsahoval posledních dvacet položek.\n\n## Příklad\n\n```xml\n<item>\n  <title>Glass UI principy pro docs</title>\n  <link>/cs/blog/glass-ui-principles</link>\n</item>\n```"
      },
      {
        "slug": "sitemap-xml",
        "method": "GET",
        "path": "/sitemap.xml",
        "title": "Sitemap",
        "summary": "Seznam všech veřejných cest pro vyhledávače.",
        "body": "# Sitemap\n\nSitemap pomáhá vyhledávačům chápat hierarchii obsahu.\n\n## Zahrnuté sekce\n\n- home\n- docs\n- blog\n- api\n\n## Poznámka\n\nV čistě statickém nasazení je sitemap jednoduše generovaný přehled všech cest."
      }
    ],
    "en": [
      {
        "slug": "site-json",
        "method": "GET",
        "path": "/api/site.json",
        "title": "Site metadata",
        "summary": "Returns the name, tagline, description, and repository links.",
        "body": "# Site metadata\n\nThis item describes the site's identity and can be used to generate headers or build metadata.\n\n## Return shape\n\n```json\n{\n  \"name\": \"VICSDOCS\",\n  \"tagline\": \"Docs, reimagined.\",\n  \"description\": \"A coherent docs starter for GitHub Pages\"\n}\n```\n\n## Use cases\n\n- Open Graph metadata\n- title and canonical generation\n- landing page hero"
      },
      {
        "slug": "navigation-json",
        "method": "GET",
        "path": "/api/navigation.json",
        "title": "Navigation tree",
        "summary": "Describes the docs sidebar, groups, and item ordering.",
        "body": "# Navigation tree\n\nThis endpoint would return the full sidebar tree in the complete product.\n\n## What it contains\n\n- groups\n- order\n- routes\n- active branch\n\n## Example\n\n```json\n{\n  \"groups\": [\n    {\n      \"label\": \"Getting started\",\n      \"items\": [\"getting-started\", \"installation\"]\n    }\n  ]\n}\n```"
      },
      {
        "slug": "search-index-json",
        "method": "GET",
        "path": "/api/search-index.json",
        "title": "Search index",
        "summary": "A simplified catalog of all pages for the search modal.",
        "body": "# Search index\n\nThe search modal uses the same registry model as the sidebar and command palette.\n\n## Fields\n\n- type\n- title\n- description\n- route\n- tags\n\n## Note\n\nIn this standalone version the index is generated directly in the browser from the data object."
      },
      {
        "slug": "rss-xml",
        "method": "GET",
        "path": "/rss.xml",
        "title": "RSS feed",
        "summary": "New posts and release notes in a simple feed.",
        "body": "# RSS feed\n\nRSS works well for blog posts and announcements. In production it would include the latest twenty items.\n\n## Example\n\n```xml\n<item>\n  <title>Glass UI principles for docs</title>\n  <link>/en/blog/glass-ui-principles</link>\n</item>\n```"
      },
      {
        "slug": "sitemap-xml",
        "method": "GET",
        "path": "/sitemap.xml",
        "title": "Sitemap",
        "summary": "A list of all public routes for search engines.",
        "body": "# Sitemap\n\nSitemap helps search engines understand the content hierarchy.\n\n## Included sections\n\n- home\n- docs\n- blog\n- api\n\n## Note\n\nIn a purely static deployment the sitemap is simply a generated overview of all routes."
      }
    ]
  },
  "nav": {
    "cs": [
      {
        "label": "Začínáme",
        "items": [
          "getting-started",
          "installation"
        ]
      },
      {
        "label": "Obsah",
        "items": [
          "architecture",
          "writing-content"
        ]
      },
      {
        "label": "UI systém",
        "items": [
          "design-system",
          "components",
          "navigation-search"
        ]
      },
      {
        "label": "Operace",
        "items": [
          "deployment",
          "contributing",
          "roadmap"
        ]
      }
    ],
    "en": [
      {
        "label": "Getting started",
        "items": [
          "getting-started",
          "installation"
        ]
      },
      {
        "label": "Content",
        "items": [
          "architecture",
          "writing-content"
        ]
      },
      {
        "label": "UI system",
        "items": [
          "design-system",
          "components",
          "navigation-search"
        ]
      },
      {
        "label": "Operations",
        "items": [
          "deployment",
          "contributing",
          "roadmap"
        ]
      }
    ]
  }
};
