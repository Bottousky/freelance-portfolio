#!/usr/bin/env node
// Smoke check: verifies that the public EventFlow repository exists and
// is reachable. It is intentionally NOT part of the regular test or CI
// pipeline, because depending on an external service from CI makes the
// pipeline flaky. Run it manually:
//
//   node scripts/smoke-eventflow-repo.mjs
//
// Exits 0 if the URL responds with a 2xx or 3xx status, 1 otherwise.

import https from "node:https";

const url = "https://github.com/Bottousky/eventflow";

const request = https.request(
  url,
  { method: "HEAD", timeout: 10000 },
  (response) => {
    if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
      console.log(`OK ${url} -> ${response.statusCode}`);
      process.exit(0);
    }
    console.error(`FAIL ${url} -> ${response.statusCode}`);
    process.exit(1);
  }
);
request.on("error", (err) => {
  console.error(`FAIL ${url} -> ${err.message}`);
  process.exit(1);
});
request.on("timeout", () => {
  console.error(`FAIL ${url} -> timeout`);
  request.destroy();
  process.exit(1);
});
request.end();
