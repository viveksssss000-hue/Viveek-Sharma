import { AlertTriangle } from "lucide-react";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

/** Shared wrapper for Privacy / Terms / Cookie pages with readable prose. */
export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <section className="section-y">
      <div className="container-content max-w-3xl">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <p>
            This is a placeholder template, not legal advice. TODO(client/legal):
            have qualified counsel review and finalise before launch.
          </p>
        </div>

        <div className="legal-prose mt-10 flex flex-col gap-6 text-muted-foreground leading-relaxed [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </section>
  );
}
