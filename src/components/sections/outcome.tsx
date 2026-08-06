'use client'

import { useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// The questions people are otherwise left to answer alone. They surface one at
// a time, softly — the section is about relief, not urgency.
const questions = [
  'What genuinely suits my face?',
  'Which parts of my routine should I change?',
  'What should I start, stop or continue?',
  'Which improvements should I prioritise?',
  'Which skincare direction may suit me?',
  'Which face-yoga exercises are relevant?',
  'What should I do first, next and later?',
]

const protocol = [
  { n: '01', tag: 'First', title: 'Build your foundation', body: 'The highest-priority changes.' },
  {
    n: '02',
    tag: 'Next',
    title: 'Introduce focused changes',
    body: 'Actions to introduce after the foundation is established.',
  },
  { n: '03', tag: 'Later', title: 'Review and refine', body: 'Optional or lower-priority improvements.' },
]

const thoughtList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const thought: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.62, ease: EASE_OUT_SOFT } },
}

export function Outcome() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const step = protocol[active]

  return (
    <section id="outcome" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="The outcome"
          title="Not more advice."
          muted="A clear plan."
          lede="Your MapMyFace experience is designed to answer the questions people are normally left to solve alone."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* ── The questions ─────────────────────────────────────────────── */}
          <motion.ul
            variants={reduce ? undefined : thoughtList}
            initial={reduce ? { opacity: 0 } : 'hidden'}
            whileInView={reduce ? { opacity: 1 } : 'show'}
            viewport={VIEWPORT}
            className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1"
          >
            {questions.map((q) => (
              <motion.li
                key={q}
                variants={reduce ? undefined : thought}
                className="group flex items-start gap-3 rounded-[16px] border border-border/50 bg-white px-4 py-3.5 transition-colors duration-300 hover:border-accent/25 hover:bg-accent-soft/30"
              >
                <HelpCircle
                  className="mt-[2px] h-4 w-4 shrink-0 text-accent/45 transition-colors duration-300 group-hover:text-accent/80"
                  strokeWidth={1.6}
                />
                <span className="text-[13.5px] leading-snug text-ink md:text-[15px]">{q}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* ── The answer: your Appearance Protocol ─────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.12 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="card-elevated overflow-hidden rounded-[24px]">
              <div className="border-b border-border/60 px-5 py-4 md:px-6">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-analysis-teal md:text-[10px]">
                  Your Face Map · Appearance Protocol
                </p>
                <p
                  className="mt-1 text-[20px] leading-tight tracking-[-0.02em] text-ink md:text-[24px]"
                  style={{ fontWeight: 450 }}
                >
                  First. Next. Later.
                </p>
              </div>

              {/* Tap-through stepper — the priority order, one step at a time */}
              <div className="flex" role="tablist" aria-label="Appearance Protocol steps">
                {protocol.map((p, i) => (
                  <button
                    key={p.n}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`relative flex-1 px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                      active === i ? 'text-ink' : 'text-ink/35 hover:text-ink/60'
                    }`}
                  >
                    {p.tag}
                    {active === i && (
                      <motion.span
                        layoutId="protocol-underline"
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="relative min-h-[168px] bg-mist px-5 py-6 md:min-h-[184px] md:px-6 md:py-7">
                <motion.div
                  key={step.n}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <span className="text-[38px] leading-none tracking-[-0.03em] text-accent/25 md:text-[46px]" style={{ fontWeight: 500 }}>
                    {step.n}
                  </span>
                  <h3
                    className="mt-3 text-[19px] leading-tight tracking-[-0.01em] text-ink md:text-[22px]"
                    style={{ fontWeight: 450 }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-analysis-teal md:text-[14.5px]">
                    {step.body}
                  </p>
                </motion.div>

                {/* progress rail */}
                <div className="mt-6 flex gap-1.5">
                  {protocol.map((p, i) => (
                    <span
                      key={p.n}
                      className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                        i <= active ? 'bg-accent/60' : 'bg-ink/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-analysis-teal md:text-[14px]">
              Your Face Map turns expert analysis into practical direction you can follow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
