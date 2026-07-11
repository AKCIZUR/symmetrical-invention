# VICSDOCS standalone starter

Hotový statický starter podle dokumentace VICSDOCS.

## Co obsahuje
- tmavý design inspirovaný Linear / shadcn
- hash routing pro GitHub Pages
- docs, blog, API a landing
- sidebar, breadcrumbs, TOC a prev/next
- search modal a command palette
- přepínání čeština / English
- čistý static setup bez build nástrojů

## Spuštění
Nejjednodušší je obyčejný statický server:

```bash
python -m http.server 4173
```

Otevři `http://localhost:4173`.

## Struktura
- `index.html` hlavní shell
- `assets/content.js` data pro docs/blog/API
- `assets/app.js` logika routování a UI
- `assets/styles.css` vzhled

## Úpravy
Chceš-li přidat další stránku, doplň ji do `assets/content.js`.
