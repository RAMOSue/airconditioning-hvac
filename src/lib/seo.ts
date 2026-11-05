import { business } from '@/config/business'

interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
}

/** Per-route head() helper: unique title, description, canonical, and Open Graph tags. */
export function seo({ title, description, path, image = '/img/hero-technician.jpg' }: SeoInput) {
  const url = `${business.siteUrl}${path === '/' ? '' : path}`
  const ogImage = `${business.siteUrl}/.netlify/images?url=${encodeURIComponent(image)}&w=1200&h=630&fit=cover&fm=jpg`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: business.name },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
