'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FACIAL_EXPERTISE } from '@/lib/content'

const VISUAL_WASH = 'linear-gradient(160deg,rgba(173,199,206,.4) 0%,rgba(247,244,239,.6) 55%,#ffffff 100%)'

/**
 * Four visual proofs that a person does the reading, not an algorithm.
 *
 * The section header is the site's own standard heading — only the four
 * cards below follow design handoff turn 18a exactly ("Mobile section — the
 * four cards stacked at one shared size"): one geometry for all four — a
 * 260px visual zone on top, then a plain white text block below (22px
 * radius, same padding, same 21px/14px type) — in the order session ->
 * understanding -> what's looked at -> review, so the eye reads one rhythm
 * scrolling down instead of four different card shapes.
 */
export function FacialExpertise() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={FACIAL_EXPERTISE.eyebrow}
          title={FACIAL_EXPERTISE.title}
          muted={FACIAL_EXPERTISE.muted}
          lede={FACIAL_EXPERTISE.lede}
        />

        <div className="mx-auto flex max-w-[420px] flex-col gap-6">
          <LiveSessionCard />
          <OrbitCard />
          <AnalysisCard />
          <ReviewedCard />
        </div>
      </div>
    </section>
  )
}

function CardShell({ visual, title, text }: { visual: React.ReactNode; title: string; text: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] bg-white"
      style={{ border: '1px solid rgba(61,107,118,.1)', boxShadow: '0 18px 48px -30px rgba(44,79,88,.14)', isolation: 'isolate' }}
    >
      <div className="relative overflow-hidden" style={{ height: 260, background: VISUAL_WASH }}>
        {visual}
      </div>
      <div className="relative flex flex-col gap-2 bg-white" style={{ padding: '18px 22px 22px' }}>
        {/* Same voice as every other card title on the page (Full Picture,
            How It Works): light weight, ink, tight tracking — not a bold
            dark heading. */}
        <h3 className="text-[19px] leading-[1.15] tracking-[-0.02em] text-ink" style={{ fontWeight: 300 }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#5C7278' }}>{text}</p>
      </div>
    </div>
  )
}

// ── 1. Live expert session ───────────────────────────────────────────────────
function LiveSessionCard() {
  const { title, text, tag } = FACIAL_EXPERTISE.live

  return (
    <CardShell
      title={title}
      text={text}
      visual={
        <div className="group absolute inset-0">
          <div
            className="absolute inset-0 transition-transform duration-[1600ms] ease-in-out group-hover:scale-[1.015]"
            style={{ transformOrigin: '50% 30%' }}
          >
            <Image
              src="/session-live.webp"
              alt="A live video call between a client and a specialist, mid-conversation"
              fill
              sizes="420px"
              className="object-cover"
              style={{ objectPosition: '50% 8%' }}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'rgba(173,199,206,.35)', mixBlendMode: 'color' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0) 60%,rgba(255,255,255,.9) 100%)' }}
          />
          <div
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full backdrop-blur-[10px]"
            style={{
              padding: '6px 11px 6px 9px',
              background: 'rgba(255,255,255,.8)',
              border: '1px solid rgba(61,107,118,.16)',
              fontSize: '10.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#2C4F58',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="relative h-[7px] w-[7px]">
              <span className="absolute inset-0 rounded-full" style={{ background: '#3D6B76' }} />
              <span className="animate-pulse-ring absolute inset-0 rounded-full" style={{ background: '#3D6B76' }} />
            </span>
            {tag}
          </div>
        </div>
      }
    />
  )
}

// ── 2. Feature-level understanding — orbiting pills ─────────────────────────
function OrbitCard() {
  const { items, title, text } = FACIAL_EXPERTISE.orbit
  const reduce = useReducedMotion()
  const radius = 98

  return (
    <CardShell
      title={title}
      text={text}
      visual={
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Decorative dot-grid only — this is what the radial mask should
              fade out at the edges. It must NOT share an element with the
              pills/coin below: a mask on a parent fades its whole subtree,
              which was silently dimming the orbiting pills themselves. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(61,107,118,.18) 1px,transparent 1px)',
              backgroundSize: '18px 18px',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%,#000 30%,transparent 75%)',
              maskImage: 'radial-gradient(circle at 50% 50%,#000 30%,transparent 75%)',
            }}
          />
          <div
            className="absolute rounded-full border border-dashed"
            style={{ width: radius * 2, height: radius * 2, borderColor: 'rgba(61,107,118,.3)' }}
          />
          <div className={reduce ? 'absolute' : 'absolute animate-orbit'} style={{ width: radius * 2, height: radius * 2 }}>
            {items.map((label, i) => {
              const angle = (360 / items.length) * i
              return (
                <span
                  key={label}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                >
                  <span className="absolute left-0 top-0 h-0 w-0" style={{ transform: `rotate(${-angle}deg)` }}>
                    <span className={`absolute left-0 top-0 h-0 w-0 ${reduce ? '' : 'animate-orbit-r'}`}>
                      <span
                        className="absolute left-0 top-0 whitespace-nowrap rounded-full"
                        style={{
                          transform: 'translate(-50%,-50%)',
                          padding: '6px 12px',
                          background: 'rgba(255,255,255,.78)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(61,107,118,.16)',
                          boxShadow: '0 10px 24px -14px rgba(44,79,88,.4)',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#2C4F58',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {label}
                      </span>
                    </span>
                  </span>
                </span>
              )
            })}
          </div>
          <div
            className={`flex items-center justify-center rounded-full ${reduce ? '' : 'animate-breathe'}`}
            style={{
              width: 68,
              height: 68,
              background: 'linear-gradient(135deg,#5E8E9A,#2C4F58)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 0 0 7px rgba(173,199,206,.35), 0 20px 40px -16px rgba(44,79,88,.5)',
            }}
          >
            <span
              aria-hidden="true"
              className="block"
              style={{
                width: 36,
                height: 36,
                background: '#fff',
                WebkitMask: "url('/logo-mark.png') center / contain no-repeat",
                mask: "url('/logo-mark.png') center / contain no-repeat",
              }}
            />
          </div>
        </div>
      }
    />
  )
}

