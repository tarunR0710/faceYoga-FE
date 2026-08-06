'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Stethoscope, Microscope, Activity, Scissors } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// Four reviewers, one case. `line` is the connector each card owns in the
// desktop diagram, so selecting a card can light up its own path to the centre.
const reviewers = [
  {
    id: 'medical',
    icon: Stethoscope,
    title: 'Medical & skin context',
    body: "Appropriate professional review where the customer's concerns require it.",
    line: { x: 27, y: 27 },
    cell: 'lg:col-start-1 lg:row-start-1 lg:text-right lg:items-end',
  },
  {
    id: 'analysis',
    icon: Microscope,
    title: 'Facial analysis & research',
    body: 'Structure, relationships, balance and evidence-informed interpretation.',
    line: { x: 73, y: 27 },
    cell: 'lg:col-start-3 lg:row-start-1',
  },
  {
    id: 'yoga',
    icon: Activity,
    title: 'Face-yoga direction',
    body: "Relevant exercises selected around the customer's needs and practical ability.",
    line: { x: 27, y: 73 },
    cell: 'lg:col-start-1 lg:row-start-2 lg:text-right lg:items-end',
  },
  {
    id: 'hair',
    icon: Scissors,
    title: 'Hair & personal style',
    body: 'Specialist review when the customer purchases an add-on.',
    line: { x: 73, y: 73 },
    cell: 'lg:col-start-3 lg:row-start-2',
  },
]

export function ExpertReview() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)
  const current = reviewers.find((r) => r.id === active)

  return (
    <section id="expert-review" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Expert Mapping Review"
          align="center"
          title="One customer. Multiple areas of expertise."
          muted="One coordinated plan."
          lede="After the Face Mapping Session, the relevant MapMyFace specialists review the complete case together. The aim is not to produce disconnected opinions, but one clear direction."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Connectors — four paths that draw once, then respond to selection */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {reviewers.map((r, i) => {
              const on = active === r.id
              return (
                <motion.line
                  key={r.id}
                  x1="50"
                  y1="50"
                  x2={r.line.x}
                  y2={r.line.y}
                  stroke="rgb(var(--c-accent))"
                  strokeDasharray="2 2"
                  // pathLength is the one-shot draw; selection is expressed with
                  // stroke attributes + a CSS transition so the two never fight
                  // over the same animated value.
                  strokeWidth={on ? 0.5 : 0.28}
                  strokeOpacity={on ? 0.85 : 0.3}
                  initial={reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE_OUT_SOFT, delay: 0.3 + i * 0.1 }}
                  style={{ transition: 'stroke-opacity .3s ease, stroke-width .3s ease' }}
                />
              )
            })}
          </svg>

          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] lg:grid-rows-2 lg:gap-x-8 lg:gap-y-10">
            {/* the centre — the whole point of the section */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: 0.15 }}
              className="order-first col-span-2 flex items-center justify-center lg:order-none lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <div
                className="relative flex aspect-square w-[190px] flex-col items-center justify-center rounded-full border border-accent/25 bg-white px-6 text-center lg:w-[220px]"
                style={{ boxShadow: '0 18px 42px -18px rgb(var(--c-accent) / 0.35)' }}
              >
                {!reduce && (
                  <span
                    aria-hidden
                    className="animate-pulse-ring absolute h-24 w-24 rounded-full"
                    style={{ border: '1px solid rgb(var(--c-accent) / 0.35)' }}
                  />
                )}
                <motion.div
                  key={current?.id ?? 'default'}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="relative"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-accent/70 lg:text-[10px]">
                    {current ? 'Reviewing' : 'Customer case'}
                  </p>
                  <p
                    className="mt-1.5 text-[16px] leading-tight tracking-[-0.01em] text-ink lg:text-[19px]"
                    style={{ fontWeight: 450 }}
                  >
                    {current ? current.title : 'Complete context'}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {reviewers.map((r, i) => {
              const Icon = r.icon
              const on = active === r.id
              return (
                <motion.button
                  key={r.id}
                  type="button"
                  onClick={() => setActive(on ? null : r.id)}
                  onMouseEnter={() => setActive(r.id)}
                  onMouseLeave={() => setActive(null)}
                  aria-pressed={on}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...REVEAL, delay: 0.3 + i * 0.09 }}
                  className={`flex flex-col items-start rounded-[22px] border bg-white p-4 text-left transition-all duration-300 md:p-5 ${
                    on
                      ? 'border-accent/35 shadow-[0_18px_40px_-22px_rgb(var(--c-accent)/0.5)]'
                      : 'border-border/50 shadow-[var(--shadow-card)]'
                  } ${r.cell}`}
                >
                  <span
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      on ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-accent'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                  <h3 className="text-[13.5px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[16px]">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink/[0.72] md:text-[13.5px]">
                    {r.body}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl text-center text-[13.5px] leading-relaxed text-analysis-teal md:mt-12 md:text-[15px]"
        >
          Every recommendation must work together as part of the same person — not as an isolated
          suggestion.
        </motion.p>
      </div>
    </section>
  )
}
