---
title: The shared backtest core
summary: One deterministic evaluator gives event and portfolio studies the same point-in-time data, fills, costs, benchmarks, and statistical checks.
order: 7
section: Research
---

# The shared backtest core

A backtest is a controlled replay. A strategy sees a historical information set, makes a decision,
and receives a simulated outcome. The dangerous part is not writing a trading rule. It is making
sure the replay did not peek, change assumptions between variants, or reward itself with an
unrealistic benchmark.

The shared backtest core puts those responsibilities in one public evaluator. A study supplies
the question. The core supplies the measurement rules.

## The strategy specification

A strategy specification is a frozen description of how decisions become simulated positions. It
names whether the study reacts to events or rebalances a portfolio, its decision time, fill point,
exit rule, notional or capital basis, order priority, dividend treatment, universe, and liquidity
rule.

The decision function must be pure and importable. Mutable closures and parameters that cannot be
serialized are refused. That makes the run identity reproducible and lets serial and parallel runs
produce the same bytes.

The core supports later-session opens, declared auction or intraday points, conditional exits, and
portfolio targets. A fill must occur after the information used to decide it. If a study uses an
official open as a pre-market indication, the report labels that approximation rather than hiding
it.

## No-peeking data views

Each input declares when its fields became available. The view also has a hard maximum date. Asking
for a close, volume, later bar, future membership row, or holdout row too early raises an error. The
core does not drop the offending row to make a run pass.

Listing intervals and trailing liquidity determine eligibility when that history exists. A source
that contains only current listings is marked `SURVIVOR-BIASED SOURCE`. Delisted positions exit at
the last available close when possible; otherwise the study applies and counts its predeclared
delisting fallback.

## Costs and fills

Every run selects one named primary cost profile and at least one distinct harsher sensitivity.
Costs apply per side. Liquidity tiers, spread, adverse movement, fees, participation, and funding
remain separate components instead of one unexplained haircut.

The core can use fractional shares, so small capital does not gain or lose an arbitrary advantage
from whole-share rounding. It reports position notional relative to trailing dollar volume and,
when supplied, opening-auction volume. Missing bars remain missing.

An optional independent price source recomputes the trade result only where that second source has
coverage. The report shows signed price differences and uncovered trades. It never fills a gap in
the second source with the first source and calls that agreement.

## The benchmark rule

The normal primary comparison is:

> strategy net return minus benchmark gross return over exactly the same window

The benchmark can be SPY, cash, or the equal-weight eligible universe. The report also checks that
the strategy’s own net return is positive. A cost-bearing benchmark exists only for an explicitly
labelled allocation comparison, where both sides pay their declared costs.

This distinction prevents a strategy from beating an unfairly costed benchmark while losing money
itself.

## Statistics that share one clock

The evaluator reports trade-level mean and uncertainty, full calendar-session returns, annualized
Sharpe, DSR with a required trial-census input, stationary-bootstrap intervals, drawdown, worst
month, exposure, turnover, folds, recency, and capacity.

Event strategies include zero on eligible days with no position. Capital is based on the maximum
concurrent slots times slot notional. These choices stop rare trading from manufacturing an
impressive Sharpe by changing the denominator or removing quiet days.

## A synthetic proving ground

The evaluator tests itself on generated markets where the truth is known. The synthetic world
contains fat-tailed daily and overnight returns, liquidity tiers, delistings, a planted tier-specific
gap-down effect, cross-sectional momentum, and pure noise.

The final registered proof detected the planted edge in 48 of 50 seeded runs. On 200 pure-noise
runs it rejected 7 times, inside the exact 99% binomial band of 3 to 19. Six canaries covering
look-ahead, survivorship, costs, benchmarks, native simulation, and independent-price behavior
passed. Serial and parallel reports were byte-identical.

That result proves the evaluator can detect this known synthetic effect at the registered size. It
does not prove that any real strategy works. Synthetic power is a test of the ruler, not the thing
being measured.

<!-- sources: docs/backtest-standard.md, docs/plans/p18-backtest-core.md, farm/study/spec.py, farm/study/data.py, farm/study/costs.py, farm/study/benchmark.py, farm/study/stats.py, farm/study/protocol.py, farm/study/run.py, farm/study/synthetic.py, tests/test_study_synthetic.py -->
