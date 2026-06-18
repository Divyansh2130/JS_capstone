export function initJoinForm() {
  const form = document.getElementById('join-form');
  const email = document.getElementById('join-email');
  const msg = document.getElementById('join-msg');

  if (!form || !email || !msg) return;

  function showMessage(text, isError) {
    msg.textContent = text;
    if (isError) {
      msg.className = 'mt-3 text-sm text-red-500';
      msg.setAttribute('role', 'alert');
    } else {
      msg.className = 'mt-3 text-sm text-green-500';
      msg.setAttribute('role', 'status');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (email.value || '').trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      showMessage('Wrong email address', true);
      email.focus();
      return;
    }
    showMessage('Thank you for signing up!', false);
    form.reset();
  });
}
