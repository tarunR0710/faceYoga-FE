'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  /** ms per character */
  speed?: number
  /** ms to wait after the heading scrolls into view before typing */
  startDelay?: number
}

/**
 * Types `text` out once, with a blinking caret, when it scrolls into view.
 * - Reserves the final text size (invisible copy) so the layout never reflows.
 * - Respects prefers-reduced-motion (shows the full text instantly, no caret blink).
 * - Left-aligned use only — a centered heading would re-center on each character.
 */
export function Typewriter({ text, className = '', speed = 45, startDelay = 250 }: TypewriterProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      setDone(true)
      return
    }
    if (!inView) return
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [inView, reduce, text, speed, startDelay])

  return (
    <span ref={ref} className={`relative inline-block align-bottom ${className}`} aria-label={text}>
      {/* Invisible full text reserves the final box so nothing reflows as it types */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      {/* Typed overlay */}
      <span aria-hidden className="absolute inset-0">
        {text.slice(0, count)}
        <span className={`typewriter-caret${done ? ' typewriter-caret--done' : ''}`} />
      </span>
    </span>
  )
}
