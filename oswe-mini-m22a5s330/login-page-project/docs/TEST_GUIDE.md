# TEST GUIDE

Password Toggle
1. Open index.html in a browser.
2. Type a password into the password field.
3. Click the eye icon at the right of the password field.
   - Expected: Password becomes visible and the eye icon switches to the open-eye SVG. Hover color changes to #4A90E2.
4. Click again to hide the password.

Duplicate Submission Prevention
1. Enter an email and password.
2. Click the Login button rapidly (5+ times).
   - Expected: Only a single console log of "Login triggered for:" appears. The button is disabled immediately, shows "Logging in..." with a spinner, background changes to #CCCCCC and cursor becomes not-allowed.
3. Wait ~2 seconds.
   - Expected: The button re-enables and the text reverts to "Login".

Success case
- Use an email containing "success" (e.g., success@example.com) to simulate a successful login.

Notes
- The app simulates a 2s API request with setTimeout. Check the browser console for logs to confirm behavior.
