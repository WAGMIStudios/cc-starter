# DevOps & Deployment Regeln

## Git-Disziplin
- Zuständigkeiten in Commits trennen (App-Code vs. Infrastruktur vs. Docs)
- Aussagekräftige Commit-Messages schreiben die das WARUM erklären, nicht nur das WAS
- Niemals Force-Push auf main/master ohne Team-Absprache

## Umgebungsvariablen
- Neue ENV-Variablen müssen dokumentiert werden
- Niemals .env-Dateien mit echten Werten committen
- .env.example mit Platzhalter-Werten bereitstellen

## Port-Management
- Einen Dev-Server-Port verwenden — nicht mehrere starten
- Verwaiste Prozesse beenden bevor neue Dev-Server gestartet werden

## Build-Verifikation
- Immer Build/Lint vor dem Committen ausführen
- Warnungen beheben, nicht unterdrücken
- CI/CD-Pipeline grün halten
