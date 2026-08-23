import { Section } from "@/components/sections/Section";
import { comparison } from "@/content/home";
import { annualFullTime, usd } from "@/lib/site";

/**
 * The cost comparison table (spec 7.1.9).
 *
 * On mobile the table becomes stacked cards - one card per row - rather than
 * scrolling sideways, so nothing on the page ever scrolls horizontally. It is
 * still one real <table> in the DOM, with the table roles restated explicitly
 * because switching the display to block would otherwise strip them from a
 * screen reader.
 *
 * Two rules with teeth:
 *  - The source line appears in full. That is the difference between a credible
 *    table and marketing arithmetic.
 *  - No "save 70 percent" headline over the top. The table is more persuasive
 *    than the percentage, and a bare percentage invites scepticism.
 *
 * The tryACOwork annual figure is computed from the monthly price, so it can
 * never fall out of step with the price block.
 */
export function ComparisonTable() {
  const rows = comparison.rows.map((row) => ({
    ...row,
    tryacowork:
      row.tryacowork === "ANNUAL_PRICE"
        ? `${usd(annualFullTime)} a year`
        : row.tryacowork,
  }));

  const [, inHouseHead, tryacoworkHead] = comparison.columnHeads;

  return (
    <Section tone="paper" width="narrow">
      <div className="text-center">
        <h2>{comparison.h2}</h2>
        <p className="mx-auto mt-4 measure text-lead text-ink-muted">
          {comparison.intro}
        </p>
      </div>

      <table role="table" className="mt-12 block md:table">
        <caption className="sr-only-focusable">
          {comparison.h2} {comparison.intro}
        </caption>

        <thead role="rowgroup" className="hidden md:table-header-group">
          <tr role="row">
            <th
              role="columnheader"
              scope="col"
              className="w-[34%] border-b border-border bg-sand p-4 text-left font-sans text-small font-semibold uppercase tracking-[0.08em] text-ink-muted"
            >
              <span className="sr-only-focusable">Cost</span>
            </th>
            <th
              role="columnheader"
              scope="col"
              className="border-b border-border bg-sand p-4 text-left font-sans text-h4 font-semibold"
            >
              {inHouseHead}
            </th>
            <th
              role="columnheader"
              scope="col"
              className="border-b border-border bg-sand p-4 text-left font-sans text-h4 font-semibold"
            >
              {tryacoworkHead}
            </th>
          </tr>
        </thead>

        <tbody role="rowgroup" className="block md:table-row-group">
          {rows.map((row) => (
            <tr
              key={row.label}
              role="row"
              className="mb-4 block rounded-[12px] border border-border bg-surface p-6 last:mb-0 md:mb-0 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0"
            >
              <th
                role="rowheader"
                scope="row"
                className="block text-left font-sans text-h4 font-semibold md:table-cell md:border-b md:border-border md:p-4 md:align-top md:text-body"
              >
                {row.label}
              </th>
              <td
                role="cell"
                className="mt-3 block md:table-cell md:mt-0 md:border-b md:border-border md:p-4 md:align-top"
              >
                <span className="mr-2 font-medium text-ink-muted md:hidden">
                  {inHouseHead}:
                </span>
                <span className="text-ink-muted">{row.inHouse}</span>
              </td>
              <td
                role="cell"
                className="mt-2 block md:table-cell md:mt-0 md:border-b md:border-border md:p-4 md:align-top"
              >
                <span className="mr-2 font-medium text-ink-muted md:hidden">
                  {tryacoworkHead}:
                </span>
                <span className="font-medium text-fern">{row.tryacowork}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-8 measure text-small text-ink-muted">
        {comparison.source}
      </p>
    </Section>
  );
}
