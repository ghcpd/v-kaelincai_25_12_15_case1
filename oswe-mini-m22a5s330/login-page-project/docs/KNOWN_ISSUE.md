# KNOWN ISSUES

This file documents the two critical issues that were present and fixed in this project.

Issue #1: Missing Password Visibility Toggle
- Problem: The original password input had no show/hide control.
- Fix: Added a .password-wrapper and .password-toggle button with inline SVGs. Implemented a PasswordToggle class to toggle input.type and swap icons. Smooth transitions added.

Issue #2: Duplicate Submission Problem
- Problem: The login button could be clicked multiple times causing multiple API requests and no visual feedback.
- Fix: Implemented a isSubmitting flag and setSubmittingState method in LoginFormHandler. The button is disabled immediately on submit, shows "Logging in..." with a spinner, and is re-enabled after the simulated API response (2s). Console logs confirm only one request is issued regardless of repeated clicks.
