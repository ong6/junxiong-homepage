---
title: Operations
summary: Locks, schedule checks, read-only fallbacks, verified backups, and on-demand investigation keep unattended paper research recoverable.
order: 9
section: Operations
---

# Operations

The engine is designed to run unattended on a Linux server, but “unattended” does not mean
uncontrolled. Schedules are versioned, writers cooperate through locks, reports fail visibly, and
deployment checks compare installed automation with repository sources.

There is no push alerting. Failures are investigated on demand by an agent using retained logs,
status views, timing records, source receipts, and snapshots.

## Schedule guardrails

Five deterministic drivers cover the weekday nightly, Saturday verification and sweeps, Sunday
liquidity, and Sunday walk-forward work. A separate Saturday postflight checks Friday’s expected
miner receipts. Agent and market-sensitive jobs use versioned service timers.

The scheduler status verifies the exact 5+1 cron shape, scheduler service state, UTC server
timezone, executable driver sources, and safe writable log targets. The installer owns only its
managed block, so it does not discard unrelated schedule entries.

Each driver takes an advisory lock. The status projection combines the schedule, log markers, lock,
and grace period:

| State | Meaning |
|---|---|
| running | A start exists and the driver still holds its lock |
| interrupted | A start has no terminal marker and no matching lock |
| stale-running | The lock is still held beyond the registered grace |
| overdue | A scheduled slot and grace passed without a current run |

These states diagnose. They do not restart a process, replay a missed market window, or edit a job.
Missed intraday observations remain missed because a later replay would have a different
information set.

## One writer, bounded workers

DuckDB permits one writer. Producers use short write sections around network work, and heavy jobs
go through a queue. Explicitly safe research jobs may use isolated read-only workers, while the
writer and launch budget remain bounded.

Starting a second nightly or queue drain around a held producer lock is an operational error. A
failed queue job keeps its state and error instead of disappearing into a retry loop.

## Snapshots and API fallback

Completed producers publish a consistent read-only database snapshot plus a manifest. Publication
is atomic, and the latest link changes only after verification. Snapshot errors are fail-soft for
the producer: they are recorded, but do not turn a successfully completed data job into a partial
rewrite.

When a normal writer lock temporarily blocks the live store, read-only API routes can fall back to
a qualifying snapshot. Response headers say that the snapshot was used and give its as-of time.
Fallback is deliberately narrow: an unreadable or corrupt primary is a different incident and is
not hidden by an older copy.

## Backups and restore checks

The recovery tool creates a bundle only at an explicit path outside the checkout. It takes a
consistent database copy, retains prospective evidence and operational controls, writes a manifest,
and verifies the result before publication. It refuses to overwrite an existing destination.

Verification reopens the copied database read-only and checks schema identity, table and index
counts, row counts, job states, latest market date, active paper-book identity, and every retained
file. A backup that cannot be read and matched is not a backup.

Private off-server backup policy goes further: export the store and research files, restore the
export, check each table, and only then push the private copy. Nothing in that path publishes raw
data or private research to this repository.

## Failure triage

When a scheduled job fails, the investigating agent first identifies the newest exact start and
terminal marker, checks the lock and status API, and separates a legitimate current writer from a
stale log. A potentially mutating reproduction runs against a copy.

The fix must address the demonstrated defect. It must not tune a strategy, edit a frozen
registration, recreate missing evidence, or rerun a missed decision with later information. Touched
tests run first, followed by the full suite and the repository’s lint and metrics gates.

This on-demand approach favors durable evidence over noisy notification infrastructure. Local UI
badges, reports, and logs can show a problem; they do not send a push message or grant authority.

## Deployment verification

The automation installer has a read-only planning mode. It compares service definitions, timers,
the managed schedule block, autostart membership, source identities, and server prerequisites. A
“changes required” result describes a plan; it is not permission to apply it.

An admitted deployment applies the installer, verifies installed units against versioned sources,
checks service status, and exercises the relevant read-only status routes. The working tree must end
clean because the nightly synchronizer will not build on uncommitted source or documentation.

The engine remains paper-only throughout these operations. No deployment step on this server may
add broker credentials, a broker connection, or real capital.

<!-- sources: docs/how-it-works.md, engine/lib/driver.sh, engine/queue_runner.py, server/scheduler_monitor.py, server/driver_monitor.py, server/meta_snapshot.py, tools/install_automation.py, tools/publish_snapshot.py, tools/backup_database.py -->
