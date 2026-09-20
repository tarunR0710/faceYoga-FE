'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { REFUND_POLICY } from '@/lib/constants'
import { ANCHOR } from '@/lib/content'

// Design 37 (canvas export 2026-09-20 23:16). Every colour, icon path and
// measurement below is the canvas's own; the type (Geist, our pill) is ours.
const INK = '#2E4F58'
const HEAD = '#25454E'
const NOTE = '#5C7278'
const PANEL = '#F4F7F7'
const HAIRLINE = 'rgba(30,53,59,.1)'

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
 * total, the dark "Our way" plan card, the compact refund card, reassurance
 * as pills. Desktop is 37a: the rows as hairline cards with cadence pills,
 * the ink-ringed plan card, and the refund card with its three moments.
 */
export function Money() {
  return (
    <section id="money" className="section bg-white" style={{ color: INK }}>
      <div className="container-main flex flex-col gap-[22px] lg:gap-[30px]">
        <Reveal index={0} className="flex max-w-[760px] flex-col items-start gap-3 lg:gap-2.5">
          <SectionTag>{ANCHOR.eyebrow}</SectionTag>
          <h2 className="text-[2.125rem] leading-[1.08] tracking-[-0.035em] md:text-[2.375rem] md:tracking-[-0.03em]" style={{ fontWeight: 300, color: HEAD, textWrap: 'pretty' }}>
            {ANCHOR.title} <span className="text-ink/40">{ANCHOR.muted}</span>
          </h2>
        </Reveal>

        {/* ── mobile · 37b ─────────────────────────────────────────────── */}
        <Reveal index={1} from="none" className="flex flex-col gap-[22px] lg:hidden">
          <div className="flex flex-col rounded-[24px]" style={{ background: PANEL, padding: '8px 20px 0' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: NOTE, padding: '14px 0 10px' }}>
              {ANCHOR.usual.label}
            </p>
            {ANCHOR.rows.map((row, i) => {
              const look = ROW_LOOK[i]
              const last = i === ANCHOR.rows.length - 1
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[34px_1fr_auto] items-center gap-x-3 gap-y-0.5 py-3.5"
                  style={{ borderBottom: last ? 'none' : '1px solid rgba(30,53,59,.08)' }}
                >
                  <span className="row-span-2 flex h-[34px] w-[34px] items-center justify-center rounded-[11px]" style={{ background: look.tint }}>
                    <Glyph d={look.icon} stroke={look.ink} size="h-4 w-4" width={1.5} />
                  </span>
                  <span className="text-[15px] leading-[1.25] tracking-[-0.01em]" style={{ color: INK, fontWeight: 500, textWrap: 'pretty' }}>
                    {row.label}
                  </span>
                  <span
                    className="row-span-2 whitespace-nowrap rounded-full font-mono text-[10.5px] uppercase tracking-[0.06em]"
                    style={{ color: look.ink, background: look.tint, padding: '5px 10px' }}
                  >
                    {row.cadence}
                  </span>
                  <span className="text-[12.5px] leading-[1.4]" style={{ color: NOTE }}>
                    {row.value} · {row.short}
                  </span>
                </div>
              )
            })}
            <div className="mt-0.5 flex items-baseline justify-between gap-3" style={{ padding: '16px 0 18px', borderTop: '1px solid rgba(30,53,59,.12)' }}>
              <span className="flex flex-col gap-0.5">
                <span className="text-[14.5px] tracking-[-0.01em]" style={{ color: INK, fontWeight: 500 }}>{ANCHOR.usual.totalLabel}</span>
                <span className="text-[12px] leading-[1.4]" style={{ color: NOTE }}>{ANCHOR.usual.totalSub}</span>
              </span>
              <span className="whitespace-nowrap font-mono text-[16px] tabular-nums" style={{ color: INK }}>{ANCHOR.usual.total}</span>
            </div>
          </div>

          <div
            className="flex flex-col gap-[18px] rounded-[24px] text-white"
            style={{
              padding: '26px 24px 24px',
              background: 'linear-gradient(155deg,#37606B 0%,#274A54 60%,#1E3B44 100%)',
              boxShadow: '0 18px 34px -22px rgba(30,59,68,.85)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,.72)' }}>{ANCHOR.plan.ourWay}</span>
              <span className="rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ background: 'rgba(255,255,255,.16)', padding: '5px 11px' }}>
                {ANCHOR.plan.paidOnce}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[20px] leading-[1.2] tracking-[-0.02em]" style={{ fontWeight: 500 }}>{ANCHOR.plan.label}</span>
              <span className="text-[56px] leading-none tracking-[-0.03em] tabular-nums" style={{ fontWeight: 300 }}>{ANCHOR.plan.value}</span>
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,.75)' }}>{ANCHOR.plan.gst}</span>
            </div>
            <ul className="flex flex-col gap-[9px] pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.18)' }}>
              {ANCHOR.plan.includes.map((line) => (
                <li key={line} className="flex gap-2.5 text-[14px] leading-[1.35]">
                  <Check className="mt-0.5 h-[15px] w-[15px] shrink-0" strokeWidth={2} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border" style={{ borderColor: HAIRLINE, padding: '22px 20px' }}>
            <h3 className="text-[19px] leading-[1.25] tracking-[-0.02em]" style={{ color: HEAD, fontWeight: 400, textWrap: 'pretty' }}>
              {REFUND_POLICY.headline}
            </h3>
            <div className="flex flex-col gap-3">
              {REFUND_POLICY.moments.map((m, i) => {
                const look = MOMENT_LOOK[i]
                return (
                  <div key={m.when} className="grid grid-cols-[30px_1fr] items-center gap-x-3 gap-y-0.5">
                    <span className="row-span-2 flex h-[30px] w-[30px] items-center justify-center rounded-[10px]" style={{ background: look.tint }}>
                      <Glyph d={look.icon} stroke="#3A5A63" size="h-3.5 w-3.5" width={1.7} />
                    </span>
                    <span className="text-[14.5px] leading-[1.25] tracking-[-0.01em]" style={{ color: INK, fontWeight: 500 }}>{m.head}</span>
                    <span className="text-[12.5px] leading-[1.4]" style={{ color: NOTE }}>{m.when}</span>
                  </div>
                )
              })}
            </div>
            <p className="pt-3.5 text-[12px] leading-[1.55]" style={{ color: NOTE, borderTop: '1px solid rgba(30,53,59,.08)', textWrap: 'pretty' }}>
              {REFUND_POLICY.footnote}
            </p>
          </div>

          <ul className="mt-0.5 flex flex-wrap gap-2 px-2">
            {ANCHOR.reassurance.map((r) => (
              <li key={r} className="inline-flex items-center rounded-full text-[12.5px] leading-[1.2]" style={{ background: PANEL, color: NOTE, padding: '8px 13px' }}>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── desktop · 37a ────────────────────────────────────────────── */}
        <Reveal index={1} from="none" className="hidden lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-[26px]">
          <div className="flex flex-col gap-3">
            {ANCHOR.rows.map((row, i) => {
              const look = ROW_LOOK[i]
              return (
                <div key={row.label} className="grid grid-cols-[44px_1fr_auto] items-start gap-x-4 gap-y-1 rounded-[20px] border px-5 py-[18px]" style={{ borderColor: HAIRLINE }}>
                  <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: look.tint, border: `1px solid ${look.ring}` }}>
                    <Glyph d={look.icon} stroke={look.ink} size="h-[19px] w-[19px]" width={1.5} />
                  </span>
                  <span className="text-[17px] leading-[1.25] tracking-[-0.01em]" style={{ color: '#1E353B', fontWeight: 500 }}>{row.label}</span>
                  <span className="flex flex-col items-end gap-1.5">
                    <span className="whitespace-nowrap font-mono text-[13.5px] tabular-nums" style={{ color: '#1E353B' }}>{row.value}</span>
                    <span className="whitespace-nowrap rounded-full font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: look.ink, background: look.tint, padding: '4px 9px' }}>
                      {row.cadence}
                    </span>
                  </span>
                  <span className="col-span-2 col-start-2 text-[13.5px] leading-[1.5]" style={{ color: NOTE, textWrap: 'pretty' }}>{row.note}</span>
                </div>
              )
            })}
            <div className="grid grid-cols-[44px_1fr_auto] items-start gap-x-4 gap-y-1.5 rounded-[20px] border p-5" style={{ borderColor: '#1E353B', background: 'rgba(30,53,59,.03)' }}>
              <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: '#1E353B' }}>
                <Check className="h-[19px] w-[19px] text-white" strokeWidth={1.6} />
              </span>
              <span className="text-[18px] leading-[1.25] tracking-[-0.01em]" style={{ color: '#1E353B', fontWeight: 500 }}>{ANCHOR.plan.label}</span>
              <span className="flex flex-col items-end gap-1.5">
                <span className="whitespace-nowrap text-[30px] leading-none tracking-[-0.02em] tabular-nums" style={{ color: '#1E353B', fontWeight: 300 }}>{ANCHOR.plan.value}</span>
                <span className="whitespace-nowrap rounded-full font-mono text-[10px] uppercase tracking-[0.08em] text-white" style={{ background: '#1E353B', padding: '4px 9px' }}>
                  {ANCHOR.plan.once}
                </span>
              </span>
              <span className="col-span-2 col-start-2 text-[13.5px] leading-[1.5]" style={{ color: NOTE, textWrap: 'pretty' }}>{ANCHOR.plan.note}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px] rounded-[24px] border" style={{ borderColor: HAIRLINE, padding: '26px 26px 22px' }}>
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.1em]" style={{ color: '#7E959B' }}>If you change your mind</p>
              <h3 className="text-[23px] leading-[1.2] tracking-[-0.02em]" style={{ color: '#1E353B', fontWeight: 400, textWrap: 'pretty' }}>{REFUND_POLICY.headline}</h3>
            </div>
            <div className="flex flex-col gap-3.5">
              {REFUND_POLICY.moments.map((m, i) => {
                const look = MOMENT_LOOK[i]
                return (
                  <div key={m.when} className="grid grid-cols-[36px_1fr] items-start gap-x-3 gap-y-1">
                    <span className="row-span-3 flex h-9 w-9 items-center justify-center rounded-[12px]" style={{ background: look.tint, border: `1px solid ${look.ring}` }}>
                      <Glyph d={look.icon} stroke="#1E353B" size="h-4 w-4" width={1.6} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: '#7E959B' }}>{m.when}</span>
                    <span className="text-[15px] leading-[1.25] tracking-[-0.01em]" style={{ color: '#1E353B', fontWeight: 500 }}>{m.head}</span>
                    <span className="text-[13px] leading-[1.5]" style={{ color: NOTE, textWrap: 'pretty' }}>{m.body}</span>
                  </div>
                )
              })}
            </div>
            <ul className="mt-auto flex flex-col gap-2 pt-4" style={{ borderTop: '1px solid rgba(30,53,59,.08)' }}>
              {ANCHOR.reassurance.map((r) => (
                <li key={r} className="flex gap-2.5 text-[13px] leading-[1.45]" style={{ color: '#1E353B' }}>
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: '#98A6AB' }} />
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
