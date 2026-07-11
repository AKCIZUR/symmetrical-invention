# Build

Pokud `mkdocs build --strict` selže, je potřeba projít workflow krok po kroku.

## Nejčastější chyby

### 1. `page.meta` je `None`

V override šabloně musí být kontrola, že stránka i metadata opravdu existují.

### 2. Dvojitý Pages artifact

Použij unikátní `artifact_name` pro každé spuštění workflow, například:

```yaml
artifact_name: github-pages-${{ github.run_id }}-${{ github.run_attempt }}
```

### 3. Chybějící soubor

Zkontroluj, že každá stránka v `nav` skutečně existuje.

### 4. Neplatné Markdown rozšíření

Když něco neprojde, dočasně vypni podezřelé rozšíření a ověř, které z nich způsobuje chybu.

!!! note
    Nejrychlejší diagnostika je vždy lokální `mkdocs build --strict` před pushnutím do GitHubu.
