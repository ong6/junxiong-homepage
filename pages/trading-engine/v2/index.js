import DiagramFigure from "../../../components/DiagramFigure";
import * as Engine2 from "../../../components/diagrams/trading/Engine2";
import FactList, { pickFacts } from "../../../components/FactList";
import TradingEraPage from "../../../components/TradingEraPage";
import { H2, P } from "../../../components/ArticleParts";
import { ERAS } from "../../../lib/tradingVersions";
import styles from "../../../styles/TradingEngineV2.module.css";

// Engine v2, live on paper since 2026-10-18. Facts from the engine repo and
// its host (git log, BUILDLOG, /meta, pytest --collect-only on main 454cfc6a),
// counted 2026-10-22. The 13 November section and the test count are from
// BUILDLOG, docs/revision-21-storage-deploy-checklist.md and
// pytest --collect-only on main 7699e0de, 2026-11-13. The 23 November section,
// the test count (pytest --collect-only, 354 files) and the book count
// (data/reports/metrics) are from main da783f77: BUILDLOG and docs/change/deploy.md.
const facts = [
	["status", "live on paper since 18 Oct 2026"],
	["paper portfolios", "15, each updated every night · 8 retired 21 Oct, 2 on 30 Oct"],
	["accounts", "next step: one per strategy version · $10k, $50k or $100k"],
	["fills", "opening auction · closing auction · intraday from minute bars"],
	["costs", "commission and fees on every fill · dated rate table"],
	["risk halts", "−20% from peak · −5% in a day · any ledger mismatch"],
	["first night", "every stage finished · 74 fills, each charged fees"],
	["tests", "6,921 on main"],
	["store", "API reads published read-only copies · since 13 Nov"],
	["deploys", "newest green main · every 15 min in quiet windows · rolls back itself · since 23 Nov"],
	["speed", "walk-forward fold 4,872 s → 582 s · identical ledgers"],
	["reviews", "six held the deploy · a fresh reviewer on every change"],
	["edge", "none shown yet"],
];

const railFacts = pickFacts(facts, ["paper portfolios", "fills", "tests", "edge"]);

