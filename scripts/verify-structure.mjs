import { existsSync, readFileSync } from "node:fs";

const required = [
  "AGENTS.md",
  "README.md",
  ".env.example",
  "docs/PRODUCT_BRIEF.md",
  "docs/CONTENT.md",
  "docs/CASE_STUDIES.md",
  "docs/VALIDATION.md",
  "docs/CLOUDFLARE_DEPLOY.md",
  "docs/PUBLISH_CHECKLIST.md",
  ".opencode/commands/ship.md",
  ".opencode/agents/product-strategist.md",
  ".opencode/agents/copywriter.md",
  ".opencode/agents/frontend-builder.md",
  ".opencode/agents/qa-engineer.md",
  ".opencode/agents/security-reviewer.md",
  ".opencode/agents/final-reviewer.md",
  "app/demos/eventflow/page.tsx",
  "open-next.config.ts",
  "wrangler.jsonc",
  "FINAL_REPORT.md",
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
  "strategy",
];
const presentPrivate = privateDirs.filter((dir) => existsSync(dir));
if (presentPrivate.length) {
  console.error(
    "Private sales-operations material must not live in the public repo:\n" +
      presentPrivate.join("\n") +
      "\nMove these to the sibling freelance-sales-ops/ directory before publishing."
  );
  process.exit(1);
}

const gitignore = readFileSync(".gitignore", "utf8");
for (const entry of [".open-next/", ".wrangler/"]) {
  if (!gitignore.includes(entry)) {
    console.error(`.gitignore must block generated build artifact: ${entry}`);
    process.exit(1);
  }
}

const eslintConfig = readFileSync("eslint.config.mjs", "utf8");
for (const pattern of ['".open-next/**"', '".wrangler/**"']) {
  if (!eslintConfig.includes(pattern)) {
    console.error(`eslint.config.mjs must ignore generated build artifact: ${pattern}`);
    process.exit(1);
  }
}

const home = readFileSync("app/page.tsx", "utf8");
const homeMarkers = [
  "Backend Software Engineer",
  "reliable distributed systems",
  "Tell me what you need",
  "PRODUCTIZED SERVICES",
  "PROOF, NOT CLAIMS",
  "EXPERIENCE",
  "BACKEND REFERENCE IMPLEMENTATION",
  "PRODUCT ENGINEERING DEMOS",
];
for (const marker of homeMarkers) {
  if (!home.includes(marker)) {
    console.error(`Homepage is missing commercial marker: ${marker}`);
    process.exit(1);
  }
}

const eventflowPage = readFileSync("app/demos/eventflow/page.tsx", "utf8");
const eventflowMarkers = [
  "EventFlow",
  "DEMONSTRATION PROJECT",
  "github.com/Bottousky/eventflow",
];
for (const marker of eventflowMarkers) {
  if (!eventflowPage.includes(marker)) {
    console.error(`EventFlow demo page is missing marker: ${marker}`);
    process.exit(1);
  }
}

const content = readFileSync("lib/content.ts", "utf8");
const contentChecks = [
  ["WhatsApp URL helper", "buildWhatsappUrl"],
  ["WhatsApp env var", "NEXT_PUBLIC_WHATSAPP_NUMBER"],
  ["Experience export", "export const experience"],
  ["Capability groups export", "export const capabilityGroups"],
  ["Hero tags export", "export const heroTags"],
  ["Backend case study (EventFlow)", "EventFlow — Notification Orchestrator"],
  ["Real project case study (Roxana)", "Proyecto Roxana"],
  ["Case study grouping", "CaseStudyGroup"],
  ["Mercado Libre experience", "Mercado Libre"],
];
for (const [label, marker] of contentChecks) {
  if (!content.includes(marker)) {
    console.error(`lib/content.ts is missing ${label}: ${marker}`);
    process.exit(1);
  }
}

const nextConfig = readFileSync("next.config.ts", "utf8");
if (nextConfig.includes('output: "export"')) {
  console.error(
    "next.config.ts uses static export — that conflicts with the Cloudflare Workers / OpenNext deployment. Remove the static export."
  );
  process.exit(1);
}

const packageJson = readFileSync("package.json", "utf8");
for (const dep of ["@opennextjs/cloudflare", "wrangler"]) {
  if (!packageJson.includes(`"${dep}"`)) {
    console.error(`package.json must include the OpenNext/Workers dependency: ${dep}`);
    process.exit(1);
  }
}
for (const script of ["preview", "deploy"]) {
  if (!packageJson.includes(`"${script}":`)) {
    console.error(`package.json must include the ${script} script for OpenNext/Workers`);
    process.exit(1);
  }
}

console.log("Portfolio structure gate: PASS");
