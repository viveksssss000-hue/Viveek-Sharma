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
  title = "Let's automate something real.",
  description = "Start with one task. Book a 30-minute demo and we'll show you the automated version of it - and the hours it gives back.",
  reassurance = "30-minute call · No obligation · No credit card",
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
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl text-white sm:text-4xl">
              {lead} <span className="text-accent">{last}</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#bcbcca]">
              {description}
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="spark">
                <Link href="/book-a-demo">
                  Book a Demo
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
