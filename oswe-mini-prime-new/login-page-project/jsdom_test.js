const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

async function run() {
  const htmlPath = path.join(__dirname, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    url: 'file://' + htmlPath.replace(/\\/g, '/'),
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  });

  const waitForLoad = () => new Promise((resolve) => {
    dom.window.addEventListener('load', () => resolve(), { once: true });
  });

  await waitForLoad();

  const { document } = dom.window;
  const passwordInput = document.querySelector('#password');
  const toggleBtn = document.querySelector('.password-toggle');
  const loginForm = document.querySelector('#login-form');
  const loginBtn = document.querySelector('.btn-login');

  const logs = { log: [], error: [] };
  dom.window.console.log = (...args) => logs.log.push(args.join(' '));
  dom.window.console.error = (...args) => logs.error.push(args.join(' '));

  // Test password toggle
  if (!passwordInput || !toggleBtn) throw new Error('Missing password input or toggle button');
  const click = (el) => el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

  if (passwordInput.type !== 'password') throw new Error('Expected initial password type');
  click(toggleBtn);
  if (passwordInput.type !== 'text') throw new Error('Toggle did not switch to text');
  click(toggleBtn);
  if (passwordInput.type !== 'password') throw new Error('Toggle did not switch back to password');

  // Test duplicate submission prevention
  document.querySelector('#email').value = 'success@example.com';
  passwordInput.value = 'secret';

  const submit = () => loginForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  for (let i = 0; i < 5; i++) submit();

  if (logs.log.filter((m) => m.includes('Login request initiated')).length !== 1) {
    throw new Error('Expected exactly one login initiation log');
  }

  if (!loginBtn.disabled) throw new Error('Button should be disabled during submission');

  await new Promise((resolve) => setTimeout(resolve, 2200));

  if (loginBtn.disabled) throw new Error('Button should be re-enabled after submission');

  console.log('Tests passed');
  console.log('Captured logs:', logs);
}

run().catch((err) => {
  console.error('Test failure:', err.message);
  process.exitCode = 1;
});
