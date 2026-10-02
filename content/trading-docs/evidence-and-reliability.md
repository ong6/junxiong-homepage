---
title: Evidence and reliability
summary: Frozen identities, validators, snapshots, backups, and stage timing make a result reproducible and a failure diagnosable.
order: 8
section: Operations
---

# Evidence and reliability

The engine treats evidence as a product, not a side effect. A paper return without its policy,
inputs, cutoff, code identity, costs, and validation state is only a number. The system keeps those
pieces together so a later reader can reproduce what happened and distinguish a research failure
from an operational one.

## Frozen records

A registration freezes the values that define a policy before evidence arrives. A decision then
records the registration, model and prompt identity, input references, cutoff, output, authority,
and failure state. Later labels append outcomes at fixed horizons. They do not replace the original
decision.

Reports and recovery bundles use hashes as compact content identities. A hash is not an argument
that the content is correct. It proves that the bytes being read are the same bytes that were
registered or retained.

Evidence tables are append-only where time matters. Source changes become revisions. Point-in-time
facts keep availability and ingestion times. A missing value stays unavailable rather than becoming
zero.

## What a registration revision means

A registration revision is a newly issued identity for an allowed change. It is not permission to
rewrite old evidence.

Some revisions change the policy and therefore begin a new cohort. Others bind infrastructure
changes that leave the research meaning untouched. The active profitability registration revision
9 is in the second group: it records timing, snapshot, contention, and collection improvements
without changing scoring, books, gates, labels, registered values, or written rows.

The reason for a revision is stored with the registration. Validators bind the complete registered
file set, so an unrecorded source edit fails closed.

## Evidence validators

An evidence validator recomputes important claims from retained source data. It checks registration
and runtime identities, source receipts, availability cutoffs, label maturity, price prefixes, book
mechanics, and report inputs.

Validation distinguishes three cases that can look similar:

- unchanged values fetched again at a later time;
- a source that genuinely revised an earlier value; and
- a stored record that no longer matches its retained identity.

The first can remain valid, the second is reported as a source revision or becomes unavailable, and
the third is fatal. A validator does not weaken the check because a report is inconveniently red.

## Read-only snapshots

Completed producers publish immutable, consistent database snapshots. A manifest records the
source data identity, publication time, file hash, size, and table counts. The newest two
generations are retained.

When no write-ahead log is present, the publisher records source invariants under the normal writer
locks, copies and synchronizes the file, releases the locks, then verifies the copy. With a
write-ahead log, it uses the database’s consistent copy path. A snapshot failure never changes the
producer’s own success or failure.

If the primary database is legitimately writer-locked, read-only API requests may use the latest
valid snapshot. Responses identify that fallback and its as-of time. A corrupt primary does not
trigger fallback, and evidence status uses a snapshot only when it is newer than the live
database’s last write.

## Recovery and timing

A recovery bundle contains a consistent database copy, prospective evidence, operational files,
and release identity. Creation refuses unsafe paths and overlapping producers. Verification checks
the file hash, schema, row counts, job states, active books, and retained files against the manifest.

The product policy also allows a private daily off-server export, restore-checked before it is
pushed. Raw data and private research remain outside this public repository.

Every scheduled driver stage writes a start time, end time, duration, and exit status to its normal
log and a timing record. That makes a slow collector, blocked writer, or failed report stage visible
without guessing from one overall runtime.

Reliability here does not mean pretending nothing fails. It means failures retain enough identity
and timing for an agent to investigate them on demand without changing frozen evidence.

<!-- sources: engine/bitemporal_facts.py, engine/lib/driver.sh, engine/lib/snapshots.py, server/p15-registration.json, server/status_validation.py, tools/p15_evidence_validation.py, tools/publish_snapshot.py, tools/backup_database.py -->
