'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Minus } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'
import { BlurReveal } from '@/components/ui/blur-reveal'
import { FloatingChips } from '@/components/ui/floating-chips'
import { InlineChips } from '@/components/ui/inline-chips'
import { CLOSE } from '@/lib/content'
import { FACE_MAP_CORE, REFUND_POLICY } from '@/lib/constants'

/**
 * The close: permission, not logistics.
 *
 * The price is deliberately absent from the headline question. An earlier
 * version asked "is it vain to spend ₹2,699 on your face?" — which reintroduces
 * cost anxiety in the last sentence before the button. The number belongs on
 * the button, not in the doubt.
 *
 * The disqualifier is not a throwaway. Telling a reader who this is NOT for is
 * the strongest trust device available to a business with no clients yet, and
 * it costs nothing except the customers who would have asked for a refund.
 * A minus, never a cross: a cross reads as failure, a minus reads as scope.
 */
export function CTA() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-16 pt-4 md:pb-24">
      <div className="container-main">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          // Grey gradient panel, not a black slab. The close still needs to read
          // as a distinct object, but it gets that from the panel edge and the
          // gradient — the contrast that actually matters is the dark BUTTON
          // against a light ground, not a dark ground against a light page.
          // White like every other surface. With no tonal difference left, the
          // panel is defined entirely by its border and shadow — and the close
          // gets its emphasis from the dark button, not from its ground.
          className="relative overflow-hidden rounded-[28px] border border-border-soft bg-white px-7 py-14 md:px-14 md:py-20"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="relative mx-auto max-w-4xl text-center">
            <SectionTag>{CLOSE.eyebrow}</SectionTag>

            <h2
              className="mt-6 text-[1.85rem] leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.5rem]"
              style={{ fontWeight: 250 }}
            >
              {CLOSE.title}
              <br />
              <span className="text-ink/40">{CLOSE.muted}</span>
            </h2>

            <InlineChips
              items={CLOSE.traits}
              className="mb-6 mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3 xl:hidden"
            />

            <div className="relative mx-auto mt-6">
              <FloatingChips items={CLOSE.traits} className="absolute inset-0 hidden xl:block" />
              <BlurReveal
                text={CLOSE.body}
                className="relative mx-auto max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[16px]"
              />
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/form"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 text-[14.5px] font-medium text-white transition-all duration-200 hover:bg-ink/90 sm:w-auto"
              >
                {CLOSE.cta}
                <span aria-hidden="true" className="h-3.5 w-px bg-white/25" />
                <span className="tabular-nums">{FACE_MAP_CORE.priceDisplay}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="#face-map"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-ink/20 bg-white/60 px-7 text-[14.5px] font-medium text-ink transition-all duration-200 hover:bg-white sm:w-auto"
              >
                {CLOSE.secondary}
              </Link>
            </div>

            <p className="mt-5 text-[12.5px] text-ink/50">{REFUND_POLICY.short}</p>
          </div>

          {/* ── Who this is not for ────────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.12 }}
            className="mx-auto mt-14 max-w-2xl border-t border-ink/10 pt-8"
          >
            <p className="mb-4 text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">
              {CLOSE.notFor.title}
            </p>
            <ul className="flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-7">
              {CLOSE.notFor.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 + stagger(i, 0.07) }}
                  className="flex items-start gap-2 text-[12.5px] leading-snug text-ink-muted"
                >
                  <Minus
                    aria-hidden="true"
                    className="mt-[5px] h-3 w-3 shrink-0 text-ink/30"
                    strokeWidth={2.2}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
