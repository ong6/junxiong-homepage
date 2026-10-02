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
| A local RSS/news scraper | Public headline titles collected throughout the day | Read as an owner-controlled file; each accepted line becomes a timestamped fact |
| Tiingo’s public ticker archive | Historical listing intervals for US stocks | Loaded into an isolated free-source store, never into operational prices |
| Massive grouped daily data | Free grouped daily bars for all US securities returned on each historical date | A private free key is installed; an isolated, resumable capture is running for the exact available 2024-10-02 through 2026-09-30 window |

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

Corporate actions, listing events, and symbol changes follow the same idea. The engine never fills
a gap by copying a current identity backward through time.

## Free two-year survivor capture

The free Massive tier reaches back exactly two years. On 2026-10-02 its earliest available grouped
daily date was therefore 2024-10-02. The isolated capture runs through 2026-09-30, resumes from one
exact retained response per date, and pauses requests during the registered quiet windows. Its
initial proof load for 2026-09-30 admitted 12,613 US securities. Earlier daily responses retain
securities that later delisted instead of starting from today's survivor list.

Real grouped data is not perfectly tidy. The loader stores an individual malformed bar in a
rejection table and continues the date when the rejected share stays within its bound; an invalid
response envelope or more than 5% rejected bars still fails that date. Consolidated volume is
stored as a floating-point value because fractional-share volume exists, and valid lowercase
preferred-share and warrant suffixes are accepted. The source response remains the audit record for
both admitted and rejected rows.

## What the engine knows it does not know

The primary historical price universe is survivor-biased. It begins from names available to the
current collection process, so issuers that disappeared before collection began may be absent. The
TradingView archive is also a frozen current-liquid-universe cohort. It is useful for retrieval-time
research, but it cannot reconstruct old index membership or fundamentals.

The free Tiingo, SEC, and Massive work improves listing, delisting, and daily-bar coverage, but it
does not magically turn the operational store into a complete historical security master. Exact
ticker matching can confuse reused symbols. Form 25 coverage is uneven in older years, and the free
Massive tier provides no bars before 2024-10-02. The grouped-daily capture remains isolated research
data until its completed window is audited; it never rewrites operational prices.

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

<!-- sources: BUILDLOG.md, docs/plans/p3-point-in-time-data.md, engine/collect.py, engine/bitemporal_facts.py, engine/free_sources.py, engine/free_sec.py, engine/p15_event_sources.py, server/intraday_source.py, server/official_quote_source.py, server/tradingview_source.py, tests/test_free_sources.py, tools/free_sources.py, tools/free_sec.py -->
