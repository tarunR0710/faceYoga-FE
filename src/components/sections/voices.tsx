'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsDesktop } from '@/lib/motion'
import { VOICES } from '@/lib/content'

const DUR = 4000
const EASE = 'cubic-bezier(.22,.61,.36,1)'
/** Circumference of the r=21 ring, to the pixel the handoff specifies. */
const RING = 132
/** The frosted material the controls share. */
const GLASS = {
  borderColor: 'rgba(255,255,255,.24)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
} as const

/** The Map chip's fill — the one solid light surface left on the frame. */
const SILVER = 'linear-gradient(150deg,#E4E9ED 0%,#F7F9FA 100%)'

/**
 * Community video — the "Expert Video Story" handoff, high fidelity.
 *
 * Looping muted footage behind one review at a time. The reviews are stacked
 * in a single grid cell so the frame never jumps as they swap, the reviewer
 * initials double as tabs, and the ring around the active chip unwinds over
 * exactly one slide.
 *
 * Two departures from the handoff, both deliberate:
 * — the video mounts only once the section is near the viewport, so a 1.8 MB
 *   fetch never competes with the page above it;
 * — auto-advance also pauses on keyboard focus, not only hover, or a
 *   keyboard user loses the chip they are tabbing through.
 *
 * Under `prefers-reduced-motion` the rotation stops altogether and the
 * transition is a plain crossfade — no blur, no travel, no ring animation.
 */
