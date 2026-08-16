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
- Playwright (browser E2E) + Vitest (unit tests)
- ESLint and `tsc` for static validation
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

## Deploy (Vercel)

1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com) — it detects Next.js automatically.
3. Set the public environment variables below in the Vercel project.
4. Deploy. No framework-specific config file is required.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. All variables are public-safe:

- `NEXT_PUBLIC_CONTACT_EMAIL` — contact email used by the `mailto:` CTA.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in `54911XXXXXXXX` format (digits only).
  When unset, the WhatsApp CTA is hidden instead of linking to a fake number.

## Structure

```text
app/            Next.js pages (homepage + demo routes)
components/     UI and interactive demo components
lib/            content, demo logic
tests/          unit and browser E2E tests
docs/           product brief, content guide, validation contract, publish checklist
scripts/        structure verification gate
```

See [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) and [`docs/VALIDATION.md`](docs/VALIDATION.md)
for the product and quality contract.