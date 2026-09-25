import TradingVersionPage, { H2, P } from "../../components/TradingVersionPage";
import * as V4 from "../../components/diagrams/trading/V4";

// Facts from docs/history/buildlog-2026-07-15-to-2026-09-17.md (lines 1249–2543),
// the 2026-08-20 and 2026-09-02 history documents, docs/feedback.md and sim/fills.py.
const facts = [
	["dates", "18 August – 17 September 2026"],
	["model calls in the loop", "none"],
	["price sources", "Yahoo only · Nasdaq API as verifier, not failover"],
	["books", "25 → 18 after the AI layer, 21 active by the end"],
	["walk-forward", "10 folds, up from 6"],
	["sweep farm", "51 candidates, no model calls"],
	["forward monitors", "sector momentum · XS 12-1 momentum · E1 Mondays"],
	["fill model", "v4 · profiles baseline, 2× cost, participation stress"],
	["tests", "228 on 2 September → 2,261 by mid-September"],
];

export default function TradingEngineV4() {
	return (
		<TradingVersionPage
			v="v4"
			description="Version 4 of Ong Jun Xiong's paper-trading engine, August–September 2026: no model in the loop, a 10-fold walk-forward, a simulator audit and frozen forward monitors."
			lead="With no model in the loop, v4 spent a month testing whether any of the strategies were real. Almost none were, and most of the month went into showing that carefully enough to believe it."
			diagram={V4}
			caption="fig. 1 — v4. ① Yahoo remains the only price source; Nasdaq's quote API checks it on a schedule instead of standing in for it. ② Macro feeds become regime signals in the same store. ③ The league trades 21 frozen books through fill model v4. ④ Forward monitors, a Sunday walk-forward and a no-model sweep farm judge the results, and none of them can promote a book."
			facts={facts}>
			<H2>Grids instead of a model</H2>
			<P>
				The walk-forward went from six folds to ten, because a single window could flip a verdict.
				The sweep farm tried 51 candidates without a single model call. Live results could not help
				either: no book had reached a t-statistic of 2, so none was tuned on them.
			</P>
			<P>
				The harder finding was the ceiling. Of 30 swept candidates, 26 were indistinguishable from
				their benchmark and none beat it, and the test only had even odds of spotting an edge near
				seven points a year. Smaller edges were invisible to it. Because the history holds only
				today&apos;s survivors, more compute would not have fixed that; it is a limit of the data.
			</P>

			<H2>The audit of 2 September</H2>
			<P>
				A full read of the simulator found seven bugs. The worst was that no dividend had ever been
				credited, which a backfill fixed with 26 credits worth $230.42. Monthly books would have
				skipped a month that ended on a weekend, and there were $0 fills, a look-ahead rollback and
				risk gates that trusted a typed price. The split checker had also restated three real
				crashes, BH, ORCL and NEM, as splits, and a re-audit later reverted 18 more. The engine had
				228 tests after that audit and over 2,200 two weeks later.
			</P>

			<H2>Monitors that cannot promote</H2>
			<P>
				Fill model v4 added named execution profiles, so any result can be rerun at double cost or
				under a participation limit. Doubling costs at $39,000 barely moved SPY but took 1.85
				points a year off the stock basket. By September three forward monitors were running, each
				frozen before its first signal: sector momentum against SPY, cross-sectional 12-1 momentum
				against equal weight over 48 paired months, and the Monday experiment, which needs 40
				Mondays and ends in May 2027. None of them can change a book; they can only report whether
				it should continue.
			</P>
			<P>
				By mid-September the engine was honest and very large. My own review on 18 September gave it
				6 out of 10, with research output and scope control both at 3. I decided the next version
				would start with limits on the engine itself before any agent came back.
			</P>
		</TradingVersionPage>
	);
}
