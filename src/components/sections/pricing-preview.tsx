'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Plus, Scissors, Palette, Sparkles } from 'lucide-react'
import { FACE_MAP_CORE, FACE_MAP_ADDONS, ADDON_BUNDLE, type AddOnId } from '@/lib/constants'
import { EASE_OUT, REVEAL, TAP_SPRING, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CountUp } from '@/components/ui/count-up'

const addonIcons: Record<AddOnId, typeof Scissors> = {
  hair_map: Scissors,
  style_colour_map: Palette,
}

export function PricingPreview() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<AddOnId[]>([])

  const toggle = (id: AddOnId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const both = selected.length === 2
  const addOnTotal = both ? ADDON_BUNDLE.price : selected.length * 699
  const total = FACE_MAP_CORE.price + addOnTotal

  // Carries the chosen Maps into the funnel. TODO: read `addons` on /form and
  // pre-tick them on /payment so the selection survives the whole flow.
  const startHref = selected.length ? `/form?addons=${selected.join(',')}` : '/form'

  return (
    <section id="pricing" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Pricing"
          align="center"
          title="Choose how complete"
          muted="you want your Map to be."
          lede="One clear main plan. Add specialist Maps when you want them — no competing packages to decode."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
          {/* ── Main plan ────────────────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="rounded-[24px] border border-border-soft bg-white shadow-lg shadow-[rgb(var(--g2)/0.08)]"
          >
            <div className="p-3 md:p-4">
              <div
                className="relative overflow-hidden rounded-[18px] p-6 md:p-8"
                style={{
                  background:
                    'linear-gradient(135deg, rgb(var(--g1) / 0.22) 0%, rgb(var(--g2) / 0.28) 50%, rgb(var(--g3) / 0.22) 100%)',
                }}
              >
                {/* Decorative rings — kept from the existing pricing panel */}
                <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 -translate-y-1/3 translate-x-1/3">
                  <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
                    <circle cx="50" cy="50" r="45" stroke="rgb(var(--g2))" strokeWidth="1" opacity="0.3" />
                    <circle cx="50" cy="50" r="28" stroke="rgb(var(--g1))" strokeWidth="1" opacity="0.35" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 -translate-x-1/3 translate-y-1/3">
                  <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" stroke="rgb(var(--g2))" strokeWidth="1" opacity="0.25" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute left-5 top-5 h-2 w-2 rounded-full bg-[rgb(var(--g2))]/35" />
                <div className="pointer-events-none absolute bottom-6 right-10 h-1.5 w-1.5 rounded-full bg-[rgb(var(--g3))]/45" />

                <div className="relative z-10">
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/55">
                    Main plan · {FACE_MAP_CORE.label}
                  </span>
                  <h3
                    className="mt-2 text-[1.35rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.6rem]"
                    style={{ fontWeight: 450 }}
                  >
                    {FACE_MAP_CORE.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <CountUp
                      to={FACE_MAP_CORE.price}
                      prefix="₹"
                      className="text-[2.5rem] tracking-[-0.02em] text-ink tabular-nums md:text-[2.9rem]"
                    />
                  </div>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/70">
                    {FACE_MAP_CORE.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {FACE_MAP_CORE.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.05) }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist">
                      <Check className="h-3 w-3 text-teal" strokeWidth={2.5} />
                    </span>
                    <span className="text-[13.5px] text-ink/80">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Add-ons ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {FACE_MAP_ADDONS.map((addon, i) => {
              const Icon = addonIcons[addon.id]
              const on = selected.includes(addon.id)
              return (
                <motion.div
                  key={addon.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...REVEAL, delay: 0.08 + i * 0.08 }}
                  className={`flex flex-col rounded-[22px] border p-5 transition-all duration-300 ${
                    on
                      ? 'border-accent/40 bg-accent-soft/35 shadow-[0_16px_36px_-22px_rgb(var(--c-accent)/0.5)]'
                      : 'border-border/50 bg-white'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="icon-tile-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-analysis-teal">
                      Add-on
                    </span>
                    <span
                      className="ml-auto text-[15px] tabular-nums text-ink"
                      style={{ fontWeight: 500 }}
                    >
                      +{addon.priceDisplay}
                    </span>
                  </div>

                  <h3 className="text-[15.5px] font-medium tracking-[-0.01em] text-ink">
                    {addon.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink/[0.7]">
                    {addon.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggle(addon.id)}
                    aria-pressed={on}
                    className={`mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors duration-200 ${
                      on
                        ? 'bg-accent text-white hover:bg-accent-foreground'
                        : 'border border-border bg-white text-ink hover:bg-mist'
                    }`}
                  >
                    {on ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Add {addon.name === 'Style & Colour Map' ? 'Style Map' : addon.name}
                      </>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Live order summary ───────────────────────────────────────────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-4 overflow-hidden rounded-[24px] border border-border-soft bg-white lg:mt-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/70">
                Your Map so far
              </p>
              <dl className="space-y-2.5">
                <div className="flex items-baseline justify-between gap-4 text-[13.5px]">
                  <dt className="text-ink/70">{FACE_MAP_CORE.name}</dt>
                  <dd className="tabular-nums text-ink">{FACE_MAP_CORE.priceDisplay}</dd>
                </div>

                <AnimatePresence initial={false}>
                  {FACE_MAP_ADDONS.filter((a) => selected.includes(a.id)).map((a) => (
                    <motion.div
                      key={a.id}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="flex items-baseline justify-between gap-4 overflow-hidden text-[13.5px]"
                    >
                      <dt className="text-ink/70">{a.name}</dt>
                      <dd className="tabular-nums text-ink">+{a.priceDisplay}</dd>
                    </motion.div>
                  ))}

                  {both && (
                    <motion.div
                      key="bundle"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="flex items-baseline justify-between gap-4 overflow-hidden text-[13.5px]"
                    >
                      <dt className="flex items-center gap-1.5 text-accent-foreground">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Both Maps bundle
                      </dt>
                      <dd className="tabular-nums text-accent-foreground">
                        −{ADDON_BUNDLE.savingDisplay}
                      </dd>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                  <dt className="text-[13.5px] text-ink" style={{ fontWeight: 500 }}>
                    Total
                  </dt>
                  <dd>
                    <CountUp
                      to={total}
                      prefix="₹"
                      live
                      className="text-[1.6rem] tracking-[-0.02em] text-ink tabular-nums md:text-[1.9rem]"
                    />
                  </dd>
                </div>
              </dl>
              <p className="mt-2.5 text-[12px] text-analysis-teal">
                {FACE_MAP_CORE.gstNote}. No hidden recommendation fees.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 md:w-[260px]">
              {!both && (
                <motion.button
                  type="button"
                  onClick={() => setSelected(['hair_map', 'style_colour_map'])}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={TAP_SPRING}
                  className="rounded-[14px] border border-accent/30 bg-accent-soft/40 px-4 py-3 text-left transition-colors duration-200 hover:bg-accent-soft/70"
                >
                  <p className="text-[12.5px] text-ink" style={{ fontWeight: 500 }}>
                    Add both Maps for {ADDON_BUNDLE.priceDisplay}
                  </p>
                  <p className="mt-0.5 text-[11px] text-analysis-teal">
                    {ADDON_BUNDLE.label} · save {ADDON_BUNDLE.savingDisplay}
                  </p>
                </motion.button>
              )}

              <Link href={startHref} className="btn-primary group w-full">
                Start My Plan
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>

              <div className="flex items-center justify-center gap-3 text-[11px] text-analysis-teal">
                <span>Secure payment</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" />
                <span>Add-ons chosen before payment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
