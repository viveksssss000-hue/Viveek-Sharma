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
/* The logo lockup (change order 01, CO-07 deviation)                  */
/* ------------------------------------------------------------------ */

/**
 * The client chose "tryACOwork" and the lockup is therefore built from live
 * text with the ACO in its own span - which CO-07 forbade, on the grounds that
 * a wordmark rebuilt in markup "will break at some size".
 *
 * That was a fair objection, so these checks stand in for the guarantee an SVG
 * master would have given: at both sizes the lockup is used, in both colour
 * variants, the ACO must carry the accent colour, the whole lockup must stay on
 * one line, and it must not overflow its container.
 */
{
  console.log("\n-- logo lockup --");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle0" });

  const logos = await page.evaluate(() => {
    const read = (root) => {
      // The header renders two lockups - one for mobile, one for desktop, one
      // of them display:none. Take the VISIBLE one, or the test measures a
      // hidden element and reports zero line boxes.
      const lockup = [
        ...(root?.querySelectorAll('[role="img"][aria-label="tryACOwork"]') ?? []),
      ].find((el) => el.getClientRects().length > 0);
      if (!lockup) return null;

      const spans = [...lockup.querySelectorAll("span")];
      // Two elements read "ACO": the square mark, which is a direct child of
      // the lockup, and the acronym inside the wordmark, whose parent also
      // contains "try". They carry DIFFERENT colours, so they must be told
      // apart - matching whichever comes first tests the wrong one.
      const markAco = spans.find(
        (el) => el.parentElement === lockup && el.textContent?.trim() === "ACO"
      );
      const wordAco = spans.find(
        (el) =>
          el.textContent?.trim() === "ACO" &&
          el !== markAco &&
          (el.parentElement?.textContent ?? "").includes("try")
      );

      const box = lockup.getBoundingClientRect();
      const parent = lockup.parentElement?.getBoundingClientRect();
      return {
        label: lockup.getAttribute("aria-label"),
        text: lockup.textContent?.replace(/\s+/g, ""),
        markColour: markAco ? getComputedStyle(markAco).color : null,
        wordAcoColour: wordAco ? getComputedStyle(wordAco).color : null,
        lines: lockup.getClientRects().length,
        height: Math.round(box.height),
        overflows: parent ? box.width > parent.width + 1 : false,
      };
    };
    return {
      header: read(document.querySelector("header")),
      footer: read(document.querySelector("footer")),
    };
  });

  const OCHRE = "rgb(154, 107, 34)"; // #9a6b22, the accent on light grounds
  const OCHRE_LIGHT = "rgb(224, 169, 92)"; // #e0a95c, the accent on dark
  const INK = "rgb(27, 26, 23)"; // #1b1a17

  for (const [where, logo] of Object.entries(logos)) {
    if (!logo) {
      check(`${where} lockup is present`, false, "not found");
      continue;
    }
    check(
      `${where} lockup reads tryACOwork`,
      logo.text === "ACOtryACOwork",
      logo.text ?? ""
    );
    check(`${where} lockup is announced as tryACOwork`, logo.label === "tryACOwork");

    // The header uses the ink variant, the footer the reversed one, and the
    // acronym takes a different accent in each.
    const expected = where === "footer" ? OCHRE_LIGHT : OCHRE;
    check(
      `${where} wordmark ACO is the right accent`,
      logo.wordAcoColour === expected,
      `${logo.wordAcoColour ?? "none"}, expected ${expected}`
    );
    check(
      `${where} mark ACO is the right accent`,
      logo.markColour === (where === "footer" ? INK : OCHRE_LIGHT),
      logo.markColour ?? "none"
    );

    check(`${where} lockup stays on one line`, logo.lines === 1, `${logo.lines} line(s)`);
    check(`${where} lockup does not overflow`, !logo.overflows);
  }

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
