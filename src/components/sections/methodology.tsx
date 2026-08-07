'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Info } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// Nine factors, in the blueprint's three rows. The diagram is deliberately
// unlabelled with counts or scores: the blueprint forbids publishing technical
// figures until the methodology audit is signed off, so this shows the *shape*
// of the method, never a number.
const families = [
  {
    name: 'Facial observation',
    factors: [
      {
        title: 'Facial reference points',
        body: 'Observe the location and relationship of meaningful facial points.',
      },
      { title: 'Feature relationships', body: 'Understand how individual features work together.' },
      { title: 'Proportion evaluations', body: 'Review balance, scale and visible relationships.' },
    ],
  },
  {
    name: 'Skin, routine & life',
    factors: [
      { title: 'Skin characteristics', body: 'Consider visible skin behaviour and stated concerns.' },
      { title: 'Routine factors', body: 'Review current and previous products and habits.' },
      { title: 'Lifestyle variables', body: 'Understand sleep, food, hydration, stress and routine.' },
    ],
  },
  {
    name: 'Context & fit',
    factors: [
      {
        title: 'Environmental context',
        body: 'Consider location, climate, humidity, pollution and travel.',
      },
      { title: 'Personal preferences', body: 'Respect goals, style, comfort and desired direction.' },
      {
        title: 'Practical fit',
        body: 'Consider budget, maintenance and realistic follow-through.',
      },
    ],
  },
]

// Flattened, with a position on the ring. Nine nodes, 40° apart, starting at top.
const CENTER = 160
const RING = 116
const HUB = 62      // clear zone for the centre label
const nodes = families.flatMap((f, fi) =>
  f.factors.map((factor, i) => {
    const index = fi * 3 + i
    const angle = (-90 + index * 40) * (Math.PI / 180)
    return {
      ...factor,
      family: f.name,
      index,
      x: CENTER + RING * Math.cos(angle),
      y: CENTER + RING * Math.sin(angle),
    }
  })
)

export function Methodology() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = nodes[active]

  return (
    <section id="methodology" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="The methodology"
          title="A deeper way to understand"
          muted="personal appearance."
          note="Our methodology combines structured facial observations, skin and routine assessment, personal-context factors and specialist interpretation."
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
          {/* ── The map ──────────────────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="relative mx-auto w-full max-w-[400px]"
          >
            <div className="relative aspect-square">
              <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
                {/* the ring the factors sit on */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RING}
                  fill="none"
                  stroke="rgb(var(--c-accent))"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />

                {/* spokes — drawn once, brighten on selection */}
                {nodes.map((n) => {
                  const on = active === n.index
                  return (
                    <motion.line
                      key={`spoke-${n.index}`}
                      x1={CENTER}
                      y1={CENTER}
                      x2={n.x}
                      y2={n.y}
                      stroke="rgb(var(--c-accent))"
                      // Draw once via pathLength; selection lives in the stroke
                      // attributes so framer never re-runs the draw on hover.
                      strokeWidth={on ? 1.6 : 0.9}
                      strokeOpacity={on ? 0.7 : 0.18}
                      initial={reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.2 + n.index * 0.06 }}
                      style={{ transition: 'stroke-opacity .3s ease, stroke-width .3s ease' }}
                    />
                  )
                })}

                {/* the hub — drawn AFTER the spokes so they terminate against
                    it. Without this the spokes run straight under the centre
                    label and cut through the text. */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={HUB}
                  fill="rgb(var(--c-surface))"
                  stroke="rgb(var(--c-accent))"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />

                {/* nodes */}
                {nodes.map((n) => {
                  const on = active === n.index
                  return (
                    <motion.g
                      key={`node-${n.index}`}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 0.4 + n.index * 0.06 }}
                      style={{ originX: `${n.x}px`, originY: `${n.y}px`, cursor: 'pointer' }}
                      onClick={() => setActive(n.index)}
                      onMouseEnter={() => setActive(n.index)}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={on ? 17 : 13}
                        fill={on ? 'rgb(var(--c-accent-soft))' : 'rgb(var(--c-surface))'}
                        stroke="rgb(var(--c-accent))"
                        strokeOpacity={on ? 0.7 : 0.28}
                        strokeWidth="1.2"
                        style={{ transition: 'r .3s ease, stroke-opacity .3s ease' }}
                      />
                      <text
                        x={n.x}
                        y={n.y + 3.5}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="500"
                        fill={on ? 'rgb(var(--c-accent-ink))' : 'rgb(var(--c-ink) / 0.45)'}
                      >
                        {n.index + 1}
                      </text>
                    </motion.g>
                  )
                })}
              </svg>

              {/* centre — the active factor's name */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 text-center">
                <motion.div
                  key={current.index}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: EASE_OUT }}
                >
                  <p className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-accent/60">
                    {current.family}
                  </p>
                  <p
                    className="mt-1 text-[12.5px] leading-tight tracking-[-0.01em] text-ink md:text-[13.5px]"
                    style={{ fontWeight: 500 }}
                  >
                    {current.title}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* the active factor, spelled out */}
            <motion.div
              key={`body-${current.index}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="mt-2 min-h-[64px] rounded-[16px] bg-white px-4 py-3.5"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <p className="text-[13px] leading-relaxed text-ink/[0.78] md:text-[14px]">
                {current.body}
              </p>
            </motion.div>
          </motion.div>

          {/* ── The nine factors, grouped ────────────────────────────────── */}
          <div className="space-y-6">
            {families.map((f, fi) => (
              <motion.div
                key={f.name}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(fi, 0.1) }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/70">
                    {f.name}
                  </p>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {f.factors.map((factor, i) => {
                    const index = fi * 3 + i
                    const on = active === index
                    return (
                      <button
                        key={factor.title}
                        type="button"
                        onClick={() => setActive(index)}
                        onMouseEnter={() => setActive(index)}
                        aria-pressed={on}
                        className={`flex items-start gap-2.5 rounded-[14px] border px-3 py-2.5 text-left transition-all duration-300 ${
                          on
                            ? 'border-accent/35 bg-accent-soft/40'
                            : 'border-border/50 bg-white hover:border-accent/20'
                        }`}
                      >
                        <span
                          className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] tabular-nums transition-colors duration-300 ${
                            on ? 'bg-accent text-white' : 'bg-surface-2 text-ink/45'
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {index + 1}
                        </span>
                        <span className="text-[12.5px] font-medium leading-snug tracking-[-0.01em] text-ink">
                          {factor.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The "no invented numbers" discipline, stated openly */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-10 flex items-start gap-3 rounded-[18px] bg-mist px-4 py-4 md:mt-12 md:px-5"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-analysis-teal" strokeWidth={1.6} />
          <p className="text-[12.5px] leading-relaxed text-analysis-teal md:text-[13.5px]">
            We publish no counts of facial reference points, structured evaluations or personal
            factors. Technical figures will appear only after the expert team completes and signs off
            the MapMyFace methodology audit.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
