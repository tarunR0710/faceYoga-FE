'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '@/lib/motion'

export type TabRailItem = {
  id: string
  label: string
  /** Optional short line under the label on wide rails. */
  meta?: string
}

type TabRailProps = {
  items: readonly TabRailItem[]
  active: string
  onChange: (id: string) => void
  /**
   * Shared id namespace for the ARIA wiring. Pass the SAME value to TabPanel —
   * without it the rail generated its own useId internally and the panel had no
   * way to match it, so aria-controls / aria-labelledby pointed at nothing.
   */
  idBase: string
  /**
   * `pill` — dark filled pill on light ground (the workhorse).
   * `underline` — hairline rail with a moving underline, for wider label sets.
   */
  variant?: 'pill' | 'underline'
  tone?: 'light' | 'dark'
  className?: string
  ariaLabel: string
}

/**
 * The tab rail that carries most of this page's density.
 *
 * Parallel content sets — the six areas we assess, the report's chapter groups,
 * what the expert asks about — are all sets of peers, and printing every member
 * of every set is what turned the first build into a list. A rail shows the set,
 * one member at a time.
 *
 * Roving focus and arrow keys are wired by hand rather than via Radix Tabs so
 * the moving indicator can be a shared framer-motion `layoutId`; the ARIA
 * contract (`tablist` / `tab` / `aria-selected` / `tabIndex` on the active tab
 * only) is the same one Radix implements.
 */
export function TabRail({
  items,
  active,
  onChange,
  idBase,
  variant = 'pill',
  tone = 'light',
  className = '',
  ariaLabel,
}: TabRailProps) {
  const reduce = useReducedMotion()
  const layoutId = idBase
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [focusFrom, setFocusFrom] = useState<string | null>(null)

  const move = (dir: 1 | -1) => {
    const i = items.findIndex((t) => t.id === active)
    const next = items[(i + dir + items.length) % items.length]
    onChange(next.id)
    setFocusFrom(next.id)
    // Focus follows selection, which is the expected behaviour for
    // automatic-activation tabs.
    requestAnimationFrame(() => refs.current[next.id]?.focus())
  }

  const dark = tone === 'dark'

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          move(1)
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          move(-1)
        }
      }}
      className={`no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 ${className}`}
    >
      {items.map((t) => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el
            }}
            role="tab"
            id={`${layoutId}-tab-${t.id}`}
            aria-selected={on}
            aria-controls={`${layoutId}-panel-${t.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onFocus={() => setFocusFrom(t.id)}
            className={[
              'relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] outline-none transition-colors duration-200',
              variant === 'pill'
                ? on
                  ? dark
                    ? 'text-ink'
                    : 'text-white'
                  : dark
                    ? 'text-white/55 hover:text-white/85'
                    : 'text-ink/55 hover:text-ink'
                : on
                  ? dark
                    ? 'text-white'
                    : 'text-ink'
                  : dark
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-ink/50 hover:text-ink/80',
              focusFrom === t.id ? 'focus-visible:ring-2 focus-visible:ring-brand/50' : '',
            ].join(' ')}
          >
            {/* The indicator is one element that slides between tabs, so the
                set reads as a single control rather than n toggles. */}
            {on && variant === 'pill' && (
              <motion.span
                layoutId={`${layoutId}-pill`}
                transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }}
                // NOT -z-10. A negative z-index pushes the pill behind the
                // nearest ancestor with a background, i.e. behind the section
                // itself — so the pill vanished and the active label rendered
                // white-on-cream. DOM order alone puts it under the label,
                // which is painted after it and carries `relative`.
                className={`absolute inset-0 rounded-full ${dark ? 'bg-white' : 'bg-ink'}`}
              />
            )}
            {on && variant === 'underline' && (
              <motion.span
                layoutId={`${layoutId}-underline`}
                transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }}
                className={`absolute inset-x-3 -bottom-px h-[2px] rounded-full ${dark ? 'bg-white' : 'bg-ink'}`}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Panel wrapper that pairs with TabRail's ARIA ids. */
export function TabPanel({
  id,
  railId,
  children,
  className = '',
}: {
  id: string
  railId: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="tabpanel"
      id={`${railId}-panel-${id}`}
      aria-labelledby={`${railId}-tab-${id}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  )
}
