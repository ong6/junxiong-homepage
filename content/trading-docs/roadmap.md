---
title: Roadmap
summary: Near-term work finishes the senior-quant review, moves private research onto its own paper account, and keeps the evidence clean; broker paper remains later, separate work.
order: 10
section: Start here
---

# Roadmap

The roadmap follows evidence, not feature count. The engine already has more built-but-inactive
capability than proven edge. Near-term work therefore finishes what is in flight, keeps the paper
evidence clean, and reaches trustworthy verdicts faster.

## Done recently

- **Engine v2 (October 2026).** Since 18 October the engine is the single executor and ledger for
  every paper book and every separately funded paper account. It adds a registered commission
  schedule, opening- and closing-auction fills, delayed intraday fills, stock shorts with borrow
  costs, margin and day-trading limits, and automatic account halts. Each book's evaluation clock
  restarted on 19 October so old and new cost rules are never mixed.
- **Retiring books with no edge.** On 21 October eight paper books that showed no edge after costs
  stopped trading. Their history stays readable.
- **Faster research without different answers.** The shared backtest core builds its price panel
  about eighteen times faster, and one walk-forward fold that took 81 minutes now takes under ten,
  with every output row and ledger identical before and after.

## Near term

### Finish the senior-quant review

The review that began on 21 October has landed two batches of fixes and a set of platform tools:
a public-hygiene check, a release tool that only plans by default, an audit-only job registry, a
dataset catalogue, and a research runner with a result cache. The live price store was repaired on
22 October.

What remains is a storage reorganization. It goes live only after its review findings are fixed
and a rehearsal on a copy of the store passes. Until then it is not part of the running engine.

### Private research on its own paper account

Engine v2 gives each private strategy version a separately funded paper account. The next step is
moving the private research programme's paper observation onto such an account, so the engine
does the execution and accounting while the strategy's logic stays private. Private research
strategies run in a separate private repository and reach the engine only through the shared
backtest core and paper accounts. Their rules, prompts, parameters, registrations, trial counts,
findings, and results remain private, and none of them has a proven edge.

### Keep current evidence clean

The live profitability books, daily agent, shadow observers, frozen forward records, and weekend
checks continue to accumulate. A failed producer or missed window takes priority over a new
feature. An automatic check now compares each published database snapshot against a list of
invariants (for example, one price basis per stock after a split) and reports any regression for
an agent to investigate.

## Later, explicitly not now

The personal-host IBKR paper execution and reconciliation plan is future work. It would run on
separate personal hardware against a broker paper account, beside a frozen simulator twin. It would
measure attribution, reconciliation, slippage, partial fills, and unexplained orders for one to
three months.

That plan is proposed, not approved for implementation. There is no account action, credential,
broker connection, installation, or order work now. It requires a Stage 1 policy pass and a new
owner approval before anything begins.

Real capital is later still. It would require a separate plan, provider-pinned model identity,
loss limits, capital steps, tax and instrument review, and clean broker-paper reconciliation. None
of those conditions exists as current authority.

## What would change the plan

The roadmap changes when evidence changes:

- A prospective policy pass would make broker-paper design worth reconsidering.
- A policy kill would retire its book and reduce operational noise.
- A demonstrated simulator or data defect would take priority over research throughput.
- Better survivor-aware data could admit historical questions that are currently blocked.
- A material difference between modeled and observed opens would require a new registered fill
  cohort, not a quiet adjustment to old results.
- An owner decision could approve spending, personal hardware, or a later broker mandate.

Failures are investigated on demand by an agent; there is no push alerting. Operational incidents
can reorder work, but they do not broaden authority. The default remains public research
infrastructure, paper books, and no real money.

<!-- sources: BUILDLOG.md, docs/product.md, docs/scope.md, docs/plans/README.md, docs/plans/p17-personal-host-ibkr-paper-execution.md, docs/plans/p22-engine-v2-accounts.md, docs/plans/p24-quant-review-and-speed.md, tools/check_invariants.py -->
