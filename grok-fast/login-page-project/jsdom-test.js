const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

async function run() {
  const root = path.resolve(__dirname);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const virtualConsole = new (require('jsdom')).VirtualConsole();
  const logs = [];
  virtualConsole.on('log', (msg) => logs.push(msg));
  virtualConsole.on('error', (err) => logs.push(`ERROR:${err}`));

  const dom = new JSDOM(html, {
    url: 'file://' + path.join(root, 'index.html'),
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole,
  });

  const { window } = dom;
  await new Promise((resolve) => window.addEventListener('load', resolve));

  const doc = window.document;
  const passwordInput = doc.getElementById('password');
  const toggleButton = doc.getElementById('passwordToggle');
  const emailInput = doc.getElementById('email');
  const loginForm = doc.getElementById('loginForm');
  const loginButton = doc.getElementById('loginButton');
  const spinner = doc.querySelector('.loading-spinner');
  const btnText = doc.querySelector('.btn-text');

  // Test password toggle
  passwordInput.value = 'password123';
  const initialType = passwordInput.type;
  toggleButton.click();
  const afterFirstClickType = passwordInput.type;
  toggleButton.click();
  const afterSecondClickType = passwordInput.type;

  // Test duplicate submission prevention
  emailInput.value = 'success@example.com';
  passwordInput.value = 'password123';

  const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
  loginForm.dispatchEvent(submitEvent);

  const stateAfterFirstSubmit = {
    disabled: loginButton.disabled,
    spinnerHidden: spinner.classList.contains('hidden'),
    btnText: btnText.textContent,
  };

  // Rapid second submit
  loginForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

  // Wait a bit to observe logs
  await new Promise((resolve) => setTimeout(resolve, 50));
  const logsAfterDoubleSubmit = [...logs];

  // Wait for simulated API completion (2s) + buffer
  await new Promise((resolve) => setTimeout(resolve, 2200));
  const stateAfterCompletion = {
    disabled: loginButton.disabled,
    spinnerHidden: spinner.classList.contains('hidden'),
    btnText: btnText.textContent,
  };

  console.log(JSON.stringify({
    passwordToggle: {
      initialType,
      afterFirstClickType,
      afterSecondClickType,
    },
    submission: {
      stateAfterFirstSubmit,
      logsAfterDoubleSubmit,
      stateAfterCompletion,
    }
  }, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
