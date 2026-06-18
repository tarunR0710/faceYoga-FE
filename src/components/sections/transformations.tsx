'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  return (
    <div
      className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-ew-resize select-none bg-[#e5e5e5]"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
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
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
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

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
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
