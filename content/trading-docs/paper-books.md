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
than 1% of the name’s trailing 60-session median daily dollar volume. A name whose median dollar
volume is exactly zero is treated as untradeable, not as unlimited. Partial fills are not modeled
in the live league baseline, so an oversized order is rejected rather than conveniently squeezed
through.

## Costs are part of the fill

The baseline execution profile moves a buy above the raw open and a sell below it. The adjustment
contains a liquidity-tier half-spread plus five basis points of additional adverse movement per
side. The half-spread is 5 basis points for the most liquid names, then 10, 15, or 25 basis points as
liquidity falls.

Since 19 October 2026 every book also pays a registered commission schedule modelled on a retail
broker's tiered pricing. The change was recorded as a break in each book's history, and each book's
evaluation clock restarted there, so a result never mixes the old and new cost rules. Research can
apply named harsher profiles; those now apply on every fill path, including auction and intraday
fills. The shared backtest core also requires a primary cost profile and at least one distinct,
harsher sensitivity.

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
hiding them in a log. A holding that is delisted is closed out at its last real traded close, the
same way for every book, so replaying the history gives the same answer.

Books that stop answering a question are retired. On 21 October 2026 eight books with no edge after
costs were retired, leaving 17 active. A retired book stops trading; its equity history and
positions stay in the record.

## Engine v2: one ledger for every account

Since 18 October 2026 the engine is the single executor and ledger for every paper book and every
separately funded paper account. An account's cash, holdings, and equity are recomputed from its
complete history of fills, corporate actions, dividends, financing, and fees every time it
settles; the stored balances are only a cache that must match that recomputation.

Generic paper accounts can use a few more order types than the original books: opening- and
closing-auction orders, and intraday orders that are filled later from recorded minute bars.
Stock shorts are allowed with a recorded borrow availability and borrow cost, under margin and
day-trading limits. Options execution is refused until real bid and ask quotes exist.

An account halts automatically at a 20% fall from its peak, a 5% loss in one day, or any mismatch
between its ledger and the recomputed state. A halted account keeps its positions and stays
marked; it never resumes on its own.

## Matched books answer better questions

The profitability evidence loop uses three books with the same universe, timing, sizing framework,
entry protection, and cost model. One ranks by AI score, one by a deterministic rule, and one lets
AI veto the rule. Because mechanics are matched, a difference is more likely to come from the score
or veto than from a different fill assumption.

Private research strategies run in a separate private repository and reach the engine only through
the shared backtest core and paper accounts. Each private strategy version gets its own separately
funded account; a public identity may show that such a policy is running, but its private rules and
research results stay outside this repository, and none of them has a proven edge.

Paper equity is evidence about a simulator under stated assumptions. It is not cash, it is not a
broker statement, and it is never permission to trade live.

<!-- sources: docs/product.md, docs/paper-account-contract.md, docs/plans/p22-engine-v2-accounts.md, sim/book_breaks.py, sim/ledger.py, sim/execution.py, sim/fills.py, sim/league.py, sim/p15_books.py, sim/p15_fills.py, sim/strategies/spy_benchmark.py, server/nightly_reports.py -->
