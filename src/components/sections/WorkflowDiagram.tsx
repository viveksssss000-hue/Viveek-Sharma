import { Fragment } from "react";

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
                  <li
                    className="flow-node flex-1 rounded-xl border border-border bg-elevated p-4 text-center"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
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
                    <span
                      aria-hidden="true"
                      className="flow-conn mx-auto h-7 w-0.5 shrink-0 self-center rounded-full bg-border-strong lg:h-0.5 lg:w-auto lg:min-w-8 lg:flex-1"
                    >
                      <span
                        className="flow-conn-dot"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    </span>
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
