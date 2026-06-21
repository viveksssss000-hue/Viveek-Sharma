import type { Metadata } from "next";
import { Check } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { howItWorks } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: howItWorks.meta.title,
  description: howItWorks.meta.description,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="How it works"
            title={howItWorks.h1}
            description={howItWorks.intro}
          />
        </div>
      </section>

      <ProcessSteps />

      <section className="bg-surface border-y border-border section-y">
        <div className="container-content max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {howItWorks.expectations.heading}
          </h2>
          <ul className="mt-6 space-y-4">
            {howItWorks.expectations.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-foreground">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-base text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
