# Overrides

Adresář `docs/overrides/` slouží k přepisování částí šablony bez zásahu do zdrojových souborů MaterialX.

## K čemu je to dobré

- vlastní hlavička
- vlastní banner
- vlastní patička
- rozšířené meta tagy
- přizpůsobení pro SEO

## Bezpečný vzor

V šablonách vždy kontroluj, že `page` existuje, než saháš na `page.meta` nebo `page.title`.

## Typický seznam souborů

- `main.html`
- `partials/header.html`
- `partials/footer.html`
- `partials/toc.html`
- `partials/breadcrumbs.html`
