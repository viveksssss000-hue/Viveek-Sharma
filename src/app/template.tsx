/**
 * Cross-page transition. Next remounts a template on every navigation, so the
 * incoming page settles up into place (.page-enter, CSS-only, gated to
 * prefers-reduced-motion: no-preference). The header, footer and sticky bar
 * live in layout.tsx and therefore do not re-animate.
 *
 * The wrapper briefly establishes a containing block while its transform
 * animates (450ms). Nothing position:fixed renders inside <main> - the skip
 * link, sticky bar, consent banner and progress bar are all siblings - so
 * that window is harmless.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
