'use client'

import { useCallback, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'

interface UseComparisonSliderOptions {
  /** Initial divider position as a percentage (0–100). Defaults to 50. */
  initial?: number
  /** Keyboard arrow-key step in percent. Defaults to 2. */
  step?: number
}

/**
 * Shared interaction logic for a before/after comparison slider.
 *
 * - Dragging is driven ONLY by the handle (spread `handleProps` onto it).
 * - Uses Pointer Events + setPointerCapture so mouse/touch/pen all work and
 *   the drag keeps tracking even if the pointer leaves the element.
 * - The container is NOT wired for dragging, so a vertical scroll gesture
 *   over the image scrolls the page normally (no scroll-hijack).
 */
export function useComparisonSlider({ initial = 50, step = 2 }: UseComparisonSliderOptions = {}) {
  const [position, setPosition] = useState(initial)
  const [isDragging, setIsDragging] = useState(false)
  // Points at the slider's clipping container (the element whose width defines 0–100%).
  const containerRef = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, pct)))
  }, [])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      // Capture the pointer on the handle: subsequent moves retarget here
      // (released automatically on pointerup/pointercancel).
      e.currentTarget.setPointerCapture(e.pointerId)
      setIsDragging(true)
      setFromClientX(e.clientX)
    },
    [setFromClientX]
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
      setFromClientX(e.clientX)
    },
    [setFromClientX]
  )

  const endDrag = useCallback(() => setIsDragging(false), [])

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLElement>) => {
      let next: number | null = null
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = position - step
          break
        case 'ArrowRight':
        case 'ArrowUp':
          next = position + step
          break
        case 'Home':
          next = 0
          break
        case 'End':
          next = 100
          break
        default:
          return
      }
      e.preventDefault()
      setPosition(Math.max(0, Math.min(100, next)))
    },
    [position, step]
  )

  /** Spread onto the draggable handle element. */
  const handleProps = {
    role: 'slider' as const,
    tabIndex: 0,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': Math.round(position),
    'aria-orientation': 'horizontal' as const,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onKeyDown,
    // touch-action:none ONLY on the handle -> browser won't steal the gesture
    // for scrolling once the handle is grabbed; container keeps normal behavior.
    style: { touchAction: 'none' as const, cursor: 'ew-resize' },
  }

  return { position, isDragging, containerRef, handleProps }
}
