#!/usr/bin/env node
// Smoke check: boots the built Cloudflare Worker bundle (.open-next/worker.js)
// with `wrangler dev` in local mode and verifies it actually serves pages.
//
// `next build`, `opennextjs-cloudflare build` and E2E against `next dev` can all
// pass while the Worker itself returns 500 on every request (it happened with
// next 16.4.2 + @opennextjs/cloudflare 1.20.2). This script exercises the real
// bundle. It needs no Cloudflare credentials. Run it after building:
//
//   npx opennextjs-cloudflare build
//   npm run smoke:worker
//
// Exits 0 if GET / returns 200 with the hero greeting and an unknown path
// returns 404; exits 1 otherwise, printing the wrangler output.

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const workerPath = path.join(root, ".open-next", "worker.js");
const wranglerBin = path.join(root, "node_modules", ".bin", "wrangler");
const startupTimeoutMs = 90_000;
const requestTimeoutMs = 15_000;

if (!existsSync(workerPath)) {
  console.error("FAIL .open-next/worker.js not found. Run `npx opennextjs-cloudflare build` first.");
  process.exit(1);
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

const port = await freePort();
const baseUrl = `http://127.0.0.1:${port}`;
const persistDir = mkdtempSync(path.join(os.tmpdir(), "smoke-worker-"));

// Local mode only: drop any Cloudflare credentials so the check proves it
// does not depend on them, and keep .env* files out of the Worker env.
const env = { ...process.env, CI: "true", WRANGLER_SEND_METRICS: "false" };
env.CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV = "false";
delete env.CLOUDFLARE_API_TOKEN;
delete env.CLOUDFLARE_API_KEY;
delete env.CLOUDFLARE_ACCOUNT_ID;

let output = "";
const wrangler = spawn(
  wranglerBin,
  [
    "dev",
    "--local",
    "--ip", "127.0.0.1",
    "--port", String(port),
    "--persist-to", persistDir,
    "--show-interactive-dev-session=false",
    "--log-level", "warn",
  ],
  { cwd: root, env, stdio: ["ignore", "pipe", "pipe"], detached: process.platform !== "win32" }
);
wrangler.stdout.on("data", (chunk) => (output += chunk));
wrangler.stderr.on("data", (chunk) => (output += chunk));

let exited = false;
wrangler.on("exit", () => (exited = true));

function stopWrangler() {
  if (!exited && wrangler.pid) {
    try {
      // Negative pid kills the whole group, including the workerd child.
      if (process.platform === "win32") wrangler.kill("SIGKILL");
      else process.kill(-wrangler.pid, "SIGKILL");
    } catch {
      // Already gone.
    }
  }
  rmSync(persistDir, { recursive: true, force: true });
}

process.on("exit", stopWrangler);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => process.exit(1));
}

function fail(message) {
  console.error(`FAIL ${message}`);
  console.error("--- wrangler output ---");
  console.error(output.trim() || "(empty)");
  process.exit(1);
}

async function get(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  return { status: response.status, body: await response.text() };
}

// Wait until the Worker answers anything at all (even a 500), so a broken
// bundle fails on the status assertion instead of a startup timeout.
const deadline = Date.now() + startupTimeoutMs;
let ready = false;
while (Date.now() < deadline) {
  if (exited) fail(`wrangler dev exited before serving (code ${wrangler.exitCode})`);
  try {
    await fetch(baseUrl, { method: "HEAD", signal: AbortSignal.timeout(2_000) });
    ready = true;
    break;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
if (!ready) fail(`wrangler dev did not answer on ${baseUrl} within ${startupTimeoutMs / 1000}s`);

const home = await get("/");
if (home.status !== 200) fail(`GET / -> ${home.status}, expected 200`);
if (!home.body.includes("Hola, soy")) fail('GET / -> 200 but the body does not contain "Hola, soy"');
console.log("OK GET / -> 200, contains \"Hola, soy\"");

const missingPath = `/__smoke-not-found-${Date.now()}`;
const missing = await get(missingPath);
if (missing.status !== 404) fail(`GET ${missingPath} -> ${missing.status}, expected 404`);
console.log(`OK GET ${missingPath} -> 404`);

process.exit(0);
