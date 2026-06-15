import { Clock, RefreshCcw, CalendarClock, ShieldAlert } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { home } from "@/lib/content";

const icons = [Clock, RefreshCcw, CalendarClock, ShieldAlert];

export function ProblemGrid() {
  const { problems } = home;
  return (
    <section className="section-y">
      <div className="container-content">
        <SectionHeading title={problems.heading} />
        <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.cards.map((card, i) => {
            const Icon = icons[i] ?? Clock;
            return (
              <div
                key={card.title}
                className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-6 hover:border-border-strong"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/15 text-[#b8acff] ring-1 ring-inset ring-primary/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
