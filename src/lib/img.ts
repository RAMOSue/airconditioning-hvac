/**
 * Build a Netlify Image CDN URL so pages never ship full-resolution originals.
 * Local source images live in /public/img.
 */
export function cdn(src: string, width: number, height?: number) {
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp', q: '72' })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}

/** Responsive srcset for a set of widths. */
export function cdnSrcSet(src: string, widths: number[], aspect?: number) {
  return widths
    .map((w) => `${cdn(src, w, aspect ? Math.round(w / aspect) : undefined)} ${w}w`)
    .join(', ')
}
