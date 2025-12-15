# KNOWN ISSUES

This document lists the two critical issues that were present before the fixes.

## Issue #1 — Missing Password Visibility Toggle

Problem:

- The password input was a plain `<input type="password">` with no control to
  show or hide the typed password. This made it hard for users to confirm input.

Impact:

- Poor user experience and increased chance of input errors on small screens.

## Issue #2 — Duplicate Submission Problem

Problem:

- The login button could be clicked multiple times rapidly, and each click
  would trigger a separate API call. There was no visual feedback during
  submission and no prevention of duplicate requests.

Impact:

- Multiple requests were sent, causing potential server-side duplication and
  confusing UX.
