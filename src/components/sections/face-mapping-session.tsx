'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Lock, Mic, Video as VideoIcon } from 'lucide-react'
import { EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { MEDIA, PLACEHOLDER } from '@/lib/showcase'

// What the expert actually covers in the call.
const covers = ['Face & skin', 'Routine history', 'Environment', 'Lifestyle', 'Goals', 'Practical fit']

// The three questions the blueprint shows floating over the call frame. They
// arrive one at a time so the panel reads as a conversation in progress.
const topics = [
  { tag: 'Goals', q: 'What do you want to improve?', pos: 'right-3 top-[9%] md:right-4' },
  { tag: 'Routine', q: 'What have you used?', pos: 'left-3 top-[46%] md:left-4' },
  { tag: 'Context', q: 'Where and how do you live?', pos: 'right-3 bottom-[8%] md:right-4' },
]

function fmt(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function FaceMappingSession() {
  const reduce = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { once: false, margin: '-15%' })
  const [seconds, setSeconds] = useState(38 * 60 + 24)

  // A session clock that actually moves while the panel is on screen — the
  // small authentic detail that sells "this is a real consultation". Paused off
  // screen and frozen entirely under reduced motion.
  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [reduce, inView])

  return (
    <section id="face-mapping-session" className="section">
      <div className="container-main">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div>
            <SectionHeading
              eyebrow="Face Mapping Session"
              title="Your analysis begins with"
              muted="a real conversation."
              lede="A few photographs cannot explain your complete situation. During your Face Mapping Session, an expert speaks with you, observes your face and skin, and understands the personal factors behind your concerns."
              tight
            />

            {/* Editorial accent — Newsreader Italic, reserved for short emotional lines */}
            <motion.blockquote
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: 0.1 }}
              className="border-l-2 border-accent/40 pl-5"
            >
              <p className="accent-italic text-[18px] leading-snug text-ink md:text-[22px]">
                &ldquo;We do not analyse only your photographs. We understand the person behind
                them.&rdquo;
              </p>
            </motion.blockquote>

            <div className="mt-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-analysis-teal">
                What the session covers
              </p>
              <div className="flex flex-wrap gap-2.5">
                {covers.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.86 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: stagger(i, 0.07) }}
                    whileHover={reduce ? undefined : { scale: 0.95 }}
                    className="glass-bubble rounded-full px-3.5 py-1.5 text-[12px] will-change-transform md:text-[12.5px]"
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* ── The call frame ───────────────────────────────────────────── */}
          <motion.div
            ref={frameRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.08 }}
            className="card-elevated overflow-hidden rounded-[24px]"
          >
            {/* call chrome */}
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <span className="relative flex h-2 w-2 shrink-0">
                {!reduce && (
                  <span
                    aria-hidden
                    className="animate-pulse-ring absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgb(var(--c-accent) / 0.55)' }}
                  />
                )}
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="text-[12px] font-medium tracking-[-0.01em] text-ink md:text-[13px]">
                Face Mapping Session
              </p>
              <span className="ml-auto font-mono text-[11.5px] tabular-nums text-analysis-teal md:text-[12.5px]">
                {reduce ? '38:24' : fmt(seconds)}
              </span>
              <Lock className="h-3 w-3 text-analysis-teal/70" strokeWidth={1.8} />
            </div>

            {/* tiles + floating topics */}
            <div className="relative aspect-[4/3] bg-mist p-3 md:p-4">
              <div className="grid h-full grid-cols-2 gap-3">
                {[
                  { src: MEDIA.sessionCustomer, label: 'Customer' },
                  { src: MEDIA.sessionExpert, label: 'MapMyFace Expert' },
                ].map((tile) => (
                  <div
                    key={tile.label}
                    className="relative overflow-hidden rounded-[16px] bg-white ring-1 ring-border/60"
                  >
                    <Image
                      src={tile.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 45vw, 260px"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent"
                    />
                    <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5">
                      <Mic className="h-3 w-3 shrink-0 text-white/80" strokeWidth={2} />
                      <span className="truncate text-[10px] font-medium text-white md:text-[11px]">
                        {tile.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {topics.map((t, i) => (
                <motion.div
                  key={t.tag}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: 0.5 + i * 0.45 }}
                  className={`absolute ${t.pos} w-[58%] rounded-[14px] border border-white/70 bg-white/90 px-3 py-2 backdrop-blur-md md:w-[48%] md:px-3.5 md:py-2.5`}
                  style={{ boxShadow: 'var(--shadow-md)' }}
                >
                  <p className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-accent/70 md:text-[9.5px]">
                    {t.tag}
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink md:text-[13px]">{t.q}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border/60 px-4 py-3">
              <VideoIcon className="h-3.5 w-3.5 shrink-0 text-analysis-teal/70" strokeWidth={1.6} />
              <p className="text-[11.5px] text-analysis-teal md:text-[12.5px]">
                Private video consultation
              </p>
              {PLACEHOLDER && (
                <span className="ml-auto inline-flex h-5 shrink-0 items-center rounded-full bg-accent-soft px-2 text-[8.5px] font-medium text-accent-foreground">
                  Placeholder visual
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
