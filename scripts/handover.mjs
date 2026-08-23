/**
 * Prints what is still outstanding before the site can go live.
 *
 *   npm run handover
 *
 * Spec 13.1 makes every remaining placeholder a launch blocker, and spec 14
 * asks for the client's list to live in one place. This generates that list
 * from the actual content rather than from a hand-written checklist, so it
 * cannot quietly go out of date.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const settings = JSON.parse(read("content/settings.json"));
const blank = (value) => !String(value ?? "").trim();

/**
 * `confirmed` and `deferred` in settings.json record what the client has
 * actually decided. Without them this script could only guess from default
 * values - it would keep reporting a confirmed price as outstanding purely
 * because the figure happens to match the specification's.
 */
const confirmed = new Set(settings.confirmed ?? []);
const deferredKeys = new Set(settings.deferred ?? []);

const items = [];
const deferred = [];

const need = (condition, item, where, key) => {
  if (!condition) return;
  if (key && confirmed.has(key)) return;
  if (key && deferredKeys.has(key)) {
    deferred.push({ item, where });
    return;
  }
  items.push({ item, where });
};

/* --- Business facts ------------------------------------------------ */

need(
  blank(settings.business.officeCity),
  "Office city",
  "About, Security, Home FAQ, Organization schema",
  "officeCity"
);
need(
  blank(settings.business.addressStreet) ||
    blank(settings.business.addressRegion) ||
    blank(settings.business.addressPostalCode),
  "Registered address",
  "Footer, Privacy Policy, Terms, Organization schema",
  "address"
);
need(
  blank(settings.business.teamSizeStatement),
  "Team size sentence, stated honestly",
  "About - the sentence is omitted while this is blank",
  "noTeamSizeSentence"
);
need(
  true,
  "Confirm the registered company name is exactly right",
  "Footer, legal pages, Organization schema",
  "legalName"
);

/* --- Change order 01: the open figures and the sign-off ------------- */

// CO-01 and Section 3 items 1 and 2. Both markers are visible on the site until
// these land, and the site cannot go live with a marker showing.
need(
  !confirmed.has("extraHourlyRate"),
  "The extra-hours hourly rate. $12 is on file as a recommendation - $1,600 for 160 hours is $10 an hour, so $12 is a 20 percent overage premium",
  "The price block's not-included list, on Home and Services. [CONFIRM RATE] is showing"
);
need(
  !confirmed.has("usHoursPremium"),
  "The US-hours coverage premium. NOT yet recommended - $150 on $1,600 is about 9 percent for a night shift and there is no benchmark behind it. Check the real cost first: a published figure is a promise",
  "The price block AND Home FAQ answer 4. Both render from one variable, so they resolve together"
);

// CO-10 and Section 3 item 4.
need(
  !String(settings.professionalStandardsSignOff?.cpaName ?? "").trim() ||
    !String(settings.professionalStandardsSignOff?.date ?? "").trim(),
  "The name and date of the US CPA who signed off the professional-standards wording, in writing",
  "BLOCKS LAUNCH of the Home page and the Security page. Covers /security's obligations section, Home FAQ answer 3, the Security FAQ, and blog articles 2 and 13"
);

// CO-08: the page now offers to send this, so it has to exist.
need(
  !confirmed.has("supervisionProtocol"),
  "The supervision and confidentiality protocol, at least a draft",
  "/security offers to send it on the call. No download is built, per CO-08 - but the offer must be real"
);

// CO-09 and Section 3 item 3.
need(
  !confirmed.has("certificationLines"),
  'A keep-or-delete decision on the three certification lines in "What we do not claim"',
  "/security. The recommendation on file is to keep all three exactly as written - they are true today and the honesty is the persuasive device"
);

/* --- Prices -------------------------------------------------------- */

need(
  true,
  "Confirm or correct the two monthly prices",
  "Home, Services, comparison table, Service schema, social image",
  "monthlyPrices"
);

/* --- Booking ------------------------------------------------------- */

need(
  blank(settings.booking.calLink),
  "Cal.com event link, with the success redirect set to /thank-you-call",
  "/book-a-call - an email fallback shows until then, and the primary conversion is not tracked",
  "booking"
);

/* --- People and proof ---------------------------------------------- */

need(
  !settings.staff.profilesConfirmed || (settings.staff.profiles ?? []).length === 0,
  "Three real staff profiles, with photographs and permission",
  "Home section 5 - the hiring-standard card shows until then",
  "staffProfiles"
);
need(
  (settings.testimonials ?? []).length === 0,
  "Two or three real testimonials with written permission",
  "Home section 9 - the section is hidden until then",
  "testimonials"
);
need(
  blank(settings.about.founderStory),
  "Founder story, 150-250 words in their own words",
  "About - this page should not go live without it"
);

/* --- Photographs --------------------------------------------------- */

need(blank(settings.images.hero), "Hero photograph, 1600x1100", "Home");

