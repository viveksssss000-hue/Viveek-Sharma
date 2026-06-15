import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { processSteps } from "@/lib/content";

/**
 * Per-step node colour, matching the brand kit's process timeline:
 * the workflow path runs violet → cyan → cyan → lime, with the final
 * "Run & refine" node filled lime (the spark = it's live).
 */
const nodeStyles = [
  "border-primary bg-background",
  "border-cyan bg-background",
  "border-cyan bg-background",
  "border-accent bg-accent",
] as const;

/**
 * Process steps. `condensed` renders the homepage one-line variant with a link
 * to the full page; otherwise the full step descriptions are shown.
 *
 * The four steps sit in a single card joined by a violet→cyan→lime flow
 * gradient - the same node-and-path logic as the logo ("the mark is a workflow").
 */
export function ProcessSteps({ condensed = false }: { condensed?: boolean }) {
  return (
    <section className="section-y">
      <div className="container-content">
        <SectionHeading
          eyebrow="How it works"
          title="A clear, low-risk path to automation"
          description={
            condensed
              ? "Four steps from first conversation to numbers you can trust."
              : undefined
          }
        />
        <div className="surface-card reveal mt-12 overflow-hidden rounded-xl">
          <ol className="relative grid md:grid-cols-2 lg:grid-cols-4">
            {/* Flow-gradient connecting line - desktop only, behind the node dots */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-6 right-6 top-[3.75rem] hidden h-px bg-gradient-to-r from-primary via-cyan to-accent opacity-40 lg:block"
            />
            {processSteps.map((step, i) => (
              <li
                key={step.number}
                className="relative flex flex-col gap-2.5 border-border p-6 sm:p-7 md:[&:nth-child(n+3)]:border-t md:[&:nth-child(even)]:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
              >
                <span
                  aria-hidden="true"
                  className={`relative size-3.5 rounded-full border-2 ${nodeStyles[i]}`}
                />
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-subtle">
                  Step {step.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
        {condensed ? (
          <div className="mt-8 flex justify-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              See the full process
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
