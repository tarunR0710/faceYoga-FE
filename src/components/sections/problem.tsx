'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw, Merge } from 'lucide-react'
import { EASE_OUT, EASE_OUT_SOFT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// The four competing voices from the blueprint. `pull` is the direction each
// card drifts as it is absorbed into the Face Map, so the collapse reads as
// "everything gathered into one place" rather than four separate fades.
const noise = [
  {
    tag: 'Skincare',
    line: 'Try this 10-step routine',
    pos: 'md:absolute md:top-[2%] md:left-[1%] md:w-[47%]',
    rot: -4,
    pull: { x: 46, y: 54 },
  },
  {
    tag: 'Hair',
    line: 'This trending cut suits everyone',
    pos: 'md:absolute md:top-[19%] md:right-[1%] md:w-[45%]',
    rot: 3.5,
    pull: { x: -50, y: 40 },
  },
  {
    tag: 'Social media',
    line: 'Copy my glow-up plan',
    pos: 'md:absolute md:bottom-[8%] md:left-[5%] md:w-[44%]',
    rot: 2.5,
    pull: { x: 44, y: -46 },
  },
  {
    tag: 'Grooming',
    line: 'Change everything at once',
    pos: 'md:absolute md:bottom-[0%] md:right-[7%] md:w-[43%]',
    rot: -3,
    pull: { x: -40, y: -52 },
  },
]

const ladder = [
  { step: 'First', body: 'Build the right foundation' },
  { step: 'Next', body: 'Introduce targeted changes' },
  { step: 'Later', body: 'Review optional improvements' },
]

// The four voices land one at a time (0.24s apart, 0.7s each), so the last one
// settles at ~1.5s. HOLD_MS is measured from the same start, which leaves a
// ~2.7s window where all four sit still and can actually be read — four short
// quotes need roughly that. Shorter and the beat reads as a flicker.
const ARRIVE_STAGGER = 0.24
const HOLD_MS = 4200

export function Problem() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  // `amount` rather than a margin: wait until the stage is genuinely on screen,
  // otherwise the sequence can start (and finish) above the fold on a phone.
  const inView = useInView(stageRef, { once: true, amount: 0.5 })
  // Reduced motion starts on the resolved state — the message is the payload,
  // the collapse is only the delivery.
  const [resolved, setResolved] = useState(!!reduce)
  const timer = useRef<number | null>(null)

  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = null
  }
  const scheduleResolve = useCallback(() => {
    clear()
    timer.current = window.setTimeout(() => setResolved(true), HOLD_MS)
  }, [])

  // Resolve on its own so the point always arrives even for someone who never
  // taps — but slowly enough to read first. One-shot, never a loop.
  useEffect(() => {
    // If reduced-motion resolves true only after mount, jump straight to the end
    // state rather than leaving the panel hidden behind an animation we skip.
    if (reduce) {
      setResolved(true)
      return
    }
    if (!inView) return
    scheduleResolve()
    return clear
  }, [inView, reduce, scheduleResolve])

  return (
    <section id="why" className="section">
      <div className="container-main">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Too much advice."
              muted="No clear answer."
              lede="Skincare influencers recommend one routine. A hairstylist suggests something different. Friends, salons and social media add even more opinions. But most advice is not created around your complete face, skin, lifestyle or goals."
              tight
            />

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: 0.1 }}
              className="rounded-[20px] border-l-2 border-accent/40 bg-mist px-5 py-4"
            >
              <p className="text-[15px] leading-relaxed text-ink md:text-[16px]">
                MapMyFace brings everything together into one coordinated plan made specifically for
                you.
              </p>
            </motion.div>
          </div>

          {/* ── Stage: noise → one clear direction ───────────────────────── */}
          <div>
            <div ref={stageRef} className="relative md:h-[430px]">
              {/* Noise layer — absolutely positioned so that when the cards clear
                  they leave no hole behind. On mobile the answer panel below is
                  what gives the stage its height. */}
              <div
                aria-hidden={resolved}
                className="pointer-events-none absolute inset-0 grid grid-cols-2 content-center gap-3 md:block"
              >
              {noise.map((n, i) => (
                <motion.div
                  key={n.tag}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, rotate: n.rot * 2, scale: 0.94 }}
                  animate={
                    resolved
                      ? { opacity: 0, scale: 0.82, rotate: 0, x: n.pull.x, y: n.pull.y }
                      : inView
                        ? { opacity: 1, y: 0, x: 0, rotate: reduce ? 0 : n.rot, scale: 1 }
                        : undefined
                  }
                  transition={
                    resolved
                      ? { duration: 0.7, ease: EASE_OUT_SOFT, delay: i * 0.07 }
                      : { duration: 0.7, ease: EASE_OUT_SOFT, delay: ARRIVE_STAGGER * i }
                  }
                  className={`${n.pos} rounded-[16px] border border-border/50 bg-white px-3.5 py-3 md:px-4 md:py-3.5`}
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35 md:text-[10px]">
                    {n.tag}
                  </p>
                  <p className="text-[12.5px] leading-snug text-analysis-teal md:text-[14px]">
                    &ldquo;{n.line}&rdquo;
                  </p>
                </motion.div>
              ))}
              </div>

              {/* The resolution — one panel, one order.
                  Centring lives on this plain wrapper, not on the animated child:
                  framer-motion writes `transform` on anything it animates and would
                  silently overwrite a `-translate-y-1/2` utility class. */}
              <div className="md:absolute md:inset-x-[6%] md:top-1/2 md:-translate-y-1/2">
              <motion.div
                initial={false}
                animate={
                  resolved
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 12 }
                }
                transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: resolved && !reduce ? 0.3 : 0 }}
                className={`rounded-[22px] p-5 md:p-6 ${resolved ? '' : 'pointer-events-none'}`}
                // Was the accent at 22% over white, which on a saturated
                // palette turned the whole corner into a blue haze. Now it is
                // the house two-pole drift: warm light entering top-left,
                // cooling as it falls to the bottom-right, at a third of the
                // strength. Reads as light on paper rather than tinted paper.
                style={{
                  background:
                    'radial-gradient(88% 62% at 10% 2%, rgb(var(--g-warm, var(--c-accent)) / 0.34) 0%, transparent 60%), radial-gradient(76% 64% at 104% 104%, rgb(var(--g-cool, var(--c-accent)) / 0.14) 0%, transparent 62%), rgb(var(--c-surface))',
                  border: '1px solid rgb(var(--c-ink) / 0.10)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-accent/70 md:text-[10px]">
                  Your Face Map
                </p>
                <p
                  className="mt-1.5 text-[19px] leading-tight tracking-[-0.02em] text-ink md:text-[22px]"
                  style={{ fontWeight: 450 }}
                >
                  One clear direction
                </p>

                <ul className="mt-5 space-y-0">
                  {ladder.map((l, i) => (
                    <motion.li
                      key={l.step}
                      initial={false}
                      animate={resolved ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : -12 }}
                      transition={{
                        duration: 0.55,
                        ease: EASE_OUT,
                        delay: resolved && !reduce ? 0.5 + i * 0.13 : 0,
                      }}
                      className="flex items-center gap-3 border-t border-border/50 py-3 first:border-t-0 first:pt-0"
                    >
                      <span className="pill-accent inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[9px] font-semibold uppercase tracking-[0.12em]">
                        {l.step}
                      </span>
                      <span className="text-[13px] leading-snug text-ink md:text-[14px]">{l.body}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              </div>
            </div>

            {/* One control, two jobs: skip the wait while the noise is up,
                re-watch it once it has resolved. Nobody has to sit through the
                hold, and nobody who scrolled past it misses the point. */}
            <div className="mt-4 flex md:justify-end">
              <button
                type="button"
                onClick={() => {
                  clear()
                  if (resolved) {
                    setResolved(false)
                    scheduleResolve()
                  } else {
                    setResolved(true)
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-[11.5px] font-medium text-analysis-teal transition-colors hover:bg-mist hover:text-ink"
              >
                {resolved ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Replay
                  </>
                ) : (
                  <>
                    <Merge className="h-3.5 w-3.5 rotate-180" strokeWidth={1.8} />
                    Bring it together
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
