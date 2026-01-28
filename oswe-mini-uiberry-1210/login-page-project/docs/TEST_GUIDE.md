# Test Guide

Follow these steps to verify the fixes and acceptance criteria.

## Manual testing steps

1. Open `index.html` in your browser.

### Password Toggle (Issue #1)

1. Type a password into the password field.
2. Click the eye icon on the right of the field.
   - Expected: The password becomes visible (input `type` changes to `text`).
   - The icon switches to the eye-open SVG and the icon color changes to `#4A90E2` on hover.
3. Click the eye icon again.
   - Expected: The password is hidden, icon switches back to eye-closed.

### Duplicate Submission Prevention (Issue #2)

1. Enter any email and password (to simulate success use `success@example.com`).
2. Click the **Login** button rapidly 5 times.
   - Expected: Only one console log appears: `Sending login request for ...`.
   - The button disables immediately, shows a spinner and the text `Logging in...`.
   - The button background becomes `#CCCCCC` and the cursor becomes `not-allowed`.
3. Wait ~2 seconds.
   - Expected: The button re-enables and the text returns to `Login`.

## Acceptance criteria checklist

- [ ] Eye icon toggles password visibility (password ↔ text).
- [ ] Icon switches between eye-open/eye-closed and hover color changes to `#4A90E2`.
- [ ] Smooth 0.3s transitions for icon and focus states.
- [ ] Button disables on click, shows `Logging in...` with spinner.
- [ ] Disabled state uses background `#CCCCCC` and `not-allowed` cursor.
- [ ] Only one request fires despite multiple rapid clicks.
- [ ] Button re-enables after ~2s for both success and failure.
