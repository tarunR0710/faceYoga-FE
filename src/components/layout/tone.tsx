import type { ReactNode } from 'react'

/**
 * Section tone wrapper.
 *
 * Backgrounds are deliberately NOT set inside section components — they are
 * assigned once, in `app/page.tsx`, so the whole page rhythm can be re-tuned or
 * dropped by editing one map instead of 23 files. (Learned the hard way: the
 * previous theme trial scattered tone classes across every section and took a
 * 12-file edit to undo.)
 *
 * base — plain ground, the default
 * wash — the pricing-card gradient at 10–13%, the quiet alternator
 * glow — the same gradient at 22–28%, for the two attention moments
 * deep — the gradient inverted; re-scopes the role tokens so children invert
 */
export type ToneName = 'base' | 'wash' | 'glow' | 'deep'

const TONE_CLASS: Record<ToneName, string> = {
  base: '',
  wash: 'tone-wash',
  glow: 'tone-glow',
  deep: 'tone-deep',
}

export function Tone({ tone, children }: { tone: ToneName; children: ReactNode }) {
  const cls = TONE_CLASS[tone]
  // `base` needs no wrapper element at all.
  return cls ? <div className={cls}>{children}</div> : <>{children}</>
}
