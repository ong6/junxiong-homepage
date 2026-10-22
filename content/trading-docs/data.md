---
title: Data and time
summary: The engine keeps source receipts and availability times so a decision can use only facts that truly existed at that moment.
order: 3
section: How it works
---

# Data and time

Market research fails easily when today’s knowledge leaks into yesterday’s decision. A delisted
stock disappears from a current list. A split-adjusted chart changes after the event. A filing has
an event date but was not accepted until later. The engine treats “when was this true?” and “when
could the system know it?” as separate questions.

## The main sources

| Source | What it contributes | How the engine treats it |
|---|---|---|
| Yahoo through a maintained Python client | End-of-day prices, bounded intraday bars, and headline search results | Primary operational and agent context, with exact cutoffs and missing-data checks |
| Nasdaq symbol directory and independent response captures | Current symbol information and bounded price cross-checks | Verification and diagnostics, not a way to rewrite history |
| TradingView chart responses | Real-time research cross-checks and a resumable daily/5-minute archive | Research only, retained under the owner’s asserted non-display rights; never a fill price |
| A credential-gated Alpaca IEX adapter | Official API quotes and bounded raw daily bars | Implemented but dormant without admitted personal credentials |
| SEC EDGAR | Acceptance-timestamped filings, 8-K events, Form 25 delisting notices, and public insider datasets | Retained with request and availability times; each consumer needs its own activation gate |
| SEC nightly bulk archives (Companyfacts and Submissions) | Point-in-time company fundamentals and earnings-release events | Isolated research store; each fact is available only from its filing's acceptance time |
| A local RSS/news scraper | Public headline titles collected throughout the day | Read as an owner-controlled file; each accepted line becomes a timestamped fact |
| Tiingo’s public ticker archive | Historical listing intervals for US stocks | Loaded into an isolated free-source store, never into operational prices |
| Massive grouped daily data | Free grouped daily bars for all US securities returned on each historical date | Isolated rolling two-year capture and the complete-coverage source for small names within that window; never an operational fill price |
| Massive minute aggregates | Free extended-hours minute bars for a frozen small-stock tier plus three market benchmarks | Isolated, resumable research history with one key-wide limiter; never an operational fill price |

Raw market data and source transcripts are not shipped in this public repository. A new user
regenerates local data from admitted sources.

## Point-in-time means two clocks

A normal price row has a market date and a fetch time. A filing or headline has an event or
publication time, an availability time, and an ingestion time. A decision view asks for facts whose
availability and ingestion times are both no later than its cutoff.

The append-only fact store keeps a new revision when a source changes. It does not silently replace
the old statement. Exact response receipts let a validator distinguish an unchanged re-fetch from
a changed source. This matters because a later download can have the same price values but a newer
fetch timestamp; the evidence validator checks the stored value history rather than pretending the
new timestamp existed earlier.

A filing's acceptance time needs care. SEC's bulk files print it as a clock time without a time
zone, and that clock is New York time. Until 21 October 2026 the engine read it as UTC, which made
some filings look available four or more hours before they really were. One shared rule now reads
the label as New York time and never earlier than the filing's own header says; the same fix let
the live profitability loop's SEC 8-K source record filings again after it had been rejecting
almost all of them.

Corporate actions, listing events, and symbol changes follow the same idea. The engine never fills
a gap by copying a current identity backward through time.

## Repairing stored history

Stored prices can still go wrong. A stock split restated twice leaves old bars on the wrong scale;
a same-night bar can keep an impossible open after the source corrects it. The engine checks each
published snapshot against a list of invariants, such as one price basis per stock after a split,
and reports regressions without acting on them. Repairs go through a separate tool that only
plans by default, changes a bar only when the source's current history agrees with the
correction, keeps every original row in a rejects table, and writes each change to the audit log.
On 22 October 2026 it corrected 18,798 stored rows (fourteen split restatements, one bar left on a
third price basis, and seven stale same-night bars); a second planning run found nothing
left to change.

## Free rolling two-year survivor capture