export function Voices() {
  const reduce = useReducedMotion()
  // `<source media="...">` is ignored inside <video> — only <picture> honours
  // it — so the cut is chosen in JS. Safe here because the element only
  // mounts after the observer fires, by which point this has settled.
  const wide = useIsDesktop()
  const clip = wide ? VOICES.video.wide : VOICES.video.tall
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [armed, setArmed] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  // Hold the fetch until the frame is within a screen of the viewport.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => setI((k) => (k + 1) % VOICES.reviews.length), DUR)
    return () => clearTimeout(t)
  }, [i, paused, reduce])

  const go = useCallback((k: number) => setI(k), [])

  return (
    // Full-bleed, not a card: no gutter, no radius, no border. The frame is
    // the page edge to edge, and the gap above is a margin rather than the
    // handoff's clamp() inset, which read as a floating tile.
    <section id="voices" className="mt-16 md:mt-24 lg:mt-28">
      <div
        ref={frameRef}
        // Extra top padding on top of the handoff's clamp(28,5vw,64): the
        // site header is fixed, and a frame this tall always ends up with its
        // own top edge at the viewport top, putting the eyebrow pill under
        // the navbar. Below md the header is the taller of the two.
        className="relative flex min-h-[min(100svh,860px)] flex-col justify-between overflow-hidden p-7 pt-20 md:p-10 md:pt-20 lg:p-16 lg:pt-20"
        style={{ background: '#3A3F45' }}
      >
        {armed ? (
          <video
            // Keyed on the cut so a resize across the breakpoint swaps the
            // element rather than leaving the first source playing.
            key={wide ? 'wide' : 'tall'}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={clip.poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={clip.webm} type="video/webm" />
            <source src={clip.mp4} type="video/mp4" />
          </video>
        ) : null}

        {/* Two scrims: one down the frame so the quote block has a ground, one
            in from the left so the type never sits on the expert's face. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,rgba(34,37,41,.48) 0%,rgba(34,37,41,.30) 32%,rgba(34,37,41,.45) 55%,rgba(34,37,41,.82) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(90deg,rgba(34,37,41,.45) 0%,rgba(34,37,41,0) 60%)' }}
        />

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="relative flex max-w-[560px] flex-col gap-3.5">
          <span
            className="self-start rounded-full border font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{
              color: 'rgba(255,255,255,.9)',
              background: 'rgba(255,255,255,.12)',
              borderColor: 'rgba(255,255,255,.24)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '5px 11px',
            }}
          >
            {VOICES.eyebrow}
          </span>
          <h2
            className="text-[clamp(27px,4.4vw,40px)] leading-[1.08] tracking-[-0.03em] text-white"
            style={{ fontWeight: 300, textWrap: 'balance' }}
          >
            {VOICES.title} <span style={{ color: 'rgba(255,255,255,.78)' }}>{VOICES.muted}</span>
          </h2>
        </div>

        {/* ── Quote block ────────────────────────────────────────────────── */}
        <div
          className="relative flex max-w-[640px] flex-col gap-4 pt-16 md:gap-7 md:pt-[120px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Glass panel. Deliberately thin — a .035 fill and a 5px blur, so
              the footage still reads through it and the type only gets an
              edge and a faint wash. Measured against the real frames at the
              brightest patch under the panel: quote 4.59:1 desktop / 4.92:1
              mobile, detail 4.69 / 4.99. The blur is also the expensive part
              over playing video, which is the other reason it is 5 and not
              12. */}
          <div
            className="relative flex w-full max-w-[400px] flex-col gap-2.5 rounded-[18px] border px-3.5 pb-3 pt-3 md:gap-3.5 md:p-4"
            style={{
              background: 'rgba(255,255,255,.035)',
              borderColor: 'rgba(255,255,255,.16)',
              backdropFilter: 'blur(5px) saturate(1.04)',
              WebkitBackdropFilter: 'blur(5px) saturate(1.04)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14)',
            }}
          >
            <div className="flex items-center gap-2">
              <svg width="22" height="17" viewBox="0 0 34 26" fill="none" aria-hidden>
                <path
                  d="M0 26V15C0 6.7 4.6 1.6 12.4 0l1.5 3.4C9.4 5 7.3 8 7 12h6.2v14H0zm20.1 0V15c0-8.3 4.6-13.4 12.4-15L34 3.4C29.5 5 27.4 8 27.1 12h6.2v14H20.1z"
                  fill="rgba(255,255,255,.55)"
                />
              </svg>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: 'rgba(255,255,255,.72)' }}
              >
                {VOICES.reviewsLabel}
              </span>
            </div>

            {/* Every review occupies the same grid cell, so the block is as
                tall as the longest one and nothing below it shifts on a
                swap. */}
            <div className="relative grid" aria-live="polite">
            {VOICES.reviews.map((r, k) => {
              const on = k === i
              return (
                <div
                  key={r.ini}
                  aria-hidden={!on}
                  className="flex flex-col gap-2.5"
                  style={{
                    gridArea: '1/1',
                    opacity: on ? 1 : 0,
                    transform: reduce ? undefined : `translateY(${on ? 0 : k < i ? -14 : 14}px)`,
                    filter: reduce || on ? undefined : 'blur(6px)',
                    transition: reduce
                      ? `opacity .5s ${EASE}`
                      : `opacity .5s ${EASE}, transform .5s ${EASE}, filter .5s ${EASE}`,
                    pointerEvents: on ? 'auto' : 'none',
                  }}
                >
                  <p
                    className="text-[clamp(17px,2.1vw,25px)] leading-[1.3] tracking-[-0.02em] text-white"
                    style={{ fontWeight: 300, textWrap: 'pretty' }}
                  >
                    {r.quote}
                  </p>
                  <p
                    className="text-[13.5px] leading-[1.55]"
                    style={{ color: 'rgba(255,255,255,.92)', textWrap: 'pretty' }}
                  >
                    {r.detail}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[14px] text-white">{r.name}</span>
                    <span
                      className="h-[3px] w-[3px] rounded-full"
                      style={{ background: 'rgba(255,255,255,.5)' }}
                    />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.1em]"
                      style={{ color: 'rgba(255,255,255,.85)' }}
                    >
                      {r.city}
                    </span>
                    <span
                      className="whitespace-nowrap rounded-full text-[12px] text-[#2E3033]"
                      style={{ background: SILVER, padding: '5px 10px' }}
                    >
                      {r.map}
                    </span>
                  </div>
                </div>
              )
            })}
            </div>
          </div>

          {/* ── Arrows + CTA ─────────────────────────────────────────────
              The handoff used one chip per reviewer as tabs. Five initials
              read as five people to identify rather than one story moving on,
              so they are replaced by prev / next and a position counter. The
              text still advances on its own; the arrows only let you get
              ahead of it, and the ring stays — now around Next, where it
              says how long until the slide turns itself. */}
          <div className="flex flex-nowrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go((i - 1 + VOICES.reviews.length) % VOICES.reviews.length)}
                aria-label="Previous review"
                className="flex h-11 w-11 items-center justify-center rounded-full border text-white/90 transition-colors duration-300"
                style={{ ...GLASS, background: 'rgba(255,255,255,.12)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.22)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
              >
                <ChevronLeft size={17} strokeWidth={1.6} />
              </button>

              <button
                type="button"
                onClick={() => go((i + 1) % VOICES.reviews.length)}
                aria-label="Next review"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border text-white/90 transition-colors duration-300"
                style={{ ...GLASS, background: 'rgba(255,255,255,.12)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.22)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
              >
                {!reduce ? (
                  <svg
                    // Keyed on the index so the ring remounts and the
                    // animation restarts from full on every slide.
                    key={`${i}-${paused ? 'p' : 'r'}`}
                    width="52"
                    height="52"
                    viewBox="0 0 46 46"
                    className="pointer-events-none absolute -left-[5px] -top-[5px] -rotate-90"
                    aria-hidden
                  >
                    <circle cx="23" cy="23" r="21" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.4" />
                    <circle
                      cx="23"
                      cy="23"
                      r="21"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeDasharray={RING}
                      strokeDashoffset={paused ? RING / 2 : RING}
                      style={paused ? undefined : { animation: `voicesRing ${DUR}ms linear forwards` }}
                    />
                  </svg>
                ) : null}
                <ChevronRight size={17} strokeWidth={1.6} />
              </button>

              {/* The chips also said where you were in the run; without them
                  the counter has to. */}
              <span
                className="ml-1 hidden font-mono text-[10px] uppercase tracking-[0.12em] tabular-nums sm:inline"
                style={{ color: 'rgba(255,255,255,.85)' }}
              >
                {String(i + 1).padStart(2, '0')} / {String(VOICES.reviews.length).padStart(2, '0')}
              </span>
            </div>

            <a
              href={VOICES.cta.href}
              // Glass, not the handoff's silver fill: on footage this dark a
              // solid pill reads as a sticker. Same material as the chips
              // beside it, one step brighter so it still leads.
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] text-white transition-colors duration-300 md:h-12 md:gap-2.5 md:px-5 md:text-[15px]"
              style={{
                background: 'rgba(255,255,255,.10)',
                borderColor: 'rgba(255,255,255,.34)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.10)')}
            >
              {VOICES.cta.label}
              <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
