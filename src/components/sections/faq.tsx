'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'
import { TabRail, TabPanel } from '@/components/ui/tab-rail'
import { FAQ_V2 } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/constants'

/**
 * FAQ on two axes: category rail, then accordions inside the chosen category.
 *
 * Twenty-four answers across seven categories, with only one category mounted
 * at a time — so the set got BIGGER while the page got shorter. This is the
 * beat where a considering buyer resolves their last blocker, and it costs
 * nothing on the surface.
 *
 * Layout archetype is deliberately unlike anything above it, which is what
 * stops the eleventh of twelve sections reading as more of the same.
 */
export function FAQ() {
  const reduce = useReducedMotion()
  const railId = useId()
  const [cat, setCat] = useState<string>(FAQ_V2.categories[0].id)
  const [open, setOpen] = useState<string | null>(`${FAQ_V2.categories[0].id}-0`)

  const category = FAQ_V2.categories.find((c) => c.id === cat) ?? FAQ_V2.categories[0]

  return (
    <section id="faq" className="section bg-white">
      <div className="container-main">
        {/* Centred header above the rail + answers. The heading used to live
            inside the sticky rail, which put its pill flush left. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-5">
            <SectionTag>{FAQ_V2.eyebrow}</SectionTag>
          </div>
          <h2
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.1rem]"
            style={{ fontWeight: 300 }}
          >
            {FAQ_V2.title} <span className="text-ink/40">{FAQ_V2.muted}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            {/* Vertical rail on desktop; the shared TabRail handles mobile as a
                horizontally scrolling strip. */}
            <div className="hidden lg:block">
              <ul role="tablist" aria-label="Question categories" className="space-y-0.5">
                {FAQ_V2.categories.map((c) => {
                  const on = c.id === cat
                  return (
                    <li key={c.id}>
                      <button
                        role="tab"
                        aria-selected={on}
                        onClick={() => {
                          setCat(c.id)
                          setOpen(`${c.id}-0`)
                        }}
                        className={`relative w-full border-l-2 py-2 pl-4 text-left text-[13.5px] transition-colors duration-200 ${
                          on
                            ? 'border-brand text-ink'
                            : 'border-border-soft text-ink/50 hover:border-ink/25 hover:text-ink/80'
                        }`}
                      >
                        {c.label}
                        <span className="ml-2 font-mono text-[10px] tabular-nums text-ink/25">
                          {c.items.length}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="mt-7 text-[13px] leading-relaxed text-ink-muted">
              Still unsure?{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-ink underline decoration-ink/25 underline-offset-2 transition-colors hover:decoration-ink/60"
              >
                Write to us
              </a>{' '}
              before you pay, not after.
            </p>
          </motion.div>

          <div>
            <div className="lg:hidden">
              <TabRail
                items={FAQ_V2.categories.map((c) => ({ id: c.id, label: c.label }))}
                active={cat}
                onChange={(id) => {
                  setCat(id)
                  setOpen(`${id}-0`)
                }}
                idBase={railId}
                ariaLabel="Question categories"
                className="mb-6"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cat}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
              >
                <TabPanel id={cat} railId={railId}>
                  <div className="border-t border-ink/12">
                    {category.items.map((item, i) => {
                      const key = `${cat}-${i}`
                      const isOpen = open === key
                      return (
                        <div key={key} className="border-b border-border-soft">
                          <button
                            onClick={() => setOpen(isOpen ? null : key)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start justify-between gap-5 py-4 text-left"
                          >
                            <span
                              className={`text-[14.5px] leading-snug transition-colors duration-200 md:text-[15.5px] ${
                                isOpen ? 'text-ink' : 'text-ink/80 hover:text-ink'
                              }`}
                            >
                              {item.q}
                            </span>
                            <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center">
                              <Plus
                                className={`h-3.5 w-3.5 text-ink/40 transition-transform duration-300 ${
                                  isOpen ? 'rotate-45' : ''
                                }`}
                                strokeWidth={2}
                              />
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: EASE_OUT }}
                                className="overflow-hidden"
                              >
                                <p className="max-w-2xl pb-5 pr-6 text-[13.5px] leading-relaxed text-ink-muted md:text-[14.5px]">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </TabPanel>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
