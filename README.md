# Pete’s Paradox GAMES website

Static, buildless GitHub Pages site. The approved landscape lockup is copied unchanged from the shared studio intro package. The original intro is Unity runtime code, not a web-ready video; no substitute animation has been created. Add an exact approved web export when available, with reduced-motion and skip support.

## Local preview

Serve this directory with any static HTTP server, for example `python -m http.server 8000`, then visit localhost:8000.

## Forms: not live

GitHub Pages cannot receive form submissions or send email. Both endpoints in `app.js` are deliberately null; the interface tells visitors that forms are unavailable and never claims a submission succeeded. Choose and configure reputable form and newsletter providers before enabling either. Set their HTTPS endpoint URLs in `app.js` only when they support the documented JSON contract and CORS. Configure contact routing to the company mailbox inside the provider, not in frontend code. Configure the optional future aliases there as needed. Never put credentials or mailbox addresses in public source.

The client-side honeypot is a convenience, not a security boundary: the provider must enforce server-side spam checks, validation, rate limits, and delivery/error handling. Confirm that a 2xx response means actual acceptance, and test success and error paths end to end. Newsletter opt-in, confirmation and unsubscribe behavior must match the selected service. Replace the temporary privacy notice with accurate provider, retention, rights, and contact details before collecting data; review applicable legal requirements.

## GitHub Pages

Create a dedicated repository under OhForPeteSake, push this directory, and enable Pages from the default branch root. `CNAME` contains the requested domain. Configure and verify the domain in GitHub Pages and set DNS separately only when authorized. Check HTTPS and canonical URLs after DNS propagates. No Shopify configuration is involved.
