'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTEXT } from '@/lib/content'

// Design 43a's palette. INK is the design's ink, not the site's slate `ink`
// token — every card and the closing block are set in it, and it has to hold
// against four tinted skies.
const INK = '#26313F'
const NOTE = '#55637A'
const CARD_W = 292
const CARD_H = 440
const GAP = 12
const EASE = 'cubic-bezier(.2,.7,.2,1)'
const MONO = 'font-mono text-[10px] uppercase tracking-[0.16em]'

type Weather = 'wind' | 'rain' | 'drip'

/**
 * The sky per condition. The three city skies are the canvas's own; sage,
 * slate and straw carry the three new cards, all drawn from the site's tint
 * set so the row reads as one system.
 */
const SKY: Record<string, string> = {
  wind: 'linear-gradient(170deg,#BFD2D9 0%,#D6E0E2 48%,#EDEFEC 100%)',
  rain: 'linear-gradient(170deg,#E8D3BE 0%,#EFE1D2 46%,#F7F1E8 100%)',
  drip: 'linear-gradient(170deg,#C3CBD9 0%,#D8DDE4 48%,#EEF0F2 100%)',
  skin: 'linear-gradient(170deg,#CFDCC6 0%,#DFE7D8 48%,#F1F4EC 100%)',
  life: 'linear-gradient(170deg,#C6CEDE 0%,#DADEE8 48%,#EFF1F5 100%)',
  goals: 'linear-gradient(170deg,#DFD6B8 0%,#E9E3CD 48%,#F6F3EA 100%)',
}

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

// ── The three new conditions, in the same register as the weather ──────────
// Skin: three translucent layers settle one on top of another, then clear.
const LAYERS = [
  { top: 32, side: 52, bg: 'rgba(255,255,255,.55)', delay: '0s' },
  { top: 50, side: 38, bg: 'rgba(255,255,255,.7)', delay: '0.45s' },
  { top: 68, side: 24, bg: 'rgba(255,255,255,.85)', delay: '0.9s' },
]
// Goals: three rings, and twelve points that pull into them and scatter again.
// Each point's own position IS its gathered position; the keyframes carry it
// out and back, so nothing has to be measured at runtime.
const TARGETS = [
  { left: 66, top: 34 },
  { left: 136, top: 54 },
  { left: 204, top: 30 },
]
const GATHER = TARGETS.flatMap((t, ti) =>
  [
    { dx: 2, dy: 2 },
    { dx: 9, dy: 6 },
    { dx: 4, dy: 10 },
    { dx: 11, dy: 1 },
  ].map((o, k) => ({
    left: t.left + o.dx,
    top: t.top + o.dy,
    anim: `ctxG${(k % 4) + 1}`,
    delay: `${(ti * 0.24 + k * 0.1).toFixed(2)}s`,
  })),
)

/**
 * "Built for your context" — design 43a. Four scenarios, one system.
 *
 * The city cards did not work because they were categories; they worked
 * because each was a concrete scenario with a sky that showed the condition.
 * So every card is a scenario now, and each gets its own condition drawn in
 * the same register: thin white marks on a soft sky, motion only on the card
 * in focus. Environment holds all three cities behind a switch inside one
 * card, and the wind, rain or ripples swap with the city.
 *
 * This section absorbed "What we take into account", which listed the same
 * dimensions as five flat items with no argument attached. The payload here
 * is deliberately "what changes" rather than "what we ask" — the 100+ context
 * factors section directly above already answers what we ask.
 */
