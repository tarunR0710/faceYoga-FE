'use client'

import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { WHAT_WE_MAP } from '@/lib/content'
import { glow } from '@/lib/glow'

type Region = { id: string; title: string; summary: string; intro: string; items: readonly string[] }

const WASH = 'linear-gradient(160deg, rgba(173,199,206,0.22) 0%, rgba(247,244,239,0.55) 45%, #ffffff 100%)'

// Design 28a — "flat ledger, one tint per region". The colour budget: teal is
// spent nowhere in the list; each region owns one quiet tint (row order),
// shown as a 10px dot on the closed row and as the chip fill (at 33%) when
// the row is open. No card container, so the rows sit straight on the wash.
const TINTS = [
  '173 199 206', // mist       #ADC7CE
  '191 205 182', // sage       #BFCDB6
  '211 203 190', // stone      #D3CBBE
  '228 200 191', // blush      #E4C8BF
  '230 201 175', // sand       #E6C9AF
  '188 197 214', // slate      #BCC5D6
  '226 214 178', // straw      #E2D6B2
  '157 187 194', // deep mist  #9DBBC2
]

const HAIRLINE = 'rgba(30,53,59,.08)'
const GREY = '#7E959B'
const INK = '#1E353B'
const EASE = 'cubic-bezier(0.16,1,0.3,1)'

// The design's mist disc (288px at .4, top-right, blur 64px) as a plain
// gradient — see glow.ts. The sand one below the list was dropped for a
// cleaner exit into the next section.
const GLOW_MIST = glow('173 199 206', 0.4)

/**
 * What We Map — the blueprint's 400+ facial assessments across eight regions.
 * Sits directly after Facial Expertise, which shows HOW a person reads a face;
 * this is the inventory of WHAT gets read.
 *
 * Layout follows design option 28a: eyebrow + headline + lede, then a flat
 * ledger of eight rows. The "400+" stat card is gone — the eyebrow already
 * says it, and the figure was being repeated three times in one screen. The
 * type stays the site's own (Geist, weight-300 heading with the muted tail,
 * mono uppercase labels); only the structure and colour come from 28a.
 */
export function WhatWeMap() {
  const c = WHAT_WE_MAP
  return (
    <section id="what-we-map" className="section relative overflow-hidden" style={{ background: WASH }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[286px] -top-[96px] h-[720px] w-[720px]"
        style={{ background: GLOW_MIST }}
      />

      <div className="container-main relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
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

          <Ledger regions={c.regions} ariaLabel={c.figureLabel} />
        </div>
      </div>
    </section>
  )
}

/**
 * The eight-row ledger. Same rendering rules as the other accordions on the
 * site, learned on iPhone: height animates via grid-rows, nothing in here
 * creates a compositing layer, and the open state stays light — the row lifts
 * onto a white surface with a hairline ring, no colour flip.
 */
function Ledger({ regions, ariaLabel }: { regions: readonly Region[]; ariaLabel: string }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<string | null>(null)
  const t = (props: string) => (reduce ? 'none' : props)

  return (
    <div className="flex flex-col">
      <ul aria-label={ariaLabel} className="flex flex-col">
        {regions.map((r, i) => {
          const on = r.id === open
          const tint = TINTS[i % TINTS.length]
          return (
            <Reveal key={r.id} index={Math.min(i, 5)} as="li" className="min-w-0">
              <div
                style={{
                  background: on ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,0)',
                  borderRadius: on ? 18 : 0,
                  boxShadow: on ? `inset 0 0 0 1px ${HAIRLINE}` : 'inset 0 0 0 0 rgba(30,53,59,0)',
                  borderBottom: `1px solid ${on ? 'transparent' : HAIRLINE}`,
                  transition: t(`background 300ms ${EASE}, border-radius 300ms ${EASE}, box-shadow 300ms ${EASE}, border-color 300ms ${EASE}`),
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : r.id)}
                  aria-expanded={on}
                  className="grid w-full grid-cols-[22px_1fr_auto] items-center gap-3 text-left"
                  style={{ padding: '16px 8px 16px 12px' }}
                >
                  <span className="flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: `rgb(${tint})`, boxShadow: `inset 0 0 0 1px ${HAIRLINE}` }}
                    />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[15.5px] leading-tight tracking-[-0.02em]" style={{ fontWeight: 400, color: INK }}>
                      {r.title}
                    </span>
                    <span
                      className="overflow-hidden text-[12.5px] leading-[1.35]"
                      style={{
                        color: GREY,
                        maxHeight: on ? 0 : 40,
                        opacity: on ? 0 : 1,
                        transition: t(`max-height 300ms ${EASE}, opacity 300ms ${EASE}`),
                      }}
                    >
                      {r.summary}
                    </span>
                  </span>
                  <PlusMinus on={on} transition={t(`transform 400ms ${EASE}`)} />
                </button>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: on ? '1fr' : '0fr',
                    transition: t(`grid-template-rows 400ms ${EASE}`),
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-3" style={{ padding: '0 12px 18px 46px' }}>
                      <p className="text-[14.5px] leading-relaxed" style={{ color: INK, ...enter(on, 0, t) }}>
                        {r.intro}
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {r.items.map((item, k) => (
                          <li
                            key={item}
                            className="inline-flex items-center rounded-full text-[12.5px] leading-[1.2]"
                            style={{ padding: '7px 11px', background: `rgb(${tint} / 0.33)`, color: INK, ...enter(on, k + 1, t) }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Entrance for the open panel's contents: each line settles in turn, top to
 * bottom, riding the same curve as the height. Closing is a plain quick fade
 * with no stagger, so the panel never looks like it is waiting to shut.
 */
function enter(on: boolean, k: number, t: (props: string) => string) {
  const delay = 60 + k * 28
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(6px)',
    transition: on ? t(`opacity 320ms ${EASE} ${delay}ms, transform 320ms ${EASE} ${delay}ms`) : t('opacity 140ms ease, transform 140ms ease'),
  } as const
}

/** A + that turns into a − : the vertical stroke rotates onto the horizontal. */
function PlusMinus({ on, transition }: { on: boolean; transition: string }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={INK}
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        style={{ transformOrigin: '12px 12px', transform: on ? 'rotate(90deg)' : 'rotate(0deg)', transition }}
      />
    </svg>
  )
}
