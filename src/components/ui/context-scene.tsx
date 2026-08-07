'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT } from '@/lib/motion'

export type SceneId = 'goals' | 'skincare' | 'routine' | 'lifestyle' | 'environment' | 'context'

/**
 * One clean line-art scene per context topic, drawn on the pricing-card gradient.
 *
 * Deliberately illustration rather than photography: every stock option for
 * these six topics was either clinical (gloved hands, instruments — which the
 * blueprint bans), a competitor's product, or plainly off-topic. Line art is
 * on-palette, carries the meaning better, and a real brand photograph can be
 * layered behind it later without touching this file.
 *
 * Rules kept throughout: strokes and fills are `currentColor` at low opacity,
 * shapes are built from primitives (no hand-tuned arc flags that can render
 * wrong), and only two or three elements ever drift. Blueprint motion rules:
 * slow reveals, nothing bouncing, nothing neon.
 */

const DRAW = { duration: 0.9, ease: EASE_OUT_SOFT } as const

/** A stroked path that draws itself in. */
function Stroke({
  d,
  i = 0,
  o = 0.5,
  w = 1.6,
  reduce,
  cap = 'round',
}: {
  d: string
  i?: number
  o?: number
  w?: number
  reduce: boolean
  cap?: 'round' | 'butt'
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={w}
      strokeOpacity={o}
      strokeLinecap={cap}
      strokeLinejoin="round"
      initial={reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ ...DRAW, delay: reduce ? 0 : 0.12 + i * 0.11 }}
    />
  )
}

/** A filled shape that fades and settles in. */
function Fill({
  children,
  i = 0,
  reduce,
}: {
  children: React.ReactNode
  i?: number
  reduce: boolean
}) {
  return (
    <motion.g
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: reduce ? 0 : 0.2 + i * 0.1 }}
      style={{ originX: '160px', originY: '200px' }}
    >
      {children}
    </motion.g>
  )
}

