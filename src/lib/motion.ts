// Shared motion kit — one easing language + distance band across the whole site.
// Variety comes from changing axis / direction / scale / stagger, NOT from
// inventing new curves per section. Reveals use EASE_OUT; continuous /
// scroll-linked motion uses EASE_IN_OUT. Keep reveal travel 20–32px, 0.55–0.7s.
import { useEffect, useState } from 'react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const // decisive arrival — the reveal workhorse
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const // gentler, for large elements
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const // symmetric — parallax / scroll-linked

// Standard viewport for scroll reveals: fire slightly early, never re-trigger.
export const VIEWPORT = { once: true, margin: '-80px' } as const

// Desktop gate for heavy scroll effects (sticky pins, parallax).
// SSR-safe: starts false, so server + first paint render the mobile/static
// fallback, then upgrades after mount (no hydration mismatch).
export function useIsDesktop(query = '(min-width: 768px)') {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return isDesktop
}
