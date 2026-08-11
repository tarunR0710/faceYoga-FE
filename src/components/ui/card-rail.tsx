'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const COLS: Record<number, string> = {
  // 1 = swipe rail on mobile, plain vertical stack from md up. For rails that
  // sit inside a column rather than across the container.
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
  6: 'md:grid-cols-3 lg:grid-cols-6',
}

const WIDTHS: Record<string, string> = {
  // Peek widths — a sliver of the next card is always visible, which is what
  // tells a thumb there is more to the right.
  sm: '[&>*]:w-[62%]',
  md: '[&>*]:w-[78%]',
  lg: '[&>*]:w-[86%]',
}

type CardRailProps = {
  children: ReactNode
  /** Desktop column count. Mobile is always a swipe rail. */
  cols?: 1 | 2 | 3 | 4 | 6
  /** Mobile card width. */
  peek?: 'sm' | 'md' | 'lg'
  gap?: string
  className?: string
  label?: string
}

/**
 * The page has ~23 sections. Stacking every card grid vertically would make the
 * phone scroll enormous, so multi-card rows become a horizontal snap rail on
 * mobile (native momentum, no JS scrolling) and a plain grid from `md` up.
 * A thin progress bar replaces pagination dots — it reads as "there is more"
 * without adding a control to tap.
 */
export function CardRail({
  children,
  cols = 3,
  peek = 'md',
  gap = 'gap-3 md:gap-5',
  className = '',
  label,
}: CardRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [scrollable, setScrollable] = useState(false)

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollable(max > 8)
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        measure()
      })
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [measure])

  return (
    // `min-w-0` is load-bearing: as a grid or flex child the rail would other-
    // wise take its automatic minimum size from the track's content and blow
    // the column out past the viewport. Harmless when it is a plain block child.
    <div className={`min-w-0 ${className}`}>
      <div
        ref={trackRef}
        aria-label={label}
        className={`card-rail no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 pb-1 ${gap} ${WIDTHS[peek]} [&>*]:shrink-0 [&>*]:snap-start md:mx-0 md:grid ${COLS[cols]} md:overflow-visible md:px-0 md:pb-0 md:[&>*]:w-auto`}
      >
        {children}
      </div>

      {/* Mobile-only scroll progress — 2px, no controls, disappears on desktop */}
      {scrollable && (
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-ink/8 md:hidden" aria-hidden>
          <div
            className="h-full rounded-full bg-accent/50 transition-[width,margin] duration-150 ease-out"
            style={{ width: '38%', marginLeft: `${progress * 62}%` }}
          />
        </div>
      )}
    </div>
  )
}
