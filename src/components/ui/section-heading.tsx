'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'

type SectionHeadingProps = {
  /**
   * The blueprint's section label. Keep it in SENTENCE case — the uppercase is
   * a CSS transform, so screen readers still get readable words. Four words max.
   */
  eyebrow: string
  /** First sentence of the headline — full-strength ink. */
  title: ReactNode
  /** Second sentence — rendered at 40% ink, the house two-tone headline. */
  muted?: ReactNode
  /** Supporting paragraph under the headline. */
  lede?: ReactNode
  /** Right-hand editorial note (blueprint's margin guidance blocks). Desktop only column. */
  note?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Tightens the bottom margin for sections whose first row sits close. */
  tight?: boolean
}

/**
 * One header for every section: same eyebrow tracking, same two-tone h2, same
 * reveal. Section-to-section consistency is most of the premium impression
 * (playbook §9 "consistency fix worth doing first"), so headers are not
 * re-typeset per component.
 */
export function SectionHeading({
  eyebrow,
  title,
  muted,
  lede,
  note,
  align = 'center',
  className = '',
  tight = false,
}: SectionHeadingProps) {
  const reduce = useReducedMotion()
  const centered = align === 'center'

  const heading = (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={REVEAL}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
    >
      <div className="mb-5">
        <SectionTag>{eyebrow}</SectionTag>
      </div>
      <h2
        className="text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
        style={{ fontWeight: 300 }}
      >
        {title}
        {muted ? <span className="text-ink/55"> {muted}</span> : null}
      </h2>
      {lede ? (
        <p className="mt-5 text-[14px] leading-relaxed text-ink-muted md:text-[16px]">{lede}</p>
      ) : null}
    </motion.div>
  )

  if (!note) {
    return <div className={`${tight ? 'mb-8 md:mb-10' : 'mb-12 md:mb-16'} ${className}`}>{heading}</div>
  }

  // Centred headings stack the note underneath rather than beside: a marginal
  // note pinned to the right of centred type reads as a stray fragment, and it
  // drags the heading off the page's optical centre.
  if (centered) {
    return (
      <div className={`${tight ? 'mb-8 md:mb-10' : 'mb-12 md:mb-16'} ${className}`}>
        {heading}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mx-auto mt-6 max-w-lg text-center text-[13px] leading-relaxed text-ink/55 md:text-[14px]"
        >
          {note}
        </motion.p>
      </div>
    )
  }

  return (
    <div
      className={`${tight ? 'mb-8 md:mb-10' : 'mb-12 md:mb-16'} grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-12 ${className}`}
    >
      {heading}
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ ...REVEAL, delay: 0.1 }}
        className="border-l border-border pl-4 text-[13px] leading-relaxed text-ink/60 md:text-[14px]"
      >
        {note}
      </motion.p>
    </div>
  )
}
