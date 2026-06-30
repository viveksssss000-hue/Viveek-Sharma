import type { Metadata } from "next";
import Link from "next/link";
import { Lock, EyeOff, UserCheck, CreditCard, ArrowRight } from "lucide-react";

import { DemoEmbed } from "@/components/booking/DemoEmbed";
import { buildMetadata } from "@/lib/seo";
import { bookDemo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: bookDemo.meta.title,
  description: bookDemo.meta.description,
  path: "/book-a-demo",
});

const trustBadges = [
  { icon: Lock, label: "Encrypted & secure" },
  { icon: EyeOff, label: "Never trains on your data" },
  { icon: UserCheck, label: "Human-in-the-loop" },
  { icon: CreditCard, label: "No credit card required" },
];

export default function BookDemoPage() {
  return (
    <section className="section-y">
      <div className="container-content">
        {/* Intro */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Workflow Audit
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{bookDemo.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {bookDemo.valueReminder}
          </p>
        </div>

        {/* Steps - compact 3-up strip above the scheduler */}
        <div className="reveal-stagger mt-12 grid gap-5 sm:grid-cols-3">
          {bookDemo.steps.map((step, i) => (
            <div
              key={step.title}
              className="surface-card surface-interactive flex flex-col gap-3 rounded-2xl p-6 hover:border-border-strong"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 font-mono text-base font-semibold text-primary ring-1 ring-inset ring-primary/20">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Scheduler - full width so it has room to render cleanly */}
        <div className="reveal mt-10">
          <DemoEmbed />
        </div>

        {/* Trust bar */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3.5 text-center text-sm text-muted-foreground"
            >
              <b.icon className="size-4 shrink-0 text-primary" />
              {b.label}
            </div>
          ))}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-surface px-4 py-3.5 text-center text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
          >
            Contact us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
