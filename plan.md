# Build Plan — Financial Derivatives Presentation

See `context.md` for the creative brief.

## Stack

- **reveal.js**, vendored locally — no build step, no bundler, no framework.
- Slides are plain HTML `<section>` elements.
- Bespoke visuals are hand-authored inline **SVG** animated with **CSS**,
  triggered by reveal.js fragment/slide events.
- Package manager: **pnpm**.

## Aesthetic

Clean, minimal, light. White/off-white background, generous whitespace, one
crisp sans-serif, a single warm accent color (`#c8553d`-ish) for the "active"
line/arrow. Never crowd — each new idea arrives via a fragment (click) or a new
slide. Thin, precise SVG strokes. Present in Chrome.

## File layout

```
index.html              # shell: <link>/<script> tags + data-include slide placeholders
slides/*.html           # one file per slide (full <section>), pulled in by includes.js
css/base.css            # palette, typography, layout, chrome, timing vars, reveal-in
css/viz.css             # SVG visual system: axes, spot/locked/outcome lines, anim primitives
js/includes.js          # fetch-based HTML partial loader (data-include)
js/anim.js              # data-anim hooks (click on one element animates another)
js/main.js              # orchestrator: load includes → Reveal.initialize → wire anim
vendor/reveal/          # vendored reveal.js dist (offline)
assets/                 # any static SVG/illustration bits, if needed
```

## Reveal mechanics

- **Fragments** (`class="fragment"`) for click-reveals.
- **Speaker notes** via `<aside class="notes">…</aside>` on each slide. Press
  **S** for presenter view (notes + timer + next-slide preview).
- **Animation triggering:** `js/visuals.js` listens for
  `Reveal.on('fragmentshown', …)` / `Reveal.on('slidechanged', …)` and toggles
  CSS classes on the active slide's SVG; CSS keyframes/transitions run the
  animation.
- Subtle **looping** arrow-flow animations (swap/CDS) via CSS
  `animation: … infinite` on `stroke-dashoffset`.

## Visual specs (reference for the build steps)

**Temporal charts — one chart type for the whole farmer staircase** (teach axes
ONCE on the forward; **X = time** today→harvest, **Y = price** in dollars; a
**dashed** line = spot wandering over the season, a **solid flat** line = the
locked forward/strike price). One world per chart; show the range of outcomes by
rendering multiple versions in sequence — the multi-world reveal and the chart are
the same mechanism now. **No payoff diagram / hockey stick — Chart B is abandoned.**

- _Forward_ = flat locked SVG line vs. a wandering dashed spot line. Multi-world
  sequence (each its own slide/reveal): (1) flat line alone = certainty, (2) spot
  ends below the lock → forward saved him, (3) spot ends above the lock → forward
  cost him, (4) optional near-the-lock world, (5) crystallize the cage. The flat
  line is "the locked price" — never anchored to or labelled against today's spot.
- _Future_ = reuse the identical temporal chart; distinct visual is a trade-staging
  SVG: a handshake replaced by a clearinghouse "referee" between two strangers.
- _Option_ = the same temporal chart with a third **outcome line**. At t=0 the
  outcome line sits slightly below the flat (the premium, a real upfront cost).
  Up-world: spot crosses the strike and the outcome line **lifts off** the flat and
  rides the spot up — the single most important animation beat in the farmer's arc.
  Down-world: spot never crosses; outcome line stays flat at strike-minus-premium.
  Reuse the multi-world device to show it wins in both good and bad years.

**Flow visuals — axes retire, arrows arrive:**

- _Swap_ — payment streams as arrows over a timeline flowing in opposite
  directions between baker and bank. Beat 1: baker's outgoing arrows start jagged
  (floating), then after the swap she emits smooth/even arrows (fixed) while the
  jagged ones land on the bank. Beat 2: the dealer slides into the middle (one
  arrow becomes two meeting at the dealer, who takes a sliver); callback to the
  clearinghouse standing behind the trade.
- _CDS_ — pension manager emits a small steady stream of premium arrows to a
  protection seller; a default event (borrower collapses); then one large arrow
  flows back to make her whole. Rhymes with the option's premium-for-protection.

## Build steps (check off as you go)

> `[~]` = previously built under the abandoned payoff-diagram grammar; needs rework
> to the temporal-chart grammar (see Visual specs). Slide files exist but their
> charts must be rebuilt.

### Phase 0 — Setup

- [x] **1.** `pnpm add reveal.js`.
- [x] **2.** Vendor offline: copy `node_modules/reveal.js/dist` →
      `vendor/reveal/dist` (v6 bundles plugins under `dist/plugin`, so the whole
      `dist` covers reveal + notes plugin + themes).