/** Slow horizontal drift — clouds only, and never under reduced motion. */
function Drift({
  children,
  amount = 7,
  duration = 9,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode
  amount?: number
  duration?: number
  delay?: number
  reduce: boolean
}) {
  if (reduce) return <>{children}</>
  return (
    <motion.g
      animate={{ x: [0, amount, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.g>
  )
}

function Scene({ id, reduce }: { id: SceneId; reduce: boolean }) {
  switch (id) {
    // Goals — rings closing on one point. What you want, brought to a centre.
    case 'goals':
      return (
        <>
          <Stroke reduce={reduce} i={0} o={0.16} w={1.4} d="M160 108a92 92 0 1 0 .1 0" />
          <Stroke reduce={reduce} i={1} o={0.26} d="M160 138a62 62 0 1 0 .1 0" />
          <Stroke reduce={reduce} i={2} o={0.4} d="M160 168a32 32 0 1 0 .1 0" />
          <Stroke reduce={reduce} i={3} o={0.5} d="M70 300 L150 210" />
          <Stroke reduce={reduce} i={4} o={0.5} d="M150 210 l-2 20 M150 210 l20 -2" />
          <Fill reduce={reduce} i={4}>
            <circle cx="160" cy="200" r="7" fill="currentColor" fillOpacity="0.85" />
          </Fill>
        </>
      )

    // Skincare history — what you have used, along a timeline, building up.
    case 'skincare':
      return (
        <>
          <Stroke reduce={reduce} i={0} o={0.22} w={1.4} d="M50 268 H270" />
          {[
            { x: 78, s: 0.62, o: 0.2 },
            { x: 130, s: 0.78, o: 0.32 },
            { x: 186, s: 0.94, o: 0.46 },
            { x: 242, s: 1.12, o: 0.62 },
          ].map((d, k) => (
            <Fill key={d.x} reduce={reduce} i={k}>
              <g transform={`translate(${d.x} ${268 - 46 * d.s}) scale(${d.s})`}>
                <path
                  d="M0 -30 C 14 -10 22 2 22 12 A 22 22 0 0 1 -22 12 C -22 2 -14 -10 0 -30 Z"
                  fill="currentColor"
                  fillOpacity={d.o}
                />
              </g>
              <circle cx={d.x} cy={268} r="3" fill="currentColor" fillOpacity="0.5" />
            </Fill>
          ))}
        </>
      )

    // Daily routine — one sun crossing one day, morning to evening.
    case 'routine':
      return (
        <>
          <Stroke reduce={reduce} i={0} o={0.22} w={1.4} d="M44 274 H276" />
          <Stroke reduce={reduce} i={1} o={0.38} d="M56 274 Q160 92 264 274" />
          <Stroke reduce={reduce} i={2} o={0.3} d="M56 274 v14 M160 274 v14 M264 274 v14" />
          <Fill reduce={reduce} i={2}>
            <circle cx="160" cy="140" r="26" fill="currentColor" fillOpacity="0.2" />
            <circle
              cx="160"
              cy="140"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.6"
            />
          </Fill>
        </>
      )

    // Lifestyle — water, sleep, the rhythm underneath everything.
    case 'lifestyle':
      return (
        <>
          <Fill reduce={reduce} i={0}>
            {/* crescent as one path — two arcs, no mask to go wrong */}
            <path
              d="M12 3a9 9 0 1 0 9 9c-4.97 0-9-4.03-9-9z"
              transform="translate(196 74) scale(3.6)"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </Fill>
          <Stroke reduce={reduce} i={1} o={0.45} d="M46 224 q34 -22 68 0 t68 0 t68 0" />
          <Stroke reduce={reduce} i={2} o={0.32} d="M46 256 q34 -22 68 0 t68 0 t68 0" />
          <Stroke reduce={reduce} i={3} o={0.2} d="M46 288 q34 -22 68 0 t68 0 t68 0" />
        </>
      )

    // Environment — the weather you actually live in. The showpiece.
    case 'environment':
      return (
        <>
          <Fill reduce={reduce} i={0}>
            <circle cx="212" cy="128" r="30" fill="currentColor" fillOpacity="0.22" />
          </Fill>
          <Stroke reduce={reduce} i={0} o={0.42} d="M212 82 v-16 M258 128 h16" />
          <Stroke reduce={reduce} i={1} o={0.28} d="M245 95 l11 -11 M245 161 l11 11" />

          {/* clouds — filled primitives so no internal outlines ever show */}
          <Drift reduce={reduce} amount={8} duration={11}>
            <Fill reduce={reduce} i={2}>
              <g fill="currentColor" opacity="0.3">
                <circle cx="112" cy="176" r="30" />
                <circle cx="150" cy="166" r="38" />
                <circle cx="192" cy="180" r="26" />
                <rect x="112" y="176" width="80" height="30" rx="15" />
              </g>
            </Fill>
          </Drift>
          <Drift reduce={reduce} amount={-6} duration={14} delay={0.6}>
            <Fill reduce={reduce} i={3}>
              <g fill="currentColor" opacity="0.16">
                <circle cx="82" cy="238" r="22" />
                <circle cx="112" cy="230" r="28" />
                <circle cx="144" cy="240" r="19" />
                <rect x="82" y="238" width="62" height="22" rx="11" />
              </g>
            </Fill>
          </Drift>

          <Stroke reduce={reduce} i={4} o={0.35} d="M120 290 l-8 22" />
          <Stroke reduce={reduce} i={5} o={0.28} d="M156 296 l-8 22" />
          <Stroke reduce={reduce} i={6} o={0.2} d="M192 290 l-8 22" />
        </>
      )

    // Personal context — you at the centre, everything else arranged around you.
    case 'context':
    default:
      return (
        <>
          {[46, 78, 110, 142].map((r, k) => (
            <Stroke
              key={r}
              reduce={reduce}
              i={k}
              o={0.34 - k * 0.06}
              w={1.5}
              d={`M${160 - r} 200 A ${r} ${r} 0 0 1 ${160 + r} 200`}
            />
          ))}
          <Stroke reduce={reduce} i={4} o={0.22} w={1.4} d="M18 200 H302" />
          <Fill reduce={reduce} i={4}>
            <circle cx="160" cy="200" r="9" fill="currentColor" fillOpacity="0.85" />
          </Fill>
        </>
      )
  }
}

export function ContextScene({ id, className = '' }: { id: SceneId; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div
      className={`overflow-hidden rounded-[22px] ${className}`}
      style={{
        background:
          'radial-gradient(90% 70% at 82% 8%, rgb(var(--g1, 107 233 255) / .30) 0%, transparent 62%), linear-gradient(150deg, rgb(var(--g1, 107 233 255) / .22) 0%, rgb(var(--g2, 105 180 255) / .30) 52%, rgb(var(--g3, 140 236 255) / .20) 100%), rgb(var(--c-surface))',
      }}
    >
      <svg
        viewBox="0 0 320 400"
        className="h-full w-full text-accent"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {/* keyed so switching topic re-runs the draw-in from scratch */}
        <g key={id}>
          <Scene id={id} reduce={!!reduce} />
        </g>
      </svg>
    </div>
  )
}
