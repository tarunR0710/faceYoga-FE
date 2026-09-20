'use client'

import { Check, Scissors, Stethoscope, FlaskConical, Undo2, ClipboardCheck, CalendarClock } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { REFUND_POLICY } from '@/lib/constants'
import { ANCHOR } from '@/lib/content'

// Design 37 colour budget: ink, two greys, hairlines and three existing site
// tints on the icon coins. Teal is spent only on the Start My Plan button in
// the pricing section above this one.
const INK = '#1E353B'
const NOTE = '#5C7278'
const LABEL = '#7E959B'
const GHOST = '#98A6AB'
const HAIRLINE = 'rgba(30,53,59,.1)'
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

/**
 * "You are already spending this." — design 37, the section after pricing.
 * The point is not the price, it is that the other spending repeats. Each
 * row: tinted icon coin, name, mono price, one-line note, then twelve dots
 * (filled = times a year) with a cadence tag. The plan row is ink-ringed with
 * a single filled dot. Beside it, the refund policy as three labelled moments,
 * each with its own coin, then the three reassurance lines. Stacked on mobile
 * (37b), 1.3fr / 1fr on desktop (37a). Site type and pill tag throughout.
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
        </Reveal>
      </div>
    </section>
  )
}
