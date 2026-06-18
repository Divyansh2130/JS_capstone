const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom/extend-expect');

const htmlFilePath = path.resolve(__dirname, '../../js-capstone-project/src/index.html');
const scriptFilePath = path.resolve(__dirname, '../../js-capstone-project/src/js/scripts.js');

const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');
const dom = new JSDOM(htmlContent, { runScripts: 'dangerously' });
const { window } = dom;
const { document } = window;

// Simulate the script loading
const scriptEl = document.createElement("script");
scriptEl.textContent = scriptContent;
document.body.appendChild(scriptEl);

describe('HTML Content', () => {
  test('has semantic tags', () => {
    expect(document.querySelector('header')).not.toBeNull();
    expect(document.querySelector('nav')).not.toBeNull();
    expect(document.querySelector('main')).not.toBeNull();
    expect(document.querySelector('footer')).not.toBeNull();
    expect(document.querySelector('section')).not.toBeNull();
    expect(document.querySelector('article')).not.toBeNull();
  });

  test('has a subscribe form', () => {
    const form = document.querySelector('form#subscribeForm');
    expect(form).not.toBeNull();
    expect(form.querySelector('input[name="email"]')).not.toBeNull();
    expect(form.querySelector('button[type="submit"]')).not.toBeNull();
  });

  test('has a chat box', () => {
    const chatBox = document.querySelector('#chatBox');
    expect(chatBox).not.toBeNull();
    expect(chatBox.querySelector('#chatInput')).not.toBeNull();
    expect(chatBox.querySelector('#chatSubmit')).not.toBeNull();
    expect(chatBox.querySelector('#chatResponse')).not.toBeNull();
  });
});

describe('Interactive Features', () => {
  test('subscribe form is interactive', async () => {
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = subscribeForm.querySelector('input[name="email"]');
    const subscribeMessage = document.getElementById('subscribeMessage');

    emailInput.value = 'test@example.com';
    subscribeForm.dispatchEvent(new window.Event('submit', { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(subscribeMessage.textContent).toBe('Thank you for subscribing!');
  });

  test('AI chat is interactive', async () => {
    const chatInput = document.getElementById('chatInput');
    const chatSubmit = document.getElementById('chatSubmit');
    const chatResponse = document.getElementById('chatResponse');

    chatInput.value = 'Tell me about cars';
    chatSubmit.dispatchEvent(new window.Event('click', { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 1100));
    expect(chatResponse.textContent).toEqual('AI response for: Tell me about cars');
  });
});

describe('JavaScript Guidelines', () => {
  test('used proper camelCase naming conventions', () => {
    const camelCaseRegex = /(?:const|let|var)\s+([a-z][a-zA-Z0-9]*)\s*=/g;
    let match;
    while ((match = camelCaseRegex.exec(scriptContent)) !== null) {
      expect(match[1]).toMatch(/^[a-z][a-zA-Z0-9]*$/);
    }
  });

  test('followed Single Responsibility Principle', () => {
    const functionDeclarations = scriptContent.match(/\bconst\s+([a-zA-Z_$][\w$]*)\s*=\s*\([^)]*\)\s*=>/g) || [];
    expect(functionDeclarations.length).toBeGreaterThanOrEqual(5);
  });

  test('used ES6 features', () => {
    expect(scriptContent).toContain('const');
    expect(scriptContent).toContain('let');
    expect(scriptContent).toContain('=>');
    expect(scriptContent).toContain('async');
    expect(scriptContent).toContain('await');
    expect(scriptContent).toContain('import');
    expect(scriptContent).toContain('export');
  });

  test('wrote clean and readable code', () => {
    const lines = scriptContent.split('\n');
    lines.forEach(line => {
      expect(line.length).toBeLessThanOrEqual(120);
    });
  });

  test('used proper error handling', () => {
    expect(scriptContent).toContain('try');
    expect(scriptContent).toContain('catch');
    expect(scriptContent).toContain('console.error');
  });
});