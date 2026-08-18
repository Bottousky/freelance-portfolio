// Visual QA helper. Captures full-page screenshots of the homepage and the
// /demos/eventflow page at three breakpoints, and verifies the page does
// not overflow horizontally. Run on demand with:
//
//   node scripts/visual-qa.mjs
//
// Screenshots land in .visual-qa/. The script exits non-zero if any page
// overflows the viewport width.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const VIEWPORTS = [
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

const PAGES = [
  { name: "home", url: "http://127.0.0.1:3000/" },
  { name: "eventflow", url: "http://127.0.0.1:3000/demos/eventflow" },
];

const OUT_DIR = ".visual-qa";
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
let overflowDetected = false;

try {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const target of PAGES) {
      await page.goto(target.url, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        return {
          docScroll: doc.scrollWidth,
          bodyScroll: body.scrollWidth,
          inner: window.innerWidth,
        };
      });
      const overflows = overflow.docScroll > overflow.inner + 2;
      if (overflows) {
        overflowDetected = true;
        console.error(
          `OVERFLOW: ${target.name} @ ${viewport.name}: doc=${overflow.docScroll}px viewport=${overflow.inner}px`
        );
      } else {
        console.log(
          `OK: ${target.name} @ ${viewport.name}: doc=${overflow.docScroll}px viewport=${overflow.inner}px`
        );
      }
      const file = `${OUT_DIR}/${target.name}-${viewport.name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(`saved ${file}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (overflowDetected) {
  process.exit(1);
}
console.log("Visual QA: no horizontal overflow at any breakpoint.");
