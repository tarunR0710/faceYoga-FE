'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus, Mail } from 'lucide-react'
import { FAQS, FAQ_GROUPS, SITE_CONFIG } from '@/lib/constants'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'

export function FAQ() {
  const reduce = useReducedMotion()
  const [group, setGroup] = useState<string>('All')

  const visible = useMemo(
    () => (group === 'All' ? FAQS : FAQS.filter((f) => f.group === group)),
    [group]
  )

  return (
    <section id="faq" className="section">
      <div className="container-main">
        {/* grid-cols-1 is load-bearing: without it the single implicit track is
            `auto`, which sizes to the max-content of the filter rail below and
            pushes the whole page wider than the viewport. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* ── Heading ──────────────────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-analysis-teal md:text-[12px]">
              Frequently asked questions
            </p>
            <h2
              className="text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
              style={{ fontWeight: 450 }}
            >
              Everything you should understand <span className="text-ink/40">before you pay.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-analysis-teal md:text-[15px]">
              Direct answers, no technical language. If something is still unclear, a real person
              replies.
            </p>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-mist"
            >
              <Mail className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
              Ask us directly
            </a>
          </motion.div>

          {/* ── Questions ────────────────────────────────────────────────── */}
          <div className="min-w-0">
            {/* Filter — fifteen answers stay browsable on a phone */}
            <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
              {FAQ_GROUPS.map((g) => {
                const on = group === g
                const count = g === 'All' ? FAQS.length : FAQS.filter((f) => f.group === g).length
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    aria-pressed={on}
                    className={`shrink-0 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-colors duration-250 ${
                      on
                        ? 'border-accent/40 bg-accent-soft text-accent-foreground'
                        : 'border-border/60 bg-white text-analysis-teal hover:bg-mist'
                    }`}
                  >
                    {g}
                    <span className={`ml-1.5 tabular-nums ${on ? 'text-accent/70' : 'text-ink/30'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <AccordionPrimitive.Root
              type="single"
              collapsible
              className="overflow-hidden rounded-[20px] border border-border/60 bg-white"
            >
              {visible.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: stagger(i, 0.04, 0.28) }}
                >
                  <AccordionPrimitive.Item
                    value={faq.q}
                    className="border-b border-border/60 last:border-b-0"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="group flex flex-1 items-start gap-3 px-4 py-4 text-left md:px-5">
                        <span className="flex-1 text-[14px] font-medium leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-foreground md:text-[15px]">
                          {faq.q}
                        </span>
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist">
                          <Plus
                            className="h-3 w-3 text-accent transition-transform duration-300 group-data-[state=open]:rotate-45"
                            strokeWidth={2.4}
                          />
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="px-4 pb-4 pr-12 text-[13px] leading-relaxed text-analysis-teal md:px-5 md:text-[13.5px]">
                        {faq.a}
                      </p>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                </motion.div>
              ))}
            </AccordionPrimitive.Root>
          </div>
        </div>
      </div>
    </section>
  )
}
