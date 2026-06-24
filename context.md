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

The farmer's three rungs — "a line that learns to bend" (3 separate but near-identical payoff charts; same axes throughout: horizontal = market price at harvest, vertical = what the farmer walks away with. Teach axes ONCE on the forward.)

- Forward = flat horizontal line. Certainty looks flat. Then the multi-world sequence, each its own slide/reveal:

  1. Flat line alone — this is certainty.
  2. World where price crashed below the lock → flat line sits above market → the forward saved him.
  3. World where price soared above the lock → flat line sits below → the forward cost him.
  4. (Optional) World where price landed near the lock → mostly it's just peace of mind.
  5. Crystallize the cage: he can never win big, by design. Teaching point: a hedge isn't a bet you win or lose — it's a bet you've chosen to stop playing. This ache launches the future.

- Future = the SAME payoff line (reuse identical shape deliberately — the economics didn't change, the plumbing did). Its distinct visual is the trade-staging picture: handshake replaced by a clearinghouse referee standing between two strangers.
- Option = the line finally BENDS (hockey stick). Flat below the strike (floor holds), lifts off above it (keeps upside). Animate the bend appearing over the forward's flat line — the cage opening. The premium shows as the whole line sitting slightly lower (visible cost of freedom). Reuse the multi-world device: show it wins in both the forward's good and bad years, minus the premium.

The bridge onward — visual language shifts to FLOWS (axes retire; this shift is felt, not announced).

- Swap — primary visual is two payment streams as arrows over a timeline, flowing in opposite directions between baker and bank. Baker's outgoing arrows start jagged/uneven (scary floating); after the swap, she emits smooth/even arrows (fixed) while the jagged ones land on the bank. Realization: the volatility moved to the party built to absorb it. Suggest subtle looping arrow-flow animation. Beat 1: two parties only. Beat 2 (click-reveal / new slide): the swap dealer slides into the middle — the single arrow becomes two meeting at the dealer, who takes a sliver. Then a verbal/visual callback: the clearinghouse (the "grown-up referee" from futures) stands behind the trade to guarantee it. Note the dealer (matchmaker/counterparty, e.g. a bank's markets desk) vs. clearinghouse (central counterparty guaranteeing performance) distinction — fold into 2–3 sentences; only split apart if asked. This matters to this speaker's real workplace.
- CDS — visual is insurance: pension manager emits a small steady stream of premium arrows to a protection seller; then a default event (borrower company visually collapses); then a single large arrow flows back to make her whole. Shape: many small payments, then one big contingent payback. Deliberately rhymes with the option's premium-for-protection.

Note for build phase: the flow/arrow visual language (swap, CDS) is less fleshed out than the payoff charts — explore during building. Subtle looping arrow animation is the likely approach. The 3 farmer payoff charts can be near-identical; consider CSS snap-scroll for quick stepping if it serves.

## Open items to resolve during building

- Exact arrow-flow animation treatment for swap/CDS.
- Whether the farmer's 3 charts persist-and-evolve vs. snap between near-identical separate charts (leaning separate charts, each with own click transitions).
