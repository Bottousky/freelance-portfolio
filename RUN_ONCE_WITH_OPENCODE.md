# Run once with OpenCode + DeepSeek

This repo is prepared for OpenCode Go.

## 1. Enter the repository

```bash
cd manuel-freelance-portfolio
```

## 2. Start OpenCode

```bash
opencode
```

## 3. Select the model

Inside OpenCode:

- use `/connect` if OpenCode Go is not connected;
- use `/models`;
- select **DeepSeek V4 Pro** as the primary implementation model.

Use **DeepSeek V4 Flash** only for cheap bounded repair/review tasks if you deliberately switch models. Do not weaken validation to save tokens.

## 4. Execute the commercial build

Run:

```text
/ship
```

The `/ship` project command contains the full orchestration prompt. It instructs the primary agent to read the product brief, delegate to specialized project subagents, implement the portfolio, run all gates, repair failures and produce `FINAL_REPORT.md`.

## 5. What success looks like

The run is not successful because the page looks good in a screenshot. It is successful when:

- positioning is clear;
- demo/client truth policy is respected;
- responsive behavior works;
- lint, TypeScript, unit tests and production build pass;
- Playwright passes on desktop and mobile;
- security review has no unresolved critical/high issue;
- final reviewer says PASS.

## Optional command-line execution

If your OpenCode installation supports running a project command non-interactively, you may use the equivalent CLI flow. Prefer the TUI first so provider/model selection is visibly correct.
