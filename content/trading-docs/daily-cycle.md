---
title: The daily cycle
summary: A New York-time guide to the market checks, paper-book updates, AI scoring, and weekend maintenance that run automatically.
order: 2
section: How it works
---

# The daily cycle

The engine has two kinds of clocks. Market-sensitive jobs use `America/New_York`, so they stay tied
to the opening bell when daylight saving changes. Nightly and weekend drivers use UTC, so their New
York wall-clock time moves by one hour between Eastern Daylight Time (EDT) and Eastern Standard
Time (EST).

The table below shows New York time. A slash means “during EDT / during EST.”

| New York time | What runs | What it may change |
|---|---|---|
| 9:05 a.m., weekdays | Pre-open reassessment of pending AI-ranked and hybrid entries | May cancel an entry; cannot add, resize, reprice, or fill one |
| 9:35 and 9:50 a.m., then :05/:20/:35/:50 through 3:50 p.m. | Fifteen-minute event cycle for retained headlines, admitted filings, and intraday movers | Writes shadow decisions and labels only |
| 10:15 a.m. through 4:15 p.m., hourly | Hourly market observer | Records a paired shadow observation; no order authority |
| 10:30 a.m. and 1:30 p.m. | Four-hour opportunity observer | Records a slower shadow observation; no order authority |
| 6:30 / 5:30 p.m., weekdays | Main nightly driver at 22:30 UTC | Collects end-of-day data, screens, advances paper books, writes reports, and queues research jobs |
| 9:25 / 8:25 p.m., Tuesday–Saturday | Agent data capture at 01:25 UTC | Appends bounded price, action, response, and independent-price evidence |
| 9:30 / 8:30 p.m., Tuesday–Saturday | Agent-only shadow pass at 01:30 UTC | Records a shadow decision only |
| 10:00 / 9:00 p.m., Tuesday–Saturday | Daily opportunity agent at 02:00 UTC | May use its locked local-simulator tool after deterministic checks |
| 10:30 / 9:30 p.m., Tuesday–Saturday | Candidate-wide profitability scoring at 02:30 UTC | Scores candidates, advances matched paper books, and refreshes evaluation reports |

“Tuesday–Saturday” in the overnight rows is the UTC calendar. In New York, those runs belong to the
preceding Monday–Friday market session.

## Before and during the session

The pre-open check exists because an overnight decision can be stale by the opening bell. It sees a
bounded update and answers only keep or cancel. A failed or unavailable check cannot manufacture a
new entry.

The event cycle begins after the market has opened. Its unusual minute pattern is exact: 9:35,
9:50, then every 15 minutes on :05, :20, :35, and :50 until 3:50. It reads facts whose availability
time is no later than the decision cutoff. These event decisions are shadow evidence; they do not
trade intraday.

The hourly and four-hour observers ask related questions at fixed New York times. Missed windows
are not replayed. Replaying them later would let the observer see facts that were unavailable at
the original time. Each observer holds one database connection for the complete run, including its
retained quote and cross-check writes, and waits no more than 60 seconds for that connection.

## After the close

The main nightly driver is deterministic. It refreshes the universe, collects prices, chooses the
latest session with broad enough coverage, screens candidates, reconciles actions, advances the
paper league, updates frozen forward records, and queues supporting work. Each stage records its
start, finish, duration, and exit status both in the normal log and in
`logs/stage-timings.jsonl`; `tools/stage_timings.py` summarizes recent runs.

After the league and sync, the independent price verifier materializes its database slice and then
uses four network workers behind one global request pacer. Its network phase runs alongside the
farm drain. Earnings collection is bounded to unknown, near-term, or seven-day-stale names on an
ordinary night, with a full eligible-universe pass each Monday. Repeated intraday bars with unchanged
payloads reuse their first fact revision, and new facts are written as batches.

The AI work comes later. First the engine retains inputs and source receipts. Then the daily
opportunity agent runs. Half an hour later, candidate-wide scoring runs with matched rule scores and
refreshes the paper-book and evaluation views. Scoring re-renders the league before it validates
evidence. Evidence failure exits 75 after that render, and the service does not restart on that
status. Keeping these jobs separate makes their information cutoffs and failure states visible.

The historical research archive also runs in bounded slices. On weekdays it has five fixed-UTC
slots; on weekends it has six four-hourly slots. A caught-up TradingView symbol waits for two to
four completed sessions and requests them together at the unchanged request rate; long backfills
keep their existing chunk bound. Because this archive is retrieval-time research data, it never
overwrites operational prices or prices a simulator fill.

Read-only snapshots follow producer cadence rather than every timer indiscriminately. Event runs
publish at most once per 120 minutes, pre-open publishes none, and nightly, scoring, and TradingView
archive runs remain unthrottled. When no write-ahead log exists, the snapshot path durably copies
the raw database and verifies it; a WAL uses DuckDB's consistent copy path.

## Weekends

The deterministic weekend jobs also use UTC:

| New York time | Job | Purpose |
|---|---|---|
| Friday 10:00 / 9:00 p.m. | Saturday verifier | Checks the store and evidence after the trading week |
| Saturday 1:15 / 12:15 a.m. | Friday postflight | Confirms the expected miner receipts were published; it does not repair them |
| Saturday 2:00 / 1:00 a.m. | Weekend sweep driver | Runs only admitted research work |
| Saturday 10:00 / 9:00 p.m. | Sunday liquidity refresh | Refreshes which names are liquid enough for the engine |
| Sunday 2:00 / 1:00 a.m. | Walk-forward revalidation | Repeats frozen evaluations on advancing time windows |

Every scheduled driver has an advisory lock and a completion grace period. A status page can say
running, interrupted, stale-running, or overdue, but it does not silently restart a job. Failures
are investigated on demand by an agent. There is no push alerting.

<!-- sources: BUILDLOG.md, docs/how-it-works.md, engine/bitemporal_facts.py, engine/earnings.py, engine/lib/driver.sh, engine/run_daily.sh, engine/tradingview_history_archive.py, engine/verify_prices.py, server/hourly_opportunity_observer.py, server/run_p15_scoring.sh, server/trading-engine-agent-data-capture.timer, server/trading-engine-agent-shadow.timer, server/trading-engine-daily-opportunity.timer, server/trading-engine-hourly-opportunity.timer, server/trading-engine-four-hour-opportunity.timer, server/trading-engine-p15-preopen.timer, server/trading-engine-p15-events.timer, server/trading-engine-p15-scoring.service, server/trading-engine-p15-scoring.timer, server/trading-engine-tradingview-history.timer, tools/publish_snapshot.py, tools/stage_timings.py -->
