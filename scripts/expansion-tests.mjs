/**
 * The two "will it survive a later phase?" tests from change order 01.
 *
 *   node scripts/expansion-tests.mjs [outDir]
 *
 * CO-06 requires the desktop header to be proven with SIX nav links plus the
 * button, using the longest anticipated label ("Audit Support"), at 1024px,
 * 1152px and 1280px, with a screenshot at each width.
 *
 * CO-01 requires the price block to be proven with a THIRD card, with a
 * screenshot, then reverted to two.
 *
 * Both must be data edits only - if either needs a layout rewrite, the build has
 * failed the requirement. So this script edits only the data files, rebuilds,
 * captures the evidence, and puts the originals back. It never leaves the sixth
 * nav item or the third card in place: CO-16 is explicit that neither may exist
 * on production.
 *
 * Run it against a local production build. It rebuilds twice, so it is slow.
 */
import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import puppeteer from "puppeteer-core";

const OUT = process.argv[2] ?? "expansion-evidence";
const PORT = 3311;
const BASE = `http://localhost:${PORT}`;
const GLOBAL = path.join("src", "content", "global.ts");

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

async function findChrome() {
  for (const candidate of CHROME_PATHS) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      /* next */
    }
  }
  throw new Error("No Chrome or Edge found.");
}

const original = await fs.readFile(GLOBAL, "utf8");
let server;

function build() {
  execSync("npm run build", { stdio: "pipe" });
}

async function startServer() {
  const { spawn } = await import("node:child_process");
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "ignore",
    shell: true,
  });
  // Wait for it to answer rather than guessing at a delay.
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(BASE);
      if (response.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Server did not start.");
}

function stopServer() {
  if (!server) return;
  try {
    execSync(`npx --yes kill-port ${PORT}`, { stdio: "ignore" });
  } catch {
    server.kill("SIGKILL");
  }
  server = undefined;
}

