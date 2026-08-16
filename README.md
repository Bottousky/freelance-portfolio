# Manuel Botto — Freelance Portfolio

Full-Stack + AI Automation — focused software sprints that ship.

Public portfolio for Manuel Botto, a software developer from Argentina working remotely
worldwide on React/TypeScript products, AI-enabled workflows and interactive browser
experiences.

## What's here

- **Proyecto Roxana** — a real, open-source educational web game ecosystem:
  [github.com/Bottousky/proyecto-roxana](https://github.com/Bottousky/proyecto-roxana).
- **Three demonstration projects** — lead qualification, AI operations desk and a SaaS
  validation sprint. Every demo is explicitly labeled `DEMONSTRATION PROJECT` until it
  becomes a paid case study. No fake clients, testimonials or metrics.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- Static export (`output: "export"`) for low-cost, portable hosting
- Playwright (browser E2E) + Vitest (unit tests)
- ESLint and `tsc` for static validation
- GitHub Actions CI
- No backend, database, auth or paid API required

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Validate

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

`npm run validate` runs all non-browser gates. Browser E2E is run separately because it
launches the development server.

## Build

```bash
npm run build
```

The production-ready static site is emitted to `out/`.

## Deploy — Cloudflare Pages

This portfolio is intentionally deployed as a static Next.js export. It does not need a
Node.js server or the Cloudflare OpenNext adapter.

1. In Cloudflare, create a **Pages** project and connect this GitHub repository.
2. Use `npm run build` as the build command.
3. Use `out` as the build output directory.
4. Use Node.js 22 for the build environment.
5. Add the public environment variables below if desired.
6. Deploy and verify the generated `*.pages.dev` URL on desktop and mobile.

See [`docs/CLOUDFLARE_DEPLOY.md`](docs/CLOUDFLARE_DEPLOY.md) for the exact setup and
[`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md) for the final release checks.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. All variables are public-safe:

- `NEXT_PUBLIC_CONTACT_EMAIL` — contact email used by the `mailto:` CTA.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in `54911XXXXXXXX` format (digits only).
  When unset, the WhatsApp CTA is hidden instead of linking to a fake number.

Because this is a static export, `NEXT_PUBLIC_*` values are embedded at build time. Set or
change them in the Cloudflare Pages build environment and trigger a new deployment.

## Structure

```text
app/            Next.js pages (homepage + demo routes)
components/     UI and interactive demo components
lib/            content, demo logic
public/         static assets and Cloudflare static-host configuration
tests/          unit and browser E2E tests
docs/           product, validation and deployment documentation
scripts/        structure verification gate
```

See [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) and [`docs/VALIDATION.md`](docs/VALIDATION.md)
for the product and quality contract.
