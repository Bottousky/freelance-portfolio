import { existsSync, readFileSync } from "node:fs";

const required = [
  "AGENTS.md",
  "README.md",
  ".env.example",
  "docs/PRODUCT_BRIEF.md",
  "docs/CONTENT.md",
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
  'id="proyectos"',
  'id="pasiones"',
  'id="trayectoria"',
  'id="contacto"',
  "mailto:",
];
for (const marker of homeMarkers) {
  if (!home.includes(marker)) {
    console.error(`Homepage is missing personal-site marker: ${marker}`);
    process.exit(1);
  }
}
for (const forbidden of ["WhatsApp", "USD", "Productized", "Start a project"]) {
  if (home.includes(forbidden)) {
    console.error(`Homepage must not sell freelance services (found: ${forbidden})`);
    process.exit(1);
  }
}

const content = readFileSync("lib/content.ts", "utf8");
const contentChecks = [
  ["YouTube URL helper", "buildYoutubeUrl"],
  ["YouTube env var", "NEXT_PUBLIC_YOUTUBE_URL"],
  ["Contact email env var", "NEXT_PUBLIC_CONTACT_EMAIL"],
  ["Projects export", "export const projects"],
  ["Passions export", "export const passions"],
  ["Work export", "export const work"],
  ["Studies export", "export const studies"],
  ["Juntopia project", "https://juntopia.com"],
  ["Proyecto Roxana project", "Proyecto Roxana"],
];
for (const [label, marker] of contentChecks) {
  if (!content.includes(marker)) {
    console.error(`lib/content.ts is missing ${label}: ${marker}`);
    process.exit(1);
  }
}
if (/ohmdal/i.test(content)) {
  console.error("lib/content.ts must not reveal the unannounced public name of Proyecto Roxana");
  process.exit(1);
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

console.log("Personal site structure gate: PASS");
