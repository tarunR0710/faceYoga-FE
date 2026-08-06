'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Scan, Droplets, FlaskConical, Scissors, Activity, Leaf, Plus, ArrowRight } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'

// The six areas MapMyFace covers. `chapter` is where that area lands inside the
// delivered report — taken from the Face Map chapter list, so "Explore" reveals
// a real cross-reference instead of a dead link.
const pillars = [
  {
    n: '01',
    icon: Scan,
    title: 'Facial Analysis',
    body: 'Understand your features, proportions, balance and appearance characteristics.',
    chapter: 'Chapters 02–04 · Facial Overview, Feature-by-Feature Analysis, Balance & Proportions',
  },
  {
    n: '02',
    icon: Droplets,
    title: 'Skin & Routine',
    body: 'Review visible concerns, skincare history and your current routine.',
    chapter: 'Chapter 05 · Skin & Routine Review',
  },
  {
    n: '03',
    icon: FlaskConical,
    title: 'Skincare Direction',
    body: 'Receive personalised direction for suitable routines and product categories.',
    chapter: 'Chapter 06 · Skincare Direction',
  },
  {
    n: '04',
    icon: Scissors,
    title: 'Grooming',
    body: 'Understand grooming decisions that work with your features.',
    chapter: 'Chapter 07 · Grooming Guidance',
  },
  {
    n: '05',
    icon: Activity,
    title: 'Face Yoga',
    body: 'Receive relevant face-yoga recommendations created around your needs.',
    chapter: 'Chapter 09 · Your Face-Yoga Plan',
  },
  {
    n: '06',
    icon: Leaf,
    title: 'Lifestyle Context',
    body: 'Consider habits, environment, climate and routine factors that may influence appearance.',
    chapter: 'Chapter 08 · Lifestyle Observations',
  },
]

export function WhatIsMapMyFace() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="what-is-mapmyface" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="What is MapMyFace?"
          align="center"
          title="One place to understand"
          muted="what genuinely suits you."
          lede="MapMyFace is an expert-led personalised facial analysis and appearance-improvement platform. We understand the complete person before creating the plan."
        />

        <CardRail cols={3} label="What MapMyFace covers">
          {pillars.map((p, i) => {
            const Icon = p.icon
            const isOpen = open === p.n
            return (
              <motion.article
                key={p.n}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i) }}
                className="card-hover-accent group relative flex flex-col overflow-hidden rounded-[22px] p-5 md:p-6"
              >
                {/* Ghost numeral — the blueprint's 01…06 rhythm, kept quiet */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 text-[42px] leading-none tracking-[-0.04em] text-ink/[0.045] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:text-[52px]"
                  style={{ fontWeight: 500 }}
                >
                  {p.n}
                </span>

                <div className="icon-tile-accent mb-5 flex h-11 w-11 items-center justify-center rounded-2xl">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/60">
                  {p.n}
                </p>
                <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink md:text-[18px]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/[0.72] md:text-[14px]">{p.body}</p>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.n)}
                  aria-expanded={isOpen}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-medium text-accent-foreground transition-colors hover:text-ink"
                >
                  {isOpen ? 'Close' : 'Explore'}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="inline-flex"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT_SOFT }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-[14px] bg-mist p-3.5">
                        <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-analysis-teal">
                          Where this appears in your Face Map
                        </p>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink">{p.chapter}</p>
                        <a
                          href="#inside-face-map"
                          className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-medium text-accent-foreground hover:underline"
                        >
                          See all 12 chapters
                          <ArrowRight className="h-3 w-3" strokeWidth={2} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </CardRail>
      </div>
    </section>
  )
}
