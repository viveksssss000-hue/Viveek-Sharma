import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { PriceBlock } from "@/components/sections/PriceBlock";
import { Section, Eyebrow } from "@/components/sections/Section";
import { StaffSection } from "@/components/sections/StaffSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ArrowRightIcon, CheckIcon, iconByName } from "@/components/ui/icons";
import { HeroCtas } from "@/components/sections/HeroCtas";
import { FaqSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import {
  dayOneWork,
  faqHeading,
  faqs,
  hero,
  problem,
  securityBand,
  threeSteps,
} from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.home);

/**
 * Home page (spec 7.1). Eleven sections, in the order the specification sets.
 *
 * The page is long on purpose: the visitor will scroll if each section earns
 * the next one, and section 2.2 of the specification maps each of the five
 * buyer objections onto the section that answers it. The order is the argument,
 * so sections should not be resequenced without revisiting that mapping.
 *
 * Backgrounds alternate paper and sand down the page, with exactly one forest
 * band (security) before the closing band (spec 4.4.3).
 */
export default function HomePage() {
  return (
    <>
      {/* 1 - Hero (spec 7.1.2). 128px top padding on desktop.

          Two layouts, chosen by whether a real photograph exists:

          WITH a photograph, the specification's two-column split. 58/42 rather
          than its 55/45, and a 48px gap rather than 64px - at 55/45 the text
          column comes out at 572px, which forces this 46-character H1 onto
          three lines at 56px, against the two-line rule in spec 4.2.2.

          WITHOUT one, a single text-led column rather than a grey rectangle
          where a face should be. Spec 4.5 forbids stock photography and
          AI-generated people outright, so there is nothing legitimate to put in
          that space until a real photograph of the real team exists - and a
          confident text hero reads far better than an apology for a missing
          image. Drop a photograph into settings and the two-column layout
          returns on its own. */}
      <section className="bg-paper">
        <div className="gutter mx-auto max-w-content pt-16 pb-16 lg:pt-32 lg:pb-24">
          <div
            className={
              hero.image.src
                ? "grid items-center gap-12 lg:grid-cols-[58fr_42fr] lg:gap-12"
                : "max-w-[860px]"
            }
          >
            <div>
              <Eyebrow>{hero.eyebrow}</Eyebrow>

              {/* The only H1 on the page. */}
              <h1 className="mt-4">{hero.h1}</h1>

              <p className="mt-6 measure text-lead text-ink-muted">
                {hero.intro}
              </p>

              {/* The price line sits between the intro and the buttons, with a
                  3px ochre underline under the dollar figure only. */}
              <p className="mt-8 text-[19px] font-semibold text-fern">
                {hero.priceLine.before}
                <span
                  data-price
                  className="price-figure underline decoration-ochre decoration-[3px] underline-offset-4"
                >
                  {hero.priceLine.figure}
                </span>
                {hero.priceLine.after}
              </p>

              <HeroCtas />

              <p className="mt-4 text-small text-ink-muted">
                {hero.reassurance.before}
                <Link
                  href={hero.reassurance.linkHref}
                  className="text-fern underline decoration-2 underline-offset-2 hover:decoration-[3px]"
                >
                  {hero.reassurance.linkLabel}
                </Link>
                {hero.reassurance.after}
              </p>
            </div>

            {/* Never lazy-loaded and carrying priority, so the hero image is
                the Largest Contentful Paint element rather than a delay. */}
            {hero.image.src && (
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full rounded-[12px] object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* 2 - The problem, in her words. No icons: just words, so it reads like
          a letter rather than a brochure. */}
      <Section tone="sand">
        <div className="mx-auto max-w-text text-center">
          <h2>{problem.h2}</h2>
          <p className="mx-auto mt-4 measure text-lead text-ink-muted">
            {problem.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-12">
          {problem.columns.map((column) => (
            <div key={column.quote}>
              <h3 className="font-serif text-h3 font-semibold">
                {column.quote}
              </h3>
              <p className="mt-4 text-body text-ink-muted">{column.body}</p>
              {/* The attribution is what makes the claim credible to an
                  accountant. It must never be removed to tidy the layout. */}
              {column.sources.length > 0 && (
                <p className="mt-3 text-small text-ink-muted">
                  {column.sources.map((source) => `(${source})`).join(" ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-text">
          <p className="measure text-body">{problem.closing.body}</p>
          <p className="mt-3 text-small text-ink-muted">
            ({problem.closing.source})
          </p>
        </div>
      </Section>

      {/* 3 - How it works, in three steps. */}
      <Section tone="paper">
        <h2 className="max-w-text">{threeSteps.h2}</h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-12">
          {threeSteps.steps.map((step, index) => {
            const Icon = iconByName[step.icon as keyof typeof iconByName];
            return (
              <li key={step.title} className="relative">
                {/* A large numeral in sand sitting behind the step title. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 left-0 select-none font-serif text-[48px] font-semibold leading-none text-sand-deep"
                >
                  {index + 1}
                </span>
                <div className="relative">
                  <Icon size={28} className="text-fern" />
                  <h3 className="mt-4 font-sans text-h4 font-semibold">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="mt-3 text-body text-ink-muted">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <Link
          href={threeSteps.link.href}
          className="group mt-12 inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {threeSteps.link.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </Section>

      {/* 4 - The price block. The strongest single differentiator on the site. */}
      <PriceBlock page={routes.home} />

      {/* 5 - Meet the kind of bookkeeper you would hire. */}
      <StaffSection />

      {/* 6 - What the bookkeeper actually does. */}
      <Section tone="sand">
        <h2 className="max-w-text">{dayOneWork.h2}</h2>

        <div className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
          {dayOneWork.columns.map((column, index) => (
            <ul key={index} className="grid content-start gap-4">
              {column.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon size={20} className="mt-1 text-fern" />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="mt-10 measure text-body text-ink-muted">
          {dayOneWork.closing}
        </p>
      </Section>

      {/* 7 - Security, in plain English. The one forest band on this page. The
          dark ground signals "this part is serious" without a lock icon, and
          there are deliberately no certification badges (spec 3.7). */}
      <Section tone="forest">
        <h2 className="max-w-text">{securityBand.h2}</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-12">
          {securityBand.columns.map((column) => (
            <div key={column.h4}>
              <h3 className="font-sans text-h4 font-semibold text-paper">
                {column.h4}
              </h3>
              <p className="mt-3 text-body text-paper/85">{column.body}</p>
            </div>
          ))}
        </div>

        <Link
          href={securityBand.link.href}
          className="group mt-12 inline-flex min-h-11 items-center gap-2 text-paper underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {securityBand.link.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </Section>

      {/* 8 - The comparison table. */}
      <ComparisonTable />

      {/* 9 - Testimonials. Renders nothing until real, attributed quotes with
          written permission exist (spec 3.7). */}
      <Testimonials />

      {/* 10 - FAQ. First item open. Carries FAQPage structured data. */}
      <FAQ heading={faqHeading} faqs={faqs} firstOpen />
      <FaqSchema faqs={faqs} />

      {/* 11 - The shared closing band. */}
      <ClosingCTA />
    </>
  );
}
