// Configure only after a provider is selected. Endpoints must accept JSON over HTTPS
// and return a 2xx response only when the submission is actually accepted.
const endpoints = Object.freeze({ newsletter: null, contact: null });
for (const form of document.querySelectorAll('form[data-form]')) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.status');
    const endpoint = endpoints[form.dataset.form];
    if (!endpoint) { status.textContent = 'This form is not available yet. Please check back soon.'; return; }
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) { status.textContent = 'Unable to send. Please try again.'; return; }
    const button = form.querySelector('button');
    const original = button.innerHTML;
    button.disabled = true; button.textContent = 'SENDING…'; status.textContent = 'Sending…';
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Request failed');
      form.reset(); status.textContent = form.dataset.form === 'newsletter' ? 'Thanks! Your request has been received.' : 'Thanks! Your message has been sent.';
    } catch { status.textContent = 'Something went wrong. Please try again later.'; }
    finally { button.disabled = false; button.innerHTML = original; }
  });
}
