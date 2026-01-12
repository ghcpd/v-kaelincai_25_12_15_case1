# Test Guide

Acceptance Tests

1) Password Toggle
- Steps:
  - Open `index.html`.
  - Type a password into the password field.
  - Click the eye icon.
- Expected:
  - Password becomes visible (input `type` changes to `text`).
  - Icon switches to the eye-closed icon.
  - Hovering the icon changes its color from `#999999` to `#4A90E2`.
  - Clicking again hides the password and icon toggles back.

2) Duplicate Submission Prevention
- Steps:
  - Enter an email and password.
  - Click the "Login" button rapidly several times.
- Expected:
  - Only one console message: `Login request initiated for <email>`.
  - Button disables immediately, shows `Logging in...` and a spinner.
  - Button background becomes `#CCCCCC` and cursor is `not-allowed`.
  - After ~2 seconds, the simulated response appears in the console and the button re-enables.

Notes:
- Use an email containing `success` (e.g., `success@example.com`) to make the simulated login succeed.
- For other emails the simulated API will log a failure.
