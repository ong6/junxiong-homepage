import TradingVersionPage, { Code, H2, P } from "../../components/TradingVersionPage";
import * as V5 from "../../components/diagrams/trading/V5";

// Facts from BUILDLOG.md (entries 2026-09-18 → 09-24), docs/plans/p5–p13,
// docs/history/agent-trading-review-2026-09-22.md, docs/how-it-works.md and docs/direction.md.
const facts = [
	["dates", "18–24 September 2026"],
	["rule books", "21, unchanged"],
	["agent book", "one isolated US$10k simulator book · first run 21 September"],
	["agent buy rules", "risk-on · template pass · confidence ≥ 0.65 · no earnings within 5 days · ≤ 3 positions · 10 % size"],
	["observers", "hourly and four-hour agents · no order authority"],
	["ledger labels", "1, 5, 10 and 20 days after each decision"],
	["verdict gate", "60 sessions, 90 days and 20 trades before any P8 verdict"],
	["gated sources", "SEC EDGAR (probe refused) · Alpaca IEX (no credentials)"],
	["blocked", "TradingView, under its terms at the time · Stooq"],
];

export default function TradingEngineV5() {
	return (
		<TradingVersionPage
			v="v5"
			description="Version 5 of Ong Jun Xiong's paper-trading engine, September 2026: an operating contract, a nightly agent with one locked paper-trade tool, observe-only intraday agents and an evaluation ledger."
			lead="I let a model back in with v5, but only after writing a rulebook for the engine, and only with one narrow job: look at the day’s standouts and, at most, place one paper trade through a tool it cannot widen."
			diagram={V5}
			caption="fig. 1 — v5. ① Yahoo's five-minute bars and headlines are kept as exact responses beside the daily prices; SEC and Alpaca adapters exist but stay off. ② At 02:00 UTC the daily agent reads point-in-time facts and assesses five standouts. ③ A swing needs one call to a locked tool; code sizes it, checks risk and places it in an isolated book that fills at the next open. ④ Every decision, including the observe-only intraday agents', lands in a ledger that labels it against a control."
			facts={facts}>
			<H2>The contract came first</H2>
			<P>
				After my 6 out of 10 review on 18 September, with the server code at about 46,000 lines, the
				engine got an operating contract: maintain mode, an admission test for new work, line
				budgets that the tests enforce, and short build-log entries. The repo went public the same
				day.
			</P>

			<H2>One trade, through a locked tool</H2>
			<P>
				Each night at 02:00 UTC the agent looks at five liquid standouts and marks each one ignore,
				watch, hold or swing. A swing is only a request. It has to go through one locked{" "}
				<Code>submit_paper_trade</Code> call, and deterministic code decides whether it passes and
				how big it is: a risk-on regime, a template pass, confidence of at least 0.65, no earnings
				within five days, no more than three positions, and a 10% position size. The book is
				isolated, holds US$10,000 of paper money and fills at the next open like every other book.
			</P>
			<P>
				The first run on 21 September produced five assessments, two watches and one swing, which was
				not traded. The hourly and four-hour agents have no order path at all.
			</P>

			<H2>Scoring without fooling myself</H2>
			<P>
				Every decision is stored with its information cutoff, the exact model and prompt, and labels
				at one, five, ten and twenty days, next to a paired control. A replay of 2022 showed why that
				matters: the model picked XOM on all four dates and compounded +19.78%. That says more about
				what a model already knows about 2022 than about its judgement, so the replay is labelled
				contaminated and cannot promote anything.
			</P>
			<P>
				The direction written on 24 September is an engine that runs on its own and makes money, with
				AI in the decision loop, and it names evidence time, not code, as the constraint. Until the
				agent has 60 sessions, 90 days and 20 trades behind it, I treat its results as a log, not as
				evidence.
			</P>
		</TradingVersionPage>
	);
}
