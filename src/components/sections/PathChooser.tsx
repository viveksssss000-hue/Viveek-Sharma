import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Eyebrow, Section } from "@/components/sections/Section";
import { pathChooser } from "@/content/home";

/**
 * The chooser - the most important routing device on the site.
 *
 * The business sells two different things to two different mindsets: having
 * the books RUN FOR you (professional services, the primary offer) and
 * hiring a dedicated person THROUGH us (staffing, the secondary offer). A
 * page that pitches both at once serves neither, so the home page asks one
 * question and sends each visitor down one path (client decision,
 * 23 November: "the right potential client lands on the right page,
 * instead of both").
 *
 * The services card carries the primary button and the staffing card the
 * secondary - the deliberate, visible hierarchy between a primary and a
 * secondary offer, expressed the only way the design system allows: through
 * the one action colour, never through size or placement tricks.
 */
export function PathChooser() {
  return (
    <Section tone="paper" id="paths" tight>
      <div className="mx-auto max-w-text text-center">
        <Eyebrow>{pathChooser.eyebrow}</Eyebrow>
        <h2 className="mt-3">{pathChooser.h2}</h2>
        <p className="mx-auto mt-4 measure text-lead text-ink-muted">
          {pathChooser.intro}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1000px] gap-6 md:grid-cols-2">
        {pathChooser.cards.map((card) => (
          <div
            key={card.title}
            className="rv-item relative flex flex-col overflow-hidden rounded-[16px] border border-border bg-surface p-6 pt-8 shadow-rest transition-[box-shadow,transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ochre-light hover:shadow-lift lg:p-8 lg:pt-10"
          >
            {/* The accent strip: ochre for the primary offer, fern for the
                secondary - the same hierarchy the buttons below carry. */}
            <span
              aria-hidden="true"
              className={
                card.primary
                  ? "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-ochre to-ochre-light"
                  : "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-fern to-fern/50"
              }
            />
            <span
              aria-hidden="true"
              className="mb-5 inline-flex size-12 items-center justify-center rounded-[14px] bg-sand text-fern"
            >
              {card.primary ? <ClipboardIcon size={24} /> : <UserIcon size={24} />}
            </span>
            <Eyebrow>{card.eyebrow}</Eyebrow>
            <h3 className="mt-3 font-serif text-h3 font-semibold">
              {card.title}
            </h3>
            <p className="mt-3 text-body text-ink-muted">{card.body}</p>

            <ul className="mt-6 grid gap-3">
              {card.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon size={20} className="icon-draw mt-1 text-fern" />
                  <span className="text-body">{point}</span>
                </li>
              ))}
            </ul>

            {/* mt-auto pins both buttons to the same baseline however the
                copy above them wraps. */}
            <div className="mt-auto pt-8">
              <Button
                asChild
                variant={card.primary ? "primary" : "secondary"}
                full
                className="sm:w-auto"
              >
                <Link href={card.href}>
                  {card.ctaLabel}
                  <ArrowRightIcon size={18} />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
