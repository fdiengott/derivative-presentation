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
index.html              # all slides as <section> elements + reveal.js includes
css/theme.css           # minimal theme: typography, color, spacing, SVG anim keyframes
js/visuals.js           # listens to Reveal 'fragmentshown'/'slidechanged' to toggle SVG classes
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

**Payoff charts — "a line that learns to bend"** (teach axes ONCE on the forward;
horizontal = market price at harvest, vertical = what the farmer walks away with):

- _Forward_ = flat horizontal SVG line. Multi-world sequence as fragments on the
  same chart: (1) flat line alone, (2) price crashes → market line drops below
  the lock → forward saved him, (3) price soars → market rises above the lock →
  forward cost him, (4) optional near-the-lock world, (5) crystallize the cage.
- _Future_ = reuse the identical payoff line; distinct visual is a trade-staging
  SVG: a handshake replaced by a clearinghouse "referee" between two strangers.
- _Option_ = the line bends into a hockey stick, animated from the forward's flat
  line on a click (CSS animation of the SVG path `d`, or cross-fade between a flat
  and a bent `<path>`). Premium = whole line nudged slightly down. Reuse the
  multi-world device to show it wins in both good and bad years, minus premium.

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

### Phase 0 — Setup

- [ ] **1.** `pnpm add reveal.js`.
- [ ] **2.** Vendor offline: copy `node_modules/reveal.js/dist` →
      `vendor/reveal/dist` and `node_modules/reveal.js/plugin` →
      `vendor/reveal/plugin`.
- [ ] **3.** Scaffold `index.html`, `css/theme.css`, `js/visuals.js`, `assets/`.
- [ ] **4.** Wire reveal.js + notes plugin in `index.html`; call
      `Reveal.initialize` (enable notes plugin, set transition). Confirm a
      placeholder slide renders in Chrome.

### Phase 1 — Theme & mechanics

- [ ] **5.** `theme.css`: minimal light theme — background, accent color,
      typography, generous spacing; override the reveal base theme.
- [ ] **6.** `js/visuals.js`: add `fragmentshown` / `slidechanged` listeners that
      toggle CSS classes on the active slide's SVG.
- [ ] **7.** Build the reusable SVG payoff-chart base (axes + label), taught once
      and reused by forward / future / option.

### Phase 2 — Movement 1: The Ache

- [ ] **8.** Slide 1 — Title.
- [ ] **9.** Slide 2 — Farmer walks out to a lush crop → despair. Abundance +
      dread in one frame; fragment reveals _why_ (everyone's great harvest → low
      price → can't recoup costs).
- [ ] **10.** Slide 3 — History beat (fragments): Osaka rice futures, 1700s;
      Mesopotamian clay tablets.
- [ ] **11.** Slide 4 — Core thesis: "A derivative moves risk from someone who
      fears it to someone willing to bear it."

### Phase 3 — Movement 2: The Farmer's Staircase

- [ ] **12.** Slide 5 — Forward: handshake locks a price; teach the axes once;
      flat line = certainty.
- [ ] **13.** Slides 6–9 — Forward multi-world reveals (crash / soar / near-lock =
      peace of mind) as fragments on the same chart.
- [ ] **14.** Slide 9 — The cage: "a hedge isn't a bet you win or lose — it's a
      bet you've chosen to stop playing." New flaw: needs a trusted counterparty /
      frozen in.
- [ ] **15.** Slide 10 — Future: same payoff line reused; clearinghouse referee
      between strangers. New flaw: still a cage.
- [ ] **16.** Slide 11 — Option: the line bends (animated); premium nudges line
      down; floor below strike, upside above.
- [ ] **17.** Slide 12 — Option multi-world: wins in both good and bad years minus
      premium. Option = insurance. Farmer's happy ending.

### Phase 4 — The Bridge

- [ ] **18.** Slide 13 — One transaction/harvest vs. a recurring _stream_ of risk.
      Hand off to a new protagonist; visual language shifts to flows.

### Phase 5 — Movement 3: Streams of Risk

- [ ] **19.** Slide 14 — Swap beat 1: two parties, arrow streams; volatility moves
      to the bank.
- [ ] **20.** Slide 15 — Swap beat 2: dealer in the middle takes a sliver;
      clearinghouse behind the trade. Risk _reshaping_, not shedding.
- [ ] **21.** Slide 16 — CDS: premium stream → default event → big contingent
      payback. Capstone: insures the assumption every prior instrument made (that
      the counterparty pays). Rhymes with the option.

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
