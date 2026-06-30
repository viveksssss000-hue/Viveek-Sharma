import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  title?: string;
  description?: string;
  reassurance?: string;
  className?: string;
};

/** Reusable final CTA band - Flowline contact-card style. Foot of most pages. */
export function CTASection({
  title = "See where your business is losing hours.",
  description = "Book a 30-minute workflow audit. You'll leave with a prioritized list of what to automate first and a clear, fixed quote.",
  reassurance = "30-minute audit · No obligation · No credit card",
  className,
}: CTASectionProps) {
  // Render the headline with the last word emphasised in lime (e.g. "real.").
  const words = title.trim().split(" ");
  const last = words.pop();
  const lead = words.join(" ");

  return (
    <section className={cn("section-y", className)}>
      <div className="container-content">
        <div className="reveal relative overflow-hidden rounded-[28px] border border-[#0b0b12] bg-[#0b0b12] px-6 py-14 text-center shadow-[0_28px_70px_-34px_rgba(11,11,18,0.5)] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(124,92,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,92,255,.1)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(120%_120%_at_80%_20%,#000,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-44 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(106,69,245,.3),transparent_64%)]"
          />
          <div aria-hidden="true" className="aurora opacity-70" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl text-white sm:text-4xl">
              {lead} <span className="text-accent">{last}</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#bcbcca]">
              {description}
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="spark">
                <Link href="/contact">
                  Book your Workflow Audit
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 hover:border-white/40"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
            {reassurance ? (
              <p className="font-mono text-xs tracking-wide text-white/50">
                {reassurance}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
