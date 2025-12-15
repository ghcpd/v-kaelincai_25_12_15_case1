const { JSDOM } = require('jsdom');
const dom = new JSDOM('<input type="password">');
const input = dom.window.document.querySelector('input');
input.type = 'text';
console.log('type:', input.type);
