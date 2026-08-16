# Validation Contract

## Mechanical gates

Run from repo root:

```bash
npm run verify:structure
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=mobile
```

All must pass.

## Visual/manual gates

Check at minimum:

- 390 × 844 mobile viewport;
- 768 × 1024 tablet;
- 1440 × 900 desktop;
- keyboard-only navigation;
- no horizontal scroll;
- CTA visible and understandable;
- cards remain legible without hover;
- labels `REAL PROJECT` and `DEMONSTRATION PROJECT` are visible without opening case details.

## Commercial gates

A first-time visitor should be able to answer in under 30 seconds:

1. What does Manuel sell?
2. What does it roughly cost to start?
3. What proves he can build it?
4. How do I contact him?

If any answer is ambiguous, the portfolio is not done even if the build passes.

## Performance target

Prefer static/server-rendered content and minimal client JavaScript. Avoid adding libraries that exist only for visual flourish. If a 3D demo is added, lazy-load it below the fold or behind an explicit demo route.

## Security review

At minimum inspect:

- accidental environment-secret exposure;
- dangerous HTML injection;
- insecure external links;
- unnecessary runtime packages;
- dependency audit output if install succeeds;
- form behavior and URL construction;
- client-side exposure of data that should remain private.
