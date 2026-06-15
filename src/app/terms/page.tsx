import type { Metadata } from "next";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | tryacowork",
  description:
    "The terms governing your use of the tryacowork (VSH Enterprise Pvt Ltd) website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="8 June 2026">
      <p>
        These Terms govern your use of {site.domain}, operated by{" "}
        {site.legalName} (&quot;{site.name}&quot;). By using this website you
        agree to these Terms.
      </p>

      <h2>Use of the website</h2>
      <p>
        This website is provided for general information about our services. You
        agree to use it lawfully and not to misuse or disrupt it.
      </p>

      <h2>No professional advice</h2>
      <p>
        Content on this site is for information only and is not accounting,
        financial, legal or tax advice. Engagements are governed by a separate
        services agreement.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, branding and design of this site belong to {site.legalName}{" "}
        unless otherwise stated, and may not be copied without permission.
      </p>

      <h2>Disclaimers &amp; liability</h2>
      <p>
        The website is provided &quot;as is&quot; without warranties of any
        kind. To the extent permitted by law, {site.name} is not liable for
        indirect, incidental or consequential loss arising from your use of the
        site.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and the courts of India
        have exclusive jurisdiction over any dispute relating to this website,
        without affecting any mandatory consumer protections available to you in
        your country of residence.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
