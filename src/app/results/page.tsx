import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LineChart } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatBar } from "@/components/sections/StatBar";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
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
          <div>
            <SectionHeading
              align="left"
              title="Before and after"
              description="Real, named clients - reframed as the before and the after, mapped to the package that delivered it."
            />
            <div className="mt-8">
              <CaseStudies />
            </div>
          </div>

          <StatBar />

          <div>
            <SectionHeading align="left" title={results.measuresHeading} />
            <div className="reveal-stagger mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.measures.map((m) => (
                <div
                  key={m.metric}
                  className="surface-card surface-interactive flex flex-col gap-2 rounded-xl p-6 hover:border-border-strong"
                >
                  <h3 className="font-semibold text-foreground">{m.metric}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              title={results.examplesHeading}
              description={results.examplesIntro}
            />
            <div className="reveal-stagger mt-8 grid gap-6 sm:grid-cols-2">
              {results.examples.map((ex) => (
                <div
                  key={ex.area}
                  className="surface-card surface-interactive flex flex-col gap-2 rounded-xl p-7 hover:border-border-strong"
                >
                  <h3 className="font-semibold text-foreground">{ex.area}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ex.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {results.caseStudies.length === 0 ? (
            <div className="surface-card reveal mx-auto max-w-xl rounded-xl p-10 text-center">
              <LineChart className="mx-auto size-9 text-subtle" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Early results, published honestly
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {/* TODO(client): add real case studies in content.ts. */}
                We&apos;re onboarding our first design partners now. Their named,
                quantified results will appear here - we never publish figures or
                logos we can&apos;t stand behind.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                In the meantime, see how these automations are wired together:
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/examples">
                  Explore example workflows
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {results.caseStudies.map((cs) => (
                <article
                  key={cs.sector}
                  className="surface-card surface-interactive flex flex-col gap-4 rounded-xl p-6 hover:border-border-strong"
                >
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
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
                      &quot;{cs.quote}&quot;
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
