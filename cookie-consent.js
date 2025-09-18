/**
 * DSGVO-konformer Cookie Consent Manager
 * Für MaOs Fensterservice Hamburg
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'maos_cookie_consent';
        this.cookieExpireDays = 365;
        this.consentData = this.getConsentData();
        
        // Initialize after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Show banner if no consent given
        if (!this.hasConsent()) {
            this.showConsentBanner();
        } else {
            // Load accepted services
            this.loadAcceptedServices();
        }

        // Add settings button to page
        this.addSettingsButton();
    }

    hasConsent() {
        return this.consentData !== null;
    }

    getConsentData() {
        const cookie = this.getCookie(this.cookieName);
        return cookie ? JSON.parse(cookie) : null;
    }

    showConsentBanner() {
        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // Smooth slide-in animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3><i class="fas fa-cookie-bite mr-2"></i>Cookies & Datenschutz</h3>
                    <p>Wir nutzen Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten und um unser Angebot zu verbessern. 
                    <strong>Grundlegende Cookies sind für die Funktion der Website erforderlich.</strong> 
                    Analytics-Cookies helfen uns dabei, die Website zu optimieren.</p>
                    <p><a href="datenschutz.html" target="_blank" class="cookie-link">Datenschutzerklärung</a> | 
                    <a href="impressum.html" target="_blank" class="cookie-link">Impressum</a></p>
                </div>
                <div class="cookie-consent-actions">
                    <button type="button" class="cookie-btn cookie-btn-settings" onclick="cookieConsent.showSettings()">
                        <i class="fas fa-cog mr-2"></i>Einstellungen
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-essential" onclick="cookieConsent.acceptEssential()">
                        <i class="fas fa-shield-alt mr-2"></i>Nur Notwendige
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-accept" onclick="cookieConsent.acceptAll()">
                        <i class="fas fa-check mr-2"></i>Alle akzeptieren
                    </button>
                </div>
            </div>
        `;

        return banner;
    }

    showSettings() {
        const existingModal = document.getElementById('cookie-settings-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = this.createSettingsModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 50);
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-settings-modal';
        
        const currentConsent = this.consentData || { essential: true, analytics: false, marketing: false };
        
        modal.innerHTML = `
            <div class="cookie-settings-backdrop" onclick="cookieConsent.closeSettings()"></div>
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3><i class="fas fa-cog mr-2"></i>Cookie-Einstellungen</h3>
                    <button type="button" class="cookie-close-btn" onclick="cookieConsent.closeSettings()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Notwendige Cookies</h4>
                            <span class="cookie-required">Immer aktiv</span>
                        </div>
                        <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
                        Sie speichern keine persönlich identifizierbaren Informationen.</p>
                        <ul>
                            <li>Cookie-Einstellungen speichern</li>
                            <li>Formular-Validierung</li>
                            <li>Sicherheitsfunktionen</li>
                        </ul>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Analytics-Cookies</h4>
                            <label class="cookie-switch">
                                <input type="checkbox" id="analytics-toggle" ${currentConsent.analytics ? 'checked' : ''}>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                        indem sie Informationen sammeln und Berichte erstellen.</p>
                        <ul>
                            <li>Google Analytics (anonymisiert)</li>
                            <li>Seitenaufrufe und Verweildauer</li>
                            <li>Geräteinformationen (anonymisiert)</li>
                        </ul>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Marketing-Cookies</h4>
                            <label class="cookie-switch">
                                <input type="checkbox" id="marketing-toggle" ${currentConsent.marketing ? 'checked' : ''}>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>Diese Cookies werden verwendet, um Ihnen relevante Werbung und Angebote zu zeigen. 
                        <strong>Derzeit nicht aktiv.</strong></p>
                        <ul>
                            <li>Facebook Pixel (geplant)</li>
                            <li>Google Ads (geplant)</li>
                            <li>Retargeting (geplant)</li>
                        </ul>
                    </div>
                </div>
                
                <div class="cookie-settings-footer">
                    <button type="button" class="cookie-btn cookie-btn-secondary" onclick="cookieConsent.closeSettings()">
                        Abbrechen
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-primary" onclick="cookieConsent.saveSettings()">
                        <i class="fas fa-save mr-2"></i>Einstellungen speichern
                    </button>
                </div>
            </div>
        `;

        return modal;
    }

    acceptAll() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: false, // Marketing noch nicht aktiv
            timestamp: Date.now(),
            version: '1.0'
        };
        
        this.saveConsent(consent);
        this.hideConsentBanner();
        this.loadAcceptedServices();
    }

    acceptEssential() {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        this.saveConsent(consent);
        this.hideConsentBanner();
        this.loadAcceptedServices();
    }

    saveSettings() {
        const analyticsChecked = document.getElementById('analytics-toggle')?.checked || false;
        const marketingChecked = document.getElementById('marketing-toggle')?.checked || false;
        
        const consent = {
            essential: true,
            analytics: analyticsChecked,
            marketing: marketingChecked,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        this.saveConsent(consent);
        this.closeSettings();
        this.hideConsentBanner();
        this.loadAcceptedServices();
    }

    saveConsent(consent) {
        this.consentData = consent;
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpireDays);
    }

    hideConsentBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('hide');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    closeSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    loadAcceptedServices() {
        if (!this.consentData) return;

        // Load Google Analytics if consented
        if (this.consentData.analytics) {
            this.loadGoogleAnalytics();
        }

        // Load Marketing services if consented (currently none)
        if (this.consentData.marketing) {
            // Reserved for future marketing pixels
            console.log('Marketing cookies accepted - ready for implementation');
        }
    }

    loadGoogleAnalytics() {
        // This will be populated when Google Analytics ID is provided
        if (window.GA_MEASUREMENT_ID) {
            // Google Analytics 4 (GA4) with anonymization
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_MEASUREMENT_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${window.GA_MEASUREMENT_ID}', {
                    'anonymize_ip': true,
                    'allow_google_signals': false,
                    'allow_ad_personalization_signals': false,
                    'cookie_flags': 'SameSite=None;Secure'
                });
            `;
            document.head.appendChild(script2);
            
            console.log('Google Analytics loaded with privacy settings');
        }
    }

    addSettingsButton() {
        // Add floating settings button
        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'cookie-settings-btn';
        settingsBtn.className = 'cookie-settings-floating';
        settingsBtn.innerHTML = '<i class="fas fa-cookie-bite"></i>';
        settingsBtn.title = 'Cookie-Einstellungen';
        settingsBtn.onclick = () => this.showSettings();
        
        document.body.appendChild(settingsBtn);
    }

    // Utility methods
    setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Public API for manual consent checking
    hasAnalyticsConsent() {
        return this.consentData?.analytics || false;
    }

    hasMarketingConsent() {
        return this.consentData?.marketing || false;
    }

    revokeConsent() {
        this.setCookie(this.cookieName, '', -1);
        this.consentData = null;
        location.reload();
    }
}

// Initialize Cookie Consent
const cookieConsent = new CookieConsent();

// Global functions for easy integration
window.cookieConsent = cookieConsent;