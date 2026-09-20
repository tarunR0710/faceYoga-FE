'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useReducedMotion } from 'framer-motion'
import { CloudRain, Droplets, Wind } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTEXT } from '@/lib/content'

// The serif italic the site keeps for its one soft line per section — here the
// card's time-of-year line and "The Face Map." in the closing block.
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['italic'] })

const INK = '#1E353B'
const NOTE = '#5C7278'
const CARD_W = 292
const GAP = 12
const EASE = 'cubic-bezier(.2,.7,.2,1)'

type Weather = 'wind' | 'rain' | 'drip'

/**
 * Each card is a sky, not a tinted box (design 36a). Delhi — cold blue-grey
 * dusk, a low pale sun, wind streaks drifting at different speeds. Chennai —
 * warm hazy amber, a sun glowing behind moving haze, rain lines falling at
 * staggered speeds. Hard water — slate, drops falling into ripples that expand
 * and fade. Text stays ink on light sky, so there is no white-on-photo risk.
 */
const SKY: Record<Weather, { sky: string; orb: number; ring: string; Icon: typeof Wind }> = {
  wind: { sky: 'linear-gradient(165deg,#B8C7D6 0%,#D4DEE7 55%,#E9EEF2 100%)', orb: 0.6, ring: 'rgba(30,53,59,.18)', Icon: Wind },
  rain: { sky: 'linear-gradient(165deg,#E9C9A4 0%,#F3DFC8 55%,#F8EFE4 100%)', orb: 1, ring: 'rgba(30,53,59,.16)', Icon: CloudRain },
  drip: { sky: 'linear-gradient(165deg,#B9C3CB 0%,#CFD7DD 55%,#E4E9ED 100%)', orb: 0.25, ring: 'rgba(30,53,59,.2)', Icon: Droplets },
}

// Deterministic particle sets — no Math.random, so the server and client
// render the same markup and nothing pops on hydration.
const STREAKS = [18, 31, 44, 58, 71].map((top, i) => ({
  top: `${top}%`,
  w: `${[96, 64, 120, 80, 56][i]}px`,
  op: [0.75, 0.45, 0.9, 0.55, 0.4][i],
  dur: `${[5.2, 7.1, 4.4, 6.3, 8][i]}s`,
  delay: `${[0, 1.4, 2.6, 0.8, 3.5][i]}s`,
}))
const DROPS = Array.from({ length: 12 }, (_, i) => ({
  left: `${4 + i * 8.2}%`,
  h: `${[22, 16, 26, 18, 24, 14, 20, 26, 16, 22, 18, 24][i]}px`,
  op: [0.8, 0.45, 0.7, 0.55, 0.85, 0.4, 0.65, 0.75, 0.5, 0.8, 0.45, 0.7][i],
  dur: `${[1.9, 2.6, 1.7, 2.3, 2.0, 2.8, 1.8, 2.2, 2.5, 1.9, 2.7, 2.1][i]}s`,
  delay: `${[0, 0.7, 1.3, 0.3, 1.8, 0.9, 1.5, 0.2, 1.1, 0.6, 1.9, 0.4][i]}s`,
}))
const RIPPLES = [
  { left: '30%', top: '58%', size: '64px', dur: '3.2s', delay: '0s' },
  { left: '64%', top: '42%', size: '48px', dur: '3.6s', delay: '1.1s' },
  { left: '48%', top: '74%', size: '56px', dur: '3.4s', delay: '2.2s' },
]

/**
 * "Built for your context" — the relevance objection, as a row of weather
 * cards. The weather runs only in the card in focus: swipe or tap a card and
 * its sky starts while the others freeze mid-frame and drop back in scale, so
 * only one thing ever moves. Then the anti-upsell promise, immediately before
 * the price.
 */
