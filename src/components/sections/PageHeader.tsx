import Link from "next/link";

import { BandBars } from "@/components/brand/Decor";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/sections/Section";
import { microcopy, routes } from "@/content/global";

/**
 * The standard page header: eyebrow, the page's single H1, one lead paragraph,
 * and optionally the primary call to action.
 *
 * Text-led with no image, so an inner page loads instantly (spec 7.2.2). The
 * H1 here is the only H1 on the page - every page has exactly one, and heading
 * levels are never skipped below it (spec 10.3).
 */
export function PageHeader({
  eyebrow,
  h1,
  intro,
  cta,
}: {
  eyebrow?: string;
  h1: string;
  intro: string;
  /** "book" adds the primary button. Omit on pages that end in a form. */
  cta?: "book";
}) {
  return (
    <section className="relative overflow-clip bg-paper">
      {/* The brand bars, barely-there, top right of every inner page header.
          Decorative and clipped - they can never widen the page. */}
      <BandBars className="pointer-events-none absolute -right-4 top-8 hidden w-56 opacity-[0.16] xl:block" />
      <div className="gutter relative mx-auto max-w-content pt-12 pb-12 lg:pt-24 lg:pb-16">
        {/* The H1 takes the full content width, not the 720px body measure.
            Spec 4.2.2 asks for an H1 of no more than two lines on desktop, and
            the longest H1 in the specification - the Services page, at 77
            characters - needs about 1,020px to hold two lines of 56px type.
            Display type takes a wider measure than prose; the intro paragraph
            below stays at 68 characters, which is where readability lives. */}
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className={eyebrow ? "mt-4" : undefined}>{h1}</h1>
          <p className="mt-6 measure text-lead text-ink-muted">{intro}</p>

          {cta === "book" && (
            <div className="mt-8">
              <Button asChild full className="sm:w-auto">
                <Link href={routes.bookACall}>{microcopy.bookCall}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
