'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT } from '@/lib/motion'
import { Star } from 'lucide-react'
import { TESTIMONIALS, RATING, PLACEHOLDER } from '@/lib/showcase'

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const reduce = useReducedMotion()
  return (
    <section className="section bg-white">
      <div className="container-main">
        {/* rating summary band */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div className="max-w-xl">
            <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">Loved by members</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink" style={{ fontWeight: 450 }}>
              People who stopped guessing
              {PLACEHOLDER && (
                <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground align-middle">
                  Sample reviews
                </span>
              )}
            </h2>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="text-[28px] leading-none text-ink" style={{ fontWeight: 450 }}>{RATING.score}</span>
              <Stars />
            </div>
            <p className="text-[12px] text-analysis-teal">
              {RATING.count ? `${RATING.note} · ${RATING.count} reviews` : RATING.note}
            </p>
          </div>
        </motion.div>

        {/* large quote cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE_OUT_SOFT }}
              className="flex flex-col rounded-2xl bg-mist border border-border-soft p-6 md:p-7"
            >
              <Stars />
              <blockquote className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mt-4 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-mist flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-ink">{t.name}</p>
                  <p className="text-[12px] text-analysis-teal">{t.city} · {t.timeframe}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