/* --- Security ------------------------------------------------------ */

need(
  blank(settings.security.insuranceStatement),
  "Insurance cover, or a decision to leave the item off",
  "Security page - the item is omitted",
  "noInsuranceStatement"
);

/* --- Legal --------------------------------------------------------- */

for (const [file, label] of [
  ["content/legal/privacy-policy.md", "Privacy Policy"],
  ["content/legal/terms.md", "Terms of Service"],
]) {
  const source = read(file);
  const status = source.match(/^status:\s*(\w+)\s*$/m)?.[1] ?? "brief";
  need(
    status !== "live",
    status === "draft"
      ? `${label} - a full draft is in place; it needs your adviser's review, then set status: live`
      : `${label} - the real document, ideally lawyer-checked`,
    `/${file.includes("privacy") ? "privacy-policy" : "terms"}`
  );
}

/* --- Assets and accounts ------------------------------------------- */

const pdf = "public/12-questions-offshore-bookkeeper-checklist.pdf";
need(
  fs.readFileSync(path.join(root, pdf), "latin1").includes("PLACEHOLDER"),
  "The 12-questions checklist PDF (a placeholder is in place)",
  "Footer signup, blog signup, /thank-you-checklist, the autoresponder",
  "checklistPdf"
);

need(
  !process.env.GITHUB_REPO,
  "Set GITHUB_REPO to the repository, e.g. tryacowork/website",
  "/admin - the editor cannot load without it",
  "environmentVariables"
);

const env = [
  ["RESEND_API_KEY", "form notifications and autoresponders"],
  ["NEXT_PUBLIC_GA_ID", "analytics, and all three conversion events"],
  ["LEAD_WEBHOOK_URL", "storing submissions so email is not the only copy"],
  ["GITHUB_OAUTH_CLIENT_ID", "signing in to the editor at /admin"],
  ["GITHUB_OAUTH_CLIENT_SECRET", "signing in to the editor at /admin"],
];
for (const [name, purpose] of env) {
  need(
    !process.env[name],
    `Environment variable ${name} - ${purpose}`,
    "hosting",
    "environmentVariables"
  );
}

/* --- Things a machine cannot check --------------------------------- */

const manual = [
  [
    "Every security control on /security verified line by line",
    "Any statement that is not true must be deleted, not softened. A single inaccurate control is a serious problem if a client relies on it.",
  ],
  [
    "The seven service commitments on /how-it-works approved",
    "They become published promises. A missed published promise is worse than no promise.",
  ],
  [
    "The software lists checked",
    "Delete any package the team has not actually worked in - it is the easiest claim on the site for a buyer to catch.",
  ],
  [
    "The AI-tools answer on /security confirmed",
    "The wording currently on the page is the specification's suggestion and must be confirmed as accurate.",
  ],
  [
    "SPF, DKIM and DMARC set on the sending domain",
    "Without them the autoresponders land in spam. This is invisible until someone complains.",
  ],
  [
    "A test submission of both forms received in Gmail, Outlook and a corporate inbox",
    "All three must arrive in the inbox, not the spam folder.",
  ],
  [
    "All three conversion events seen firing in GA4 real-time",
    "call_booked, pilot_requested, checklist_downloaded. Screenshot each for the handover.",
  ],
  [
    "Blog article 22 matches the Services exclusions list word for word",
    "CO-02 and CO-12. If the two ever differ the Services page wins and the article is corrected.",
  ],
  [
    "The expansion evidence is attached to the handover",
    "Run `node scripts/expansion-tests.mjs` - three header screenshots at 1024/1152/1280 with six nav items, the mobile menu at eight, and the price block with a third card. Required by CO-16.",
  ],
];

/* --- Report -------------------------------------------------------- */

console.log("");
console.log("BEFORE LAUNCH - supplied by the client or set in hosting");
console.log("=".repeat(72));
if (items.length === 0) {
  console.log("Nothing outstanding.");
} else {
  items.forEach(({ item, where }, index) => {
    console.log(`${String(index + 1).padStart(2)}. ${item}`);
    console.log(`    ${where}`);
  });
}

if (deferred.length) {
  console.log("");
  console.log("DEFERRED - decided, and waiting on you rather than on the build");
  console.log("=".repeat(72));
  deferred.forEach(({ item, where }, index) => {
    console.log(`${String(index + 1).padStart(2)}. ${item}`);
    console.log(`    ${where}`);
  });
}

console.log("");
console.log("BEFORE LAUNCH - checks only a person can make");
console.log("=".repeat(72));
manual.forEach(([item, why], index) => {
  console.log(`${String(index + 1).padStart(2)}. ${item}`);
  console.log(`    ${why}`);
});

console.log("");
console.log(
  `${items.length} outstanding, ${deferred.length} deferred, ${manual.length} manual checks.`
);
console.log("Run `node scripts/qa.mjs <url>` against the live site for the rest.");
console.log("");
