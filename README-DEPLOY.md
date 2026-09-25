# Deploying to Hostinger (PHP/HTML)

This folder is the whole site — plain PHP + HTML + CSS + vanilla JS, no
build step, no Node process required on the server. Any Hostinger shared
plan running PHP 7.4+ can serve it as-is.

## Upload

1. In hPanel, open **File Manager** (or connect via FTP) for the site at
   dallasclinicals.com.
2. Upload the **contents** of this `php-site/` folder into `public_html/`
   (not the folder itself — `index.php` should sit directly in
   `public_html/`).

## One-time configuration

Edit `includes/config.php` on the server (or here before uploading) and set:

- `NOTIFY_URL` — your Google Apps Script `/exec` URL from
  `scripts/AppsScript_Code.gs` (deploy that script first if you haven't).
- `ADMIN_EMAIL` — the Google account allowed to sign in at `/admin.php`.

The Firebase config block can stay as-is; it's a public client config
(access is governed by `firestore.rules`, already scoped to
`ADMIN_EMAIL`/patient-inquiry validation).

## What stayed the same vs. the React app

- Firebase Auth (Google sign-in) + Firestore reads/writes — loaded from
  Google's CDN as ES modules, same as before, just without a bundler.
- The Eligibility and Sponsors forms — same fields, same Firestore
  collections, same Apps Script email notification.
- The Admin photo upload — same client-side image compression, same 1MB
  Firestore-doc-size guard, same email-based access check (also enforced
  server-side by `firestore.rules`).
- Visual design — same compiled Tailwind CSS (`assets/css/style.css`),
  same color/typography tokens.
- Load-in and scroll-reveal motion — reimplemented in
  `assets/css/animations.css` + `assets/js/main.js` (native CSS
  transitions/IntersectionObserver) instead of framer-motion, including
  `prefers-reduced-motion` support.

## What's different

- No client-side router — every page is a real `.php` file
  (`/sponsors.php` instead of a React Route), so it's crawlable without
  executing JavaScript.
- No SPA bundle — each page only loads the small JS module it actually
  needs (e.g. `check-eligibility.php` doesn't load the admin upload code).

## Updating content later

- Marketing copy: edit the relevant `.php` file directly.
- Header/nav/footer: `includes/header.php` / `includes/footer.php`.
- Config (Firebase project, notify URL, admin email): `includes/config.php`.
- Styling: this ships the CSS Vite already compiled from the React app's
  Tailwind classes. If you change styling later without the React app,
  you're hand-editing compiled CSS — for anything beyond small tweaks,
  it's easier to update `src/` in the React project and re-run
  `npm run build`, then copy `dist/assets/*.css` back into
  `assets/css/style.css`.
