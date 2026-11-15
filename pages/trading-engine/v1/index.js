import { Box, Text } from "@chakra-ui/react";
import CaseStudyFooter from "../../../components/CaseStudyFooter";
import Details from "../../../components/Details";
import DiagramFigure from "../../../components/DiagramFigure";
import FactList from "../../../components/FactList";
import LazyMount from "../../../components/LazyMount";
import TradingEraPage from "../../../components/TradingEraPage";
import * as V1 from "../../../components/diagrams/trading/V1";
import * as V2 from "../../../components/diagrams/trading/V2";
import * as V3 from "../../../components/diagrams/trading/V3";
import * as V4 from "../../../components/diagrams/trading/V4";
import * as V5 from "../../../components/diagrams/trading/V5";
import * as V6 from "../../../components/diagrams/trading/V6";
import * as V7 from "../../../components/diagrams/trading/V7";
import * as V8 from "../../../components/diagrams/trading/V8";
import { Code, H2, P } from "../../../components/ArticleParts";
import { ERAS, VERSIONS } from "../../../lib/tradingVersions";

// Engine v1 as one page: the eight updates newest first (1.8 down to 1.1), each an h2
// section with a stable id ("1-1" … "1-8", the targets of the old /v1/1.N
// redirects), its dates, a short write-up, its diagram and its facts in a
// disclosure. The copy is cut down from the eight update pages this replaced
// (2026-11-15), which cited their sources:
//   1.1 docs/history/buildlog-2026-07-15-to-2026-09-17.md (59–363), commit ead678e
//   1.2 the same buildlog (379–790), commit a9633cf
//   1.3 archive/agentic-2026-08/README.md and its charters; buildlog 84–109, 969–1080, 1231–1422
//   1.4 buildlog 1249–2543, the 2026-08-20 and 2026-09-02 history documents, docs/feedback.md, sim/fills.py
//   1.5 BUILDLOG.md 2026-09-18 → 09-24, docs/history/agent-trading-review-2026-09-22.md,
//       docs/how-it-works.md, docs/direction.md
//   1.6 the /trading-engine page as it stood on 2026-09-25
//   1.7 the /trading-engine page as it stood on 2026-09-29
//   1.8 the engine repository at a1deeef: BUILDLOG.md (2026-09-29 → 10-02), docs/system-blueprint.md,
//       docs/product.md, docs/backtest-standard.md, docs/pit-free-audit-2026-10-01.md; counts from
//       pytest --collect-only and tools.metrics_snapshot

// Eight animated figures on one page: each mounts when it nears the viewport
// (components/LazyMount.js). The placeholder holds the figure's measured
// height so nothing below jumps when it mounts and a deep link to a section
// lands on it. The heights follow the figure's own breakpoints, not Chakra's:
// up to 720px the drawing keeps its designed size and swipes sideways, so only
// the caption's wrap changes the height; above that the drawing scales with
// the figure's width, min(100vw - 32px, 1088px), and stops growing at 1200px.
// Measured on the built page (Chromium, 2026-11-15); re-measure when a caption
// or a drawing's viewBox changes.
//                 <400  400–499 500–720 721–959 960–1199 ≥1200
const FIGURE_H = {
	1.1: [948, 904, 864, 667, 730, 750],
	1.2: [1093, 1003, 924, 715, 775, 806],
	1.3: [1153, 1084, 999, 755, 825, 857],
	1.4: [1028, 979, 904, 687, 740, 770],
	1.5: [1092, 1043, 983, 744, 811, 843],
	1.6: [1249, 1209, 1100, 833, 894, 908],
	1.7: [1362, 1272, 1154, 855, 920, 948],
	1.8: [985, 966, 852, 655, 715, 741],
};
const FIGURE_QUERIES = [
	null,
	"(min-width: 400px)",
	"(min-width: 500px)",
	"(min-width: 721px)",
	"(min-width: 960px)",
	"(min-width: 1200px)",
];
const figureHeight = (v) =>
	Object.fromEntries(
		FIGURE_H[v].map((h, i) =>
			FIGURE_QUERIES[i]
				? [`@media ${FIGURE_QUERIES[i]}`, { "--figure-h": `${h}px` }]
				: ["--figure-h", `${h}px`],
		),
	);
const FIGURE_MY = { base: 10, md: 14 };

