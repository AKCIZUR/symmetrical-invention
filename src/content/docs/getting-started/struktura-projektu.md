---
title: Struktura projektu
description: Rozdělení složek, souborů a odpovědností v projektu.
section: Začínáme
order: 3
tags: [structure, folders]
---

# Struktura projektu

## Základ

```text
src/
├── components/
├── content/
├── data/
├── layouts/
├── pages/
└── styles/
```

## Co je kde

- `components/` — hlavička, footer, TOC, paleta hledání
- `content/` — Markdown obsah dokumentace a blogu
- `data/` — navigace, search index a základní metadata
- `layouts/` — hlavní layouty pro homepage a dokumenty
- `pages/` — routy pro web
- `styles/` — globální design systému

## Proč je to takto

Tahle struktura je jednoduchá, přehledná a dá se dlouhodobě udržovat i bez frameworkové složitosti.
