import { Check } from "lucide-react";

import { about } from "@/lib/content";

/**
 * Homepage "Who it's for" block - pulls the strong About-page copy forward and
 * doubles as the page's dark visual break. Reuses the CTASection dark-band
 * recipe (ink panel + masked violet grid + radial blob); light-only site, so
 * colours are set explicitly rather than via a dark token set.
 */
export function WhoItsFor() {
  const { whoWeServe } = about;
  return (
    <section className="section-y">
      <div className="container-content">
        <div className="reveal relative overflow-hidden rounded-[28px] border border-[#0b0b12] bg-[#0b0b12] px-6 py-14 shadow-[0_28px_70px_-34px_rgba(11,11,18,0.5)] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(124,92,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,92,255,.1)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(120%_120%_at_15%_20%,#000,transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 -top-44 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(106,69,245,.3),transparent_64%)]"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {whoWeServe.heading}
            </span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">
              Built for teams who know AI could help - and want it handled.
            </h2>
            <ul className="mt-8 grid gap-4">
              {whoWeServe.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg leading-relaxed text-[#d7d7e0]"
                >
                  <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
