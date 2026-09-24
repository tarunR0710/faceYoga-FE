# Homepage audit — what to cut, merge and reframe

_2026-09-22. Read against `src/app/page.tsx`, `src/lib/content.ts` and every section component._

---

## Verdict in three lines

1. The page renders **22 sections**. The comment at the top of `page.tsx` still says _"Twelve sections, where twenty-three stood."_ Phase 2 undid the Phase 1 consolidation, one well-reviewed addition at a time.
2. Sections **9 → 18 are ten consecutive sections answering the same buyer question**: _what do I get, and how do you think?_ That is the stretch a reader abandons.
3. Six sections can go or merge with no loss of information, because every claim in them is made somewhere else on the same page.

---

## Current order

| # | Section | Component | Content |
|---|---|---|---|
| 1 | Hero | `hero.tsx` | `HERO` |
| 2 | Trust bar | `trust-bar.tsx` | `HERO` |
| 3 | Proof — before / after | `proof.tsx` | `PROOF` |
| 4 | Stop following random advice | `problem.tsx` | `PROBLEM` |
| 5 | Why MapMyFace is different | `difference.tsx` | `DIFFERENCE` |
| 6 | Shaped by the full picture | `full-picture.tsx` | `FULL_PICTURE` |
| 7 | The plan | `plan.tsx` | `PLAN` |
| 8 | How we read your face | `facial-expertise.tsx` | `FACIAL_EXPERTISE` |
| | _— frozen above this line (founder call, 5 Sept) —_ | | |
| 9 | 400+ facial assessments | `what-we-map.tsx` | `WHAT_WE_MAP` |
| 10 | 100+ personal context factors | `context-factors.tsx` | `CONTEXT_FACTORS` |
| 11 | How it works | `journey.tsx` | `JOURNEY` |
| 12 | Your Face Map | `face-map.tsx` | `FACE_MAP_REPORT` |
| — | _Visual Direction — hidden 20 Sept_ | `visual-direction.tsx` | `VISUAL_DIRECTION` |
| 13 | Personalised guidance | `guidance.tsx` | `GUIDANCE` |
| 14 | Your Appearance Protocol | `protocol.tsx` | `PROTOCOL` |
| 15 | The people behind your Map | `believe.tsx` | `BELIEVE` |
| 16 | Built for your context | `context-fit.tsx` | `CONTEXT` |
| 17 | MapMyFace experiences | `experiences.tsx` | `EXPERIENCES` |
| 18 | Pricing | `pricing-preview.tsx` | `ADDON_DETAIL` |
| 19 | Money, honestly | `money.tsx` | `ANCHOR` |
| 20 | Built around something personal | `privacy-trust.tsx` | `PRIVACY_PATH` |
| 21 | FAQ | `faq.tsx` | `FAQ_V2` |
| 22 | Closing CTA | `cta.tsx` | `CLOSE` |

**Ten sections stand between the first Phase 2 section and the price.**

---

## 1 · Cut or merge

### Cut — _Your plan is shaped by the full picture_ (#6)

Fully absorbed by the 100+ context factors section three sections later.

Its five items are Your face & features · Your skin & routine · Your lifestyle · Your environment · Your goals & preferences. All five are groups inside the newer section, which covers the same ground in far more detail and with a better interaction.

> ⚠️ Sits inside the frozen Hero → Facial Expertise range. Needs the founder to unfreeze.

### Cut — _Your Appearance Protocol_ (#14) ✅ done 2026-09-22

It is a chapter of the section directly above it.

The Face Map section already lists the Appearance Protocol among its thirteen parts, and already names both **Start / Stop / Continue** and **First / Next / Later**. Showing the table of contents and then one of its chapters as a peer section is the clearest structural repetition on the page.

**Done.** Removed from `page.tsx` on 2026-09-22. The component and the `PROTOCOL` content remain in the repo, commented out at the call site, so it can be restored in one line. Nothing was lost: chapter 13 of the Face Map spread already shows Start / Stop / Continue and First / Next / Later against real example actions rather than abstract chip definitions.

### Merge — _Personalised guidance_ (#13) into the Face Map section (#12)

A third telling of "what the recommendations look like", after the Face Map's thirteen sections and the plan's includes list. Its four cards — Skincare, Products, Grooming, Face yoga + lifestyle — are already Face Map chapters.

