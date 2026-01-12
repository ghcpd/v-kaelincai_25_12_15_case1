# Known Issues (Before Fixes)

This project shipped with two critical UX and functional issues:

1) Missing Password Visibility Toggle
- Problem: The password field was a plain `<input type="password">` with no show/hide control.
- Impact: Users cannot verify what they type, which leads to poor UX and input errors.

2) Duplicate Submission Problem
- Problem: The login button could be clicked multiple times rapidly, causing multiple API requests.
- Impact: Multiple submissions from fast clicks create duplicated requests and no visual feedback indicating progress.

These issues have been fixed in the current implementation.
