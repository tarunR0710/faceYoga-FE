'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

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
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    []
  )

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl select-none cursor-ew-resize border border-[#eee] ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background) */}
      <div className="relative w-full aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f5e8] to-[#d4edd4]">
          {afterImage ? (
            <Image
              src={afterImage}
              alt="After"
              fill
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
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="relative w-full aspect-[4/5]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0f0] to-[#e8e8e8]">
            {beforeImage ? (
              <Image
                src={beforeImage}
                alt="Before"
                fill
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

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)', boxShadow: '0 0 8px rgba(0,0,0,0.15)' }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
        >
          <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
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
