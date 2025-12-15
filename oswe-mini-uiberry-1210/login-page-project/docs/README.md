# Login Page — Mini Project

Project: simple login page built with plain HTML, CSS, and JavaScript.

## Overview

This project demonstrates two critical fixes for a basic login UI:

- Password visibility toggle (inline SVG eye icons, smooth transitions)
- Duplicate submission prevention with a loading state and spinner

All files are plain static assets; there are no external dependencies.

## Features

- Responsive login form
- Inline SVG icons for password visibility
- Accessible toggle button (keyboard support)
- Prevents duplicate API submissions and shows a loading state

## Tech Stack

- HTML5
- CSS3 (modern layout & animations)
- Vanilla JavaScript (ES6+)

## Setup

1. Open `index.html` in your browser, or serve the folder with any static server.
2. The project root is `login-page-project/`.

Example (using Python 3):

```powershell
# from inside the project folder
python -m http.server 8000
# then open http://localhost:8000/login-page-project/
```

## Project structure

```
login-page-project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── docs/
│   ├── README.md
│   ├── KNOWN_ISSUE.md
│   ├── FIX_SUMMARY.md
│   └── TEST_GUIDE.md
└── .gitignore
```

## Notes

- To simulate a successful login, use an email containing the word `success` (e.g., `success@example.com`).
- The simulated API call takes ~2 seconds.
