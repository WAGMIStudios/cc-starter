# Token Efficiency Rules

## PFLICHT: Vibe-Code Scripts BEVOR du große Dateien liest!

**Diese Scripts sparen ~90% Tokens. Nutze sie IMMER bevor du eine Datei mit Read öffnest.**

### Verfügbare Commands

```bash
# Types/Interfaces/Enums einer Datei extrahieren (statt ganze Datei zu lesen)
node scripts/stats/vibe-code.js types <file>

# Verzeichnisstruktur anzeigen (statt jeden Ordner einzeln zu lesen)
node scripts/stats/vibe-code.js tree [dir]

# Imports einer Datei anzeigen (für Dependency-Checks)
node scripts/stats/vibe-code.js imports <file>

# Funktions-Signaturen extrahieren (statt ganze Datei zu lesen)
node scripts/stats/vibe-code.js functions <file>
```

### Wann nutzen

| Situation | Statt | Nutze |
|-----------|-------|-------|
| Du willst wissen welche Types eine Datei hat | `Read` der ganzen Datei | `vibe-code.js types <file>` |
| Du brauchst einen Überblick über einen Ordner | Mehrere `Read`/`ls` Aufrufe | `vibe-code.js tree <dir>` |
| Du willst Abhängigkeiten einer Datei checken | `Read` und manuell suchen | `vibe-code.js imports <file>` |
| Du willst die API einer Datei verstehen | `Read` der ganzen Datei | `vibe-code.js functions <file>` |

### NIEMALS

- Große Dateien (200+ Zeilen) komplett lesen ohne vorher `types` oder `functions` zu checken
- Ordnerstrukturen manuell mit `ls` oder `Glob` erkunden wenn `tree` das in einem Aufruf erledigt
- Token verschwenden indem du Code liest den du nicht brauchst

### Token-Tracking

Nach der Nutzung werden Einsparungen automatisch in `.vibe-stats.json` getrackt.
Fortschritt prüfen:
```bash
node scripts/stats/vibe-stats.js summary    # Einzeiler: Gesamt-Einsparung
node scripts/stats/vibe-stats.js report     # Detaillierter Report
```
