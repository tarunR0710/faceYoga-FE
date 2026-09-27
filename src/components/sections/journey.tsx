'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { JOURNEY } from '@/lib/content'
import { EASE_OUT } from '@/lib/motion'
import { glow } from '@/lib/glow'

const GLOW_TEAL = glow('173 199 206', 0.2) // half of what it was; the wash under it came down too

const TEAL = '#3D6B76'
const GREY = '#5C7278'
const HAIRLINE = 'rgba(30,53,59,.14)'

// "Where we stop" note (design 45c): Tailwind slate 400 / 500 / 600.
const SLATE_400 = '#94A3B8'
const SLATE_500 = '#64748B'
const SLATE_600 = '#475569'
// One corner mark drawn once, mirrored into the other three corners.
const CORNERS = ['none', 'scaleX(-1)', 'scaleY(-1)', 'scale(-1,-1)'] as const
const CORNER_POS = [
  { left: 0, top: 0 },
  { right: 0, top: 0 },
  { left: 0, bottom: 0 },
  { right: 0, bottom: 0 },
] as const

// The site's reveal curve, as CSS. One easing language for framer and CSS.
const EASE = `cubic-bezier(${EASE_OUT.join(',')})`

// One step is two beats. MOVE: the marker glides down to the step and its
// text grows into focus. FILL: the hairline under it fills, and when it is
// full the marker travels through it to the next step. The last step holds
// longer so the Face Map ending lands, then the whole line fades and the
// marker reappears on step one — it never slides back up (that reads as a
// rewind).
//
// Pace: one full pass was ~15s, which is longer than anyone watches a section
// they are scrolling past. The fill is the beat that carries the waiting, so
// it takes the biggest cut; MOVE stays long enough for the marker's travel to
// still read as travel rather than a jump.
const MOVE_MS = 460
const FILL_MS = 1350
const LAST_HOLD_MS = 2100
const OUT_MS = 280

// Row geometry the marker is positioned against. The static dot sits 5px
// below the row top and is 10px tall, so its centre is 10px down — level with
// the middle of the 17px title's first line. The dot column is the grid's
// second track: 64px timing + 12px gap + half of 20px = 86px from the left.
const DOT_CENTRE_Y = 10
const DOT_CENTRE_X = 86
const MARKER = 14

// Inactive text is drawn at the active size and scaled DOWN, so the step in
// focus rests at scale 1 — WebKit rasterises it at native size and it stays
// crisp. Scaling the active row up instead would blur it on iPhone.
const REST_SCALE = 0.94

type Phase = 'move' | 'fill' | 'out' | 'reset'

/**
 * From booking to your Face Map — the blueprint's six-step process as one
 * timeline. One vertical hairline, six dots, everything visible: the timing
 * column is the main information, and teal is spent once — on the marker.
 * "Where we stop" is a labelled paragraph on a hairline, not an accented box.
 *
 * The section walks the visitor through the steps: a single marker, larger
 * than the dots, glides from one dot to the next while the step beside it
 * grows into focus and the others recede. It runs while the list is in view,
 * pauses while a step has keyboard focus, and stops once the visitor taps a step
 * (they are reading now); it resumes after the list scrolls away and back.
 * Under `prefers-reduced-motion` nothing moves on its own and taps jump.
 *
 * iPhone rules: no `filter`, no height or layout animation, no animated
 * box-shadow. Everything that moves is a transform or opacity — the marker's
 * translateY, the text's scale, the fill's scaleY on a 1px strip. The marker
 * lives outside the <Reveal> rows and is placed from `offsetTop`, a layout
 * value the reveals' own transforms cannot skew.
 */
