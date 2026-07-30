'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Stethoscope, ShieldCheck, Sparkles } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT } from '@/lib/motion'

const cards = [
  {
    icon: Stethoscope,
    title: 'Guided by real experts',
    body: 'A qualified specialist reviews your face and answers your questions directly.',
  },
  {
    icon: ShieldCheck,
    title: 'Surgery-free, evidence-based',
    body: 'Every recommendation is non-invasive and grounded in evidence.',
  },
  {
    icon: Sparkles,
    title: 'Specific, not generic',
    body: 'No two plans are the same — yours is mapped only for your face.',
  },
]

export function Community() {
  const reduce = useReducedMotion()
  return (
    <section className="py-16 md:py-24 section-alt text-ink overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          >
            <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-4">
              Proof
            </p>
            <h2
              className="text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.03em] mb-4"
              style={{ fontWeight: 450 }}
            >
              <span className="text-ink">Built with experts.</span>{' '}
              <span className="text-ink/45">Tested with real people.</span>
            </h2>
            <p className="text-[15px] md:text-[16px] text-ink/[0.78] leading-relaxed max-w-md">
              Meet the specialist panel, see the method, and read
              transparently-labelled experiences from our founding cohort — real
              people who completed the full MapMyFace process.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-mist px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-analysis-teal" />
              <span className="text-[12px] font-medium text-analysis-teal uppercase tracking-[0.1em]">
                Founding cohort
              </span>
            </div>
          </motion.div>

          <div className="space-y-3">
            {cards.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, delay: i * 0.15, ease: EASE_OUT_SOFT }}
                  whileHover={reduce ? undefined : { y: -4, boxShadow: '0 18px 34px -18px rgba(21,36,33,0.26)', transition: { duration: 0.2, ease: EASE_OUT } }}
                  className="card flex items-center gap-4 rounded-[22px] p-5"
                >
                  <div className="icon-tile-accent flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-ink">{c.title}</h3>
                    <p className="text-[13px] text-ink/[0.65]">{c.body}</p>
                  </div>
                </motion.div>
              )
            })}

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: cards.length * 0.1, ease: EASE_OUT_SOFT }}
              className="pt-1 pl-1 text-[12px] text-ink/[0.55] italic"
            >
              Beta client experiences are labelled as such — no anonymous
              reviews, no invented numbers.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