**Keep the framing, drop the section.** The _"Not just: wear sunscreen"_ / _"Not just: change your beard"_ device is the best writing in this part of the page. Fold it into the Face Map section as one or two lines.

### Remove from the page — _MapMyFace experiences_ (#17)

Renders nothing. `EXPERIENCES.stories` is an empty array and the component returns null until a real consented story exists. Take it out of the page tree and put it back the day you have a story.

### Merge — _Built for your context_ (#16) beside the 100+ factors (#10) ✅ half done 2026-09-25

**Done, one half.** The section was rebuilt to design 43a on 2026-09-25 and now carries four scenario cards instead of three cities: Environment (all three cities behind a switch), Skin & routine, Lifestyle, Goals & preferences. Every card keeps the "what changes" payload, so it stays distinct from the 100+ section. **Still to do:** delete "What we take into account", whose five items this section now absorbs, and move this section up beside the 100+ factors. Both need the freeze lifted.

Both make the argument that context changes the plan, six sections apart.

- **#10** answers _what we ask you._
- **#16** answers _why the answer changes the plan._

Those are two halves of one argument, currently separated by four sections. Keep the weather cards — they are the better visual — and place them next to the factors so the case is made once, in one place. The _"We sell one thing. The Face Map."_ promise attached to #16 should stay immediately before pricing regardless of where the cards go.

### Trim — _The plan_ (#7)

_"Prioritised in the right order"_ arrives four sections after Proof says _"better decisions, in the right order"_, and before Protocol says it a third time. Its five rows (Analysis, Skin, Grooming, Order, Support) are a compressed version of the Face Map's thirteen. Either cut it or reduce it to the one line that is not said elsewhere.

> ⚠️ Also inside the frozen range.

---

## 2 · Claims stated too many times

Counted across the content blocks that are actually rendered.

| Claim | Times | Where |
|---|---|---|
| Not a scan / not an algorithm / no score | **6** | Hero, Facial Expertise, How It Works, Experts (philosophy + method), FAQ, Closing |
| Visual Direction | **7 blocks** | Context Factors, How It Works, Face Map ×7, Experiences, Add-ons ×3, Money, FAQ ×4 |
| 100+ context factors | **5** | What We Map, Context Factors, How It Works, Money, FAQ |
| Medical / surgical boundary | **4** | How It Works ("Where we stop"), Privacy, FAQ ×2, Closing |
| The four expert roles | **3** | Experts (photo cards), Privacy (access table), FAQ |
| First / Next / Later | **3** | How It Works, Face Map, Guidance |
| No products, no commission | **3** | Built for your context, Money, FAQ |
| 45–60 minute session | **3** | How It Works ×3, Money ×2, FAQ ×2 |

### What to do about each

- **"Not a scan"** — keep it in the Hero and in the philosophy tab. Cut it from How It Works, Facial Expertise and the closing block. A denial repeated six times reads as defensive.
- **Expert roles** — the privacy section's access table is now the third telling. See §3.
- **Medical boundary** — keep it in "Where we stop" (How It Works) and in the FAQ. Drop it from the privacy covenant and the closing block.
- **First / Next / Later** — belongs to the Face Map. Drop from Guidance (which is merging anyway) and shorten in How It Works.
- **45–60 minutes / 100+ / 400+** — these are fine to repeat; they are the offer's headline numbers and repetition is deliberate.

---

## 3 · The privacy section — _Built around something personal_ (#20) ✅ cut 2026-09-24

Four of its five blocks are stated elsewhere.

| Block | Also appears in |
|---|---|
| Access table (LE / SC / FA / MS) | The people behind your Map (photo cards), FAQ "Who actually sees my session and photographs?" |
| Covenant — marketing use | FAQ "Can my images be used publicly?" — near word for word |
| Covenant — medical boundary | "Where we stop" in How It Works, FAQ ×2 |
| Covenant — GST-inclusive total | Pricing card GST note, Money reassurance line, FAQ |
| Covenant — contact for deletion | FAQ "Can I have my data deleted?" |
| **Four-stage path of a photograph** | **Nothing else on the page or in the FAQ** |

It also sits immediately above a FAQ that has a category called **Privacy & photos**.

