---
title: Přechody stránek
description: Jak jsou zapnuté page transitions a co se při navigaci děje.
section: Průvodce
order: 3
tags: [transitions, motion]
---

# Přechody stránek

## Astro client router

Astro podporuje animované přechody mezi stránkami přes client router. To je důležité pro web, který má působit moderně a „lehkce“.

## Co je přínos

- plynulejší navigace
- lepší dojem z rychlosti
- možnost sdílet stav
- kompatibilita s MPA

## Nastavení

V layoutu je vložený `ClientRouter` komponent z `astro:transitions`.

## Doporučení

Přechody drž jemné. Pro dokumentaci stačí fade a lehký blur.
