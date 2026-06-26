import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { IndustryTicker } from "@/components/sections/IndustryTicker";
import { LogoBar } from "@/components/sections/LogoBar";
import { ProblemGrid } from "@/components/sections/ProblemGrid";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WorkflowDiagram } from "@/components/sections/WorkflowDiagram";
import { UseCaseGrid } from "@/components/sections/UseCaseGrid";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SecurityBlock } from "@/components/sections/SecurityBlock";
import { StatBar } from "@/components/sections/StatBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { home, globalFaqs } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustryTicker />
      <LogoBar />
      <ProblemGrid />
      <ServicesOverview />
      <WorkflowDiagram />
      <UseCaseGrid />
      <WhoItsFor />
      <ProcessSteps condensed />
      <SecurityBlock />

      <section className="section-y bg-surface border-y border-border">
        <div className="container-content">
          <SectionHeading
            eyebrow="Results"
            title={home.results.heading}
            description={home.results.description}
          />
          <div className="mt-12 flex flex-col gap-10">
            <StatBar />
            {/* Numeric callouts lifted from the named testimonials below. */}
            <div className="reveal-stagger grid gap-4 sm:grid-cols-3">
              {home.results.callouts.map((c) => (
                <div
                  key={c.value}
                  className="surface-card rounded-xl p-6 text-center"
                >
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    {c.value}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
            <Testimonials />
            <p className="text-center text-xs text-muted-foreground">
              {home.results.verifiedNote}
            </p>
          </div>
        </div>
      </section>

      <FAQ faqs={globalFaqs} defaultValue="item-0" />
      <CTASection />
    </>
  );
}
