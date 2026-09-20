'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { CONTEXT_FACTORS } from '@/lib/content'

const HAIRLINE = 'rgba(30,53,59,.1)'
const GREY = '#7E959B'
const GHOST = '#98A6AB'
const INK = '#1E353B'
const EASE = 'cubic-bezier(0.16,1,0.3,1)'
const CARD_W = 300
const GAP = 16

/**
 * Illustration per group id — the ten Pexels photos the design (30c) uses,
 * centre-cropped to the 300×130 slot at 2x and saved as WebP with the
 * design's `saturate(.8)` baked in, so no CSS filter runs on the page.
 */
const ILLUSTRATIONS: Partial<Record<string, string>> = {
  live: '/context/live.webp',
  history: '/context/history.webp',
  routine: '/context/routine.webp',
  sleep: '/context/sleep.webp',
  food: '/context/food.webp',
  travel: '/context/travel.webp',
  sun: '/context/sun.webp',
  grooming: '/context/grooming.webp',
  budget: '/context/budget.webp',
  goals: '/context/goals.webp',
}

/**
 * The 100+ personal context factors — what the session asks that a photograph
 * cannot show. Design option 30c: after the vertical ledger of What We Map,
 * this section goes white and moves sideways — one card per group on a swipe
 * rail, an illustration slot on top, the question list folded behind an arrow
 * row at the foot of the card. The "100+" stat card is gone (the eyebrow says
 * it) and its note becomes the closing hint line.
 *
 * Type is the site's own: the pill tag, Geist 300 headline with the muted
 * tail, Geist Mono for the numerals and the closed-row label. Layout, colour
 * and spacing are copied from 30c.
 */
export function ContextFactors() {
  const c = CONTEXT_FACTORS
  const reduce = useReducedMotion()
  const t = (props: string) => (reduce ? 'none' : props)
  const railRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  // Cards fully inside the rail stay at full opacity; the neighbours that
  // peek at the edges are dimmed, as in the design. `null` until the observer
  // has reported, so the server render and first paint show everything lit.
  const [inView, setInView] = useState<Set<string> | null>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-card]'))
    const io = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          const next = new Set(prev ?? [])
          for (const e of entries) {
            const id = (e.target as HTMLElement).dataset.card
            if (!id) continue
            if (e.intersectionRatio >= 0.95) next.add(id)
            else next.delete(id)
          }
          return next
        })
      },
      { root: rail, threshold: [0.95] },
    )
    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const step = (dir: 1 | -1) =>
    railRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: reduce ? 'auto' : 'smooth' })

  return (
    <section id="context-factors" className="section relative overflow-hidden bg-white">
      <div className="container-main flex flex-col gap-8 md:gap-10">
        <div className="flex max-w-[640px] flex-col gap-4">
          <Reveal index={0}>
            <SectionTag>{c.eyebrow}</SectionTag>
          </Reveal>
          <Reveal
            index={1}
            as="h2"
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]"
            style={{ fontWeight: 300 }}
          >
            {c.title} <span className="text-ink/40">{c.muted}</span>
          </Reveal>
          <Reveal index={2} className="text-[15px] leading-relaxed text-ink-muted">
            <p>{c.lede}</p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3.5">
          <Reveal index={3} className="flex items-center justify-end">
            <div className="flex gap-1.5">
              <RailButton label="Previous group" onClick={() => step(-1)}>
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              </RailButton>
              <RailButton label="Next group" onClick={() => step(1)}>
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </RailButton>
            </div>
          </Reveal>

          <Reveal index={4} from="none">
            <ul
              ref={railRef}
              aria-label={c.figureLabel}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 scroll-px-5 md:-mx-8 md:px-8 md:scroll-px-8"
            >
              {c.regions.map((r, i) => {
                const on = r.id === open
                const dim = inView !== null && !inView.has(r.id)
                const img = ILLUSTRATIONS[r.id]
                const nn = String(i + 1).padStart(2, '0')
                return (
                  <li
                    key={r.id}
                    data-card={r.id}
                    className="flex shrink-0 snap-start flex-col overflow-hidden rounded-[20px] bg-white"
                    style={{
                      width: CARD_W,
                      border: `1px solid ${HAIRLINE}`,
                      opacity: dim ? 0.55 : 1,
                      transition: t('opacity 400ms ease'),
                    }}
                  >
                    <div className="relative h-[130px]" style={{ background: 'linear-gradient(160deg,#F4F1EC,#EEF2F3)' }}>
                      {img && <Image src={img} alt="" fill sizes={`${CARD_W}px`} className="object-cover" />}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'linear-gradient(180deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 45%)' }}
                      />
                      <span
                        className="absolute left-[14px] top-3 rounded-full font-mono text-[11px] tabular-nums"
                        style={{ color: GHOST, background: 'rgba(255,255,255,.8)', padding: '3px 8px' }}
                      >
                        {nn}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3" style={{ padding: '16px 18px 8px' }}>
                      <div className="flex flex-col gap-1">
                        <span className="text-[21px] leading-[1.15] tracking-[-0.02em]" style={{ fontWeight: 400, color: INK }}>
                          {r.title}
                        </span>
                        <span className="text-[13px] leading-[1.4]" style={{ color: GREY }}>
                          {r.summary}
                        </span>
                      </div>
                      <p className="text-[15px] leading-relaxed" style={{ color: INK }}>
                        {r.intro}
                      </p>

                      <div
                        className="grid"
                        style={{
                          gridTemplateRows: on ? '1fr' : '0fr',
                          transition: t(`grid-template-rows 520ms ${EASE}`),
                        }}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-col" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
                            {r.items.map((item, k) => (
                              <li
                                key={item}
                                className="text-[11.5px] leading-[1.35]"
                                style={{
                                  padding: '6px 0',
                                  borderBottom: '1px solid rgba(30,53,59,.06)',
                                  color: '#5C7278',
                                  ...enter(on, k, t),
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpen(on ? null : r.id)}
                        aria-expanded={on}
                        className="flex w-full items-center justify-between gap-2.5 text-left font-mono text-[10px] uppercase tracking-[0.08em]"
                        style={{ padding: '6px 0 10px', color: INK }}
                      >
                        <span>{on ? 'Show less' : 'Things we ask about in this group'}</span>
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                          style={{
                            border: '1px solid rgba(30,53,59,.16)',
                            transform: on ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: t('transform 300ms ease'),
                          }}
                        >
                          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal index={5} className="text-[12.5px] leading-[1.5]" style={{ color: GREY }}>
            <p>{c.figureNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full active:translate-y-px"
      style={{ border: '1px solid rgba(30,53,59,.12)', color: INK }}
    >
      {children}
    </button>
  )
}

/**
 * Entrance for the folded list: each row settles in turn, top to bottom, on
 * the same curve as the height. The stagger is deliberately unhurried —
 * ten rows take about a second to land, so the list reads as a list rather
 * than a block that appears. Closing is a plain quick fade, no stagger.
 */
function enter(on: boolean, k: number, t: (props: string) => string) {
  const delay = 140 + k * 70
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(8px)',
    transition: on
      ? t(`opacity 480ms ${EASE} ${delay}ms, transform 520ms ${EASE} ${delay}ms`)
      : t('opacity 160ms ease, transform 160ms ease'),
  } as const
}
