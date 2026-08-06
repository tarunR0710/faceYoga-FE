'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { EASE_OUT, REVEAL, TAP_SPRING, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

const cases = [
  {
    id: 'advice',
    title: 'Conflicting advice',
    body: 'You have heard too many opinions and still do not know what suits you.',
  },
  {
    id: 'products',
    title: 'Products without clarity',
    body: 'You have tried products or routines without understanding the complete picture.',
  },
  {
    id: 'hair',
    title: 'Hair uncertainty',
    body: 'You do not know which haircut, length or style supports your features.',
  },
  {
    id: 'grooming',
    title: 'Grooming direction',
    body: 'You want a more coordinated, intentional appearance.',
  },
  {
    id: 'glowup',
    title: 'A structured glow-up',
    body: 'You want to improve, but not by changing everything randomly.',
  },
  {
    id: 'expert',
    title: 'Expert guidance',
    body: 'You prefer real reasoning over influencer trends.',
  },
]

function verdict(n: number) {
  if (n === 0) return 'Tap the ones that sound like you.'
  if (n <= 2) return `${n} of 6 sound like you.`
  if (n < 6) return `${n} of 6 sound like you — this is exactly what a Face Map is for.`
  return 'All six. A Face Map is going to be a relief.'
}

export function WhoItsFor() {
  const reduce = useReducedMotion()
  const [picked, setPicked] = useState<string[]>([])

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  return (
    <section id="who-its-for" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Who it is for"
          title="For anyone who wants clarity"
          muted="about what genuinely suits them."
          lede="MapMyFace is designed for Indian men and women who want informed, personalised direction for their face, skin, grooming and overall appearance."
          note="Six situations we hear most often. Tap the ones that sound like you."
        />

        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {cases.map((c, i) => {
            const on = picked.includes(c.id)
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i) }}
                whileTap={reduce ? undefined : { scale: 0.975 }}
                className={`relative flex flex-col items-start rounded-[20px] border p-4 text-left transition-all duration-300 md:p-5 ${
                  on
                    ? 'border-accent/40 bg-accent-soft/40 shadow-[0_16px_36px_-22px_rgb(var(--c-accent)/0.55)]'
                    : 'border-border/50 bg-white hover:border-accent/20'
                }`}
              >
                {/* the tick — a checkbox that feels like a decision, not a form field */}
                <motion.span
                  animate={
                    on
                      ? { backgroundColor: 'rgb(var(--c-accent))', scale: 1 }
                      : { backgroundColor: 'rgb(var(--c-surface-2))', scale: 1 }
                  }
                  transition={reduce ? { duration: 0 } : TAP_SPRING}
                  className="mb-3 flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-inset ring-black/[0.04]"
                >
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : TAP_SPRING}
                      >
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>

                <h3 className="text-[14px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[15.5px]">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/[0.7] md:text-[13.5px]">
                  {c.body}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Running verdict */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-6 flex flex-col items-start gap-4 rounded-[20px] bg-mist px-5 py-4 md:mt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[14px] tabular-nums text-ink"
              style={{ fontWeight: 500 }}
            >
              {picked.length}
            </span>
            <motion.p
              key={picked.length}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="text-[13.5px] leading-snug text-ink md:text-[14.5px]"
            >
              {verdict(picked.length)}
            </motion.p>
          </div>

          <AnimatePresence>
            {picked.length > 0 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <Link
                  href="/form"
                  className="group inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink/88"
                >
                  Start My Plan
                  <ArrowRight
                    className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
