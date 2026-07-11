# VICSDOCS standalone starter

Hotový statický docs starter inspirovaný návrhem z dokumentace.

## Co obsahuje
- landing page
- docs routování přes hash
- sidebar a breadcrumb
- TOC na pravé straně
- fulltext search modal
- command palette přes Ctrl/Cmd + K
- blog list a detail článku
- API reference
- přepínání čeština / English

## Spuštění lokálně
Nejjednodušší je obyčejný statický server:

```bash
python -m http.server 4173
```

Pak otevři `http://localhost:4173`.

## Úpravy
Obsah je v `assets/content.js`.
Stylování je v `assets/styles.css`.
Logika aplikace je v `assets/app.js`.
