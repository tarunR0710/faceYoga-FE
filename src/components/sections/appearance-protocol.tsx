'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PlusCircle, Ban, CheckCircle2, Flag, ArrowRightCircle, Clock } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// Two lenses on the same recommendations: what changes, and in what order.
const lenses = [
  {
    id: 'what',
    label: 'What changes',
    caption: 'Start / Stop / Continue',
    tiles: [
      { icon: PlusCircle, title: 'Start', body: 'New actions or routines recommended for you.' },
      { icon: Ban, title: 'Stop', body: 'Habits, products or approaches that may not support your goals.' },
      { icon: CheckCircle2, title: 'Continue', body: 'Things already working well for you.' },
    ],
  },
  {
    id: 'order',
    label: 'In what order',
    caption: 'First / Next / Later',
    tiles: [
      { icon: Flag, title: 'First', body: 'The highest-priority changes.' },
      {
        icon: ArrowRightCircle,
        title: 'Next',
        body: 'Actions to introduce after the foundation is established.',
      },
      { icon: Clock, title: 'Later', body: 'Optional or lower-priority improvements.' },
    ],
  },
]

function Tile({
  tile,
  index,
  reduce,
  animate = true,
}: {
  tile: (typeof lenses)[number]['tiles'][number]
  index: number
  reduce: boolean
  animate?: boolean
}) {
  const Icon = tile.icon
  const body = (
    <>
      <div className="mb-4 flex items-center gap-3">
        <span className="icon-tile-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
        </span>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">{tile.title}</h3>
      </div>
      <p className="text-[13.5px] leading-relaxed text-ink/[0.72] md:text-[14px]">{tile.body}</p>
    </>
  )

  if (!animate) {
    return <div className="card-hover-accent rounded-[20px] p-5">{body}</div>
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...REVEAL, delay: stagger(index) }}
      className="card-hover-accent rounded-[20px] p-5"
    >
      {body}
    </motion.div>
  )
}

export function AppearanceProtocol() {
  const reduce = useReducedMotion()
  const [lens, setLens] = useState(0)

  return (
    <section id="appearance-protocol" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Your Appearance Protocol"
          title="Know exactly"
          muted="what to do next."
          lede="Analysis is useful only when it leads to action. Your Appearance Protocol organises recommendations by priority so you are not left trying to change everything at once."
          note="A better plan is not the longest plan. It is the clearest plan."
        />

        {/* ── Mobile: one lens at a time ──────────────────────────────────── */}
        <div className="md:hidden">
          <div
            role="tablist"
            aria-label="Appearance Protocol lenses"
            className="mb-5 flex rounded-full border border-border/60 bg-white p-1"
          >
            {lenses.map((l, i) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={lens === i}
                onClick={() => setLens(i)}
                className={`relative flex-1 rounded-full px-3 py-2 text-[12px] font-medium transition-colors duration-300 ${
                  lens === i ? 'text-ink' : 'text-ink/45'
                }`}
              >
                {lens === i && (
                  <motion.span
                    layoutId="lens-pill"
                    transition={{ duration: 0.34, ease: EASE_OUT }}
                    className="absolute inset-0 rounded-full bg-accent-soft"
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </div>

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/70">
            {lenses[lens].caption}
          </p>

          <motion.div
            key={lenses[lens].id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: EASE_OUT }}
            className="grid grid-cols-1 gap-3"
          >
            {lenses[lens].tiles.map((t, i) => (
              <Tile key={t.title} tile={t} index={i} reduce={!!reduce} animate={false} />
            ))}
          </motion.div>
        </div>

        {/* ── Desktop: both lenses, side by side ──────────────────────────── */}
        <div className="hidden grid-cols-1 gap-8 md:grid">
          {lenses.map((l) => (
            <div key={l.id}>
              <div className="mb-4 flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/70">
                  {l.caption}
                </p>
                <span className="h-px flex-1 bg-border" />
                <p className="text-[11px] text-ink/40">{l.label}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {l.tiles.map((t, i) => (
                  <Tile key={t.title} tile={t} index={i} reduce={!!reduce} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
