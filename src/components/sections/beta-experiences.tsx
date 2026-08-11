'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { UserCheck, ScrollText, Video } from 'lucide-react'
import { REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'
import { MEDIA, PLACEHOLDER } from '@/lib/showcase'

/**
 * The blueprint specifies three testimonial slots here and requires genuine
 * beta-client feedback, given with permission, labelled as beta. There are no
 * clients yet — so the slots carry a WRITTEN-OUT sample of the note each one
 * will hold, and the panel beside them says plainly that none of it is real.
 *
 * That is the honest way to fill the space, and it is also the better-looking
 * one: empty skeleton bars read as a broken page, while a sample that is
 * labelled reads as a standard being set.
 *
 * TO GO LIVE: put the client's approved words in `quote` and their attribution
 * in `attribution`. The sample and its badge disappear on their own.
 */
const slots = [
  {
    icon: UserCheck,
    stage: 'The session',
    /** Illustrative only — never presented as a client's words. */
    sample:
      'I came in with a list of things I disliked about my face. The expert spent the first ten minutes on what it already does well, and everything after that made sense.',
    /** The shape the real credit will take, so the layout is already right. */
    shape: 'First name, city — after the Face Mapping Session',
    quote: null as string | null,
    attribution: null as string | null,
  },
  {
    icon: ScrollText,
    stage: 'The Face Map',
    sample:
      'For two years I copied routines built for a completely different face. The Map was the first thing that told me which half of that advice was never meant for me.',
    shape: 'First name, city — after reading their Face Map',
    quote: null as string | null,
    attribution: null as string | null,
  },
  {
    icon: Video,
    stage: 'The Appearance Protocol',
    sample:
      'Start, stop, continue. I stopped four products in the first week and my mornings got shorter, not worse.',
    shape: 'First name, city — six weeks into their Protocol',
    quote: null as string | null,
    attribution: null as string | null,
  },
]

export function BetaExperiences() {
  const reduce = useReducedMotion()

  return (
    <section id="beta-experiences" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Beta client experiences"
          title="Early experiences with"
          muted="the MapMyFace process."
          note="Only genuine beta-client feedback, shared with permission and always labelled as beta."
        />

        <div className="grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          {/* ── The panel: our own words, not a client's ─────────────────── */}
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
            className="relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-[22px] bg-ink p-6 md:p-7"
          >
            <Image
              src={MEDIA.betaNote}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
              style={{ filter: 'saturate(0.5) contrast(1.04)' }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgb(var(--c-ink) / 0.5) 0%, rgb(var(--c-ink) / 0.58) 40%, rgb(var(--c-ink) / 0.93) 100%)',
              }}
            />

            {/* status — a readout, deliberately not a second pill */}
            <div className="relative mb-auto flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                {!reduce && (
                  <span
                    aria-hidden
                    className="animate-pulse-ring absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgb(255 255 255 / 0.5)' }}
                  />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-white/80" />
              </span>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55 md:text-[9.5px]">
                Beta cohort — open
              </p>
              {PLACEHOLDER && (
                <span className="ml-auto rounded-full bg-white/15 px-2 py-[2px] text-[7.5px] font-medium uppercase tracking-[0.1em] text-white/60">
                  Placeholder visual
                </span>
              )}
            </div>

            <blockquote className="relative mt-10">
              <span
                aria-hidden
                className="accent-italic block text-[46px] leading-[0.6] text-white/25"
              >
                &ldquo;
              </span>
              <p className="accent-italic mt-3 text-[21px] leading-[1.3] text-white md:text-[24px]">
                We would rather publish three honest sentences than thirty invented ones.
              </p>
            </blockquote>

            <figcaption className="relative mt-6 border-t border-white/15 pt-4">
              <p className="text-[12px] font-medium text-white/85">MapMyFace</p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-white/50 md:text-[12px]">
                The notes beside this show the shape a real one will take. Not one of them is a
                client yet — and we are not going to pretend otherwise.
              </p>
            </figcaption>
          </motion.figure>

          {/* ── The three slots ──────────────────────────────────────────── */}
          <CardRail cols={1} peek="lg" label="Beta client experiences">
            {slots.map((s, i) => {
              const Icon = s.icon
              const real = Boolean(s.quote)
              return (
                <motion.figure
                  key={s.stage}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...REVEAL, delay: stagger(i) }}
                  className="flex h-full flex-col rounded-[22px] border border-border/60 bg-mist p-5 md:p-6"
                >
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                      <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.7} />
                    </span>
                    {/* stays Manrope — card micro-labels across the page are not
                        mono, and the section tag above is the only pill here */}
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-analysis-teal md:text-[9.5px]">
                      {s.stage}
                    </span>
                    {!real && (
                      <span className="ml-auto shrink-0 rounded-full bg-accent-soft px-2 py-[2px] text-[8.5px] font-medium uppercase tracking-[0.1em] text-accent-foreground">
                        Sample
                      </span>
                    )}
                  </div>

                  {/* The rail stretches all three cards to the panel's height,
                      so the quote is centred in whatever is left rather than
                      leaving a hole above the credit. */}
                  <div className="flex flex-1 items-center">
                    <blockquote
                      className={`text-[15px] leading-relaxed md:text-[15.5px] ${
                        real ? 'text-ink/80' : 'text-ink/55'
                      }`}
                    >
                      &ldquo;{s.quote ?? s.sample}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-5 border-t border-border pt-3.5">
                    {real ? (
                      <p className="text-[13px] font-medium text-ink">{s.attribution}</p>
                    ) : (
                      <p className="text-[11.5px] text-ink/40">{s.shape}</p>
                    )}
                  </figcaption>
                </motion.figure>
              )
            })}
          </CardRail>
        </div>
      </div>
    </section>
  )
}
