# MaterialX dokumentace v češtině

Produkční šablona pro **MkDocs + MaterialX** připravená pro **GitHub Pages**.

## Co obsahuje

- plně vyplněné Markdown dokumenty v češtině
- bezpečné `overrides/` šablony
- vlastní CSS a JavaScript
- 75% zobrazení rozhraní
- GitHub Actions workflow pro nasazení
- české UI texty a menu

## Spuštění lokálně

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Nasazení na GitHub Pages

1. Nahraď v `mkdocs.yml` hodnoty `site_url`, `repo_url` a `edit_uri`.
2. V GitHub repozitáři zapni **Pages** přes **GitHub Actions**.
3. Pushni na větev `main`.
