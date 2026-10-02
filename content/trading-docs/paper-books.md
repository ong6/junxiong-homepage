---
title: Paper books and the league
summary: Paper books behave like portfolios with delayed fills and costs, while the league shows how each one compares with SPY.
order: 4
section: How it works
---

# Paper books and the league

A paper book is a simulated portfolio. It has a starting balance, cash, open positions, pending
orders, fills, dividends, and an equity history. It can make or lose simulated money, but it has no
broker account and cannot touch real capital.

The word “paper” does not mean “assume every trade worked.” The simulator deliberately makes entry
harder than reading a chart after the fact.

## A signal is not a fill

Most strategies decide after a session’s data is complete. Their orders can fill only at a later
session’s open. A same-bar fill is rejected. That one rule blocks a common form of accidental
look-ahead: deciding from a closing price and pretending the trade happened at an earlier or equal
price on the same bar.

At the next session, the simulator asks whether a real, positive, non-zero-volume open exists. If a
name is halted, delisted, missing, or printing a dead zero-volume quote, the order remains pending.
After three trading days without a tradeable bar, it is rejected. A bar is never invented.

Orders also face a liquidity cap. The baseline profile rejects an order whose open notional is more
than 1% of the name’s trailing 60-session median daily dollar volume. Partial fills are not modeled
in the live league baseline, so an oversized order is rejected rather than conveniently squeezed
through.

## Costs are part of the fill

The baseline execution profile moves a buy above the raw open and a sell below it. The adjustment
contains a liquidity-tier half-spread plus five basis points of additional adverse movement per
side. The half-spread is 5 basis points for the most liquid names, then 10, 15, or 25 basis points as
liquidity falls.

The baseline does not claim separately verified broker fees. Research can apply named harsher
profiles and broker-specific estimates, but unverified profiles must say so. The shared backtest
core also requires a primary cost profile and at least one distinct, harsher sensitivity.

These costs make the paper result conservative in a useful way, but they are still a model. The
daily open comes from retail-accessible data. It does not reproduce opening-auction queue position,
partial fills, or every venue fee. That is why future broker-paper reconciliation, if ever approved,
would measure the difference rather than assume the simulator is exact.

## The nightly league

After prices arrive, the league fills eligible pending orders, credits eligible dividends, marks
every active book to the latest close, generates new orders, and appends that day’s equity. The step
is atomic and idempotent: a partially written day cannot quietly become the official result.

The league ranks active books by total return. For each book it shows:

- inception date and current equity;
- total return and return relative to SPY over the same book lifetime;
- maximum drawdown;
- open positions and fill count; and
- return over the latest five sessions.

The SPY comparison includes dividends. A price-only benchmark would flatter every book by ignoring
income that a buy-and-hold investor would have received. “Versus SPY” is still a comparison, not a
claim that the book has passed a research gate.

Stale marks are displayed too. If a held name stops trading, carrying its last close can make equity
look more certain than it is. The report identifies stale positions and pending exits instead of
hiding them in a log.

## Matched books answer better questions

The profitability evidence loop uses three books with the same universe, timing, sizing framework,
entry protection, and cost model. One ranks by AI score, one by a deterministic rule, and one lets
AI veto the rule. Because mechanics are matched, a difference is more likely to come from the score
or veto than from a different fill assumption.

Private research strategies run in a separate private repository and reach the engine only through
the shared backtest core and paper books. A public paper-book identity may show that a separately
held policy is running, but its private rules and research results stay outside this repository.

Paper equity is evidence about a simulator under stated assumptions. It is not cash, it is not a
broker statement, and it is never permission to trade live.

<!-- sources: sim/execution.py, sim/fills.py, sim/league.py, sim/p15_books.py, sim/p15_fills.py, sim/strategies/spy_benchmark.py, server/nightly_reports.py -->
