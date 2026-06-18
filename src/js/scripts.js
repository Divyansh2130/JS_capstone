// /* import */
// /* export */

let counter = 0;

const createSubscribe = () => {
  const existing = document.getElementById('subscribeForm');
  if (existing) return existing;
  const form = document.createElement('form');
  form.id = 'subscribeForm';
  const input = document.createElement('input');
  input.name = 'email';
  input.type = 'email';
  input.placeholder = 'you@example.com';
  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Subscribe';
  const msg = document.createElement('div');
  msg.id = 'subscribeMessage';
  form.appendChild(input);
  form.appendChild(btn);
  document.body.appendChild(form);
  document.body.appendChild(msg);
  return form;
};

const createChatBox = () => {
  const existing = document.getElementById('chatBox');
  if (existing) return existing;
  const box = document.createElement('div');
  box.id = 'chatBox';
  const input = document.createElement('input');
  input.id = 'chatInput';
  input.type = 'text';
  const submit = document.createElement('button');
  submit.id = 'chatSubmit';
  submit.textContent = 'Send';
  const resp = document.createElement('div');
  resp.id = 'chatResponse';
  box.appendChild(input);
  box.appendChild(submit);
  box.appendChild(resp);
  document.body.appendChild(box);
  return box;
};

const handleSubscribe = (e) => {
  e.preventDefault();
  const msg = document.getElementById('subscribeMessage');
  if (msg) msg.textContent = 'Thank you for subscribing!';
};

const simulateAIResponse = async (message) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const text = 'AI response for: ' + message;
    const resp = document.getElementById('chatResponse');
    if (resp) resp.textContent = text;
    return text;
  } catch (err) {
    console.error(err);
  }
};

const handleChatSubmit = (e) => {
  e.preventDefault && e.preventDefault();
  const input = document.getElementById('chatInput');
  const value = input ? input.value : '';
  simulateAIResponse(value);
};

const initApp = () => {
  createSubscribe();
  createChatBox();
  const form = document.getElementById('subscribeForm');
  if (form) form.addEventListener('submit', handleSubscribe);
  const submit = document.getElementById('chatSubmit');
  if (submit) submit.addEventListener('click', handleChatSubmit);
};

initApp();

// export { initApp };
