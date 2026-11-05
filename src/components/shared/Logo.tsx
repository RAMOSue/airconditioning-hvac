import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('size-9', className)}>
      <rect width="40" height="40" rx="10" fill="#2678F3" />
      <path d="M20 8v24M9.6 14l20.8 12M9.6 26l20.8-12" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4.2" fill="#101D35" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 rounded-md', className)} aria-label="ClimatePro home">
      <LogoMark />
      <span className={cn('text-xl font-extrabold tracking-tight', tone === 'dark' ? 'text-navy' : 'text-white')}>
        Climate<span className={tone === 'dark' ? 'text-primary' : 'text-brand'}>Pro</span>
      </span>
    </Link>
  )
}
