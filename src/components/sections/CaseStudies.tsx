import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

import { caseStudies } from "@/lib/content";

/**
 * Before -> After case-study cards (Website Change Document §4). Reused on the
 * homepage case-studies strip and on /results. Each card reframes a named
 * client as before/after and maps to the package that delivered it.
 */
export function CaseStudies() {
  return (
    <div className="reveal-stagger grid gap-6 lg:grid-cols-3">
      {caseStudies.map((cs) => (
        <article
          key={cs.client}
          className="surface-card surface-interactive flex flex-col gap-4 rounded-xl p-7 hover:border-border-strong"
        >
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {cs.client}
            </p>
            <p className="mt-2 text-xl font-bold leading-snug text-foreground">
              {cs.result}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-border bg-elevated px-4 py-3">
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-wide text-subtle">
                Before
              </span>
              <p className="mt-0.5 text-sm text-muted-foreground">{cs.before}</p>
            </div>
            <ArrowDown
              className="mx-auto size-4 text-accent"
              aria-hidden="true"
            />
            <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3">
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-wide text-accent-foreground/80">
                After
              </span>
              <p className="mt-0.5 text-sm font-medium text-foreground">
                {cs.after}
              </p>
            </div>
          </div>

          <Link
            href={cs.packageHref}
            className="group mt-auto inline-flex items-center gap-1 border-t border-border pt-4 text-sm font-semibold text-primary hover:underline"
          >
            {cs.packageName}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}
