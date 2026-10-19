# Publish Checklist

1. Confirm the public name/email on the site are the ones you want visitors to see.
2. Set the contact email (`NEXT_PUBLIC_CONTACT_EMAIL=hola@manuelbotto.com` once Email
   Routing is live) on the build host so the email CTA points to the right address.
3. Click every link: home sections, project cards and GitHub links.
4. Confirm no `data/`, `profiles/` or `templates/` folder exists in this repo.
5. Run all gates: `verify:structure`, `lint`, `typecheck`, `test`, `build`,
   `opennextjs-cloudflare build`, Chromium E2E, mobile E2E and `npm audit`.
6. Confirm `.open-next/worker.js` and `.open-next/assets/` exist after
   `opennextjs-cloudflare build`.
7. Push the final changes to `main`.
8. Configure Cloudflare Worker credentials on the host (`CLOUDFLARE_API_TOKEN`
   and `CLOUDFLARE_ACCOUNT_ID`, or `wrangler login`).
9. Run `npm run deploy` and capture the live Worker URL.
10. Set up the custom domain (`manuelbotto.com`) as described in the README section
    [Custom domain — manuelbotto.com](../README.md#custom-domain--manuelbottocom).
11. Verify the live site on desktop (1440px) and mobile (390px), in light and dark
    color schemes, with no horizontal scroll.
12. Test the email CTA on the live URL.
13. Add the live URL to the GitHub repository homepage field.
