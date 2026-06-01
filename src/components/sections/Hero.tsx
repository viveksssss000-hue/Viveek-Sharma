import Link from "next/link";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { home } from "@/lib/content";

export function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="container-content relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-accent" />
            AI automation for accounting &amp; bookkeeping
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">{hero.h1}</h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            {hero.sub}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/book-a-demo">
                {hero.primaryCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/how-it-works">{hero.secondaryCta}</Link>
            </Button>
          </div>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
            {hero.trustLine}
          </p>
        </div>

        {/* Abstract reconciliation/dashboard visual (no stock art) */}
        <div className="relative" aria-hidden="true">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-xl shadow-primary/5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
                  A
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Reconciliation
                </span>
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                Up to date
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Bank feed matched", value: "1,284" },
                { label: "Invoices captured", value: "319" },
                { label: "Exceptions to review", value: "4" },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="size-4 text-accent" />
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-dashed border-border p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Month-end close</span>
                <span className="font-medium text-foreground">92%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[92%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
