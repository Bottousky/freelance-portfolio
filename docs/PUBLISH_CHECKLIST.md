# Publish Checklist

1. Confirm the public name/email on the site are the ones you want clients to see.
2. Set the real WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER=54911XXXXXXXX`) on
   the build host so the WhatsApp CTA renders.
3. Click every link: home CTAs, case cards, demo pages and GitHub links.
4. Confirm no `data/`, `profiles/` or `templates/` folder exists in this repo.
5. Run all gates: `verify:structure`, `lint`, `typecheck`, `test`, `build`,
   `opennextjs-cloudflare build`, Chromium E2E, mobile E2E and `npm audit`.
6. Confirm `.open-next/worker.js` and `.open-next/assets/` exist after
   `opennextjs-cloudflare build`.
7. Push the final changes to `main`.
8. Configure Cloudflare Worker credentials on the host (`CLOUDFLARE_API_TOKEN`
   and `CLOUDFLARE_ACCOUNT_ID`, or `wrangler login`).
9. Run `npm run deploy` and capture the live Worker URL.
10. Verify the live site on desktop (1440px) and mobile (390px), with no
    horizontal scroll.
11. Test email and WhatsApp CTAs on the live URL.
12. Add the live URL to the GitHub repository homepage field.
13. Copy the final URL into marketplace profiles, proposals and outreach.
