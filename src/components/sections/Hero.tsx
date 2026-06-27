import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WordRotator } from "@/components/ui/WordRotator";
import { CountUp } from "@/components/ui/CountUp";
import { home } from "@/lib/content";

const automations = [
  "bookkeeping",
  "onboarding",
  "support tickets",
  "reporting",
  "lead routing",
];

const marqueeItems = ["Map", "Design", "Automate", "Run"];

export function Hero() {
  const { hero } = home;
  // Emphasise the last word of the H1 in violet (e.g. "automated.").
  const words = hero.h1.trim().split(" ");
  const last = words.pop();
  const lead = words.join(" ");

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Faint violet grid + soft brand blobs - the cover motif */}
      <div
        aria-hidden="true"
        className="grid-motif pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_85%_at_72%_28%,#000_0%,transparent_70%)]"
      />
      <div aria-hidden="true" className="aurora" />

      <div className="container-content relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span
            className="hero-rise inline-flex w-fit items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground shadow-sm"
            style={{ animationDelay: "0.05s" }}
          >
            <span aria-hidden="true" className="pulse-dot" />
            AI workflow studio for small teams
          </span>
          <h1
            className="hero-rise text-4xl sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02]"
            style={{ animationDelay: "0.12s" }}
          >
            {lead} <span className="text-primary">{last}</span>
          </h1>
          <p
            className="hero-rise flex items-center gap-2 font-mono text-base text-muted-foreground"
            style={{ animationDelay: "0.16s" }}
          >
            <span className="sr-only">
              We automate bookkeeping, onboarding, support tickets, reporting,
              lead routing and more.
            </span>
            <span aria-hidden="true" className="inline-flex items-center gap-2">
              <span className="text-subtle">now automating</span>
              <WordRotator className="font-semibold text-primary" words={automations} />
            </span>
          </p>
          <p
            className="hero-rise max-w-xl text-lg text-muted-foreground leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.sub}
          </p>
          <div
            className="hero-rise flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.28s" }}
          >
            <Button asChild size="lg" variant="spark">
              <Link href="/contact">
                {hero.primaryCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-it-works">{hero.secondaryCta}</Link>
            </Button>
          </div>
          <p
            className="hero-rise inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-inset ring-accent/30"
            style={{ animationDelay: "0.36s" }}
          >
            <Zap className="size-4 text-[#5a7a00]" aria-hidden="true" />
            {hero.timeToValue}
          </p>
          <p
            className="hero-rise flex items-start gap-2 text-sm text-muted-foreground"
            style={{ animationDelay: "0.44s" }}
          >
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            {hero.trustLine}
          </p>
        </div>

        {/* Abstract "workflows running" visual (no stock art) */}
        <div
          className="hero-rise relative"
          style={{ animationDelay: "0.18s" }}
          aria-hidden="true"
        >
          <div className="surface-card rounded-2xl p-5">
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
                  <circle cx="16" cy="50" r="5.5" fill="#6A45F5" />
                  <circle cx="40" cy="30" r="5.5" fill="#0FB8AC" />
                  <circle cx="62" cy="50" r="6" fill="#A8E000" />
                  <defs>
                    <linearGradient
                      id="hero_mark"
                      x1="16"
                      y1="40"
                      x2="62"
                      y2="40"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6A45F5" />
                      <stop offset="1" stopColor="#0FB8AC" />
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
              {hero.workflowChips.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between rounded-lg bg-elevated px-4 py-3"
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-muted-foreground">
                    <span
                      className={`size-2 rounded-full ${row.dot}`}
                      aria-hidden="true"
                    />
                    {row.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-dashed border-border-strong p-4">
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>tasks run without human touch</span>
                <CountUp value="92%" className="font-medium text-foreground" />
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-elevated">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-primary via-cyan to-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic marquee - Map / Design / Automate / Run */}
      <div
        aria-hidden="true"
        className="marquee relative border-t border-border py-5"
      >
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-10 pr-10">
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="font-display text-3xl font-bold tracking-tight text-border-strong sm:text-5xl"
                >
                  {item}
                  <span className="px-5 text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
