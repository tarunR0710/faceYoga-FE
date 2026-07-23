'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'PROJECTION'
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
      className="relative aspect-[3/4] rounded-xl overflow-hidden select-none bg-[#e5e5e5]"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="After"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3">
        <span className="text-[9px] font-medium tracking-[0.15em] text-black/50">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3">
        <span className="text-[9px] font-medium tracking-[0.15em] text-black/50">
          {afterLabel}
        </span>
      </div>

      {/* Slider Line + Handle (the ONLY draggable element) */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div
          {...handleProps}
          aria-label="Drag to compare before and after"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/15 backdrop-blur-md border border-white/60 flex items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6">
            <path d="M4 0L0 3l4 3z" />
          </svg>
          <svg className="w-1 h-1.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 4 6">
            <path d="M0 0L4 3L0 6z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const benefits = [
  'Get more career opportunities',
  'Boost your self-confidence',
  'Make a stronger first impression',
  'Improve your dating life',
  'Enhance your quality of life',
]

export function Transformations() {
  return (
    <section className="pt-24 md:pt-28 pb-14 md:pb-20 bg-[#f7f7f7]">
      <div className="container-main">
        {/* Grid: Text left, Images right on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8 xl:pl-12"
          >
            <p className="text-[11px] font-medium text-black/40 uppercase tracking-[0.2em] mb-4">
              New Approach
            </p>
            <h2
              className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] text-[#111] mb-5"
              style={{ fontWeight: 450 }}
            >
              Life-changing
              <br />
              <span className="text-black/30">Transformations</span>
            </h2>
            <p className="text-[15px] text-black/50 leading-relaxed mb-8 max-w-md">
              Research consistently demonstrates the diverse, wide-ranging benefits of physical attractiveness.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 pl-0 md:pl-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[12px] text-black/30">[+]</span>
                  <span className="text-[14px] text-black/60">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Before/After Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face"
              afterImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face"
            />
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"
              afterImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
