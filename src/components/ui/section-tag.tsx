'use client'

import type { ReactNode } from 'react'

/**
 * The section tag — the small pill that names each section.
 *
 * It replaced a raw letterspaced <p>, and the reason is contrast as much as
 * looks: on the `glow` band that raw text sat at 4.84:1, the worst type on the
 * page. Lifting it onto a fixed surface fill puts every tone at ≥6.5:1.
 *
 * Every token here is already re-scoped inside `.tone-deep`, so ONE class
 * string survives all four section tones with no conditionals — `bg-surface`
 * becomes graphite, `border-border` becomes a lit rim, `text-analysis-teal`
 * lightens. The variants below are only for the two grounds that are dark
 * WITHOUT being `.tone-deep`: the CTA's own gradient and the hero's video.
 */

type Variant = 'default' | 'on-dark' | 'on-media'

const SHELL =
  'inline-flex h-[26px] items-center gap-[0.5em] rounded-full border pl-3 pr-[10px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.18em] tabular-nums md:h-7 md:text-[11px]'

const VARIANT: Record<Variant, string> = {
  // Re-themes itself on all four tone bands.
  default: 'border-border bg-surface text-analysis-teal',
  // The final CTA paints its own accent→ink gradient inline, so the role
  // tokens never re-scope there and have to be overridden by hand.
  'on-dark': 'border-white/20 bg-white/10 text-white/85',
  // Over media. Currently unused — the hero opens with no tag at all — but
  // kept for any future chip that has to sit on a photo or video: a dark chip
  // stays legible across frames a light one cannot.
  'on-media': 'border-white/25 bg-black/35 text-white backdrop-blur-[6px]',
}

type SectionTagProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function SectionTag({
  children,
  variant = 'default',
  className = '',
}: SectionTagProps) {
  return <span className={`${SHELL} ${VARIANT[variant]} ${className}`}>{children}</span>
}
