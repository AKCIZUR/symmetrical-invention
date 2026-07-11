---
title: Časté chyby
description: Nejčastější problémy a rychlé opravy.
section: Provoz
order: 2
tags: [debug, faq]
---

# Časté chyby

## 1. Prázdné odkazy v navigaci

Zkontroluj, jestli slug v navigaci sedí na skutečný soubor.

## 2. Špatná base path

Na GitHub Pages musí být správně nastavený `base`.

## 3. Rozbitý build po změně CSS

Zkontroluj import `@import "tailwindcss";` a Vite plugin.

## 4. Neběží search paleta

Ujisti se, že je načtený komponent search a že stránka obsahuje data v indexu.

## 5. 404 po nasazení

Zpravidla špatný `site` nebo `base`.
