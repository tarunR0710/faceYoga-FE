'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { REFUND_POLICY } from '@/lib/constants'
import { ANCHOR } from '@/lib/content'

// Design 37 (canvas export 2026-09-20 23:16) gives the structure, the tints and
// the icon paths. Type is the site's own: Geist, nothing heavier than 400 on
// this page, mono labels at the house tracking, ink and ink-muted for text.
const NOTE = '#5C7278'
const PANEL = '#F7F9F9'
const HAIRLINE = 'rgba(30,53,59,.1)'
const MONO = 'font-mono text-[10px] uppercase tracking-[0.16em]'

/** Per spend row, in ANCHOR.rows order. */
const ROW_LOOK = [
  { tint: 'rgba(173,199,206,.35)', ring: 'rgba(61,107,118,.22)', ink: '#2B4F58', icon: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M12 6v6l4 2' },
  { tint: 'rgba(228,200,191,.42)', ring: 'rgba(150,90,80,.22)', ink: '#6B3A32', icon: 'M9 2h6v3l3 6v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9l3-6z M6 13h12' },
  { tint: 'rgba(226,214,178,.45)', ring: 'rgba(150,125,60,.22)', ink: '#5E4A16', icon: 'M6 3v7a3 3 0 0 0 3 3h6 M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M9 13 18 4' },
] as const

/** Per refund moment, in REFUND_POLICY.moments order. */
const MOMENT_LOOK = [
  { tint: 'rgba(191,205,182,.45)', ring: 'rgba(90,120,70,.25)', icon: 'M20 6 9 17l-5-5' },
  { tint: 'rgba(226,214,178,.42)', ring: 'rgba(150,125,60,.22)', icon: 'M12 8v5l3 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
  { tint: 'rgba(173,199,206,.4)', ring: 'rgba(61,107,118,.22)', icon: 'M3 12a9 9 0 1 0 3-6.7L3 8 M3 3v5h5' },
] as const

function Glyph({ d, stroke, size, width }: { d: string; stroke: string; size: string; width: number }) {
  return (
    <svg className={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/**
 * "You're already spending this." — design 37, the section after pricing.
 * Mobile is 37b: a soft panel ("The usual way") with three rows and a yearly
 * total, the dark "Our way" plan card, the compact refund card, reassurance as
 * pills. Desktop is 37a: the rows as hairline cards with cadence pills, the
 * ink-ringed plan card, and the refund card with its three moments.
 */
export function Money() {
  return (
    <section id="money" className="section bg-white">
      <div className="container-main flex flex-col gap-8 md:gap-10">
        <Reveal index={0} className="flex max-w-[640px] flex-col items-start gap-4">
          <SectionTag>{ANCHOR.eyebrow}</SectionTag>
          <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]" style={{ fontWeight: 300 }}>
            {ANCHOR.title} <span className="text-ink/40">{ANCHOR.muted}</span>
          </h2>
        </Reveal>

        {/* ── mobile · 37b ─────────────────────────────────────────────── */}
        <Reveal index={1} from="none" className="flex flex-col gap-5 lg:hidden">
          <div className="flex flex-col rounded-[22px] px-5" style={{ background: PANEL }}>
            <p className={`${MONO} pb-3 pt-[18px]`} style={{ color: NOTE }}>
              {ANCHOR.usual.label}
            </p>
            {ANCHOR.rows.map((row, i) => {
              const look = ROW_LOOK[i]
              const last = i === ANCHOR.rows.length - 1
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[34px_1fr_auto] items-center gap-x-3.5 gap-y-1.5 py-[18px]"
                  style={{ borderBottom: last ? 'none' : '1px solid rgba(30,53,59,.08)' }}
                >
                  <span className="row-span-2 flex h-[34px] w-[34px] items-center justify-center rounded-[11px]" style={{ background: look.tint }}>
                    <Glyph d={look.icon} stroke={look.ink} size="h-4 w-4" width={1.5} />
                  </span>
                  <span className="text-[15.5px] leading-tight tracking-[-0.02em] text-ink" style={{ fontWeight: 400, textWrap: 'pretty' }}>
                    {row.label}
                  </span>
                  <span
                    className={`${MONO} row-span-2 whitespace-nowrap rounded-full`}
                    style={{ color: look.ink, background: look.tint, padding: '5px 10px' }}
                  >
                    {row.cadence}
                  </span>
                  <span className="text-[12.5px] leading-relaxed" style={{ color: NOTE }}>
                    {row.value} · {row.short}
                  </span>
                </div>
              )
            })}
            <div className="flex items-baseline justify-between gap-4 py-[18px]" style={{ borderTop: '1px solid rgba(30,53,59,.12)' }}>
              <span className="flex flex-col gap-1">
                <span className="text-[14.5px] leading-tight tracking-[-0.01em] text-ink" style={{ fontWeight: 400 }}>{ANCHOR.usual.totalLabel}</span>
                <span className="text-[12px] leading-relaxed" style={{ color: NOTE }}>{ANCHOR.usual.totalSub}</span>
              </span>
              <span className="whitespace-nowrap font-mono text-[15px] tabular-nums text-ink">{ANCHOR.usual.total}</span>
            </div>
          </div>

          <div
            className="flex flex-col gap-5 rounded-[22px] px-6 pb-7 pt-6 text-white"
            style={{ background: 'linear-gradient(155deg,#37606B 0%,#274A54 60%,#1E3B44 100%)', boxShadow: '0 18px 34px -22px rgba(30,59,68,.85)' }}
          >
            <div className="flex items-center justify-between">
              <span className={MONO} style={{ color: 'rgba(255,255,255,.7)' }}>{ANCHOR.plan.ourWay}</span>
              <span className={`${MONO} rounded-full`} style={{ background: 'rgba(255,255,255,.14)', padding: '5px 11px' }}>
                {ANCHOR.plan.paidOnce}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[17px] leading-tight tracking-[-0.01em]" style={{ fontWeight: 400 }}>{ANCHOR.plan.label}</span>
              <span className="text-[3.25rem] leading-none tracking-[-0.03em] tabular-nums" style={{ fontWeight: 200 }}>{ANCHOR.plan.value}</span>
              <span className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,.7)' }}>{ANCHOR.plan.gst}</span>
            </div>
            <ul className="flex flex-col gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,.18)' }}>
              {ANCHOR.plan.includes.map((line) => (
                <li key={line} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,.92)' }}>
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 rounded-[22px] border px-5 py-6" style={{ borderColor: HAIRLINE }}>
            <h3 className="text-[1.05rem] leading-snug tracking-[-0.01em] text-ink" style={{ fontWeight: 400, textWrap: 'pretty' }}>
              {REFUND_POLICY.headline}
            </h3>
            <div className="flex flex-col gap-4">
              {REFUND_POLICY.moments.map((m, i) => {
                const look = MOMENT_LOOK[i]
                return (
                  <div key={m.when} className="grid grid-cols-[30px_1fr] items-center gap-x-3.5 gap-y-1">
                    <span className="row-span-2 flex h-[30px] w-[30px] items-center justify-center rounded-[10px]" style={{ background: look.tint }}>
                      <Glyph d={look.icon} stroke="#3A5A63" size="h-3.5 w-3.5" width={1.6} />
                    </span>
                    <span className="text-[14.5px] leading-tight tracking-[-0.01em] text-ink" style={{ fontWeight: 400 }}>{m.head}</span>
                    <span className={MONO} style={{ color: NOTE }}>{m.when}</span>
                  </div>
                )
              })}
            </div>
            <p className="pt-4 text-[12px] leading-relaxed" style={{ color: NOTE, borderTop: '1px solid rgba(30,53,59,.08)', textWrap: 'pretty' }}>
              {REFUND_POLICY.footnote}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {ANCHOR.reassurance.map((r) => (
              <li key={r} className="inline-flex items-center rounded-full text-[12.5px] leading-snug" style={{ background: PANEL, color: NOTE, padding: '8px 14px' }}>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── desktop · 37a ────────────────────────────────────────────── */}
        <Reveal index={1} from="none" className="hidden lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-6">
          <div className="flex flex-col gap-3">
            {ANCHOR.rows.map((row, i) => {
              const look = ROW_LOOK[i]
              return (
                <div key={row.label} className="grid grid-cols-[44px_1fr_auto] items-start gap-x-5 gap-y-2 rounded-[20px] border px-6 py-5" style={{ borderColor: HAIRLINE }}>
                  <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: look.tint, border: `1px solid ${look.ring}` }}>
                    <Glyph d={look.icon} stroke={look.ink} size="h-[19px] w-[19px]" width={1.5} />
                  </span>
                  <span className="text-[16.5px] leading-tight tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>{row.label}</span>
                  <span className="flex flex-col items-end gap-2">
                    <span className="whitespace-nowrap font-mono text-[13px] tabular-nums text-ink">{row.value}</span>
                    <span className={`${MONO} whitespace-nowrap rounded-full`} style={{ color: look.ink, background: look.tint, padding: '4px 9px' }}>
                      {row.cadence}
                    </span>
                  </span>
                  <span className="col-span-2 col-start-2 text-[13.5px] leading-relaxed" style={{ color: NOTE, textWrap: 'pretty' }}>{row.note}</span>
                </div>
              )
            })}
            <div className="grid grid-cols-[44px_1fr_auto] items-start gap-x-5 gap-y-2 rounded-[20px] border px-6 py-5" style={{ borderColor: 'rgba(30,53,59,.75)', background: 'rgba(30,53,59,.03)' }}>
              <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: '#1E353B' }}>
                <Check className="h-[19px] w-[19px] text-white" strokeWidth={1.6} />
              </span>
              <span className="text-[17.5px] leading-tight tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>{ANCHOR.plan.label}</span>
              <span className="flex flex-col items-end gap-2">
                <span className="whitespace-nowrap text-[1.85rem] leading-none tracking-[-0.03em] tabular-nums text-ink" style={{ fontWeight: 300 }}>{ANCHOR.plan.value}</span>
                <span className={`${MONO} whitespace-nowrap rounded-full text-white`} style={{ background: '#1E353B', padding: '4px 9px' }}>
                  {ANCHOR.plan.once}
                </span>
              </span>
              <span className="col-span-2 col-start-2 text-[13.5px] leading-relaxed" style={{ color: NOTE, textWrap: 'pretty' }}>{ANCHOR.plan.note}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-[22px] border px-7 py-7" style={{ borderColor: HAIRLINE }}>
            <div className="flex flex-col gap-2.5">
              <p className={MONO} style={{ color: NOTE }}>If you change your mind</p>
              <h3 className="text-[1.2rem] leading-snug tracking-[-0.01em] text-ink" style={{ fontWeight: 400, textWrap: 'pretty' }}>{REFUND_POLICY.headline}</h3>
            </div>
            <div className="flex flex-col gap-4">
              {REFUND_POLICY.moments.map((m, i) => {
                const look = MOMENT_LOOK[i]
                return (
                  <div key={m.when} className="grid grid-cols-[36px_1fr] items-start gap-x-3.5 gap-y-1.5">
                    <span className="row-span-3 flex h-9 w-9 items-center justify-center rounded-[12px]" style={{ background: look.tint, border: `1px solid ${look.ring}` }}>
                      <Glyph d={look.icon} stroke="#1E353B" size="h-4 w-4" width={1.6} />
                    </span>
                    <span className={MONO} style={{ color: NOTE }}>{m.when}</span>
                    <span className="text-[14.5px] leading-tight tracking-[-0.01em] text-ink" style={{ fontWeight: 400 }}>{m.head}</span>
                    <span className="text-[13px] leading-relaxed" style={{ color: NOTE, textWrap: 'pretty' }}>{m.body}</span>
                  </div>
                )
              })}
            </div>
            <ul className="mt-auto flex flex-col gap-2.5 pt-5" style={{ borderTop: '1px solid rgba(30,53,59,.08)' }}>
              {ANCHOR.reassurance.map((r) => (
                <li key={r} className="flex gap-3 text-[13px] leading-relaxed text-ink/75">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0" strokeWidth={1.8} style={{ color: '#98A6AB' }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
