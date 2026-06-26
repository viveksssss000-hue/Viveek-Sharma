import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { workflowDiagram } from "@/lib/content";

/**
 * "What automation actually looks like" - a left-to-right data-flow pipeline
 * (Trigger -> Read -> Decide -> Act -> Log), distinct from the numbered
 * ProcessSteps timeline. Plain chips + arrows, no heavy deps; the visually
 * hidden <ol> carries the order for assistive tech.
 */
export function WorkflowDiagram() {
  const { steps } = workflowDiagram;
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-content">
        <SectionHeading
          eyebrow={workflowDiagram.eyebrow}
          title={workflowDiagram.heading}
          description={workflowDiagram.caption}
        />
        <div className="reveal surface-card mt-12 rounded-2xl p-6 sm:p-8">
          <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-2">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <Fragment key={step.label}>
                  <li className="flex-1 rounded-xl border border-border bg-elevated p-4 text-center">
                    <p
                      className={`font-mono text-sm font-semibold ${
                        isLast ? "text-cyan" : "text-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {step.detail}
                    </p>
                  </li>
                  {!isLast ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="mx-auto size-5 shrink-0 rotate-90 self-center text-primary lg:rotate-0"
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
