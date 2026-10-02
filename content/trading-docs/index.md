---
title: The trading engine
summary: A paper-only system that collects market data, runs research, and tests whether AI decisions add value without risking real money.
order: 1
section: Start here
---

# The trading engine

This is a research and paper-trading engine. It collects market data, screens a broad US stock and
ETF universe, runs strategies in a simulator, and records enough evidence to ask a hard question:
did a decision process add value after realistic costs, or did it merely get lucky?

“Paper” is the important word. Orders, fills, cash, positions, and costs are simulated. The engine
has no broker connection, no broker credentials, and no authority over real money. A future broker
paper account is described in an internal proposal, but it is explicitly not work for now.

The engine runs unattended on a Linux server. An LLM can make bounded research decisions through a
model gateway, while deterministic code controls the data it may see, the candidate list, position
size, risk limits, fills, accounting, halts, and evaluation. The model can express a view. It cannot
invent a price, bypass a risk check, send a broker order, or turn a weak result into a pass.

## What happens each day

On a normal market day, the engine:

1. checks pending paper entries before the market opens;
2. observes intraday bars, headlines, and scheduled market snapshots without granting intraday
   order authority;
3. collects end-of-day prices and other facts after the session;
4. advances every active paper book using the same next-open fill rules;
5. asks the daily AI policies to score candidates after the deterministic data is ready; and
6. joins older decisions to outcomes that have now matured.

Weekly jobs verify the store, refresh liquidity, rerun walk-forward checks, and summarize the state
of the research. [The daily cycle](/trading-engine/docs/daily-cycle) gives the exact schedule in New York time.

## What the engine is trying to prove

A positive return is not enough. A policy is compared with a frozen control on the same dates and
candidates. Costs are charged to the strategy. Attempts are counted. Results must survive data that
was not used during development. A policy that fails its registered test is stopped rather than
tuned after the fact.

The live profitability evidence loop (P15) scores a wider candidate set and runs three matched
paper books: AI-ranked, rule-ranked, and a rule book with an AI veto. Its registration revision 9
is live. The revision binds infrastructure improvements without changing scoring, books, gates,
labels, registered values, or earlier evidence.

The challenger lab, text edge, and evaluation science plan (P16) has built stronger evaluation,
shadow challengers, filing and replay paths, portfolio construction, and execution measurement.
Those parts remain inert until their own registration, rehearsal, and activation gates pass. The
shared backtest core (P18) is complete and available for public, reusable studies.

No policy has yet beaten its frozen control prospectively. That is the honest current status. The
system has working infrastructure and accumulating paper evidence; it does not have a proven edge.

## Public engine, private research

This repository contains public infrastructure: data handling, simulation, evaluation statistics,
replay tools, runners, schemas, and example policies. It is intended to be inspectable and useful
to anyone who wants to test their own ideas.

Private research strategies run in a separate private repository and reach the engine only through
the shared backtest core and paper books. Their rules, prompts, parameter sets, registrations,
trial counts, findings, and results are not published here. A near-term product direction is a
generic live paper book that can observe such a strategy in real time without revealing it.

## Where to go next

Read [Paper books and the league](/trading-engine/docs/paper-books) to understand what a simulated trade means,
[AI agents](/trading-engine/docs/ai-agents) to see the model's narrow authority, and
[How research earns a verdict](/trading-engine/docs/research-process) for the safeguards against overfitting. The
[glossary](/trading-engine/docs/glossary) translates the internal plan codes and statistical terms.

<!-- sources: README.md, docs/product.md, docs/plans/README.md, server/p15-registration.json, server/p16-registration.json, sim/fills.py, sim/league.py -->
