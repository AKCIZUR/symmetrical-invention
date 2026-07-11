# Nasazení

Cílem je bezpečný a automatický deploy na GitHub Pages.

## GitHub Actions

Workflow nejdřív nainstaluje závislosti, pak spustí `mkdocs build --strict` a nakonec nahraje výstupní `site/` jako Pages artifact.

## Nastavení repozitáře

V GitHub repository settings je potřeba zapnout Pages přes GitHub Actions. Repo musí mít správně nastavené právo pro zápis do Pages prostředí.

## Kontrola před publikací

Před nasazením vždy ověř, že všechny odkazy fungují, obrázky mají správné cesty a build projde v čistém prostředí.
