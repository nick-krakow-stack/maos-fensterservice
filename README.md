# MaOs Fensterservice Hamburg - Landing Page

Eine professionelle Landing Page für MaOs Fensterservice Hamburg mit der innovativen 85%-Spar-Regel.

## 🌟 Features

- **Responsive Design**: Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **85%-Spar-Rechner**: Interaktiver Kostenrechner für Fenster-Ersparnis
- **Lead-Formular**: Kontaktformular für Kundenanfragen
- **Social Proof**: Kundenbewertungen und Erfolgsgeschichten
- **Hamburg-Fokus**: Speziell für den Hamburger Markt optimiert
- **SEO-optimiert**: Meta-Tags und strukturierte Daten

## 🛠️ Technologie

- **HTML5**: Semantisches Markup
- **Tailwind CSS**: Utility-first CSS Framework (CDN)
- **Font Awesome**: Icons (CDN)
- **Google Fonts**: Inter Font Familie
- **Vanilla JavaScript**: Interaktive Funktionen

## 🎨 Design

### Farbschema
- **Hamburg Blue**: `#0F4C81` - Hauptfarbe für Hamburg-Bezug
- **MaOs Blue**: `#1E40AF` - Primäre Akzentfarbe
- **MaOs Green**: `#059669` - Erfolg und Ersparnis
- **MaOs Orange**: `#EA580C` - Call-to-Action
- **MaOs Red**: `#DC2626` - Aufmerksamkeit und Warnung

### Typografie
- **Primary**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Installation & Setup

1. **Repository klonen**:
   ```bash
   git clone <repository-url>
   cd maos-fensterservice-hamburg
   ```

2. **Lokal testen**:
   ```bash
   # Einfacher HTTP Server mit Python
   python3 -m http.server 8000
   
   # Oder mit Node.js (wenn installiert)
   npx serve .
   ```

3. **Browser öffnen**:
   ```
   http://localhost:8000
   ```

## 🚀 Deployment

### GitHub Pages
1. Repository auf GitHub pushen
2. In Repository Settings > Pages
3. Source: "Deploy from a branch"
4. Branch: "main" auswählen
5. Folder: "/ (root)" auswählen

### Netlify
1. Drag & Drop der Dateien in Netlify Dashboard
2. Oder GitHub Repository verbinden

### Vercel
```bash
npx vercel
```

## 📋 Funktionen

### 85%-Spar-Rechner
- Eingabe: Geschätzte Kosten für neue Fenster
- Berechnung: 85% Ersparnis mit MaOs Service
- Ausgabe: Ersparnis und Amortisationszeit

### Lead-Formular
- Name, E-Mail, Telefon (Pflichtfelder)
- Interesse-Auswahl (Dropdown)
- Form-Validation
- Success-Animation

### Interaktive Elemente
- Smooth Scrolling zu Rechner-Sektion
- Hover-Effekte auf Buttons
- Form-Feedback
- Responsive Navigation

## 🎯 Conversion-Optimierung

### Call-to-Actions
1. **Hero-Button**: "Kostenlosen 85%-Rechner starten"
2. **Form-Button**: "Kostenlosen Hamburg-Termin sichern"
3. **Final-CTA**: "JETZT 85%-Check starten"

### Trust-Signale
- Kundenbewertungen mit 5-Sterne-Rating
- Hamburger Ortsbezug
- Erfolgsgarantien
- Ehrlichkeits-Versprechen

### Social Proof
- 3 detaillierte Kundenstories
- Spezifische Sparbeträge
- Hamburg-Stadtteile als Referenz
- Über 200 zufriedene Kunden

## 📊 Analytics Integration

Für spätere Integration vorbereitet:
- Google Analytics 4
- Facebook Pixel
- Google Tag Manager

## 🔍 SEO-Features

- **Title**: Keyword-optimiert für Hamburg
- **Meta Description**: 160 Zeichen, lokale Keywords
- **Structured Data**: Bereit für Schema.org
- **Alt-Tags**: Für zukünftige Bilder
- **Internal Linking**: Smooth Scrolling Navigation

## 🛡️ Datenschutz

- **DSGVO-konform**: Keine Cookies ohne Zustimmung
- **Kontaktdaten**: Verschlüsselte E-Mail-Darstellung
- **Form-Daten**: Frontend-only (Backend-Integration erforderlich)

## 🔧 Anpassungen

### Farben ändern
Tailwind CSS Konfiguration in `<script>` Tag:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'maos-blue': '#1E40AF',    // Hier anpassen
                'hamburg-blue': '#0F4C81'  // Hier anpassen
            }
        }
    }
}
```

### Kontaktdaten aktualisieren
In Footer-Sektion:
- Telefonnummer
- E-Mail-Adresse
- Adresse/Gebiet

### Kundenbewertungen
In "Social Proof Section":
- Namen und Initialen
- Stadtteile
- Sparbeträge
- Bewertungstexte

## 📧 E-Mail Integration Setup

Das Kontaktformular ist bereits vollständig konfiguriert und sendet automatisch E-Mails an:
- **email@nickkrakow.de**  
- **info@zoom-internetagentur.com**

### Schnellstart (5 Minuten):
1. Erstellen Sie einen [EmailJS Account](https://www.emailjs.com/) (kostenlos)
2. Folgen Sie der detaillierten Anleitung in `EMAILJS_SETUP.md`
3. Tragen Sie die 3 IDs in `index.html` ein (Zeile ~615)
4. Fertig! Formulare werden automatisch weitergeleitet

### E-Mail Features:
- ✅ DSGVO-konforme Übertragung
- ✅ 85%-Rechner Ergebnisse inklusive
- ✅ Professionelle HTML-Templates
- ✅ Automatische Validierung
- ✅ Benutzerfreundliche Fehlermeldungen

## 🔐 DSGVO & Legal

### Bereits implementiert:
- ✅ Cookie Consent Banner (granulare Kontrolle)
- ✅ Impressum (§5 TMG konform)
- ✅ Datenschutzerklärung (Art. 13 DSGVO)
- ✅ Google Analytics Integration (datenschutzkonform)
- ✅ EmailJS Integration (EU-Server, verschlüsselt)

### Setup-Anleitungen:
- **Google Analytics**: Siehe `GOOGLE_ANALYTICS_SETUP.md`
- **EmailJS Formular**: Siehe `EMAILJS_SETUP.md`
- **Cookie System**: Automatisch aktiv, keine Konfiguration nötig

## 📞 Kontakt

**MaOs Fensterservice Hamburg**
- **Telefon**: +49 162 2622986
- **E-Mail**: info@maos-fensterservice.de
- **Gebiet**: Hamburg & Umgebung
- **Inhaber**: Marcus Knittel

## 📝 Lizenz

Alle Rechte vorbehalten - MaOs Fensterservice Hamburg 2024

---

*Diese Landing Page wurde speziell für die Hamburger Zielgruppe entwickelt und fokussiert sich auf lokale Trust-Signale und die einzigartige 85%-Spar-Regel.*