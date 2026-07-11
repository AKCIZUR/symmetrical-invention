# MaterialX dokumentace

Toto je core verze produkční dokumentace pro MkDocs MaterialX. Je připravená pro GitHub Pages, obsahuje implementované pluginy a je postavená tak, aby šla dál rozšiřovat bez zásahů do zdrojového kódu tématu.

## Co řeší

- navigaci a orientaci v dokumentaci
- editaci přes GitHub
- metadata z Git historie
- obrázky s lightboxem
- lepší výkon díky minifikaci
- černé matné sklo, animované přechody a megamenu

## Jak je projekt navržený

```text
repo/
├── docs/
│   ├── getting-started/
│   ├── guide/
│   ├── plugins/
│   ├── customization/
│   ├── content/
│   ├── reference/
│   └── troubleshooting/
├── .github/workflows/
├── mkdocs.yml
└── requirements.txt
```

## Co je připravené k použití

- čeština v celém rozhraní
- tmavý režim s černým matným sklem
- 80% měřítko zobrazení
- sticky megamenu v horní části
- skrytý boční panel dokumentace
- animované přechody mezi stránkami
- breadcrumbs
- edit link na GitHub
- Git metadata v patičce nebo u stránky podle šablony

## Doporučený pracovní postup

1. Vytvoř Markdown stránku.
2. Přidej ji do navigace nebo do struktury složek.
3. Otestuj `mkdocs serve`.
4. Ověř `mkdocs build --strict`.
5. Pushni na GitHub a nech workflow publikovat web.

!!! tip
    Když přidáváš novou sekci, začni úvodní stránkou a teprve potom doplň detailní články.
