'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, VIEWPORT, VIEWPORT_TIGHT } from '@/lib/motion'

/**
 * The Appearance Protocol, drawn as a schedule.
 *
 * This is a Gantt, deliberately, and it is the one diagram on the page that
 * earns its space: it encodes three things at once that prose cannot state
 * compactly — the ORDER phases begin in, the fact that earlier phases keep
 * running underneath later ones, and that "Later" is optional and may never
 * start. Six cards saying First / Next / Later lose all three.
 *
 * There is no axis and there are no units, on purpose. MapMyFace has not
 * published a timeline for a protocol, so putting "Week 3" on this would be
 * inventing a service claim. A schedule diagram carries sequence without
 * asserting duration.
 *
 * The draw-in is not decoration either: the bars growing left-to-right in
 * sequence IS the message. Under reduced motion they simply appear.
 */

type Band = {
  label: string
  /** Start position as a fraction of the track. */
  start: number
  /** Optional bands are drawn as an outline and may never begin. */
  optional?: boolean
  note: string
}

const BANDS: Band[] = [
  { label: 'First', start: 0, note: 'The highest-priority changes. Foundation before anything else.' },
  { label: 'Next', start: 0.34, note: 'Introduced once the foundation is actually holding.' },
  { label: 'Later', start: 0.66, optional: true, note: 'Optional improvements, kept honestly optional.' },
]

const TRACK_X = 92
const TRACK_W = 508
const ROW_H = 40
const BAR_H = 22
const TOP = 12
/** Continue sits under the three phase bands — it is the floor, not a fourth phase. */
const CONTINUE_Y = TOP + 3 * ROW_H + 6

