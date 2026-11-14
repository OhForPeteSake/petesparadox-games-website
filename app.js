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

// Animate the approved lockup as one intact image; the artwork is never redrawn.
const logoFrame = document.querySelector('.hero-art');
const logo = logoFrame?.querySelector('img');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let logoAnimations = [];
function startLogoMotion() {
  logoAnimations.forEach(animation => animation.cancel());
  logoAnimations = [];
  if (!logo || motionPreference.matches || !logo.animate) return;
  logoAnimations.push(logo.animate([
    { opacity: 0, transform: 'scale(.96) translateY(8px)' },
    { opacity: 1, transform: 'scale(1.015) translateY(-2px)', offset: .65 },
    { opacity: 1, transform: 'scale(1) translateY(0)' }
  ], { duration: 1200, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
  logoAnimations.push(logoFrame.animate([
    { boxShadow: '0 0 0px rgba(0,237,10,0)' },
    { boxShadow: '0 0 55px rgba(0,237,10,.19)', offset: .55 },
    { boxShadow: '0 0 80px rgba(0,237,10,.04)' }
  ], { duration: 1700, easing: 'ease-out' }));
}
if (logo) {
  if (logo.complete) startLogoMotion();
  else logo.addEventListener('load', startLogoMotion, { once: true });
  motionPreference.addEventListener('change', startLogoMotion);
}
