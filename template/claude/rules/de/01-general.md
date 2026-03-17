# Allgemeine Arbeitsregeln

## 1. Aufgaben-Tracking
Bei Tasks mit **3+ Schritten** IMMER:
- Aufgaben-Tracking verwenden um Arbeitspakete zu verwalten
- Jeden Schritt als Aufgabe anlegen BEVOR du anfängst
- Jeden Punkt sofort als erledigt markieren wenn er fertig ist

## 2. Dokumentation modular halten
- Keine ausufernden Status-Dateien erstellen
- Updates gehören in die passende Dokumentation (Feature-Docs, Architektur-Docs)
- Saubere Trennung der Zuständigkeiten einhalten

## 3. Vor dem Coden
- Bei Unklarheiten: Erst fragen, dann implementieren
- Bei mehreren Lösungswegen: Optionen vorstellen und Entscheidung abwarten

## 4. Wenn es nicht klappt: STOPP & Neu planen
- Wenn ein Ansatz nicht funktioniert: **Sofort stoppen**, nicht weiter probieren
- Neu planen statt den gleichen Fehler zu wiederholen
- Ursachen finden — keine temporären Workarounds oder Hacks
- Frage dich: "Ist das die elegante Lösung oder ein Quick-Fix?"

## 5. Verifikation: Diff gegen Main vor "Fertig"
- Vor der Fertigmeldung: `git diff main` um sicherzustellen dass alle Änderungen beabsichtigt sind
- Frage dich: "Würde ein Senior Engineer das so abnehmen?"
- Build muss grün sein
- Keine unbeabsichtigten Änderungen in unbeteiligten Dateien

## 6. Design-Dokumentation
Bei Design-Entscheidungen den Prozess dokumentieren:
- Zusammenfassung der finalen Entscheidungen
- Gestellte Fragen mit Optionen und gewählten Antworten
- Begründung für jede Wahl
- Technische Details
- Offene Punkte
