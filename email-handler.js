/**
 * DSGVO-konforme E-Mail-Integration für MaOs Fensterservice
 * Verwendet EmailJS für sichere Formular-Übertragung
 */

class EmailHandler {
    constructor() {
        this.serviceId = null;
        this.templateId = null;
        this.publicKey = null;
        this.initialized = false;
        
        // Initialize EmailJS when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        try {
            // Load EmailJS configuration
            await this.loadEmailJSConfig();
            
            if (this.serviceId && this.templateId && this.publicKey) {
                // Initialize EmailJS
                emailjs.init(this.publicKey);
                this.initialized = true;
                console.log('EmailJS initialized successfully');
            } else {
                console.warn('EmailJS configuration incomplete. Please check EMAILJS_SETUP.md');
            }
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }

    loadEmailJSConfig() {
        return new Promise((resolve) => {
            // These will be set in the HTML file
            this.serviceId = window.EMAILJS_SERVICE_ID || null;
            this.templateId = window.EMAILJS_TEMPLATE_ID || null;
            this.publicKey = window.EMAILJS_PUBLIC_KEY || null;
            resolve();
        });
    }

    async sendEmail(formData) {
        if (!this.initialized) {
            throw new Error('EmailJS not initialized. Please configure your EmailJS settings.');
        }

        try {
            // Prepare template parameters
            const templateParams = {
                // Customer Information
                customer_name: formData.name || 'Nicht angegeben',
                customer_email: formData.email || 'Nicht angegeben',
                customer_phone: formData.phone || 'Nicht angegeben',
                customer_interest: formData.interest || 'Nicht angegeben',
                
                // Calculator Results (if available)
                calculator_original_price: formData.calculatorResults?.originalPrice || 'Nicht berechnet',
                calculator_savings: formData.calculatorResults?.savings || 'Nicht berechnet',
                calculator_spar_price: formData.calculatorResults?.sparPrice || 'Nicht berechnet',
                calculator_amortization: formData.calculatorResults?.amortization || 'Nicht berechnet',
                
                // System Information
                submission_time: new Date().toLocaleString('de-DE'),
                user_agent: navigator.userAgent,
                page_url: window.location.href,
                referrer: document.referrer || 'Direktaufruf',
                
                // Hamburg-specific
                service_area: 'Hamburg & Umgebung',
                business_name: 'MaOs Fensterservice Hamburg',
                
                // Email Recipients (handled by EmailJS template)
                to_email_primary: 'email@nickkrakow.de',
                to_email_secondary: 'info@zoom-internetagentur.com'
            };

            console.log('Sending email with template params:', templateParams);

            // Send email via EmailJS
            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );

            console.log('Email sent successfully:', response);
            return {
                success: true,
                message: 'E-Mail erfolgreich gesendet!',
                response: response
            };

        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Provide user-friendly error messages
            let errorMessage = 'Fehler beim Senden der E-Mail. ';
            
            if (error.status === 400) {
                errorMessage += 'Bitte überprüfen Sie Ihre Eingaben.';
            } else if (error.status === 403) {
                errorMessage += 'Service temporär nicht verfügbar.';
            } else if (error.status === 429) {
                errorMessage += 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.';
            } else {
                errorMessage += 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.';
            }

            return {
                success: false,
                message: errorMessage,
                error: error
            };
        }
    }

    // Get current calculator results if available
    getCalculatorResults() {
        try {
            const originalPriceElement = document.getElementById('originalPrice');
            const sparPriceElement = document.getElementById('sparPrice');
            const savingsElement = document.getElementById('savings');
            const amortizationElement = document.getElementById('amortization');
            
            if (originalPriceElement && originalPriceElement.textContent) {
                return {
                    originalPrice: originalPriceElement.textContent,
                    sparPrice: sparPriceElement?.textContent || '',
                    savings: savingsElement?.textContent || '',
                    amortization: amortizationElement?.textContent || ''
                };
            }
            return null;
        } catch (error) {
            console.warn('Could not get calculator results:', error);
            return null;
        }
    }

    // Validate form data before sending
    validateFormData(formData) {
        const errors = [];

        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Name muss mindestens 2 Zeichen haben');
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.push('Gültige E-Mail-Adresse erforderlich');
        }

        if (!formData.phone || formData.phone.trim().length < 5) {
            errors.push('Telefonnummer muss mindestens 5 Zeichen haben');
        }

        if (!formData.interest) {
            errors.push('Bitte wählen Sie Ihr Interesse aus');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show user feedback
    showFeedback(isSuccess, message) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.email-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `email-feedback p-4 rounded-lg mt-4 ${
            isSuccess 
                ? 'bg-green-100 border border-green-300 text-green-800' 
                : 'bg-red-100 border border-red-300 text-red-800'
        }`;
        
        feedback.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        // Insert after the form
        const form = document.getElementById('leadForm');
        form.parentNode.insertBefore(feedback, form.nextSibling);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 5000);
    }
}

// Initialize EmailHandler
const emailHandler = new EmailHandler();

// Enhanced form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        // Remove old event listener if exists
        leadForm.removeEventListener('submit', window.originalFormHandler);
        
        // Add new enhanced handler
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Add calculator results if available
            data.calculatorResults = emailHandler.getCalculatorResults();
            
            // Validate form data
            const validation = emailHandler.validateFormData(data);
            if (!validation.isValid) {
                emailHandler.showFeedback(false, validation.errors.join(', '));
                return;
            }
            
            // Get submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            try {
                // Show loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
                submitButton.disabled = true;
                
                // Send email
                const result = await emailHandler.sendEmail(data);
                
                if (result.success) {
                    // Success feedback
                    submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Erfolgreich gesendet!';
                    submitButton.className = submitButton.className.replace(
                        'bg-yellow-500 hover:bg-yellow-400', 
                        'bg-green-500'
                    );
                    
                    emailHandler.showFeedback(true, 
                        'Ihre Anfrage wurde erfolgreich gesendet! Wir melden uns schnellstmöglich bei Ihnen.'
                    );
                    
                    // Reset form after delay
                    setTimeout(() => {
                        this.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.className = submitButton.className.replace(
                            'bg-green-500', 
                            'bg-yellow-500 hover:bg-yellow-400'
                        );
                        submitButton.disabled = false;
                    }, 3000);
                    
                } else {
                    // Error feedback
                    submitButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Fehler aufgetreten';
                    submitButton.className = submitButton.className.replace(
                        'bg-yellow-500 hover:bg-yellow-400', 
                        'bg-red-500'
                    );
                    
                    emailHandler.showFeedback(false, result.message);
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.className = submitButton.className.replace(
                            'bg-red-500', 
                            'bg-yellow-500 hover:bg-yellow-400'
                        );
                        submitButton.disabled = false;
                    }, 3000);
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Fehler aufgetreten';
                submitButton.className = submitButton.className.replace(
                    'bg-yellow-500 hover:bg-yellow-400', 
                    'bg-red-500'
                );
                
                emailHandler.showFeedback(false, 
                    'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktieren Sie uns telefonisch unter +49 162 2622986.'
                );
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.className = submitButton.className.replace(
                        'bg-red-500', 
                        'bg-yellow-500 hover:bg-yellow-400'
                    );
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
});

// Global access for debugging
window.emailHandler = emailHandler;