'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Plus, Scissors, Palette, Zap, Stethoscope, FlaskConical, Undo2, ClipboardCheck, CalendarClock } from 'lucide-react'
import {
  FACE_MAP_CORE,
  FACE_MAP_ADDONS,
  REFUND_POLICY,
  PAYMENT_METHODS,
  computeOrderTotal,
  type AddOnId,
} from '@/lib/constants'
import { EASE_OUT, REVEAL, TAP_SPRING, VIEWPORT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionTag } from '@/components/ui/section-tag'
import { CountUp } from '@/components/ui/count-up'
import { DetailSheet } from '@/components/ui/detail-sheet'
import { ADDON_DETAIL, ANCHOR } from '@/lib/content'

// Design 33/34 colour budget: ink, two greys and hairlines. Teal is spent once,
// on the Start My Plan button above.
const INK = '#1E353B'
const NOTE = '#5C7278'
const LABEL = '#7E959B'
const GHOST = '#98A6AB'
const HAIRLINE = 'rgba(30,53,59,.1)'

// Design 37 tints — all existing site tints — for the icon coins.
const TINT: Record<string, string> = { mist: '173 199 206', blush: '228 200 191', straw: '226 214 178' }
const coin = (t: string) => ({ background: `rgb(${TINT[t]} / 0.45)`, border: `1px solid rgb(${TINT[t]} / 0.9)` })
const ROW_ICON: Record<string, typeof Scissors> = { stethoscope: Stethoscope, flask: FlaskConical, scissors: Scissors }
const MOMENT_ICON: Record<string, typeof Scissors> = { undo: Undo2, clipboard: ClipboardCheck, calendar: CalendarClock }
const DOTS = 12

/** Twelve 6px dots, `on` of them filled — how often a spend comes back in a year. */
function Dots({ on, fill }: { on: number; fill: string }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {Array.from({ length: DOTS }, (_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < on ? fill : 'rgba(30,53,59,.12)' }} />
      ))}
    </span>
  )
}

