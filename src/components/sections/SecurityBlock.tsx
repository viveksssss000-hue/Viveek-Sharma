import Link from "next/link";
import { Lock, EyeOff, UserCheck, ArrowRight } from "lucide-react";

import { home } from "@/lib/content";

const badges = [
  { icon: Lock, label: "Encrypted in transit & at rest" },
  { icon: EyeOff, label: "Never used to train AI models" },
  { icon: UserCheck, label: "Human-in-the-loop review" },
];

export function SecurityBlock() {
  const { security } = home;
  return (
    <section className="section-y">
      <div className="container-content">
        <div className="reveal relative overflow-hidden rounded-2xl border border-border-strong bg-[linear-gradient(140deg,#161c27,#1d2532)] px-6 py-12 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 bottom-[-10rem] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(109,93,211,.16),transparent_64%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-cyan">
                Security &amp; trust
              </span>
              <h2 className="text-3xl sm:text-4xl">{security.heading}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {security.body}
              </p>
              <Link
                href="/security"
                className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                {security.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.04] px-4 py-3.5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan/15 text-cyan">
                    <b.icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground/90">
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
