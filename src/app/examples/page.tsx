import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, Info } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/CountUp";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  exampleWorkflows,
  exampleWorkflowsContent,
  toolLogoSrc,
  type ExampleWorkflow,
  type WorkflowSaving,
  type WorkflowStep,
} from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: exampleWorkflowsContent.meta.title,
  description: exampleWorkflowsContent.meta.description,
  path: "/examples",
});

/** Small brand-logo chip used inside workflow steps. */
function ToolMark({ name }: { name: string }) {
  const src = toolLogoSrc(name);
  return (
    <span
      title={name}
      className="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-4 w-auto max-w-5 object-contain" />
      ) : (
        <span className="text-[10px] font-semibold text-muted-foreground">
          {name.slice(0, 2)}
        </span>
      )}
    </span>
  );
}

function StepCard({ step, index = 0 }: { step: WorkflowStep; index?: number }) {
  return (
    <li
      className={cn(
        "flow-node flex flex-1 flex-col gap-3 rounded-xl border p-4",
        step.accent
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-elevated"
      )}
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <span
        className={cn(
          "font-mono text-[11px] font-semibold uppercase tracking-[0.14em]",
          step.accent ? "text-primary" : "text-subtle"
        )}
      >
        {step.phase}
      </span>
      <span className="flex flex-wrap items-center gap-2">
        {step.tools.map((t) => (
          <ToolMark key={t} name={t} />
        ))}
      </span>
      <div>
        <p className="font-semibold text-foreground">{step.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {step.detail}
        </p>
      </div>
    </li>
  );
}

function Pipeline({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:gap-2">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <StepCard step={step} index={i} />
          {i < steps.length - 1 ? (
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
      ))}
    </ol>
  );
}

function SavingsChart({
  savings,
  summary,
  reclaimed,
}: {
  savings: WorkflowSaving[];
  summary?: string;
  reclaimed?: string;
}) {
  const max = Math.max(...savings.map((s) => s.manualHours));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-border-strong" />
            Manual
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-[linear-gradient(90deg,#6A45F5,#0FB8AC)]" />
            Automated
          </li>
        </ul>
        {reclaimed ? (
          <div className="flex items-center gap-2 rounded-full bg-[#0b0b12] px-4 py-1.5 text-white">
            <span className="text-lg font-bold text-accent">{reclaimed}</span>
            <span className="text-xs text-white/70">reclaimed / week</span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col divide-y divide-border">
        {savings.map((row) => {
          const delta = (row.manualHours - row.autoHours).toFixed(1);
          return (
            <div
              key={row.task}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="flex w-48 shrink-0 items-center gap-3">
                {row.tools.map((t) => (
                  <ToolMark key={t} name={t} />
                ))}
                <span className="text-sm font-semibold text-foreground">
                  {row.task}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 rounded-sm bg-border-strong"
                    style={{ width: `${(row.manualHours / max) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {row.manualHours.toFixed(1)}h
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 rounded-sm bg-[linear-gradient(90deg,#6A45F5,#0FB8AC)]"
                    style={{
                      width: `${Math.max((row.autoHours / max) * 100, 1.5)}%`,
                    }}
                  />
                  <span className="text-xs font-semibold text-foreground">
                    {row.autoHours.toFixed(1)}h
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-medium text-cyan sm:w-16 sm:text-right">
                -{delta}h
              </span>
            </div>
          );
        })}
      </div>

      {summary ? (
        <p className="text-sm text-muted-foreground">{summary}</p>
      ) : null}
    </div>
  );
}

const TONE_STYLES = {
  hot: "border-accent/50 bg-accent/5",
  warm: "border-cyan/40 bg-cyan/5",
  cold: "border-border bg-elevated",
} as const;

const TONE_LABEL = {
  hot: "text-[#6f9e00]",
  warm: "text-cyan",
  cold: "text-subtle",
} as const;

function Branching({ workflow }: { workflow: ExampleWorkflow }) {
  return (
    <div className="flex flex-col gap-6">
      {workflow.steps ? (
        <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:gap-2">
          {workflow.steps.map((step, i) => (
            <Fragment key={step.title}>
              <StepCard step={step} index={i} />
              {i < workflow.steps!.length - 1 ? (
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
          ))}
        </ol>
      ) : null}

      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Routes to
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="reveal-stagger grid gap-3 md:grid-cols-3">
        {workflow.branches?.map((branch) => (
          <div
            key={branch.label}
            className={cn(
              "flex flex-col gap-3 rounded-xl border p-4",
              TONE_STYLES[branch.tone]
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "font-mono text-[11px] font-semibold uppercase tracking-[0.12em]",
                  TONE_LABEL[branch.tone]
                )}
              >
                {branch.label}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {branch.share}
              </span>
            </div>
            <span className="flex items-center gap-2">
              {branch.tools.map((t) => (
                <ToolMark key={t} name={t} />
              ))}
            </span>
            <p className="text-sm font-medium text-foreground">{branch.action}</p>
          </div>
        ))}
      </div>

      {workflow.branchNote ? (
        <p className="text-sm text-muted-foreground">{workflow.branchNote}</p>
      ) : null}
    </div>
  );
}

function WorkflowStats({
  stats,
}: {
  stats: NonNullable<ExampleWorkflow["stats"]>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-elevated p-4"
        >
          <p
            className={cn(
              "text-3xl font-bold tracking-tight",
              s.accent ? "text-primary" : "text-foreground"
            )}
          >
            <CountUp value={s.value} />
          </p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: ExampleWorkflow }) {
  return (
    <article
      id={workflow.slug}
      className="reveal surface-card scroll-mt-24 rounded-2xl p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {workflow.scenario}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-subtle">
            <FlaskConical className="size-3" />
            Illustrative
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          {workflow.title}
        </h2>
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          {workflow.summary}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {workflow.kind === "pipeline" && workflow.steps ? (
          <Pipeline steps={workflow.steps} />
        ) : null}
        {workflow.kind === "savings" && workflow.savings ? (
          <SavingsChart
            savings={workflow.savings}
            summary={workflow.savingsSummary}
            reclaimed={workflow.reclaimed}
          />
        ) : null}
        {workflow.kind === "branching" ? <Branching workflow={workflow} /> : null}

        {workflow.stats ? <WorkflowStats stats={workflow.stats} /> : null}
      </div>
    </article>
  );
}

export default function ExamplesPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Example workflows"
            title={exampleWorkflowsContent.h1}
            description={exampleWorkflowsContent.intro}
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-content flex flex-col gap-8">
          <div className="reveal flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>{exampleWorkflowsContent.note}</p>
          </div>

          {exampleWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}

          <div className="reveal surface-card flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Want one of these running on your tools?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We start with a workflow audit, then build the one that gives
                your team the biggest week back.
              </p>
            </div>
            <Button asChild size="lg" variant="navy" className="shrink-0">
              <Link href="/contact?topic=workflow-audit">
                Map my workflow
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
