# AGENTS.md — Commercial Portfolio Delivery Contract

## Mission

Turn this repository into a polished, credible freelance portfolio that helps Manuel win paid web/software work quickly while remaining technically honest.

The site must make this positioning obvious within the first viewport:

> **Full-Stack + AI Automation — focused software sprints that ship.**

## Sources of truth, in order

1. `docs/PRODUCT_BRIEF.md`
2. `docs/CONTENT.md`
3. `docs/CASE_STUDIES.md`
4. `docs/VALIDATION.md`
5. `docs/CLOUDFLARE_DEPLOY.md`
6. Existing source code

If two sources disagree, the higher item wins. Do not silently invent a compromise.

## Hard constraints

- Do not invent clients, employment history, revenue, testimonials, awards or production metrics.
- Keep `REAL PROJECT` and `DEMONSTRATION PROJECT` visually explicit.
- Keep the site fast and useful on desktop and mobile.
- The primary CTA must work without a backend. Email is an acceptable baseline.
- Do not require paid external APIs to render the portfolio.
- Do not add a database, auth layer, CMS or heavy animation library unless the product strategist demonstrates a concrete portfolio benefit.
- Do not make the site look like a generic AI-generated template. Prefer deliberate typography, hierarchy, whitespace, responsive states and one coherent visual system.
- Maintain strict TypeScript.
- No `any` unless justified in a nearby comment.
- Do not disable lint/type/test rules to make validation pass.
- Do not delete failing tests as a repair strategy.
- Keep dependencies small.

## Deployment contract

The production target is **Cloudflare Pages** using a fully static Next.js export.

- Preserve `output: "export"` in `next.config.ts`.
- `npm run build` must emit a deployable `out/` directory and `out/index.html`.
- Prefer static/client-side behavior that remains compatible with Pages.
- Do not add Server Actions, API routes, runtime secrets, middleware, auth or other server-only behavior without first changing the product requirements and deployment strategy explicitly.
- `NEXT_PUBLIC_*` values are build-time public configuration, not secrets.
- Cloudflare-specific static response policy may live under `public/` (for example `_headers`).

## Repository hygiene (public/private split)

This repository is public-facing. All commercial intelligence lives in the sibling
`../freelance-sales-ops/` directory (prospects, opportunities, marketplace profiles,
outreach templates, sales playbook, revenue targets).

- Never commit `data/`, `profiles/`, `templates/` or any sales-ops material to this repo.
- The WhatsApp CTA must be env-driven (`NEXT_PUBLIC_WHATSAPP_NUMBER`); when unset it must
  hide instead of linking to a fake number.
- `.gitignore` and `scripts/verify-structure.mjs` enforce the split. Do not weaken them.
- Agent execution evidence belongs in `.opencode/reports/`, which is gitignored. Do not recreate bootstrap/status reports in the public repository root.

## Agent workflow

The primary `build` agent owns orchestration and final edits. Delegate in this order:

1. `@product-strategist` — audit positioning, offer, CTA and proof hierarchy. Read-only recommendation.
2. `@copywriter` — improve concise sales copy without fabricating proof.
3. `@frontend-builder` — implement the approved UX/design and demo surfaces.
4. `@qa-engineer` — execute gates, reproduce failures, repair scoped defects when permitted.
5. `@security-reviewer` — inspect dependency/config/client-side exposure risks. Read-only.
6. `@final-reviewer` — compare implementation against acceptance criteria and issue PASS/REPAIR.

Nested subagents are enabled to depth 2. Use them only when they reduce context pollution; do not create an open-ended agent loop.

## Definition of done

All of the following are mandatory:

- Homepage has one clear positioning statement, one primary CTA and visible starting prices.
- Four service cards exist.
- Truthful professional/technical background is visible without fabricating employers or metrics.
- At least one real-project case study exists.
- At least three demonstration projects exist and are labeled truthfully.
- Proyecto Roxana links to the public GitHub repository.
- Mobile viewport does not overflow horizontally.
- Keyboard focus remains visible.
- No obvious WCAG contrast failure on core text/CTA surfaces.
- `npm run verify:structure` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes and emits `out/index.html`.
- `npm run test:e2e -- --project=chromium` passes.
- `npm run test:e2e -- --project=mobile` passes.
- `npm audit --audit-level=high` passes.
- No critical/high finding from `@security-reviewer` remains unresolved.
- `@final-reviewer` returns `PASS`.

## Repair loop

Maximum three repair cycles:

`build -> validate -> review -> repair`

If the same class of failure survives three cycles, stop changing architecture. Write the blocker and the narrowest manual decision needed in `.opencode/reports/FINAL_REPORT.md`.

## Final report

At the end of `/ship`, create or update `.opencode/reports/FINAL_REPORT.md` with:

- what changed;
- agents used;
- commands actually run;
- PASS/FAIL result for each gate;
- remaining risks;
- exact next Cloudflare Pages deployment step.

The report is local execution evidence and must remain gitignored. Do not claim a command passed unless it was executed successfully.
