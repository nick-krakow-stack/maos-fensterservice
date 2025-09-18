# Google Analytics 4 Setup - DSGVO-konform

Diese Anleitung zeigt Ihnen, wie Sie Google Analytics 4 datenschutzkonform auf Ihrer MaOs Fensterservice Website einrichten.

## 🚀 Schnellstart (2 Schritte)

### 1. Google Analytics Measurement ID eintragen
Öffnen Sie `index.html` und tragen Sie Ihre Measurement ID ein:
```javascript
// Zeile 604: Ersetzen Sie den Kommentar mit:
window.GA_MEASUREMENT_ID = 'G-IHRE-MEASUREMENT-ID';
```

### 2. Fertig!
Das wars! Das Cookie Consent System übernimmt automatisch:
- ✅ Nutzer-Einwilligung einholen
- ✅ Google Analytics nur bei Zustimmung laden
- ✅ IP-Anonymisierung aktivieren
- ✅ Personalisierung deaktivieren
- ✅ DSGVO-konforme Einstellungen

## 📊 Google Analytics 4 Konto erstellen

### Schritt 1: Google Analytics Konto
1. Gehen Sie zu [https://analytics.google.com/](https://analytics.google.com/)
2. Klicken Sie auf "Messungen starten"
3. Erstellen Sie ein Konto mit dem Namen: `MaOs Fensterservice Hamburg`

### Schritt 2: Property erstellen
1. **Property-Name**: `MaOs Website Hamburg`
2. **Berichts-Zeitzone**: Deutschland (GMT+01:00)
3. **Währung**: Euro (EUR)
4. **Branche**: Andere
5. **Unternehmensgröße**: Kleinunternehmen (1-10 Mitarbeiter)

### Schritt 3: Datenstream einrichten
1. Plattform: **Web** auswählen
2. **Website-URL**: `https://nick-krakow-stack.github.io/maos-fensterservice/` (oder Ihre Domain)
3. **Stream-Name**: `MaOs Hamburg Website`
4. **Enhanced Measurement**: Deaktivieren für mehr Datenschutz

### Schritt 4: Measurement ID kopieren
- Die ID sieht aus wie: `G-ABC123DEF4`
- Diese tragen Sie in `index.html` ein

## 🔧 Erweiterte Konfiguration

### Datenschutz-Einstellungen in Google Analytics
1. Gehen Sie zu **Verwaltung** → **Property** → **Dateneinstellungen** → **Datenaufbewahrung**
2. Stellen Sie ein: **2 Monate** (statt 14 Monate)
3. Aktivieren Sie: **Automatisches Löschen**

### Google Consent Mode V2 (Optional)
Falls Sie zusätzliche Compliance benötigen, ist das System bereits vorbereitet:

```javascript
// Wird automatisch vom Cookie Consent System gesetzt:
gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
});
```

## 📋 DSGVO-Compliance Checkliste

### ✅ Bereits implementiert:
- [x] Cookie Consent Banner mit Opt-in
- [x] IP-Anonymisierung aktiviert (`anonymize_ip: true`)
- [x] Personalisierung deaktiviert (`allow_ad_personalization_signals: false`)
- [x] Google Signals deaktiviert (`allow_google_signals: false`)
- [x] Secure Cookies (`cookie_flags: 'SameSite=None;Secure'`)
- [x] Granulare Cookie-Kontrolle (Essential/Analytics/Marketing)
- [x] Widerrufs-Option für Nutzer
- [x] Datenschutzerklärung mit Google Analytics Erwähnung

### 🔄 Noch zu erledigen:
- [ ] Google Analytics Measurement ID eintragen
- [ ] Auftragsverarbeitungsvertrag mit Google abschließen
- [ ] Datenschutz-Folgenabschätzung (bei Bedarf)

## 🎯 Auftragsverarbeitungsvertrag (AVV)

Nach der Einrichtung müssen Sie einen AVV mit Google abschließen:

1. Gehen Sie zu [Google Analytics → Verwaltung → Kontoeinstellungen](https://analytics.google.com/)
2. Klicken Sie auf **Datenverarbeitungsbedingungen**
3. Akzeptieren Sie die **Google Ads-Datenverarbeitungsbedingungen**
4. Laden Sie die Vereinbarung herunter und archivieren Sie sie

## 📊 Was wird gemessen?

Mit den datenschutzkonformen Einstellungen erfassen wir:

### ✅ Anonyme Daten:
- Seitenaufrufe (anonymisiert)
- Verweildauer
- Absprungrate
- Gerätetyp (ohne Identifikation)
- Browser (ohne Identifikation)
- Geografische Region (Stadt-Ebene)

### ❌ Nicht erfasst:
- Persönliche Identifikatoren
- Genaue IP-Adressen
- Cross-Site-Tracking
- Personalisierte Werbedaten
- E-Mail-Adressen oder Namen

## 🔍 Testing & Validation

### Testen Sie die Implementierung:

1. **Cookie Consent testen**:
   - Öffnen Sie die Website im Inkognito-Modus
   - Cookie Banner sollte erscheinen
   - Wählen Sie "Nur Notwendige" → GA sollte nicht laden
   - Wählen Sie "Alle akzeptieren" → GA sollte laden

2. **Google Analytics Real-Time testen**:
   - Gehen Sie zu GA → Berichte → Echtzeit
   - Navigieren Sie auf der Website
   - Aktivität sollte in Echtzeit erscheinen (nur bei Zustimmung)

3. **Cookie-Einstellungen testen**:
   - Klicken Sie auf Cookie-Symbol (rechts unten)
   - Ändern Sie Einstellungen
   - GA sollte entsprechend aktiviert/deaktiviert werden

## 📱 Mobile & Performance

Die Implementierung ist bereits optimiert für:
- **Mobile Geräte**: Responsive Cookie Banner
- **Performance**: Lazy Loading von GA Scripts
- **UX**: Non-blocking Cookie Consent
- **Accessibility**: Keyboard Navigation möglich

## ⚡ Troubleshooting

### Google Analytics lädt nicht:
1. Prüfen Sie die Measurement ID in `index.html`
2. Öffnen Sie Browser Developer Tools → Console
3. Schauen Sie nach Fehlermeldungen
4. Prüfen Sie, ob Sie Analytics-Cookies zugestimmt haben

### Cookie Banner erscheint nicht:
1. Löschen Sie alle Cookies der Website
2. Laden Sie die Seite neu
3. Prüfen Sie Browser Console auf JavaScript-Fehler

### DSGVO-Compliance Fragen:
- Kontaktieren Sie einen Datenschutz-Anwalt
- Nutzen Sie Tools wie [Datenschutz-Generator](https://www.e-recht24.de/)
- Prüfen Sie regelmäßig die Google Analytics Compliance-Updates

## 📞 Support

Bei Fragen zur Implementation:
- **E-Mail**: Entwickler-Support über GitHub Issues
- **Dokumentation**: Siehe Cookie-Consent.js Kommentare
- **Testing**: Nutzen Sie Browser Developer Tools

---

**Hinweis**: Diese Anleitung wurde für die deutsche DSGVO erstellt. Bei internationalen Kunden können zusätzliche Compliance-Maßnahmen erforderlich sein.