# BUILD.md — Acowork Website (feed this to a terminal coding agent)

> **What this file is.** A single, self-contained build brief for the **Acowork** marketing website (brand of **VSH Enterprise Pvt Ltd**, domain **tryacowork.com**). It is written to be handed to a terminal AI coding agent (e.g. **Claude Code**, Cursor, or any agentic CLI). The agent should read this top to bottom and build the project, working through the **Phase checklist** in order. A human developer can also follow it directly.
>
> **Product in one line.** AI automation built specifically for **accounting & bookkeeping** (reconciliation, invoice/AP-AR processing, month-end close, reporting) for **SMBs in the US & EU**. Brand feel: **corporate, professional, trustworthy, security-first.** Primary CTA everywhere: **Book a Demo.** Secondary: **Contact us.** **No pricing anywhere on the site.**
>
> **Golden rules for the agent.** (1) Do **not** invent testimonials, client logos, certifications, or metrics — use the labelled placeholders in §11 and leave `TODO(client)` markers. (2) Keep the stack exactly as specified in §2 unless a dependency is unavailable, then choose the closest stable equivalent and note it. (3) Everything must be responsive (mobile-first) and meet WCAG 2.2 AA. (4) Use the real copy in §10; don't ship lorem ipsum. (5) After each phase, run the build and fix errors before continuing.

---

## 0. How to use this file (human steps, ~10 minutes)

**Prerequisites (install once):**

```bash
# 1. Node.js 20 LTS or newer (22 LTS recommended). Check:
node --version    # must be v20+ (works for Claude Code and Next.js)
npm --version

# If Node is missing/old, install via nvm (recommended, avoids permission issues):
#   macOS/Linux:  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
#   then:         nvm install 22 && nvm use 22

# 2. Install Claude Code (terminal AI agent). Do NOT use sudo.
npm install -g @anthropic-ai/claude-code
#   (Native installer alternative — macOS/Linux: curl -fsSL https://claude.ai/install.sh | bash )
#   (Windows PowerShell native:  irm https://claude.ai/install.ps1 | iex )
#   Requires a Claude Pro/Max subscription or Anthropic API billing.
#   Official docs: https://code.claude.com/docs/en/setup
```

**Run the build:**

```bash
# 3. Create and enter a project folder
mkdir acowork-site && cd acowork-site

# 4. Save THIS file inside that folder as BUILD.md
#    (also copy it to CLAUDE.md so the agent treats it as project memory)

# 5. Start the agent
claude

# 6. In the agent, paste this instruction:
#    "Read BUILD.md in full. Build the entire Acowork website following it exactly.
#     Begin with Phase 0 (project setup) and proceed phase by phase. After each phase,
#     run `npm run build`, fix any errors, then continue. Use the real copy in section 10
#     and the placeholders in section 11. Ask me only for the values in the .env table."
```

That's it — the agent scaffolds and builds. You provide the secrets in §8 when asked, then deploy per §13.

---

## 1. Goals & success criteria

