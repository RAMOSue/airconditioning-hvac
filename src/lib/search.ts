/** Helpers for validating optional string search params. */
export function str(v: unknown, max = 500): string | undefined {
  if (typeof v === 'number') v = String(v)
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t ? t.slice(0, max) : undefined
}

export function oneOf<T extends string>(v: unknown, allowed: readonly T[]): T | undefined {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : undefined
}
