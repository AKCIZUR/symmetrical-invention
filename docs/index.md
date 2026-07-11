# MaterialX dokumentace

Tato sada dokumentů slouží jako plnohodnotný základ pro webovou dokumentaci v češtině. Je připravená pro GitHub Pages, obsahuje vlastní vzhled, bezpečné přepisování šablon a strukturu, kterou lze dál rozšiřovat.

## Co je uvnitř

- úvodní průvodce
- instalace a rychlý start
- navigace, breadcrumbs a obsah stránky
- vyhledávání a editace přes GitHub
- přizpůsobení tématu, barev a šablon
- SEO, Open Graph a social cards
- řešení chyb při buildu

## Jak je projekt navržený

```text
repo/
├── docs/
│   ├── getting-started/
│   ├── guide/
│   ├── customization/
│   ├── content/
│   ├── reference/
│   └── troubleshooting/
├── .github/workflows/
├── mkdocs.yml
└── requirements.txt
```

## Doporučený postup práce

1. Napiš obsah do Markdown souborů.
2. Uprav `mkdocs.yml`, aby odpovídal struktuře webu.
3. Přidej vlastní CSS nebo JavaScript jen tam, kde je to nutné.
4. Otestuj lokalně pomocí `mkdocs serve`.
5. Pusť build přes `mkdocs build --strict`.
6. Nasadíš-li na GitHub Pages, používej workflow v tomto repu.

!!! tip
    Pokud chceš nový dokument, stačí přidat `.md` soubor do odpovídající složky a doplnit jej do navigace.

## Co tento starter umí

- tmavý i světlý režim
- vyhledávání
- sticky TOC
- edit link na GitHub
- custom bannery
- responzivní rozložení
- 75% vizuální měřítko rozhraní
