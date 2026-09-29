import TradingVersionPage, { Code, H2, P } from "../../components/TradingVersionPage";
import * as V6 from "../../components/diagrams/trading/V6";

// The /trading-engine page as it stood on 2026-09-25, moved here when v7
// replaced it. Facts and copy are the ones that page carried.
const facts = [
	["paper books", "21 rule-based (18 replayable) · 1 run by an AI agent"],
	["strategy modules", "30 · one file each, pre-registered"],
	["charters with a kill rule", "10 · 7 closed as rejected or inconclusive"],
	["data sources", "Yahoo · Nasdaq · FRED · Cboe · FINRA · CFTC · AAII · NAAIM · SqueezeMetrics"],
	["research-only source", "TradingView quotes and bars, for the intraday agents"],
	["not connected yet", "Alpaca IEX (dormant) · SEC EDGAR · licensed history"],
	["liquid universe", "~4,100 US names, refreshed weekly"],
	["walk-forward", "10 folds · train 24 mo · validate 12 mo"],
	["api", "34 loopback routes · reads plus paper orders"],
	["tests", "3,280 collected · warnings are failures"],
	["python", "~89k lines outside tests · started 2026-07-16"],
];

export default function TradingEngineV6() {
	return (
		<TradingVersionPage
			v="v6"
			description="Version 6 of Ong Jun Xiong's paper-trading engine, 25 September 2026: TradingView quotes and bars reach the intraday agents as research input, never prices, fills or orders."
			lead="v6 was a small change on top of v5: TradingView quotes and bars reached the intraday agents as research input. They never touched prices, fills or orders."
			diagram={V6}
			caption="fig. 1 — v6. ① Yahoo, Nasdaq and a set of macro and sentiment publishers feed the collectors; Alpaca, SEC EDGAR and licensed history stay off, and Stooq is blocked. ② One writer commits every batch to DuckDB and keeps each provider response as an exact receipt. ③ The screen ranks about 4,100 liquid names and each book turns the ranking into orders at the close. ④ Orders fill at the next open and nowhere else. ⑤ The monitors read the equity paths against a rule frozen before the first signal, and the Sunday walk-forward replays the rule books on older bars. ⑥ The AI agent trades its own paper book through a locked simulator tool; the intraday agents read TradingView quotes and only observe."
			facts={facts}>
			<H2>Running unattended</H2>
			<P>
				Cron fires the nightly at 22:30 UTC: universe, collect, screen, corporate actions,
				league step, the three forward monitors, sync, then the heavier jobs through a queue
				with per-job timeouts and a resource cap. DuckDB has one writer; the collector releases
				it between batches so the API and the UI are never locked out for a multi-hour pull.
				Saturdays a verifier re-checks the full universe against a second source and reports
				disagreements instead of quietly patching them. Sundays the walk-forward replays every
				book through the live <Code>league.py</Code> day-step with the config frozen in its
				database row, so the report can never describe a rule the league is not trading.
			</P>
			<P>
				Coding agents built the engine from a written spec.
				Even after the research answer became &ldquo;nothing
				works yet, wait for evidence&rdquo;, the agents kept building anyway: forty-six
				thousand lines of governance for a broker that does not exist. The repo now carries an
				operating contract, a scope ledger with size ceilings the test suite enforces, and a
				drift snapshot every session must publish. For now, I want it to keep collecting data and reporting against the existing rules while the experiments run.
			</P>
		</TradingVersionPage>
	);
}