function Update({ v, lead, diagram, caption, facts, children }) {
	const version = VERSIONS.find((item) => item.v === v);
	const id = v.replace(".", "-");
	return (
		<Box as="section" aria-labelledby={id} sx={figureHeight(v)}>
			<H2 id={id}>
				<Box as="span" color="text.muted">
					{v}
				</Box>{" "}
				{version.title}
			</H2>
			<Text
				mt={3}
				color="text.muted"
				fontFamily="var(--font-mono)"
				fontSize="12px"
				letterSpacing=".08em"
				textTransform="uppercase">
				{version.dates}
			</Text>
			<P>{lead}</P>
			{/* The first figure is on screen at load; the rest wait until they come near. */}
			<LazyMount minH="var(--figure-h)" my={FIGURE_MY} eager={v === "1.8"}>
				<DiagramFigure id={`te-${id}`} diagram={diagram} caption={caption} />
			</LazyMount>
			{children}
			<Details title={`Facts for ${v}`}>
				<FactList facts={facts} mt={3} />
			</Details>
		</Box>
	);
}

export default function TradingEngineV1() {
	return (
		<TradingEraPage
			era={ERAS[0]}
			status="Jul – Oct 2026 · eight updates"
			description="Engine v1 of Ong Jun Xiong's paper-trading engine, July to October 2026: a research simulator in eight dated updates, from Yahoo daily bars and ten paper portfolios to one shared backtest core."
			lead="Engine v1 was a research simulator. Every strategy ran as a paper portfolio inside it, through eight updates from July to October, newest first on this page. Update 1.8 added the shared backtest core, which Engine v2 still uses for research.">
			<Update
				v="1.8"
				lead="Every strategy is now a short specification that runs through one shared backtest core and one evidence path before a paper portfolio can observe it. No policy has beaten its frozen control yet."
				diagram={V8}
				caption="fig. 1 — Public and separately held private strategies become short specifications. One core owns the no-peeking view, named costs, event or portfolio simulation, gross benchmark, calendar-day deflated Sharpe and sealed holdout. Only its evidence report reaches a paper portfolio."
				facts={[
					["shared backtest", "event and portfolio strategies · one deterministic core"],
					[
						"evidence rules",
						"no peeking · named costs · gross benchmark · calendar-day deflated Sharpe",
					],
					["holdout", "sealed · one opening"],
					["synthetic proof", "planted edge found in 48/50 seeds · noise flagged in 7/200 (3.5%)"],
					["tests", "4,217 collected"],
				]}>
				<P>
					Before 1.8, a new strategy could bring its own replay machinery. Now it only describes its
					decisions, fills, exits, universe and liquidity rule.
				</P>
				<P>
					I tested the evaluator on a synthetic market where the answer was known. It found the
					planted edge in 48 of 50 seeded runs and rejected noise in 7 of 200, or 3.5%. Serial and
					parallel reports were byte-identical. A shared in-memory price panel then cut the
					16-worker, 3,000-stock benchmark from 989.05 seconds to 0.847 seconds without changing
					those bytes.
				</P>
				<P>
					Each nightly stage now records its own timing. Price checks overlap network waits,
					earnings refreshes are bounded between weekly full passes, and the weekly walk-forward
					uses a rolling eight-slot pool. Together the measured collection changes remove about 18
					minutes from a 44.5-minute nightly path.
				</P>
				<P>
					The free-source store now has a public ticker master with listing intervals, SEC delisting
					notices and public insider-trade datasets. Its audit found that the old store held only
					roughly a third of the listed names in each year from 2010 through 2025.
				</P>
			</Update>

			<Update
				v="1.7"
				lead="Since 29 September a model scores every nightly candidate next to a fixed rule, and a paired test decides at set dates whether the model adds anything."
				diagram={V7}
				caption="fig. 2 — ① Yahoo, Nasdaq, TradingView, RSS headlines and a set of macro publishers feed the collectors. ② One writer commits every batch to DuckDB, and each fact carries the time it became available. ③ A fixed rule and a model both score every candidate; event triggers and the challenger lab place no orders. ④ Code sizes each position and checks risk; before the open the model may cancel an order but never add one. ⑤ Orders fill at the next open or a limit order at the open, and nowhere else. ⑥ Every decision lands in one ledger, is labelled later, and a paired test against the rule decides at 60, 90 and 120 trading days."
				facts={[
					["paper portfolios", "25 active in the simulator"],
					["test portfolios", "model-ranked · rule-ranked control · rule + model veto"],
					[
						"entries",
						"volatility sizing · limit order at the open · pre-open check may only cancel",
					],
					["tests logged", "103 written down in advance · counted as 139 trials"],
					["tests", "4,078 collected"],
					["python", "~118k lines outside tests · started 2026-07-16"],
				]}>
				<P>
					Until 1.7 the AI made one pick a night from five standouts, and it abstained on 92% of
					them. At that pace, twenty trades would arrive around February 2027, and twenty trades can
					only detect an edge of about five percent per trade.
				</P>
				<P>
					So the unit of evidence changed from a trade to a scored candidate. Each night the model
					and a fixed rule both score every candidate in a wider universe, and each score is later
					labelled with what the stock did. A paired test compares the two on the same names and
					dates, and I only read it at 60, 90 and 120 scored trading days. Three simulator
					portfolios trade on the scores with identical mechanics: one ranked by the model, one by
					the rule, and one by the rule with a model veto.
				</P>
				<P>
					The model still sizes nothing. Before the open the model can look again and cancel an
					order, never add or resize one, and every cancelled order keeps the fill it would have
					had, so the cancel decision is scored too.
				</P>
				<P>
					Each strategy starts as a written test plan: the mechanism, the control it has to beat,
					one primary statistic, a kill criterion, and the total number of trials. Ten test plans so
					far. Seven are closed as rejected or inconclusive.
				</P>
			</Update>

			<Update
				v="1.6"
				lead="Update 1.6 was a small change on top of 1.5: TradingView quotes and bars reached the intraday agents as research input. They never touched prices, fills or orders."
				diagram={V6}
				caption="fig. 3 — ① Yahoo, Nasdaq and a set of macro and sentiment publishers feed the collectors; Stooq is blocked. ② One writer commits every batch to DuckDB. ③ The screen ranks about 4,100 liquid names. ④ Orders fill at the next open and nowhere else. ⑤ The monitors read the equity paths against a rule frozen before the first signal. ⑥ The intraday agents read TradingView quotes and only observe."
				facts={[
					["paper portfolios", "21 rule-based (18 replayable) · 1 run by an AI agent"],
					["data sources", "Yahoo · Nasdaq · FRED · Cboe · FINRA · CFTC · AAII · SqueezeMetrics"],
					["research-only source", "TradingView quotes and bars, for the intraday agents"],
					["tests", "3,280 collected · warnings are failures"],
					["python", "~89k lines outside tests · started 2026-07-16"],
				]}>
				<P>
					Saturdays a verifier re-checks the full universe against a second source and reports
					disagreements instead of quietly patching them. Sundays the walk-forward replays every
					portfolio through the live <Code>league.py</Code> daily step with the config frozen in its
					database row, so the report can never describe a rule no portfolio is trading.
				</P>
				<P>
					Coding agents built the engine from a written spec. Even after the research answer became
					&ldquo;nothing works yet, wait for evidence&rdquo;, the agents kept building anyway:
					forty-six thousand lines of governance for a broker that does not exist.
				</P>
			</Update>

			<Update
				v="1.5"
				lead="I let a model back in with 1.5, but only after writing a rulebook for the engine, and only with one narrow job: look at the day’s standouts and, at most, place one paper trade through a tool it cannot widen."
				diagram={V5}
				caption="fig. 4 — ① Yahoo's five-minute bars and headlines are kept as raw responses. ② At 02:00 UTC the daily agent reads point-in-time facts and assesses five standouts. ③ A swing needs one call to a locked tool. ④ Every decision, including the observe-only intraday agents', lands in a ledger that labels it against a control."
				facts={[
					["agent portfolio", "one isolated US$10k simulator portfolio · first run 21 September"],
					[
						"agent buy rules",
						"market in risk-on mode · passes the trend screen · confidence ≥ 0.65 · no earnings within 5 days · ≤ 3 positions · 10 % size",
					],
					["observers", "hourly and four-hour agents · no order authority"],
					["not connected yet", "SEC EDGAR (probe refused) · Alpaca IEX (no credentials)"],
				]}>
				<P>
					After my 6 out of 10 review on 18 September, with the server code at about 46,000 lines,
					the engine got a written rulebook: maintenance only, a bar that new work must clear,
					code-size limits that the tests enforce, and short build-log entries. The repo went public
					the same day.
				</P>
				<P>
					A swing is only a request. It has to go through one locked <Code>submit_paper_trade</Code>{" "}
					call, and deterministic code decides whether it passes and how big it is. The first run on
					21 September produced five assessments, two watches and one swing, which was not traded.
				</P>
				<P>
					Every decision is stored with its information cutoff, the exact model and prompt, and
					labels at one, five, ten and twenty days, next to a paired control. A replay of 2022
					showed why that matters: the model picked XOM on all four dates and compounded +19.78%.
					That says more about what a model already knows about 2022 than about its judgement, so
					the replay is labelled contaminated and cannot move anything to real money.
				</P>
				<P>
					Until the agent has 60 trading days, 90 calendar days and 20 trades behind it, I treat its
					results as a log, not as evidence.
				</P>
			</Update>

			<Update
				v="1.4"
				lead="With no model in the loop, 1.4 spent a month testing whether any of the strategies were real. Almost none were, and most of the month went into showing that carefully enough to believe it."
				diagram={V4}
				caption="fig. 5 — ① Yahoo remains the only price source; Nasdaq's quote API checks it on a schedule instead of standing in for it. ② Macro feeds become regime signals in the same store. ③ The 21 paper portfolios trade on frozen rules through fill model v4. ④ Forward monitors, a Sunday walk-forward and a no-model sweep farm judge the results."
				facts={[
					["price sources", "Yahoo only · Nasdaq API as verifier, not failover"],
					["portfolios", "25 → 18 after the AI layer, 21 active by the end"],
					["fill model", "v4 · profiles baseline, 2× cost, participation stress"],
					["tests", "228 on 2 September → 2,261 by mid-September"],
				]}>
				<P>
					The walk-forward went from six folds to ten, because a single window could flip a verdict.
					The sweep farm tried 51 candidates without a single model call.
				</P>
				<P>
					The harder finding was the ceiling. Of 30 swept candidates, 26 were indistinguishable from
					their benchmark and none beat it, and the test only had even odds of spotting an edge near
					seven points a year. Because the history holds only today&apos;s survivors, more compute
					would not have fixed that; it is a limit of the data.
				</P>
				<P>
					An audit on 2 September found seven simulator bugs. The worst was that no dividend had
					ever been credited, which a backfill fixed with 26 credits worth $230.42.
				</P>
				<P>
					By September three forward monitors were running, each frozen before its first signal.
					None of them can change a portfolio; they can only report whether it should continue.
				</P>
				<P>
					By mid-September the engine was honest and very large. My own review on 18 September gave
					it 6 out of 10, with research output and scope control both at 3. I decided 1.5
					would start with limits on the engine itself before any agent came back.
				</P>
			</Update>

			<Update
				v="1.3"
				lead="Update 1.3 was my first attempt at putting a language model in the trading loop, and the most useful thing it produced was a reason to take it out. The model sat beside five portfolios, could only veto entries or move parameters inside bounds written down in advance, and each of those portfolios ran next to a twin that never changed."
				diagram={V3}
				caption="fig. 6 — ① RSS headline titles feed a morning news brief. ② Two veto agents read it and may veto or shrink the day's entries; three tuning agents may move parameters on Sundays. ③ A validator reads its bounds from each portfolio's frozen test plan and rejects anything outside them. ④ Each AI portfolio is compared with its untouched twin."
				facts={[
					["model call", "one turn, no tools, JSON out · about 18 a week"],
					[
						"veto agent limits",
						"veto or scale 0.25–1.00 · never add · at most half the candidates",
					],
					[
						"tuning agent limits",
						"≤ 2 parameters a run · ≤ 25 % a move · within ±50 % of the original",
					],
					["output", "1 veto file · 1 news brief · 0 scheduled tuning changes"],
					["retired", "18 August · 25 → 18 portfolios"],
				]}>
				<P>
					On 4 August the analyst wrote one brief from 133 headlines, and one veto agent produced
					one file: eight candidates, all marked unclear, no vetoes. From 5 August every scheduled
					run failed because the login they depended on had expired. The failures went into{" "}
					<Code>TODO:</Code> lines in a log nobody read, and the layer stayed dead for thirteen days
					before anyone noticed.
				</P>
				<P>
					I agree with the log&apos;s own verdict: &ldquo;The defect was not the failure, it was the
					silence.&rdquo; The model acted in one run out of about fifteen, so any spread against the
					twins was noise, and calling it an AI result would have been dishonest. The more lasting
					lesson was about where a model belongs. Frequent, low-stakes calls that a rule could make
					are the worst use of one, and anything a grid can decide should be decided by a grid.
				</P>
				<P>
					Update 1.4 replaced the model with a parameter grid and a stricter walk-forward. The twin
					idea stayed.
				</P>
			</Update>

			<Update
				v="1.2"
				lead="Update 1.2 added six portfolios, but the change that mattered was finding out the price history was wrong. Yahoo rewrites old prices after a split, the engine only re-fetched the last five days, and dividends were never stored."
				diagram={V2}
				caption="fig. 7 — ① Yahoo now supplies splits and dividends alongside bars. ② Prices are stored as a restated cache with a watermark. ③ A reconcile stage checks the price scale and stops the night if it is broken. ④ Dividends are credited before fills. ⑤ The backtest farm replays each portfolio's own code over past years."
				facts={[
					["new data", "Yahoo splits and dividends · 409,684 action rows"],
					["portfolios", "16 with fixed rules + 1 manual"],
					[
						"new portfolios",
						"turtle breakout · stopped momentum · sector momentum · low vol · 52-week high · post-earnings drift",
					],
					["first reconcile", "36 splits adjudicated · 1,839 dividends stored"],
					["exit", "seven clean nightly runs, 24 July – 3 August"],
				]}>
				<P>
					A five-day refetch leaves a permanent break in the series after a split, so portfolios
					holding that stock showed crashes that never happened. Prices are a cache of Yahoo&apos;s
					adjusted view, restated at the break found in the stored series. Portfolio state is a pure
					function of fills and dividends, with dividends replayed first. Fetching new actions only
					warns, but the reconcile stage is fatal. The log puts the reason better than I can:
					&ldquo;trading on a broken scale is strictly worse than skipping a night.&rdquo;
				</P>
				<P>
					The first grid of 78 jobs drained the same day without a failure, and its answer was
					blunt: no stock-picking portfolio beat its own equal-weight benchmark over any window of
					three years or more. The sample leans toward survivors, with 1,237 eligible names in 2011
					against 3,873 today, and that caveat never went away.
				</P>
				<P>
					That result set the bar for everything since. A stock-picking portfolio has to beat an
					equal-weight basket of the same names, over years, before I treat it as more than noise.
				</P>
			</Update>

			<Update
				v="1.1"
				lead="Most of what went wrong in the first version had nothing to do with trading. It was one cron job on one Linux box: pull the market, screen it, and let ten paper portfolios trade whatever passed, filling at the next morning’s open."
				diagram={V1}
				caption="fig. 8 — ① Nasdaq's symbol list and Yahoo's daily bars are the only inputs. ② One writer owns DuckDB. ③ The screen runs the Minervini trend template with a relative-strength rank. ④ Orders fill at the next open."
				facts={[
					["universe", "Nasdaq Trader symbol list · 12,209 kept · 4,118 liquid"],
					["history", "19.8M rows, back to 1962"],
					["portfolios", "10 with fixed rules + 1 manual · $39,000 each"],
					["fill model", "next open · 5–25 bp spread tier + 5 bp · ≤ 1 % of volume"],
					["schedule", "cron 22:30 UTC, weekdays"],
				]}>
				<P>
					The plan had Stooq as the price source and Yahoo as the fallback. On 16 July Stooq
					returned a JavaScript anti-bot page and Nasdaq&apos;s FTP server timed out, so Yahoo,
					through yfinance, supplied every daily bar.
				</P>
				<P>
					An order signalled at a close fills at the next trading day&apos;s open. A local UI could
					add a discretionary portfolio, fed by risk-checked manual orders that filled the same way.
					That discretionary portfolio broke the engine. From 20 to 23 July every nightly run failed
					at the portfolio step with <Code>KeyError: &apos;discretionary&apos;</Code>, because the
					UI had created the portfolio at runtime and the strategy registry had never heard of it.
					Each day-step runs in one transaction, so every night rolled back cleanly and the paper
					portfolios sat frozen at 17 July with 42 orders pending.
				</P>
				<P>
					The rule I took from it is in the log: a copy used to prove a go-live has to include every
					row the system creates at runtime, not only what the installer creates. What 1.1 still had
					no answer for was splits and dividends, and 1.2 found out how much that mattered.
				</P>
			</Update>

			<CaseStudyFooter
				next={{
					name: `Engine v2: ${ERAS[1].title}`,
					href: ERAS[1].href,
					detail:
						"The engine fills the orders, keeps the books and charges commissions on every fill.",
				}}
			/>
		</TradingEraPage>
	);
}
