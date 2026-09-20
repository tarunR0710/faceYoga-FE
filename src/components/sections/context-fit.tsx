'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { useReducedMotion } from 'framer-motion'
import { Droplets, Waves, Wind } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTEXT } from '@/lib/content'

// The serif italic the site keeps for its one soft line per section — here the
// card's season line and "The Face Map." in the closing block.
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['italic'] })

// Design 36a's palette, verbatim. INK is the design's teal-ink, not the site's
// slate `ink` token — every card and the closing block are set in it.
const INK = '#1E353B'
const NOTE = '#5C7278'
const CARD_W = 292
const GAP = 12
const EASE = 'cubic-bezier(.2,.7,.2,1)'

type Weather = 'wind' | 'rain' | 'drip'

/**
 * Each card is a sky, not a tinted box (design 36a). Delhi — cold blue-grey
 * dusk, a low pale sun, five wind streaks drifting across at different speeds.
 * Chennai — warm hazy amber, a sun glowing behind moving haze, twelve rain
 * lines falling at staggered speeds. Hard water — slate, droplets falling into
 * three ripples that expand and fade. Text stays ink on light sky, so there is
 * no white-on-photo contrast risk. Sky gradients, ring tints and icons
 * (Lucide wind / droplets / waves) are the canvas values. One departure: the
 * hairlines in the "What changes" list run at .05 / .1 alpha instead of the
 * canvas's .1 / .14 — on the light skies they read as ruled paper otherwise.
 */
const SKY: Record<Weather, { sky: string; ring: string; Icon: typeof Wind }> = {
  wind: { sky: 'linear-gradient(170deg,#BFD2D9 0%,#D6E0E2 48%,#EDEFEC 100%)', ring: 'rgba(61,107,118,.18)', Icon: Wind },
  rain: { sky: 'linear-gradient(170deg,#E8D3BE 0%,#EFE1D2 46%,#F7F1E8 100%)', ring: 'rgba(150,110,70,.18)', Icon: Droplets },
  drip: { sky: 'linear-gradient(170deg,#C3CBD9 0%,#D8DDE4 48%,#EEF0F2 100%)', ring: 'rgba(70,85,110,.18)', Icon: Waves },
}

// Particle geometry, evaluated once from the design's seeded generator
// (`rnd(a, b, s) = a + frac(sin(s · 12.9898) · 43758.5453) · (b − a)`) and
// shipped as literals: the server and the client render identical markup and
// nothing pops on hydration. Streaks: top 14 + 19k %, width rnd(70,150,k),
// 4.8 + 0.9k s, delay 0.85k s, opacity .22/.34 alternating. Drops (shared by
// the rain lines and the hard-water droplets): left rnd(4,94,k+3), height
// rnd(9,20,k+11), 1.5 + rnd(0,1.1,k+5) s, delay rnd(0,2.2,k+19), opacity
// .3 + rnd(0,.3,k+2). Ripples: three fixed seats, 3.2 + 0.8k s, delay 1.1k s.
const STREAKS = [
  { top: "14%", w: "70px", dur: "4.8s", delay: "0.0s", op: 0.22 },
  { top: "33%", w: "144px", dur: "5.7s", delay: "0.8s", op: 0.34 },
  { top: "52%", w: "75px", dur: "6.6s", delay: "1.7s", op: 0.22 },
  { top: "71%", w: "115px", dur: "7.5s", delay: "2.5s", op: 0.34 },
  { top: "90%", w: "100px", dur: "8.4s", delay: "3.4s", op: 0.22 },
]
const DROPS = [
  { left: "54%", h: "18px", dur: "2.00s", delay: "0.71s", op: 0.32 },
  { left: "38%", h: "11px", dur: "2.19s", delay: "1.67s", op: 0.47 },
  { left: "45%", h: "20px", dur: "1.68s", delay: "1.22s", op: 0.41 },
  { left: "60%", h: "18px", dur: "1.86s", delay: "1.45s", op: 0.44 },
  { left: "19%", h: "14px", dur: "2.09s", delay: "0.92s", op: 0.49 },
  { left: "34%", h: "19px", dur: "2.57s", delay: "0.30s", op: 0.35 },
  { left: "53%", h: "14px", dur: "2.40s", delay: "0.73s", op: 0.4 },
  { left: "91%", h: "16px", dur: "1.70s", delay: "1.09s", op: 0.46 },
  { left: "78%", h: "13px", dur: "2.59s", delay: "0.00s", op: 0.59 },
  { left: "20%", h: "17px", dur: "2.40s", delay: "0.36s", op: 0.55 },
  { left: "94%", h: "15px", dur: "1.99s", delay: "0.92s", op: 0.35 },
  { left: "77%", h: "16px", dur: "2.52s", delay: "2.17s", op: 0.6 },
]
const RIPPLES = [
  { left: "22%", top: "58%", size: "54px", dur: "3.2s", delay: "0.0s" },
  { left: "58%", top: "38%", size: "78px", dur: "4.0s", delay: "1.1s" },
  { left: "81%", top: "68%", size: "42px", dur: "4.8s", delay: "2.2s" },
]