export default function TradingEngineV2() {
	return (
		<TradingEraPage
			era={ERAS[1]}
			facts={railFacts}
			status="live on paper since 18 Oct 2026"
			description="Engine v2 of Ong Jun Xiong's paper-trading engine, live on paper since 18 October 2026: the engine fills orders, keeps the books and charges commissions on every fill, with deploy checks since 21 October and merged changes deploying themselves since 23 November."
			lead="Engine v2 went live on 18 October 2026, on paper. The engine is now the strategies' broker: it fills their orders, keeps the books, charges commissions on every fill and halts an account that breaks its loss limits. Nothing it runs has shown an edge yet.">
			<DiagramFigure
				id="te-v2"
				headingLevel={2}
				diagram={Engine2}
				caption="fig. 1 — Engine v2 with its deploy checks, live since 21 October: a fresh reviewer, replayed provider responses, a check of every scheduled job and a deploy gate. An invariant monitor, still watch-only, checks each published snapshot before reports read it."
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
				reported success. So I built checks aimed at the running system. They went live with the
				21 October update.
			</P>
			<P>
				One manifest lists every scheduled job and what the machine needs to run it, and a checker
				compares it with the code before a deploy and with the running machine afterwards. A test
				and a live audit check that nothing but the engine&apos;s own services opens the live
				database; everything else reads the snapshot it publishes. Real responses from each data
				provider are recorded once and replayed in the tests, so a format change fails a test
				instead of a deploy. An invariant monitor checks every published snapshot for things that
				must always hold, such as positions, cash and prices agreeing with each other. It still
				runs watch-only, and each known exception carries an expiry date. A deploy gate runs the
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
				passed review. The fixes went live with the checks, and eight portfolios that had shown
				nothing were retired the same day.
			</P>

			<H2>Faster runs, stricter fills</H2>
			<P>
				In the days after the deploy I had agents review the engine in parallel lanes: one profiled
				the slow jobs, one audited the statistics and the fill model, others ran new strategy
				studies. A change merged only after the full suite passed in two time zones, and a speed
				change also had to reproduce the old results exactly on a copy of the store. Rebuilding an
				account from its last unchanged point, instead of from the day it opened, took one
				walk-forward fold from 4,872 to 582 seconds and a three-year replay from 6,877 to 555, with
				identical ledgers.
			</P>
			<P>
				The audit found four places where the simulator was kinder than a market. Fills at the open,
				at the auctions and intraday ignored the extra cost a stress test asked for. A stock with no
				trading volume could still be filled. Studies judged which stocks qualified over a different
				window than the fills used. Bars with a known opening-price fault still reached studies. All
				four are fixed. A rehearsal on a copy of the store also caught a backup step that needed
				13.5 GB of memory, so that storage change was held back until 13 November. None of the new
				strategy studies found an edge worth trading.
			</P>

			<H2>Read-only copies of the store</H2>
			<P>
				The storage change went live on 13 November. The API used to open the engine&apos;s
				database to answer a request. Now the engine publishes read-only copies of the store,
				called generations, and the API serves the newest one. When that copy is older than its
				budget, 24 hours for the board and 3.5 hours for evidence, the response is marked stale
				instead of refused. The jobs that write still read the primary. Publishing holds the store
				only while it copies the file, about two minutes in rehearsal against ten before, and
				builds the generation from the copy.
			</P>
			<P>
				The same release raised the cap on archived data from 80 to 120 GiB. The old cap had
				refused four archive jobs every night since 2 November. It also fixed the weekly
				liquidity backfill, which had counted empty padding rows as failures, skipped the calendar and price work
				for evaluations that already have their final labels, and put the pre-open
				check&apos;s lock waits under one deadline. No data collection was switched off. The deploy
				script stopped once, on a proof that looked for a module in the wrong folder; the proof
				passed with the path corrected and the release went out at 07:02 UTC.
			</P>

			<H2>Changes deploy themselves</H2>
			<P>
				Until 23 November a merged fix reached the engine only when someone walked it through a
				release by hand, so fixes piled up into batches. Now a deployer runs every 15 minutes,
				takes the newest commit on main whose CI is green, runs the deploy gate and the
				registration tests on a private copy, and deploys it. A dependency, schema or contract
				change still waits for me; everything before it goes out.
			</P>
			<P>
				It acts only in quiet moments: outside the nightly and pre-open windows, with no scheduled
				job due in the next 15 minutes, nothing running and enough free disk. If a deploy fails its
				health checks, it rolls back. If a deploy crashes or the rollback fails, each later run
				brings the engine back to the last commit that passed, and after three failed tries it
				clears the failed jobs and restarts the API and UI.
			</P>
			<P>
				It sends no alerts. Every decision goes into a receipt and the hourly digest, and the{" "}
				<a className="ui-link" href="https://github.com/ong6/trading-engine/blob/main/docs/change/deploy.md" target="_blank" rel="noopener noreferrer">deploy doc</a>{" "}
				lists the rules. Before it went live it passed a forced rollback and a real deploy on the
				server.
			</P>
			<P>
				The same day a hand release paused every job, then failed checking its own backup, and the
				engine sat paused for about half an hour until it was restored by hand. A release that
				fails before it changes anything now restores the paused jobs itself.
			</P>
			<P>
				I also rewrote the docs for agents: a short map at the root, a note in each code folder and
				docs grouped by task, with dated material moved to an archive. The server keeps only its
				newest two local backups, since the long-term copies live in a private GitHub repo. The
				cleanup deleted nearly 3,000 lines of one-off scripts and old migrations.
			</P>

			<FactList facts={facts} className={styles.facts} />
		</TradingEraPage>
	);
}
