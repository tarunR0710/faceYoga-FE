'use client'

import { UserCheck, Users, CalendarClock, ShieldCheck, Lock, BadgeCheck } from 'lucide-react'

// Infinite auto-scrolling "trust bridge" under the hero (qoves-style marquee).
// Honest, brand-true reassurances — reword to the Face Map playbook voice.
const items = [
  { icon: UserCheck, label: 'Expert-reviewed' },
  { icon: Users, label: '5 expert disciplines' },
  { icon: CalendarClock, label: 'Your Face Map in 2–4 days' },
  { icon: ShieldCheck, label: 'No surgery, ever' },
  { icon: Lock, label: 'Private & secure' },
  { icon: BadgeCheck, label: 'One-time — no subscription' },
]

export function TrustBar() {
  // Rendered twice so the -50% marquee loop is seamless.
  const loop = [...items, ...items]
  return (
    <section className="bg-mist border-y border-border-soft">
      <div className="group relative flex h-[52px] md:h-16 items-center overflow-hidden">
        {/* soft edge fades so items appear/vanish instead of hard-cutting */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 md:w-28 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 md:w-28 bg-gradient-to-l from-mist to-transparent" />

        {/* single track, items duplicated → continuous seamless scroll; pauses on hover */}
        <ul className="flex shrink-0 items-center animate-marquee-slow will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map(({ icon: Icon, label }, i) => (
            <li key={i} className="flex items-center pr-7 md:pr-10" aria-hidden={i >= items.length}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
              </span>
              <span className="ml-2.5 whitespace-nowrap text-[13px] font-medium tracking-[-0.01em] text-analysis-teal">
                {label}
              </span>
              <span className="ml-7 md:ml-10 h-[3px] w-[3px] rounded-full bg-ink/20" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