- [x] **3.** Scaffold `index.html`, `css/theme.css`, `js/visuals.js`, `assets/`.
- [x] **4.** Wire reveal.js + notes plugin in `index.html`; call
      `Reveal.initialize` (notes plugin enabled, slide transition). Placeholder
      slides render, fragments reveal, speaker view works.

### Phase 1 — Theme & mechanics

- [x] **5.** Minimal light theme — split into `css/base.css` (palette,
      typography, layout, chrome, tunable timing vars, `reveal-in`) and
      `css/viz.css` (SVG visual system + animation primitives).
- [x] **6.** Animation mechanics: CSS-via-fragment (`.fragment.visible`) for the
      common case + JS `data-anim` hooks in `js/anim.js` for cross-element
      sequencing. Draw-on uses `pathLength="1"` (no JS measurement).
- [x] **7.** Reusable SVG temporal-chart base (axes taught once: X=time, Y=price;
      dashed spot line + solid flat locked line) in `slides/payoff-base.html`.

### Phase 2 — Movement 1: The Ache

- [x] **8.** Slide 1 — Title (`slides/title.html`): "Moving risk" + the five
      instruments revealed.
- [x] **9.** Slide 2 — The ache (`slides/ache.html`): wheat-field abundance +
      "feels despair"; fragment reveals _why_ (great crop everywhere → low price →
      can't recoup costs).
- [x] **10.** Slide 3 — History beat (`slides/history.html`, fragments): Osaka
      rice futures 1700s; Mesopotamian clay tablets.
- [x] **11.** Slide 4 — Core thesis (`slides/thesis.html`): "A derivative is a
      tool for moving risk — from someone who fears it to someone willing to bear
      it."

### Phase 3 — Movement 2: The Farmer's Staircase

- [x] **12.** Forward (`slides/forward.html`): handshake locks a price; temporal
      axes taught once (X=time, Y=price); flat locked line draws = certainty.
- [x] **13.** Forward worlds (`slides/forward-worlds.html`): one persistent
  temporal chart; fragments step through crash / soar / near-lock as a
  wandering dashed spot line ending below / above / near the flat locked line.
- [x] **14.** The cage (`slides/forward-cage.html`): crystallize the cage via the
  soar-world (flat locked line below the risen spot = upside foregone); "a bet
  you've chosen to stop playing"; new flaw = needs a trusted counterparty.
- [x] **15.** Future (`slides/future.html`): handshake → clearinghouse referee
      between strangers (same temporal chart, new plumbing); new flaw = still a cage.
- [x] **16.** Option (`slides/option.html`): same temporal chart; outcome line
  sits below the flat at t=0 (premium), then in the up-world lifts off the flat
  at the strike-crossing and rides the spot upward (the focal animation beat).
- [~] **17.** Option worlds (`slides/option-worlds.html`): up-world lift-off vs.
  down-world stay-flat (strike minus premium); wins in both the forward's good
  and bad years minus premium; "an option is insurance" — the happy ending.
  _Rework: re-aligned to the temporal multi-world grammar._

### Phase 4 — The Bridge

- [x] **18.** Slide 13 — One transaction/harvest vs. a recurring _stream_ of risk
      (`slides/bridge.html`). Hand off to the baker; visual language shifts from
      charts to flows (a single arrow becomes a monthly stream).

### Phase 5 — Movement 3: Streams of Risk

- [x] **19.** Slide 14 — Swap beat 1 (`slides/swap.html`): two parties; marching
      payment bars (height = amount), jagged floating → smooth fixed; the
      volatility moves to the bank. Risk _reshaping_, not shedding.
- [x] **20.** Slide 15 — Swap beat 2 (`slides/swap-dealer.html`): dealer in the
      middle takes a sliver; clearinghouse behind the trade.
- [~] **21.** Slide 16 — CDS (`slides/cds.html`): small steady premium stream →
      default event (the company collapses) → one big contingent payback that
      makes the fund whole. Capstone: insures the assumption every prior
      instrument made (that the counterparty pays). Rhymes with the option.
      _Pending review._

### Phase 6 — Movement 4: Synthesis

- [ ] **22.** Slide 17 — Collapse all five tools back to the one sentence.
- [ ] **23.** Slide 18 — One honest line: tools move risk, they don't erase it;
      end constructive.

### Phase 7 — Verification

- [ ] **24.** Open `index.html` in Chrome; step through; confirm every fragment
      reveals exactly one new idea and nothing appears ahead of its click.
- [ ] **25.** Confirm the payoff line bends on the option slide and arrow flows
      loop on swap/CDS.
- [ ] **26.** Press **S** → presenter view shows notes + timer; rehearse once and
      confirm it lands near 12–13 min.
- [ ] **27.** Disconnect from the internet and reload to confirm the deck works
      fully offline.