- **Primary conversion:** booked demos (and demo *show-rate*).
- **Secondary:** contact-form submissions / qualified leads.
- **Non-negotiables:** fast (Core Web Vitals pass), accessible (WCAG 2.2 AA), secure handling of any submitted data, strong **Security & Compliance** story (this is the brand's main differentiator vs competitors), and a frictionless **Book-a-Demo** flow with an **inline** scheduler.

---

## 2. Tech stack (use exactly this)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (latest, App Router) + TypeScript** | `create-next-app` with App Router, TS, ESLint, Tailwind, `src/` dir, import alias `@/*`. |
| Styling | **Tailwind CSS** (whatever version the scaffolder installs) + **shadcn/ui** | Define design tokens (§5) as CSS variables; wire into Tailwind theme. |
| Components | **shadcn/ui** (Button, Input, Textarea, Select, Accordion, Sheet, Label, etc.) + **lucide-react** icons | One icon set only. |
| Forms | **react-hook-form** + **zod** + `@hookform/resolvers` | Client validation + shared schema reused server-side. |
| Scheduler | **Cal.com embed** — `@calcom/embed-react` | Inline embed on `/book-a-demo`. Fallback: Calendly embed (see §6.2). |
| Transactional email | **Resend** (`resend`) | Confirmations + internal notifications. Alt: Postmark/SendGrid. |
| CRM / lead store | **HubSpot Forms API** (server-side submit) OR generic `LEAD_WEBHOOK_URL` | Keep behind one `lib/crm.ts` function so it's swappable. |
| Spam protection | **Cloudflare Turnstile** (`@marsidev/react-turnstile` client + server verify) + honeypot field | Turnstile preferred over reCAPTCHA for EU privacy. |
| Analytics | **GA4** via `@next/third-parties/google` + **Google Consent Mode v2** | Gated by cookie consent. |
| Cookie consent | **vanilla-cookieconsent** (or a small custom banner) | Required for EU; controls Consent Mode + GA load. |
| Fonts | **next/font** — Inter (UI) [+ optional Source Serif 4 for headings] | Self-hosted via next/font, `display: swap`. |
| Hosting | **Vercel** | Auto TLS + CDN; set env vars in dashboard. |

**Scaffold command (Phase 0):**

```bash
npx create-next-app@latest . --ts --app --eslint --tailwind --src-dir --import-alias "@/*" --use-npm
npx shadcn@latest init           # choose defaults; base color "slate"
npx shadcn@latest add button input textarea select label accordion sheet separator sonner
npm install react-hook-form zod @hookform/resolvers lucide-react @calcom/embed-react resend @marsidev/react-turnstile
npm install @next/third-parties
npm install vanilla-cookieconsent
```

---

## 3. Information architecture (pages to build)

**Main nav:** Home · Services (dropdown) · How It Works · Results · Security · About · **[Book a Demo]** (button)

**Routes (App Router):**

```
/                       Home
/about                  About
/services               Services overview
/services/[slug]        Service detail (data-driven; 4 slugs at launch — see §10.4)
/how-it-works           Process (4 steps)
/results                Results / case studies
/security               Security & Compliance  ← differentiator, make it strong
/book-a-demo            Book a Demo (inline Cal.com embed + qualification)
/contact                Contact (form)
/privacy                Privacy Policy
/terms                  Terms of Service
/cookies                Cookie Policy
/thank-you/demo         Post-booking confirmation
/thank-you/contact      Post-contact confirmation
/not-found              404 (app/not-found.tsx)
/api/contact            POST handler (server): validate → verify Turnstile → email + CRM + Slack
/sitemap.xml            app/sitemap.ts
/robots.txt             app/robots.ts
```

**Footer (4 columns + utility row):**
- **Company:** About · How It Works · Results
- **Services:** (the 4 live service pages)
- **Resources:** Security & Compliance · FAQ (anchor) · Blog *(Phase 2)*
- **Get started:** Book a Demo · Contact · hello@tryacowork.com · "Serving the US & EU"
- **Utility:** © {year} VSH Enterprise Pvt Ltd · Privacy · Terms · Cookie Policy · DPA available on request · LinkedIn

---

## 4. Project structure (target)

```
src/
  app/
    layout.tsx                 # root: fonts, <Header/>, <Footer/>, GA, ConsentBanner, StickyMobileCTA
    page.tsx                   # Home
    globals.css                # design tokens + base styles
    about/page.tsx
    services/page.tsx
    services/[slug]/page.tsx   # generateStaticParams from SERVICES data
    how-it-works/page.tsx
    results/page.tsx
    security/page.tsx
    book-a-demo/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
    cookies/page.tsx
    thank-you/demo/page.tsx
    thank-you/contact/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    api/contact/route.ts
  components/
    layout/Header.tsx          # sticky; desktop nav + MobileNav (Sheet); persistent "Book a Demo"
    layout/Footer.tsx
    layout/MobileNav.tsx
    layout/StickyMobileCTA.tsx # fixed bottom bar on mobile, "Book a Demo"
    sections/Hero.tsx
    sections/LogoBar.tsx
    sections/ProblemGrid.tsx
    sections/ServicesOverview.tsx
    sections/ProcessSteps.tsx
    sections/SecurityBlock.tsx
    sections/StatBar.tsx
    sections/Testimonials.tsx
    sections/FAQ.tsx
    sections/CTASection.tsx     # reusable final CTA band
    sections/SectionHeading.tsx
    forms/ContactForm.tsx
    booking/DemoEmbed.tsx       # Cal.com inline embed
    seo/JsonLd.tsx              # renders schema.org scripts
    consent/ConsentBanner.tsx
  lib/
    content.ts                  # ALL copy + nav + footer + services + faqs + metrics (see §10/§11)
    validations.ts              # zod schemas (contact + demo qualification)
    crm.ts                      # submitLead() → HubSpot or webhook
    email.ts                    # sendConfirmation(), notifyTeam() via Resend
    turnstile.ts                # verifyTurnstile(token)
    seo.ts                      # buildMetadata() helper + org/site JSON-LD
    utils.ts                    # cn(), formatters
public/
  logo.svg  logo-mark.svg  og-default.png  favicon.ico
  integrations/ (quickbooks.svg xero.svg sage.svg ...)   # only if licensed/permitted
.env.local.example
README.md
CLAUDE.md   # copy of this file
```

---

## 5. Design system / tokens (implement precisely)

**Palette (HEX). Wire as CSS variables in `globals.css` and map into the Tailwind theme.**

| Token | Value | Use |
|---|---|---|
| `--background` | `#F8FAFC` | page background |
| `--surface` / card | `#FFFFFF` | cards, header |
| `--foreground` | `#0F172A` | headings / primary text |
| `--muted-foreground` | `#475569` | body text |
| `--subtle` | `#94A3B8` | captions, placeholders |
| `--border` | `#E2E8F0` | dividers, inputs |
| `--primary` (brand navy) | `#0B2545` | brand, headers, dark sections |
| `--primary-foreground` | `#FFFFFF` | text on navy |
| `--accent` (teal) | `#0D9488` | **CTAs, links, highlights** |
| `--accent-hover` | `#0F766E` | CTA hover |
| `--accent-foreground` | `#FFFFFF` | text on accent |
| `--success` | `#16A34A` | form success |
| `--warning` | `#D97706` | form warnings |
| `--error` | `#DC2626` | form errors |

> **Accent choice:** teal `#0D9488` is the default (distinctive yet professional, nods to finance without generic "money green"). If the client prefers a more conservative look, swap accent to blue `#2563EB`/hover `#1D4ED8`. Use **one** accent only. All text must meet **AA contrast** (≥4.5:1 body, ≥3:1 large/UI).

**Typography (next/font):**
- **Default:** `Inter` for headings **and** body (clean, legible, professional B2B).
- **Optional gravitas variant:** headings in `Source Serif 4`, body in `Inter` — implement as a single swap point so the client can A/B it.
- Type scale (px): 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60. Body line-height 1.6; heading 1.15–1.25. One `<h1>` per page.

**Spacing & shape:** 8px scale (8/16/24/32/48/64/96). Section padding: 96px desktop top/bottom, 48–56px mobile. Container max-width **1200px**, 16–24px gutters. Border-radius **12px** (cards/buttons), 8px (inputs). Subtle shadows only (no heavy drop shadows). Respect `prefers-reduced-motion`.

**Buttons:** Primary = accent fill + white text (used for "Book a Demo"). Secondary = navy outline or ghost. Min height 44px; visible focus ring (`outline` 2px accent, offset 2px).

---

## 6. Key features (build to this spec)

### 6.1 Contact form — MUST-HAVE (`/contact` → `components/forms/ContactForm.tsx` → `POST /api/contact`)

**Fields:** `name*`, `workEmail*` (email format), `company`, `role`, `companySize` (select: 1–10 / 11–50 / 51–200 / 201–500 / 500+), `country` (select incl. US + EU states + "Other"), `interest` (select: Bookkeeping / Invoices & AP / Accounts Receivable / Month-end close / Reporting / Other), `message*` (min 10 chars), `consent*` (checkbox, links to /privacy), plus a hidden honeypot `company_website` and a Turnstile token. (`*` = required.)

**Client (`ContactForm.tsx`):** react-hook-form + zodResolver using `contactSchema` from `lib/validations.ts`. Inline, accessible errors (`aria-invalid`, `aria-describedby`, `<Label htmlFor>`). Submit disabled until valid + Turnstile solved. On success → `router.push('/thank-you/contact')` and fire GA event `contact_submit`. Show toast (sonner) on error.

**Server (`app/api/contact/route.ts`):**
```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { verifyTurnstile } from "@/lib/turnstile";
import { notifyTeam, sendContactConfirmation } from "@/lib/email";
import { submitLead } from "@/lib/crm";

export async function POST(req: Request) {
  const body = await req.json();
  // 1. honeypot
  if (body.company_website) return NextResponse.json({ ok: true }); // silently drop bots
  // 2. validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  // 3. spam check
  if (!(await verifyTurnstile(body.turnstileToken, req))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }
  // 4. fan-out (do not block user on CRM failure; log + continue)
  const data = parsed.data;
  await Promise.allSettled([ submitLead(data), notifyTeam(data), sendContactConfirmation(data) ]);
  return NextResponse.json({ ok: true });
}
```
- `submitLead` posts to HubSpot Forms API (`HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_GUID`) or to `LEAD_WEBHOOK_URL`. Map fields → CRM properties; tag source = "website-contact", segment by `country` (US vs EU).
- `notifyTeam` emails `CONTACT_TO_EMAIL` (and optionally posts to `SLACK_WEBHOOK_URL`).
- `sendContactConfirmation` emails the user a friendly receipt with response-time expectation.

### 6.2 Book-a-Demo flow — MUST-HAVE (`/book-a-demo` → `components/booking/DemoEmbed.tsx`)

- **Inline** Cal.com embed (never click-out). Implement with `@calcom/embed-react`:
```tsx
"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export function DemoEmbed() {
  useEffect(() => { (async () => {
    const cal = await getCalApi();
    cal("ui", { theme: "light", styles: { branding: { brandColor: "#0D9488" } } });
  })(); }, []);
  return <Cal calLink={process.env.NEXT_PUBLIC_CAL_LINK!} style={{ width: "100%", height: "100%" }} />;
}
```
- **Qualification questions** configured in Cal.com booking fields: name, work email, company, role, company size, country, "What do you want to automate?" (multi-select), accounting software used (optional), notes. (Cal.com captures these; no custom form needed.)
- **On booking** (configure in Cal.com): auto confirmation email + calendar invite with video link (Google Meet/Zoom); **reminders at 24h and 1h** (reduce no-shows); push the booking into the CRM via Cal.com→HubSpot integration or a Cal webhook → reuse `submitLead`. Optional redirect to `/thank-you/demo`. Fire GA `demo_booked` when possible.
- **Page content:** headline + value reminder ("In 30 minutes we'll map 2–3 automations for your books — no obligation"), the embed, a "What happens next" 3-bullet list, a trust strip (security badges + integration logos), and a fallback "Prefer email? Contact us" link.
- **Fallback (if Cal.com not set):** render a Calendly inline widget using `NEXT_PUBLIC_CALENDLY_URL`, else a notice + link to `/contact`. Never render a broken embed.

### 6.3 Other features
- **Cookie consent (MUST for EU):** banner blocks GA until consent; wire to **Consent Mode v2** (default denied → granted on accept). Categories: necessary (always), analytics (opt-in). Link to `/cookies`.
- **FAQ accordions (MUST):** shadcn Accordion on service pages + a global FAQ section on Home; emit `FAQPage` JSON-LD.
- **Trust/logo bar (MUST):** reusable; integration logos only if permitted, else text ("Works with the accounting tools you already use").
- **Sticky CTAs (MUST):** persistent "Book a Demo" in the header; fixed bottom "Book a Demo" bar on mobile.
- **Nice-to-have (Phase 2, scaffold stubs only):** ROI/"hours saved" calculator, live chat, newsletter (double opt-in), blog (MDX), A/B test hooks, exit-intent.

---

## 7. SEO & schema (implement on every page)

- Use the Next.js **Metadata API**. Build a `buildMetadata()` helper in `lib/seo.ts` that takes `{title, description, path, ogImage}` and returns `Metadata` with canonical, Open Graph, and Twitter card. Pull title/description per page from `lib/content.ts`.
- **Title pattern:** `"<Page keyword> | Acowork"` (≤60 chars). **Meta description:** benefit + differentiator + CTA (≤155 chars). Examples in §10.
- **JSON-LD (`components/seo/JsonLd.tsx`):** `Organization` + `WebSite` in root layout; `Service` on each service page; `FAQPage` where FAQs exist; `BreadcrumbList` on deep pages.
- `app/sitemap.ts` (all routes incl. service slugs) and `app/robots.ts` (allow all; reference sitemap). `NEXT_PUBLIC_SITE_URL=https://tryacowork.com` is the canonical base.
- Per-image descriptive `alt`. Semantic landmarks (`header/main/nav/footer`). English at launch (note: add `hreflang` only if EU languages are added in Phase 2).
- **Starter keywords to weave into copy/metadata (validate volumes later):** accounting automation, bookkeeping automation, AI for accountants, automated bookkeeping for small business, automated month-end close, accounts payable automation, accounts receivable automation, invoice processing automation, bank reconciliation automation, QuickBooks/Xero/Sage automation, bookkeeping AI agency.

---

## 8. Environment variables (`.env.local.example` — agent creates this; human fills real values)

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://tryacowork.com

# Booking (Cal.com primary)
NEXT_PUBLIC_CAL_LINK=acowork/demo
# NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/acowork/demo   # fallback only

# Email (Resend)
RESEND_API_KEY=
CONTACT_FROM_EMAIL=hello@tryacowork.com
CONTACT_TO_EMAIL=sales@tryacowork.com

# CRM / lead destination (choose one path)
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_GUID=
# LEAD_WEBHOOK_URL=

# Spam protection (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXX

# Optional
SLACK_WEBHOOK_URL=
```

> Server-only secrets must **not** be prefixed `NEXT_PUBLIC_`. The agent must never hardcode secrets; read from `process.env` only.

---

## 9. Performance, security & accessibility (acceptance bar)

- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1. **Lighthouse ≥ 90** on Performance, Accessibility, Best Practices, SEO.
- Use `next/image` (AVIF/WebP, correct `sizes`, lazy below the fold), `next/font` (swap), minimal third-party JS (GA only after consent), code-split client components, prefer **Server Components** (only forms/embeds/consent are client).
- **Security headers** in `next.config` (or middleware): HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, and a **Content-Security-Policy** that allows Cal.com, GA, and Turnstile domains. Enforce HTTPS (Vercel does TLS). Validate + sanitise all input server-side. No sensitive financial data is collected on the marketing site.
- **A11y (WCAG 2.2 AA):** keyboard-operable nav and forms, visible focus, labelled fields with accessible errors, `alt` text, logical heading order, skip-to-content link, AA contrast, `prefers-reduced-motion` respected, mobile tap targets ≥44px.

---

## 10. Real copy (put in `lib/content.ts`; use verbatim, client can edit later)

**Brand:** Acowork. **Tagline options (pick one for H1, keep others as alternates):**
- "Automate your books, not your judgement."
- "AI bookkeeping automation — built for accuracy and security."
- "Spend less time on the books. Trust the numbers more."

**10.1 Home**
- **Hero H1:** *Automate your books, not your judgement.*
- **Sub:** *Acowork designs and builds secure AI workflows that handle the repetitive accounting work — reconciliation, invoice processing, AP/AR and reporting — so your team can focus on the decisions that matter.*
- **Primary CTA:** Book a Demo · **Secondary link:** See how it works
- **Trust line (under hero):** *Serving SMBs across the US & EU · Your data encrypted & never used to train AI models.*
- **Problem section heading:** *Manual accounting is quietly costing you* — 4 cards:
  1. **Hours lost to data entry** — Re-keying invoices and receipts eats the time your team should spend on analysis.
  2. **Reconciliation backlogs** — Matching transactions by hand is slow and error-prone.
  3. **A close that drags on** — Month-end takes days when it should take hours.
  4. **AI that feels risky** — You want automation, but not at the cost of control over your financial data.
- **Services overview heading:** *What we automate* (4 cards → service pages, §10.4).
- **How it works (condensed):** the 4 steps from §10.3, each one line + "See the full process →".
- **Security block heading:** *Built for the people who guard the numbers* — *Your data is encrypted in transit and at rest, access is tightly controlled, and we never train AI models on your financial data. A human reviews the automation — it's a teammate, not a black box.* → "Read about our security →".
- **Results heading:** *Results that show up in your books* — metrics row + testimonials (PLACEHOLDERS, §11).
- **Final CTA band:** *Ready to automate your books?* — *Book a 30-minute demo and we'll map two or three automations for your workflow, live. No obligation.* [Book a Demo]
- **Meta title:** `AI Bookkeeping & Accounting Automation | Acowork`
- **Meta desc:** `Acowork builds secure AI automations for accounting & bookkeeping — reconciliation, invoices, AP/AR and reporting. Serving SMBs in the US & EU. Book a demo.`

**10.2 About**
- **H1:** *We're the accounting-automation specialists.*
- **Body:** *Most automation agencies are generalists who happen to mention finance. Acowork is built around one thing: automating accounting and bookkeeping safely and accurately for growing businesses. We combine finance know-how with modern AI, and we treat your data with the care it deserves.*
- Sections: story → team (PLACEHOLDER names/photos, §11) → values (Accuracy, Security, Partnership) → who we serve (SMBs, accounting/bookkeeping firms, finance teams) → CTA band.

**10.3 How It Works — 4 steps**
1. **Discovery & assessment** — We map your current accounting workflows and pinpoint where automation saves the most time — before we build anything.
2. **Plan & proposal** — A prioritised plan with expected time savings, clear scope, and data-handling defined up front.
3. **Build & integrate** — We build the automation, connect it to the tools you already use, and test it against real data with a human in the loop.
4. **Optimise & support** — We monitor accuracy, refine over time, and support you as you grow.
- **CTA:** Book a Demo. **Meta title:** `How Acowork Works — Our Automation Process | Acowork`.

**10.4 Services (4 launch pages — data objects with `slug`, `title`, `outcome`, `problem`, `capabilities[]`, `integrationsNote`, `securityNote`, `faqs[]`):**
1. **`bookkeeping-automation`** — *Bookkeeping Automation*. Outcome: *Keep the books current without the manual grind.* Capabilities: automated transaction capture & categorisation, bank-feed reconciliation, exception flagging, audit-ready records.
2. **`invoice-ap-automation`** — *Invoice & Accounts Payable Automation*. Outcome: *From inbox to ledger, automatically.* Capabilities: capture invoices from email/upload, line-item extraction, PO matching, approval routing, sync to your ledger, duplicate/fraud flags.
3. **`accounts-receivable-automation`** — *Accounts Receivable Automation*. Outcome: *Get paid faster, chase less.* Capabilities: invoice generation, automated reminders, payment matching, AR aging insights.
4. **`reporting-dashboards`** — *Financial Reporting & Dashboards*. Outcome: *Always-current numbers, on demand.* Capabilities: automated report generation, real-time dashboards, cash-flow views, period comparisons.
- Each page ends with FAQ + CTA. Meta title pattern: `<Service> | Acowork`.

**10.5 Security & Compliance (`/security`) — make it strong**
- **H1:** *Your financial data, protected.*
- Sections (each a short paragraph + bullets):
  - **Data protection:** encrypted in transit and at rest; least-privilege access; secure integrations.
  - **Privacy & compliance:** GDPR / UK GDPR and CCPA/CPRA aligned; **Data Processing Agreement available on request**; sub-processor transparency; **EU data-residency options**.
  - **We don't train on your data:** your financial data is never used to train AI models.
  - **Human in the loop:** automations are reviewed and controlled, with accuracy checks — not a black box.
  - **Certifications & roadmap:** *(state honestly — `TODO(client)`: SOC 2 / ISO 27001 status. Do not claim certifications you don't hold.)*
- CTAs: Book a Demo · "Request our DPA / security overview" (→ /contact prefilled).

**10.6 FAQ (global + per service). Starter questions:**
- *Will this work with QuickBooks / Xero / Sage?* `TODO(client)` confirm integrations.
- *How do you keep our financial data secure?* (link /security)
- *Do you train AI on our data?* No.
- *How long does it take to go live?* Outline the 4-step process.
- *Is there a human checking the automations?* Yes — human-in-the-loop.
- *What does it cost?* We scope each engagement on a quick call — book a demo.

**10.7 Legal pages:** Generate clear **placeholder** Privacy Policy, Terms, and Cookie Policy with `TODO(client/legal)` markers and correct entity name (VSH Enterprise Pvt Ltd) and contact email. **Do not present these as legal advice.**

---

## 11. Placeholders (do NOT fabricate — leave clearly marked)

- **Testimonials:** 2–3 cards with `TODO(client)` for name, role, company, quote, photo/logo. Render a tasteful empty/placeholder state until provided.
- **Client/integration logos:** only render real logos the client confirms are permitted; otherwise use the text fallback in §6.3.
- **Metrics:** use neutral placeholders like `{{hours_saved}}`, `{{accuracy}}`, `{{time_to_close}}` wired to `lib/content.ts` so the client can drop in **real** numbers. Never invent figures.
- **Team:** `TODO(client)` names/roles/photos.
- **Certifications:** show only what's true.

---

## 12. Phase checklist (agent: do in order; build & fix after each)

- **Phase 0 — Setup:** scaffold (§2), init shadcn, install deps, create `.env.local.example`, copy this file to `CLAUDE.md`, set up `lib/utils.ts` (`cn`), commit.
- **Phase 1 — Design system:** implement tokens in `globals.css` + Tailwind theme (§5); configure next/font (Inter); base button/typography styles; `SectionHeading`, reusable `CTASection`.
- **Phase 2 — Layout:** `Header` (sticky, desktop nav + `MobileNav` Sheet, persistent Book-a-Demo), `Footer` (§3), `StickyMobileCTA`, root `layout.tsx` wiring (fonts, header/footer, GA placeholder, consent placeholder). Populate `lib/content.ts` nav/footer.
- **Phase 3 — Pages & sections:** build Home (all sections, §10.1), then About, Services overview + `[slug]` (from SERVICES data), How It Works, Results, Security, legal pages, thank-you pages, 404. Use real copy (§10) + placeholders (§11). All responsive + AA.
- **Phase 4 — Forms & booking:** `validations.ts` (zod), `ContactForm` + `/api/contact` (§6.1), `lib/crm.ts`/`email.ts`/`turnstile.ts`, Turnstile widget, `/contact` page; `DemoEmbed` (Cal.com) + `/book-a-demo` page (§6.2). Test submit end-to-end with placeholder envs.
- **Phase 5 — SEO, analytics, consent:** `lib/seo.ts` + per-page metadata (§7), `JsonLd` (Organization/WebSite/Service/FAQPage/Breadcrumb), `sitemap.ts`, `robots.ts`; GA4 via `@next/third-parties` gated by `ConsentBanner` + Consent Mode v2; security headers + CSP (§9).
- **Phase 6 — QA & deploy:** run Lighthouse (target ≥90 all), fix a11y issues, cross-browser + mobile check, verify forms/booking end-to-end, no console errors, no broken links. Then deploy (§13).

---

## 13. Deploy (Vercel)

```bash
npm i -g vercel          # if not installed
vercel                   # link/create project
vercel env add ...       # add each var from §8 (Production + Preview)
vercel --prod            # deploy production
# Then point tryacowork.com DNS to Vercel (A/ALIAS or CNAME per Vercel dashboard) and verify HTTPS.
```

**Pre-launch checklist:** all env vars set · Cal.com event type live with reminders + confirmations · HubSpot/webhook receiving leads · Turnstile keys valid · GA4 firing only after consent · sitemap & robots reachable · legal pages reviewed by client/legal · Lighthouse ≥90 · forms + booking tested on a real device.

---

## 14. Assumptions & open items (carry forward — confirm with client)

Brand name **"Acowork"** (from the domain) and wordmark **TODO**. Accent **teal** by default (blue alt). **English-only** at launch. **No pricing** anywhere (demo/contact only). Markets **US + EU** (GDPR/cookie consent + possible EU data residency). **Book a Demo = a no-obligation discovery call.** Integrations (QuickBooks/Xero/Sage/etc.), real testimonials/logos, **SOC 2/ISO status**, CRM/scheduler accounts, lead-routing owner + response SLA, and team bios/photos are all **client-provided** — never invented. Phase-2 items (blog, ROI calculator, live chat, localisation, A/B testing) are stubbed, not built, at launch.
