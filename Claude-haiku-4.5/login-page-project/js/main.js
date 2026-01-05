/* ============================================
   LOGIN PAGE JAVASCRIPT
   ============================================ */

/**
 * PasswordToggle Class
 * Handles password visibility toggle functionality (ISSUE #1)
 */
class PasswordToggle {
    constructor(toggleButtonId, passwordInputId) {
        this.toggleButton = document.getElementById(toggleButtonId);
        this.passwordInput = document.getElementById(passwordInputId);
        this.eyeOpenIcon = this.toggleButton.querySelector('.eye-open');
        this.eyeClosedIcon = this.toggleButton.querySelector('.eye-closed');
        this.isPasswordVisible = false;

        this.initialize();
    }

    initialize() {
        this.toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleVisibility();
        });
    }

    /**
     * Toggle password visibility between shown and hidden states
     */
    toggleVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;

        if (this.isPasswordVisible) {
            // Show password
            this.passwordInput.type = 'text';
            this.eyeOpenIcon.style.display = 'none';
            this.eyeClosedIcon.style.display = 'block';
        } else {
            // Hide password
            this.passwordInput.type = 'password';
            this.eyeOpenIcon.style.display = 'block';
            this.eyeClosedIcon.style.display = 'none';
        }
    }
}

/**
 * LoginFormHandler Class
 * Handles form submission and prevents duplicate submissions (ISSUE #2)
 */
class LoginFormHandler {
    constructor(formId, loginBtnId) {
        this.form = document.getElementById(formId);
        this.loginBtn = document.getElementById(loginBtnId);
        this.btnText = this.loginBtn.querySelector('.btn-text');
        this.loadingSpinner = this.loginBtn.querySelector('.loading-spinner');
        this.loginMessage = document.getElementById('loginMessage');
        this.isSubmitting = false;

        this.initialize();
    }

    initialize() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Handle form submission with duplicate prevention
     */
    handleSubmit(e) {
        e.preventDefault();

        // ISSUE #2 FIX: Prevent duplicate submissions
        if (this.isSubmitting) {
            return;
        }

        // Set submitting state
        this.setSubmittingState(true);

        // Get form data
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Simulate API call (2 second delay)
        this.simulateApiCall(email, password);
    }

    /**
     * Simulate API call with success/error response
     */
    simulateApiCall(email, password) {
        console.log('Login attempt:', { email, timestamp: new Date().toISOString() });

        // Simulate network delay
        setTimeout(() => {
            this.handleLoginResponse(email);
        }, 2000);
    }

    /**
     * Handle API response
     */
    handleLoginResponse(email) {
        const isSuccess = email.toLowerCase().includes('success');

        if (isSuccess) {
            this.loginMessage.textContent = `Login successful! Welcome, ${email}`;
            this.loginMessage.className = 'login-message success';
            console.log('Login successful');
        } else {
            this.loginMessage.textContent = 'Login failed. Please check your credentials.';
            this.loginMessage.className = 'login-message error';
            console.log('Login failed');
        }

        // Reset submitting state after response
        this.setSubmittingState(false);
    }

    /**
     * Set button submitting state with visual feedback
     */
    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;

        if (isSubmitting) {
            // Show loading state
            this.loginBtn.disabled = true;
            this.btnText.textContent = 'Logging in...';
            this.loadingSpinner.style.display = 'flex';
            this.loginMessage.textContent = '';
        } else {
            // Reset to normal state
            this.loginBtn.disabled = false;
            this.btnText.textContent = 'Login';
            this.loadingSpinner.style.display = 'none';
        }
    }
}

/**
 * Initialize components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize password toggle (ISSUE #1)
    const passwordToggle = new PasswordToggle('passwordToggle', 'password');

    // Initialize login form handler (ISSUE #2)
    const loginFormHandler = new LoginFormHandler('loginForm', 'loginBtn');

    console.log('Login page initialized successfully');
});
