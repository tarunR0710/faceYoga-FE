'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

/**
 * Word-by-word blur-to-focus, scrubbed by the reader's own scroll position
 * (not a whileInView trigger) — the words nearer the top of the passage are
 * already sharp by the time the words near the bottom start clearing.
 *
 * Reduced motion renders the plain paragraph at full opacity, no scroll wiring.
 */
export function BlurReveal({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] })
  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <span key={`${word}-${i}`}>
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>{' '}
          </span>
        )
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const blur = useTransform(progress, range, [6, 0])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.span style={{ opacity, filter }} className="inline-block will-change-[filter,opacity]">
      {children}
    </motion.span>
  )
}
