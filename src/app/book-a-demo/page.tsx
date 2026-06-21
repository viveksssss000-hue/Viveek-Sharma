import type { Metadata } from "next";
import Link from "next/link";
import { Check, Lock, EyeOff, UserCheck } from "lucide-react";

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
];

export default function BookDemoPage() {
  return (
    <section className="section-y">
      <div className="container-content">
        {/* Intro */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Book a Demo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{bookDemo.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {bookDemo.valueReminder}
          </p>
        </div>

        {/* What happens next - compact 3-up strip above the scheduler */}
        <div className="reveal-stagger mt-12 grid gap-5 sm:grid-cols-3">
          {bookDemo.whatNext.points.map((point, i) => (
            <div
              key={point}
              className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-6 hover:border-border-strong"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Scheduler - full width so the embed has room to render cleanly */}
        <div className="reveal mt-10">
          <DemoEmbed />
        </div>

        {/* Trust strip + fallback */}
        <div className="mt-8 flex flex-col gap-5 rounded-xl border border-border bg-surface/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <b.icon className="size-4 text-primary" />
                {b.label}
              </li>
            ))}
            <li className="flex items-center gap-2.5 text-sm font-medium text-foreground">
              <Check className="size-4 text-primary" strokeWidth={3} />
              {bookDemo.reassurance}
            </li>
          </ul>
          <p className="shrink-0 text-sm text-muted-foreground">
            Prefer email?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
