'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { EASE_OUT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { TRAIT_CHIP_ICONS, TRAIT_CHIP_HUES } from '@/lib/trait-chip-style'

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
}

/**
 * Phone/tablet counterpart to FloatingChips — there's no side gutter to
 * scatter into below `xl`, so the same trait chips wrap as an ordinary flex
 * row instead of floating. Same icons, hues and stagger as the desktop
 * version, just laid out in flow.
 */
export function InlineChips({ items, className }: { items: readonly string[]; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div className={className}>
      {items.map((label, i) => {
        const Icon = TRAIT_CHIP_ICONS[i % TRAIT_CHIP_ICONS.length]
        const hue = TRAIT_CHIP_HUES[i % TRAIT_CHIP_HUES.length]
        return (
          <motion.span
            key={label}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_TIGHT}
            variants={chipVariants}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.07) }}
            className={`inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-medium text-ink shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ${hue.ring}`}
          >
            <Icon className={`h-3.5 w-3.5 ${hue.icon}`} strokeWidth={2.25} />
            {label}
          </motion.span>
        )
      })}
    </div>
  )
}
