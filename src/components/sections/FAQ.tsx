import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";

export type FaqItem = { q: string; a: string };

type FAQProps = {
  title?: string;
  faqs: readonly FaqItem[];
  id?: string;
  className?: string;
  /** Accordion item value to open by default, e.g. "item-0" for the first. */
  defaultValue?: string;
};

export function FAQ({
  title = "Frequently asked questions",
  faqs,
  id = "faq",
  defaultValue,
}: FAQProps) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id={id} className="section-y scroll-mt-20">
      <div className="container-content max-w-3xl">
        <SectionHeading title={title} />
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
          className="mt-8 w-full"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
