'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Clock } from 'lucide-react'
import { FACE_MAP_CORE } from '@/lib/constants'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CountUp } from '@/components/ui/count-up'

export function MainOffer() {
  const reduce = useReducedMotion()

  return (
    <section id="main-offer" className="section">
      <div className="container-main">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* ── The offer ────────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="The main offer"
              title="The Complete"
              muted="MapMyFace Plan"
              lede={FACE_MAP_CORE.tagline}
              tight
            />

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: 0.08 }}
              className="card-glow rounded-[24px] p-6 md:p-7"
            >
              <span className="badge badge-accent">{FACE_MAP_CORE.label}</span>
              <div className="mt-4 flex items-baseline gap-2">
                <CountUp
                  to={FACE_MAP_CORE.price}
                  prefix="₹"
                  className="text-[2.75rem] tracking-[-0.02em] text-ink tabular-nums md:text-[3.25rem]"
                />
              </div>
              <p className="mt-1 text-[12.5px] text-analysis-teal md:text-[13px]">
                {FACE_MAP_CORE.gstNote}
              </p>

              <Link href="/form" className="btn-primary group mt-6 w-full">
                Start My Plan
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>

              <div className="mt-5 flex items-start gap-2.5 border-t border-border/60 pt-4">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-analysis-teal/70" strokeWidth={1.7} />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analysis-teal">
                    Delivery direction
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink/[0.7]">
                    {FACE_MAP_CORE.delivery}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Everything included ──────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.12 }}
            className="rounded-[24px] border border-border/50 bg-white p-6 md:p-8"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="mb-6 flex items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/70">
                Everything included
              </p>
              <span className="h-px flex-1 bg-border" />
              <p className="text-[11px] tabular-nums text-ink/40">
                {FACE_MAP_CORE.everything.length} items
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {FACE_MAP_CORE.everything.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.045, 0.32) }}
                  className="flex items-start gap-3 border-b border-border/50 py-3 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <Check className="h-3 w-3 text-accent-foreground" strokeWidth={2.5} />
                  </span>
                  <span className="text-[13.5px] leading-snug text-ink/[0.82] md:text-[14px]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
