import { Quote, BadgeCheck } from "lucide-react";

import { testimonials } from "@/lib/content";

/**
 * Testimonials. Renders named client quotes with an initials avatar and a
 * "Verified client" marker; falls back to a tasteful empty state if none exist.
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <div className="surface-card reveal rounded-xl p-8 text-center">
        <Quote className="mx-auto size-8 text-subtle" />
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We publish named, permissioned client results only. As our design
          partners go live, their stories will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => {
        const initials = t.name
          .split(" ")
          .map((part) => part[0])
          .slice(0, 2)
          .join("");
        return (
          <figure
            key={`${t.name}-${t.company}`}
            className="surface-card surface-interactive flex flex-col gap-4 rounded-xl p-6 hover:border-border-strong"
          >
            <div className="flex items-center justify-between">
              <Quote className="size-6 text-primary" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wide text-success">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Verified client
              </span>
            </div>
            <blockquote className="text-base text-foreground leading-relaxed">
              &quot;{t.quote}&quot;
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20"
              >
                {initials}
              </span>
              <span className="text-sm">
                <span className="font-semibold text-foreground">{t.name}</span>
                <span className="block text-muted-foreground">
                  {t.role}, {t.company}
                  {t.location ? ` - ${t.location}` : ""}
                </span>
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
