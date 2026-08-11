'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'

export function CTA() {
  const reduce = useReducedMotion()
  // Spotlight: a soft accent GLOW pools under the pointer/finger (screen-blend,
  // brightens the dark band). Driven by motion values (no re-render); fades in on hover/touch.
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const [active, setActive] = useState(false)
  // Soft accent GLOW that follows the pointer/finger. Brightens (screen-blend) so
  // it's clearly evident on the now-dark band — a dark pool would vanish here.
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgb(var(--c-accent) / 0.6) 0%, rgb(var(--c-accent) / 0.14) 36%, transparent 70%)`

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  // Pointer events cover BOTH mouse (hover) and touch (press + drag) — the mobile bit.
  const pointer = reduce
    ? {}
    : {
        onPointerMove: track,
        onPointerEnter: (e: React.PointerEvent<HTMLElement>) => { track(e); setActive(true) },
        onPointerDown: (e: React.PointerEvent<HTMLElement>) => { track(e); setActive(true) },
        onPointerLeave: () => setActive(false),
        onPointerUp: () => setActive(false),
        onPointerCancel: () => setActive(false),
      }

  return (
    <section
      className="group relative overflow-hidden pt-48 md:pt-64 pb-24 md:pb-32"
      {...pointer}
      style={{ background: 'linear-gradient(180deg, rgb(var(--c-accent)) 0%, rgb(var(--c-accent-ink)) 26%, var(--c-ink-accent) 56%)' }}
    >
      {/* Top ramp — ease the white section above into the dark band (no hard edge) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64"
        style={{ background: 'linear-gradient(180deg, rgb(var(--c-bg)) 0%, rgb(var(--c-bg) / 0.8) 20%, rgb(var(--c-bg) / 0.35) 52%, rgb(var(--c-bg) / 0.1) 78%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 90% at 50% 115%, rgb(var(--c-accent) / 0.20) 0%, transparent 65%)' }}
      />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight, mixBlendMode: 'screen' }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      )}
      <div className="relative container-main">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-5">
            {/* This band paints its own gradient rather than .tone-deep, so the
                role tokens never re-scope here — hence the on-dark variant. */}
            <SectionTag variant="on-dark">Your plan starts with understanding</SectionTag>
          </div>
          <h2
            className="text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-ivory md:text-[2.5rem]"
            style={{ fontWeight: 450 }}
          >
            Stop guessing what suits you.{' '}
            <span className="text-ivory/70">Start with a plan built around you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-ivory/70 md:text-[16px]">
            Meet real experts, understand your complete appearance and receive clear personalised
            direction through your own Face Map.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/form"
              className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-ivory px-9 text-[15px] font-semibold text-ink transition-colors duration-300 ease-smooth hover:bg-mist sm:w-auto"
            >
              Start My Plan
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-ivory/25 bg-white/10 px-8 text-[15px] font-medium text-ivory backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:w-auto"
            >
              See How It Works
            </Link>
          </div>

          {/* What is always included, restated at the moment of decision */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {[
              'Personal onboarding included',
              'Expert-led consultation',
              'Clarification support available',
            ].map((chip, i) => (
              <motion.span
                key={chip}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 + i * 0.09 }}
                className="inline-flex items-center gap-2 text-[12px] text-ivory/65 md:text-[13px]"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-ivory/50" strokeWidth={2} />
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
