# Publish Checklist

1. Confirm the public name/email on the site are the ones you want clients to see.
2. Set the real WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER=54911XXXXXXXX`) in Cloudflare Pages.
3. Click every link: home CTAs, case cards, demo pages and GitHub links.
4. Confirm no `data/`, `profiles/` or `templates/` folder exists in this repo.
5. Run all gates: `verify:structure`, `lint`, `typecheck`, `test`, `build`, Chromium E2E, mobile E2E and `npm audit`.
6. Confirm `out/index.html` exists after `npm run build`.
7. Push the final changes to `main`.
8. In Cloudflare Pages, connect `Bottousky/freelance-portfolio` with build command `npm run build` and output directory `out`.
9. Use Node.js 22 in the Cloudflare build environment and set the public env vars.
10. Deploy and open the generated `*.pages.dev` URL.
11. Verify the live site on desktop (1440px) and mobile (390px), with no horizontal scroll.
12. Test email and WhatsApp CTAs on the live URL.
13. Add the live URL to the GitHub repository homepage field.
14. Copy the final URL into marketplace profiles, proposals and outreach.