**Done — cut, with the unique block relocated (2026-09-24).** The section was removed from `page.tsx` and its one irreplaceable fact moved into the FAQ. A new first answer under **Privacy & photos** — _"What happens to my photographs?"_ — now carries the whole lifecycle: the encrypted connection, who opens them, how long they are held, and that one email deletes them. "Over an encrypted connection" appeared exactly once in the entire codebase, in this section, so it had to survive. The component and `PRIVACY_PATH` stay in the repo, commented out at the call site.

**Original recommendation, kept for the record — shrink, do not delete.** Keep the header and the four-stage path (_you share it → the team opens it → it is held → you can end it_), drop the access table and all four covenant lines, and close with one link to the privacy policy. Roughly a full screen becomes a third of one.

**Why not delete it.** This page asks people to upload photographs of their face. The section's own code comment makes the case: it is the one section deliberately given no tap-to-reveal, because putting a privacy promise behind a click is functionally the same as burying it in a policy page. Moving all of it into the FAQ does exactly that.

**Stale note to check.** The section ends with _"Exact retention period and the named grievance contact are published with our full data policy."_ The privacy page now appears to cover both retention and a grievance contact, so that line may be out of date.

---

## 4 · Housekeeping

### Sixteen dead content blocks

Defined in `src/lib/content.ts`, imported by nothing:

```
PILLARS · OUTCOME · METHOD · SESSION · CONTEXT_GROUPS · REVIEW
FACE_MAP · FACE_YOGA · METHODOLOGY · AUDIENCE · AFTER_PAYMENT
PRIVACY · FAQ_CONTENT · CLOSING · TRANSFORMATIONS · EVIDENCE
```

Roughly a third of the file. Not user-facing, but it is why `content.ts` is hard to edit safely — `FACE_MAP` and `FACE_MAP_REPORT`, `PRIVACY` and `PRIVACY_PATH`, `FAQ_CONTENT` and `FAQ_V2` all sit side by side with only one of each pair live.

### Other notes

- `src/lib/content.ts` is over 2,000 lines. Worth splitting once the dead blocks go.
- The `page.tsx` header comment describes a twelve-section page that no longer exists. It should be rewritten with the new order once the cuts land.

---

## 5 · Leave these alone

| Section | Why |
|---|---|
| Proof (#3) | The strongest thing on the page for a buyer, and correctly placed at position three. |
| 400+ / 100+ (#9, #10) | Recently rebuilt to designs 28a and 30c. Both earn their place. |
| How it works (#11) | Rebuilt to 31a. Now the shortest it has been. |
| The people behind your Map (#15) | Rebuilt to 38a / 42a. |
| Pricing (#18) and Money (#19) | Rebuilt to 33b, 34, then 37b. Doing real work. |
| FAQ (#21) | Seven categories, well organised, genuinely answers objections. |

---

## 6 · The one real gap

**There is no customer story.** The experiences section is an empty shell waiting for one, and no testimonial, quote or named result appears anywhere on the page.

That is worth more than every cut in this document combined, and it is blocked on the founder rather than on design. The same is true of the expert names and photographs — the four portraits currently in `public/team` are licensed Pexels stock standing in for practitioners who have not been named.

---

## 7 · If all of this lands

| | Before | After |
|---|---|---|
| Sections rendered | 22 → **20** | ~16 |
| Sections before the price | 17 | ~12 |
| Consecutive "what you get" sections | 10 | 6 |
| Dead content blocks | 16 | 0 |

### Suggested order

```
Hero · Trust bar · Proof · Problem · Difference · Facial Expertise
  → 400+ assessments
  → 100+ context factors  (+ the weather cards merged in)
  → How it works
  → Your Face Map  (+ the "not just sunscreen" framing merged in)
  → The people behind your Map
  → We sell one thing
  → Pricing
  → Money, honestly
  → Your face stays yours  (shrunk to the four-stage path)
  → FAQ
  → Closing CTA
```

---

## Open decisions for the founder

- [ ] Unfreeze the Hero → Facial Expertise range so #6 and #7 can be cut or trimmed
- [ ] Approve merging Guidance into the Face Map section
- [ ] Approve shrinking the privacy section to the four-stage path
- [ ] Supply a real, consented customer story
- [ ] Supply expert names, credentials and photographs to replace the stock portraits
