# MaterialX core dokumentace

Produkční dokumentace v češtině pro **MkDocs MaterialX** s implementovanými pluginy, bezpečným buildem a nasazením na **GitHub Pages**.

## Co je v core verzi

- české UI a české texty
- přehledná struktura dokumentace
- pluginy pro Git metadata, galerii, minifikaci a vyhledávání
- bezpečné `overrides/`
- 75% vizuální měřítko rozhraní
- deploy přes `gh-pages` větev bez Pages artifact konfliktů

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

Tento core starter publikuje do větve `gh-pages`.
V GitHub repozitáři nastav Pages na zdroj z větve `gh-pages`.

1. Nahraď v `mkdocs.yml` hodnoty `site_url`, `repo_url` a `edit_uri`.
2. Pushni na větev `main`.
3. Workflow vytvoří statický web a publikuje ho do `gh-pages`.

## Struktura pluginů

- `search` pro fulltext
- `git-revision-date-localized` pro poslední změny
- `git-authors` pro autory stránek
- `glightbox` pro obrázky a galerie
- `minify` pro menší a rychlejší HTML výstup
