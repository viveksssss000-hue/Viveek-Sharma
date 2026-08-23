import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { routes } from "@/content/global";
import { staff, staffProfilesConfirmed } from "@/content/home";

/**
 * "Meet the kind of bookkeeper you would hire" (spec 7.1.6, component 4.4.5).
 *
 * This component is close to unique in this market and is a core
 * differentiator: not one competitor reviewed shows the buyer who they would
 * actually be hiring before the sales call.
 *
 * IT ALSO CARRIES THE SITE'S MOST IMPORTANT HONESTY GUARD.
 * Publishing invented people would destroy the exact trust this section exists
 * to create. So while `staffProfilesConfirmed` is false, the page renders the
 * hiring standard instead - one honest card describing the bar every bookkeeper
 * meets, inventing nobody. Flip the flag only when all three profiles describe
 * real team members who have given permission, with real photographs.
 */
export function StaffSection() {
  return (
    <Section tone="paper">
      <div className="max-w-text">
        <h2>{staffProfilesConfirmed ? staff.h2 : staff.h2Fallback}</h2>
        <p className="mt-4 measure text-lead text-ink-muted">
          {staffProfilesConfirmed ? staff.intro : staff.hiringStandard.closing}
        </p>
      </div>

      {staffProfilesConfirmed ? (
        // Three-column grid on desktop, a scroll-snap row on mobile so the
        // cards stay full-size rather than shrinking to fit.
        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {staff.profiles.map((profile) => (
            <li
              key={profile.name}
              className="w-[85%] shrink-0 snap-start rounded-[12px] border border-border bg-surface p-6 shadow-rest sm:w-[60%] lg:w-auto lg:p-8"
            >
              <PlaceholderImage
                src={profile.photo}
                alt={`${profile.name}, bookkeeper at tryACOwork.`}
                width={400}
                height={400}
                note="Real photograph of this team member, 400x400, daylight."
                className="size-24"
                sizes="96px"
              />

              <h3 className="mt-4 font-sans text-h4 font-semibold">
                {profile.name}
              </h3>
              <p className="mt-1 text-body text-ink-muted">{profile.role}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-[999px] bg-sand px-3 py-1 text-small font-medium"
                  >
                    {credential}
                  </li>
                ))}
              </ul>

              {/* Text names rather than third-party logos: logos carry
                  trademark restrictions and imply partnerships. */}
              <p className="mt-4 text-small text-ink-muted">
                {profile.software.join(" · ")}
              </p>

              <p className="mt-4 text-small font-medium text-fern">
                {profile.overlap}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 max-w-text rounded-[12px] border border-border bg-surface p-6 shadow-rest lg:p-8">
          <h3 className="font-sans text-h4 font-semibold">
            {staff.hiringStandard.h4}
          </h3>
          <ul className="mt-6 grid gap-4">
            {staff.hiringStandard.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckIcon size={20} className="mt-1 text-fern" />
                <span className="text-body">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12">
        <Button asChild>
          <Link href={routes.freePilot}>{staff.buttonLabel}</Link>
        </Button>
      </div>
    </Section>
  );
}
