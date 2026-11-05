import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow mb-3', tone === 'light' && 'text-brand')}>{eyebrow}</p>}
      <Tag className={cn('text-3xl font-extrabold sm:text-4xl', tone === 'light' && 'text-white')}>{title}</Tag>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed', tone === 'dark' ? 'text-muted-foreground' : 'text-slate-300')}>
          {description}
        </p>
      )}
    </div>
  )
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
