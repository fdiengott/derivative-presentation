# Build Plan — Financial Derivatives Presentation

## Context

We need a self-contained HTML slide deck for a live 12–13 min talk introducing
financial derivatives (see `context.md` for the full creative brief). The deck
is presented from a browser, leans heavily on click-reveals and bespoke visuals
(payoff charts that "learn to bend," arrow-flow animations), and follows a strict
"one idea on screen at a time" doctrine. It will **not** be maintained or tested,
so the overriding goal is _simplicity of build_ and _reliability during the live
talk_ — not architecture, reuse, or test coverage.

The repo is greenfield: only `context.md` and a stray `node_modules` (no
`package.json`). Node 24 / npm 11 are available.

## Tooling decision

**Use [reveal.js](https://revealjs.com), vendored locally. No build step, no
bundler, no framework.** Author slides as plain HTML `<section>` elements; write
the bespoke visuals as hand-authored inline **SVG** animated with **CSS**,
triggered by reveal.js's fragment/slide events.

### Why this over the two approaches you've seen

- **vs. one hand-rolled HTML file (vanilla JS):** reveal.js gives slide
  navigation, transitions, keyboard/touch control, progress bar, fragment
  (click-reveal) sequencing, and a **speaker view with notes + timer** for free.
  These are exactly the features the brief leans on (one-idea-per-slide,
  multi-world reveals, presenter notes). Hand-rolling them is wasted effort.
- **vs. React + a slideshow library (e.g. Spectacle):** React/Spectacle requires
  an npm toolchain and a bundler (Vite/webpack) — a build step and dependency
  graph we'd have to keep running. For a one-off, non-maintained talk that's pure
  overhead. reveal.js is just HTML/CSS/JS you open in a browser.

The custom payoff-chart and arrow-flow visuals are the real creative payload, and
we'd be hand-writing those SVGs in _either_ approach. reveal.js lets us spend
100% of custom effort there instead of on slideshow plumbing.

**No charting library** (Chart.js/D3): the payoff charts are bespoke shapes (a
flat line, a hockey stick that animates open) and the swap/CDS visuals are custom
arrow flows. A charting lib would fight us. Hand-authored SVG + CSS is simpler and
gives exact control.

## Aesthetic

Clean, minimal, light. White/off-white background, generous whitespace, one
crisp sans-serif, a single warm accent color (`#c8553d`-ish) used sparingly for
the "active" line/arrow. Per your steer: **never crowd** — each new idea arrives
via a fragment (click) or a new slide so the minimum new information appears at
any one moment. Thin, precise SVG strokes. Present in Chrome (so we can rely on
CSS path animation).

## File layout

```
index.html              # all slides as <section> elements + reveal.js includes
css/theme.css           # minimal theme: typography, color, spacing, SVG anim keyframes
js/visuals.js           # listens to Reveal 'fragmentshown'/'slidechanged' to toggle SVG classes
vendor/reveal/          # vendored reveal.js dist (offline) — see setup below
assets/                 # any static SVG/illustration bits, if needed
```

### Offline vendoring (setup, one-time)

Pull reveal.js and copy its built `dist` (+ the `notes` plugin) into `vendor/`:

```
npm install reveal.js          # populates node_modules/reveal.js
mkdir -p vendor/reveal
cp -r node_modules/reveal.js/dist   vendor/reveal/dist
cp -r node_modules/reveal.js/plugin vendor/reveal/plugin
```

`index.html` then references `vendor/reveal/dist/reveal.css`, a base theme (e.g.
`white.css` — we override it in `theme.css`), `vendor/reveal/dist/reveal.js`, and
the notes plugin. No CDN, so the deck works with no internet at talk time. The
whole folder is portable — zip it and open `index.html` anywhere.

## Reveal mechanics we rely on

- **Fragments** (`class="fragment"`) for click-reveals — the core "one idea at a
  time" lever.
- **Speaker notes** via `<aside class="notes">…</aside>` on each slide, populated
  from the brief's speaking points. Press **S** for presenter view (notes +
  timer + next-slide preview).
- **Animation triggering:** `js/visuals.js` adds a `Reveal.on('fragmentshown', …)`
  / `Reveal.on('slidechanged', …)` listener that toggles CSS classes on the
  current slide's SVG. CSS keyframes/transitions then run the actual animation
  (line bending, arrows flowing). This keeps animation logic declarative in CSS
  and tied to the click that reveals it.
- Subtle **looping** arrow-flow animations (swap/CDS) via CSS
  `animation: … infinite` on `stroke-dashoffset`.

## Visual implementations (the bespoke part)

**Payoff charts — "a line that learns to bend"** (teach axes ONCE on the forward;
horizontal = market price at harvest, vertical = what the farmer walks away with):

