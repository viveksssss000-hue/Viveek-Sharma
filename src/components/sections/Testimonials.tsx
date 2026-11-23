import Image from "next/image";

import { Section } from "@/components/sections/Section";
import { testimonials, testimonialsHeading } from "@/content/home";

/**
 * Testimonials (spec 7.1.10).
 *
 * The section renders only when real, attributed quotes exist. Spec 3.7 is
 * unambiguous: only real testimonials, each with the person's first name, last
 * name, role and firm name, and only with their written permission. Never write
 * a testimonial, and never use a stock headshot next to a real person's quote -
 * either the real photograph or no photograph.
 *
 * Accountants check things for a living, so an invented quote here is not a
 * small liberty; it is the fastest way to lose the buyer this site is for.
 *
 * If only one real quote is available at launch, that is the better outcome:
 * one real quote, centred and larger, beats three thin ones.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const single = testimonials.length === 1;

  return (
    <Section tone="sand" width={single ? "text" : "content"}>
      <h2 className={single ? "text-center" : "max-w-text"}>
        {testimonialsHeading}
      </h2>

      <ul
        className={
          single
            ? "mt-10"
            : "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {testimonials.map((item) => (
          <li
            key={item.name}
            className="rounded-[16px] border border-border bg-surface p-6 shadow-rest lg:p-8"
          >
            <blockquote>
              <p
                className={
                  single
                    ? "font-serif text-h2 font-semibold"
                    : "font-serif text-[22px] font-semibold leading-[1.4]"
                }
              >
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-6 flex items-center gap-4">
              {item.photo && (
                <Image
                  src={item.photo}
                  alt={`${item.name}, ${item.role} at ${item.firm}.`}
                  width={112}
                  height={112}
                  loading="lazy"
                  className="size-14 rounded-full object-cover"
                />
              )}
              <p className="text-small text-ink-muted">
                <span className="font-semibold text-ink">{item.name}</span>
                {", "}
                {item.role}, {item.firm}, {item.state}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
