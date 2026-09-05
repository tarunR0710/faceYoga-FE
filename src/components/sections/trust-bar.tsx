'use client'

import { Video, Users, Map, LifeBuoy } from 'lucide-react'
import { HERO } from '@/lib/content'

/**
 * The band that closes the hero: the four things every plan includes.
 *
 * Ported from the mapmyface-blueprint-homepage branch and retuned for the
 * achromatic palette — the original tinted the chip and set the label in
 * analysis-teal, which would put the one hue on the page right back into it.
 *
 * Static and evenly spread from `lg` up; below that it becomes a seamless
 * marquee, because four labels this long cannot sit side by side until roughly
 * 1024px and stacking them into a 2x2 grid buried the section beneath it. The
 * marquee pauses on hover so it can actually be read.
 */

const ICONS = [Video, Users, Map, LifeBuoy]

const items = HERO.pillars.map((p, i) => ({ ...p, icon: ICONS[i] }))

function Item({ tag, label, icon: Icon }: (typeof items)[number]) {
  const isLive = tag === 'Live'
  return (
    <>
      {/* Disc is white so the glyph reads against the #ADC7CE ground; the glyph
          itself takes `brand` (#3D6B76), the darkened accent made for icons. */}
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/70">
        {isLive && (
          <span
            aria-hidden="true"
            className="animate-pulse-ring absolute h-3 w-3 rounded-full"
            style={{ border: '2px solid rgb(var(--c-brand) / 0.65)' }}
          />
        )}
        <Icon className="relative h-3.5 w-3.5 text-brand" strokeWidth={1.6} />
      </span>
      <span className="ml-2.5 shrink-0 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-ink/40">
        {tag}
      </span>
      <span
        className="ml-2 whitespace-nowrap text-[#999999]"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
    </>
  )
}

export function TrustBar() {
  // Rendered twice so the -50% translate loops without a seam.
  const loop = [...items, ...items]

  return (
    <section
      className="band-shelf"
      aria-label="What every plan includes"
      // No background, colour, padding or font-family here. `.band-shelf` owns
      // the ground so the two edge fades are guaranteed to match it exactly,
      // and the inner rows own the height — which the hero's
      // calc(100svh-46px) depends on. The `Inter` stack that used to be set
      // here is not loaded in this project (Geist is), so it silently fell back
      // to the generic sans and read differently from every other label.
      style={{ fontWeight: 500, fontSize: '13.5px', letterSpacing: '-0.01em' }}
    >
      {/* Below lg — marquee */}
      <div className="group relative flex h-[46px] items-center overflow-hidden lg:hidden">
        <div className="band-fade-l pointer-events-none absolute inset-y-0 left-0 z-10 w-12" />
        <div className="band-fade-r pointer-events-none absolute inset-y-0 right-0 z-10 w-12" />
        <ul className="animate-marquee-slow flex shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <li
              key={i}
              className="flex items-center pr-7"
              // The duplicate half is decorative — a screen reader should hear
              // the four items once, not eight times.
              aria-hidden={i >= items.length}
            >
              <Item {...item} />
              <span
                aria-hidden="true"
                className="ml-7 h-[3px] w-[3px] shrink-0 rounded-full bg-brand/40"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* lg and up — static, evenly spread */}
      <ul className="container-wide hidden h-[54px] items-center justify-between lg:flex">
        {items.map((item) => (
          <li key={item.tag} className="flex items-center">
            <Item {...item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
