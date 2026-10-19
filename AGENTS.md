# AGENTS.md — Personal Site Delivery Contract

## Mission

This repository is the personal hub of Manuel Botto, served at `manuelbotto.com`.
The site is written in Spanish and shows his projects, his career and studies, his
passions, and one way to reach him: email.

It is not a sales page. Do not present Manuel as a freelancer or service provider.

## Sources of truth, in order

1. `docs/PRODUCT_BRIEF.md`
2. `docs/CONTENT.md`
3. `docs/VALIDATION.md`
4. `docs/CLOUDFLARE_DEPLOY.md`
5. Existing source code

If two sources disagree, the higher item wins. Do not silently invent a compromise.

## Hard constraints

- Never invent jobs, degrees, dates, metrics, testimonials, clients, awards or anecdotes.
  Use only the facts listed in `docs/CONTENT.md`.
- No services, no prices, no freelance CTAs, no WhatsApp, no commercial demos.
- Proyecto Roxana is shown under its working title with **no public link**. Its public
  name is not decided. Never mention "Ohmdal".
- Juntopia links to `https://juntopia.com`.
- Maintain strict TypeScript. No `any` unless justified in a nearby comment.
- Do not disable lint/type/test rules to make validation pass.
- Do not delete failing tests as a repair strategy.
- Keep dependencies small. Do not add a database, auth layer, CMS or heavy animation
  library. Do not require paid external APIs to render the site.
- Light and dark color schemes must both be legible.
- Keep the site fast and useful on desktop and mobile. Prefer static/server-rendered
  content and minimal client JavaScript.
- Do not look like a generic AI-generated template. Prefer deliberate typography,
  hierarchy, whitespace and one coherent visual system.

## Deployment contract

The production target is **Cloudflare Workers** via the `@opennextjs/cloudflare` adapter.

- `next.config.ts` must remain a regular Next.js build (no `output: "export"`).
- `wrangler.jsonc` declares the Worker entrypoint (`.open-next/worker.js`) and the static asset binding.
- `open-next.config.ts` configures the OpenNext adapter (default config is acceptable for this site).
- `npm run build` followed by `opennextjs-cloudflare build` must produce `.open-next/worker.js`.
- `npm run preview` boots a local Wrangler dev server against that bundle.
- `npm run deploy` publishes the Worker to Cloudflare using Wrangler.
- Cloudflare static response policy may still live under `public/` (for example `_headers`).
- Do not add Server Actions, runtime secrets, auth or other server-only behavior without first changing the product requirements and deployment strategy explicitly.
- `NEXT_PUBLIC_*` values are build-time public configuration, not secrets.

## Repository hygiene (public/private split)

This repository is public-facing. All commercial intelligence lives in the sibling
`../freelance-sales-ops/` directory (prospects, opportunities, marketplace profiles,
outreach templates, sales playbook, revenue targets).

- Never commit `data/`, `profiles/`, `templates/` or any sales-ops material to this repo.
- `.gitignore` and `scripts/verify-structure.mjs` enforce the split. Do not weaken them.
- The OpenNext/Workers build emits `.open-next/` and Wrangler emits `.wrangler/`. Both must
  stay gitignored; never commit generated bundle artifacts.
- `FINAL_REPORT.md` lives at the repository root and is committed as part of the release
  record. It is not "agent execution evidence" — it is a release/audit artifact.

## Agent workflow

The primary `build` agent owns orchestration and final edits. Delegate in this order, and
only when a subagent reduces context pollution:

1. `@product-strategist` — read-only audit of positioning, clarity and factual accuracy against `docs/PRODUCT_BRIEF.md`.
2. `@copywriter` — improve Spanish copy for clarity without inventing facts.
3. `@frontend-builder` — implement the approved UI and content.
4. `@qa-engineer` — execute gates, reproduce failures, repair scoped defects when permitted.
5. `@security-reviewer` — inspect dependency/config/client-side exposure risks. Read-only.
6. `@final-reviewer` — compare implementation against the definition of done and issue PASS/REPAIR.

Do not create an open-ended agent loop.

## Definition of done

All of the following are mandatory:

- `<html lang="es">`; all visible copy is in Spanish.
- Homepage sections: **Proyectos**, **Pasiones**, **Trayectoria** (trabajo + estudios),
  optional **Videos** (rendered only when `NEXT_PUBLIC_YOUTUBE_URL` is set), and
  **Contacto** (a `mailto:` link).
- Every project, job, degree and passion shown is backed by `docs/CONTENT.md`.
- Mobile viewport (390 × 844) does not overflow horizontally.
- Keyboard focus remains visible.
- Light and dark color schemes are both legible on core text and links.
- `npm run verify:structure` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.
- `opennextjs-cloudflare build` produces `.open-next/worker.js`.
- `npm run test:e2e -- --project=chromium` passes.
- `npm run test:e2e -- --project=mobile` passes.
- No critical/high finding from `@security-reviewer` remains unresolved.

## Repair loop

Maximum three repair cycles:

`build -> validate -> review -> repair`

If the same class of failure survives three cycles, stop changing architecture. Write the blocker and the narrowest manual decision needed in `FINAL_REPORT.md`.

## Final report

At the end of `/ship`, create or update `FINAL_REPORT.md` (repository root, committed) with:

- what changed;
- agents used;
- commands actually run;
- PASS/FAIL result for each gate;
- remaining risks;
- exact next Cloudflare Workers deployment step.

Do not claim a command passed unless it was executed successfully.
