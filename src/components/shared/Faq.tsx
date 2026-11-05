import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function Faq({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return (
    <>
      <Accordion type="single" collapsible className="divide-y rounded-2xl border bg-white">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-b-0 px-5 sm:px-6">
            <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {withSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  )
}