export function ContextFit() {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLUListElement>(null)
  const [focus, setFocus] = useState(0)
  const [city, setCity] = useState(0)
  const cards = CONTEXT.cards
  const t = (props: string) => (reduce ? 'none' : props)

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
    <section id="context" className="section bg-white">
      <div className="container-main">
        <SectionHeading eyebrow={CONTEXT.eyebrow} title={CONTEXT.title} muted={CONTEXT.muted} lede={CONTEXT.lede} />

        <Reveal index={1} from="none">
          <ul
            ref={railRef}
            aria-label="Four things that change your plan"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start overflow-x-auto px-5 pb-3 pt-1.5 md:-mx-8 md:px-8 xl:justify-center"
            style={{ gap: GAP }}
          >
            {cards.map((c, i) => {
              const on = i === focus
              const play = on && !reduce ? 'running' : 'paused'
              // On the Environment card the copy belongs to the selected city;
              // on the other three it belongs to the card. Both shapes carry
              // title / cond / changes, so one `view` serves the whole row.
              const view = c.kind === 'env' ? c.cities[city] : c
              const weather: string = c.kind === 'env' ? c.cities[city].weather : c.kind
              const { title, cond, changes } = view
              return (
                <li
                  key={c.id}
                  data-card={c.id}
                  onClick={() => go(i)}
                  className="relative flex shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-[26px] p-5"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    background: SKY[weather],
                    color: INK,
                    transform: on ? 'scale(1)' : 'scale(.965)',
                    boxShadow: on ? '0 22px 40px -22px rgba(30,41,58,.55)' : '0 10px 24px -18px rgba(30,41,58,.4)',
                    transition: reduce ? 'none' : `transform 500ms ${EASE}, box-shadow 500ms ${EASE}, background 600ms ease`,
                  }}
                >
                  {/* ── the condition ───────────────────────────────────── */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: on ? 1 : 0.35, transition: t('opacity 500ms ease') }}
                  >
                    {c.kind === 'env' && (
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
                    )}

                    {weather === 'wind' &&
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

                    {weather === 'rain' && (
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

                    {weather === 'drip' && (
                      <>
                        {RIPPLES.map((r, k) => (
                          <span
                            key={k}
                            className="absolute rounded-full"
                            style={{
                              left: r.left, top: r.top, width: r.size, height: r.size,
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

                    {/* Nine products deep — layers settling, then clearing. */}
                    {c.kind === 'skin' &&
                      LAYERS.map((l, k) => (
                        <span
                          key={k}
                          className="absolute h-[14px] rounded-[8px]"
                          style={{
                            top: l.top, left: l.side, right: l.side,
                            background: l.bg,
                            boxShadow: '0 4px 10px -6px rgba(38,49,63,.35)',
                            animation: 'ctxLayer 6s ease-in-out infinite',
                            animationDelay: l.delay,
                            animationPlayState: play,
                          }}
                        />
                      ))}

                    {/* Six hours of sleep — a sun on a 24-hour arc. */}
                    {c.kind === 'life' && (
                      <>
                        <span
                          className="absolute box-border"
                          style={{
                            left: 68, top: 24, width: 156, height: 66,
                            border: '1px dashed rgba(255,255,255,.95)',
                            borderBottom: 0,
                            borderRadius: '78px 78px 0 0',
                          }}
                        />
                        <span className="absolute h-px" style={{ left: 36, right: 36, top: 90, background: 'rgba(255,255,255,.85)' }} />
                        <span
                          className="absolute"
                          style={{
                            left: 68, top: 90, width: 156, height: 0,
                            transformOrigin: '78px 0',
                            animation: 'ctxArc 7s ease-in-out infinite alternate',
                            animationPlayState: play,
                          }}
                        >
                          <span
                            className="absolute h-[14px] w-[14px] rounded-full"
                            style={{
                              left: -7, top: -7, background: '#fff',
                              boxShadow: '0 0 0 5px rgba(255,255,255,.35), 0 0 18px 4px rgba(255,255,255,.8)',
                            }}
                          />
                        </span>
                      </>
                    )}

                    {/* Eight weeks — twelve points pulling into three. */}
                    {c.kind === 'goals' && (
                      <>
                        {TARGETS.map((tg, k) => (
                          <span
                            key={k}
                            className="absolute box-border h-[18px] w-[18px] rounded-full"
                            style={{ left: tg.left, top: tg.top, border: '1px solid rgba(255,255,255,.95)' }}
                          />
                        ))}
                        {GATHER.map((g, k) => (
                          <span
                            key={k}
                            className="absolute h-[5px] w-[5px] rounded-full"
                            style={{
                              left: g.left, top: g.top, background: '#fff',
                              animation: `${g.anim} 5.6s ease-in-out infinite`,
                              animationDelay: g.delay,
                              animationPlayState: play,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </span>

                  {/* ── the card ────────────────────────────────────────── */}
                  <span className="block h-[100px] flex-none" />

                  <div className="relative flex flex-col gap-1">
                    <span className={MONO} style={{ color: NOTE }}>{c.cat}</span>
                    <span className="text-[1.3rem] leading-[1.15] tracking-[-0.02em]" style={{ fontWeight: 400, textWrap: 'pretty' }}>
                      {title}
                    </span>
                    <span className={`${MONO} pt-0.5`} style={{ color: NOTE }}>{cond}</span>
                  </div>

                  <div className="relative mt-3.5 flex flex-col" style={{ borderTop: '1px solid rgba(38,49,63,.14)' }}>
                    <span className={MONO} style={{ color: NOTE, padding: '10px 0 2px' }}>What changes</span>
                    {changes.map((x: string) => (
                      <span
                        key={x}
                        className="text-[13.5px] leading-[1.35]"
                        style={{ padding: '7px 0', borderBottom: '1px solid rgba(38,49,63,.1)' }}
                      >
                        {x}
                      </span>
                    ))}
                  </div>

                  {c.kind === 'env' && (
                    <div className="relative mt-auto flex gap-1.5">
                      {c.cities.map((k, ci) => {
                        const sel = ci === city
                        return (
                          <button
                            key={k.id}
                            type="button"
                            aria-pressed={sel}
                            onClick={(e) => { e.stopPropagation(); setCity(ci); go(i) }}
                            className="flex h-[30px] items-center whitespace-nowrap rounded-full px-3 text-[12px]"
                            style={{
                              fontWeight: 500,
                              background: sel ? INK : 'rgba(255,255,255,.55)',
                              color: sel ? '#FFFFFF' : NOTE,
                              transition: t('background-color 250ms ease, color 250ms ease'),
                            }}
                          >
                            {k.pill}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            })}
            <li aria-hidden="true" className="w-3 shrink-0 xl:hidden" />
          </ul>
        </Reveal>

        <Reveal index={2} from="none" className="flex justify-center gap-1.5 xl:hidden">
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={`Show ${c.cat}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full"
              style={{
                width: i === focus ? 18 : 6,
                background: i === focus ? INK : 'rgba(38,49,63,.22)',
                transition: reduce ? 'none' : 'all 350ms ease',
              } as CSSProperties}
            />
          ))}
        </Reveal>

      </div>
    </section>
  )
}

/**
 * "We sell one thing. The Face Map."
 *
 * Written to land in the last moment before the price, so it stays there even
 * though the cards it used to close moved up beside the 100+ context factors.
 * It is the anti-upsell promise: the reason a buyer can trust that a named
 * product is a recommendation and not a sale.
 */
export function SellOneThing() {
  return (
    <section className="section-sm bg-white">
      <div className="container-main">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3.5 text-center">
          <Reveal index={0} as="h2" className="text-[1.6rem] leading-[1.15] tracking-[-0.03em] text-ink md:text-[1.75rem]" style={{ fontWeight: 300 }}>
            {CONTEXT.antiUpsell.title} <span className="text-ink/40">{CONTEXT.antiUpsell.accent}</span>
          </Reveal>
          <Reveal index={1} className="max-w-[340px] text-[14px] leading-relaxed text-ink-muted md:max-w-[460px]">
            <p>{CONTEXT.antiUpsell.body}</p>
          </Reveal>
          <Reveal index={2} className="max-w-[340px] text-[14px] leading-relaxed text-ink/75 md:max-w-[460px]">
            <p>{CONTEXT.antiUpsell.closing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
