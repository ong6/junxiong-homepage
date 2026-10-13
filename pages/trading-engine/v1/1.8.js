import TradingVersionPage, { H2, P } from "../../../components/TradingVersionPage";
import * as V8 from "../../../components/diagrams/trading/V8";

// The /trading-engine page as it stood on 2026-10-02, the last update of Engine v1.
// Sources: the public engine repository at a1deeef, especially BUILDLOG.md
// (2026-09-29 through 2026-10-02), docs/system-blueprint.md, docs/product.md,
// docs/backtest-standard.md, docs/pit-free-audit-2026-10-01.md and docs/site/*.md.
// Counts were rerun with pytest --collect-only and tools.metrics_snapshot.
const facts = [
	["status", "paper only · no broker connection"],
	["paper portfolios", "25 active in the simulator"],
	["matched AI comparison", "AI-ranked · rule-ranked · rule with an AI veto"],
	["shared backtest", "event and portfolio strategies · one deterministic core"],
	["evidence rules", "no peeking · named costs · gross benchmark · calendar-day deflated Sharpe"],
	["holdout", "sealed · one opening"],
	["synthetic proof", "planted edge found in 48/50 seeds · noise flagged in 7/200 (3.5%)"],
	["full benchmark", "3,000 stocks × 3,800 sessions · 16 workers · 989.05 s → 0.847 s"],
	["nightly", "about 18 minutes removed from the measured 44.5-minute path"],
	["historical coverage", "old store: roughly 30–38% of listed names per year, 2010–25"],
	["tests", "4,217 collected"],
];

export default function TradingEngineV1_8() {
	return (
		<TradingVersionPage
			v="1.8"
			description="Update 1.8 of Ong Jun Xiong's paper-trading engine, October 2026: every strategy runs through one shared backtest core and one evidence path."
			lead="Since 1.7, the engine has changed shape. Every strategy is now a short specification that runs through one shared backtest core and one evidence path before a paper portfolio can observe it. The AI comparison is live, operations are less fragile, and the data layer now shows how much history the old store missed. It is still paper only. No policy has beaten its frozen control yet."
			diagram={V8}
			caption="fig. 1 — 1.8. Public and separately held private strategies become short specifications. One core owns the no-peeking view, named costs, event or portfolio simulation, gross benchmark, calendar-day deflated Sharpe and sealed holdout. Only its evidence report reaches a paper portfolio. The private live-paper bridge is next, not active."
			facts={facts}>
			<H2>One core, then evidence</H2>

			<P>
				Before 1.8, a new strategy could bring its own replay machinery. Now it only
				describes its decisions, fills, exits, universe and liquidity rule. The shared
				core supplies data that refuses future rows, exact named costs, native event and
				portfolio simulation, the gross-benchmark rule, calendar-day deflated Sharpe and
				a sealed holdout that opens once.
			</P>

			<P>
				I tested the evaluator on a synthetic market where the answer was known. It
				found the planted edge in 48 of 50 seeded runs and rejected noise in 7 of 200,
				or 3.5%. Serial and parallel reports were byte-identical. A shared in-memory
				price panel then cut the 16-worker, 3,000-stock benchmark from 989.05 seconds to
				0.847 seconds without changing those bytes.
			</P>

			<H2>The AI comparison is live</H2>

			<P>
				Three matched paper portfolios now run on the same candidates and mechanics:
				one ranks with AI, one uses the fixed rule, and one starts with the rule and lets
				the model veto an entry. The first live cycles exposed bookkeeping and evidence
				problems. I fixed the checks around refreshed prices, completed fills and league
				reports without changing the scores or the comparison.
			</P>

			<H2>Less waiting, fewer hidden failures</H2>

			<P>
				Each nightly stage now records its own timing. Price checks overlap network
				waits, earnings refreshes are bounded between weekly full passes, and the weekly
				walk-forward uses a rolling eight-slot pool. Together the measured collection
				changes remove about 18 minutes from a 44.5-minute nightly path.
			</P>

			<P>
				Completed writers also publish verified read-only database snapshots. If the
				live database is busy, read-only API routes can serve a recent snapshot and say
				when it was taken. Repeated intraday responses keep their receipt but no longer
				store unchanged bars again, cutting that repeated growth by about 95%. The
				league report is rendered before a failed evidence check stops the scoring
				report, so the current paper standings are not silently skipped.
			</P>

			<H2>A freer survivorship baseline</H2>

			<P>
				The free-source store now has a public ticker master with listing intervals,
				SEC delisting notices and public insider-trade datasets. Its audit found that the
				old store held only roughly a third of the listed names in each year from 2010
				through 2025. A two-year whole-market daily-bar importer is ready, but it has not
				been run without the owner&apos;s free key, so older backtests remain explicit about
				their survivorship limit.
			</P>

			<P>
				Private research strategies run in a separate private repo and are backtested on
				the shared core; a live paper book can observe one in real time without revealing
				it. That live bridge is the next step, not an active trading path.
			</P>
		</TradingVersionPage>
	);
}
