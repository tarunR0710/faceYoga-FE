// Shared motion kit — one easing language + distance band across the whole site.
// Variety comes from changing axis / direction / scale / stagger, NOT from
// inventing new curves per section. Reveals use EASE_OUT; continuous /
// scroll-linked motion uses EASE_IN_OUT. Keep reveal travel 20–32px, 0.55–0.7s.
import { useEffect, useState } from 'react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const // decisive arrival — the reveal workhorse
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const // gentler, for large elements
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const // symmetric — parallax / scroll-linked

// Standard viewport for SECTION-level scroll reveals: fire slightly early,
// never re-trigger.
export const VIEWPORT = { once: true, margin: '-80px' } as const

// For elements INSIDE an already-revealed figure (glyphs on a diagram, markers
// on a chart). The -80px above insets the detection box, so anything that comes
// to rest within 80px of the viewport top never registers as in view and stays
// at opacity 0 forever — which is exactly what happened to the Start/Stop
// glyphs on the protocol diagram. No margin here, and no negative inset.
export const VIEWPORT_TIGHT = { once: true, amount: 0 } as const

// ── Transition presets (apple-scroll-playbook §6) ─────────────────────────────
// Use these instead of re-declaring durations/curves per section. Blueprint's
// developer handoff asks for "slow reveals, 400–700 ms" — REVEAL is the default.
export const REVEAL = { duration: 0.7, ease: EASE_OUT_SOFT } as const
export const REVEAL_CRISP = { duration: 0.6, ease: EASE_OUT } as const
export const REVEAL_SLOW = { duration: 0.9, ease: EASE_OUT_SOFT } as const
export const STAGGER = { staggerChildren: 0.1, delayChildren: 0.05 } as const
export const SCRUB_SPRING = { stiffness: 90, damping: 28, restDelta: 0.001 } as const
// Interaction feedback (tap / hover press) — snappier than a reveal on purpose.
export const TAP_SPRING = { type: 'spring', stiffness: 420, damping: 30 } as const

// Stagger helper — keeps sibling delays inside the 0.06–0.14s band no matter
// how many items a grid has (a 12-card grid must not take 1.4s to appear).
export function stagger(index: number, step = 0.08, cap = 0.56) {
  return Math.min(index * step, cap)
}

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
