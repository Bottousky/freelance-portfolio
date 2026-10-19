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
- contact link visible and understandable;
- cards remain legible without hover;
- check both light and dark color schemes (text, links and cards must be legible in each).

## Personal-site gates

A first-time visitor should be able to answer in under 30 seconds:

1. Who is Manuel Botto?
2. What is he building?
3. What did he study and where has he worked?
4. How do I contact him?

If any answer is ambiguous, the portfolio is not done even if the build passes.

## Performance target

Prefer static/server-rendered content and minimal client JavaScript. Avoid adding libraries that exist only for visual flourish. If a heavy visual element is added, lazy-load it below the fold.

## Security review

At minimum inspect:

- accidental environment-secret exposure;
- dangerous HTML injection;
- insecure external links;
- unnecessary runtime packages;
- dependency audit output if install succeeds;
- form behavior and URL construction;
- client-side exposure of data that should remain private.