export function ContextFit() {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLUListElement>(null)
  const [focus, setFocus] = useState(0)
  const cards = CONTEXT.cards

  // The focused card is whichever sits nearest the rail's centre line.
  const onScroll = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const mid = rail.scrollLeft + rail.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(rail.children).forEach((el, i) => {
      const li = el as HTMLElement
      if (!li.dataset.card) return
      const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid)
      if (d < dist) { dist = d; best = i }
    })
    setFocus(best)
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let raf = 0
    const handler = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(onScroll) }
    rail.addEventListener('scroll', handler, { passive: true })
    return () => { rail.removeEventListener('scroll', handler); cancelAnimationFrame(raf) }
  }, [onScroll])

  const go = (i: number) => {
    const rail = railRef.current
    const li = rail?.children[i] as HTMLElement | undefined
    if (!rail || !li) return
    // On wide screens every card fits and nothing can scroll — focus directly.
    if (rail.scrollWidth <= rail.clientWidth + 1) { setFocus(i); return }
    rail.scrollTo({ left: li.offsetLeft + li.offsetWidth / 2 - rail.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="context"
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, rgba(173,199,206,0.22) 0%, rgba(247,244,239,0.55) 45%, #ffffff 100%)' }}
    >
      <div className="container-main">
        <SectionHeading eyebrow={CONTEXT.eyebrow} title={CONTEXT.title} muted={CONTEXT.muted} lede={CONTEXT.lede} />

        <Reveal index={1} from="none">
          <ul
            ref={railRef}
            aria-label="Three contexts, one face"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start overflow-x-auto px-5 pb-2.5 pt-1.5 md:-mx-8 md:px-8 lg:justify-center"
            style={{ gap: GAP }}
          >
            {cards.map((c, i) => {
              const on = i === focus
              const play = on && !reduce ? 'running' : 'paused'
              const { sky, orb, ring, Icon } = SKY[c.weather as Weather]
              return (
                <li
                  key={c.id}
                  data-card={c.id}
                  onClick={() => go(i)}
                  className="relative flex shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-[26px]"
                  style={{
                    width: CARD_W,
                    padding: '22px 22px 20px',
                    gap: 16,
                    background: sky,
                    color: INK,
                    transform: on ? 'scale(1)' : 'scale(.94)',
                    boxShadow: on ? '0 26px 44px -26px rgba(30,53,59,.45)' : '0 0 0 0 rgba(30,53,59,0)',
                    transition: reduce ? 'none' : `transform 500ms ${EASE}, box-shadow 500ms ${EASE}`,
                  }}
                >
                  {/* ── the weather ─────────────────────────────────────── */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: on ? 1 : 0.55, transition: reduce ? 'none' : 'opacity 500ms ease' }}
                  >
                    <span
                      className="absolute rounded-full"
                      style={{
                        top: -26, right: -18, width: 130, height: 130,
                        background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,.95), rgba(255,255,255,0) 68%)',
                        opacity: orb,
                        animation: 'wxGlow 5.5s ease-in-out infinite',
                        animationPlayState: play,
                      }}
                    />
                    {c.weather === 'wind' &&
                      STREAKS.map((s, k) => (
                        <span
                          key={k}
                          className="absolute left-0 h-[1.5px] rounded-[2px]"
                          style={{
                            top: s.top, width: s.w, opacity: s.op,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.95))',
                            animation: `wxDrift ${s.dur} linear infinite`,
                            animationDelay: s.delay,
                            animationPlayState: play,
                          }}
                        />
                      ))}
                    {c.weather === 'rain' && (
                      <>
                        <span
                          className="absolute"
                          style={{
                            left: -20, right: -20, top: 10, height: 90,
                            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.7), rgba(255,255,255,0) 70%)',
                            animation: 'wxHaze 9s ease-in-out infinite',
                            animationPlayState: play,
                          }}
                        />
                        {DROPS.map((d, k) => (
                          <span
                            key={k}
                            className="absolute top-0 w-[1.5px] rounded-[2px]"
                            style={{
                              left: d.left, height: d.h, opacity: d.op,
                              background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.95))',
                              animation: `wxFall ${d.dur} linear infinite`,
                              animationDelay: d.delay,
                              animationPlayState: play,
                            }}
                          />
                        ))}
                      </>
                    )}
                    {c.weather === 'drip' && (
                      <>
                        {RIPPLES.map((r, k) => (
                          <span
                            key={k}
                            className="absolute rounded-full"
                            style={{
                              left: r.left, top: r.top, width: r.size, height: r.size, margin: '-1px 0 0 -1px',
                              border: '1.5px solid rgba(255,255,255,.9)',
                              animation: `wxRipple ${r.dur} ease-out infinite`,
                              animationDelay: r.delay,
                              animationPlayState: play,
                            }}
                          />
                        ))}
                        {DROPS.map((d, k) => (
                          <span
                            key={k}
                            className="absolute top-0 h-[3px] w-[3px] rounded-full"
                            style={{
                              left: d.left, opacity: d.op,
                              background: 'rgba(255,255,255,.95)',
                              animation: `wxFall ${d.dur} linear infinite`,
                              animationDelay: d.delay,
                              animationPlayState: play,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </span>

                  {/* ── the card ────────────────────────────────────────── */}
                  <div className="relative flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ border: `1px solid ${ring}`, background: 'rgba(255,255,255,.4)' }}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} style={{ color: INK }} />
                    </span>
                    <span className="font-mono text-[11px] tabular-nums" style={{ color: NOTE }}>
                      {String(i + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="relative flex flex-col gap-[3px]">
                    <span className="text-[24px] leading-[1.1] tracking-[-0.02em]" style={{ fontWeight: 500 }}>
                      {c.city}
                    </span>
                    <span className={`${serif.className} text-[17px] italic`} style={{ color: NOTE }}>
                      {c.when}
                    </span>
                  </div>
                  <span className="relative font-mono text-[11px] uppercase tracking-[0.04em]" style={{ color: INK }}>
                    {c.feel}
                  </span>
                  <div className="relative flex flex-col" style={{ borderTop: '1px solid rgba(30,53,59,.14)' }}>
                    <span className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: NOTE, fontWeight: 600, padding: '12px 0 2px' }}>
                      What changes
                    </span>
                    {c.changes.map((x) => (
                      <span
                        key={x}
                        className="text-[13.5px] leading-[1.35]"
                        style={{ padding: '9px 0', borderBottom: '1px solid rgba(30,53,59,.1)', color: INK }}
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </li>
              )
            })}
            <li aria-hidden="true" className="w-3 shrink-0 lg:hidden" />
          </ul>
        </Reveal>

        <Reveal index={2} from="none" className="flex justify-center gap-1.5 lg:hidden">
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={`Show ${c.city}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full"
              style={{
                width: i === focus ? 18 : 6,
                background: i === focus ? INK : 'rgba(30,53,59,.2)',
                transition: reduce ? 'none' : 'all 350ms ease',
              } as CSSProperties}
            />
          ))}
        </Reveal>

        {/* ── The anti-upsell promise, immediately before the price ──────── */}
        <Reveal
          index={3}
          className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3.5 border-t pt-[26px] text-center"
          style={{ borderColor: 'rgba(30,53,59,.1)' }}
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[1.6rem] leading-[1.1] tracking-[-0.03em] text-ink md:text-[1.85rem]" style={{ fontWeight: 300 }}>
              {CONTEXT.antiUpsell.title}
            </h3>
            <p className={`${serif.className} text-[2.1rem] italic leading-[1.1] md:text-[2.4rem]`} style={{ color: INK }}>
              {CONTEXT.antiUpsell.accent}
            </p>
          </div>
          <div className="flex flex-col gap-[5px] text-[14px] leading-[1.45]" style={{ color: NOTE }}>
            {CONTEXT.antiUpsell.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <p className="mt-1 max-w-[320px] text-[14px] leading-[1.5]" style={{ color: INK, textWrap: 'pretty' }}>
            {CONTEXT.antiUpsell.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
