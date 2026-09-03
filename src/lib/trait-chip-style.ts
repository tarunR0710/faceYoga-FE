import { Heart, Sparkle, Sparkles, Star, Smile, type LucideIcon } from 'lucide-react'

export const TRAIT_CHIP_ICONS: LucideIcon[] = [Sparkles, Heart, Star, Sparkle, Smile]

// One small hue per chip — the single deliberate exception to the site's
// achromatic rule, scoped to the CLOSE section's trait chips only. Do not
// reuse these classes elsewhere; everything else on the page stays monochrome.
export const TRAIT_CHIP_HUES = [
  { icon: 'text-violet-500', ring: 'ring-violet-500/15' },
  { icon: 'text-rose-500', ring: 'ring-rose-500/15' },
  { icon: 'text-emerald-500', ring: 'ring-emerald-500/15' },
  { icon: 'text-amber-500', ring: 'ring-amber-500/15' },
  { icon: 'text-sky-500', ring: 'ring-sky-500/15' },
] as const
