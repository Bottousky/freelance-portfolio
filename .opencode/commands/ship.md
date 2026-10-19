description: Complete the personal site in one orchestrated build/review/repair run.
agent: build
---

You are the loop owner for this repository. Complete the personal site (Spanish copy) from the existing scaffold in one bounded execution.

Read these files first, in order:

1. `AGENTS.md`
2. `docs/PRODUCT_BRIEF.md`
3. `docs/CONTENT.md`
4. `docs/VALIDATION.md`
5. `docs/CLOUDFLARE_DEPLOY.md`
6. `docs/PUBLISH_CHECKLIST.md`
7. current source/tests

Private commercial material (prospects, marketplace profiles, outreach templates,
sales playbook, revenue targets) lives in the sibling `../freelance-sales-ops/`
directory. It is never read by the app and must never be committed to this repo.

Then execute this workflow:

### Phase 1 — independent audits

Delegate a read-only audit to `@product-strategist` against `docs/PRODUCT_BRIEF.md`.
Delegate copy improvement to `@copywriter` after reading the audit.

### Phase 2 — implementation

Delegate the visual/product implementation to `@frontend-builder` with the approved findings. Require:

- Spanish homepage (`<html lang="es">`) with the positioning line from `docs/PRODUCT_BRIEF.md`, verbatim;
- sections Proyectos, Pasiones, Trayectoria (trabajo + estudios), Videos (rendered only when
  `NEXT_PUBLIC_YOUTUBE_URL` is set) and Contacto (`mailto:`);
- Proyecto Roxana under its working title with no public link; Juntopia linking to `https://juntopia.com`;
- only facts listed in `docs/CONTENT.md`;
- no services, prices, freelance CTAs, WhatsApp or demo pages;
- responsive/mobile behavior;
- useful focus/accessibility states;
- light and dark color schemes both legible;
- no paid API requirement;
- no claim that a project is running or shipped unless `docs/CONTENT.md` says so.

You remain responsible for integrating/fixing any conflicts between agent outputs.

### Phase 3 — deterministic validation

Ensure dependencies are installed and a lockfile exists.
Delegate validation to `@qa-engineer`.
The required commands are:

- `npm run verify:structure`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npx opennextjs-cloudflare build`
- `npm run test:e2e -- --project=chromium`
- `npm run test:e2e -- --project=mobile`

Do not call the work done while any command fails.

### Phase 4 — security + final review

Delegate a read-only review to `@security-reviewer`.
Repair every CRITICAL/HIGH finding, then rerun the directly affected gates.

Create or update `FINAL_REPORT.md` containing:

- files/features changed;
- subagents used;
- exact validation commands and their outcomes;
- security findings/status;
- remaining risks;
- next Cloudflare Workers deployment step.

Delegate final acceptance to `@final-reviewer`.

### Repair loop

If final reviewer returns REPAIR, implement only the stated blockers, rerun affected validation, update `FINAL_REPORT.md` and request one more final review. Maximum three total repair cycles.

Do not push to GitHub. Do not fabricate results. Finish with the repository in a locally deployable state and `FINAL_REPORT.md` reflecting the actual evidence.
