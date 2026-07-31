'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
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
        Drag any photo to compare — before and after, same angle, same lighting.
        {PLACEHOLDER && (
          <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground align-middle">
            Sample photos — replace before launch
          </span>
        )}
      </p>
    </div>
  )
}

/* Draggable before/after — the reveal is entirely user-driven (no scroll wipe). */
function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const { position, containerRef, handleProps } = useComparisonSlider()
  return (
    <div ref={containerRef} className="relative aspect-[3/4] rounded-2xl overflow-hidden select-none bg-mist">
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill sizes="(max-width: 640px) 75vw, 380px" className="object-cover" draggable={false} />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeImage} alt="Before" fill sizes="(max-width: 640px) 75vw, 380px" className="object-cover" draggable={false} />
      </div>
      <span className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">BEFORE</span>
      <span className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">PROJECTION</span>
      <div className="absolute top-0 bottom-0 w-px bg-white/75 shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div {...handleProps} aria-label="Drag to compare" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/15 backdrop-blur-md border border-white/70 flex items-center justify-center gap-[3px] cursor-ew-resize outline-none focus-visible:ring-2 focus-visible:ring-white/70">
          <svg className="w-[3px] h-[5px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M4 0L0 3l4 3z" /></svg>
          <svg className="w-[3px] h-[5px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M0 0L4 3L0 6z" /></svg>
        </div>
      </div>
    </div>
  )
}

function Caption({ item }: { item: Transformation }) {
  return (
    <figcaption className="mt-3 px-0.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[14px] font-medium text-ink">
          {item.name} <span className="text-ink/40 font-normal">· {item.city}</span>
        </span>
        <span className="text-[12px] text-analysis-teal whitespace-nowrap">{item.weeks} weeks</span>
      </div>
      <p className="text-[12px] text-ink/55 mt-0.5">{item.focus}</p>
    </figcaption>
  )
}

function GridCard({ item, index }: { item: Transformation; index: number }) {
  return (
    <motion.figure initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: index * 0.06 }}>
      <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
      <Caption item={item} />
    </motion.figure>
  )
}

export function Transformations() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxX, setMaxX] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  // Finish the horizontal travel by 85% of the scroll, then hold — so the last
  // cards are fully in view (and the spring has settled) before the pin releases.
  const x = useTransform(smooth, [0, 0.85], [0, -maxX])
  const progressWidth = useTransform(smooth, [0, 0.85], ['6%', '100%'])
  const count = TRANSFORMATIONS.length

  // Measure how far the track overflows the viewport → that's the horizontal travel.
  // ResizeObserver re-measures after images/fonts settle so maxX is never stale.
  useEffect(() => {
    if (reduce) return
    const track = trackRef.current
    const vp = viewportRef.current
    if (!track || !vp) return
    const measure = () => setMaxX(Math.max(0, track.scrollWidth - vp.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    ro.observe(vp)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduce])

  // Reduced-motion: plain padded grid (no pin, no scroll-driven motion).
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

  // Pinned horizontal scroll: vertical scroll slides the card track sideways.
  // The before/after reveal on each card stays user-driven (drag the handle).
  return (
    <section id="results" ref={sectionRef} className="relative bg-glow-tr" style={{ height: `${count * 55 + 25}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        <div className="container-main w-full">
          <Heading />
        </div>

        {/* Card track — driven horizontally by the vertical scroll */}
        <div ref={viewportRef} className="mt-7 md:mt-9 w-full overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-4 md:gap-6 px-4 md:px-8 will-change-transform">
            {TRANSFORMATIONS.map((item) => (
              <figure key={item.id} className="shrink-0 w-[72vw] sm:w-[320px] md:w-[360px] lg:w-[380px]">
                <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
                <Caption item={item} />
              </figure>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress + hint */}
        <div className="container-main w-full mt-6 md:mt-8 flex items-center gap-4">
          <div className="relative h-[3px] flex-1 max-w-[240px] rounded-full bg-ink/10 overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: progressWidth }} />
          </div>
          <span className="text-[11px] text-ink/45 whitespace-nowrap">Scroll to browse · drag to compare</span>
        </div>
      </div>
    </section>
  )
}
