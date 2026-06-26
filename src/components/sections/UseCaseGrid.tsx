import {
  Target,
  Megaphone,
  Truck,
  UserPlus,
  Receipt,
  LifeBuoy,
  ListChecks,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { useCases, useCasesSection } from "@/lib/content";

const useCaseIcons: Record<string, LucideIcon> = {
  sales: Target,
  marketing: Megaphone,
  operations: Truck,
  hr: UserPlus,
  finance: Receipt,
  support: LifeBuoy,
  projects: ListChecks,
  custom: Sparkles,
};

/**
 * Industry / use-case grid - the homepage's breadth signal. Eight categories
 * so non-finance visitors immediately see themselves. Reuses the surface-card
 * + reveal-stagger idiom from ProblemGrid / ServicesOverview.
 */
export function UseCaseGrid() {
  return (
    <section className="section-y">
      <div className="container-content">
        <SectionHeading
          eyebrow={useCasesSection.eyebrow}
          title={useCasesSection.heading}
          description={useCasesSection.description}
        />
        <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc) => {
            const Icon = useCaseIcons[uc.icon] ?? Sparkles;
            return (
              <div
                key={uc.title}
                className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-6 hover:border-border-strong"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {uc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {uc.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
