'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, ShieldAlert } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { ContextScene, type SceneId } from '@/components/ui/context-scene'

type Topic = { id: SceneId; title: string; items: string[] }

const topics: Topic[] = [
  {
    id: 'goals',
    title: 'Your goals',
    items: [
      'What would you like to improve?',
      'What concerns you most?',
      'What result are you hoping to achieve?',
    ],
  },
  {
    id: 'skincare',
    title: 'Your skincare history',
    items: [
      'Products currently used',
      'Products used during the previous year',
      'Reactions, sensitivities and what has or has not worked',
    ],
  },
  {
    id: 'routine',
    title: 'Your daily routine',
    items: [
      'Morning and evening routine',
      'Work environment, sleep and stress',
      'Sun exposure and physical activity',
    ],
  },
  {
    id: 'lifestyle',
    title: 'Your lifestyle',
    items: [
      'Food habits and water intake',
      'Travel frequency and daily schedule',
      'Smoking or alcohol where relevant',
    ],
  },
  {
    id: 'environment',
    title: 'Your environment',
    items: [
      'Location, climate and humidity',
      'Pollution and seasonal changes',
      'Regular travel locations',
    ],
  },
  {
    id: 'context',
    title: 'Relevant personal context',
    items: [
      'Existing concerns voluntarily disclosed',
      'Grooming and face-yoga history',
      'Budget and maintenance preferences',
    ],
  },
]

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/45" />
          <span className="text-[13px] leading-relaxed text-white/75">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ExpertUnderstands() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <section id="expert-understands" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="What the expert understands"
          title="Personal recommendations"
          muted="require personal context."
          note="The Face Mapping Session follows a structured conversation, while leaving your expert free to ask deeper questions wherever your situation calls for it."
        />

        {/* One open row at a time drives the scene beside it — a list instead of
            yet another card grid. On mobile the scene moves INSIDE the open row,
            so tapping never changes something that is off screen. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="rounded-[26px] border border-border/50 bg-surface p-3 md:p-4"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] md:gap-4">
            {/* ── The list ────────────────────────────────────────────────── */}
            <ol className="flex flex-col gap-2">
              {topics.map((t, i) => {
                const on = active === i
                return (
                  <motion.li
                    key={t.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.55, ease: EASE_OUT, delay: stagger(i, 0.06) }}
                    className={`overflow-hidden rounded-[18px] transition-colors duration-300 ${
                      on ? 'bg-ink' : 'bg-surface-2 hover:bg-accent-soft/60'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={on}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left md:px-5"
                    >
                      <span
                        className={`shrink-0 text-[12px] tabular-nums ${
                          on ? 'text-white/45' : 'text-ink/30'
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        /{String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`flex-1 text-[14px] tracking-[-0.01em] md:text-[15px] ${
                          on ? 'text-white' : 'text-ink'
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {t.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                          on ? 'rotate-180 text-white/60' : 'text-ink/35'
                        }`}
                        strokeWidth={1.8}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: EASE_OUT_SOFT }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-[52px] md:px-5 md:pl-[60px]">
                            <Bullets items={t.items} />
                            {/* mobile: the scene lives inside the open row */}
                            <ContextScene
                              id={t.id}
                              className="mt-4 aspect-[16/10] w-full md:hidden"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ol>

            {/* ── The scene (desktop) ─────────────────────────────────────── */}
            {/* absolute inside a relative cell so the list alone sets the row
                height — otherwise the SVG's own 4:5 ratio drives it and the
                panel runs 200px past the bottom of the list. */}
            <div className="relative hidden min-h-[420px] md:block">
              <ContextScene id={topics[active].id} className="absolute inset-0" />
            </div>
          </div>
        </motion.div>

        {/* Professional boundary — kept visible, not buried in the legal page */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-6 flex items-start gap-3 rounded-[18px] bg-surface-2 px-4 py-4 md:mt-8 md:px-5"
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-analysis-teal" strokeWidth={1.6} />
          <p className="text-[12.5px] leading-relaxed text-analysis-teal md:text-[13.5px]">
            <span className="font-medium text-ink">Professional boundary.</span> MapMyFace provides
            appearance, routine and educational guidance. Medical concerns requiring diagnosis or
            treatment should be handled by an appropriately qualified medical professional.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
