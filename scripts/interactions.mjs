/**
 * Behaviour tests for the parts of the site that are easy to break silently.
 *
 *   node scripts/interactions.mjs [baseUrl]
 *
 * The launch checklist in spec 13.2 and 13.5 asks for these to be verified by
 * hand. They are checked here instead, because they are exactly the things that
 * still look fine in a screenshot after they stop working: the mobile menu's
 * focus trap, the forms' validation and redirect, and the FAQ's keyboard
 * behaviour.
 *
 * Exit code is non-zero if anything fails.
 */
import fs from "node:fs/promises";

import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3210";
const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

let failures = 0;
function check(label, pass, detail = "") {
  if (!pass) failures += 1;
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`
  );
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Clicks a checkbox and confirms it took. A coordinate click can land on the
 * wrong element if the page relayouts between measuring and dispatching -
 * which it does here, because a failed submit inserts error messages above the
 * field. Dispatching on the element itself is not subject to that race.
 */
async function check_box(page, selector) {
  await page.evaluate((sel) => {
    const input = document.querySelector(sel);
    if (input && !input.checked) input.click();
  }, selector);
  return page.evaluate(
    (sel) => document.querySelector(sel)?.checked === true,
    selector
  );
}

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

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  headless: true,
  args: ["--disable-gpu"],
});

/* ------------------------------------------------------------------ */
/* The mobile menu (spec 6.1)                                          */
/* ------------------------------------------------------------------ */

{
  console.log("\n-- mobile menu --");
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 820, isMobile: true, hasTouch: true });
  await page.goto(BASE, { waitUntil: "networkidle0" });

  await page.click('button[aria-label="Open menu"]');
  await wait(300);

  check(
    "opens as a modal dialog",
    await page.evaluate(() => {
      const dialog = document.querySelector("dialog");
      return Boolean(dialog?.open && dialog.matches(":modal"));
    })
  );

  check(
    "prevents body scroll while open",
    await page.evaluate(() => document.documentElement.style.overflow === "hidden")
  );

  /**
   * Focus containment. Tabbing round a modal dialog passes through <body> at
   * the wrap point in Chrome, which is not an escape - what matters is that
   * focus never lands on an interactive element outside the dialog.
   */
  const escaped = [];
  for (let i = 0; i < 25; i += 1) {
    await page.keyboard.press("Tab");
    const outside = await page.evaluate(() => {
      const dialog = document.querySelector("dialog");
      const active = document.activeElement;
      if (!dialog || !active) return null;
      if (dialog.contains(active)) return null;
      if (active === document.body || active === document.documentElement) return null;
      return `${active.tagName} ${(active.textContent ?? "").trim().slice(0, 30)}`;
    });
    if (outside) escaped.push(outside);
  }
  check(
    "traps focus over 25 tabs",
    escaped.length === 0,
    escaped.length ? `escaped to ${escaped[0]}` : "never left the dialog"
  );

  await page.keyboard.press("Escape");
  await wait(300);
  check(
    "closes on Escape",
    await page.evaluate(() => !document.querySelector("dialog").open)
  );
  check(
    "releases the scroll lock",
    await page.evaluate(() => document.documentElement.style.overflow === "")
  );
  check(
    "returns focus to the hamburger",
    await page.evaluate(
      () => document.activeElement?.getAttribute("aria-label") === "Open menu"
    )
  );

  await page.close();
}

/* ------------------------------------------------------------------ */
/* The pilot form (spec 8.1 and 8.3)                                   */
/* ------------------------------------------------------------------ */

{
  console.log("\n-- free pilot form --");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/free-pilot`, { waitUntil: "networkidle0" });

  await page.click('form button[type="submit"]');
  await wait(300);

  const empty = await page.evaluate(() => ({
    errors: document.querySelectorAll('[id$="-error"]').length,
    focused: document.activeElement?.getAttribute("name"),
    summary: document.querySelector('[role="alert"]')?.textContent?.trim() ?? "",
    invalid: document.querySelectorAll('[aria-invalid="true"]').length,
  }));

  check("an empty submit shows field errors", empty.errors >= 7, `${empty.errors} shown`);
  check(
    "focus moves to the first field with an error",
    empty.focused === "name",
    `focused: ${empty.focused}`
  );
  check(
    "an error summary is announced",
    empty.summary.includes("check the fields"),
    empty.summary.slice(0, 40)
  );
  check("bad fields are marked aria-invalid", empty.invalid >= 7, `${empty.invalid}`);

  await page.type('input[name="name"]', "Jane Hendricks");
  await page.type('input[name="workEmail"]', "not-an-email");
  await page.click('form button[type="submit"]');
  await wait(250);
  check(
    "a malformed email gets the format message, not the empty one",
    await page.evaluate(() =>
      document.body.innerText.includes("does not look like a valid email address")
    )
  );

  await page.evaluate(() => {
    document.querySelector('input[name="workEmail"]').value = "";
  });
  await page.type('input[name="workEmail"]', "jane@hendrickscpa.com");
  await page.type('input[name="firmName"]', "Hendricks CPA");
  await page.select('select[name="state"]', "Texas");
  check("ticking a software box registers", await check_box(page, 'input[name="software"][value="Xero"]'));
  await page.type('textarea[name="scope"]', "Two years of unreconciled bank accounts.");
  await page.select('select[name="hours"]', "20 to 40");
  check("ticking consent registers", await check_box(page, 'input[name="consent"]'));

  await page.click('form button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 20000 }).catch(() => {});
  await wait(500);
  check(
    "a valid submit redirects to /thank-you",
    page.url().endsWith("/thank-you"),
    page.url()
  );

  await page.close();
}

/* ------------------------------------------------------------------ */
/* The checklist form (spec 8.2)                                       */
/* ------------------------------------------------------------------ */

{
  console.log("\n-- checklist form --");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/about`, { waitUntil: "networkidle0" });

  await page.type("#checklist-footer-firstName", "Jane");
  await page.type("#checklist-footer-workEmail", "jane@hendrickscpa.com");
  check(
    "ticking the checklist consent registers",
    await check_box(page, "#checklist-footer-consent")
  );
  // Clear the timing check, which discards anything submitted in under 2.5s.
  await wait(2600);
  await page.click('form:has(#checklist-footer-consent) button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 20000 }).catch(() => {});
  await wait(400);
  check(
    "submitting redirects and carries the form location",
    page.url().includes("/thank-you-checklist?from=footer"),
    page.url()
  );

  await page.close();
}

/* ------------------------------------------------------------------ */
/* The FAQ accordion (spec 4.4.4)                                      */
/* ------------------------------------------------------------------ */

{
  console.log("\n-- FAQ accordion --");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/security`, { waitUntil: "networkidle0" });

  const first = "h3 button[aria-expanded]";
  const expanded = () =>
    page.evaluate(
      (selector) =>
        document.querySelector(selector).getAttribute("aria-expanded") === "true",
      first
    );

  check("items start closed on inner pages", (await expanded()) === false);
  await page.focus(first);
  await page.keyboard.press("Enter");
  await wait(200);
  check("Enter opens an item", await expanded());
  await page.keyboard.press("Space");
  await wait(200);
  check("Space closes it", (await expanded()) === false);

  // The Home page opens its first item by default (spec 7.1.11).
  await page.goto(BASE, { waitUntil: "networkidle0" });
  check("the Home page opens its first item", await expanded());

  await page.close();
}

await browser.close();

console.log("");
console.log(
  failures === 0 ? "All interaction checks passed." : `${failures} check(s) failed.`
);
process.exit(failures > 0 ? 1 : 0);
