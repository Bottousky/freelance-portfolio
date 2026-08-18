# Manuel Botto — Backend Software Engineer (Go, Distributed Systems)

Backend Software Engineer building reliable distributed systems in Go — focused
software sprints that ship. Public portfolio for Manuel Botto, a backend engineer
from Argentina working remotely worldwide on Go services, APIs, microservices,
event-driven systems and the React/TypeScript product surfaces around them.

## What's here

- **EventFlow — Notification Orchestrator** — a flagship backend `DEMONSTRATION PROJECT`.
  The portfolio page describes the architecture, components and engineering concepts
  in detail. The implementation lives in the public repository
  [github.com/Bottousky/eventflow](https://github.com/Bottousky/eventflow);
  this site is not running the service.
- **Proyecto Roxana** — a `REAL PROJECT` open-source educational web game ecosystem:
  [github.com/Bottousky/proyecto-roxana](https://github.com/Bottousky/proyecto-roxana).
- **Three product engineering demonstrations** — lead qualification, AI operations
  desk and a SaaS validation sprint. Every demo is explicitly labeled
  `DEMONSTRATION PROJECT` until it becomes a paid case study. No fake clients,
  testimonials or metrics.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- [Cloudflare Workers](https://workers.cloudflare.com/) via
  [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- Playwright (browser E2E) + Vitest (unit tests)
- ESLint and `tsc` for static validation
- GitHub Actions CI
- No backend, database, auth or paid API required at runtime

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
npx opennextjs-cloudflare build
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=mobile
npm audit
```

`npm run validate` runs the non-OpenNext, non-browser gates. Browser E2E and the
OpenNext bundle build are run separately because they need extra setup.

## Build the Worker bundle

```bash
npm run build                # Next.js build
npm run preview              # builds again, then wrangler dev
npm run deploy               # builds again, then wrangler deploy
```

`npm run preview` boots a local Cloudflare Workers emulator (Miniflare). Use it to
smoke-test the production build before publishing.

The deployable artifact lives in `.open-next/` (gitignored). `wrangler.jsonc`
points the Worker entry at `.open-next/worker.js` and binds `.open-next/assets/`
as the static asset directory.

## Deploy — Cloudflare Workers

1. Authenticate Wrangler locally: `npx wrangler login` (or set
   `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` for CI).
2. Confirm `wrangler.jsonc` has the Worker name you want to publish.
3. `npm run deploy`.
4. Capture the live `*.workers.dev` URL from the deploy output.

See [`docs/CLOUDFLARE_DEPLOY.md`](docs/CLOUDFLARE_DEPLOY.md) for the full setup and
[`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md) for the final release
checks.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. All variables here are
public-safe; `NEXT_PUBLIC_*` is bundled at build time and the same value is shipped
to every visitor.

- `NEXT_PUBLIC_CONTACT_EMAIL` — contact email used by the primary `mailto:` CTA.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in `54911XXXXXXXX` format
  (digits only). When unset, the WhatsApp CTA is hidden instead of linking to a
  fake number.

## Structure

```text
app/            Next.js pages (homepage + demo routes, including /demos/eventflow)
components/     UI and interactive demo components
lib/            content, demo logic
public/         static assets and Cloudflare response policy (_headers)
tests/          unit and browser E2E tests
docs/           product, content, validation and deployment documentation
scripts/        structure verification gate
open-next.config.ts   OpenNext adapter config
wrangler.jsonc        Cloudflare Worker + static asset binding
```

See [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) and [`docs/VALIDATION.md`](docs/VALIDATION.md)
for the product and quality contract.
