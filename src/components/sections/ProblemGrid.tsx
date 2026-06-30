import { Clock, RefreshCcw, CalendarClock, ShieldAlert, Users } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { home } from "@/lib/content";

// Order matches home.problems.cards: objection card first, team card last.
const icons = [ShieldAlert, Clock, CalendarClock, RefreshCcw, Users];

export function ProblemGrid() {
  const { problems } = home;
  return (
    <section className="section-y">
      <div className="container-content">
        <SectionHeading title={problems.heading} description={problems.description} />
        <div className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.cards.map((card, i) => {
            const Icon = icons[i] ?? Clock;
            return (
              <div
                key={card.title}
                className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-6 hover:border-border-strong"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
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
        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          {problems.stat}
        </p>
      </div>
    </section>
  );
}
