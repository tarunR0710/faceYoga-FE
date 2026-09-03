'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT } from '@/lib/motion'

/**
 * A controlled number animation — the only kind the blueprint's motion rules
 * allow ("subtle mapping lines, gentle card fades and controlled number
 * animations"). Digits are grouped Indian-style and always land on the exact
 * value. Reduced motion renders the final number immediately.
 *
 * The rendered number starts at its FINAL value, so the server HTML and first
 * paint always show the real price (never a "₹0"). It rewinds to zero only after
 * mount, and only while the element is still off screen — so the count-up is
 * something you scroll into, never something you watch break.
 *
 * `live`: re-tween from the current figure whenever `to` changes — used by the
 * pricing total so adding a Map reads as the price moving, not swapping.
 */
export function CountUp({
  to,
  prefix = '',
  duration = 1.1,
  live = false,
  className,
}: {
  to: number
  prefix?: string
  duration?: number
  live?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(to)
  const shown = useRef(to)
  // null = not decided yet, true = we rewound and owe an animation.
  const armed = useRef<boolean | null>(null)

  useEffect(() => {
    shown.current = value
  }, [value])

  // Arm once, after mount: rewind to zero only if the number is off screen.
  useEffect(() => {
    if (live || reduce || armed.current !== null) return
    const el = ref.current
    const rect = el?.getBoundingClientRect()
    const onScreen = rect ? rect.top < window.innerHeight && rect.bottom > 0 : true
    armed.current = !onScreen
    if (!onScreen) setValue(0)
  }, [live, reduce])

  useEffect(() => {
    if (reduce) {
      setValue(to)
      return
    }
    // Live mode reacts to every change; one-shot mode waits to be scrolled to.
    if (!live && (!inView || !armed.current)) return
    const from = shown.current
    if (from === to) return
    const controls = animate(from, to, {
      duration: live ? 0.5 : duration,
      ease: EASE_OUT_SOFT,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration, live])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
    </span>
  )
}
