# Nasazení a úklid

Core verze používá jednoduchý a stabilní deploy do větve `gh-pages`.

## Proč ne Pages artifact

Při deployi přes Pages artifact může být problém s duplicitními artefakty při opakovaném běhu workflow. Branch deploy tenhle problém obchází.

## Workflow

1. Build přes `mkdocs build --strict`
2. Publikace do `gh-pages`
3. GitHub Pages čte obsah přímo z této větve

## Co hlídat

- nastavení Pages v repozitáři
- správné `site_url`
- existence všech souborů v `nav`
- úspěšný build bez warningů, které by blokovaly strict režim
