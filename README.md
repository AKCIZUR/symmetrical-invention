# MaterialX Docs

Kompletní dokumentační starter pro **MkDocs + MaterialX** a nasazení na **GitHub Pages**.

## Co je uvnitř

- strukturované Markdown dokumenty
- produkční `mkdocs.yml`
- vlastní CSS a JS pro vzhled a skeleton loading
- safe `overrides/` šablona
- GitHub Actions deploy workflow

## Spuštění

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Nasazení

Nastav v `mkdocs.yml`:

- `site_url`
- `repo_url`
- `edit_uri`

a v GitHubu zapni Pages přes **GitHub Actions**.
