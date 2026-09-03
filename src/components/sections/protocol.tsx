'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'
import { ProtocolSequence } from '@/components/ui/protocol-sequence'
import { PROTOCOL } from '@/lib/content'

/**
 * The Appearance Protocol — the one genuinely unique thing in this offer.
 *
 * Kept short and given one diagram. The old build said First / Next / Later in
 * three separate sections and drew it twice; it is stated exactly once now, and
 * the schedule diagram carries the part prose cannot: that earlier phases keep
 * running underneath later ones, and that "Later" may never start at all.
 *
 * The stop line is the argument. No product funnel in this market — no brand
 * quiz, no salon, no serum subscription — has any commercial reason to tell you
 * to stop buying something. That sentence is the whole differentiator.
 */
export function Protocol() {
  const reduce = useReducedMotion()

  return (
    <section className="section bg-white">
      <div className="container-main">
        {/* Header centred above the two columns — the pill and h2 now sit on the
            page's optical centre like every other section, and the asymmetric
            copy/diagram split lives underneath it. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-5">
            <SectionTag>{PROTOCOL.eyebrow}</SectionTag>
          </div>
          <h2
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.4rem]"
            style={{ fontWeight: 300 }}
          >
            {PROTOCOL.title} <span className="text-ink/40">{PROTOCOL.muted}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[16px]">
            {PROTOCOL.lede}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
          >
            <p className="border-l-2 border-brand pl-5 text-[15px] leading-snug text-ink/80 md:text-[16.5px]">
              A Face Map is also the only thing here that will tell you what to{' '}
              <span className="text-ink" style={{ fontWeight: 500 }}>
                stop
              </span>{' '}
              — because we are not selling you the next thing to start.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.1 }}
            className="rounded-[22px] border border-border-soft bg-white/70 p-6 md:p-8"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <ProtocolSequence />
          </motion.div>
        </div>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
          className="mx-auto mt-14 max-w-md text-center text-[16px] leading-snug tracking-[-0.01em] text-ink/70 md:text-[19px]"
          style={{ fontWeight: 300 }}
        >
          {PROTOCOL.quote}
        </motion.p>
      </div>
    </section>
  )
}
