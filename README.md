# Acowork — marketing website

AI bookkeeping & accounting automation for SMBs in the US & EU. Brand of **VSH Enterprise Pvt Ltd** · domain **tryacowork.com**. Primary CTA everywhere is **Book a Demo**; no pricing on the site.

Built per `BUILD.md` (the full build brief, also copied to `CLAUDE.md`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/app/globals.css`)
- Hand-rolled **shadcn/ui-style** components on Radix primitives + `class-variance-authority` (`src/components/ui`). `components.json` is present so the `shadcn` CLI still works.
- **react-hook-form** + **zod** (shared client/server schema)
- **Cal.com** inline embed (Calendly fallback) for booking
- **Resend** (email), **HubSpot Forms API** or generic webhook (CRM), **Cloudflare Turnstile** + honeypot (spam)
- **GA4** via `@next/third-parties` gated by **vanilla-cookieconsent** + Google **Consent Mode v2**

> Note: the current `shadcn` CLI is fully interactive (component-library → preset prompts) with no non-interactive flag, so UI components were hand-written in the standard shadcn source style rather than generated. See `BUILD.md` §2 golden rule #2.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in real values (see below)
npm run dev                         # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm run start
```

## Environment variables

See `.env.local.example`. Everything is optional in development — without keys the site still runs:

- **Turnstile** verification is **skipped** if `TURNSTILE_SECRET_KEY` is unset (the form stays testable).
- **Resend / HubSpot / Slack** calls are **logged instead of sent** when their keys are unset.
- **GA4** does not load unless `NEXT_PUBLIC_GA_ID` is a real ID (placeholder `G-XXXXXXX` is ignored).
- **Cal.com** uses `NEXT_PUBLIC_CAL_LINK`; falls back to `NEXT_PUBLIC_CALENDLY_URL`; if neither is set the demo page shows a contact link (never a broken embed).

## Project structure

```
src/
  app/            routes (App Router), api/contact, sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    ui/           shadcn-style primitives (button, input, select, accordion, sheet, …)
    layout/       Header, Footer, MobileNav, StickyMobileCTA, Logo
    sections/     Hero, ProblemGrid, ServicesOverview, ProcessSteps, SecurityBlock, FAQ, CTASection, …
    forms/        ContactForm
    booking/      DemoEmbed (Cal.com)
    consent/      ConsentBanner, CookieSettingsButton
    analytics/    Analytics (GA4)
    seo/          JsonLd (Organization + WebSite)
  lib/            content.ts (all copy), validations.ts, crm.ts, email.ts, turnstile.ts, seo.ts, analytics.ts, utils.ts
```

**All copy lives in `src/lib/content.ts`** — edit there, not in components.

## Things the client must provide (search for `TODO(client)`)

- Final logo/wordmark (currently a text wordmark stand-in).
- Real, named, permissioned **testimonials**, **case studies**, **metrics** (placeholders use `{{tokens}}` and empty states — never fabricated).
- Confirmed **integrations** (QuickBooks/Xero/Sage/…).
- **SOC 2 / ISO 27001** status (Security page states it honestly once confirmed).
- Legal review of **Privacy / Terms / Cookie** pages (`TODO(client/legal)`).
- LinkedIn URL, CRM/scheduler/email accounts, lead-routing owner.

## Deploy (Vercel)

```bash
npm i -g vercel
vercel                 # link/create project
vercel env add ...     # add each var from .env.local.example (Production + Preview)
vercel --prod
```

Then point `tryacowork.com` DNS at Vercel and verify HTTPS. Pre-launch checklist is in `BUILD.md` §13.