- _Forward_ = flat horizontal SVG line ("certainty looks flat"). The multi-world
  sequence is fragments on the same chart: (1) flat line alone, (2) price crashes
  → market line drops below the flat lock → forward saved him, (3) price soars →
  market rises above the lock → forward cost him, (4) optional near-the-lock world,
  (5) crystallize the cage.
- _Future_ = **reuse the identical payoff line** (economics unchanged); the
  distinct visual is a trade-staging SVG: a handshake replaced by a clearinghouse
  "referee" figure standing between two strangers.
- _Option_ = the line **bends** into a hockey stick. Animate from the forward's
  flat line to the bent path on a click (CSS animation of the SVG path `d`, or a
  cross-fade between a flat `<path>` and a bent `<path>` — pick whichever reads
  cleaner during build). Premium = whole line nudged slightly down. Reuse the
  multi-world device to show it wins in both good and bad years, minus premium.

**Flow visuals — axes retire, arrows arrive** (the bridge marks this shift
visually, not verbally):

- _Swap_ — two payment streams as arrows over a timeline flowing in opposite
  directions between baker and bank. Beat 1 (slide): baker's outgoing arrows
  start jagged (floating), then after the swap she emits smooth/even arrows
  (fixed) while the jagged ones land on the bank — volatility _moved_, not erased.
  Beat 2 (new slide/reveal): the dealer slides into the middle (one arrow becomes
  two meeting at the dealer, who takes a sliver); visual callback to the
  clearinghouse standing behind the trade. Dealer vs. clearinghouse folded into
  2–3 sentences.
- _CDS_ — pension manager emits a small steady stream of premium arrows to a
  protection seller; a default event (borrower company visually collapses); then
  one large arrow flows back to make her whole. Deliberately rhymes with the
  option's premium-for-protection.

These flow animations are the least-specified part of the brief — explore exact
treatment during build; subtle looping `stroke-dashoffset` is the likely approach.

## Slide inventory (~19 slides, maps the brief's 4 movements)

**Movement 1 — The Ache**

1. Title.
2. Farmer walks out to a lush, abundant crop → despair. Abundance + dread in one
   frame; fragment reveals _why_ (everyone's great harvest → low price → can't
   recoup costs).
3. History beat (fragments): Osaka rice futures, 1700s; Mesopotamian clay tablets.
   Derivatives are old and human.
4. **Core thesis** slide: "A derivative moves risk from someone who fears it to
   someone willing to bear it." (Callback target for the whole talk.)

**Movement 2 — The Farmer's Staircase** 5. Forward — handshake locks a price; teach the axes once; flat line = certainty.
6–8. Forward multi-world reveals (crash / soar / optional near-lock). 9. The cage: "a hedge isn't a bet you win or lose — it's a bet you've chosen to
stop playing." New flaw: needs a trusted counterparty / frozen in. 10. Future — same payoff line reused; clearinghouse referee between strangers
(fixes trust + tradability). New flaw: still a cage. 11. Option — the line bends (animated); premium nudges line down; floor below
strike, upside above. 12. Option multi-world: wins in both good and bad years minus premium. Rhyme:
option = insurance. Farmer's happy ending.

**The Bridge** 13. One transaction/harvest vs. a recurring _stream_ of risk. Hand off to a new
protagonist; visual language shifts from payoff charts to flows.

**Movement 3 — Streams of Risk** 14. Swap beat 1 (two parties, arrow streams; volatility moves to the bank). 15. Swap beat 2 (dealer in the middle takes a sliver; clearinghouse behind the
trade). Key idea: risk _reshaping_, not shedding. 16. CDS — premium stream → default event → big contingent payback. Capstone: the
first instrument that insures the assumption every prior one made (that the
counterparty pays). Rhymes with the option.

**Movement 4 — Synthesis** 17. Collapse all five tools back to the one sentence — five variations on one idea. 18. One honest line: tools move risk, they don't erase it; end constructive
(that's life, good to know them, they're everywhere). 19. Bonus glossary (define, don't derive): spot price = price to buy right now;
strike/forward price = the locked-in future price.

## Verification

- Open `index.html` in Chrome. Step through with arrow keys / space; confirm every
  fragment reveals exactly one new idea and nothing appears ahead of its click.
- Confirm payoff line _bends_ on the option slide and arrow flows loop on
  swap/CDS.
- Press **S** → presenter view shows notes + timer; rehearse once end-to-end and
  confirm it lands near 12–13 min.
- Disconnect from the internet and reload to confirm the vendored deck works fully
  offline.
- Optionally test `?print-pdf` + browser "Print to PDF" for a backup copy.

## Out of scope

No tests, no CI, no maintenance tooling, no React/Astro (the stray `node_modules`
is ignored; we add only reveal.js).
