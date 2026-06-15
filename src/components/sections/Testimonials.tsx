import { Quote } from "lucide-react";

import { testimonials } from "@/lib/content";

/**
 * Testimonials. Renders real, named quotes when provided; otherwise a tasteful
 * honest empty state. We never fabricate testimonials (BUILD.md §11).
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <div className="surface-card reveal rounded-xl p-8 text-center">
        <Quote className="mx-auto size-8 text-subtle" />
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We publish named, permissioned client results only. As our design
          partners go live, their stories will appear here - never invented.
        </p>
        {/* TODO(client): add real testimonials in content.ts to populate this section. */}
      </div>
    );
  }

  return (
    <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={`${t.name}-${t.company}`}
          className="surface-card surface-interactive flex flex-col gap-4 rounded-xl p-6 hover:border-border-strong"
        >
          <Quote className="size-6 text-accent" />
          <blockquote className="text-base text-foreground leading-relaxed">
            &quot;{t.quote}&quot;
          </blockquote>
          <figcaption className="mt-auto text-sm">
            <span className="font-semibold text-foreground">{t.name}</span>
            <span className="block text-muted-foreground">
              {t.role}, {t.company}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
