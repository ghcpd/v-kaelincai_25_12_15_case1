// main.js - Login page logic

class PasswordToggle {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.input = wrapper.querySelector('input');
    this.button = wrapper.querySelector('.password-toggle');
    if (!this.input || !this.button) return;

    this.iconOpen = this.button.querySelector('.icon-eye-open');
    this.iconClosed = this.button.querySelector('.icon-eye-closed');

    this.button.addEventListener('click', this.toggleVisibility.bind(this));
  }

  toggleVisibility() {
    const type = this.input.type;
    if (type === 'password') {
      this.input.type = 'text';
      if (this.iconOpen) this.iconOpen.style.display = 'none';
      if (this.iconClosed) this.iconClosed.style.display = 'block';
    } else {
      this.input.type = 'password';
      if (this.iconOpen) this.iconOpen.style.display = 'block';
      if (this.iconClosed) this.iconClosed.style.display = 'none';
    }
  }
}

class LoginFormHandler {
  constructor(form) {
    this.form = form;
    this.isSubmitting = false;
    this.button = form.querySelector('.btn-login');
    this.btnText = this.button.querySelector('.btn-text');
    this.spinner = this.button.querySelector('.loading-spinner');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting) return;

    this.setSubmittingState(true);

    // Simulate API call
    setTimeout(() => {
      // For demonstration: log success or failure based on email
      const email = this.form.querySelector('#email').value;
      if (email && email.includes('success')) {
        console.log('Login success for', email);
      } else {
        console.warn('Login failed for', email);
      }
      this.setSubmittingState(false);
    }, 2000);
  }

  setSubmittingState(isSubmitting) {
    this.isSubmitting = isSubmitting;
    if (isSubmitting) {
      this.button.disabled = true;
      this.btnText.textContent = 'Logging in...';
      this.spinner.style.display = 'inline-block';
    } else {
      this.button.disabled = false;
      this.btnText.textContent = 'Login';
      this.spinner.style.display = 'none';
    }
  }
}

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  const passwordWrapper = document.querySelector('.password-wrapper');
  if (passwordWrapper) new PasswordToggle(passwordWrapper);

  const loginForm = document.querySelector('#login-form');
  if (loginForm) new LoginFormHandler(loginForm);
});
