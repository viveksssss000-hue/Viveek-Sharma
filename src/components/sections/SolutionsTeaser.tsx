import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ReceiptText,
  FolderInput,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { solutions, solutionsSection } from "@/lib/content";

export const solutionIcons: Record<string, LucideIcon> = {
  "month-end-close": CalendarCheck,
  "ap-bill-capture": ReceiptText,
  "client-onboarding": FolderInput,
};

/**
 * Homepage "Packages" teaser (Website Change Document §2.5) - three cards
 * linking to the productized package pages under /solutions/. Reuses the
 * surface-card + reveal-stagger idiom shared with ServicesOverview.
 */
export function SolutionsTeaser() {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-content">
        <SectionHeading
          eyebrow={solutionsSection.eyebrow}
          title={solutionsSection.heading}
          description={solutionsSection.description}
        />
        <div className="reveal-stagger mt-12 grid gap-6 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = solutionIcons[s.slug] ?? CalendarCheck;
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="surface-card surface-interactive tilt group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {s.name}
                </h3>
                <p className="font-medium text-foreground">{s.outcome}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.forWho}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  See the package
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
