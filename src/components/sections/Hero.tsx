import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { home } from "@/lib/content";

/** Live-workflow status rows for the hero visual — the brand's node chips. */
const workflows = [
  { name: "invoice-sync", status: "live", dot: "bg-accent" },
  { name: "lead-router", status: "running", dot: "bg-primary" },
  { name: "report-builder", status: "live", dot: "bg-cyan" },
];

export function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Faint violet grid + halo — the Flowline cover motif */}
      <div
        aria-hidden="true"
        className="grid-motif pointer-events-none absolute inset-0 [mask-image:radial-gradient(110%_90%_at_70%_30%,#000_0%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 -top-56 size-[47rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,.20),rgba(31,227,214,.06)_45%,transparent_66%)] blur-[8px]"
      />
      <div className="container-content relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-accent"
            />
            tryacowork.com · ai workflow studio
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
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-cyan" />
            {hero.trustLine}
          </p>
        </div>

        {/* Abstract "workflows running" visual (no stock art) */}
        <div className="relative" aria-hidden="true">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-xl shadow-primary/10">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                {/* node-path mark */}
                <svg width="26" height="26" viewBox="0 0 78 78" fill="none">
                  <path
                    d="M16 50 L32 50 L40 30 L48 50 L62 50"
                    stroke="url(#hero_mark)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16" cy="50" r="5.5" fill="#7C5CFF" />
                  <circle cx="40" cy="30" r="5.5" fill="#1FE3D6" />
                  <circle cx="62" cy="50" r="6" fill="#C9FF3D" />
                  <defs>
                    <linearGradient
                      id="hero_mark"
                      x1="16"
                      y1="40"
                      x2="62"
                      y2="40"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#7C5CFF" />
                      <stop offset="1" stopColor="#1FE3D6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-sm font-semibold text-foreground">
                  Your workflows
                </span>
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-1 font-mono text-xs font-medium text-success">
                running
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {workflows.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between rounded-lg bg-elevated/70 px-4 py-3"
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-muted-foreground">
                    <span
                      className={`size-2 rounded-full ${row.dot}`}
                      aria-hidden="true"
                    />
                    {row.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-dashed border-border-strong p-4">
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>tasks run without human touch</span>
                <span className="font-medium text-foreground">92%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-elevated">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-primary via-cyan to-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
