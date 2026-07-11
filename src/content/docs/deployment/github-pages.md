---
title: GitHub Pages
description: Deploy workflow, base path a produkční build.
section: Provoz
order: 1
tags: [deploy, pages]
---

# GitHub Pages

## Deploy workflow

Projekt používá GitHub Actions workflow, které:

- nainstaluje závislosti
- postaví Astro build
- nasadí výstup na GitHub Pages

## Base path

Pokud repo není `username.github.io`, nastavuje se `base` podle názvu repozitáře. Díky tomu fungují všechny odkazy i assety.

## Důležité

- používej statický output
- drž všechny assety relativně
- kontroluj `site` v konfiguraci

## Výsledek

Repo je připravené pro publikaci bez serveru.
