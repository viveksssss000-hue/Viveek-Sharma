import Link from "next/link";
import {
  ArrowRight,
  Search,
  Bot,
  Plug,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { home, services } from "@/lib/content";

export const serviceIcons: Record<string, LucideIcon> = {
  "workflow-audit": Search,
  "custom-ai-workflows": Bot,
  "integration-handoff": Plug,
  "continuous-optimization": RefreshCw,
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
        <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug] ?? Search;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="surface-card surface-interactive tilt group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="font-medium text-foreground">{s.outcome}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.cardDescription}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="reveal mt-10 flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {home.servicesOverview.helpCallout.heading}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {home.servicesOverview.helpCallout.body}
            </p>
          </div>
          <Button asChild variant="navy" className="shrink-0">
            <Link href="/contact?topic=which-service">
              {home.servicesOverview.helpCallout.ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