export function ProtocolSequence({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const height = CONTINUE_Y + 74

  return (
    <figure className={className}>
      {/* A viewBox scales TEXT as well as geometry, so at 380px wide the axis
          labels were rendering around 5px. Below the diagram's natural width it
          scrolls instead of shrinking; the figcaption carries the same
          information in prose for anyone who does not scroll. */}
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
      <svg
        viewBox={`0 0 640 ${height}`}
        className="h-auto w-full min-w-[600px]"
        role="img"
        aria-label="A schedule diagram. A Continue band runs the full width underneath, representing what is already working and is protected throughout. First begins immediately and continues. Next begins later and continues. Later begins last, is drawn as an outline, and is optional."
      >
        {BANDS.map((band, i) => {
          const y = TOP + i * ROW_H
          const x = TRACK_X + band.start * TRACK_W
          const w = TRACK_W - band.start * TRACK_W - (band.optional ? 26 : 0)

          return (
            <g key={band.label}>
              {/* Row guide — shows the span a band did NOT occupy */}
              <line
                x1={TRACK_X}
                x2={TRACK_X + TRACK_W}
                y1={y + BAR_H / 2}
                y2={y + BAR_H / 2}
                stroke="#0a0a0a"
                strokeOpacity={0.09}
                strokeDasharray="2 4"
              />

              <text
                x={TRACK_X - 12}
                y={y + BAR_H / 2 + 4}
                textAnchor="end"
                className="fill-ink font-mono text-[10px] uppercase"
                style={{ letterSpacing: '0.16em' }}
              >
                {band.label}
              </text>

              <motion.rect
                x={x}
                y={y}
                height={BAR_H}
                rx={BAR_H / 2}
                fill={band.optional ? 'transparent' : '#0a0a0a'}
                fillOpacity={band.optional ? 0 : 0.92 - i * 0.18}
                stroke={band.optional ? '#0a0a0a' : 'none'}
                strokeOpacity={band.optional ? 0.28 : 0}
                strokeDasharray={band.optional ? '4 4' : undefined}
                initial={reduce ? { opacity: 0, width: w } : { width: 0 }}
                whileInView={{ width: w, opacity: 1 }}
                viewport={VIEWPORT_TIGHT}
                transition={{
                  duration: reduce ? 0 : 0.75,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : 0.25 + i * 0.22,
                }}
              />

              {/* Start / Stop glyphs sit ON the band that carries them, which
                  is how the two axes of the protocol meet in one picture. */}
              {i === 0 && (
                <>
                  <ProtocolGlyph x={x + 26} y={y + BAR_H / 2} kind="start" delay={1.0} />
                  <ProtocolGlyph x={x + 62} y={y + BAR_H / 2} kind="stop" delay={1.12} />
                </>
              )}
              {i === 1 && <ProtocolGlyph x={x + 26} y={y + BAR_H / 2} kind="start" delay={1.24} />}
            </g>
          )
        })}

        {/* ── Continue: the floor the three phases stand on ───────────────── */}
        <text
          x={TRACK_X - 12}
          y={CONTINUE_Y + 12}
          textAnchor="end"
          className="fill-ink/60 font-mono text-[10px] uppercase"
          style={{ letterSpacing: '0.16em' }}
        >
          Continue
        </text>
        <motion.rect
          x={TRACK_X}
          y={CONTINUE_Y}
          height={16}
          rx={8}
          fill="rgb(var(--g1))"
          fillOpacity={0.55}
          initial={reduce ? { opacity: 0, width: TRACK_W } : { width: 0 }}
          whileInView={{ width: TRACK_W, opacity: 1 }}
          viewport={VIEWPORT_TIGHT}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
        />

        {/* ── Direction of travel, without claiming a duration ─────────────── */}
        <g transform={`translate(${TRACK_X}, ${CONTINUE_Y + 42})`}>
          <line
            x1={0}
            x2={TRACK_W - 8}
            y1={0}
            y2={0}
            stroke="#0a0a0a"
            strokeOpacity={0.18}
          />
          <path
            d={`M${TRACK_W - 9} -3.5 L${TRACK_W} 0 L${TRACK_W - 9} 3.5 Z`}
            fill="#0a0a0a"
            fillOpacity={0.28}
          />
          <text x={0} y={18} className="fill-ink/45 text-[11px]">
            at your pace — no fixed calendar
          </text>
        </g>
      </svg>
      </div>

      <figcaption className="mt-5 space-y-1.5">
        {BANDS.map((b) => (
          <p key={b.label} className="text-[12.5px] leading-snug text-ink-muted">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/50">
              {b.label}
            </span>
            <span className="mx-2 text-ink/25">·</span>
            {b.note}
          </p>
        ))}
        <p className="text-[12.5px] leading-snug text-ink-muted">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/50">
            Continue
          </span>
          <span className="mx-2 text-ink/25">·</span>
          What is already working for you — protected the whole way through, not
          replaced for the sake of it.
        </p>
      </figcaption>
    </figure>
  )
}

/** A small + / − marker for Start and Stop, drawn onto a band. */
function ProtocolGlyph({
  x,
  y,
  kind,
  delay,
}: {
  x: number
  y: number
  kind: 'start' | 'stop'
  delay: number
}) {
  const reduce = useReducedMotion()
  // Opacity only. A `scale` animation here needs transform-origin in user units
  // on an SVG <g>, which resolved inconsistently between two instances of the
  // same figure on one page — one lost its glyphs entirely. A fade cannot fail
  // that way and reads the same at this size.
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_TIGHT}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE_OUT, delay: reduce ? 0 : delay }}
    >
      <circle cx={x} cy={y} r={8.5} fill="#ffffff" fillOpacity={0.22} />
      <circle cx={x} cy={y} r={8.5} stroke="#ffffff" strokeOpacity={0.7} fill="none" />
      <line x1={x - 3.5} x2={x + 3.5} y1={y} y2={y} stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" />
      {kind === 'start' && (
        <line x1={x} x2={x} y1={y - 3.5} y2={y + 3.5} stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" />
      )}
    </motion.g>
  )
}
