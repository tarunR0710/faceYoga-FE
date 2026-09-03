'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { EASE_OUT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { TRAIT_CHIP_ICONS, TRAIT_CHIP_HUES } from '@/lib/trait-chip-style'

// Chips live entirely in the gutter beside the (narrower) text column — never
// above/below it, where they'd collide with the heading above or the buttons
// below. The caller renders this inside a wrapper wider than the text, so
// small left/right percentages here land outside the column while `top` can
// range 0–100% for vertical spread with zero risk of crossing a text line.
// That gutter only exists once the wrapper is genuinely wide, which is why
// this component is desktop-only — see InlineChips for the narrow-viewport
// equivalent of the same effect.
const POSITIONS = [
  { top: '-6%', left: '0%' },
  { top: '4%', right: '0%' },
  { top: '46%', left: '0%' },
  { top: '58%', right: '0%' },
  { top: '84%', left: '0%' },
] as const

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
}

/** Desktop-only scatter — pass a `className` that hides this below the breakpoint your layout can afford (see cta.tsx: `hidden xl:block`). */
export function FloatingChips({ items, className }: { items: readonly string[]; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div className={className} aria-hidden="true">
      {items.slice(0, POSITIONS.length).map((label, i) => {
        const Icon = TRAIT_CHIP_ICONS[i % TRAIT_CHIP_ICONS.length]
        const hue = TRAIT_CHIP_HUES[i % TRAIT_CHIP_HUES.length]
        return (
          <motion.span
            key={label}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_TIGHT}
            variants={chipVariants}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 + stagger(i, 0.15) }}
            className={`absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ${hue.ring}`}
            style={POSITIONS[i]}
          >
            <Icon className={`h-3.5 w-3.5 ${hue.icon}`} strokeWidth={2.25} />
            {label}
          </motion.span>
        )
      })}
    </div>
  )
}
