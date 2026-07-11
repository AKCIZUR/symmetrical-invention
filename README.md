# NoirGlass Docs

Minimalistická statická dokumentační appka v dark B&W stylu.

## Co obsahuje

- shadcn inspired vzhled
- liquid glass panely
- megamenu v navbaru
- command palette `Ctrl + K`
- automatický TOC
- page transitions
- code bloky s barevným border line podle jazyka
- GitHub Pages deploy workflow

## Lokální spuštění

Otevři `src/index.html` nebo spusť jednoduchý server:

```bash
python -m http.server 8080
```

## Build

```bash
npm run build
```

Výstup se vytvoří do `dist/`.

## Deploy

Workflow v `.github/workflows/pages.yml` publikuje `dist/` do větve `gh-pages`.

## Poznámka k GitHub Pages

Workflow počítá s projektovou stránkou GitHub Pages. Pokud používáš vlastní doménu nebo user site, je možné upravit base cestu přímo v HTML/JS.
