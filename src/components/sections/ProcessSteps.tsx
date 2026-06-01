import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { processSteps } from "@/lib/content";

/**
 * Process steps. `condensed` renders the homepage one-line variant with a link
 * to the full page; otherwise the full step descriptions are shown.
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
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
            >
              <span className="text-sm font-bold text-accent">
                {step.number}
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
