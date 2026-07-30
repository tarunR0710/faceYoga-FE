'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT } from '@/lib/motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS, RATING, PLACEHOLDER } from '@/lib/showcase'

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const reduce = useReducedMotion()

  // Peek carousel: native CSS scroll-snap drives touch-swipe + momentum + drag;
  // JS only reflects which card is centered (for the dots) and jumps on click.
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const count = TESTIMONIALS.length

  // Mark the card nearest the track's centre as active as the user scrolls/swipes.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = track.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      let nearest = 0
      let min = Infinity
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const r = card.getBoundingClientRect()
        const dist = Math.abs(r.left + r.width / 2 - center)
        if (dist < min) {
          min = dist
          nearest = i
        }
      })
      setActive(nearest)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Centre a given card in the track. scrollIntoView({ inline: 'center' }) plays
  // nicely with scroll-snap and honours reduced-motion via the behavior flag.
  const scrollToIndex = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(count - 1, i))
      const card = cardRefs.current[clamped]
      if (!card) return
      setActive(clamped)
      card.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    },
    [count, reduce]
  )

  return (
    <section className="section bg-white">
      <div className="container-main">
        {/* rating summary band */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div className="max-w-xl">
            <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">Loved by members</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink" style={{ fontWeight: 450 }}>
              People who stopped guessing
              {PLACEHOLDER && (
                <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground align-middle">
                  Sample reviews
                </span>
              )}
            </h2>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="text-[28px] leading-none text-ink" style={{ fontWeight: 450 }}>{RATING.score}</span>
              <Stars />
            </div>
            <p className="text-[12px] text-analysis-teal">
              {RATING.count ? `${RATING.note} · ${RATING.count} reviews` : RATING.note}
            </p>
          </div>
        </motion.div>

        {/* large quote cards — swipeable peek carousel */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Member reviews"
        >
          {/*
            The active card sits centred; left/right neighbours peek in.
            `--card` is the centre-card width per breakpoint (a viewport-fixed
            unit so the maths is stable). Side padding of (100% - card) / 4
            reserves exactly enough gutter for the first/last card to centre,
            which also sets the peek width. Wider `--card` => smaller peek, so
            mobile shows a slim sliver and desktop shows more.
          */}
          <div
            ref={trackRef}
            tabIndex={0}
            className="no-scrollbar flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory rounded-2xl [--card:68vw] sm:[--card:56vw] md:[--card:440px] lg:[--card:560px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            style={{
              paddingInline: 'calc((100% - var(--card)) / 4)',
              scrollBehavior: reduce ? 'auto' : 'smooth',
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Review ${i + 1} of ${count}`}
                className="snap-center shrink-0 w-[var(--card)] flex flex-col rounded-2xl bg-mist border border-border-soft p-6 md:p-7"
              >
                <Stars />
                <blockquote className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mt-4 mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-mist flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-ink">{t.name}</p>
                    <p className="text-[12px] text-analysis-teal">{t.city} · {t.timeframe}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* controls: arrows (desktop) + pagination dots */}
          <div className="flex items-center justify-center gap-4 mt-7 md:mt-8">
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Previous review"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2" role="group" aria-label="Choose a review">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={active === i}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    active === i ? 'w-6 bg-accent' : 'w-2 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === count - 1}
              aria-label="Next review"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink transition-colors hover:bg-mist disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