try {
  await fs.mkdir(OUT, { recursive: true });

  /* --- Apply the two data edits, and nothing else ------------------ */

  // The repository is checked out with CRLF endings, so every patch below is
  // written against \r?\n rather than \n. A plain "\n" target matches nothing
  // here and does so silently, which is exactly the trap this comment exists
  // to stop the next person falling into.
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let patched = original;

  // CO-06 asked the header to survive a SIXTH item. Since 23 November the
  // nav carries six for real (Dedicated Staff joined), so the contract is
  // met by the live nav itself: when six or more are present, test the
  // header exactly as shipped instead of inventing a seventh the change
  // order never asked for.
  const liveNavCount = (original.match(/export const mainNav = \[[\s\S]*?\] as const;/)?.[0] ?? "").match(/\{ label:/g)?.length ?? 0;
  if (liveNavCount < 6) {
    patched = patched.replace(
      /( *\{ label: "Resources", href: routes\.blog \},)(\r?\n\] as const;)/,
      (_match, resourcesLine, close) =>
        `${resourcesLine}${eol}  { label: "Audit Support", href: routes.services },${close}`
    );
  }

  // CO-01's third-price-card edit was RETIRED on 22 November 2026: the
  // price block (and the cards array it patched) no longer exists, because
  // the site publishes no prices. The CO-06 header and menu tests below are
  // still live and still required.

  /**
   * Verify by counting what actually changed, not by looking for a substring.
   * An earlier version checked `includes('"Audit Support"')` and passed
   * because this file's own documentation comment mentions that label - so the
   * patch silently did nothing and the test measured the unmodified site.
   */
  const navEntries = (text) =>
    (text.match(/export const mainNav = \[[\s\S]*?\] as const;/)?.[0] ?? "").match(
      /\{ label:/g
    )?.length ?? 0;
  const navBefore = navEntries(original);
  const navAfter = navEntries(patched);
  const expectedAfter = navBefore < 6 ? navBefore + 1 : navBefore;

  if (navAfter !== expectedAfter) {
    throw new Error(
      `Could not apply the nav edit (${navBefore} -> ${navAfter}). The data ` +
        "shape in content/global.ts has changed - update this script."
    );
  }
  console.log(
    navBefore < 6
      ? `Data edit: nav ${navBefore} -> ${navAfter} items.`
      : `Nav already carries ${navBefore} items - testing it as shipped.`
  );

  await fs.writeFile(GLOBAL, patched, "utf8");
  console.log("Applied both data edits to content/global.ts. Building...");
  build();
  await startServer();

  const browser = await puppeteer.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--hide-scrollbars", "--disable-gpu"],
  });

  /* --- CO-06: the header at three widths --------------------------- */

  const results = [];
  for (const width of [1024, 1152, 1280]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.evaluateOnNewDocument(() => {
      try {
        localStorage.setItem(
          "tryacowork.consent",
          JSON.stringify({ value: "denied", at: Date.now() })
        );
      } catch {
        /* blocked */
      }
    });
    await page.goto(BASE, { waitUntil: "networkidle0" });

    const header = await page.evaluate(() => {
      const bar = document.querySelector("header > div");
      // Scoped to the DESKTOP nav specifically. The mobile menu's <dialog>
      // also lives inside <header> and also contains a <nav>, so an unscoped
      // selector counts every link twice and reports a phantom wrap.
      const nav = document.querySelector('header nav[aria-label="Main"]');
      const button = document.querySelector(
        "header > div > div > a[href='/book-a-call']"
      );
      const links = [...(nav?.querySelectorAll("a") ?? [])];
      const navBox = nav?.getBoundingClientRect();
      const buttonBox = button?.getBoundingClientRect();
      return {
        linkCount: links.length,
        labels: links.map((a) => a.textContent?.trim()),
        // Overlap, or the bar growing past one line, is the failure mode.
        overlaps:
          navBox && buttonBox ? navBox.right > buttonBox.left + 1 : false,
        barHeight: bar ? Math.round(bar.getBoundingClientRect().height) : 0,
        // Widths, so a failure says WHY rather than just "wrapped".
        widths: (() => {
          const logo = document.querySelector("header a[aria-label*='home']");
          const inner = bar?.getBoundingClientRect();
          return {
            container: inner ? Math.round(inner.width) : 0,
            logo: logo ? Math.round(logo.getBoundingClientRect().width) : 0,
            nav: navBox ? Math.round(navBox.width) : 0,
            button: buttonBox ? Math.round(buttonBox.width) : 0,
          };
        })(),
        wrapped: links.length > 1
          ? new Set(links.map((a) => Math.round(a.getBoundingClientRect().top)))
              .size > 1
          : false,
      };
    });

    const file = path.join(OUT, `co06-header-${width}px.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width, height: 90 } });

    const ok = !header.overlaps && !header.wrapped && header.linkCount === 6;
    results.push({ test: `CO-06 header at ${width}px`, ok, detail: `${header.linkCount} links, bar ${header.barHeight}px, overlap ${header.overlaps}, wrapped ${header.wrapped}` });
    console.log(
      `${ok ? "PASS" : "FAIL"}  header at ${width}px - ${header.linkCount} links, ` +
        `bar ${header.barHeight}px, overlap ${header.overlaps}, wrapped ${header.wrapped}`
    );
    if (!ok) {
      console.log(`      links: ${header.labels.join(" / ")}`);
      const w = header.widths;
      console.log(
        `      widths: container ${w.container}, logo ${w.logo}, nav ${w.nav}, ` +
          `button ${w.button}, needed ${w.logo + w.nav + w.button}`
      );
    }
    await page.close();
  }

  /* --- CO-06: the mobile menu at eight items ----------------------- */

  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 820, isMobile: true, hasTouch: true });
    await page.goto(BASE, { waitUntil: "networkidle0" });
    await page.click('button[aria-label="Open menu"]');
    await new Promise((resolve) => setTimeout(resolve, 400));
    const menu = await page.evaluate(() => {
      const dialog = document.querySelector("dialog");
      const links = [...(dialog?.querySelectorAll('nav[aria-label="Menu"] a') ?? [])];
      return {
        count: links.length,
        labels: links.map((a) => a.textContent?.trim()),
        scrollable: dialog
          ? dialog.querySelector("nav").scrollHeight >
            dialog.querySelector("nav").clientHeight
          : false,
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    await page.screenshot({ path: path.join(OUT, "co06-mobile-menu-8-items.png") });
    const ok = menu.count === 8 && !menu.overflowX;
    results.push({ test: "CO-06 mobile menu at 8 items", ok, detail: `${menu.count} items, scrolls ${menu.scrollable}, overflowX ${menu.overflowX}` });
    console.log(
      `${ok ? "PASS" : "FAIL"}  mobile menu - ${menu.count} items, ` +
        `scrolls internally ${menu.scrollable}, horizontal overflow ${menu.overflowX}`
    );
    if (!ok) console.log(`      items: ${menu.labels.join(" / ")}`);
    await page.close();
  }

  /* --- CO-01: RETIRED 22 November 2026. The price block is gone - no
     prices are published - so there is no card grid to expand. qa.mjs now
     fails the build if a price figure ever comes back. ----------------- */

  await browser.close();
  stopServer();

  const failed = results.filter((r) => !r.ok);
  console.log("");
  console.log(
    failed.length === 0
      ? `All ${results.length} expansion checks passed. Evidence in ${OUT}/`
      : `${failed.length} of ${results.length} failed.`
  );
  process.exitCode = failed.length > 0 ? 1 : 0;
} finally {
  /* --- Always put the data back, and rebuild without the extras ---- */
  stopServer();
  await fs.writeFile(GLOBAL, original, "utf8");
  console.log("Reverted content/global.ts. Rebuilding without the extra items...");
  build();
  console.log("Done. The sixth nav item and third card do not exist in the build.");
}
