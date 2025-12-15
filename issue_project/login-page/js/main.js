/**
 * Login Page - Main JavaScript Module
 * 
 * KNOWN ISSUES:
 * 1. Missing password visibility toggle functionality
 * 2. Login button can be clicked multiple times (no duplicate prevention)
 * 
 * This module currently handles:
 * - Form validation
 * - Login submission (with issues)
 * - API request simulation
 */

// ==========================================
// Form Validation Module
// ==========================================

class FormValidator {
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.minPasswordLength = 6;
    }

    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {Object} - { valid: boolean, message: string }
     */
    validateEmail(email) {
        if (!email || email.trim() === '') {
            return { valid: false, message: 'Email is required' };
        }

        if (!this.emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        return { valid: true, message: '' };
    }

    /**
     * Validate password
     * @param {string} password - Password to validate
     * @returns {Object} - { valid: boolean, message: string }
     */
    validatePassword(password) {
        if (!password || password.trim() === '') {
            return { valid: false, message: 'Password is required' };
        }

        if (password.length < this.minPasswordLength) {
            return { 
                valid: false, 
                message: `Password must be at least ${this.minPasswordLength} characters` 
            };
        }

        return { valid: true, message: '' };
    }

    /**
     * Display error message for a specific field
     * @param {string} fieldId - ID of the field
     * @param {string} message - Error message to display
     */
    showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            if (message) {
                inputElement.classList.add('error');
            } else {
                inputElement.classList.remove('error');
            }
        }
    }

    /**
     * Clear all error messages
     */
    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-input');
        
        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => el.classList.remove('error'));
        
        const formError = document.getElementById('formError');
        if (formError) {
            formError.classList.add('hidden');
            formError.textContent = '';
        }
    }

    /**
     * Show general form error
     * @param {string} message - Error message to display
     */
    showFormError(message) {
        const formError = document.getElementById('formError');
        if (formError) {
            formError.textContent = message;
            formError.classList.remove('hidden');
        }
    }
}

// ==========================================
// Login Form Handler Module
// ==========================================

class LoginFormHandler {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.loginButton = document.getElementById('loginButton');
        this.validator = new FormValidator();
        
        this.init();
    }

    init() {
        if (!this.form || !this.loginButton) {
            console.error('Form elements not found');
            return;
        }

        // Add form submit event listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        this.addRealTimeValidation();
    }

    /**
     * Add real-time validation on input blur
     */
    addRealTimeValidation() {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                const result = this.validator.validateEmail(emailInput.value);
                if (!result.valid) {
                    this.validator.showError('email', result.message);
                } else {
                    this.validator.showError('email', '');
                }
            });

            // Clear error on input
            emailInput.addEventListener('input', () => {
                this.validator.showError('email', '');
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', () => {
                const result = this.validator.validatePassword(passwordInput.value);
                if (!result.valid) {
                    this.validator.showError('password', result.message);
                } else {
                    this.validator.showError('password', '');
                }
            });

            // Clear error on input
            passwordInput.addEventListener('input', () => {
                this.validator.showError('password', '');
            });
        }
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        // Prevent duplicate submissions
        if (this.isSubmitting) {
            console.log('Form submission already in progress');
            return;
        }

        // Clear previous errors
        this.validator.clearErrors();

        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate inputs
        const emailValidation = this.validator.validateEmail(email);
        const passwordValidation = this.validator.validatePassword(password);

        // Show validation errors if any
        if (!emailValidation.valid) {
            this.validator.showError('email', emailValidation.message);
        }

        if (!passwordValidation.valid) {
            this.validator.showError('password', passwordValidation.message);
        }

        // Stop if validation failed
        if (!emailValidation.valid || !passwordValidation.valid) {
            return;
        }

        // Start submission process
        this.setSubmittingState(true);

       
     * ISSUE: No duplicate submission prevention!
     * The button can be clicked multiple times.
     */
    async handleSubmit(e) {
        e.preventDefault();   }
        } catch (error) {
            this.handleLoginError('Network error. Please try again.');
        } finally {
            // Reset button state after completion
            this.setSubmittingState(false);
        }
    }

    /**
     * Set button state during submission
     * @param {boolean} isSubmitting - Whether form is being submitted
     */
    setS// User can click button multiple times
        console.log('Submitting login request...');

        try {
            // Simulate API request (2 seconds)
            const response = await this.simulateLoginRequest(email, password, rememberMe);

            if (response.success) {
                this.handleLoginSuccess(response);
            } else {
                this.handleLoginError(response.message);
            }
        } catch (error) {
            this.handleLoginError('Network error. Please try again.'
                            user: email,
                            token: 'mock-jwt-token-' + Date.now(),
                            rememberMe: rememberMe
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid email or password. Please try again.'
                    });
                }
            }, 2000); // 2 second delay
        });
    }

    /**
     * Handle successful login
     * @param {Object} response - API response
     */
    handleLoginSuccess(response) {
        console.log('Login successful:', response);
        
        // Show success message (in real app, redirect to dashboard)
        this.validator.clearErrors();
        
        // Create success message
        const formError = document.getElementById('formError');
        if (formError) {
            formError.style.background = '#E8F5E9';
            formError.style.color = '#2E7D32';
            formError.style.borderLeftColor = '#2E7D32';
            formError.textContent = '✓ Login successful! Redirecting...';
            formError.classList.remove('hidden');
        }

        // Simulate redirect after 1 second
        setTimeout(() => {
            alert('Login successful! In a real application, you would be redirected to the dashboard.');
            // window.location.href = '/dashboard';
        }, 1000);
    }

    /**
     * Handle login error
     * @param {string} message - Error message
     */
    handleLoginError(message) {
        console.error('Login failed:', message);
        this.validator.showFormError(message);
    }
}

// ==========================================
// Initialize Application
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize password toggle
    new PasswordToggle();

    // Initialize form handler
    new LoginFormHandler();

    console.log('Login page initialized successfully');
});

// ==========================================
// Prevent form resubmission on page reload
// ==========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
form handler
    new LoginFormHandler();

    console.log('Login page initialized (with known issues)