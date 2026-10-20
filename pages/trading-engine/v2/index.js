import DiagramFigure from "../../../components/DiagramFigure";
import * as Engine2 from "../../../components/diagrams/trading/Engine2";
import FactList from "../../../components/FactList";
import TradingEraPage from "../../../components/TradingEraPage";
import { H2, P } from "../../../components/TradingVersionPage";
import { ERAS } from "../../../lib/tradingVersions";

// Engine v2, live on paper since 2026-10-18. Facts from the engine repo and
// its host (git log, /meta, pytest --collect-only on main and on the branch
// carrying the new checks), counted 2026-10-20.
const facts = [
	["status", "live on paper since 18 Oct 2026"],
	["paper portfolios", "25, each updated every night"],
	["accounts", "next step: one per strategy version · $10k, $50k or $100k"],
	["fills", "opening auction · closing auction · intraday from minute bars"],
	["costs", "commission and fees on every fill · dated rate table"],
	["risk halts", "−20% from peak · −5% in a day · any ledger mismatch"],
	["first night", "every stage finished · 74 fills, each charged fees"],
	["tests", "4,812 on main · 4,980 with the checks landing next"],
	["reviews", "six held the deploy · a fresh reviewer on every change"],
	["edge", "none shown yet"],
];

export default function TradingEngineV2() {
	return (
		<TradingEraPage
			era={ERAS[1]}
			status="live on paper since 18 Oct 2026"
			description="Engine v2 of Ong Jun Xiong's paper-trading engine, live on paper since 18 October 2026: the engine fills orders, keeps the books and charges commissions on every fill, with deploy checks landing in the next update."
			lead="Engine v2 went live on 18 October 2026, on paper. The engine is now the strategies' broker: it fills their orders, keeps the books, charges commissions on every fill and halts an account that breaks its loss limits. Nothing it runs has shown an edge yet.">
			<DiagramFigure
				id="te-v2"
				headingLevel={2}
				diagram={Engine2}
				caption="fig. 1 — Engine v2 with the checks I am adding in the next update. A change will pass a fresh reviewer, replayed provider responses, the schedule check and the deploy gate before it deploys; the live store will open only to the engine's own services, and an invariant monitor, watch-only at first, will check each published snapshot before reports read it."
			/>

			<H2>Why a new engine</H2>
			<P>
				In Engine v1 a strategy and its bookkeeping were the same code, so every strategy kept
				its own cash and none of them paid commissions. That made the results easy to flatter and
				hard to compare. Now the money lives in one place, every strategy pays the same costs, and a
				changed strategy runs as a new version in its own account beside the old one until one of
				them is retired.
			</P>

			<H2>What the engine owns</H2>
			<P>
				Orders fill at the opening auction, the closing auction or intraday from minute bars.
				Commissions and regulatory fees come from one rate table that records the date each rate
				took effect, so buying 300 shares at $5 at the open costs $1.56. Accounts under $25k follow
				the pattern-day-trader rule. Stocks can be shorted. An account halts at 20% below its peak,
				a 5% loss in a day or any mismatch in its ledger, and stays halted until someone restarts
				it. Options are designed in but stay switched off until I have bid and ask quotes to fill
				them honestly.
			</P>
			<P>
				The 25 paper portfolios from Engine v1 kept running through the switch. On the first night
				under v2 every stage finished and each of the 74 fills was charged its fees. Moving each
				strategy into its own engine-owned account is the next step, one strategy at a time.
			</P>

			<H2>Getting it live</H2>
			<P>
				Each round of the build went to an independent reviewer that could read the code but not
				change it. Six reviews in a row said not to deploy. The early ones found rules enforced
				differently on different settlement paths; the later ones found bugs that only appear when
				data arrives late, such as a delayed stock split or a backdated restart. The fix was to
				rebuild each account by replaying its whole history from the day it opened on every
				settle, and to treat the stored rows only as a checked cache.
			</P>
			<P>
				The deploy itself took three attempts on 18 October. The first stopped because a tool was
				missing from the deploy shell, before anything had changed. The second tripped the check
				that ties each registered strategy to the exact code it was approved on, so I rolled back to
				the previous version, re-recorded the registration and tried again. The third went live at
				19:52 UTC.
			</P>

			<H2>Checking the system, not only the strategies</H2>
			<P>
				Most of what went wrong in the weeks before was not a wrong formula. A long research job
				held the live database open and blocked a morning write. A data provider changed a response
				and a collector failed in the middle of the deploy. A weekly job left work unfinished and still
				reported success. So this week I built checks aimed at the running system. They sit on their own branches for now and land on the main branch together in the next update.
			</P>
			<P>
				One manifest lists every scheduled job and what the machine needs to run it, and a checker
				compares it with the code before a deploy and with the running machine afterwards. A test
				and a live audit will make sure nothing but the engine&apos;s own services can open the live
				database; everything else reads the snapshot it publishes. Real responses from each data
				provider are recorded once and replayed in the tests, so a format change fails a test
				instead of a deploy. An invariant monitor checks every published snapshot for things that
				must always hold, such as positions, cash and prices agreeing with each other. It runs
				watch-only first, and each known exception carries an expiry date. A deploy gate runs the
				pre-deploy checks on one copy of the code and refuses it when a registered strategy&apos;s
				code no longer matches its recorded fingerprint.
			</P>
			<P>
				Every change, including these, goes to a fresh AI reviewer that did not write it and
				reruns its tests. The agents building the infrastructure scored their own first drafts 9 out
				of 10 or higher; the reviewers rejected the first five, each with real defects, and sent
				them back until they passed. A separate pass had agents look for problems in the live
				system, a second agent try to disprove each finding, and a fresh reviewer check each fix.
				Of 37 candidates, 34 held up and became 18 distinct issues, and all eight code fixes
				passed review. The fixes land on the main branch with the checks.
			</P>

			<FactList facts={facts} mt={{ base: 12, md: 14 }} />
		</TradingEraPage>
	);
}
