# Test Guide

This guide explains how to manually test the two critical fixes implemented in this project.

## Manual testing steps

### Password Visibility Toggle
1. Open `index.html` in a browser (or serve with `python -m http.server`).
2. Enter a password in the password field.
3. Click the eye icon on the right of the input.
4. The password should **become visible** and the icon should change to the closed eye.
5. Click the eye icon again.
6. The password should **become hidden** and the icon should revert to the open eye.

### Duplicate Submission Prevention / Loading State
1. Enter an email (e.g., `success@example.com`) and a password.
2. Click the **Login** button repeatedly (fast multiple clicks).
3. Observe the following:
   - Only **one** request is triggered
   - The button text changes to `Logging in...`
   - A spinner appears next to the text
   - The button becomes disabled (gray background and `not-allowed` cursor)
4. After ~2 seconds (simulated API response), the button returns to the normal `Login` state and is re-enabled.

## Acceptance criteria checks
- Eye icon toggles between open/closed and the input type switches accordingly (password ↔ text).
- Smooth transitions for color/state changes (0.3s for toggle, 0.6s for spinner animation).
- Duplicate clicks do not fire multiple requests; only one is in-flight at a time.
- Loading state reverts after the simulated request completes.
