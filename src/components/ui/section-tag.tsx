'use client'

import type { ReactNode } from 'react'

/**
 * The section tag — the small pill that names each section.
 *
 * It replaced a raw letterspaced <p>, and the reason is contrast as much as
 * looks: lifting the label onto a fixed surface fill keeps it legible instead
 * of fading into whatever sits behind it.
 *
 * Note: the blueprint branch re-scoped these tokens inside a `.tone-deep`
 * wrapper so one class string survived four section tones. That tone system
 * was NOT ported here, so `default` is simply the light-ground variant. The
 * two dark variants below are set explicitly.
 */

type Variant = 'default' | 'on-dark' | 'on-media'

// pt-[4px] is an optical correction, not a guess. The label is all-caps mono
// with `leading-none`, so the line box is exactly 1em tall while the visible
// glyphs occupy only the cap-height band near its top — there are no
// descenders to fill the bottom. `items-center` dutifully centres that box,
// which leaves the ink measurably high: 8.7px of air above versus 13px below.
// Since Tailwind is border-box, top padding shrinks the centring area and
// pushes the ink down by half the padding, so 4px buys the ~2px it needs.
//
// pr is 2px tighter than pl for the same reason on the other axis: letter-
// spacing appends a trailing space after the final glyph that padding cannot
// see, so symmetric padding renders visually left-heavy.
const SHELL =
  'inline-flex h-[26px] items-center gap-[0.5em] rounded-full border pl-3 pr-[10px] pt-[4px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] tabular-nums md:h-7 md:text-[11px]'

const VARIANT: Record<Variant, string> = {
  // Light ground — the only variant the homepage currently uses.
  default: 'border-ink/[0.14] bg-white text-ink/70',
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
