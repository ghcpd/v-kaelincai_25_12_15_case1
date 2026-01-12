const EYE_OPEN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
const EYE_CLOSED_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

class PasswordToggle {
  constructor(wrapper) {
    this.wrapper = wrapper instanceof Element ? wrapper : document.querySelector(wrapper);
    if (!this.wrapper) return;
    this.input = this.wrapper.querySelector('input[type="password"], input[type="text"]');
    this.button = this.wrapper.querySelector('.password-toggle');
    this.visible = false;
    this._bind();
  }

  _bind() {
    if (!this.button || !this.input) return;
    this.button.addEventListener('click', () => this.toggleVisibility());
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.input.type = this.visible ? 'text' : 'password';
    this.button.setAttribute('aria-pressed', String(this.visible));
    this.button.setAttribute('aria-label', this.visible ? 'Hide password' : 'Show password');
    this.button.innerHTML = this.visible ? EYE_CLOSED_SVG : EYE_OPEN_SVG;
  }
}

class LoginFormHandler {
  constructor(form) {
    this.form = form instanceof HTMLFormElement ? form : document.querySelector(form);
    if (!this.form) return;
    this.email = this.form.querySelector('#email');
    this.password = this.form.querySelector('#password');
    this.button = this.form.querySelector('.btn-login');
    this.btnText = this.form.querySelector('.btn-text');
    this.spinner = this.form.querySelector('.loading-spinner');
    this.isSubmitting = false;
    this._bind();
  }

  _bind() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  setSubmittingState(state) {
    this.isSubmitting = Boolean(state);
    if (this.button) {
      this.button.disabled = this.isSubmitting;
      if (this.isSubmitting) {
        this.button.classList.add('loading');
        this.btnText.textContent = 'Logging in...';
      } else {
        this.button.classList.remove('loading');
        this.btnText.textContent = 'Login';
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isSubmitting) return;
    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.setSubmittingState(true);
    const emailVal = this.email.value || '';

    console.log('Login request initiated for', emailVal);

    // Simulate API request (2s)
    setTimeout(() => {
      const success = emailVal.toLowerCase().includes('success');
      if (success) {
        console.log('Login successful for', emailVal);
      } else {
        console.error('Login failed for', emailVal);
      }
      this.setSubmittingState(false);
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PasswordToggle('.password-wrapper');
  new LoginFormHandler('#login-form');
});