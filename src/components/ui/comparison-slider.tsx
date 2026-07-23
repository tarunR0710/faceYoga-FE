'use client'

import Image from 'next/image'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'

interface ComparisonSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'Projection',
  className = '',
}: ComparisonSliderProps) {
  const { position, containerRef, handleProps } = useComparisonSlider()

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none border border-[#eee] ${className}`}
    >
      {/* After Image (Background) */}
      <div className="relative w-full aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f5e8] to-[#d4edd4]">
          {afterImage ? (
            <Image
              src={afterImage}
              alt="After"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#c8e6c8]" />
            </div>
          )}
        </div>

        {/* After Label */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-[11px] font-medium text-white">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="relative w-full aspect-[4/5]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0f0] to-[#e8e8e8]">
            {beforeImage ? (
              <Image
                src={beforeImage}
                alt="Before"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#ddd]" />
              </div>
            )}
          </div>

          {/* Before Label */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md bg-white/90 text-[11px] font-medium text-[#666]">
              {beforeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Slider Line + Handle (the ONLY draggable element) */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white z-20"
        style={{ left: `${position}%`, transform: 'translateX(-50%)', boxShadow: '0 0 8px rgba(0,0,0,0.15)' }}
      >
        {/* Handle Circle */}
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

      {/* Drag instruction */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] font-medium text-white/90">
          Drag to compare
        </span>
      </div>
    </div>
  )
}