// ── 3. What the expert looks at — auto-scrolling checklist ──────────────────
function AnalysisCard() {
  const { items, title, text } = FACIAL_EXPERTISE.analysis
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [active, setActive] = useState(0)
  const rowHeight = 60

  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 1900)
    return () => clearInterval(id)
  }, [inView, reduce, items.length])

  return (
    <CardShell
      title={title}
      text={text}
      visual={
        <div ref={ref} className="absolute inset-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-8 h-[200px] w-[200px] rounded-full opacity-45 blur-[50px]"
            style={{ background: '#ADC7CE' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-12 h-[180px] w-[180px] rounded-full opacity-35 blur-[50px]"
            style={{ background: '#E6C9AF' }}
          />
          <div
            className="absolute inset-x-[22px] overflow-hidden"
            style={{
              top: 14,
              bottom: 14,
              WebkitMaskImage: 'linear-gradient(180deg,transparent 0%,#000 18%,#000 82%,transparent 100%)',
              maskImage: 'linear-gradient(180deg,transparent 0%,#000 18%,#000 82%,transparent 100%)',
            }}
          >
            <div
              className="flex flex-col gap-2"
              style={{
                // Shifts by (active - 1), not active: the active row lands in
                // the SECOND visible slot, with the previous row still
                // peeking in above it (faded by the top mask) — matching the
                // handoff's own spec ("the active row always lands in slot
                // 2"). Landing it in slot 1 left nothing for the top fade to
                // do, which is why the card read as flatter than the design.
                transform: reduce ? undefined : `translateY(-${Math.max(0, active - 1) * rowHeight}px)`,
                transition: 'transform 600ms cubic-bezier(.2,.7,.2,1)',
              }}
            >
              {items.map((label, i) => {
                const isActive = i === active
                const passed = i < active
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-[14px] px-3"
                    style={{
                      height: 52,
                      background: isActive ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.4)',
                      border: `1px solid ${isActive ? 'rgba(61,107,118,.2)' : 'rgba(61,107,118,.08)'}`,
                      boxShadow: isActive ? '0 10px 24px -16px rgba(44,79,88,.4)' : 'none',
                      opacity: isActive ? 1 : 0.65,
                      transform: `scale(${isActive ? 1 : 0.97})`,
                      transition: 'all 600ms cubic-bezier(.2,.7,.2,1)',
                    }}
                  >
                    <span
                      className="h-9 w-9 shrink-0 rounded-[10px]"
                      style={{ background: isActive ? 'rgba(61,107,118,.16)' : 'rgba(61,107,118,.08)' }}
                    />
                    <span
                      className="flex-1 truncate text-[14px] tracking-[-0.01em]"
                      style={{ fontWeight: isActive ? 500 : 400, color: isActive ? '#1E353B' : '#7E959B' }}
                    >
                      {label}
                    </span>
                    <span className="relative h-4 w-4 shrink-0">
                      {passed ? (
                        <Check className="h-4 w-4" style={{ color: '#3D6B76' }} strokeWidth={2.4} />
                      ) : (
                        <span
                          className="block h-1.5 w-1.5 rounded-full"
                          style={{ background: isActive ? '#ADC7CE' : 'rgba(61,107,118,.25)' }}
                        />
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      }
    />
  )
}

// ── 4. Reviewed by a person — drifting report preview ───────────────────────
function ReviewedCard() {
  const { title, text, tiles, rangeValue, rangeFrom, rangeTo, forehead, signoff } = FACIAL_EXPERTISE.reviewed

  return (
    <CardShell
      title={title}
      text={text}
      visual={
        <div className="absolute inset-0">
          <div
            className="animate-review-drift absolute flex flex-col gap-2"
            style={{ left: 14, right: 14, top: 14 }}
          >
            <ReportPanel>
              <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Summary of <span style={{ fontWeight: 400, color: '#7E959B' }}>your jaw</span>
              </span>
              <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                {tiles.map(([label, value], i) => (
                  <ReportTile key={label} label={label} value={value} strong={i % 3 === 0} delay={0.1 + i * 0.1} />
                ))}
              </div>
            </ReportPanel>

            <ReportPanel>
              <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Where you sit <span style={{ fontWeight: 400, color: '#7E959B' }}>today</span>
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2C4F58' }}>{rangeValue}</span>
              <div className="relative" style={{ height: 18 }}>
                <div className="absolute inset-x-0 rounded-full" style={{ top: 8, height: 2, background: 'rgba(61,107,118,.25)' }} />
                <div className="absolute rounded-full" style={{ left: '30%', right: '30%', top: 8, height: 2, background: 'rgba(61,107,118,.6)' }} />
                <div
                  className="animate-range-marker absolute rounded-[3px]"
                  style={{ top: 1, width: 8, height: 16, background: '#3D6B76', boxShadow: '0 2px 6px rgba(44,79,88,.35)' }}
                />
                <span className="absolute left-0" style={{ top: 14, fontSize: '8.5px', color: '#5C7278' }}>{rangeFrom}</span>
                <span className="absolute right-0" style={{ top: 14, fontSize: '8.5px', color: '#5C7278' }}>{rangeTo}</span>
              </div>
            </ReportPanel>

            <ReportPanel>
              <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Analysis of your <span style={{ fontWeight: 400, color: '#7E959B' }}>forehead</span>
              </span>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {forehead.tiles.map(([label, value], i) => (
                  <ReportTile key={label} label={label} value={value} strong={i === 2} delay={0.5 + i * 0.1} small />
                ))}
              </div>
            </ReportPanel>
          </div>

          <div
            aria-hidden="true"
            className="animate-scan pointer-events-none absolute"
            style={{ left: 14, right: 14, height: 70, background: 'linear-gradient(180deg,rgba(173,199,206,0),rgba(173,199,206,.35) 50%,rgba(173,199,206,0))' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0) 22%,rgba(255,255,255,.94) 58%,#ffffff 100%)' }}
          />

          <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5">
            <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
              <span
                aria-hidden="true"
                className="animate-pulse-ring absolute inset-0 rounded-full"
                style={{ background: 'rgba(61,107,118,.18)' }}
              />
              <span
                className="absolute inset-0 rounded-full backdrop-blur-[10px]"
                style={{ background: 'rgba(173,199,206,.3)', border: '1px solid rgba(61,107,118,.25)' }}
              />
              <span
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 46,
                  height: 46,
                  background: 'linear-gradient(135deg,#5E8E9A,#2C4F58)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 14px 30px -12px rgba(44,79,88,.5)',
                }}
              >
                <Check className="h-[22px] w-[22px] text-white" strokeWidth={2.2} />
              </span>
            </div>
            <span
              className="inline-flex items-center gap-2 rounded-full whitespace-nowrap"
              style={{
                padding: '6px 11px 6px 7px',
                background: 'rgba(255,255,255,.85)',
                border: '1px solid rgba(61,107,118,.16)',
                backdropFilter: 'blur(8px)',
                fontSize: '11.5px',
                color: '#2C4F58',
              }}
            >
              <span className="h-5 w-5 rounded-full" style={{ background: 'linear-gradient(135deg,#E6C9AF,#C9A98A)' }} />
              {signoff}
            </span>
          </div>
        </div>
      }
    />
  )
}

function ReportPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-2.5 rounded-[14px] backdrop-blur-[10px]"
      style={{ background: 'rgba(255,255,255,.72)', border: '1px solid rgba(61,107,118,.12)', padding: 12 }}
    >
      {children}
    </div>
  )
}

function ReportTile({
  label,
  value,
  strong = false,
  small = false,
  delay = 0,
}: {
  label: string
  value: string
  strong?: boolean
  small?: boolean
  delay?: number
}) {
  return (
    <div
      className="animate-rise flex flex-col justify-between gap-3 rounded-[12px]"
      style={{
        background: strong ? 'rgba(173,199,206,.45)' : 'rgba(173,199,206,.18)',
        border: `1px solid rgba(61,107,118,${strong ? '.14' : '.1'})`,
        padding: '10px 11px 9px',
        minHeight: 60,
        animationDelay: `${delay}s`,
      }}
    >
      <span
        className="truncate"
        style={{ fontSize: small ? '9px' : '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7E959B' }}
      >
        {label}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: strong ? '#1E353B' : '#2C4F58' }}>{value}</span>
    </div>
  )
}
