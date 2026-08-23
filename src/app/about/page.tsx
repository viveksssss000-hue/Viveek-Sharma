import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import {
  beliefs,
  closing,
  founder,
  header,
  howWeHire,
  newFirm,
  whereWeAre,
  whyWeStarted,
} from "@/content/about";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.about);

/**
 * About page (spec 7.5).
 *
 * In a market of anonymous offshore providers with stock photography, a real
 * founder with a real face and a real reason for starting the firm is a
 * competitive advantage. This page should read like a person wrote it.
 *
 * WHY THE FOUNDER STORY IS A VISIBLE GAP AND NOT INVENTED PROSE
 * Spec 7.5.1 is explicit: the story cannot be written by anyone other than the
 * founder, a generic version defeats the purpose of the page, and the developer
 * must not write a substitute. So the section renders the brief instead, plainly
 * marked. This page should not go live until the real text replaces it.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader h1={header.h1} intro={header.intro} />

      {/* Why we started, with the founder beside it. */}
      <Section tone="paper" width="text">
        <h2>{whyWeStarted.h2}</h2>

        {whyWeStarted.founderStory ? (
          <div className="mt-6 grid gap-4">
            {whyWeStarted.founderStory.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="measure text-body">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[12px] border border-border bg-sand-deep/40 p-6">
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-ochre-text">
              Founder story needed
            </p>
            <p className="mt-3 measure text-body">
              150 to 250 words in {site.founder.firstName}&rsquo;s own voice. It
              should answer three things:
            </p>
            <ul className="mt-4 grid list-disc gap-2 pl-6">
              {whyWeStarted.brief.map((item) => (
                <li key={item} className="text-body">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 measure text-small text-ink-muted">
              Specific beats polished. &ldquo;I watched a two-partner firm in
              Ohio turn down eleven clients in one year because they could not
              hire&rdquo; is worth more than a paragraph about passion for
              excellence.
            </p>
          </div>
        )}

        {/* A plain signature, not a profile card. The story is written in
            the first person, so it needs a name against it - an unsigned "I"
            is weaker than no story at all. No photograph and no biography:
            those were placeholders and the client removed them. */}
        <p className="mt-8 text-body">
          <span className="font-semibold">{founder.name}</span>
          <span className="text-ink-muted">, {founder.role}</span>
        </p>

      </Section>

      {/* What we believe */}
      <Section tone="sand" width="text">
        <h2>{beliefs.h2}</h2>
        <dl className="mt-8 grid gap-6">
          {beliefs.items.map((item) => (
            <div key={item.title}>
              <dt className="font-sans text-h4 font-semibold">{item.title}</dt>
              <dd className="mt-2 measure text-body text-ink-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Where we are */}
      <Section tone="paper" width="text">
        <h2>{whereWeAre.h2}</h2>
        <div className="mt-6 grid gap-4">
          {whereWeAre.paragraphs.map((paragraph) => (
            <p key={paragraph} className="measure text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* How we hire. This replaced a team section of photographs and job
          titles at the client's request - see the note in content/about.ts for
          why it is the better use of the space. */}
      <Section tone="sand">
        <div className="max-w-text">
          <h2>{howWeHire.h2}</h2>
          <p className="mt-4 measure text-lead text-ink-muted">
            {howWeHire.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
          {[howWeHire.before, howWeHire.after].map((group) => (
            <div
              key={group.h4}
              className="rounded-[12px] border border-border bg-surface p-6 lg:p-8"
            >
              <h3 className="font-sans text-h4 font-semibold">{group.h4}</h3>
              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon size={20} className="mt-1 text-fern" />
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 measure text-body">{howWeHire.closing}</p>
      </Section>

      {/* Being a new firm. The elephant on an About page with no client list,
          answered rather than decorated around - the same move the Security
          page makes with "What we do not claim" (spec 7.4.9). */}
      <Section tone="paper">
        <div className="max-w-text">
          <h2>{newFirm.h2}</h2>
          <p className="mt-4 measure text-lead text-ink-muted">
            {newFirm.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="font-sans text-h4 font-semibold">
              {newFirm.buys.h4}
            </h3>
            <ul className="mt-6 grid gap-3">
              {newFirm.buys.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon size={20} className="mt-1 text-fern" />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-h4 font-semibold">
              {newFirm.costs.h4}
            </h3>
            <ul className="mt-6 grid gap-3">
              {newFirm.costs.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CrossIcon size={20} className="mt-1 text-ink-muted" />
                  <span className="text-body text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 measure text-body">{newFirm.closing}</p>

        <p className="mt-6 measure text-small text-ink-muted">
          Read{" "}
          <Link
            href={newFirm.links.security.href}
            className="text-fern underline underline-offset-4"
          >
            {newFirm.links.security.label}
          </Link>{" "}
          on the security page, or start with{" "}
          <Link
            href={newFirm.links.pilot.href}
            className="text-fern underline underline-offset-4"
          >
            {newFirm.links.pilot.label}
          </Link>
          .
        </p>

        <p className="mt-10">
          <Link
            href={closing.linkHref}
            className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            {closing.linkLabel}
          </Link>
        </p>
      </Section>

      <ClosingCTA />

      {/* No `image`: the founder's photograph is not on the page, and marking
          up something a visitor cannot see is a guidelines violation. The name
          and role are on the page, in the signature under the story. */}
      <PersonSchema name={founder.name} jobTitle={founder.role} />
      <BreadcrumbSchema trail={[{ name: "About", path: routes.about }]} />
    </>
  );
}
