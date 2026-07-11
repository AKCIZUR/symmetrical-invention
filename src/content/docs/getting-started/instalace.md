---
title: Instalace
description: Lokální setup, build a příprava pro GitHub Pages.
section: Začínáme
order: 2
tags: [install, setup]
---

# Instalace

## Požadavky

- Node.js 20+ nebo novější stabilní verze
- npm nebo pnpm
- Git

## Instalace balíčků

```bash
npm install
```

## Lokální spuštění

```bash
npm run dev
```

## Build

```bash
npm run build
```

Výstup se generuje do `dist/`.

## GitHub Pages

Workflow používá build z repozitáře a následný deploy přes GitHub Actions. Pro správnou cestu na GitHub Pages se nastavuje `base` podle názvu repozitáře.

## Tip

Když chceš změnit doménu, nastav `SITE_URL` v prostředí nebo v GitHub Actions.
