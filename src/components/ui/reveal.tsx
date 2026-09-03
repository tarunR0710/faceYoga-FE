'use client'

import type { ElementType, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Position in a sibling run — drives the stagger delay. */
  index?: number
  /** Extra delay on top of the stagger, in seconds. */
  delay?: number
  /** Travel distance and axis. `up` is the house default. */
  from?: 'up' | 'left' | 'right' | 'scale' | 'none'
  as?: ElementType
  className?: string
  style?: React.CSSProperties
}

const OFFSET = {
  up: { y: 22 },
  left: { x: -14 },
  right: { x: 14 },
  scale: { scale: 0.97 },
  none: {},
} as const

/**
 * One reveal, used everywhere.
 *
 * Before this, every section re-declared the same four framer-motion props and
 * they drifted — different distances, different curves, viewport margins that
 * did not match. Variety on this page comes from layout, not from each section
 * inventing its own easing.
 *
 * Under `prefers-reduced-motion` the travel is dropped and only opacity runs.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  from = 'up',
  as = 'div',
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, ...(reduce ? {} : OFFSET[from]) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ ...REVEAL, ease: EASE_OUT, delay: delay + stagger(index) }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  )
}
