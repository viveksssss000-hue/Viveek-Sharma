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
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Book a Demo
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{bookDemo.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {bookDemo.valueReminder}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <aside className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {bookDemo.whatNext.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {bookDemo.whatNext.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-foreground">
                {bookDemo.reassurance}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                Built security-first
              </p>
              <ul className="mt-3 space-y-2.5">
                {trustBadges.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <b.icon className="size-4 text-accent" />
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Contact us
              </Link>{" "}
              and we&apos;ll find a time.
            </p>
          </aside>

          {/* Scheduler */}
          <div className="lg:col-span-3">
            <DemoEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
