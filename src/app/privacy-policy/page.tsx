import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { routes } from "@/content/global";
import { getLegalDoc } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.privacy);

/** Privacy Policy (spec 7.9.1). Content lives in /content/legal so the client
 *  can edit it without the developer. Indexable, per spec 7.9.3. */
export default function PrivacyPolicyPage() {
  const doc = getLegalDoc("privacy-policy");
  if (!doc) notFound();

  return (
    <>
      <LegalLayout doc={doc} />
      <BreadcrumbSchema
        trail={[{ name: "Privacy Policy", path: routes.privacy }]}
      />
    </>
  );
}
