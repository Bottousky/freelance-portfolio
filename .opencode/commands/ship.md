description: Complete the freelance portfolio in one orchestrated build/review/repair run.
agent: build
---

You are the loop owner for this repository. Complete the commercial portfolio from the existing scaffold in one bounded execution.

Read these files first, in order:

1. `AGENTS.md`
2. `docs/PRODUCT_BRIEF.md`
3. `docs/CONTENT.md`
4. `docs/CASE_STUDIES.md`
5. `docs/VALIDATION.md`
6. `docs/CLOUDFLARE_DEPLOY.md`
7. `docs/PUBLISH_CHECKLIST.md`
8. current source/tests

Private commercial material (prospects, marketplace profiles, outreach templates,
sales playbook, revenue targets) lives in the sibling `../freelance-sales-ops/`
directory. It is never read by the app and must never be committed to this repo.

Then execute this workflow:

### Phase 1 — independent audits

Delegate a read-only commercial audit to `@product-strategist`.
Delegate copy improvement to `@copywriter` after reading the product audit.

### Phase 2 — implementation

Delegate the visual/product implementation to `@frontend-builder` with the approved findings. Require:

- polished homepage with the backend-first positioning;
- clear productized services and starting prices;
- an Experience section (current role + previous roles) without inventing employer detail;
- a flagship backend demo at `/demos/eventflow` labeled `DEMONSTRATION PROJECT`,
  distinguishing architecture description from executable evidence;
- Proyecto Roxana real case;
- three interactive deterministic product demos: lead qualification, AI operations, SaaS validation;
- responsive/mobile behavior;
- useful focus/accessibility states;
- no fake proof;
- no paid API requirement;
- no claim that the EventFlow architecture is "running" here — the live code lives in
  the linked public repository.

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
