import type { Metadata } from "next";
import { LineChart } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatBar } from "@/components/sections/StatBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { results } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: results.meta.title,
  description: results.meta.description,
  path: "/results",
});

export default function ResultsPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Results"
            title={results.h1}
            description={results.intro}
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-content flex flex-col gap-12">
          <StatBar />

          {results.caseStudies.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-xl border border-dashed border-border bg-surface p-10 text-center">
              <LineChart className="mx-auto size-9 text-subtle" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Early results, published honestly
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {/* TODO(client): add real case studies in content.ts. */}
                We&apos;re onboarding our first design partners now. Their named,
                quantified results will appear here — we never publish figures or
                logos we can&apos;t stand behind.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {results.caseStudies.map((cs) => (
                <article
                  key={cs.sector}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {cs.sector}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      The problem
                    </h3>
                    <p className="text-sm text-muted-foreground">{cs.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      What we automated
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cs.automated}
                    </p>
                  </div>
                  <p className="mt-auto text-2xl font-bold text-foreground">
                    {cs.result}
                  </p>
                  {cs.quote ? (
                    <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-muted-foreground">
                      “{cs.quote}”
                    </blockquote>
                  ) : null}
                </article>
              ))}
            </div>
          )}

          <div>
            <SectionHeading title="In their words" />
            <div className="mt-10">
              <Testimonials />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
