---
title: How research earns a verdict
summary: Ideas are frozen before testing, charged for every trial, checked on sealed data, and usually stopped rather than tuned.
order: 6
section: Research
---

# How research earns a verdict

The engine starts from an unfriendly assumption: most trading ideas do not work. Some are stories
fitted to old charts. Some are real but too small after costs. Some disappear when delisted names
are restored. Some are simply the luckiest result among many attempts.

The research process is designed to reach a useful “no” as honestly as it reaches a “yes.”

## Register before looking

Before a study can produce evidence, its registration freezes the question. It names the data and
availability rules, universe, decision time, fill point, costs, benchmark, parameters, evaluation
windows, primary statistic, pass bar, and kill condition.

This prevents a familiar failure: run a test, dislike the answer, move one threshold, and call the
new result the original idea. A meaningful change becomes a new version and a new cohort. The old
record remains readable.

Registration does not make a strategy good. It makes the later answer interpretable.

## Count every attempt

Trying more variants makes the best-looking result rise even when every variant is noise. The
trial census records each policy or parameter version that entered evaluation. A discarded loser
still counts.

The deflated Sharpe ratio, usually shortened to DSR, uses that trial count and the shape of returns
to ask whether a reported Sharpe is unusually good relative to the best result expected from many
attempts. In plain language: a Sharpe of 1.5 means less after testing a hundred related ideas than
after testing one genuinely independent idea.

DSR does not repair bad data or a weak benchmark. It is one layer in a stack of protections.

## Develop in folds

A walk-forward study moves through time. It chooses or fits a rule on an earlier development
window, then measures it on a later window. The windows advance, producing several folds. Stronger
recent folds matter because an effect that vanished years ago is not useful now.

The shared backtest standard requires at least six yearly development folds after any burn-in. Each
evaluation uses a complete calendar return series, including zero-return days when the strategy is
inactive. Otherwise a rare event strategy could inflate its statistics by counting only days when
it chose to trade.

Folds are still development data. Researchers can learn from them, so they do not provide the final
answer.

## Open the holdout once

The holdout is a separate, sealed time window. Development views cannot load its rows. Opening it
creates a one-shot marker before access; a second opening is refused.

That marker turns the holdout from a polite request into a mechanical boundary. If the result
fails, the idea cannot be repaired and shown the same “unseen” window again. A revised idea needs a
new research question and future data.

A holdout pass can admit an idea to forward confirmation. It cannot by itself authorize a paper
book, a broker, or capital.

## Confirm on data that did not exist

Historical tests remain vulnerable to selection and, for language models, training-data
contamination. The strongest confirmation is prospective: freeze the policy, then run it on market
sessions that occur after the freeze.

Confirmation is narrow and patient. A candidate produces one registered decision at its stated
horizon. It is compared with its control on the same facts and dates. Monthly epochs and bounded
families limit repeated peeking. A confirmed candidate can move to a simulator book, where fills,
costs, capacity, and drawdown become part of the verdict.

AI policies face an extra rule. Historical prompts from before a model’s training cutoff cannot
promote the policy. Time-locked models and post-cutoff replays can diagnose contamination or kill a
bad policy, but only clean prospective evidence can promote one.

## Why most ideas stop

An idea can die because it:

- fails its primary statistic or sealed holdout;
- works only before costs or only against the wrong benchmark;
- depends on current survivors, revised facts, or unavailable prices;
- has too few independent observations;
- repeats a known factor without adding judgement;
- exceeds the drawdown or capacity envelope; or
- looks good only after enough variants were tried.

Stopping is not a broken pipeline. It is the pipeline doing its job. Negative results remain in
the record so the same idea is not quietly rediscovered and counted as new.

The final path is intentionally long: historical screen, prospective confirmation, simulator book,
and only after an owner-approved Stage 1 pass, perhaps a future broker paper account. Today the
engine is still paper-only, and no AI policy has cleared its prospective gate.

<!-- sources: docs/backtest-standard.md, docs/system-blueprint.md, farm/study/census.py, farm/study/protocol.py, farm/study/stats.py, farm/walkforward/protocol.py, server/p15-registration.json, server/p16-registration.json -->