/**
 * "Built for your context" — the relevance objection, as a row of weather
 * cards. The weather runs only in the card in focus: swipe the row or tap a
 * card and its sky starts while the others pause mid-frame and drop back in
 * scale and opacity, so only one thing ever moves. Then the anti-upsell
 * promise, immediately before the price.
 */
export function ContextFit() {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLUListElement>(null)
  const [focus, setFocus] = useState(0)
  const cards = CONTEXT.cards

  // The focused card is whichever sits nearest the rail's centre line — the
  // design rounds scrollLeft / 304 (card + gap), which is the same thing on a
  // phone and also holds when the rail is wider than one card.
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
        <SectionHeading align="center" tight eyebrow={CONTEXT.eyebrow} title={CONTEXT.title} muted={CONTEXT.muted} lede={CONTEXT.lede} />

        <div className="flex flex-col" style={{ gap: GAP }}>
          <Reveal index={1} from="none" className="-mt-1.5">
            <ul
              ref={railRef}
              aria-label="Three contexts, one face"
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start overflow-x-auto px-5 pb-2.5 pt-1.5 md:-mx-8 md:px-8 lg:justify-center"
              style={{ gap: GAP }}
            >
              {cards.map((c, i) => {
                const on = i === focus
                const play = on && !reduce ? 'running' : 'paused'
                const { sky, ring, Icon } = SKY[c.weather as Weather]
                return (
                  <li
                    key={c.id}
                    data-card={c.id}
                    onClick={() => go(i)}
                    className="relative flex shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-[26px] will-change-transform"
                    style={{
                      width: CARD_W,
                      padding: '22px 22px 20px',
                      gap: 16,
                      background: sky,
                      color: INK,
                      transform: on ? 'scale(1)' : 'scale(.965)',
                      boxShadow: on ? '0 22px 40px -22px rgba(30,53,59,.55)' : '0 10px 24px -18px rgba(30,53,59,.4)',
                      transition: reduce ? 'none' : `transform 500ms ${EASE}, box-shadow 500ms`,
                    }}
                  >
                    {/* ── the weather ─────────────────────────────────────── */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ opacity: on ? 1 : 0.35, transition: reduce ? 'none' : 'opacity 500ms' }}
                    >
                      <span
                        className="absolute rounded-full"
                        style={{
                          top: -26, right: -18, width: 130, height: 130,
                          background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,.95), rgba(255,255,255,0) 68%)',
                          opacity: on ? 0.9 : 0.5,
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
                        {String(i + 1).padStart(2, '0')}
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
                    <div className="relative flex flex-col" style={{ borderTop: '1px solid rgba(30,53,59,.1)' }}>
                      <span className="text-[10.5px] uppercase tracking-[0.12em]" style={{ color: NOTE, fontWeight: 600, padding: '12px 0 2px' }}>
                        What changes
                      </span>
                      {c.changes.map((x) => (
                        <span
                          key={x}
                          className="text-[13.5px] leading-[1.35]"
                          style={{ padding: '9px 0', borderBottom: '1px solid rgba(30,53,59,.05)', color: INK }}
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
                  background: i === focus ? INK : 'rgba(30,53,59,.22)',
                  transition: reduce ? 'none' : 'all 350ms',
                } as CSSProperties}
              />
            ))}
          </Reveal>
        </div>

        {/* ── The anti-upsell promise, immediately before the price ──────── */}
        <Reveal
          index={3}
          className="mx-auto mt-2 flex max-w-xl flex-col items-center gap-3.5 border-t pt-[26px] text-center"
          style={{ borderColor: 'rgba(30,53,59,.1)', color: INK }}
        >
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[26px] leading-[1.1] tracking-[-0.03em]" style={{ fontWeight: 500 }}>
              {CONTEXT.antiUpsell.title}
            </h3>
            <p className={`${serif.className} text-[34px] italic leading-[1.1]`}>
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
