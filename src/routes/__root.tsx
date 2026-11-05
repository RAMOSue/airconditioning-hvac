import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { business, hasAddress } from '@/config/business'
import { serviceAreas } from '@/config/serviceAreas'
import { MarketProvider } from '@/lib/market-context'

import '../styles.css'

const siteName = 'ClimatePro | Professional HVAC & Air Conditioning Services'
const siteDescription =
  'Explore professional air conditioning installation, HVAC repairs, heating, cooling, and maintenance services. Request a service or free estimate.'

/**
 * LocalBusiness structured data. Contact details, address, hours, and areas
 * are only published once `business.isSampleData` is false, so fictional
 * details never appear in search results.
 */
function localBusinessJsonLd() {
  const contact = business.contact[business.defaultMarket]
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: business.name,
    slogan: business.tagline,
    description: business.description,
    url: business.siteUrl,
    image: `${business.siteUrl}/img/hero-technician.jpg`,
  }
  if (business.isSampleData) return base
  return {
    ...base,
    telephone: contact.phoneHref,
    email: contact.email,
    ...(hasAddress(contact) && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.address.street,
        addressLocality: contact.address.locality,
        addressRegion: contact.address.region,
        postalCode: contact.address.postalCode,
        addressCountry: business.defaultMarket,
      },
    }),
    areaServed: serviceAreas[business.defaultMarket].map((a) => ({ '@type': 'Place', name: `${a.name}, ${a.region}` })),
  }
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#101D35' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return (
    <MarketProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </MarketProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
      </head>
      <body className="pb-16 md:pb-0">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
