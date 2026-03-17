# Code-Standards

## Sicherheit zuerst
- Niemals Secrets, API-Keys oder Zugangsdaten committen
- Alle externen Eingaben validieren
- Parameterisierte Queries für Datenbanken verwenden
- OWASP Top 10 Richtlinien befolgen

## Code-Qualität
- Selbstdokumentierenden Code mit klarer Benennung schreiben
- Funktionen fokussiert halten (Single Responsibility)
- Komposition statt Vererbung bevorzugen
- Fehler explizit behandeln — keine stillen Catches

## Tests
- Tests für neue Features und Bugfixes schreiben
- Edge Cases und Fehlerpfade testen
- Nicht mocken was dir nicht gehört — wenn möglich Integrationstests verwenden

## Internationalisierung (falls zutreffend)
- Keine hardcodierten User-facing Strings
- Die i18n-Lösung des Projekts konsistent verwenden
- Übersetzungsdateien über alle Sprachen synchron halten
