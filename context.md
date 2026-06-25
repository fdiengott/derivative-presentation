# Financial Derivatives Presentation — Build Brief

## What this is

A 10–15 minute live talk (≈12–13 min of speaking) introducing financial derivatives to both a non-finance workplace audience that is financially curious but not anti-bank and a finance workplace audience that is likely more technical and has less financial knowledge. Deliverable: self-contained HTML slides that present from a browser, with click-reveals and transitions. The goal is intuition, not math — the audience should leave feeling these instruments are obvious, humane inventions, not Wall Street wizardry.

## Core thesis (callback target for the whole talk)

A derivative is a tool for moving risk from someone who fears it to someone willing to bear it. Every slide should ultimately ladder back to this sentence.

## Governing design doctrine

- One idea per slide. Never crowd. If a slide wants an "and," it's two slides. Multi-point ideas are built as sequences of reveals (click or separate slides), revealing one idea at a time. This controls tempo and keeps eyes/ears on the speaker, not reading ahead.
- Multi-world reveal technique (a recurring through-line): to teach that these instruments are about living across many possible futures, show several possible price-worlds in sequence rather than one static payoff. Used heavily at the forward, again at the option, echoed faintly at the CDS.
- Tone exit is constructive: these are useful tools, worth understanding because they're everywhere. One honest line that tools move risk but don't erase it — but NOT a 2008 cautionary tale. The world has risk, models are wrong, that's life.

## Cast (loosely sharing one economic world)

- Farmer — carries forwards, futures, options.
- Bakery owner (small business, variable-rate loan) — carries the swap. Her foil is a bank whose revenue rises with interest rates, so the floating leg is its natural habitat.
- Pension fund manager — carries the CDS. Sympathetic framing: protecting retirees' savings from a borrower's default. Wall-Street-flavored is fine here.

## Structure (4 movements)

### Movement 1 — The Ache (no instruments yet)

- The farmer walks out to a lush, abundant crop and feels despair — the counterintuitive emotional hook. Why? Price is set by everyone's harvest; a great crop everywhere means low prices and he won't recoup costs. Stage abundance and dread in the same frame.
- One-sentence history beat: this is an ancient human reflex — Osaka rice merchants (1700s) traded rice futures; Mesopotamian clay tablets record forward contracts on grain. Makes derivatives feel old and human, not modern wizardry.
- Plant the core thesis.

### Movement 2 — The Farmer's Staircase (each rung fixes the previous one's flaw)

- Forward — lock a price with a handshake. Fixes: the ache. New flaw: needs a trusted counterparty; you're frozen into the deal / capped.
- Future — same deal, standardized, with a clearinghouse referee so strangers can trade without trusting each other personally. Fixes: trust + tradability. New flaw: still a cage — lock at the price and you lose the upside if prices soar.
- Option — pay a premium for the right, not the obligation. Below the strike the floor protects you; above it you keep the upside. Fixes: keeps the upside. The farmer's happy ending. Note the rhyme: an option is insurance.

### The Bridge (load-bearing — its own beat)

- The farmer's whole world was one transaction, one harvest. But some risk is a recurring stream (every month, every payment). The farmer can't show that. Hand off to a new protagonist. The visual language deliberately changes here (see below) to mark leaving "betting on a price" for "trading a flow."

### Movement 3 — Streams of Risk

- Swap — two parties trade ongoing payment streams because each prefers the other's risk shape. Baker has a scary floating-rate loan, craves predictability; bank's revenue rises with rates, so floating is comfortable for it. They trade: baker effectively pays fixed and sleeps; bank takes the floating leg its own business hedges. Key idea: a swap is risk reshaping, not risk shedding. (At least 2 slides — see visuals.)
- CDS — take the swap idea and point it at a different risk: not "will rates move" but "will this borrower default." Pension manager holds a company's bond; pays a small steady premium stream to a protection seller; if the company defaults, she's made whole. Why it's the staircase capstone: every prior instrument quietly assumed the counterparty pays up — the CDS is the first instrument that insures that very assumption; it's risk-shifting pointed at trust itself. Rhymes with the option (both insurance) — call this out to tie the last rung back to the farmer.

### Movement 4 — Synthesis

- Collapse all five back to the one sentence. Five elegant tools, all variations on one idea.
- One honest line: tools move risk, they don't erase it; when people forget that, things break. End constructive: that's life, good to know them, they're everywhere.
- Optional bonus glossary slide ("sound dangerous at a dinner party"): define, don't derive. Spot price = price to buy right now. Strike / forward price = the locked-in future price. (These two are load-bearing and also appear earlier via click-reveal where the concepts are first used.)

## Visual grammar

The farmer's three rungs share ONE chart type — the **temporal chart** (teach axes
ONCE on the forward, then reuse it for future and option):

- **X axis = time** (from today → harvest).
- **Y axis = price** (dollars).
- A **dashed line** = the spot price wandering over the season.
- A **highlighted / solid flat horizontal line** = the locked-in forward/strike price.

