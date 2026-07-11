# Nasazení

Web je připravený pro GitHub Pages přes GitHub Actions.

## Co workflow dělá

- nainstaluje Python
- nainstaluje závislosti
- spustí `mkdocs build --strict`
- nahraje Pages artifact
- nasadí web na GitHub Pages

## Důležité nastavení

- `site_url`
- `repo_url`
- `edit_uri`
- Pages source: **GitHub Actions**

## Kdy se objeví problém

- dvě různé workflow pro Pages
- neplatná cesta k `site`
- chybějící `permissions`
- dvakrát nahraný artifact během rerunu

!!! tip
    Při opakovaném spouštění workflow používej unikátní název artifactu podle `github.run_id` a `github.run_attempt`.
