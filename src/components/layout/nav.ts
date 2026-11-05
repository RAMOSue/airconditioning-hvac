import type { LinkProps } from '@tanstack/react-router'

export const mainNav: { label: string; to: LinkProps['to'] }[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Maintenance Plans', to: '/maintenance-plans' },
  { label: 'Service Areas', to: '/service-areas' },
  { label: 'Contact', to: '/contact' },
]
