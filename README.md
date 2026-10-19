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
- **Projects** — Manuel's own products, each with its own audience and channels:
  [Juntopia](https://juntopia.com) (a shared deck for game nights: truco, brisca,
  generala, plus Atlas in “A la distancia”) and Proyecto Roxana (working title of an
  educational adventure about electricity for ages 12–18; no public link yet).
- **Videos / devlog** — a section linking to the personal YouTube channel. It only
  renders when `NEXT_PUBLIC_YOUTUBE_URL` is set.
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

See [Custom domain](#custom-domain--manuelbottocom) to serve the Worker from
`manuelbotto.com`, [`docs/CLOUDFLARE_DEPLOY.md`](docs/CLOUDFLARE_DEPLOY.md) for the full setup and
[`docs/PUBLISH_CHECKLIST.md`](docs/PUBLISH_CHECKLIST.md) for the final release
checks.

## Custom domain — manuelbotto.com

The Worker is published today at `*.workers.dev`. These steps move it to
`manuelbotto.com` and set up `hola@manuelbotto.com`. They are documented here only;
none of them has been run yet.

1. **Put the domain on Cloudflare.** Dashboard → *Add a domain* → `manuelbotto.com`
   (Free plan is enough). If the domain was bought outside Cloudflare, change its
   nameservers at the registrar to the two Cloudflare nameservers shown, then wait
   until the zone status is **Active**. Remove any existing `A`, `AAAA` or `CNAME`
   record for `manuelbotto.com` / `www` that points elsewhere, or the next step fails.
2. **Attach the Worker as a Custom Domain.** Either in the dashboard —
   *Workers & Pages* → `manuel-freelance-portfolio` → *Settings* → *Domains & Routes*
   → *Add* → *Custom domain* → `manuelbotto.com` — or in `wrangler.jsonc`, then
   `npm run deploy`:

   ```jsonc
   "routes": [
     { "pattern": "manuelbotto.com", "custom_domain": true }
   ]
   ```

   Cloudflare creates the DNS record and the TLS certificate on its own; it can take
   a few minutes to issue.
3. **Redirect `www` to the apex.** Add a proxied DNS record for `www`
   (`AAAA www 100::`, proxy on), then *Rules* → *Redirect Rules* → template
   *Redirect from WWW to root* (301, keep query string).
4. **Route `hola@manuelbotto.com`.** *Email* → *Email Routing* → enable it (Cloudflare
   adds the `MX` and `TXT` records), create the custom address `hola` and forward it
   to the personal Gmail inbox after verifying that destination. Send a test email
   before the next step.
5. **Rebuild with the domain email.** `NEXT_PUBLIC_*` values are embedded at build time,
   so set `NEXT_PUBLIC_CONTACT_EMAIL=hola@manuelbotto.com` (in `.env.local` or the
   shell; in CI, as an environment variable of the build step) and run
   `npm run deploy`. Until then the site keeps the Gmail fallback.
6. **Verify.** `curl -I https://manuelbotto.com` returns `200`,
   `curl -I https://www.manuelbotto.com` returns `301` to the apex, and the contact
   button on the live home opens a mail to `hola@manuelbotto.com`.
7. **Optional, once the domain works:** set `"workers_dev": false` in `wrangler.jsonc`
   and redeploy so the old `*.workers.dev` URL stops serving a duplicate copy.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. All variables here are
public-safe; `NEXT_PUBLIC_*` is bundled at build time and the same value is shipped
to every visitor.

- `NEXT_PUBLIC_CONTACT_EMAIL` — contact email used by the primary `mailto:` CTA.
  Production value: `hola@manuelbotto.com` once Email Routing is live (see
  [Custom domain](#custom-domain--manuelbottocom)). When unset, the site falls back
  to the personal Gmail address.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in `54911XXXXXXXX` format
  (digits only). When unset, the WhatsApp CTA is hidden instead of linking to a
  fake number.
- `NEXT_PUBLIC_YOUTUBE_URL` — personal YouTube channel, e.g.
  `https://www.youtube.com/@handle` (https `youtube.com` or `youtu.be` only). When
  unset or invalid, the Videos / devlog section and its nav link are hidden.

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
