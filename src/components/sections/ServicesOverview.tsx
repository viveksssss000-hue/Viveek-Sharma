import Link from "next/link";
import {
  ArrowRight,
  ListChecks,
  FileText,
  Banknote,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { home, services } from "@/lib/content";

export const serviceIcons: Record<string, LucideIcon> = {
  "bookkeeping-automation": ListChecks,
  "invoice-ap-automation": FileText,
  "accounts-receivable-automation": Banknote,
  "reporting-dashboards": BarChart3,
};

export function ServicesOverview() {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-content">
        <SectionHeading
          eyebrow="What we automate"
          title={home.servicesOverview.heading}
          description={home.servicesOverview.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug] ?? ListChecks;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.outcome}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
