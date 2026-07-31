'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { TRANSFORMATIONS, PLACEHOLDER, type Transformation } from '@/lib/showcase'

/* Shared heading — same copy in both the pinned and the fallback layouts. */
function Heading() {
  return (
    <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
      <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">Real results</p>
      <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>
        Real members.{' '}
        <span className="text-ink/40">Real change.</span>
      </h2>
      <p className="hidden sm:block text-[14px] md:text-[15px] text-ink/65 leading-relaxed mt-4">
        Scroll to reveal each transformation — before to after, same angle, same lighting.
        {PLACEHOLDER && (
          <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground align-middle">
            Sample photos — replace before launch
          </span>
        )}
      </p>
    </div>
  )
}

/* ── Pinned slide: scroll drives the before→after wipe within this slide's band ── */
function PinnedSlide({
  item,
  index,
  count,
  progress,
}: {
  item: Transformation
  index: number
  count: number
  progress: MotionValue<number>
}) {
  const start = index / count
  const end = (index + 1) / count
  const span = end - start
  const inDone = start + span * 0.18 // finished fading/wiping in
  const outStart = start + span * 0.82 // begins fading out

  // First slide is visible from the very start; last slide holds to the very end —
  // so the stage is never blank at either edge of the pinned run.
  const opFrom = index === 0 ? 1 : 0
  const opTo = index === count - 1 ? 1 : 0
  const opacity = useTransform(progress, [start, inDone, outStart, end], [opFrom, 1, 1, opTo])
  const scale = useTransform(progress, [start, end], [1.05, 1])

  // The "before" layer is clipped from the right as you scroll → after is revealed L→R.
  const insetRight = useTransform(progress, [inDone, outStart], [0, 100])
  const beforeClip = useMotionTemplate`inset(0 ${insetRight}% 0 0)`
  const lineLeft = useTransform(progress, [inDone, outStart], ['100%', '0%'])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="relative w-full h-full rounded-2xl overflow-hidden bg-mist">
        {/* After (base) */}
        <Image src={item.after} alt={`${item.name} after`} fill sizes="440px" className="object-cover" priority={index === 0} />
        {/* Before (clipped by scroll) */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: beforeClip }}>
          <Image src={item.before} alt={`${item.name} before`} fill sizes="440px" className="object-cover" />
        </motion.div>
        {/* Wipe line */}
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.25)]"
          style={{ left: lineLeft }}
        />
        {/* Labels */}
        <span className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">BEFORE</span>
        <span className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">PROJECTION</span>
        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[15px] font-medium text-white">
              {item.name} <span className="text-white/60 font-normal">· {item.city}</span>
            </span>
            <span className="text-[12px] text-white/80 whitespace-nowrap">{item.weeks} weeks</span>
          </div>
          <p className="text-[12px] text-white/70 mt-0.5">{item.focus}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* A thin progress bar per slide — fills as its band scrolls, then stays full. */
function ProgressBar({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [index / count, (index + 1) / count], ['0%', '100%'])
  return (
    <div className="relative h-[3px] flex-1 rounded-full bg-ink/10 overflow-hidden">
      <motion.div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: fill }} />
    </div>
  )
}

/* ── Fallback (mobile / reduced-motion): the plain draggable-slider grid ── */
function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const { position, containerRef, handleProps } = useComparisonSlider()
  return (
    <div ref={containerRef} className="relative aspect-[3/4] rounded-2xl overflow-hidden select-none bg-mist">
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" draggable={false} />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeImage} alt="Before" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" draggable={false} />
      </div>
      <span className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">BEFORE</span>
      <span className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">PROJECTION</span>
      <div className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.25)]" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div {...handleProps} aria-label="Drag to compare" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/15 backdrop-blur-md border border-white/70 flex items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-white/70">
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M4 0L0 3l4 3z" /></svg>
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M0 0L4 3L0 6z" /></svg>
        </div>
      </div>
    </div>
  )
}

function GridCard({ item, index }: { item: Transformation; index: number }) {
  return (
    <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: index * 0.06 }}>
      <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
      <figcaption className="mt-3 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-medium text-ink">{item.name} <span className="text-ink/40 font-normal">· {item.city}</span></span>
          <span className="text-[12px] text-analysis-teal whitespace-nowrap">{item.weeks} weeks</span>
        </div>
        <p className="text-[12px] text-ink/55 mt-0.5">{item.focus}</p>
      </figcaption>
    </motion.figure>
  )
}

export function Transformations() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smooth the scroll so the wipe/cross-fades glide instead of tracking the wheel 1:1.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const count = TRANSFORMATIONS.length

  // Reduced-motion only: plain padded grid (no scroll-driven motion).
  if (reduce) {
    return (
      <section id="results" className="section bg-glow-tr">
        <div className="container-main">
          <div className="mb-10 md:mb-12"><Heading /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {TRANSFORMATIONS.map((item, i) => (
              <GridCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <p className="text-[11px] text-ink/40 mt-8">*Individual results vary with consistency and starting point.</p>
        </div>
      </section>
    )
  }

  // Pinned scrollytelling on mobile + desktop. h-[100svh] keeps the pin exactly
  // one visible viewport tall on iOS (avoids the 100vh address-bar overflow).
  // Scroll budget ≈ 0.9 screen per slide.
  return (
    <section id="results" ref={ref} className="relative bg-glow-tr" style={{ height: `${count * 78}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        <div className="container-main w-full">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-24 items-center">
            {/* Heading + progress (stays put while slides change) */}
            <div>
              <Heading />
              <div className="mt-5 lg:mt-8 flex gap-2 max-w-[240px] mx-auto lg:mx-0">
                {TRANSFORMATIONS.map((item, i) => (
                  <ProgressBar key={item.id} index={i} count={count} progress={smooth} />
                ))}
              </div>
              <p className="hidden lg:block text-[11px] text-ink/40 mt-6">*Individual results vary with consistency and starting point.</p>
            </div>

            {/* Before/after stage */}
            <div className="relative w-full max-w-[230px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[500px] mx-auto aspect-[4/5]">
              {TRANSFORMATIONS.map((item, i) => (
                <PinnedSlide key={item.id} item={item} index={i} count={count} progress={smooth} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
