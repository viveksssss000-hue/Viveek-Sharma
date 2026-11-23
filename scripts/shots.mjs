/**
 * Screenshot helper for design review and the launch QA checklist.
 *
 *   node scripts/shots.mjs [baseUrl] [outDir] [width]
 *
 * Uses the Chrome already installed on the machine via puppeteer-core, so
 * nothing is downloaded. Captures a full-page image of every route at the width
 * given, which is how the responsive checks in spec 13.3 get done at 360, 390,
 * 768, 1024, 1280 and 1440.
 */
import fs from "node:fs/promises";
import path from "node:path";

import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = process.argv[3] ?? "shots";
const WIDTH = Number(process.argv[4] ?? 1440);

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

const ROUTES = [
  ["home", "/"],
  ["services", "/bookkeeping-services-for-cpa-firms"],
  ["how-it-works", "/how-it-works"],
  ["security", "/security"],
  ["about", "/about"],
  ["book-a-call", "/book-a-call"],
  ["free-pilot", "/free-pilot"],
  ["blog", "/blog"],
  ["privacy-policy", "/privacy-policy"],
  ["terms", "/terms"],
  ["thank-you-call", "/thank-you-call"],
  ["thank-you", "/thank-you"],
  ["404", "/no-such-page"],
];

async function findChrome() {
  for (const candidate of CHROME_PATHS) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      /* try the next one */
    }
  }
  throw new Error("No Chrome or Edge found. Update CHROME_PATHS.");
}

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

await fs.mkdir(OUT, { recursive: true });

for (const [name, route] of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 1 });
  const response = await page.goto(`${BASE}${route}`, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });

  // Dismiss the cookie banner so it does not sit over the page in every shot.
  await page.evaluate(() => {
    try {
      localStorage.setItem(
        "tryacowork.consent",
        JSON.stringify({ value: "denied", at: Date.now() })
      );
    } catch {
      /* storage blocked */
    }
  });
  await page.reload({ waitUntil: "networkidle0" });
  await new Promise((resolve) => setTimeout(resolve, 400));

  const file = path.join(OUT, `${WIDTH}-${name}.png`);
  await page.screenshot({ path: file, fullPage: true });

  const height = await page.evaluate(() => document.body.scrollHeight);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );

  console.log(
    `${String(response?.status() ?? "?").padEnd(4)} ${name.padEnd(20)} ${height}px${
      overflow ? "  *** HORIZONTAL OVERFLOW ***" : ""
    }`
  );

  await page.close();
}

await browser.close();
