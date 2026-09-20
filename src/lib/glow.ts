// Soft colour glows without `filter: blur()`.
//
// Radial profile of a 320px disc after `filter: blur(80px)` (sigma 80), sampled
// every 40px from the centre out to r=400 where it reaches zero — computed by
// integrating the Gaussian over the disc, not eyeballed. Fed to a closest-side
// radial-gradient on an 800px box, the 11 linear stops sit within ~1/255 alpha
// of the real blur at every radius.
//
// Why: Safari re-blurs or re-composites a filtered element on every frame a
// section changes height, and the content painted over it gets promoted into
// its own layer and repainted too — the largest single cost behind accordion
// jank on iPhone. A plain background gradient has none of that. Scale the box
// (disc × 2.5) to reproduce a smaller disc / blur pair.
const GLOW_PROFILE = [0.865, 0.831, 0.731, 0.576, 0.397, 0.232, 0.113, 0.045, 0.015, 0.004, 0]

export function glow(rgb: string, opacity: number) {
  const stops = GLOW_PROFILE.map((v, i) => `rgb(${rgb} / ${(v * opacity).toFixed(3)}) ${i * 10}%`)
  return `radial-gradient(circle closest-side, ${stops.join(', ')})`
}