const addonIcons: Record<AddOnId, typeof Scissors> = {
  priority_delivery: Zap,
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
  const { total } = computeOrderTotal(selected)

  // Carries the chosen Maps into the funnel: /form reads `addons` and hands it
  // to /payment via checkoutData, where the same helper re-prices the order.
  const startHref = selected.length ? `/form?addons=${selected.join(',')}` : '/form'

  return (
    <section id="pricing" className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow="Pricing"
          align="center"
          title="One plan."
          muted="No tiers to decode."
          lede="From onboarding to clarification, everything essential to the core Face Map experience is included. Priority Delivery, a Hair Map or a Style & Colour Map are optional — add them only if you want them."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
          {/* ── Main plan ────────────────────────────────────────────────── */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="rounded-[24px] border border-border-soft bg-white shadow-lg shadow-[rgba(56,189,248,0.12)] lg:self-start"
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
                  <div className="mt-3 flex items-baseline gap-3">
                    <motion.span
                      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT_TIGHT}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="text-[2.5rem] tracking-[-0.02em] text-ink tabular-nums md:text-[2.9rem]"
                    >
                      {FACE_MAP_CORE.priceDisplay}
                    </motion.span>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-white text-brand">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                      {addon.kind === 'delivery' ? 'Optional' : 'Optional specialist Map'}
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

                  {/* One row: the detail link on the left, the Add toggle on
                      the right. The link takes the brand teal so it reads as
                      a link and not as a muted caption. In the sm–lg band the
                      cards sit three across and are too narrow for the pair,
                      so there the link stacks above a right-aligned button. */}
                  <div className="mt-3 flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                    <button
                      type="button"
                      onClick={() => setDetail(addon.id)}
                      className="text-left text-[12px] text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:text-brand-ink hover:decoration-brand-ink/60"
                    >
                      See the {ADDON_DETAIL.items.find((d) => d.id === addon.id)?.includes.length ?? 6}{' '}
                      things you receive
                    </button>

                    <button
                      type="button"
                      onClick={() => toggle(addon.id)}
                      aria-pressed={on}
                      className={`inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors duration-200 sm:self-end lg:self-auto ${
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
                          Add
                        </>
                      )}
                    </button>
                  </div>
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

        {/* ── You are already spending this (design 37) ───────────────────
            The point is not the price, it is that the other spending repeats.
            Each row: tinted icon coin, name, mono price, one-line note, then
            twelve dots (filled = times a year) with a cadence tag. The plan row
            is ink-ringed with a single filled dot. Right: the refund policy as
            three labelled moments, each with its own coin, then the three
            reassurance lines. Teal is still spent only on the CTA above. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.08 }}
          className="mt-12 flex flex-col gap-5 lg:mt-16 lg:gap-[30px]"
        >
          <div className="flex max-w-[760px] flex-col items-start gap-4">
            <SectionTag>{ANCHOR.eyebrow}</SectionTag>
            <h3 className="text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.25rem]" style={{ fontWeight: 300 }}>
              {ANCHOR.title} <span className="text-ink/40">{ANCHOR.muted}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr] lg:gap-[26px] lg:items-stretch">
            {/* left — the ledger */}
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className="px-1 font-mono text-[10px] uppercase tracking-[0.1em] lg:text-[10.5px]" style={{ color: LABEL }}>
                {ANCHOR.legend}
              </p>
              {ANCHOR.rows.map((row) => {
                const Icon = ROW_ICON[row.icon]
                return (
                  <div
                    key={row.label}
                    className="grid grid-cols-[38px_1fr_auto] items-start gap-x-3 gap-y-1 rounded-[18px] border p-4 lg:grid-cols-[44px_1fr_auto] lg:gap-x-4 lg:rounded-[20px] lg:px-5 lg:py-[18px]"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <span className="row-span-3 flex h-[38px] w-[38px] items-center justify-center rounded-[12px] lg:h-11 lg:w-11 lg:rounded-[14px]" style={coin(row.tint)}>
                      <Icon className="h-[17px] w-[17px] lg:h-[19px] lg:w-[19px]" strokeWidth={1.5} style={{ color: INK }} />
                    </span>
                    <span className="text-[15px] leading-[1.25] tracking-[-0.01em] lg:text-[17px]" style={{ color: INK, fontWeight: 500 }}>
                      {row.label}
                    </span>
                    <span className="whitespace-nowrap text-right font-mono text-[12px] tabular-nums lg:text-[13.5px]" style={{ color: INK }}>
                      {row.value}
                    </span>
                    <span className="col-span-2 col-start-2 text-[12.5px] leading-[1.5] lg:text-[13.5px]" style={{ color: NOTE, textWrap: 'pretty' }}>
                      {row.note}
                    </span>
                    <span className="col-span-2 col-start-2 flex items-center gap-2.5 pt-2.5">
                      <Dots on={row.times} fill={INK} />
                      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] lg:text-[10.5px]" style={{ color: LABEL }}>
                        {row.cadence}
                      </span>
                    </span>
                  </div>
                )
              })}

              <div
                className="grid grid-cols-[38px_1fr_auto] items-start gap-x-3 gap-y-1.5 rounded-[18px] border p-4 lg:grid-cols-[44px_1fr_auto] lg:gap-x-4 lg:rounded-[20px] lg:p-5"
                style={{ borderColor: INK, background: 'rgba(30,53,59,.03)' }}
              >
                <span className="row-span-3 flex h-[38px] w-[38px] items-center justify-center rounded-[12px] lg:h-11 lg:w-11 lg:rounded-[14px]" style={{ background: INK }}>
                  <Check className="h-[17px] w-[17px] text-white lg:h-[19px] lg:w-[19px]" strokeWidth={1.6} />
                </span>
                <span className="text-[15.5px] leading-[1.25] tracking-[-0.01em] lg:text-[18px]" style={{ color: INK, fontWeight: 500 }}>
                  {ANCHOR.plan.label}
                </span>
                <span className="whitespace-nowrap text-right text-[24px] leading-none tracking-[-0.02em] tabular-nums lg:text-[30px]" style={{ color: INK, fontWeight: 300 }}>
                  {ANCHOR.plan.value}
                </span>
                <span className="col-span-2 col-start-2 text-[12.5px] leading-[1.5] lg:text-[13.5px]" style={{ color: NOTE, textWrap: 'pretty' }}>
                  {ANCHOR.plan.note}
                </span>
                <span className="col-span-2 col-start-2 flex items-center gap-2.5 pt-2.5">
                  <Dots on={ANCHOR.plan.times} fill={INK} />
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] lg:text-[10.5px]" style={{ color: INK }}>
                    {ANCHOR.plan.cadence}
                  </span>
                </span>
              </div>
            </div>

            {/* right — if you change your mind */}
            <div
              className="mt-1 flex flex-col gap-4 rounded-[20px] border p-5 lg:mt-0 lg:gap-[18px] lg:rounded-[24px] lg:px-[26px] lg:pb-[22px] lg:pt-[26px]"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] lg:text-[10.5px]" style={{ color: LABEL }}>
                  If you change your mind
                </p>
                <h4 className="text-[20px] leading-[1.2] tracking-[-0.02em] lg:text-[23px]" style={{ color: INK, fontWeight: 400, textWrap: 'pretty' }}>
                  {REFUND_POLICY.headline}
                </h4>
              </div>
              <div className="flex flex-col gap-4 lg:gap-3.5">
                {REFUND_POLICY.moments.map((m) => {
                  const Icon = MOMENT_ICON[m.icon]
                  return (
                    <div key={m.when} className="grid grid-cols-[34px_1fr] items-start gap-x-3 gap-y-[3px] lg:grid-cols-[36px_1fr] lg:gap-y-1">
                      <span className="row-span-3 flex h-[34px] w-[34px] items-center justify-center rounded-[11px] lg:h-9 lg:w-9 lg:rounded-[12px]" style={coin(m.tint)}>
                        <Icon className="h-[15px] w-[15px] lg:h-4 lg:w-4" strokeWidth={1.6} style={{ color: INK }} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: LABEL }}>
                        {m.when}
                      </span>
                      <span className="text-[14.5px] leading-[1.25] tracking-[-0.01em] lg:text-[15px]" style={{ color: INK, fontWeight: 500 }}>
                        {m.head}
                      </span>
                      <span className="text-[12.5px] leading-[1.5] lg:text-[13px]" style={{ color: NOTE, textWrap: 'pretty' }}>
                        {m.body}
                      </span>
                    </div>
                  )
                })}
              </div>
              <ul className="mt-auto flex flex-col gap-2 border-t pt-3.5 lg:pt-4" style={{ borderColor: 'rgba(30,53,59,.08)' }}>
                {ANCHOR.reassurance.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[12.5px] leading-[1.45] lg:text-[13px]" style={{ color: INK }}>
                    <Check className="mt-[3px] h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: GHOST }} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
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
