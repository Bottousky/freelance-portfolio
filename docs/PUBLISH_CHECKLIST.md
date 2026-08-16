# Publish Checklist

1. Confirm the public name/email on the site are the ones you want clients to see.
2. Set the real WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER=54911XXXXXXXX`) in the host.
3. Click every link: home CTAs, case cards, demo pages, GitHub links.
4. Confirm no `data/`, `profiles/` or `templates/` folder exists in this repo.
5. Run all gates: `npm run verify:structure`, `lint`, `typecheck`, `test`, `build`, `test:e2e -- --project=chromium`, `test:e2e -- --project=mobile`, `npm audit`.
6. Create the public GitHub repository.
7. Push: `git push origin main`.
8. Import the repo in Vercel and set env vars (email + WhatsApp).
9. Verify the live site on desktop (1440px).
10. Verify the live site on mobile (390px), no horizontal scroll.
11. Test all CTAs on the live URL, including email and WhatsApp.
12. Copy the final URL into your profile, proposals and outreach.