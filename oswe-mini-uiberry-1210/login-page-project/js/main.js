class PasswordToggle {
  constructor(wrapperSelector) {
    this.wrapper = document.querySelector(wrapperSelector);
    if (!this.wrapper) return;

    this.input = this.wrapper.querySelector('input');
    this.button = this.wrapper.querySelector('.password-toggle');
    this.iconOpen = this.button.querySelector('.icon-open');
    this.iconClosed = this.button.querySelector('.icon-closed');

    this._bindEvents();
  }

  _bindEvents() {
    this.button.addEventListener('click', () => this.toggleVisibility());
    // allow toggling via keyboard when focused
    this.button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleVisibility();
      }
    });
  }

  toggleVisibility() {
    if (!this.input) return;

    const isPassword = this.input.type === 'password';
    if (isPassword) {
      this.input.type = 'text';
      this.wrapper.classList.add('show-password');
      this.button.setAttribute('title', 'Hide password');
      this.button.setAttribute('aria-pressed', 'true');
    } else {
      this.input.type = 'password';
      this.wrapper.classList.remove('show-password');
      this.button.setAttribute('title', 'Show password');
      this.button.setAttribute('aria-pressed', 'false');
    }

    // add a small focus back to input for convenience
    this.input.focus({ preventScroll: true });
  }
}

class LoginFormHandler {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.button = this.form.querySelector('#login-btn');
    this.btnText = this.button.querySelector('.btn-text');
    this.spinner = this.button.querySelector('.loading-spinner');
    this.isSubmitting = false;

    this._bindEvents();
  }

  _bindEvents() {
    this.form.addEventListener('submit', (e) => this._onSubmit(e));
  }

  setSubmittingState(isSubmitting) {
    this.isSubmitting = isSubmitting;
    if (isSubmitting) {
      this.button.classList.add('loading');
      this.button.setAttribute('disabled', 'disabled');
      this.button.setAttribute('aria-disabled', 'true');
      this.btnText.textContent = 'Logging in...';
    } else {
      this.button.classList.remove('loading');
      this.button.removeAttribute('disabled');
      this.button.setAttribute('aria-disabled', 'false');
      this.btnText.textContent = 'Login';
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting) {
      // duplicate submission prevented
      return;
    }

    const formData = new FormData(this.form);
    const email = (formData.get('email') || '').toString();

    // mark submitting immediately to avoid duplicate requests
    this.setSubmittingState(true);

    console.log('Sending login request for', email);

    // Simulate API request (2s)
    setTimeout(() => {
      const success = /success/i.test(email);
      if (success) {
        console.log('Login successful for', email);
        // In a real app, redirect or show a success state
      } else {
        console.log('Login failed for', email);
      }

      // Re-enable after simulated response
      this.setSubmittingState(false);
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize password toggle for the first password wrapper
  new PasswordToggle('.password-wrapper');

  // Initialize login form handler
  new LoginFormHandler('#login-form');
});
