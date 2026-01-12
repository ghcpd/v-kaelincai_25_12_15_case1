class PasswordToggle {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.input = wrapper.querySelector('input');
    this.button = wrapper.querySelector('.password-toggle');
    this.iconOpen = wrapper.querySelector('.icon-eye-open');
    this.iconClosed = wrapper.querySelector('.icon-eye-closed');

    this.button.addEventListener('click', () => this.toggleVisibility());
  }

  toggleVisibility() {
    const isPassword = this.input.type === 'password';
    this.input.type = isPassword ? 'text' : 'password';

    // swap icons
    this.iconOpen.hidden = !isPassword;
    this.iconClosed.hidden = isPassword;

    // update tooltip
    this.button.title = isPassword ? 'Hide password' : 'Show password';
  }
}

class LoginFormHandler {
  constructor(form) {
    this.form = form;
    this.submitBtn = form.querySelector('.btn-login');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.spinner = this.submitBtn.querySelector('.loading-spinner');
    this.isSubmitting = false;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  setSubmittingState(isSubmitting) {
    this.isSubmitting = isSubmitting;
    this.submitBtn.disabled = isSubmitting;

    if (isSubmitting) {
      this.btnText.textContent = 'Logging in...';
      this.spinner.hidden = false;
    } else {
      this.btnText.textContent = 'Login';
      this.spinner.hidden = true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting) return;

    // prevent duplicate submissions
    this.setSubmittingState(true);

    const email = this.form.email.value.trim();
    console.log('Login triggered for:', email);

    // simulate API call (2s)
    setTimeout(() => {
      const success = email.toLowerCase().includes('success');
      console.log(success ? 'Login success' : 'Login failed');

      // Re-enable after response
      this.setSubmittingState(false);
    }, 2000);
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  const pwWrapper = document.querySelector('.password-wrapper');
  if (pwWrapper) new PasswordToggle(pwWrapper);

  const form = document.getElementById('login-form');
  if (form) new LoginFormHandler(form);
});