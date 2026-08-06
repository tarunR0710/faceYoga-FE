'use client'

import { Video, Users, Map, LifeBuoy } from 'lucide-react'

// The strip that closes the hero page in the blueprint: the four things every
// customer gets, in the approved brand terminology. Tag + label, nothing more.
// Static 4-up band on desktop; a seamless marquee on mobile where 4 labels will
// not fit side by side.
const items = [
  { tag: 'Live', icon: Video, label: 'Face Mapping Session' },
  { tag: 'Team', icon: Users, label: 'Multidisciplinary Expert Review' },
  { tag: 'Map', icon: Map, label: 'Personalised Face Map' },
  { tag: 'Help', icon: LifeBuoy, label: 'Clarification Support' },
]

function Item({ tag, icon: Icon, label }: (typeof items)[number]) {
  const isLive = tag === 'Live'
  return (
    <>
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/60">
        {isLive && (
          <span
            aria-hidden
            className="animate-pulse-ring absolute h-3 w-3 rounded-full"
            style={{ border: '2px solid rgb(var(--c-accent) / 0.5)' }}
          />
        )}
        <Icon className="relative h-3.5 w-3.5 text-accent/60" strokeWidth={1.5} />
      </span>
      <span className="ml-2.5 shrink-0 text-[9px] font-semibold uppercase tracking-[0.14em] text-accent/70">
        {tag}
      </span>
      <span className="ml-2 whitespace-nowrap text-[12px] font-medium tracking-[-0.01em] text-analysis-teal md:text-[13px]">
        {label}
      </span>
    </>
  )
}

export function TrustBar() {
  // Rendered twice so the -50% marquee loop is seamless on mobile.
  const loop = [...items, ...items]
  return (
    <section className="bg-mist border-y border-border-soft" aria-label="What every plan includes">
      {/* Below lg: marquee — the four labels cannot sit side by side until ~1024px */}
      <div className="group relative flex h-[44px] items-center overflow-hidden lg:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mist to-transparent" />
        <ul className="flex shrink-0 items-center animate-marquee-slow will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <li key={i} className="flex items-center pr-7" aria-hidden={i >= items.length}>
              <Item {...item} />
              <span className="ml-7 h-[3px] w-[3px] shrink-0 rounded-full bg-ink/20" />
            </li>
          ))}
        </ul>
      </div>

      {/* lg and up: static, evenly spread */}
      <ul className="container-wide hidden h-[52px] items-center justify-between lg:flex">
        {items.map((item) => (
          <li key={item.tag} className="flex items-center">
            <Item {...item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
