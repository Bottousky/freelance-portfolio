import { existsSync, readFileSync } from "node:fs";

const required = [
  "AGENTS.md",
  "README.md",
  ".env.example",
  "docs/PRODUCT_BRIEF.md",
  "docs/CONTENT.md",
  "docs/CASE_STUDIES.md",
  "docs/VALIDATION.md",
  "docs/PUBLISH_CHECKLIST.md",
  ".opencode/commands/ship.md",
  ".opencode/agents/product-strategist.md",
  ".opencode/agents/copywriter.md",
  ".opencode/agents/frontend-builder.md",
  ".opencode/agents/qa-engineer.md",
  ".opencode/agents/security-reviewer.md",
  ".opencode/agents/final-reviewer.md"
];

const missing = required.filter((path) => !existsSync(path));
if (missing.length) {
  console.error("Missing required portfolio files:\n" + missing.join("\n"));
  process.exit(1);
}

const privateDirs = [
  "data",
  "profiles",
  "templates",
  "prospects",
  "opportunities",
  "outreach",
  "pipeline",
  "leads",
  "proposals",
  "sales-ops",
  "finance",
  "strategy"
];
const present = privateDirs.filter((dir) => existsSync(dir));
if (present.length) {
  console.error(
    "Private sales-operations material must not live in the public repo:\n" +
      present.join("\n") +
      "\nMove these to the sibling freelance-sales-ops/ directory before publishing."
  );
  process.exit(1);
}

const forbiddenRootArtifacts = ["BOOTSTRAP_STATUS.md", "FINAL_REPORT.md", "RUN_ONCE_WITH_OPENCODE.md"];
const forbiddenPresent = forbiddenRootArtifacts.filter((path) => existsSync(path));
if (forbiddenPresent.length) {
  console.error(
    "Bootstrap/execution artifacts must not be committed to the public repository root:\n" +
      forbiddenPresent.join("\n")
  );
  process.exit(1);
}

const home = readFileSync("app/page.tsx", "utf8");
for (const marker of ["PRODUCTIZED SERVICES", "PROOF, NOT CLAIMS", "AI speeds up delivery"]) {
  if (!home.includes(marker)) {
    console.error(`Homepage is missing commercial marker: ${marker}`);
    process.exit(1);
  }
}

const content = readFileSync("lib/content.ts", "utf8");
if (!content.includes("buildWhatsappUrl") || !content.includes("NEXT_PUBLIC_WHATSAPP_NUMBER")) {
  console.error("WhatsApp configuration must be env-driven and degrade safely (see lib/content.ts)");
  process.exit(1);
}

const nextConfig = readFileSync("next.config.ts", "utf8");
if (!nextConfig.includes('output: "export"')) {
  console.error("Cloudflare Pages deployment requires a static Next.js export (output: \"export\")");
  process.exit(1);
}

console.log("Portfolio structure gate: PASS");
