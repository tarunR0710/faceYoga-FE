'use client'

import { HERO } from '@/lib/content'

/**
 * The band that closes the hero: the four things every plan includes, as one
 * quiet uppercase marquee.
 *
 * Design handoff: #F6F8F9 band, 64px tall, no fades, no borders. Items are
 * 11.5px/600 uppercase at .14em in #98A6AB with 30px padding each side (60px
 * between items). The track is the content repeated and translated -50%, so
 * the wrap point is seamless.
 *
 * The handoff duplicates the content once and runs 34s. One copy of these
 * four labels is only ~1100px wide, so with two copies the -50% wrap would
 * show a gap on any desktop. Four copies keep it seamless up to ~2200px; the
 * duration doubles to 68s so the pixels-per-second speed is exactly the one
 * specified. The handoff names DM Sans, which this project does not load —
 * the band inherits Geist like every other label on the page.
 */
const REPEATS = 4

export function TrustBar() {
  const loop = Array.from({ length: REPEATS }, () => HERO.pillars).flat()

  return (
    <section
      aria-label="What every plan includes"
      className="h-16 overflow-hidden"
      style={{ background: '#F6F8F9' }}
    >
      <ul className="animate-marquee-band flex h-full w-max items-center will-change-transform hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <li
            key={i}
            // Repeats are decorative — a screen reader hears the four once.
            aria-hidden={i >= HERO.pillars.length}
            className="whitespace-nowrap px-[30px] uppercase"
            style={{ fontSize: '11.5px', lineHeight: 1, fontWeight: 600, letterSpacing: '0.14em', color: '#98A6AB' }}
          >
            {p.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
