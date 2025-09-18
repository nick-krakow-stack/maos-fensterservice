# EmailJS Setup - Formular E-Mails konfigurieren

Diese Anleitung zeigt Ihnen, wie Sie EmailJS einrichten, damit Formulare automatisch an **email@nickkrakow.de** und **info@zoom-internetagentur.com** gesendet werden.

## 🚀 Schnellstart (5 Minuten)

### 1. EmailJS Account erstellen
1. Gehen Sie zu [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klicken Sie auf **"Sign Up"**
3. Erstellen Sie einen Account (kostenlos bis 200 E-Mails/Monat)

### 2. E-Mail Service verbinden
1. Gehen Sie zu **"Email Services"** im Dashboard
2. Klicken Sie **"Add New Service"**
3. Wählen Sie Ihren E-Mail-Provider:
   - **Gmail** (empfohlen für einfache Einrichtung)
   - **Outlook** (für Microsoft-Konten)
   - **Custom SMTP** (für andere Provider)

### 3. Template erstellen
1. Gehen Sie zu **"Email Templates"**
2. Klicken Sie **"Create New Template"**
3. Verwenden Sie diese Vorlage:

```html
Neue Anfrage von MaOs Fensterservice Hamburg Website

=== KUNDENINFORMATIONEN ===
Name: {{customer_name}}
E-Mail: {{customer_email}}
Telefon: {{customer_phone}}
Interesse: {{customer_interest}}

=== 85%-RECHNER ERGEBNISSE ===
Ursprünglicher Fensterpreis: {{calculator_original_price}}
85%-Spar-Preis: {{calculator_spar_price}}
Ersparnis: {{calculator_savings}}
Amortisation: {{calculator_amortization}}

=== SYSTEM-INFORMATIONEN ===
Zeitpunkt: {{submission_time}}
Website-URL: {{page_url}}
Referrer: {{referrer}}
Browser: {{user_agent}}

=== GESCHÄFTSDATEN ===
Servicegebiet: {{service_area}}
Unternehmen: {{business_name}}

---
Diese E-Mail wurde automatisch über das Kontaktformular der MaOs Fensterservice Hamburg Website gesendet.
```

### 4. Template konfigurieren
- **Template Name**: `MaOs Hamburg Formular`
- **Subject**: `Neue Anfrage: {{customer_name}} - {{customer_interest}}`
- **To Email**: Tragen Sie beide E-Mail-Adressen ein:
  - `email@nickkrakow.de`
  - `info@zoom-internetagentur.com`

### 5. IDs in Website eintragen
1. Kopieren Sie aus dem EmailJS Dashboard:
   - **Service ID** (z.B. `service_abc1234`)
   - **Template ID** (z.B. `template_xyz5678`) 
   - **Public Key** (z.B. `user_def9012345`)

2. Öffnen Sie `index.html` und ersetzen Sie in Zeile ~613:
```javascript
window.EMAILJS_SERVICE_ID = 'IHR_SERVICE_ID_HIER';
window.EMAILJS_TEMPLATE_ID = 'IHR_TEMPLATE_ID_HIER';
window.EMAILJS_PUBLIC_KEY = 'IHR_PUBLIC_KEY_HIER';
```

### 6. Fertig!
Das wars! Die Website sendet jetzt automatisch E-Mails an beide Adressen.

---

## 📋 Detaillierte Anleitung

### Gmail Service Setup

#### Schritt 1: Gmail Service hinzufügen
1. EmailJS Dashboard → **"Email Services"** → **"Add New Service"**
2. Wählen Sie **"Gmail"**
3. Klicken Sie **"Connect Account"**
4. Autorisieren Sie EmailJS für Ihr Gmail-Konto
5. **Service ID** notieren (z.B. `service_gmail123`)

#### Schritt 2: Service-Einstellungen
- **Service Name**: `MaOs Hamburg Gmail`
- **From Name**: `MaOs Fensterservice Hamburg`
- **From Email**: Ihre Gmail-Adresse
- **Reply To**: `{{customer_email}}` (automatisch Kunden-E-Mail)

### E-Mail Template Details

#### Template Variablen
Alle diese Variablen werden automatisch vom System gefüllt:

| Variable | Beschreibung | Beispiel |
|----------|-------------|----------|
| `{{customer_name}}` | Name aus Formular | "Max Mustermann" |
| `{{customer_email}}` | E-Mail aus Formular | "max@example.com" |
| `{{customer_phone}}` | Telefon aus Formular | "+49 162 1234567" |
| `{{customer_interest}}` | Ausgewähltes Interesse | "85%-Spar-Check für meine Fenster" |
| `{{calculator_original_price}}` | Ursprungspreis Rechner | "18.000€" |
| `{{calculator_spar_price}}` | 85%-Preis | "2.700€" |
| `{{calculator_savings}}` | Ersparnis | "15.300€" |
| `{{calculator_amortization}}` | Amortisationszeit | "3.9 Jahren" |
| `{{submission_time}}` | Deutsche Zeit/Datum | "18.09.2024, 14:30:25" |
| `{{page_url}}` | Aktuelle Seiten-URL | "https://..." |
| `{{referrer}}` | Herkunftsseite | "https://google.com" |
| `{{user_agent}}` | Browser-Info | "Mozilla/5.0..." |

#### Erweiterte Template-Features

**HTML Template** (für bessere Formatierung):
```html
<h2>🏠 Neue Anfrage - MaOs Fensterservice Hamburg</h2>

<div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 10px 0;">
    <h3>👤 Kundeninformationen</h3>
    <p><strong>Name:</strong> {{customer_name}}</p>
    <p><strong>E-Mail:</strong> <a href="mailto:{{customer_email}}">{{customer_email}}</a></p>
    <p><strong>Telefon:</strong> <a href="tel:{{customer_phone}}">{{customer_phone}}</a></p>
    <p><strong>Interesse:</strong> {{customer_interest}}</p>
</div>

<div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; margin: 10px 0;">
    <h3>💰 85%-Rechner Ergebnisse</h3>
    <p><strong>Ursprünglicher Preis:</strong> {{calculator_original_price}}</p>
    <p><strong>MaOs 85%-Preis:</strong> {{calculator_spar_price}}</p>
    <p><strong>💚 Ersparnis:</strong> {{calculator_savings}}</p>
    <p><strong>⏰ Amortisation:</strong> {{calculator_amortization}}</p>
</div>

<div style="background-color: #fafafa; padding: 10px; border-radius: 5px; margin: 10px 0; font-size: 12px; color: #666;">
    <p><strong>Zeitpunkt:</strong> {{submission_time}}</p>
    <p><strong>Website:</strong> <a href="{{page_url}}">{{page_url}}</a></p>
</div>

<hr style="margin: 20px 0;">
<p style="font-size: 12px; color: #888;">
    Diese E-Mail wurde automatisch über das Kontaktformular der MaOs Website gesendet.
</p>
```

### SMTP Service Setup (Alternative)

Falls Sie keinen Gmail-Account verwenden möchten:

#### Schritt 1: Custom SMTP Service
1. EmailJS Dashboard → **"Email Services"** → **"Add New Service"**
2. Wählen Sie **"Custom SMTP"**

#### Schritt 2: SMTP Konfiguration
Beispiel für häufige Provider:

**Strato/1&1:**
```
SMTP Server: smtp.strato.de
Port: 465 (SSL) oder 587 (TLS)
Username: Ihre E-Mail-Adresse
Password: Ihr E-Mail-Passwort
```

**Gmail (SMTP):**
```
SMTP Server: smtp.gmail.com
Port: 587
Username: Ihre Gmail-Adresse
Password: App-Passwort (nicht Ihr normales Passwort!)
```

**Outlook/Hotmail:**
```
SMTP Server: smtp-mail.outlook.com
Port: 587
Username: Ihre Outlook-Adresse
Password: Ihr Outlook-Passwort
```

### Mehrere Empfänger konfigurieren

Um E-Mails an beide Adressen zu senden:

#### Methode 1: Multiple Templates
1. Erstellen Sie 2 identische Templates
2. Template 1: `To Email` = `email@nickkrakow.de`
3. Template 2: `To Email` = `info@zoom-internetagentur.com`
4. Code sendet an beide Templates

#### Methode 2: BCC/CC im Template (Empfohlen)
1. Ein Template verwenden
2. **To Email**: `email@nickkrakow.de`
3. **BCC**: `info@zoom-internetagentur.com`
4. Beide erhalten die E-Mail, sehen aber nur eine Adresse

### Fehlerbehandlung & Testing

#### Häufige Fehler

**"Failed to send email" Fehler:**
- Prüfen Sie Service ID, Template ID und Public Key
- Kontrollieren Sie Template-Syntax
- Prüfen Sie E-Mail-Service Autorisierung

**"Template not found" Fehler:**
- Template ID in `index.html` falsch
- Template nicht veröffentlicht/aktiviert

**"Service not available" Fehler:**
- Service ID falsch
- E-Mail-Service nicht richtig konfiguriert
- Gmail/SMTP Autorisierung abgelaufen

#### Testing Checkliste

1. **EmailJS Dashboard Test:**
   - Gehen Sie zu Template → "Test"
   - Senden Sie Test-E-Mail
   - Prüfen Sie Empfang in beiden Postfächern

2. **Website Test:**
   - Öffnen Sie Website im Inkognito-Modus
   - Füllen Sie Formular aus (Testdaten)
   - Verwenden Sie 85%-Rechner
   - Senden Sie Formular ab
   - Prüfen Sie beide E-Mail-Postfächer

3. **Browser Console:**
   - Öffnen Sie Developer Tools (F12)
   - Schauen Sie auf Fehler-Meldungen
   - Prüfen Sie Network-Tab für HTTP-Errors

### Kostenlose Limits & Upgrades

#### Kostenlose Limits:
- **200 E-Mails/Monat**
- **Alle Features verfügbar**
- **DSGVO-konform**

#### Wenn Sie mehr brauchen:
- **Personal Plan**: $15/Monat für 1.000 E-Mails
- **Team Plan**: $30/Monat für 5.000 E-Mails

### DSGVO & Datenschutz

EmailJS ist bereits DSGVO-konform konfiguriert:

#### ✅ Erfüllt:
- EU-Server Standorte
- Verschlüsselte Datenübertragung
- Keine permanente Datenspeicherung
- Minimal notwendige Datenübertragung
- Nutzer-Einwilligung durch Formular-Absendung

#### 📋 In Datenschutzerklärung erwähnt:
- Art der verarbeiteten Daten
- Zweck der Verarbeitung
- Empfänger (Ihre beiden E-Mail-Adressen)
- Rechtsgrundlage (Art. 6 DSGVO)

### Support & Troubleshooting

#### EmailJS Support:
- **Dokumentation**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **FAQ**: [https://www.emailjs.com/docs/faq/](https://www.emailjs.com/docs/faq/)

#### Unser Support:
- **GitHub Issues**: Für technische Probleme
- **E-Mail**: Bei Konfigurationsfragen

---

## 🎯 Schnelle Referenz

### Konfiguration in index.html:
```javascript
// Zeile ~613 in index.html ersetzen:
window.EMAILJS_SERVICE_ID = 'service_IHRE_ID';
window.EMAILJS_TEMPLATE_ID = 'template_IHRE_ID';
window.EMAILJS_PUBLIC_KEY = 'user_IHR_KEY';
```

### Template Subject:
```
Neue MaOs Anfrage: {{customer_name}} - {{customer_interest}}
```

### Empfänger E-Mails:
- `email@nickkrakow.de`
- `info@zoom-internetagentur.com`

Nach der Konfiguration funktioniert das Formular vollautomatisch! 🚀