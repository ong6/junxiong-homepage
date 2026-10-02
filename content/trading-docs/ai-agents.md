---
title: AI agents
summary: Models score and explain bounded choices, while deterministic code keeps control of data, risk, execution, and evaluation.
order: 5
section: How it works
---

# AI agents

The engine uses AI as a decision-maker inside a narrow box. An LLM receives admitted facts through
a model gateway and returns a typed assessment or score. Deterministic code decides what the model
may see, validates the response, sizes any permitted paper order, applies risk limits, and records
the result.

That split is deliberate. Language models are useful at reading and ranking messy context. They are
not trusted to own market data, quantities, accounting, fills, or authority.

## The daily opportunity agent

The daily opportunity agent runs after nightly data settles. A deterministic screen supplies a
small set of unusual but liquid names and broader market context. The agent classifies each as
ignore, watch, hold, or swing and can explain a thesis, horizon, and invalidation.

A watch is not an order. If its price trigger fires later, the model must reassess fresh retained
evidence. Only an eligible swing decision can reach the locked simulator tool, and deterministic
checks still own symbol admission, position size, earnings windows, stops, portfolio limits, and
next-open execution.

## Three matched stock-picking books

The profitability evidence loop asks a broader question: can the model rank candidates better
than a fixed rule?

Every candidate receives a model probability and expected excess-return score plus a deterministic
baseline score. The engine then runs three books with matched mechanics:

| Book | Decision rule | What it tests |
|---|---|---|
| AI-ranked | Buys the highest eligible model scores | Whether model ranking can be monetized |
| Rule control | Buys the highest deterministic scores | What the same portfolio mechanics do without AI |
| Hybrid veto | Starts from rule picks and lets AI reject weak ones | Whether AI is better at filtering than inventing trades |

The pre-open model check can only cancel pending AI-ranked or hybrid entries. It cannot add a name,
increase size, move a limit, or fill an order. Intraday news and mover agents are shadow-only.

## Challengers

The challenger lab, text edge, and evaluation science plan has built several ways to challenge
the current policy on identical inputs. They include an issuer-blinded view, memory of the policy’s
own matured mistakes, model comparisons, an ensemble, and input ablations. A filing reader and
historical replay labs are also built.

These components remain inactive until their final registration and rehearsal gates pass. Even
after activation, a challenger has no order authority. It must beat the champion under its
registered sequential test, trial correction, and factor-neutral check before it can merely become
a candidate for a later promotion decision.

## What an agent can and cannot do

An active agent can:

- score candidates supplied by deterministic code;
- choose among a fixed set of actions;
- explain its evidence and invalidation;
- abstain or return unavailable; and
- for the one locked nightly path, request a capped local-simulator trade.

An agent cannot choose arbitrary symbols, quantities, leverage, shorts, fill prices, account
settings, or risk limits. It cannot connect to a broker, use real money, rewrite a registration,
edit a matured label, or promote itself. Missing or invalid output becomes an explicit unavailable
decision rather than a hidden fallback to another model.

## Frozen decisions and later scores

Each decision records its market date, information cutoff, policy and model identity, prompt and
tool identity, admitted input references, output, latency, authority, and failure state. Later jobs
append outcomes at fixed horizons. They do not edit the original trace.

The primary comparison uses the same candidates and dates for model and rule scores. That makes an
abstention, invalid response, or outage part of the policy’s real performance. The evaluation also
checks whether the model simply rediscovered momentum or another known exposure.

No policy has yet beaten its frozen control prospectively. The purpose of the agent system is to
reach a trustworthy yes or no, not to make ordinary paper returns sound like proof.

Private research strategies run in a separate private repository and reach the engine only through
the shared backtest core and paper books. Their model instructions, parameters, registrations,
trials, and findings are never copied into this public documentation.

<!-- sources: engine/daily_opportunities.py, engine/p15_evaluation.py, server/daily_opportunity_runner.py, server/daily_opportunity_tools.py, server/p15_scoring_runner.py, server/p15_preopen.py, server/p16_registration.py, server/p15-registration.json, server/p16-registration.json, sim/p15_books.py -->
