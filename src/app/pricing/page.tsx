import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { TrackView } from "@/components/analytics/TrackView";
import { buildMetadata } from "@/lib/seo";
import { pricing, globalFaqs } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: pricing.meta.title,
  description: pricing.meta.description,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <TrackView event="pricing_view" />
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Pricing"
            title={pricing.h1}
            description={pricing.intro}
          />
          <div className="reveal-stagger mt-12 grid gap-6 lg:grid-cols-3">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`surface-card flex flex-col gap-4 rounded-2xl p-7 ${
                  tier.featured ? "ring-2 ring-primary" : ""
                }`}
              >
                {tier.featured ? (
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wide text-[#4424b8] ring-1 ring-inset ring-primary/20">
                    Where most teams start
                  </span>
                ) : null}
                <h2 className="text-xl font-semibold text-foreground">
                  {tier.name}
                </h2>
                <p className="text-sm font-medium text-foreground">
                  {tier.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tier.forWho}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.featured ? "spark" : "navy"}
                  className="mt-auto"
                >
                  <Link href="/contact">
                    {tier.cta}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4">
            <Button asChild size="lg" variant="spark">
              <Link href="/contact">
                Book your Workflow Audit
                <ArrowRight />
              </Link>
            </Button>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              {pricing.note}
            </p>
          </div>
        </div>
      </section>

      <FAQ faqs={globalFaqs} title="Pricing questions" />
      <CTASection />
    </>
  );
}
