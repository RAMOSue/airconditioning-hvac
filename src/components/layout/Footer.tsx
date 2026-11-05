import { Link } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/shared/SocialIcons'
import { Logo } from '@/components/shared/Logo'
import { business, hasAddress } from '@/config/business'
import { services, serviceName } from '@/config/services'
import { serviceAreas } from '@/config/serviceAreas'
import { useMarket } from '@/lib/market-context'
import { MarketSwitcher } from './MarketSwitcher'

const socials = [
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'youtube', label: 'YouTube', icon: YoutubeIcon },
] as const

const linkClass = 'rounded text-slate-300 transition-colors hover:text-white'

export function Footer() {
  const { code, contact, market } = useMarket()
  const areas = serviceAreas[code]

  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm leading-relaxed">
            {business.description} {business.tagline}
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socials.map((s) => {
              const url = business.social[s.key]
              return (
                <li key={s.key}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${business.name} on ${s.label}`} className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-brand">
                      <s.icon className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span title={`${s.label} profile not yet configured`} className="grid size-10 place-items-center rounded-full bg-white/5 text-slate-400">
                      <s.icon className="size-4" aria-hidden="true" />
                      <span className="sr-only">{s.label} profile placeholder (not configured)</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className={linkClass}>
                  {serviceName(s, code)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/maintenance-plans" className={linkClass}>Maintenance Plans</Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className={linkClass}>About Us</Link></li>
            <li><Link to="/services" className={linkClass}>All Services</Link></li>
            <li><Link to="/service-areas" className={linkClass}>Service Areas</Link></li>
            <li><Link to="/get-a-quote" className={linkClass}>Request a Free Estimate</Link></li>
            <li><Link to="/book-service" className={linkClass}>Book a Service</Link></li>
            <li><Link to="/contact" className={linkClass}>Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${contact.phoneHref}`} className={`${linkClass} inline-flex items-center gap-2`}>
                <Phone className="size-4 text-brand" aria-hidden="true" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail className="size-4 text-brand" aria-hidden="true" /> {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              {hasAddress(contact)
                ? `${contact.address.street}, ${contact.address.locality} ${contact.address.region} ${contact.address.postalCode}`
                : `Serving ${contact.baseLocation} and surrounding areas (sample)`}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                {business.hours.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.hours}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <h3 className="mt-6 text-sm font-bold tracking-wider text-white uppercase">Service areas</h3>
          <p className="mt-2 text-sm">
            {areas.map((a, i) => (
              <span key={a.id}>
                {a.name}
                {i < areas.length - 1 ? ' · ' : ''}
              </span>
            ))}{' '}
            —{' '}
            <Link to="/service-areas" className="font-semibold text-white underline-offset-2 hover:underline">
              check your {market.postalLabel.toLowerCase()}
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {business.name}.{' '}
            {business.isSampleData && 'Fictional portfolio brand — all business details are sample content.'}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link>
            <Link to="/terms" className={linkClass}>Terms and Conditions</Link>
            <span className="inline-flex items-center gap-2">
              <span className="text-xs">Market:</span> <MarketSwitcher />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
