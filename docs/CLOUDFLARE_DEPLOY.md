# Cloudflare Pages Deployment

This portfolio is a fully static Next.js export. `next.config.ts` uses `output: "export"`, so
`npm run build` produces an `out/` directory that can be hosted directly by Cloudflare Pages.
No Worker, OpenNext adapter, server runtime, database or paid Cloudflare feature is required.

## Recommended setup

In the Cloudflare dashboard:

1. Go to **Workers & Pages** → **Create** → **Pages** → connect to Git.
2. Select `Bottousky/freelance-portfolio`.
3. Production branch: `main`.
4. Build command: `npm run build`.
5. Build output directory: `out`.
6. Build environment Node.js version: `22`.

## Environment variables

Set these under the Pages project's build environment:

- `NEXT_PUBLIC_CONTACT_EMAIL` — optional; defaults to the public email already in the repo.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — recommended; Argentina mobile format example:
  `54911XXXXXXXX`, digits only.

`NEXT_PUBLIC_*` values are compiled into the static site during the build. After changing a
value, trigger a new deployment.

## Expected behavior

- No WhatsApp value: the WhatsApp CTA is hidden.
- Valid WhatsApp value: CTA links to `https://wa.me/<number>`.
- Every route is emitted as static HTML under `out/`.
- Git pushes to `main` can trigger Pages production deployments once the repository is linked.

## Pre-deploy gates

```bash
npm run verify:structure
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=mobile
npm audit
```

After build, `out/index.html` must exist.

## When to move to Cloudflare Workers

Do not add Workers just for this portfolio. Move from Pages/static export only if the product
later needs server-side features such as authenticated APIs, server actions, dynamic request
handling, private secrets at runtime, or other functionality that cannot be generated at build
time.
