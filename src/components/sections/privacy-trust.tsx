'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'
import { PRIVACY_PATH } from '@/lib/content'

/**
 * "Your face stays yours."
 *
 * The one section on this page that deliberately has NO disclosure mechanic.
 * Everything else earns the right to hide detail behind a tap; a privacy
 * covenant does not — putting it behind a click is functionally the same as
 * burying it in a policy page, which is exactly the behaviour it exists to
 * distinguish us from.
 *
 * Two visuals, answering the two different questions a sceptic has. The path
 * answers "where does my photograph go"; the access table answers "who opens
 * it". The conditional fourth row is the load-bearing one — a policy that has
 * an exception is a policy, and four unqualified Yes rows read as boilerplate.
 */
export function PrivacyTrust() {
  const reduce = useReducedMotion()

  return (
    // Soft grey ramp, not a black slab. A full-bleed near-black section is the
    // heaviest thing a light page can do, and it was doing it for a beat whose
    // job is reassurance — the contrast read as a warning label rather than a
    // covenant. Depth now comes from a gradient, emphasis from type.
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container-main">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionTag>{PRIVACY_PATH.eyebrow}</SectionTag>
          <h2
            className="mt-5 text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.4rem]"
            style={{ fontWeight: 300 }}
          >
            {PRIVACY_PATH.title}{' '}
            <span className="text-ink/40">{PRIVACY_PATH.muted}</span>
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-ink-muted md:text-[16px]">
            {PRIVACY_PATH.lede}
          </p>
        </motion.div>

        {/* ── Where a photograph actually goes ───────────────────────────── */}
        <ol className="mt-12 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-2">
          {PRIVACY_PATH.stages.map((s, i) => (
            <motion.li
              key={s.label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: stagger(i, 0.08) }}
              className="relative lg:pr-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9.5px] tabular-nums text-ink/45">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-ink/12" />
              </div>
              <h3 className="mt-3 text-[14.5px] text-ink">{s.label}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{s.text}</p>

              {i < PRIVACY_PATH.stages.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-1 top-[-3px] hidden h-3.5 w-3.5 text-ink/25 lg:block"
                  strokeWidth={1.6}
                />
              ) : null}
            </motion.li>
          ))}
        </ol>

        {/* ── Who opens it ───────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">
              Who sees your photographs
            </p>
            <ul className="border-t border-ink/12">
              {PRIVACY_PATH.access.map((a, i) => (
                <motion.li
                  key={a.mono}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.06) }}
                  className="flex items-center gap-4 border-b border-border-soft py-3"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.055] font-mono text-[10px] text-ink/55"
                  >
                    {a.mono}
                  </span>
                  <span className="flex-1 text-[13.5px] text-ink/85">{a.role}</span>
                  <span
                    className={`text-right text-[12.5px] ${
                      a.sees === 'Yes' ? 'text-ink/55' : 'text-ink'
                    }`}
                  >
                    {a.sees}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">
              What we will never do
            </p>
            <ul className="space-y-3">
              {PRIVACY_PATH.covenant.map((c, i) => (
                <motion.li
                  key={c}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.06) }}
                  className="flex items-baseline gap-3"
                >
                  <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-ink/40" />
                  <span className="text-[13.5px] leading-relaxed text-ink/75">{c}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-ink/40">
              {PRIVACY_PATH.pending}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
