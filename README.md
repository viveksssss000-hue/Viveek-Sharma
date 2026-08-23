# tryACOwork website

Marketing site for **tryACOwork** - dedicated offshore bookkeepers for US CPA
and accounting firms. Built to `tryACOwork_Website_Build_Specification.docx`
v1.0 (22 August 2026); section references throughout the code point back to it.

The site has exactly one job: **get a qualified US firm owner to book a
20-minute call.** Everything else exists to serve that, or to remove a reason
not to.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local     # nothing is mandatory to run locally
npm run dev                          # http://localhost:3000
```

```bash
npm run build && npm run start        # production build
npm run typecheck                     # tsc --noEmit
npm run lint
npm run handover                      # what is still outstanding before launch
npm run qa http://localhost:3000      # the automated launch checks
npm run interactions http://localhost:3000   # menu, forms and FAQ behaviour
npm run shots http://localhost:3000 shots 360   # full-page screenshots at 360px
node scripts/expansion-tests.mjs evidence        # CO-06 and CO-01 expansion proof
```

## Change order 01

The site is built to specification v1.0 **plus change order 01** (23 August
2026), which alters seventeen things. `content/change-order-01-signoff.md`
records what was done for each, and is the document to return with the handover.

Three of its rules are enforced in code rather than trusted to memory:

- **Two rates are deliberately unresolved.** The extra-hours rate and the
  US-hours premium still render `[CONFIRM RATE]` on the page. Both come from
  `usdRate()` in `src/lib/site.ts`, so a figure can never appear without its
  marker, and the US-hours premium is one string shared by the price block and
  Home FAQ answer 4 - they cannot disagree, and they resolve together.
- **Two URLs are reserved and must stay unbuilt** -
  `/audit-support-for-cpa-firms` and `/us-gaap-ifrs`. See `reservedRoutes` in
  `src/content/global.ts`. Both must 404 and appear in no sitemap, nav or footer.
- **Restricted words.** "audit" and its forms may appear on the launch pages only
  in five approved contexts; "workpaper" nowhere; the ACO expansion nowhere at
  all, including meta tags and structured data; and "compliant" never near a
  security framework. `npm run qa` fails on any of it.

`scripts/expansion-tests.mjs` proves the two structural requirements - that the
header survives a sixth nav item at 1024/1152/1280px, and that the price block
takes a third card. It applies the data edits, rebuilds, screenshots, and puts
the originals back, so neither ever exists in a shipped build.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript | Every page is statically prerendered; the two form endpoints are the only server routes. See **The JavaScript budget** below for the cost of this choice. |
| Styling | Tailwind CSS v4, CSS-first `@theme` tokens | The design system lives in `src/app/globals.css` as tokens, so no page reinvents a colour or a spacing step. |
| Fonts | Spectral + Archivo, self-hosted by `next/font` | No request ever leaves the domain for a font, so there is no font CDN in the CSP and no render-blocking third party. |
| Icons | Hand-written inline SVG | No icon font, no icon library. 1.75px stroke, `currentColor`. |
| Forms | One hand-written validator, shared client and server | A field cannot be validated one way in the browser and another on the server - and it costs 1KB instead of the 74KB gzipped that a schema library plus a form library did. |
| Email | Resend | Not the web server's mail function, which lands in spam. |
| Booking | Cal.com inline embed | It can redirect after a booking, which is what makes the primary conversion trackable. |
| Analytics | GA4, gated on consent | Nothing loads until the visitor accepts. |
| Consent | ~60 lines in `src/lib/consent.ts` | A consent platform costs 100KB+ for a two-button choice. |
| Editing | Sveltia CMS at `/admin`, self-hosted | The client publishes and edits without a developer, and content stays in the repo. |
| Spam | Honeypot + timing check | No visible CAPTCHA - it costs conversions. |

Deliberately **not** installed: jQuery, a CSS framework beyond tokens, a chat
widget, a heatmap tool, a tag manager, a consent platform, an icon library, a
form library, a schema library, a dialog library. Twelve runtime dependencies in
total, and the site's own JavaScript is about 8KB gzipped.

## The JavaScript budget

**This is the one specification requirement the site does not meet, and it
cannot be met with this stack. It is a decision, not an oversight.**

Spec 9.1 sets a hard limit: *total JavaScript shipped to the browser stays under
100KB compressed.* Measured on the production build, every page ships about
**205 to 212KB gzipped** (about 172 to 185KB brotli). Where it goes:

| Piece | gzipped |
| --- | --- |
| React DOM and the scheduler | ~147KB |
| The Next.js App Router runtime | ~47KB |
| Turbopack runtime | ~4KB |
| **This site's own code** | **~8KB** |

So 96 percent of it is the framework. There is no code here to delete: the
specification's own recommendation was a static site generator (Astro or
Eleventy), which ships almost no JavaScript, and Next.js was chosen instead for
the working form, email, consent and analytics plumbing.

What was done to get it as low as it goes:

- Replaced react-hook-form and zod with one hand-written validator shared by the
  browser and the API route. Saved 74KB gzipped on the pilot page.
- Replaced the dialog library behind the mobile menu with the native `<dialog>`
  element. Saved 30KB gzipped on every page, and the focus trapping is now the
  browser's rather than a library's.
- Wrote the consent banner (~60 lines) instead of installing a consent platform,
  and the icons as inline SVG instead of an icon library.
- Every page is statically prerendered, so no JavaScript is needed to produce
  the HTML - it is all hydration.

**The options from here**, in the client's hands:

1. **Accept it.** The pages are static HTML that renders before any JavaScript
   arrives, so the visible content is fast regardless; the budget is about
   interactivity and battery, not first paint. This is the recommendation.
2. **Rebuild the marketing pages in Astro** and keep this codebase's content,
   design tokens and API routes. That would land near 10KB and meet the
   specification, at the cost of a second build system and re-doing the client
   behaviour that Astro islands would then need.

`npm run qa` reports this as `BUDGET` rather than `FAIL`, so a real regression
is never hidden behind a known shortfall.

## Where things live

```
content/                      Everything the client edits (the CMS writes here)
  settings.json               Prices, office city, staff, testimonials, founder story
  posts/*.md                  Blog articles
  legal/*.md                  Privacy Policy, Terms
  blog-plan.md                The content plan, keyword clusters and the ONLY
                              statistics an article may cite, with attributions
  change-order-01-signoff.md  What was done for each of the seventeen changes
  admin-config.template.yml   Source for the /admin config (built with GITHUB_REPO)

src/content/                  Page copy, as typed modules - one file per page
  global.ts                   Nav, footer, price block, closing band, microcopy
  seo.ts                      Title tags and meta descriptions (fails the build on a duplicate)

src/lib/
  settings.ts                 Reads content/settings.json; turns blanks into honest gaps
  site.ts                     Names and types those values; derives the annual price
  analytics.ts                The nine tracked events, by name
  posts.ts / legal.ts         Markdown loading
  validations.ts              The two form validators and the spam checks

src/components/
  layout/                     Header, MobileNav, Footer, StickyMobileCTA, Logo
  sections/                   One component per repeated section pattern
  forms/                      Field primitives, PilotForm, ChecklistForm
  seo/JsonLd.tsx              All structured data

scripts/
  qa.mjs                      The automated half of the launch checklist
  interactions.mjs            Browser tests: mobile menu, forms, FAQ keyboard
  expansion-tests.mjs         Proof the header takes 6 nav items and the price
                              block takes a 3rd card (change order CO-06, CO-01)
  handover.mjs                What is still outstanding
  shots.mjs                   Full-page screenshots at any width
  make-placeholder-pdf.mjs    Regenerates the checklist placeholder
```

### The design system

`src/app/globals.css` is the single source. Palette and type come from the
tryACOwork brand kit - Ink, Ochre, Paper, Sand, with Spectral and Archivo - and
the *rules* come from specification section 4. Measured contrast ratios are
written into the file beside each token.

Two rules that hold the whole thing together:

- **Ochre means action.** If something is ochre it is clickable and it is the
  most important thing on screen. One ochre button per viewport, plus the fixed
  header button. Using ochre for decoration destroys the system.
- **Fern is everything else** - links, icons, dark bands - so ochre never has to
  do two jobs.

Spacing is Tailwind's `1 2 3 4 6 8 12 16 24 32`, which maps exactly to the
specification's 4/8/12/16/24/32/48/64/96/128 scale. Any other value is a bug.

## Editing the site

**The editor is at `/admin`.** Sign in with GitHub; saving commits to the
repository, which triggers a deploy. It covers:

- **Blog articles** - write, preview, publish. Drafts are not public, not listed
  and not in the sitemap.
- **Site settings** - prices, office city, contact details, the Cal.com link,
  staff profiles, testimonials, the founder story, photographs.
- **Legal pages** - Privacy Policy and Terms.

Longer marketing prose lives in `src/content/*.ts`. The specification supplies
that copy verbatim and it changes rarely; the things that *do* change are all in
the editor.

### Setting up the editor

1. Create a **GitHub OAuth App** (Settings → Developer settings → OAuth Apps):
   - Homepage URL: `https://www.tryacowork.com`
   - Authorization callback URL: `https://www.tryacowork.com/api/admin/callback`
2. Set `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` in hosting.
   For a public repository also set `GITHUB_OAUTH_SCOPE=public_repo` - narrower
   is better, because this token can write to the repository.
3. Set `backend.repo` in `public/admin/config.yml` to `owner/repo`.

The OAuth handshake runs in this site's own API routes
(`src/app/api/admin/`), so there is no third-party auth proxy holding a token
that can write to the repository. `/admin` is `noindex` and sits on its own,
tighter Content-Security-Policy.

**Updating the editor.** The bundle is committed at
`public/admin/sveltia-cms.js` rather than loaded from a CDN, because the site's
CSP forbids third-party scripts and a CDN outage should not take the editor
down. To update it, re-download the file and commit it.

## Honesty guards

The specification is emphatic that this site must not claim anything untrue -
the buyer is an accountant who checks things for a living, and a false trust
signal is both a legal risk and a credibility risk. Several of those rules are
enforced in code rather than left to discipline:

- **No invented people.** Staff profiles render only when
  `staff.profilesConfirmed` is on *and* at least one real profile exists.
  Otherwise the page shows the hiring standard, which invents nobody. The
  specification's example profiles are deliberately not seeded in the data file.
- **No written testimonials.** The section disappears entirely when the list is
  empty. There is no placeholder quote to accidentally ship.
- **No stock photography.** `PlaceholderImage` renders a warm-grey block with the
  photographic brief on it. There is no stock image in the repository and no way
  to add one by accident.
- **No certification badges.** None exist in the codebase. `/security` says
  plainly what the firm does *not* hold.
- **No vague claims.** Where a fact is missing - the insurance cover, the pilot
  limit, the team size - the sentence is omitted rather than softened.
- **No fabricated structured data.** No `aggregateRating`, no `foundingDate`, no
  awards.
- **Banned words fail QA.** `scripts/qa.mjs` fails the build on any word from
  Appendix C.1 appearing in rendered text.

## Analytics

Three key events, and only these three are marked as conversions in GA4:

| Event | Fires on |
| --- | --- |
| `call_booked` | `/thank-you-call` - the primary conversion |
| `pilot_requested` | `/thank-you` after the pilot form |
| `checklist_downloaded` | `/thank-you-checklist` |

Plus `cta_click_book_call`, `cta_click_pilot`, `pricing_section_view`,
`faq_open`, `scroll_75`, `outbound_click` for engagement.

All three conversions fire on a **page load after a redirect**, never on a form
callback. For the booking that is the only reliable method: the Cal.com event
must be configured to redirect to `/thank-you-call`. The embed also listens for
`bookingSuccessful` as a second net, but the redirect is what carries the
tracking, because a vendor can rename an event without notice.

## SEO

- One primary keyword per page (`src/content/seo.ts`). Never the same phrase on
  two pages - they would compete.
- Unique title and meta description per page, enforced at build time.
- Self-referencing canonicals. Paginated blog pages canonicalise to themselves,
  not to page one.
- `noindex` on the three thank-you pages and the 404, and nowhere else. They are
  **not** blocked in `robots.txt`: a crawler that is blocked cannot read the
  `noindex` tag, which is what actually keeps them out of the index.
- Structured data: Organization, WebSite, Service (with the published price),
  FAQPage, BreadcrumbList, Article, Person.
- `/sitemap.xml` and `/feed.xml` update themselves when an article is published.

### Redirects from the old site

The previous site sold AI workflow automation. `next.config.ts` maps its URLs to
the closest page here with permanent redirects, in a single hop - `/services`,
`/services/*`, `/pricing`, `/book-a-demo`, `/contact`, `/examples`, `/results`,
`/industries`, `/industries/*`, `/privacy`, `/cookies` and the two old
thank-you paths. Anything else falls through to the 404, which is correct for a
URL with no equivalent.

## Deploying

Built for Vercel; any Node host works.

```bash
npx vercel                 # link the project
npx vercel env add ...     # every variable from .env.local.example
npx vercel --prod
```

Then:

1. Point `tryacowork.com` DNS at the host and confirm HTTPS.
2. **Redirect the apex to `www`** in a single hop. `www` is canonical
   (`NEXT_PUBLIC_SITE_URL`); pick one and never change it.
3. Password-protect the staging deployment and set `NEXT_PUBLIC_STAGING=true`
   there, so `robots.txt` blocks it and analytics never sees it.
4. Set SPF, DKIM and DMARC on the sending domain, then send a test submission of
   both forms to a Gmail, an Outlook and a corporate address and confirm all
   three land in the inbox. This is the most common launch failure and it is
   invisible until someone complains.
5. Verify both host variants in Search Console and submit the sitemap.
6. Set up uptime monitoring (UptimeRobot, five-minute checks).

## Before launch

Run `npm run handover` for the live list. It is generated from the content, so
it cannot go stale. In short:

- The client supplies the prices, the office city, the registered address, the
  team-size sentence, real staff profiles, real testimonials, the founder story
  and photograph, the team photograph, the hero photograph, the checklist PDF,
  and the two legal documents.
- Every security control on `/security` must be verified line by line. **Any
  statement that is not true must be deleted, not softened.**
- The seven service commitments on `/how-it-works` are published promises and
  must be achievable.
- The software lists must have anything the team has not used removed.

Then run `npm run qa https://www.tryacowork.com` and
`npm run interactions https://www.tryacowork.com` against the live site.
`qa` checks: one H1 per page and no more than two lines of it on desktop; no
skipped heading levels; alt text on every image; a label on every field; the
skip link and landmarks; 44px touch targets; no horizontal scrolling at
360/390/768/1024/1280/1440; unique titles and descriptions; canonicals, Open
Graph and JSON-LD; correct `noindex`; every internal link resolving; a real 404;
the JavaScript budget; banned words from Appendix C.1; em and en dashes, which
should always be plain hyphens; and any placeholder still on a page.

`interactions` drives a real browser to check the things that still look fine in
a screenshot after they stop working: the mobile menu's focus trap, Escape and
focus return; both forms' validation, focus management and redirect; and the FAQ
accordion's keyboard behaviour.

A non-zero exit from either means not ready.

## Accessibility

WCAG 2.2 AA is a hard requirement, not an aspiration. Contrast ratios are
computed and recorded in `globals.css`. The FAQ accordion is a real `<button>`
inside a heading with `aria-expanded`/`aria-controls`, and **works with
JavaScript disabled** - a `<noscript>` stylesheet forces every answer open, so
no JavaScript means no hidden content rather than a broken widget. The mobile
menu traps focus, closes on Escape, returns focus to the hamburger and locks
body scroll. All motion is wrapped in `prefers-reduced-motion`.

Before handover, read the Home page and the pilot form top to bottom with a real
screen reader (VoiceOver or NVDA). No automated tool substitutes for that.
