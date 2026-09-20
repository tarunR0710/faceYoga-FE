'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { JOURNEY } from '@/lib/content'
import { EASE_OUT } from '@/lib/motion'
import { glow } from '@/lib/glow'

const GLOW_TEAL = glow('173 199 206', 0.5) // was #ADC7CE at opacity-50

const TEAL = '#3D6B76'
const INK = '#1E353B'
const GREY = '#5C7278'
const LABEL = '#7E959B'
const HAIRLINE = 'rgba(30,53,59,.14)'

// The site's reveal curve, as CSS. One easing language for framer and CSS.
const EASE = `cubic-bezier(${EASE_OUT.join(',')})`

// Design 31a's clock: the active step holds for 2.2s while the hairline
// under its dot fills over 2.1s, then the next step lights up.
const HOLD_MS = 2200
const FILL_MS = 2100

/**
 * From booking to your Face Map — the blueprint's six-step process as one
 * timeline (design option 31a). One vertical hairline, six dots, everything
 * visible, nothing hidden behind a chevron: the timing column is the main
 * information, who does each step is plain text, and teal is spent once — on
 * the step that is live. "Where we stop" is a labelled paragraph on a
 * hairline, not an accented box.
 *
 * The steps advance on their own while the section is in view and stop when
 * it scrolls away. Tapping a row jumps to it and restarts the clock. Under
 * `prefers-reduced-motion` nothing moves: the first step is simply lit.
 *
 * iPhone rules carried over from the accordion this replaces: no `filter`,
 * no height animation, and the only moving part — the line fill — is a
 * `scaleY` transform on a 1px strip, never a `height` tween.
 */
export function Journey() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [active, setActive] = useState(0)
  // Bumped on tap so the interval restarts from the chosen step.
  const [epoch, setEpoch] = useState(0)
  const steps = JOURNEY.nodes
  const n = steps.length

  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), HOLD_MS)
    return () => clearInterval(id)
  }, [reduce, inView, epoch, n])

  const go = (i: number) => {
    setActive(i)
    setEpoch((e) => e + 1)
  }

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          'linear-gradient(160deg, rgba(173,199,206,0.22) 0%, rgba(173,199,206,0.08) 45%, #ffffff 100%)',
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
              className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]"
              style={{ fontWeight: 300 }}
            >
              {JOURNEY.title} <span className="text-ink/40">{JOURNEY.muted}</span>
            </Reveal>
            <Reveal index={2} className="text-[15px] leading-relaxed text-ink-muted">
              <p>{JOURNEY.denial}</p>
            </Reveal>
          </div>

          {/* ── Timeline ─────────────────────────────────────────────────── */}
          <ul aria-label="The six steps" className="flex flex-col">
            {steps.map((s, i) => {
              const on = i === active
              const done = i < active
              const last = i === n - 1
              // The fill snaps rather than animates when the clock wraps back
              // to the first step, so the line does not visibly "rewind".
              const fillTransition = reduce || active === 0 ? 'none' : `transform ${FILL_MS}ms linear`
              const colour = reduce ? 'none' : `400ms ${EASE}`

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

                    {/* dot + line */}
                    <span className="flex flex-col items-center self-stretch">
                      <span
                        aria-hidden="true"
                        className="h-[10px] w-[10px] shrink-0 rounded-full box-border"
                        style={{
                          marginTop: 4,
                          background: on ? TEAL : done ? 'rgba(30,53,59,.3)' : '#ffffff',
                          border: `1.5px solid ${on ? TEAL : done ? 'transparent' : 'rgba(30,53,59,.3)'}`,
                          boxShadow: on ? '0 0 0 5px rgba(61,107,118,.14)' : '0 0 0 0 rgba(61,107,118,0)',
                          transition:
                            colour === 'none'
                              ? 'none'
                              : `background ${colour}, border-color ${colour}, box-shadow ${colour}`,
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="relative w-px flex-1 overflow-hidden"
                        style={{ marginTop: 8, background: HAIRLINE, opacity: last ? 0 : 1 }}
                      >
                        <span
                          className="absolute inset-0"
                          style={{
                            background: TEAL,
                            transformOrigin: 'top',
                            transform: `scaleY(${done || on ? 1 : 0})`,
                            transition: fillTransition,
                          }}
                        />
                      </span>
                    </span>

                    {/* name · who · meta */}
                    <span
                      className="flex min-w-0 flex-col"
                      style={{ gap: 5, paddingBottom: 40 }}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span
                          className="text-[16px] leading-[1.2] tracking-[-0.01em]"
                          // Regular weight in a softened ink: six medium-weight
                          // titles in a column read as a bold list, and the dot
                          // already carries the emphasis.
                          style={{ fontWeight: 400, color: 'rgba(30,53,59,.8)' }}
                        >
                          {s.title}
                        </span>
                      </span>
                      <span
                        className="text-[13px] leading-[1.4]"
                        style={{ color: GREY, textWrap: 'pretty' }}
                      >
                        {s.meta}
                      </span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </ul>

          {/* ── Where we stop ────────────────────────────────────────────── */}
          <Reveal
            index={9}
            className="flex flex-col gap-2"
            style={{ paddingTop: 18, borderTop: '1px solid rgba(30,53,59,.1)' }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: LABEL }}>
              Where we stop
            </p>
            <p className="text-[13.5px] leading-[1.5]" style={{ color: GREY, textWrap: 'pretty' }}>
              {JOURNEY.boundary}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
