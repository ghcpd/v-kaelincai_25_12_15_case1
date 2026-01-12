# Known Issues

This project originally had two critical issues that were fixed during development.

## Issue #1: Missing Password Visibility Toggle
- Problem: The password input was a plain `<input type="password">` with no way for users to see the password they were typing.
- Impact: Poor user experience and higher input errors.

## Issue #2: Duplicate Submission Problem
- Problem: Clicking the login button multiple times would fire multiple API requests.
- Impact: Duplicate requests could cause race conditions, server load, and confusing UX (no loading feedback).