export function Journey() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const inView = useInView(listRef, { amount: 0.4 })
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<Phase>('move')
  // Set by a tap; cleared when the list leaves the viewport.
  const [stopped, setStopped] = useState(false)
  const [paused, setPaused] = useState(false)
  // The marker waits for the rows' own reveal before it appears.
  const [shown, setShown] = useState(false)
  const [ys, setYs] = useState<number[]>([])
  const steps = JOURNEY.nodes
  const n = steps.length

  // Where each dot's centre sits, re-measured whenever the list resizes
  // (web font swap, rotation, text re-wrapping).
  useEffect(() => {
    const box = listRef.current
    if (!box) return
    const measure = () => {
      const rows = box.querySelectorAll<HTMLElement>(':scope > ul > li')
      setYs(Array.from(rows, (li) => li.offsetTop + DOT_CENTRE_Y))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || shown) return
    const t = setTimeout(() => setShown(true), reduce ? 0 : 700)
    return () => clearTimeout(t)
  }, [inView, shown, reduce])

  useEffect(() => {
    if (!inView) setStopped(false)
  }, [inView])

  // The clock: one timeout per beat, so every beat can have its own length.
  useEffect(() => {
    if (reduce || !inView || !shown || stopped || paused) return
    let ms: number
    let next: () => void
    if (phase === 'move') {
      ms = MOVE_MS
      next = () => setPhase('fill')
    } else if (phase === 'fill') {
      const last = active === n - 1
      ms = last ? LAST_HOLD_MS : FILL_MS
      next = last
        ? () => setPhase('out')
        : () => {
            setActive(active + 1)
            setPhase('move')
          }
    } else if (phase === 'out') {
      ms = OUT_MS
      next = () => {
        setActive(0)
        setPhase('reset')
      }
    } else {
      // 'reset' holds the marker invisible for a beat so its jump back to the
      // top commits before it fades in again.
      ms = 60
      next = () => setPhase('move')
    }
    const t = setTimeout(next, ms)
    return () => clearTimeout(t)
  }, [reduce, inView, shown, stopped, paused, phase, active, n])

  const go = (i: number) => {
    setActive(i)
    setPhase('move')
    setStopped(true)
  }

  const hidden = phase === 'out' || phase === 'reset'
  const snap = reduce || phase === 'reset'

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        // Was 0.22 → 0.08 → white with the glow at half strength, which read
        // as a tinted panel rather than a page. Both come down; the wash is
        // now a hint at the top corner and nothing at all by the list.
        background:
          'linear-gradient(170deg, rgba(173,199,206,0.11) 0%, rgba(173,199,206,0.035) 38%, #ffffff 100%)',
      }}
    >
      {/* One soft teal glow, painted as a plain radial gradient rather than a
          blurred disc — see glow.ts for why a `filter` here costs frames on
          iPhone. The box is 800px so the falloff reaches the same radius. The
          sand glow that used to sit bottom-left is gone: this section is teal
          only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[304px] -top-[320px] h-[800px] w-[800px]"
        style={{ background: GLOW_TEAL }}
      />

      <div className="container-main relative">
        <div className="mx-auto flex max-w-[640px] flex-col gap-7">
          <div className="flex flex-col items-center gap-4 text-center">
            <Reveal index={0}>
              <SectionTag>{JOURNEY.eyebrow}</SectionTag>
            </Reveal>
            <Reveal
              index={1}
              as="h2"
              className="text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
              style={{ fontWeight: 300 }}
            >
              {JOURNEY.title} <span className="muted-tail">{JOURNEY.muted}</span>
            </Reveal>
            <Reveal index={2} className="text-[15px] leading-relaxed text-ink-muted">
              <p>{JOURNEY.denial}</p>
            </Reveal>
          </div>

          {/* ── Timeline ─────────────────────────────────────────────────── */}
          <div
            ref={listRef}
            className="relative"
            // Keyboard focus pauses the walk-through; a mouse or finger tap
            // is handled by go() instead. (No hover pause: on desktop the
            // pointer usually rests over this centred column while scrolling,
            // and it would never play.)
            onFocus={(e) => {
              // try: `:focus-visible` throws on iOS Safari < 15.4.
              try {
                if (e.target.matches(':focus-visible')) setPaused(true)
              } catch {}
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
            }}
          >
            <ul aria-label="The six steps" className="flex flex-col">
              {steps.map((s, i) => {
                const on = i === active
                const done = i < active
                const last = i === n - 1
                // The line under a step is full once the step is behind the
                // marker, and fills while the marker rests on it. It fades
                // out with the marker at the end, then empties unseen.
                const full = done || (on && phase === 'fill')
                const fillTransition = snap
                  ? 'none'
                  : on && phase === 'fill'
                    ? `transform ${FILL_MS}ms linear`
                    : `transform 350ms ${EASE}, opacity ${OUT_MS}ms ${EASE}`
                const colour = reduce ? 'none' : `400ms ${EASE}`
                const ease = reduce ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }

                return (
                  <Reveal key={s.id} index={3 + i} as="li" className="min-w-0">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={on ? 'step' : undefined}
                      className="grid w-full grid-cols-[64px_20px_1fr] items-start text-left"
                      style={{ gap: '0 12px' }}
                    >
                      {/* when */}
                      <span
                        className="font-mono text-[11px] leading-[1.3] text-right tabular-nums"
                        style={{ paddingTop: 3, color: GREY }}
                      >
                        {s.timing}
                      </span>

                      {/* dot + line. The active dot is not drawn here — the
                          marker covers it, so it keeps its upcoming look
                          until the marker leaves it behind. */}
                      <span className="flex flex-col items-center self-stretch">
                        <span
                          aria-hidden="true"
                          className="h-[10px] w-[10px] shrink-0 rounded-full box-border"
                          style={{
                            marginTop: DOT_CENTRE_Y - 5,
                            background: done ? 'rgba(30,53,59,.3)' : '#ffffff',
                            border: `1.5px solid ${done ? 'transparent' : 'rgba(30,53,59,.3)'}`,
                            transition:
                              colour === 'none' ? 'none' : `background ${colour}, border-color ${colour}`,
                          }}
                        />
                        <span
                          aria-hidden="true"
                          className="relative w-px flex-1 overflow-hidden"
                          style={{ marginTop: 10, background: HAIRLINE, opacity: last ? 0 : 1 }}
                        >
                          <span
                            className="absolute inset-0"
                            style={{
                              background: TEAL,
                              transformOrigin: 'top',
                              transform: `scaleY(${full ? 1 : 0})`,
                              opacity: phase === 'out' ? 0 : 1,
                              transition: fillTransition,
                            }}
                          />
                        </span>
                      </span>

                      {/* name · meta. Only the TITLE scales. Scaling the whole
                          block pivoted the description off the title's baseline,
                          so every hand-off nudged that line a pixel or two —
                          small, but the eye catches it on a line it is reading.
                          The title grows about its own middle, where a 6% change
                          moves the text by under a pixel, and the description
                          never moves at all. */}
                      <span className="flex min-w-0 flex-col" style={{ gap: 5, paddingBottom: 40 }}>
                        <motion.span
                          // Regular weight, and slate rather than the teal-ink:
                          // six medium-weight titles in a column read as a bold
                          // list, and the marker already carries the emphasis.
                          className="origin-left text-[17px] leading-[1.2] tracking-[-0.01em] text-slate-600"
                          style={{ fontWeight: 400 }}
                          initial={false}
                          animate={{ scale: on || reduce ? 1 : REST_SCALE }}
                          transition={ease}
                        >
                          {s.title}
                        </motion.span>
                        <span className="text-[13px] leading-[1.4] text-slate-500" style={{ textWrap: 'pretty' }}>
                          {s.meta}
                        </span>
                      </span>
                    </button>
                  </Reveal>
                )
              })}
            </ul>

            {/* The marker: one dot, larger than the rest, that travels. A
                critically damped spring (no overshoot) that keeps its velocity
                if a tap re-targets it mid-glide. */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={{
                top: 0,
                left: DOT_CENTRE_X - MARKER / 2,
                width: MARKER,
                height: MARKER,
                marginTop: -MARKER / 2,
                background: TEAL,
                boxShadow: '0 0 0 5px rgba(61,107,118,.14)',
              }}
              initial={false}
              animate={{
                y: ys[active] ?? DOT_CENTRE_Y,
                opacity: shown && ys.length > 0 && !hidden ? 1 : 0,
                scale: shown && !hidden ? 1 : 0.6,
              }}
              transition={
                snap
                  ? { duration: 0 }
                  : {
                      y: { type: 'spring', stiffness: 200, damping: 30 },
                      opacity: { duration: 0.25, ease: EASE_OUT },
                      scale: { duration: 0.35, ease: EASE_OUT },
                    }
              }
            />
          </div>

          {/* ── Where we stop ────────────────────────────────────────────── */}
          {/* Design 45c, "registration marks": no fill, no card. Four corner
              crop marks and a small crosshair, the marks a printer or a
              face-mapping grid uses, so the note reads as a note rather than
              a leftover paragraph. Slate 500 for the marks, slate 400 for the
              label, slate 500 for the text. */}
          <Reveal index={9} className="relative" style={{ padding: '22px 24px' }}>
            {CORNERS.map((transform, i) => (
              <svg
                key={i}
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className="absolute"
                style={{ ...CORNER_POS[i], transform }}
              >
                <path d="M1 12 V1 H12" fill="none" stroke={SLATE_400} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            ))}
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="absolute motion-safe:animate-[notePulse_2.4s_ease-in-out_infinite]"
              style={{ right: 26, top: 22 }}
            >
              <circle cx="10" cy="10" r="9" fill="none" stroke="rgba(100,116,139,.3)" />
              <path d="M10 4 V16 M4 10 H16" stroke={SLATE_500} strokeOpacity=".7" strokeWidth="1" />
              <circle cx="10" cy="10" r="2.2" fill={SLATE_600} />
            </svg>
            <div className="flex flex-col gap-2" style={{ paddingRight: 28 }}>
              <p
                className="text-[10px] uppercase tracking-[0.18em]"
                style={{ color: SLATE_600, fontWeight: 500 }}
              >
                Where we stop
              </p>
              <p className="text-[13.5px] leading-[1.6]" style={{ color: SLATE_500, textWrap: 'pretty' }}>
                {JOURNEY.boundary}
              </p>
              {/* What it is not. Smaller than the sentence above it and a step
                  DARKER, not lighter — this is the part someone scanning for a
                  reason not to buy is looking for, and greying it out is how
                  the old version in the close read as clutter. */}
              <ul className="mt-1 flex flex-col gap-1.5">
                {JOURNEY.outOfScope.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[12.5px] leading-[1.5]"
                    style={{ color: SLATE_600 }}
                  >
                    <span aria-hidden="true" style={{ color: SLATE_500 }}>
                      &ndash;
                    </span>
                    <span style={{ textWrap: 'pretty' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