One world per chart. Each chart shows a single possible season. To show the range
of outcomes, render multiple versions of the same chart in sequence — this IS the
multi-world reveal; the two devices are now the same mechanism. The whole staircase
is pedagogically consistent: the audience learns to read one chart type and reuses
it for all three farmer instruments.

> Do NOT use the atemporal payoff diagram (x = harvest spot, y = what the farmer
> walks away with). It is abandoned entirely — counterintuitive for a non-finance
> audience and inconsistent with the multi-world reveal doctrine. There is no
> "line that learns to bend" / hockey stick anymore.

- Forward = flat locked line vs. wandering dashed spot. Multi-world sequence, each
  its own slide/reveal:

  1. Flat line alone — this is certainty.
  2. World where spot ends below the lock → farmer protected → the forward saved him.
  3. World where spot ends above the lock → farmer capped → the forward cost him.
  4. (Optional) World where spot ends near the lock → mostly it's just peace of mind.
  5. Crystallize the cage: he can never win big, by design. Teaching point: a hedge
     isn't a bet you win or lose — it's a bet you've chosen to stop playing. This
     ache launches the future.

  Important: the flat line represents "the locked price." Do NOT anchor it to or
  label it relative to today's spot price (avoids the contango/carry thicket). The
  honest comparison is locked price vs. harvest spot — which is exactly what the
  chart already shows.

- Future = reuse the IDENTICAL chart/shape as the forward (economics unchanged;
  only the plumbing changed). Its distinct visual is NOT a new chart — it's the
  trade-staging picture: handshake replaced by a clearinghouse referee standing
  between two strangers.
- Option = the same temporal chart, shown as multiple worlds, with a third
  "outcome line" tracking what the farmer actually walks away with:

  - Up-world: spot rises and crosses the strike; at the crossing point the
    outcome line lifts off the flat and rides the spot upward. This lift-off at
    the strike-crossing is the single most important visual beat in the farmer's
    arc — concentrate animation budget here. The outcome line visibly peeling
    away from flat is the focal moment.
  - Down-world: spot falls, never crosses the strike, the farmer doesn't exercise;
    his outcome line stays flat (at strike minus premium).
  - Show the premium as a real upfront cost paid at t=0 — a small downward shift
    of the outcome line. Keep it visible; don't bury it.
  - Reuse the multi-world device: the option wins in both the forward's good and
    bad years, minus the premium.

The bridge onward — visual language shifts to FLOWS (axes retire; this shift is felt, not announced).

- Swap — primary visual is two payment streams as arrows over a timeline, flowing in opposite directions between baker and bank. Baker's outgoing arrows start jagged/uneven (scary floating); after the swap, she emits smooth/even arrows (fixed) while the jagged ones land on the bank. Realization: the volatility moved to the party built to absorb it. Suggest subtle looping arrow-flow animation. Beat 1: two parties only. Beat 2 (click-reveal / new slide): the swap dealer slides into the middle — the single arrow becomes two meeting at the dealer, who takes a sliver. Then a verbal/visual callback: the clearinghouse (the "grown-up referee" from futures) stands behind the trade to guarantee it. Note the dealer (matchmaker/counterparty, e.g. a bank's markets desk) vs. clearinghouse (central counterparty guaranteeing performance) distinction — fold into 2–3 sentences; only split apart if asked. This matters to this speaker's real workplace.
- CDS — visual is insurance: pension manager emits a small steady stream of premium arrows to a protection seller; then a default event (borrower company visually collapses); then a single large arrow flows back to make her whole. Shape: many small payments, then one big contingent payback. Deliberately rhymes with the option's premium-for-protection.

Where the animation budget goes: (1) the option's lift-off — the outcome line
peeling away from flat at the strike-crossing; (2) the swap/CDS flow animations,
where motion is the concept (a payment stream is inherently temporal; moving
arrows sell "stream of payments" far better than static arrows). The
flow/arrow visual language (swap, CDS) is less fleshed out than the temporal
charts — explore during building. Subtle looping arrow animation is the likely
approach. The 3 farmer temporal charts are the same chart type; consider CSS
snap-scroll for quick stepping if it serves.

Do NOT build the collapsing-dots morph (the once-floated animation morphing many
temporal worlds into dots tracing a payoff line). Its only purpose was to justify
an A→B chart transition, and there is no Chart B anymore. It would spend audience
working-memory on chart-reading meta instead of derivatives intuition. Cut entirely.

## Presenter note (surface in speaker notes)

When the forward is introduced, describe the locked line as "the price you can
lock in today for delivery later" — never as "what the market thinks prices will
be." The forward price is a carry-adjusted anchor, not a prediction; conflating
the two is the most common derivatives misconception.

## Open items to resolve during building

- Exact arrow-flow animation treatment for swap/CDS.
- Exact treatment of the option's lift-off beat (the outcome line peeling away
  from flat at the strike-crossing) — the highest-value animation in the deck.
