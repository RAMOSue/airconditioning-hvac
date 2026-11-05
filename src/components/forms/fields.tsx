import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Labelled field wrapper with accessible hint and error messaging. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string
  label: ReactNode
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
        {required ? <span className="ml-0.5 text-destructive" aria-hidden="true">*</span> : <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  )
}

export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-sm font-medium text-destructive">
      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

/** aria props for an input given its field id and error. */
export function aria(id: string, error?: string, hint?: boolean) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const
}

export const inputClass = 'h-12 rounded-lg bg-white text-base md:text-base'

export const selectClass =
  'h-12 w-full rounded-lg border border-input bg-white px-3 text-base text-navy shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive'

/** Large selectable card used for radio-style choices. */
export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
}: {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  title: string
  description?: string
  icon?: ReactNode
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border-2 bg-white p-4 transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50',
        checked ? 'border-primary bg-brand-soft/60' : 'border-border hover:border-brand/40',
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {icon && <span className={cn('grid size-10 shrink-0 place-items-center rounded-lg', checked ? 'bg-primary text-white' : 'bg-surface text-primary')}>{icon}</span>}
      <span className="min-w-0">
        <span className="block font-bold text-navy">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>}
      </span>
      <span
        aria-hidden="true"
        className={cn('ml-auto mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2', checked ? 'border-primary bg-primary' : 'border-slate-300')}
      >
        {checked && <span className="size-2 rounded-full bg-white" />}
      </span>
    </label>
  )
}

/** Hidden honeypot field for Netlify Forms spam protection. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <p className="hidden" aria-hidden="true">
      <label>
        Leave this field empty
        <input name="bot-field" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </p>
  )
}