The free Massive tier exposes a rolling two-year window. Each run starts no earlier than the current
UTC date minus two years plus one day and ends at the most recent completed NYSE session, skipping
weekends and exchange holidays. A daily mode fills missing sessions newest first, at most ten per
run, resumes from one exact retained response per date, and pauses requests during the registered
quiet windows. A current or previous day's completed session can briefly return no bars; that state
is reported as not yet published and is retried instead of being cached. The initial proof load for
2026-09-30 admitted 12,613 US securities.

Within the rolling window, grouped daily is the complete-coverage source for small names: it takes
every US stock returned for the date rather than filtering to the operational liquid universe.
Earlier responses therefore retain securities that later delist. Consumers can request a bounded
daily panel from the isolated database and calculate a point-in-time 60-session median dollar
volume. That median excludes the as-of session and uses VWAP times volume when available, falling
back to close times volume when VWAP is absent.

Real grouped data is not perfectly tidy. The loader stores an individual malformed bar in a
rejection table and continues the date when the rejected share stays within its bound; an invalid
response envelope or more than 5% rejected bars still fails that date. Consolidated volume is
stored as a floating-point value because fractional-share volume exists, and valid lowercase
preferred-share and warrant suffixes are accepted. The source response remains the audit record for
both admitted and rejected rows.

## Free small-stock minute history

The minute lane freezes its universe from the completed grouped-daily archive: three market
benchmarks plus every exact USD Stock ticker that entered the USD 1--5M MDV60 tier. It records
04:00--20:00 New York aggregates in bounded 50-session chunks and labels each bar as pre-market,
regular, or post-market using the exchange calendar, including holidays and early closes. A
content-addressed per-chunk cache makes pagination and restarts repeatable.

All Massive processes share one owner-only lock and timestamp, with at least 13 seconds between
calls. The minute runner also stops in the registered UTC and New York no-call windows and resumes
after the boundary. Its database and manifest are local research inputs only; they do not rewrite
daily prices or grant execution authority.

## What the engine knows it does not know

The primary historical price universe is survivor-biased. It begins from names available to the
current collection process, so issuers that disappeared before collection began may be absent. The
TradingView archive is also a frozen current-liquid-universe cohort. It is useful for retrieval-time
research, but it cannot reconstruct old index membership or fundamentals.

The free Tiingo, SEC, and Massive work improves listing, delisting, and daily-bar coverage, but it
does not magically turn the operational store into a complete historical security master. Exact
ticker matching can confuse reused symbols. Form 25 coverage is uneven in older years, and the free
Massive tier provides no bars before its moving two-year boundary. The grouped-daily capture remains
isolated research data until its completed window is audited; it never rewrites operational prices.

Opening prices have another limit. The paper simulator uses a retail data feed’s daily open, not a
direct record of the official opening auction or an investor’s place in that auction. Intraday bar
and quote captures can measure the difference, but the current baseline remains a conservative
model, not a claim of auction-perfect execution. Read [Paper books and the league](/trading-engine/docs/paper-books)
for the fill assumptions.

Missing data stays missing. A halted name, a zero-volume dead quote, an unavailable filing, or an
unreadable response becomes an explicit unavailable, pending, rejected, or quarantined state. The
engine does not invent a bar so a test can finish.

## Why exact source boundaries matter

Operational prices, research-only archives, and independent checks have different authority. A
research quote can appear in a model’s context while still being forbidden from pricing an order.
An official API adapter can exist while remaining dormant. A free security master can support an
audit without changing a running paper book.

Those boundaries make the evidence slower to accumulate, but they also make the conclusion easier
to trust. A strategy that works only after current membership, revised text, or a later bar leaks
backward has not worked at all.

<!-- sources: BUILDLOG.md, docs/plans/p3-point-in-time-data.md, engine/collect.py, engine/bitemporal_facts.py, engine/free_sources.py, engine/free_massive_minute.py, engine/free_sec.py, engine/free_sec_bulk.py, engine/sec_acceptance.py, engine/repair_integrity.py, engine/p15_event_sources.py, server/intraday_source.py, server/official_quote_source.py, server/tradingview_source.py, tests/test_free_sources.py, tools/free_sources.py, tools/free_massive_minute.py, tools/free_sec.py -->
