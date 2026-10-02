---
title: Glossary
summary: Plain names for the engine’s plan codes, workstreams, research safeguards, and paper-trading terms.
order: 11
section: Start here
---

# Glossary

Internal records use short codes so plans and registrations keep stable identities. A code is only
a label. It is not a quality mark, a profit claim, or proof that the work is active.

## Plan codes

| Code | Plain name | Meaning |
|---|---|---|
| P1 | Appliance mode | The closed plan that once framed the engine as a maintain-only service. |
| P2 | League collapse | Retires old paper books that no longer answer a live research question. |
| P3 | Point-in-time data | Builds survivor-aware historical membership and data inputs, using free sources first. |
| P4 | Broker decision | Records the long-term broker choice while granting no connection or trading authority. |
| P5 | Agent paper decisions | Lets one constrained agent create orders only in an isolated simulator book. |
| P6 | Alpha experiment | Ran one frozen deterministic SPY/BIL experiment and preserved its negative result. |
| P7 | Autonomous paper trial | Compares rule-only, AI-only, and hybrid allocation books on the same paper capital. |
| P8 | Daily opportunity agent | Reviews nightly market standouts and can use one locked simulator-only trade tool. |
| P9 | Multi-cadence agent tools | Adds hourly and four-hour shadow observers around the nightly agent path. |
| P10 | Contamination-aware 2022 replay | Replays a few old decisions as a diagnostic, not as evidence of predictive skill. |
| P11 | Forward agent evaluation | Joins frozen agent decisions to later outcomes in an append-only evaluation record. |
| P12 | Agent research product | Brings agent data, execution, evaluation, and status views into one programme. |
| P13 | Market-data source hardening | Adds exact-response, research-only adapters and explicit source-admission rules. |
| P14 | TradingView historical archive | Collects a resumable, survivor-biased daily-bar archive for research only. |
| P15 | Profitability evidence loop | Scores every candidate, runs paired paper books, and tests the model against a rule. |
| P16 | Challenger lab, text edge, and evaluation science | Builds shadow challengers, text labs, stronger statistics, portfolios, and execution measurement. |
| P17 | Personal-host IBKR paper execution | A proposed future broker paper plan on personal hardware; explicitly not work for now. |
| P18 | Shared backtest core | Supplies one public point-in-time evaluator for event and portfolio studies. |

The plan index is the single source of truth for status. “Done” means the planned work finished; it
does not mean the strategy was profitable.

## Workstream codes

Workstream codes are local to their plan. W8 alone is ambiguous: the profitability evidence loop’s
W8 means activation, while the challenger lab’s W8 means Stage 2 design.

| Plan | Code | Plain name |
|---|---|---|
| P15 | W0 | Baseline and safety |
| P15 | W1 | Observer evidence |
| P15 | W2 | Scoring and deterministic baseline |
| P15 | W3 | Comparator paper books |
| P15 | W4 | Cancel-only pre-open reassessment |
| P15 | W5 | Shadow event triggers |
| P15 | W6 | Gates and reporting |
| P15 | W7 | Cleanup and documentation |
| P15 | W8 | Activation |
| P16 | W0 | P15 remediation and activation |
| P16 | W1 | Evaluation science |
| P16 | W2 | Challenger lab |
| P16 | W3 | Filing reader |
| P16 | W4 | Historical text and replay labs |
| P16 | W5 | Portfolio construction |
| P16 | W6 | Execution realism |
| P16 | W7 | Operator digest |
| P16 | W8 | Stage 2 design |
| P16 | W9 | Cleanup, registration, rehearsal, and activation |
| P16 | W10 | Final refine pass |
| P16 | W11 | Synthetic proving ground |

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

For examples, see [How research earns a verdict](/trading-engine/docs/research-process),
[Paper books and the league](/trading-engine/docs/paper-books), and
[Evidence and reliability](/trading-engine/docs/evidence-and-reliability).

<!-- sources: docs/glossary.md, docs/plans/README.md, docs/plans/p15-profitability-evidence-loop.md, docs/plans/p16-challenger-lab-and-text-edge.md, farm/study/protocol.py, farm/study/stats.py, sim/league.py, tools/p15_evidence_validation.py -->
