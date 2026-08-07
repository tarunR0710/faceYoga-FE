'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Quote, Video, UserCheck, ScrollText } from 'lucide-react'
import { REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'

/**
 * The blueprint specifies three testimonial *slots* and a brief for each — not
 * quotes. Nothing is invented here on purpose: the blueprint requires genuine
 * beta-client feedback, given with permission, presented transparently as beta
 * feedback. Drop real approved words into `quote` and flip PLACEHOLDER to false.
 */
const slots = [
  {
    icon: UserCheck,
    brief: 'A verified quote about the clarity created by the Face Mapping Session.',
    /** Editorial brief for whoever collects this quote — NOT display copy. */
    guidance: "The client's real words after approval. First name, age range and city only with consent.",
    quote: null as string | null,
    attribution: null as string | null,
  },
  {
    icon: ScrollText,
    brief: 'A verified quote about what the client learned from their Face Map.',
    guidance:
      'Strong feedback explains the previous confusion, the insight received and what the client followed.',
    quote: null as string | null,
    attribution: null as string | null,
  },
  {
    icon: Video,
    brief: 'A verified quote about the usefulness of the Appearance Protocol.',
    guidance: 'Video is prioritised when the client is comfortable appearing publicly.',
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

        <CardRail cols={3} label="Beta client experiences">
          {slots.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.figure
                key={s.brief}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i) }}
                className="flex min-h-[280px] flex-col rounded-[22px] border border-border/60 bg-mist p-5 md:p-6"
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                    <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.7} />
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-analysis-teal md:text-[9.5px]">
                    MapMyFace beta client
                  </span>
                </div>

                <Quote className="mb-3 h-5 w-5 text-accent/30" strokeWidth={1.6} />

                {s.quote ? (
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/80">
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                ) : (
                  <div className="flex-1">
                    <p className="accent-italic text-[15px] leading-relaxed text-ink/45 md:text-[16px]">
                      {s.brief}
                    </p>
                    {/* the shape a real quote will take, so the layout is already right */}
                    <div className="mt-4 space-y-2" aria-hidden>
                      {[100, 88, 94, 62].map((w, k) => (
                        <div
                          key={k}
                          className="h-[5px] rounded-full bg-ink/[0.06]"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <figcaption className="mt-5 border-t border-border pt-4">
                  {s.attribution ? (
                    <p className="text-[13px] font-medium text-ink">{s.attribution}</p>
                  ) : (
                    <span className="inline-flex h-5 items-center rounded-full bg-white px-2 text-[8.5px] font-medium uppercase tracking-[0.1em] text-ink/45">
                      Awaiting verified feedback
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            )
          })}
        </CardRail>
      </div>
    </section>
  )
}
