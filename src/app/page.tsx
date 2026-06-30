import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { IndustryTicker } from "@/components/sections/IndustryTicker";
import { LogoBar } from "@/components/sections/LogoBar";
import { ProblemGrid } from "@/components/sections/ProblemGrid";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SolutionsTeaser } from "@/components/sections/SolutionsTeaser";
import { WorkflowDiagram } from "@/components/sections/WorkflowDiagram";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SecurityBlock } from "@/components/sections/SecurityBlock";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { CaseStudies } from "@/components/sections/CaseStudies";
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
      {/* Section order follows the Website Change Document §2:
          Hero -> (Trust bar, in layout) -> Problem -> What we do ->
          Packages -> ... -> Case studies strip -> Closing CTA. */}
      <Hero />
      <IndustryTicker />
      <LogoBar />
      <ProblemGrid />
      <ServicesOverview />
      <SolutionsTeaser />
      <WorkflowDiagram />
      <ProcessSteps condensed />
      <SecurityBlock />
      <WhoItsFor />

      <section className="section-y bg-surface border-y border-border">
        <div className="container-content">
          <SectionHeading
            eyebrow="Case studies"
            title={home.results.heading}
            description={home.results.description}
          />
          <div className="mt-12 flex flex-col gap-10">
            <CaseStudies />
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
