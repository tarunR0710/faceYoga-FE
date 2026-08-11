'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, EASE_OUT_SOFT } from '@/lib/motion'
import { MEDIA, PLACEHOLDER } from '@/lib/showcase'

/**
 * The report as an interface: a tinted portrait with instrument panels floating
 * over it, dots pinned to landmarks, and click-to-zoom on each landmark.
 *
 * The category's scanner products carry the same furniture — gauge, meter,
 * matrix — but wired to invented figures (58/100, 64%). Here the SHAPES do the
 * attention-grabbing and every reading is a word on a named axis. That is not
 * squeamishness: the blueprint bars publishing technical figures before the
 * methodology audit, and the section above promises "clear explanations, not
 * unexplained scores". A gauge reading 58/100 would contradict the product.
 */

type Landmark = {
  id: string
  label: string
  read: string
  /** position on the portrait, in % */
  x: number
  y: number
  /** the named axis this sits on — words at both ends, never a number */
  axis: [string, string]
  /** where on that axis, 0–1. Drives the meter and the arc together. */
  pos: number
}

const landmarks: Landmark[] = [
  { id: 'brow', label: 'Brow line', read: 'Frames your eyes', x: 62, y: 30, axis: ['Flat', 'Arched'], pos: 0.62 },
  { id: 'mid', label: 'Midface', read: 'Balanced', x: 47, y: 45, axis: ['Compact', 'Elongated'], pos: 0.5 },
  { id: 'jaw', label: 'Jawline', read: 'Softly defined', x: 55, y: 68, axis: ['Soft', 'Sharp'], pos: 0.42 },
  { id: 'skin', label: 'Skin surface', read: 'Even, slightly dry', x: 36, y: 55, axis: ['Dry', 'Oily'], pos: 0.34 },
]

const ZOOM = 1.55
const R = 26
const CIRC = 2 * Math.PI * R

export function ReportHud({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = landmarks.find((l) => l.id === activeId) ?? landmarks[0]
  const zoomed = activeId !== null && !reduce
  const z = zoomed ? ZOOM : 1

  // Translate the chosen landmark to the centre while scaling. Percentages
  // resolve against the unscaled box and translate is applied outside the
  // scale, so the offset has to be pre-multiplied by z.
  const dx = zoomed ? -z * (active.x - 50) : 0
  const dy = zoomed ? -z * (active.y - 50) : 0

  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-ink ${className}`}>
      {/* ── the zooming layer: portrait + dots move together ─────────────── */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: z, x: `${dx}%`, y: `${dy}%` }}
        transition={{ duration: 0.75, ease: EASE_OUT_SOFT }}
      >
        <Image
          src={MEDIA.sessionCustomer}
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 440px"
          className="object-cover"
          style={{ filter: 'saturate(0.7) contrast(1.03)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgb(var(--c-ink) / 0.55) 0%, rgb(var(--c-ink) / 0.22) 38%, rgb(var(--c-ink) / 0.78) 100%)',
          }}
        />

        {landmarks.map((l, i) => {
          const on = activeId === l.id
          return (
            <motion.button
              key={l.id}
              type="button"
              onClick={() => setActiveId(on ? null : l.id)}
              aria-label={`${l.label}: ${l.read}`}
              aria-pressed={on}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 / z }}
              animate={{ scale: 1 / z }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 0.45 + i * 0.1 }}
            >
              <span
                className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300 ${
                  on ? 'border-white bg-white/35' : 'border-white/70 bg-white/10'
                }`}
              >
                {!reduce && (
                  <span
                    aria-hidden
                    className="animate-pulse-ring absolute h-5 w-5 rounded-full"
                    style={{
                      border: '1px solid rgb(255 255 255 / 0.55)',
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                )}
                <span className="h-[5px] w-[5px] rounded-full bg-white" />
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* ── instrument panels: fixed to the frame, never zoom ─────────────── */}

      {/* mapping matrix — pure texture, the "something is being analysed" cue */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.2 }}
        className="absolute left-3 top-3 rounded-[13px] border border-white/20 bg-white/[0.13] p-2.5 backdrop-blur-md md:left-4 md:top-4"
      >
        <p className="mb-1.5 text-[7.5px] font-semibold uppercase tracking-[0.16em] text-white/55 md:text-[8px]">
          Mapping
        </p>
        <div className="grid grid-cols-6 gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => {
            const lit = [3, 4, 9, 10, 11, 15, 16, 21].includes(i)
            return (
              <motion.span
                key={i}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.02 }}
                className={`h-[5px] w-[5px] rounded-[1px] ${lit ? 'bg-white/70' : 'bg-white/20'}`}
              />
            )
          })}
        </div>
      </motion.div>

      {/* the gauge — an arc, and a WORD where the number would be */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.3 }}
        className="absolute right-3 top-3 rounded-[13px] border border-white/20 bg-white/[0.13] px-2.5 py-2 backdrop-blur-md md:right-4 md:top-4"
      >
        <p className="mb-1 text-[7.5px] font-semibold uppercase tracking-[0.16em] text-white/55 md:text-[8px]">
          {active.label}
        </p>
        <div className="relative mx-auto h-[64px] w-[64px]">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle cx="32" cy="32" r={R} fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="4" />
            <motion.circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="rgb(255 255 255 / 0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: CIRC * (1 - active.pos * 0.78) }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[8.5px] leading-tight text-white/90 md:text-[9px]">
            {active.read.split(',')[0]}
          </span>
        </div>
      </motion.div>

      {/* the meter — a named axis with a marker, no percentage anywhere */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.35 }}
        className="absolute inset-x-3 bottom-3 rounded-[14px] border border-white/20 bg-white/[0.13] p-3 backdrop-blur-md md:inset-x-4 md:bottom-4 md:p-3.5"
      >
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <motion.p
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="text-[13px] leading-tight text-white md:text-[14px]"
            style={{ fontWeight: 500 }}
          >
            {active.read}
          </motion.p>
          {PLACEHOLDER && (
            <span className="shrink-0 rounded-full bg-white/15 px-2 py-[2px] text-[7.5px] font-medium uppercase tracking-[0.1em] text-white/60">
              Illustrative
            </span>
          )}
        </div>

        <div className="relative h-[3px] rounded-full bg-white/20">
          <motion.span
            className="absolute -top-[3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-white"
            animate={{ left: `${active.pos * 100}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[8px] uppercase tracking-[0.12em] text-white/45 md:text-[8.5px]">
          <span>{active.axis[0]}</span>
          <span>{active.axis[1]}</span>
        </div>

        <p className="mt-2.5 border-t border-white/15 pt-2 text-[9px] text-white/45 md:text-[9.5px]">
          {activeId ? 'Tap the point again to zoom out' : 'Tap a point on the face to inspect it'}
        </p>
      </motion.div>
    </div>
  )
}
