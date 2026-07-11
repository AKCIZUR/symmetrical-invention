---
title: jak
description: Practical examples
---

# Přizpůsobení vzhledu (Theme Customization)

MkDocs MaterialX umožňuje kompletně upravit vzhled dokumentace bez úpravy zdrojového kódu tématu. Veškeré změny se provádějí pomocí konfiguračního souboru `mkdocs.yml`, vlastních CSS/JS souborů a adresáře `overrides/`.

---

# Struktura projektu

```text
docs/
├── assets/
│   ├── css/
│   │   ├── extra.css
│   │   ├── syntax.css
│   │   ├── animations.css
│   │   └── skeleton.css
│   ├── js/
│   │   ├── app.js
│   │   ├── lazy.js
│   │   └── search.js
│   └── images/
│
└── overrides/
    ├── main.html
    └── partials/
        ├── header.html
        ├── footer.html
        ├── sidebar.html
        ├── breadcrumbs.html
        ├── toc.html
        └── hero.html
```

---

# Přidání vlastního CSS

V souboru `mkdocs.yml`:

```yaml
extra_css:
  - assets/css/extra.css
  - assets/css/syntax.css
  - assets/css/animations.css
```

Poté upravujte například:

```css
:root {
    --md-primary-fg-color: #4f46e5;
    --md-accent-fg-color: #06b6d4;
    --md-default-bg-color: #0f172a;
}

.md-header {
    backdrop-filter: blur(18px);
}

.md-content {
    max-width: 900px;
}
```

---

# Přidání vlastního JavaScriptu

```yaml
extra_javascript:
  - assets/js/app.js
  - assets/js/search.js
```

Například:

* animace
* Command Palette
* vlastní efekty
* lazy loading
* scroll animace

---

# Změna barev

V souboru `mkdocs.yml`:

```yaml
theme:
  name: materialx

  palette:
    - scheme: default
      primary: indigo
      accent: cyan

    - scheme: slate
      primary: indigo
      accent: cyan
      toggle:
        icon: material/weather-night
        name: Dark mode
```

Podporované primární barvy:

* red
* pink
* purple
* deep purple
* indigo
* blue
* light blue
* cyan
* teal
* green
* lime
* yellow
* amber
* orange
* deep orange
* brown
* grey
* blue grey

---

# Změna fontů

```yaml
theme:
  font:
    text: Inter
    code: JetBrains Mono
```

Lze použít například:

* Inter
* Roboto
* Open Sans
* Nunito
* Poppins
* IBM Plex Sans
* Fira Code
* JetBrains Mono

---

# Přizpůsobení hlavičky

Soubor:

```text
docs/overrides/partials/header.html
```

Můžete přidat:

* vlastní logo
* GitHub tlačítko
* Discord
* přepínač jazyků
* Command Palette
* vlastní menu

---

# Přizpůsobení sidebaru

Soubor:

```text
docs/overrides/partials/sidebar.html
```

Možnosti:

* vlastní ikony
* skupiny
* oblíbené stránky
* poslední navštívené
* vlastní sekce

---

# Breadcrumbs

Soubor:

```text
docs/overrides/partials/breadcrumbs.html
```

Například:

```text
Home

>

Guide

>

Installation
```

---

# On This Page

Soubor:

```text
docs/overrides/partials/toc.html
```

Lze upravit:

* šířku
* sticky pozici
* barvy
* zvýraznění aktivní sekce
* animace

---

# Hero sekce

Na domovské stránce lze vytvořit vlastní Hero.

Například:

* gradient pozadí
* Glassmorphism
* CTA tlačítka
* statistiky
* obrázky
* animace
* video pozadí

---

# Přizpůsobení kódu

Soubor:

```text
assets/css/syntax.css
```

Můžete změnit:

* barvy jazyků
* horní panel
* tlačítko Copy
* Download
* Fullscreen
* zvýraznění řádků
* číslování řádků

---

# Animace

Soubor:

```text
assets/css/animations.css
```

Lze přidat:

* fade
* slide
* zoom
* cards hover
* glass efekty
* smooth scrolling
* page transitions

---

# Dark / Light režim

MaterialX podporuje:

* Auto
* Light
* Dark

Lze také vytvořit vlastní barevná schémata pomocí CSS proměnných.

---

# Overrides

Adresář `overrides/` umožňuje přepsat téměř libovolnou část vzhledu bez úprav zdrojového kódu MaterialX.

Nejčastěji upravované soubory:

```text
main.html
partials/header.html
partials/footer.html
partials/sidebar.html
partials/toc.html
partials/search.html
partials/logo.html
partials/nav.html
partials/breadcrumbs.html
```

Díky tomu zůstává projekt kompatibilní s budoucími aktualizacemi tématu.

---

# Doporučený postup

1. Nejprve upravujte `mkdocs.yml`.
2. Barvy, fonty a rozložení řešte v `extra.css`.
3. Pokročilé změny provádějte pomocí `overrides/`.
4. JavaScript přidávejte pouze tehdy, když nestačí HTML nebo CSS.
5. Po každé větší změně spusťte:

```bash
mkdocs serve
```

a průběžně kontrolujte vzhled dokumentace.

---

# Tip

Nikdy neupravujte soubory uvnitř nainstalovaného balíčku MaterialX (`site-packages`). Veškeré vlastní úpravy provádějte pouze pomocí `overrides/`, `extra_css`, `extra_javascript` a `mkdocs.yml`. Díky tomu bude možné bez problémů aktualizovat MaterialX na novější verze.
