import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import { getLegalDoc } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.terms);

/** Terms of Service (spec 7.9.2). Website terms only - not the client service
 *  agreement, which is a separate commercial contract and is not published. */
export default function TermsPage() {
  const doc = getLegalDoc("terms");
  if (!doc) notFound();

  return (
    <>
      <LegalLayout doc={doc} />
      <BreadcrumbSchema
        trail={[{ name: "Terms of Service", path: routes.terms }]}
      />
    </>
  );
}
