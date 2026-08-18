# Cloudflare Workers Deployment (OpenNext)

This portfolio is deployed to **Cloudflare Workers** via the official
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter. The adapter
consumes a normal `next build` output and emits a Worker bundle that Wrangler can
deploy directly. No Node.js server, paid Cloudflare product, or static export is
required.

## How the pieces fit

| File | Role |
|---|---|
| `next.config.ts` | Plain Next.js config (no `output: "export"`). |
| `open-next.config.ts` | OpenNext adapter config; default values are enough for this portfolio. |
| `wrangler.jsonc` | Worker name, compatibility date/flags and the static asset binding (`ASSETS`). |
| `public/_headers` | Static response policy applied to assets served by the Worker. |
| `.open-next/` | Generated bundle emitted by `opennextjs-cloudflare build`. Gitignored. |
| `.wrangler/` | Wrangler local state and cache. Gitignored. |

## Local build and preview

```bash
npm ci
npm run build               # Next.js build
npm run preview             # opennextjs-cloudflare build + wrangler dev
```

`npm run preview` boots a local Cloudflare Workers emulator (Miniflare) that serves
the same bundle that will be deployed. Use it to smoke-test the production build
against `http://localhost:8787` (Wrangler's default) before publishing.

## Deploy to production

```bash
npm ci
npm run build
npm run deploy              # opennextjs-cloudflare build + wrangler deploy
```

The deploy step publishes the Worker to Cloudflare using the credentials configured
on the host (typically `~/.config/.wrangler/config/default.toml` for OAuth or
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` for CI).

The Worker name comes from `wrangler.jsonc` (`manuel-freelance-portfolio` by
default). The live URL is shown in the deploy output.

## Environment variables

`NEXT_PUBLIC_*` values are read at build time. The build step is the only
opportunity to embed them in the bundle, so set or change them before each
deployment.

- `NEXT_PUBLIC_CONTACT_EMAIL` — optional; defaults to the public email in the repo.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — recommended; Argentina mobile format example
  `54911XXXXXXXX`, digits only.

## Pre-deploy gates

Run from the repository root:

```bash
npm run verify:structure
npm run lint
npm run typecheck
npm run test
npm run build
npx opennextjs-cloudflare build
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=mobile
npm audit --audit-level=high
```

After `opennextjs-cloudflare build`, `.open-next/worker.js` and
`.open-next/assets/` must exist. Both directories are gitignored.

## When to switch hosts

This deployment target is the right one for a portfolio that needs:

- server-side rendering on the edge (already provided by OpenNext);
- the option to add a small API route or KV/D1/R2 binding later;
- automatic geographic distribution via the Cloudflare network.

It is overkill for a fully static site. If the portfolio later becomes a static
brochure with no server logic, move it to Cloudflare Pages (with `output: "export"`)
and remove the OpenNext adapter.
