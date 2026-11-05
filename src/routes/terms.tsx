import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/shared/LegalPage'
import { business } from '@/config/business'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/terms')({
  head: () => seo({ title: 'Terms and Conditions | ClimatePro', description: 'Terms for using the ClimatePro website, including estimate requests, appointment requests, and website content.', path: '/terms' }),
  component: () => (
    <LegalPage
      title="Terms and Conditions"
      updated="November 2026"
      intro={`These terms apply to your use of the ${business.name} website.`}
      sections={[
        { heading: 'Website information', body: ['Content on this website is general information about heating, ventilation, and air conditioning services. It is not a substitute for an on-site professional assessment of your system.'] },
        { heading: 'Estimate requests', body: ['Submitting a quote request does not create a contract. Any estimate we provide is based on the information available at the time and may change after an assessment.', 'The installation estimate assistant provides indicative recommendations only. It does not determine system sizing or final pricing.'] },
        { heading: 'Appointment requests', body: ['Preferred dates and times submitted through the booking form are requests only. An appointment is confirmed only when our team contacts you to confirm availability.'] },
        { heading: 'Maintenance plans', body: ['Plans described on this website are illustrative. Actual plan inclusions, pricing, and terms are provided in writing before you enrol.'] },
        { heading: 'Emergency and urgent issues', body: [`Service availability depends on our business hours. For situations involving immediate danger — such as a suspected gas leak, electrical fire, or carbon monoxide alarm — leave the property and contact emergency services.`] },
        { heading: 'Limitation of liability', body: ['To the extent permitted by law, we are not liable for loss arising from reliance on general website content. Nothing in these terms limits rights you have under applicable consumer law.'] },
        { heading: 'Changes', body: ['We may update these terms from time to time. The current version will always be available on this page.'] },
      ]}
    />
  ),
})
