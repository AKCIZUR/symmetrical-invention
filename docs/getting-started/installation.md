# Instalace

Nejjednodušší varianta je použití virtuálního prostředí Pythonu.

## Postup

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

## Kontrola instalace

```bash
mkdocs --version
mkdocs build --strict
```

## Co je potřeba hlídat

- Python 3.12 nebo novější
- správně nainstalované balíčky z `requirements.txt`
- validní `site_url` pro GitHub Pages
- existenci všech souborů v `docs/`

!!! warning
    Pokud používáš GitHub Actions, nenechávej dva workflow soubory pro Pages ve stejném repu. Může to způsobit konflikty při deployi.
