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

// The one pill style every section eyebrow shares — padding, size and
// line-height are set inline below because they're exact spec values
// (2px 7px / 11px / 12px), not a fit to Tailwind's 4px spacing scale.
const SHELL =
  'inline-flex items-center gap-[0.5em] rounded-full font-mono font-medium uppercase tracking-[0.16em] tabular-nums'

const SHELL_STYLE = { padding: '2px 7px', fontSize: '11px', lineHeight: '12px' } as const

// `default`'s ring is a 1px gradient hairline, not a flat border colour: the
// pill is a padding-box trick — this gradient paints the OUTER shell, and the
// inner shell is a solid white fill inset by exactly 1px, so only a 1px ring
// of the gradient ever shows.
const HAIRLINE_GRADIENT = 'linear-gradient(120deg, rgba(61,107,118,.45) 0%, rgba(173,199,206,.15) 60%, rgba(230,201,175,.45) 100%)'

const VARIANT: Record<Exclude<Variant, 'default'>, string> = {
  // The final CTA paints its own accent→ink gradient inline, so the role
  // tokens never re-scope there and have to be overridden by hand.
  'on-dark': 'border border-white/20 bg-white/10 text-white/85',
  // Over media. Currently unused — the hero opens with no tag at all — but
  // kept for any future chip that has to sit on a photo or video: a dark chip
  // stays legible across frames a light one cannot.
  'on-media': 'border border-white/25 bg-black/35 text-white backdrop-blur-[6px]',
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
  if (variant === 'default') {
    return (
      <span className="inline-flex rounded-full" style={{ padding: '1px', background: HAIRLINE_GRADIENT }}>
        <span className={`${SHELL} rounded-full bg-white text-[#999999] ${className}`} style={SHELL_STYLE}>
          {children}
        </span>
      </span>
    )
  }

  return (
    <span className={`${SHELL} ${VARIANT[variant]} ${className}`} style={SHELL_STYLE}>
      {children}
    </span>
  )
}
