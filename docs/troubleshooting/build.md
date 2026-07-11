# Build

Nejčastější problémy při buildu vznikají kvůli cestám, šablonám nebo pluginům.

## Chyby v override

Když build spadne v `overrides/main.html`, ověř, že pracuješ s proměnnými jen po kontrole existence. Šablona může běžet i pro 404 nebo prázdný kontext.

## Chyby v konfiguraci

Zkontroluj `mkdocs.yml`, hlavně `nav`, `theme`, `plugins` a cesty k CSS/JS souborům. Jeden špatný název souboru stačí k pádu buildu.

## Doporučený postup

Pokud něco nefunguje, spusť build lokálně, zjednoduš konfiguraci a přidávej funkce zpět po jednom kroku.
