'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Plus, Scissors, Palette, Sparkles } from 'lucide-react'
import {
  FACE_MAP_CORE,
  FACE_MAP_ADDONS,
  ADDON_BUNDLE,
  REFUND_POLICY,
  PAYMENT_METHODS,
  computeOrderTotal,
  type AddOnId,
} from '@/lib/constants'
import { EASE_OUT, REVEAL, TAP_SPRING, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CountUp } from '@/components/ui/count-up'
import { DetailSheet } from '@/components/ui/detail-sheet'
import { ADDON_DETAIL, ANCHOR } from '@/lib/content'

const addonIcons: Record<AddOnId, typeof Scissors> = {
  hair_map: Scissors,
  style_colour_map: Palette,
}

export function PricingPreview() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<AddOnId[]>([])
  // Which add-on's deliverable list is open. The six-item lists used to be
  // printed inline in a whole separate section directly above this one, which
  // meant the same two products were sold twice on one page. They live here now,
  // one tap away, on the card that actually takes the money.
  const [detail, setDetail] = useState<AddOnId | null>(null)

  const toggle = (id: AddOnId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  // Priced in one place (lib/constants) so this card and the payment page can
  // never disagree about what the order costs.
  const { addons, total } = computeOrderTotal(selected)
  const both = addons.bundled

  // Carries the chosen Maps into the funnel: /form reads `addons` and hands it
  // to /payment via checkoutData, where the same helper re-prices the order.
  const startHref = selected.length ? `/form?addons=${selected.join(',')}` : '/form'

  return (
    <section id="pricing" className="section bg-white">
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
            className="rounded-[24px] border border-border-soft bg-white shadow-lg shadow-[rgba(56,189,248,0.12)]"
          >
            <div className="p-3 md:p-4">
              <div
                className="relative overflow-hidden rounded-[18px] p-6 md:p-8"
                style={{
                  // The one accent kept off the achromatic system on purpose —
                  // this is the card that takes the money, and it should not
                  // read as grey. Sky/cyan, not warm. Inline and scoped here,
                  // not promoted to a token.
                  background:
                    'linear-gradient(135deg, rgba(147,213,242,0.28) 0%, rgba(56,189,248,0.30) 50%, rgba(191,219,254,0.26) 100%)',
                }}
              >
                {/* Decorative rings */}
                <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 -translate-y-1/3 translate-x-1/3">
                  <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
                    <circle cx="50" cy="50" r="45" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
                    <circle cx="50" cy="50" r="28" stroke="#7DD3FC" strokeWidth="1" opacity="0.35" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 -translate-x-1/3 translate-y-1/3">
                  <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" stroke="#38BDF8" strokeWidth="1" opacity="0.25" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute left-5 top-5 h-2 w-2 rounded-full bg-[#38BDF8]/35" />
                <div className="pointer-events-none absolute bottom-6 right-10 h-1.5 w-1.5 rounded-full bg-[#BFDBFE]/55" />

                <div className="relative z-10">
                  <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink/55">
                    Main plan · {FACE_MAP_CORE.label}
                  </span>
                  <h3
                    className="mt-2 text-[1.35rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.6rem]"
                    style={{ fontWeight: 300 }}
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
                      <Check className="h-3 w-3 text-brand" strokeWidth={2.5} />
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
                      ? 'border-brand/40 bg-brand-soft/35 shadow-[0_16px_36px_-22px_rgb(var(--c-brand)/0.5)]'
                      : 'border-border/50 bg-white'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="icon-tile-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                      Add-on
                    </span>
                    <span
                      className="ml-auto text-[15px] tabular-nums text-ink"
                      style={{ fontWeight: 500 }}
                    >
                      +{addon.priceDisplay}
                    </span>
                  </div>

                  <h3 className="text-[15.5px] font-normal tracking-[-0.01em] text-ink">
                    {addon.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink/[0.7]">
                    {addon.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setDetail(addon.id)}
                    className="mt-2.5 self-start text-[12px] text-ink/55 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink hover:decoration-ink/50"
                  >
                    See the {ADDON_DETAIL.items.find((d) => d.id === addon.id)?.includes.length ?? 6}{' '}
                    things you receive
                  </button>

                  <button
                    type="button"
                    onClick={() => toggle(addon.id)}
                    aria-pressed={on}
                    className={`mt-3 inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                      on
                        ? 'bg-brand text-white hover:bg-brand-ink'
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
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-brand/70">
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
                      <dt className="flex items-center gap-1.5 text-brand-ink">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Both Maps bundle
                      </dt>
                      <dd className="tabular-nums text-brand-ink">
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
              <p className="mt-2.5 text-[12px] text-ink-muted">
                {FACE_MAP_CORE.gstNote}. No hidden recommendation fees.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 md:w-[260px]">
              {!both && (
                <motion.button
                  type="button"
                  onClick={() => setSelected(FACE_MAP_ADDONS.map((a) => a.id))}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={TAP_SPRING}
                  className="rounded-[14px] border border-brand/30 bg-brand-soft/40 px-4 py-3 text-left transition-colors duration-200 hover:bg-brand-soft/70"
                >
                  <p className="text-[12.5px] text-ink" style={{ fontWeight: 500 }}>
                    Add both Maps for {ADDON_BUNDLE.priceDisplay}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
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

              {/* Risk reversal sits ON the money moment. With no testimonials
                  to lean on, a refund a buyer can actually compute is the
                  strongest proof substitute available. */}
              <p className="text-center text-[11.5px] leading-relaxed text-ink/60">
                {REFUND_POLICY.short}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] text-ink/45">
                {PAYMENT_METHODS.map((m, i) => (
                  <span key={m} className="flex items-center gap-2">
                    {i > 0 ? (
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink/15" />
                    ) : null}
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── What it costs, against what it replaces ────────────────────── */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.08 }}
          className="mt-4 grid grid-cols-1 gap-4 lg:mt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6"
        >
          <div className="rounded-[24px] border border-border-soft bg-mist p-6 md:p-7">
            <p className="mb-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">
              {ANCHOR.eyebrow}
            </p>
            <ul className="space-y-0">
              {ANCHOR.rows.map((row) => {
                const ours = row.kind === 'ours'
                return (
                  <li
                    key={row.label}
                    className={`border-t border-ink/[0.08] py-3 ${ours ? 'mt-1 border-t-2 border-t-brand/40' : ''}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className={`text-[13.5px] ${ours ? 'text-ink' : 'text-ink/55'}`}
                        style={ours ? { fontWeight: 500 } : undefined}
                      >
                        {row.label}
                      </span>
                      <span
                        className={`shrink-0 text-[13px] tabular-nums ${
                          ours ? 'text-ink' : 'text-ink/45'
                        }`}
                        style={ours ? { fontWeight: 500 } : undefined}
                      >
                        {row.value}
                      </span>
                    </div>
                    <p className="mt-1 max-w-md text-[12px] leading-relaxed text-ink/45">
                      {row.note}
                    </p>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 border-t border-ink/[0.08] pt-4 text-[13px] text-ink/70">
              {ANCHOR.recurrence}
            </p>
          </div>

          <div className="rounded-[24px] border border-border-soft bg-white p-6 md:p-7">
            <p className="mb-5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-brand/80">
              If you change your mind
            </p>
            <h3
              className="text-[1.05rem] leading-snug tracking-[-0.01em] text-ink md:text-[1.2rem]"
              style={{ fontWeight: 400 }}
            >
              {REFUND_POLICY.headline}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
              {REFUND_POLICY.detail}
            </p>
            <p className="mt-3.5 border-t border-border-soft pt-3.5 text-[12.5px] leading-relaxed text-ink/55">
              {REFUND_POLICY.reschedule}
            </p>
            <ul className="mt-4 space-y-1.5">
              {ANCHOR.reassurance.map((r) => (
                <li key={r} className="flex items-baseline gap-2.5">
                  <span aria-hidden="true" className="mt-[8px] h-px w-2.5 shrink-0 bg-brand/60" />
                  <span className="text-[12.5px] leading-snug text-ink/65">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
      {/* ── Deliverable detail, on demand ─────────────────────────────────── */}
      {ADDON_DETAIL.items.map((item) => {
        const addon = FACE_MAP_ADDONS.find((a) => a.id === item.id)
        if (!addon) return null
        const on = selected.includes(addon.id)
        return (
          <DetailSheet
            key={item.id}
            open={detail === addon.id}
            onOpenChange={(o) => setDetail(o ? addon.id : null)}
            eyebrow="Optional add-on"
            title={item.name}
            lede={item.tagline}
            figure={item.price}
            footer={
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggle(addon.id)}
                  aria-pressed={on}
                  className={`inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200 ${
                    on
                      ? 'bg-brand text-white hover:bg-brand-ink'
                      : 'bg-ink text-white hover:bg-ink/90'
                  }`}
                >
                  {on ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                      Added to your Map
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                      Add for {item.price.replace('+', '')}
                    </>
                  )}
                </button>
              </div>
            }
          >
            <p className="text-[14px] leading-relaxed text-ink-muted">{item.text}</p>

            <p className="mb-4 mt-7 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/40">
              What you receive
            </p>
            <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {item.includes.map((line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-2.5 border-b border-border-soft py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 -translate-y-[2px] rounded-full bg-brand/60"
                  />
                  <span className="text-[13.5px] leading-snug text-ink/75">{line}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[12.5px] leading-relaxed text-ink/45">
              Reviewed as part of the same case as your Face Map — not delivered as a
              separate service.
            </p>
          </DetailSheet>
        )
      })}
    </section>
  )
}
