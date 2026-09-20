'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { REFUND_POLICY } from '@/lib/constants'
import { ANCHOR } from '@/lib/content'

// Design 37 (canvas export 2026-09-20). Every colour and icon path below is
// the canvas's own; only the type (Geist, our pill) is the site's.
const INK = '#1E353B'
const NOTE = '#5C7278'
const LABEL = '#7E959B'
const GHOST = '#98A6AB'
const HAIRLINE = 'rgba(30,53,59,.1)'
const DOT_OFF = 'rgba(30,53,59,.09)'

/** Per spend row, in ANCHOR.rows order: coin tint, ring (also the filled-dot colour), icon stroke, icon path. */
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

/** Twelve 6px dots; the first `on` take the row's ring colour. */
function Dots({ on, fill }: { on: number; fill: string }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < on ? fill : DOT_OFF }} />
      ))}
    </span>
  )
}

/**
 * "You are already spending this." — design 37, the section after pricing.
 * Stacked on mobile (37b), 1.3fr / 1fr on desktop (37a).
 */
export function Money() {
  return (
    <section id="money" className="section bg-white">
      <div className="container-main flex flex-col gap-5 lg:gap-[30px]">
        <Reveal index={0} className="flex max-w-[760px] flex-col items-start gap-2.5">
          <SectionTag>{ANCHOR.eyebrow}</SectionTag>
          <h2 className="text-[1.8rem] leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.375rem] md:leading-[1.08]" style={{ fontWeight: 300 }}>
            {ANCHOR.title} <span className="text-ink/40">{ANCHOR.muted}</span>
          </h2>
        </Reveal>

        <Reveal index={1} from="none">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-[26px]">
            {/* ── the ledger ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <p className="px-1 font-mono text-[10px] uppercase tracking-[0.1em] lg:text-[10.5px]" style={{ color: LABEL }}>
                {ANCHOR.legend}
              </p>

              {ANCHOR.rows.map((row, i) => {
                const look = ROW_LOOK[i]
                return (
                  <div
                    key={row.label}
                    className="grid grid-cols-[38px_1fr_auto] items-start gap-x-3 gap-y-1 rounded-[18px] border p-4 lg:grid-cols-[44px_1fr_auto] lg:gap-x-4 lg:rounded-[20px] lg:px-5 lg:py-[18px]"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <span
                      className="row-span-3 flex h-[38px] w-[38px] items-center justify-center rounded-[12px] lg:h-11 lg:w-11 lg:rounded-[14px]"
                      style={{ background: look.tint, border: `1px solid ${look.ring}` }}
                    >
                      <Glyph d={look.icon} stroke={look.ink} size="h-[17px] w-[17px] lg:h-[19px] lg:w-[19px]" width={1.5} />
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
                      <Dots on={row.times} fill={look.ring} />
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

            {/* ── if you change your mind ────────────────────────────────── */}
            <div
              className="mt-1 flex flex-col gap-4 rounded-[20px] border p-5 lg:mt-0 lg:gap-[18px] lg:rounded-[24px] lg:px-[26px] lg:pb-[22px] lg:pt-[26px]"
              style={{ borderColor: HAIRLINE }}
            >
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] lg:text-[10.5px]" style={{ color: LABEL }}>
                  If you change your mind
                </p>
                <h3 className="text-[20px] leading-[1.2] tracking-[-0.02em] lg:text-[23px]" style={{ color: INK, fontWeight: 400, textWrap: 'pretty' }}>
                  {REFUND_POLICY.headline}
                </h3>
              </div>
              <div className="flex flex-col gap-4 lg:gap-3.5">
                {REFUND_POLICY.moments.map((m, i) => {
                  const look = MOMENT_LOOK[i]
                  return (
                    <div key={m.when} className="grid grid-cols-[34px_1fr] items-start gap-x-3 gap-y-[3px] lg:grid-cols-[36px_1fr] lg:gap-y-1">
                      <span
                        className="row-span-3 flex h-[34px] w-[34px] items-center justify-center rounded-[11px] lg:h-9 lg:w-9 lg:rounded-[12px]"
                        style={{ background: look.tint, border: `1px solid ${look.ring}` }}
                      >
                        <Glyph d={look.icon} stroke={INK} size="h-[15px] w-[15px] lg:h-4 lg:w-4" width={1.6} />
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
        </Reveal>
      </div>
    </section>
  )
}
