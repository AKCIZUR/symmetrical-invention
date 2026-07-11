---
title: Úvod
description: Co NoirDocs umí, jak je postavený a jak se v něm orientovat.
section: Začínáme
order: 1
tags: [start, overview]
---

# Úvod

NoirDocs je minimalistický dokumentační starter postavený na Astro. Cílem je vytvořit čistý web pro Markdown dokumenty, blog, reference a provozní stránku projektu.

## Co tady najdeš

- dark B&W shadcn-inspired design
- liquid glass vrstvy a jemné rozostření
- megamenu v horní liště
- breadcrumbs a automatický TOC
- search paletu přes `Ctrl + K`
- page transitions přes Astro client router
- GitHub Pages deploy workflow

## Jak je projekt myšlený

Obsah je uložený v content collections. Každý dokument má vlastní metadata, takže se dá použít v navigaci, blogu, přehledech i vyhledávání.

## Co upravovat jako první

1. `src/data/site.ts`
2. `src/content/docs/*.md`
3. `src/styles/global.css`
4. `astro.config.mjs`

## Doporučený workflow

- napiš nový `.md` soubor
- doplň frontmatter
- přidej odkaz do navigace
- spusť lokální build
- nasadit do GitHub Pages

## Výsledek

Projekt zůstává lehký, statický a snadno rozšiřitelný.
