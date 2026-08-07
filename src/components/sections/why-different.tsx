'use client'

import { Fragment, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

const rows = [
  {
    label: 'Starting point',
    generic: 'Trends, a few images or a generic form',
    mmf: 'A live Face Mapping Session',
  },
  {
    label: 'Understanding',
    generic: 'One visible concern or one category',
    mmf: 'Face, skin, routine, environment and goals',
  },
  {
    label: 'Interpretation',
    generic: 'Automated output or an isolated opinion',
    mmf: 'Expert Mapping Review',
  },
  {
    label: 'Recommendations',
    generic: 'General suggestions',
    mmf: 'Personalised recommendations designed to work together',
  },
  {
    label: 'Priority',
    generic: 'A long list without order',
    mmf: 'Start / Stop / Continue and First / Next / Later',
  },
  { label: 'Support', generic: 'No clear follow-up', mmf: 'Clarification support' },
  {
    label: 'Broader appearance',
    generic: 'Hair and clothing treated separately',
    mmf: 'Optional Hair Map and Style & Colour Map',
  },
]

const sides = [
  { id: 'mmf', label: 'MapMyFace' },
  { id: 'generic', label: 'Generic advice' },
] as const

export function WhyDifferent() {
  const reduce = useReducedMotion()
  const [side, setSide] = useState(0)
  const showingMmf = sides[side].id === 'mmf'

  return (
    <section id="why-different" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Why MapMyFace is different"
          align="center"
          title="More than a scan."
          muted="More than a consultation."
        />

        {/* ── Mobile: switch sides ────────────────────────────────────────── */}
        <div className="md:hidden">
          <div
            role="tablist"
            aria-label="Compare approaches"
            className="mb-5 flex rounded-full border border-border/60 bg-surface p-1"
          >
            {sides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={side === i}
                onClick={() => setSide(i)}
                className={`relative flex-1 rounded-full px-3 py-2 text-[12px] font-medium transition-colors duration-300 ${
                  side === i ? 'text-ink' : 'text-ink/45'
                }`}
              >
                {side === i && (
                  <motion.span
                    layoutId="compare-pill"
                    transition={{ duration: 0.34, ease: EASE_OUT }}
                    className={`absolute inset-0 rounded-full ${
                      s.id === 'mmf' ? 'bg-accent-soft' : 'bg-mist'
                    }`}
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border/60 bg-surface">
            {rows.map((r) => (
              <div key={r.label} className="border-b border-border/60 px-4 py-3.5 last:border-b-0">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-analysis-teal">
                  {r.label}
                </p>
                <motion.div
                  key={`${r.label}-${sides[side].id}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, ease: EASE_OUT }}
                  className="mt-1.5 flex items-start gap-2.5"
                >
                  {showingMmf ? (
                    <span className="mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      <Check className="h-2.5 w-2.5 text-accent-foreground" strokeWidth={2.5} />
                    </span>
                  ) : (
                    <span className="mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink/5">
                      <Minus className="h-2.5 w-2.5 text-ink/35" strokeWidth={2.5} />
                    </span>
                  )}
                  <span
                    className={`text-[13.5px] leading-snug ${
                      showingMmf ? 'text-ink' : 'text-analysis-teal'
                    }`}
                  >
                    {showingMmf ? r.mmf : r.generic}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: the full table ─────────────────────────────────────── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-4">
            {/* header */}
            <div />
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={REVEAL}
              className="pb-4"
            >
              <p className="text-[12.5px] text-ink/45">Generic advice or basic tools</p>
            </motion.div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: 0.06 }}
              className="rounded-t-[18px] bg-accent-soft/45 px-4 pb-4 pt-3"
            >
              <p className="text-[13px] text-ink" style={{ fontWeight: 500 }}>
                MapMyFace
              </p>
            </motion.div>

            {/* rows — three sibling cells per row, each on the row's own delay,
                so the table wipes down as one gesture without needing subgrid */}
            {rows.map((r, i) => {
              const cell = {
                initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
                whileInView: { opacity: 1, y: 0 },
                viewport: VIEWPORT,
                transition: { duration: 0.6, ease: EASE_OUT, delay: stagger(i, 0.07) },
              } as const
              return (
                <Fragment key={r.label}>
                  <motion.div {...cell} className="flex items-center border-t border-border/60 py-4 pr-2">
                    <p className="text-[12.5px] font-medium tracking-[-0.01em] text-ink">{r.label}</p>
                  </motion.div>
                  <motion.div
                    {...cell}
                    className="flex items-start gap-2.5 border-t border-border/60 py-4 pr-2"
                  >
                    <Minus className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink/25" strokeWidth={2} />
                    <p className="text-[13.5px] leading-snug text-ink/50">{r.generic}</p>
                  </motion.div>
                  <motion.div
                    {...cell}
                    className={`flex items-start gap-2.5 border-t border-accent/15 bg-accent-soft/45 px-4 py-4 ${
                      i === rows.length - 1 ? 'rounded-b-[18px]' : ''
                    }`}
                  >
                    <span className="mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20">
                      <Check className="h-2.5 w-2.5 text-accent-foreground" strokeWidth={2.5} />
                    </span>
                    <p className="text-[13.5px] leading-snug text-ink">{r.mmf}</p>
                  </motion.div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
