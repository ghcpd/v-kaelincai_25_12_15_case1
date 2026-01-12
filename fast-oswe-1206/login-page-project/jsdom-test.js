const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load HTML
const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Create DOM
const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/' });
const { window } = dom;

// Expose globals expected by main.js
global.window = window;
global.document = window.document;
global.console = console; // reuse Node console

typeof global.setTimeout === 'function' || (global.setTimeout = window.setTimeout.bind(window));
typeof global.clearTimeout === 'function' || (global.clearTimeout = window.clearTimeout.bind(window));

// Instrument console to count submissions
let submissions = 0;
const originalLog = console.log;
const originalWarn = console.warn;
console.log = (...args) => { submissions += 1; originalLog('[log]', ...args); };
console.warn = (...args) => { submissions += 1; originalWarn('[warn]', ...args); };

// Load app logic
require('./js/main.js');

// Trigger DOMContentLoaded on window (listener is registered on window in main.js)
window.dispatchEvent(new window.Event('DOMContentLoaded'));

// --- Test 1: Password toggle ---
const passwordInput = window.document.querySelector('#password');
const toggleBtn = window.document.querySelector('.password-toggle');

if (!passwordInput || !toggleBtn) {
  throw new Error('Password input or toggle button not found');
}

const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

assert(passwordInput.type === 'password', 'Initial type should be password');
toggleBtn.click();
assert(passwordInput.type === 'text', 'Toggle should switch to text');
toggleBtn.click();
assert(passwordInput.type === 'password', 'Toggle should switch back to password');

// --- Test 2: Duplicate submission prevention ---
const form = window.document.querySelector('#login-form');
if (!form) throw new Error('Form not found');

// Set email to success scenario
form.querySelector('#email').value = 'success@example.com';

// Dispatch submit event multiple times rapidly
form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

// Wait for the simulated API call
setTimeout(() => {
  try {
    assert(submissions === 1, `Expected 1 submission log, got ${submissions}`);
    const btn = form.querySelector('.btn-login');
    assert(btn.disabled === false, 'Button should be re-enabled after submission');
    originalLog('✅ Tests passed');
  } catch (err) {
    originalWarn('❌ Tests failed:', err.message || err);
    process.exitCode = 1;
  } finally {
    // Restore console
    console.log = originalLog;
    console.warn = originalWarn;
  }
}, 2400);
