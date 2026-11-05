import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/shared/LegalPage'
import { business } from '@/config/business'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/privacy-policy')({
  head: () => seo({ title: 'Privacy Policy | ClimatePro', description: 'How ClimatePro collects, uses, and protects the personal information you share through quote, booking, and contact forms.', path: '/privacy-policy' }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      intro={`This policy explains how ${business.name} handles personal information submitted through this website.`}
      sections={[
        { heading: 'Information we collect', body: ['When you request an estimate, book a service, or contact us, we collect the details you provide — such as your name, email address, phone number, property location, and a description of your HVAC requirements.', 'We may also collect basic technical information (such as browser type and pages visited) needed to operate and secure the website.'] },
        { heading: 'How we use your information', body: ['We use your information to respond to your enquiry, prepare estimates, arrange appointments, and provide the services you request.', 'We do not sell your personal information. We only contact you about your request unless you separately agree to receive other communications.'] },
        { heading: 'Form processing', body: ['Website forms are processed by our hosting provider’s form service, which stores submissions so our team can review them. Spam filtering may be applied automatically.'] },
        { heading: 'Sharing information', body: ['We may share information with service providers who help us operate the website or deliver services (for example hosting or scheduling tools), only as needed for those purposes, or where required by law.'] },
        { heading: 'Retention and security', body: ['We keep enquiry information only as long as needed for the purposes above or as required by law, and take reasonable steps to protect it from misuse, loss, and unauthorized access.'] },
        { heading: 'Your choices', body: ['You may ask to access, correct, or delete the personal information we hold about you. Contact us using the details on our Contact page.'] },
        { heading: 'Contact', body: [`Questions about this policy can be sent to ${business.contact[business.defaultMarket].email}.`] },
      ]}
    />
  ),
})
