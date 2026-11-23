---
title: Glossary
summary: Plain meanings for the engine’s research safeguards and paper-trading terms.
order: 11
section: Start here
---

# Glossary

Plain meanings for the research safeguards and paper-trading terms used across these pages.

## Research terms

| Term | Plain meaning |
|---|---|
| Registration | The frozen statement of a policy, data rules, costs, test, and kill condition before evidence is seen. |
| Revision | A newly issued registration for an allowed change; old evidence and versions are not silently rewritten. |
| Holdout | A sealed slice of data opened once, after development choices finish, to test the idea on unseen data. |
| Census | The count of every tried policy or variant, used to correct for the luck of trying many ideas. |
| DSR | Deflated Sharpe ratio: a Sharpe check adjusted for the number and similarity of trials and for non-normal returns. |
| Walk-forward | Repeated development and evaluation across advancing time windows, with evaluation always later than selection. |
| Control | A frozen rule or benchmark measured on the same dates and inputs as the policy being judged. |
| Cohort | Decisions produced by one frozen policy version under one registered set of rules. |

## Paper and operations terms

| Term | Plain meaning |
|---|---|
| Paper book | A simulated portfolio with orders, fills, cash, positions, and costs, but no broker or real money. |
| League | The nightly table that ranks active paper books by return and shows each result against SPY. |
| Snapshot | An immutable capture of state, such as a consistent read-only database copy or dated metrics record. |
| Evidence validator | Deterministic code that checks identities, timestamps, source bytes, labels, and report inputs before accepting evidence. |
| Next-open fill | An order decided from one session that may fill only at a later session’s open. |
| Shadow decision | A retained model or rule decision with no authority to place even a simulator order. |
| Point-in-time | Data exposed only when it would truly have been available to the decision being replayed. |
| Kill condition | A rule frozen before testing that stops an idea when its evidence is too weak or its risk is too high. |
| Engine v2 | The account and money foundation live since 18 October 2026: one ledger for every paper book and account, with commissions, auction and intraday fills, shorts, margin, and halts. |
| D0 | The recorded break date (19 October 2026) from which every book pays commissions and its evaluation clock restarted. |
| Provisional bar | A price bar stored on the night of its own session that the source may still correct; it is asked for again and never prices a fill while its open is impossible. |
| Invariant monitor | A shadow check that compares each published snapshot against store-wide rules, such as one price basis per stock, and reports regressions without changing data. |

For examples, see [How research earns a verdict](/trading-engine/docs/research-process),
[Paper books and the league](/trading-engine/docs/paper-books), and
[Evidence and reliability](/trading-engine/docs/evidence-and-reliability).

<!-- sources: docs/architecture/glossary.md, docs/plans/README.md, docs/plans/p15-profitability-evidence-loop.md, docs/plans/p16-challenger-lab-and-text-edge.md, farm/study/protocol.py, farm/study/stats.py, sim/league.py, tools/p15_evidence_validation.py -->
