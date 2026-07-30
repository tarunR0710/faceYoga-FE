'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { TRANSFORMATIONS, PLACEHOLDER, type Transformation } from '@/lib/showcase'

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'PROJECTION',
}: {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const { position, containerRef, handleProps } = useComparisonSlider()

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] rounded-2xl overflow-hidden select-none bg-mist"
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" draggable={false} />
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeImage} alt="Before" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" draggable={false} />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">{beforeLabel}</span>
      <span className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-white/85 drop-shadow">{afterLabel}</span>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div
          {...handleProps}
          aria-label="Drag to compare before and after"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/15 backdrop-blur-md border border-white/70 flex items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M4 0L0 3l4 3z" /></svg>
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6"><path d="M0 0L4 3L0 6z" /></svg>
        </div>
      </div>
    </div>
  )
}

function Card({ item, index }: { item: Transformation; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
      <figcaption className="mt-3 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-medium text-ink">
            {item.name} <span className="text-ink/40 font-normal">· {item.city}</span>
          </span>
          <span className="text-[12px] text-analysis-teal whitespace-nowrap">{item.weeks} weeks</span>
        </div>
        <p className="text-[12px] text-ink/55 mt-0.5">{item.focus}</p>
      </figcaption>
    </motion.figure>
  )
}

export function Transformations() {
  return (
    <section id="results" className="section bg-glow-tr">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 md:mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.15em] mb-3">Real results</p>
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.12] tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>
            Real members.{' '}
            <span className="text-ink/40">Real change.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-ink/65 leading-relaxed mt-4">
            Drag the slider on any photo to compare. Same angle, same lighting — no filters.
            {PLACEHOLDER && (
              <span className="ml-2 inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground align-middle">
                Sample photos — replace before launch
              </span>
            )}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {TRANSFORMATIONS.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>

        <p className="text-[11px] text-ink/40 mt-8">
          *Individual results vary with consistency and starting point.
        </p>
      </div>
    </section>
  )
}
