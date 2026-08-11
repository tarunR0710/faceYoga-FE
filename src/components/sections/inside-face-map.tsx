'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'
import { ReportHud } from '@/components/ui/report-hud'

// The twelve chapters. Titles are the blueprint's; each one-line summary is
// re-used from the blueprint's own description of that same area elsewhere in
// the document (the chapter grid itself lists titles only).
const chapters = [
  { n: '01', title: 'Your Profile & Goals', body: 'Your goals, your concerns and the result you are hoping to achieve.' },
  { n: '02', title: 'Facial Overview', body: 'How your features work together.' },
  { n: '03', title: 'Feature-by-Feature Analysis', body: 'Your features, proportions and appearance characteristics, one at a time.' },
  { n: '04', title: 'Facial Balance & Proportions', body: 'Balance, scale and the visible relationships between features.' },
  { n: '05', title: 'Skin & Routine Review', body: 'Visible concerns, skincare history and your current routine.' },
  { n: '06', title: 'Skincare Direction', body: 'Personalised direction for suitable routines and product categories.' },
  { n: '07', title: 'Grooming Guidance', body: 'Grooming decisions that work with your features.' },
  { n: '08', title: 'Lifestyle Observations', body: 'Habits, environment, climate and routine factors that may influence appearance.' },
  { n: '09', title: 'Your Face-Yoga Plan', body: 'Relevant face-yoga recommendations created around your needs and practical ability.' },
  { n: '10', title: 'Your Appearance Protocol', body: 'What to start, stop and continue — organised by priority.' },
  { n: '11', title: 'First, Next & Later', body: 'Foundation first, targeted changes next, optional improvements later.' },
  { n: '12', title: 'Recommended Follow-Through', body: 'How to keep following the plan, and when to ask for clarification.' },
]


export function InsideFaceMap() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = chapters[active]

  return (
    <section id="inside-face-map" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Inside your Face Map"
          align="center"
          title="Every chapter has one purpose:"
          muted="turn analysis into clarity."
        />

        {/* ── Mobile: the HUD, then the chapter deck ─────────────────────── */}
        {/* The deck stays exactly what it was — twelve independent chapter
            cards you swipe through. The HUD sits above it as the section's
            visual anchor; it does not own or replace the chapter list. */}
        <div className="md:hidden">
          <ReportHud className="aspect-[4/5] w-full" />
        </div>

        <div className="mt-6 md:hidden">
          <CardRail cols={3} peek="lg" label="Face Map chapters">
            {chapters.map((c, i) => (
              <motion.article
                key={c.n}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i, 0.05, 0.24) }}
                className="flex min-h-[176px] flex-col rounded-[20px] border border-border/50 bg-white p-5"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Chapter number — indexing, so it takes the spark. The
                    desktop list's active row keeps the accent: that is state. */}
                <span
                  className="text-[40px] leading-none tracking-[-0.04em] text-accent-2/35"
                  style={{ fontWeight: 500 }}
                >
                  {c.n}
                </span>
                <h3 className="mt-3 text-[15.5px] font-medium leading-snug tracking-[-0.01em] text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-analysis-teal">{c.body}</p>
                <span className="mt-auto pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/30">
                  Chapter {c.n} of 12
                </span>
              </motion.article>
            ))}
          </CardRail>
        </div>

        {/* ── Desktop: contents page + live preview ───────────────────────── */}
        <div className="hidden gap-10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <ol className="grid gap-0 sm:grid-cols-2">
            {chapters.map((c, i) => {
              const on = active === i
              return (
                <motion.li
                  key={c.n}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: stagger(i, 0.045, 0.3) }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`group flex w-full items-center gap-4 border-b border-border/60 py-3.5 pr-2 text-left transition-colors duration-300 ${
                      on ? 'border-accent/40' : ''
                    }`}
                  >
                    <span
                      // Inactive = enumeration, so it takes the spark; active
                      // stays the accent because that one is selection state.
                      // /55 reads 2.56:1 vs the ink/30 it replaces at 1.85:1.
                      className={`text-[13px] tabular-nums transition-colors duration-300 ${
                        on ? 'text-accent' : 'text-accent-2/55'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {c.n}
                    </span>
                    <span
                      className={`flex-1 text-[14.5px] tracking-[-0.01em] transition-colors duration-300 ${
                        on ? 'text-ink' : 'text-ink/70'
                      }`}
                      style={{ fontWeight: on ? 500 : 400 }}
                    >
                      {c.title}
                    </span>
                    <span
                      className={`h-px transition-all duration-300 ${on ? 'w-6 bg-accent' : 'w-0 bg-transparent'}`}
                      aria-hidden
                    />
                  </button>
                </motion.li>
              )
            })}
          </ol>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.1 }}
            className="md:sticky md:top-24 md:self-start"
          >
            {/* The report as an interface, not a picture — a tinted portrait with
                glass panels floating over it and dots pinned to landmarks. The
                technique is the category's; the payload is not: every reading is
                a word, never a score, because the section above promises "clear
                explanations, not unexplained scores". */}
            <ReportHud className="aspect-[4/5] w-full" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
