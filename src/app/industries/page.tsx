import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { industries, industriesSection } from "@/lib/content";

// Parked for a later phase: kept in the repo but noindexed and out of the
// sitemap until we rebuild proper, finance/back-office-aligned industry pages.
export const metadata: Metadata = buildMetadata({
  title: "Industries We Automate For | tryacowork",
  description:
    "AI workflow automation tuned to your sector - marketing, e-commerce, HR, operations and support. Built, run and managed end-to-end.",
  path: "/industries",
  noindex: true,
});

export default function IndustriesPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow={industriesSection.eyebrow}
            title={industriesSection.heading}
            description={industriesSection.description}
          />
          <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="surface-card surface-interactive group flex flex-col gap-3 rounded-xl p-7 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {i.navLabel}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {i.outcome}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
