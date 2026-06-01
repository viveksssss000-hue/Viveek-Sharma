import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { LogoBar } from "@/components/sections/LogoBar";
import { ProblemGrid } from "@/components/sections/ProblemGrid";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
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
      <LogoBar />
      <ProblemGrid />
      <ServicesOverview />
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
            <Testimonials />
          </div>
        </div>
      </section>

      <FAQ faqs={globalFaqs} />
      <CTASection />
    </>
  );
}
