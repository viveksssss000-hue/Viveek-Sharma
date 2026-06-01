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
        <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                Security &amp; trust
              </span>
              <h2 className="text-3xl text-primary-foreground sm:text-4xl">
                {security.heading}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
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
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3.5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/20 text-accent">
                    <b.icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-white/90">
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
