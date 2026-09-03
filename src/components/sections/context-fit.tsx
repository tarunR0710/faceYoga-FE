'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTEXT } from '@/lib/content'

/**
 * "Built for your context" — the relevance objection.
 *
 * Absorbs the six-cell pillars grid, which restated "what we look at" for a
 * third time.
 *
 * The matrix is the one visual on the page that carries an argument no sentence
 * can: WHICH advice is context-dependent and which is not. A filled mark means
 * the recommendation genuinely changes in that condition; an empty one means it
 * honestly does not, and printing the honest empties is what makes the filled
 * ones believable.
 */

export function ContextFit() {
  const reduce = useReducedMotion()
  const [cell, setCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 })

  const active = CONTEXT.rows[cell.r]
  const changes = active.cells[cell.c]

  return (
    <section id="context" className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={CONTEXT.eyebrow}
          title={CONTEXT.title}
          muted={CONTEXT.muted}
          lede={CONTEXT.lede}
        />

        {/* ── The matrix ─────────────────────────────────────────────────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="overflow-hidden rounded-[22px] border border-border-soft"
        >
          <div className="no-scrollbar overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Which recommendations change in which Indian conditions
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[96px] px-4 py-3.5" />
                  {CONTEXT.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-border-soft px-3 py-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-ink/45"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTEXT.rows.map((row, r) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="border-t border-border-soft px-4 py-3 text-[13.5px] font-normal text-ink"
                    >
                      {row.label}
                    </th>
                    {row.cells.map((on, c) => {
                      const sel = cell.r === r && cell.c === c
                      return (
                        <td key={c} className="border-t border-border-soft p-0">
                          <button
                            type="button"
                            onClick={() => setCell({ r, c })}
                            aria-pressed={sel}
                            aria-label={`${row.label} in ${CONTEXT.columns[c]}: ${
                              on ? 'recommendation changes' : 'no meaningful change'
                            }`}
                            className={`flex h-[52px] w-full items-center justify-center outline-none transition-colors duration-200 ${
                              sel ? 'bg-brand-soft/50' : 'hover:bg-mist'
                            }`}
                          >
                            {on ? (
                              <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                            ) : (
                              <span className="h-px w-3 bg-ink/20" />
                            )}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* The selected cell, spelled out */}
          <div className="border-t border-border-soft bg-mist px-5 py-4 md:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cell.r}-${cell.c}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">
                  {active.label} · {CONTEXT.columns[cell.c]}
                </span>
                <span
                  className={`text-[13.5px] md:text-[14.5px] ${
                    changes ? 'text-ink/80' : 'text-ink/45'
                  }`}
                >
                  {active.notes[cell.c]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5">
          <span className="flex items-center gap-2 text-[11.5px] text-ink/50">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            {CONTEXT.legend[0]}
          </span>
          <span className="flex items-center gap-2 text-[11.5px] text-ink/40">
            <span className="h-px w-3 bg-ink/20" />
            {CONTEXT.legend[1]}
          </span>
        </div>

        {/* ── The anti-upsell promise, immediately before the price ──────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.08 }}
          className="mx-auto mt-14 max-w-2xl text-center"
        >
          <h3
            className="text-[1.35rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.7rem]"
            style={{ fontWeight: 300 }}
          >
            {CONTEXT.antiUpsell.title}
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]">
            {CONTEXT.antiUpsell.body}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
