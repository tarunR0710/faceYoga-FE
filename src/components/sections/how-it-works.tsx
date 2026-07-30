'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { EASE_OUT, useIsDesktop } from '@/lib/motion'

const steps = [
  {
    number: '01',
    title: 'Choose your plan',
    description: 'Select your Complete Face Map and any optional add-ons.',
  },
  {
    number: '02',
    title: 'Meet your expert',
    description: 'A live 45–60 minute Face Mapping Session with a real expert.',
  },
  {
    number: '03',
    title: 'We map the complete case',
    description: 'Five expert disciplines review your face, skin, routine and lifestyle.',
  },
  {
    number: '04',
    title: 'Receive your Face Map',
    description: 'Your personalised Face Map and Appearance Protocol, in 2–4 working days.',
  },
  {
    number: '05',
    title: 'Ask when you need clarity',
    description: 'A real person answers your questions about your Face Map.',
  },
]

export function HowItWorks() {
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()

  // Mobile + reduced-motion: the calm stacked grid (no pin, no tall spacer).
  if (!desktop || reduce) return <StackedSteps />

  return <PinnedTimeline />
}

/* ── Desktop: Apple-style pinned "big number" stepper ─────────────────────── */
function PinnedTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })
  const step = steps[active]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-alt relative"
      style={{ height: `${steps.length * 85}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-main w-full">
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            The MapMyFace Method
          </p>
          <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-10 lg:mb-14" style={{ fontWeight: 450 }}>
            A deeper process. <span className="text-ink/40">A clearer plan.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
            {/* Giant number that swaps as you scroll */}
            <div className="flex items-end gap-2">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="block text-teal tabular-nums leading-[0.8] text-[7rem] sm:text-[9rem] lg:text-[13rem]"
                style={{ fontWeight: 300, letterSpacing: '-0.04em' }}
              >
                {active + 1}
              </motion.span>
              <span className="mb-3 lg:mb-5 text-[18px] lg:text-[22px] text-ink/30 tabular-nums" style={{ fontWeight: 300 }}>
                / {steps.length}
              </span>
            </div>

            {/* Active step content */}
            <div className="md:pl-8 md:border-l border-border">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <h3 className="text-[1.5rem] lg:text-[2rem] leading-[1.15] tracking-[-0.01em] text-ink" style={{ fontWeight: 450 }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] lg:text-[17px] leading-relaxed text-analysis-teal max-w-md">
                  {step.description}
                </p>
              </motion.div>

              {/* Progress bar — where you are in the 5 steps */}
              <div className="mt-9 flex items-center gap-2">
                {steps.map((s, i) => (
                  <span
                    key={s.number}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === active ? 'w-9 bg-teal' : 'w-4 bg-ink/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Mobile / reduced-motion: calm stacked grid ───────────────────────────── */
function StackedSteps() {
  return (
    <section id="how-it-works" className="section section-alt">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            The MapMyFace Method
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4" style={{ fontWeight: 450 }}>
            A deeper process. <span className="text-ink/40">A clearer plan.</span>
          </h2>
          <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
            The expertise happens behind the scenes. Your journey stays simple.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="relative card rounded-[22px] p-5 md:p-6"
            >
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium tracking-[0.08em] text-analysis-teal">
                {step.number}
              </span>
              <h3 className="mb-2 text-[17px] font-medium tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-analysis-teal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
