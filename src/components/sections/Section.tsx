import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

/**
 * The section wrapper (spec 4.4.3).
 *
 * Sections MUST alternate paper and sand down the page so the eye can find the
 * boundaries, with at most one forest band per page - not counting the shared
 * closing call-to-action band and the footer, which are both forest by design.
 *
 * `width` picks the inner measure: content (1200px) for grids and tables,
 * wide (1000px) where a long H1 needs room to stay within two lines, narrow
 * (860px) for the comparison table, prose (800px) for FAQs, text (720px) for
 * anything that is mostly sentences.
 *
 * A wider container never widens body copy, because paragraphs carry `.measure`
 * and stop at 68 characters regardless - so `wide` buys a display heading the
 * room it needs without costing readability.
 */

type SectionProps = {
  children: ReactNode;
  tone?: "paper" | "sand" | "forest";
  width?: "content" | "wide" | "narrow" | "prose" | "text";
  /** Anchor target, e.g. "pricing". Adds scroll-margin for the sticky header. */
  id?: string;
  /** Trim the standard 64/96px vertical rhythm - use sparingly. */
  tight?: boolean;
  className?: string;
};

const toneClass = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  // `on-dark` flips the focus ring and any nested link colours.
  forest: "on-dark band-grad text-paper",
} as const;

const widthClass = {
  content: "max-w-content",
  wide: "max-w-[1000px]",
  narrow: "max-w-narrow",
  prose: "max-w-prose",
  text: "max-w-text",
} as const;

export function Section({
  children,
  tone = "paper",
  width = "content",
  id,
  tight = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneClass[tone],
        tight ? "py-12 lg:py-16" : "section-y",
        id && "scroll-mt-24",
        className
      )}
    >
      {/* Every section rises into view once (spec 4.8); children marked
          rv-item cascade. Sections already on screen are left alone - see
          ScrollReveal. */}
      <ScrollReveal className={cn("gutter mx-auto", widthClass[width])}>
        {children}
      </ScrollReveal>
    </section>
  );
}

/**
 * Section heading block: optional eyebrow, an H2, and an optional intro
 * paragraph held to the readable measure.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        align === "center" ? "max-w-text" : "",
        className
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <Heading className={cn(eyebrow && "mt-3")}>{title}</Heading>
      {intro && (
        <p
          className={cn(
            "mt-4 text-lead",
            align === "center" ? "mx-auto measure" : "measure",
            onDark ? "text-paper/85" : "text-ink-muted"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * The eyebrow label (spec 4.2.2). Ochre, 15px, uppercase, letter-spaced.
 * 15px is the floor for all text on this site and `ochre-text` is the
 * contrast-safe ochre, so this must not be set any smaller.
 */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        // The dash is the modern editorial cue: a 24px rule in the label's
        // own colour, leading the eye in. inline-flex keeps it centred when
        // a parent sets text-center.
        "inline-flex items-center gap-2 text-small font-semibold uppercase tracking-[0.08em]",
        "before:inline-block before:h-[2px] before:w-6 before:rounded-full before:bg-current before:opacity-70",
        onDark ? "text-ochre-light" : "text-ochre-text",
        className
      )}
    >
      {children}
    </p>
  );
}
