import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/SectionHeading'
import { ContactForm, contactTopics, type ContactTopic } from '@/components/forms/ContactForm'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { SampleNotice } from '@/components/shared/SampleNotice'
import { business, hasAddress } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { oneOf, str } from '@/lib/search'
import { seo } from '@/lib/seo'

const topicValues = contactTopics.map((t) => t.value) as ContactTopic[]
const socials = [
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'youtube', label: 'YouTube', icon: YoutubeIcon },
] as const

export const Route = createFileRoute('/contact')({
  validateSearch: (s: Record<string, unknown>): { topic?: ContactTopic; plan?: string } => ({
    topic: oneOf(s.topic, topicValues),
    plan: str(s.plan, 40),
  }),
  head: () =>
    seo({
      title: 'Contact ClimatePro | HVAC Enquiries & Support',
      description: 'Contact ClimatePro by phone, email, or online form for HVAC installation, repair, maintenance, and commercial enquiries.',
      path: '/contact',
      image: '/img/about-team.jpg',
    }),
  component: ContactPage,
})

function ContactPage() {
  const { topic, plan } = Route.useSearch()
  const { contact, market } = useMarket()
  const addressText = hasAddress(contact)
    ? `${contact.address.street}, ${contact.address.locality} ${contact.address.region} ${contact.address.postalCode}`
    : null

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch With Our Team"
        description="Questions about a service, a quote, or your system? Call, email, or send a message and we’ll get back to you."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="bg-surface py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm key={`${topic}-${plan}`} topic={topic} plan={plan} />
          </div>
          <aside className="space-y-5 lg:col-span-5">
            <div className="rounded-3xl border bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">Contact details</h2>
              <ul className="mt-5 space-y-5">
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary"><Phone className="size-5" aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Phone</span>
                    <a href={`tel:${contact.phoneHref}`} className="text-lg font-bold text-navy hover:text-primary">{contact.phoneDisplay}</a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary"><Mail className="size-5" aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Email</span>
                    <a href={`mailto:${contact.email}`} className="font-bold break-all text-navy hover:text-primary">{contact.email}</a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary"><Clock className="size-5" aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Business hours</span>
                    {business.hours.map((h) => (
                      <span key={h.label} className="block font-medium text-navy">{h.label}: {h.hours}</span>
                    ))}
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary"><MapPin className="size-5" aria-hidden="true" /></span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Address</span>
                    <span className="font-medium text-navy">{addressText ?? `Serving ${contact.baseLocation} and surrounding areas. Street address not configured.`}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-6 border-t pt-5">
                <p className="text-sm font-semibold text-navy">Follow us</p>
                <ul className="mt-3 flex gap-2">
                  {socials.map((s) => {
                    const url = business.social[s.key]
                    return (
                      <li key={s.key}>
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${business.name} on ${s.label}`} className="grid size-10 place-items-center rounded-full bg-brand-soft text-primary hover:bg-primary hover:text-white">
                            <s.icon className="size-4" />
                          </a>
                        ) : (
                          <span title={`${s.label} profile not yet configured`} className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
                            <s.icon className="size-4" />
                            <span className="sr-only">{s.label} (not configured)</span>
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div
              className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border bg-[linear-gradient(#e3e8ef_1px,transparent_1px),linear-gradient(90deg,#e3e8ef_1px,transparent_1px)] bg-[size:28px_28px] bg-white"
              role="img"
              aria-label="Map placeholder"
            >
              <div className="rounded-2xl bg-white/95 p-5 text-center shadow-lg">
                <MapPin className="mx-auto size-8 text-primary" aria-hidden="true" />
                <p className="mt-2 font-bold text-navy">Map integration placeholder</p>
                <p className="mt-1 max-w-56 text-xs text-muted-foreground">Add a map embed once a real business address is configured.</p>
              </div>
            </div>
            <SampleNotice>Contact details shown for the {market.countryName} configuration are sample placeholders.</SampleNotice>
          </aside>
        </Container>
      </section>
    </>
  )
}
