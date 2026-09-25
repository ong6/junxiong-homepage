import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import DiagramFigure from "../components/DiagramFigure";
import * as TradingEngineArchitecture from "../components/diagrams/TradingEngineArchitecture";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";

// Case study in the same shape as /skillpack: one ~680px column of prose, the
// architecture figure, one terminal figure, and a single mono fact table.

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// The forward report's own words, trimmed. The numbers are the ones the
// committed report carried on 2026-09-17.
const E1 = [
	["$ cat data/reports/experiments/e1-spy-monday-forward.md", "muted"],
	["NO RESULT YET — 8 of 40 out-of-sample Mondays."],
	["Kill criterion: after 40 Mondays, KILL if mean <= 0 or t < 0.5, net of 20 bp."],
	["Current standing: mean -0.29%, t -1.37 — would KILL if applied today,", "hot"],
	["which it is not. 32 Mondays to go."],
];

const FILL = [
	["$ python -c 'from sim.fills import attempt_fill; ...'", "muted"],
	["ValueError: look-ahead violation: fill_date 2026-09-17 !> signal_date 2026-09-17", "hot"],
	[""],
	["# sim/fills.py — the only guard, verbatim", "muted"],
	["if fill_date <= signal_date:"],
	['    raise ValueError(f"look-ahead violation: fill_date {fill_date} !> signal_date {signal_date}")'],
];

// Dates come from the repo's BUILDLOG, plans and archive READMEs.
const VERSIONS = [
	{
		v: "v1",
		when: "16–27 Jul 2026",
		title: "Data and a first league",
		body: "Yahoo daily bars for about 12,200 listed names (Stooq was blocked on day one), a nightly trend screen, and ten paper books filling at the next open.",
	},
	{
		v: "v2",
		when: "28 Jul – 3 Aug",
		title: "More books and a backtest farm",
		body: "Six research-based strategies took the league to 16 books, a farm replayed every book over past years, and the rules for splits and dividends were settled.",
	},
	{
		v: "v3",
		when: "4–17 Aug",
		title: "AI adjusting the books",
		body: "Five books let a model veto entries or tune parameters inside fixed bounds, each paired with an untouched twin, and a news analyst wrote a morning brief. I retired all of it on 18 August.",
	},
	{
		v: "v4",
		when: "18 Aug – 17 Sep",
		title: "Evidence first",
		body: "Ten-fold walk-forward tests, audits of the fill model and the data sources, and frozen forward monitors that can only continue or kill a strategy. An audit on 2 September found seven simulator bugs.",
	},
	{
		v: "v5",
		when: "18–24 Sep",
		title: "An agent in the loop",
		body: "The repo went public. A nightly AI agent trades its own paper book through a locked simulator tool, hourly shadow agents watch without placing orders, a ledger scores every agent decision, and Alpaca and SEC EDGAR sit behind credential gates.",
	},
	{
		v: "v6",
		when: "25 Sep",
		title: "TradingView for research",
		body: "TradingView quotes and bars now reach the intraday agents as research input. They never touch prices, fills or orders.",
		current: true,
	},
];

function Versions() {
	return (
		<Box as="ol" listStyleType="none" mt={6} borderTop="1px solid" borderColor="border.subtle">
			{VERSIONS.map(({ v, when, title, body, current }) => (
				<Box
					as="li"
					key={v}
					display="grid"
					gridTemplateColumns={{ base: "48px 1fr", md: "64px 1fr" }}
					columnGap={4}
					py={4}
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Text fontFamily="var(--font-mono)" fontSize="14px" fontWeight="700" color={current ? "brand.solid" : "text.muted"}>
						{v}
					</Text>
					<Box>
						<Text fontFamily="var(--font-mono)" fontSize="12px" letterSpacing=".06em" color="text.muted" textTransform="uppercase">
							{when}
							{current ? " · current" : ""}
						</Text>
						<Text mt={1} fontSize={{ base: "17px", md: "18px" }} fontWeight="700">
							{title}
						</Text>
						<Text mt={1} fontSize={{ base: "16px", md: "17px" }} lineHeight="1.7" color="text.muted">
							{body}
						</Text>
					</Box>
				</Box>
			))}
		</Box>
	);
}

const facts = [
	["paper books", "21 rule-based (18 replayable) · 1 run by an AI agent"],
	["strategy modules", "30 · one file each, pre-registered"],
	["charters with a kill rule", "10 · 7 closed as rejected or inconclusive"],
	["data sources", "Yahoo · Nasdaq · FRED · Cboe · FINRA · CFTC · AAII · NAAIM · SqueezeMetrics"],
	["research-only source", "TradingView quotes and bars, for the intraday agents"],
	["gated sources", "Alpaca IEX (dormant) · SEC EDGAR · licensed history"],
	["liquid universe", "~4,100 US names, refreshed weekly"],
	["fill model", "next open · spread tier + 5 bp · ≤ 1 % of 60-day volume"],
	["walk-forward", "10 folds · train 24 mo · validate 12 mo"],
	["store", "DuckDB · one writer · exact response receipts"],
	["api", "34 loopback routes · reads plus gated paper tickets"],
	["tests", "3,280 collected · warnings are failures"],
	["python", "~89k lines outside tests · started 2026-07-16"],
	["status", "paper only · MIT · github.com/ong6/trading-engine"],
];

const links = [
	{ name: "Source on GitHub", detail: "Paper only, MIT", href: "https://github.com/ong6/trading-engine", external: true },
];

export default function TradingEngine() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Trading engine"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/trading-engine",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="A paper-trading research engine I run nightly on US market data, with strategies fixed in advance and a fill model that cannot see the future.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link
						as={NextLink}
						href="/#work"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
						← Selected projects
					</Link>

					<Heading
						as="h1"
						mt={{ base: 8, md: 10 }}
						fontSize={{ base: "40px", md: "52px" }}
						lineHeight="1"
						letterSpacing="-.045em">
						Trading engine
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · paper only
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I built this to test trading ideas on real US market data without placing live trades. It runs nightly on one Linux box and tracks 21 rule-based paper portfolios, each with rules fixed before trading starts, plus one run by an AI agent. At the two-month mark, none had passed its comparison against a control.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="tearch"
					headingLevel={2}
					diagram={TradingEngineArchitecture}
					caption="fig. 1 — one night. ① Yahoo, Nasdaq and a set of macro and sentiment publishers feed the collectors;
					Alpaca, SEC EDGAR and licensed history are supported but stay off until credentials and
					terms allow them, and Stooq is blocked. ② One writer commits every batch
					to DuckDB and keeps each provider response as an exact receipt. ③ The screen ranks about
					4,100 liquid names and each book turns the ranking into orders at the close. ④ Orders
					fill at the next open and nowhere else, with a liquidity-tiered spread, five basis points
					and a cap at one percent of volume. ⑤ The monitors read the equity paths against a rule
					frozen before the first signal, and the Sunday walk-forward replays the rule books on
					older bars. ⑥ The AI agent reviews the screen's standouts and trades its own paper book
					through a locked simulator tool; the ledger scores each of its decisions against a
					control. The intraday agents read TradingView quotes and only observe."
				/>

				<H2>When a simulated order can fill</H2>

				<P>
					I wanted to avoid a backtest using a price it could not have traded. The engine enforces the timing rule in one place: an order signalled from the
					close of day <Code>t</Code> fills at the open of day <Code>t+1</Code>, and{" "}
					<Code>attempt_fill</Code> raises if you ask for anything else. It raises under{" "}
					<Code>python -O</Code> too, so optimisation cannot remove the timing check.
				</P>

				<P>
					The fill price is the open moved against you by a half-spread estimated from the
					sixty-day median dollar volume, plus five basis points a side. An order over one percent
					of that median volume is rejected outright instead of partially filled, so the engine never has to estimate how much would have filled. A missing bar leaves the order pending for
					three sessions and then rejects it; the engine never fabricates a bar. Dividends are credited on
					the ex-date from the same corporate-actions table the screen reads.
				</P>

				<CodeFigure
					caption="fig. 2 — the guard as it fails, and the two lines that make it fail. There is no
					second place a fill can be created.">
					<CodeBlock title="same-bar fill" lines={FILL} />
				</CodeFigure>

				<H2>Writing the test rules in advance</H2>

				<P>
					A strategy enters the league as a charter: the mechanism, the control it has to beat,
					one primary statistic, a kill criterion, and the total number of trials. All of that is
					written down before the first signal. I keep the rule fixed after seeing the result and record failed tests alongside the others.
				</P>

				<P>
					Ten charters so far. Seven are closed as rejected or inconclusive: a VIX term-structure
					timer, turn-of-month, sell-in-May, a drawdown throttle, a vol target, a sector cap and a
					quarterly ETF rebalance. Each failed the gate it declared up front. The three calendar
					timers lost to a static exposure-matched control, which keeps the comparison from simply rewarding a different amount of market exposure. Three are still accruing: a sector-momentum
					book that needs two hundred shared sessions before its kill rule can fire, a 12-1
					cross-sectional momentum book measured against an unscreened control, and a
					forty-Monday test of SPY&apos;s open-to-close drift.
				</P>

				<CodeFigure
					caption="fig. 3 — the Monday experiment refuses to report at eight observations. The
					report prints what the verdict would be and then says why it is not one.">
					<CodeBlock title="a report that will not peek" lines={E1} />
				</CodeFigure>

				<H2>The missing delisted companies</H2>

				<P>
					The price store holds only names listed today. Measured against listed-company counts,
					that is about eleven percent of the companies that existed in 1996, a quarter of 2003
					and forty percent of 2014. No 2008 casualty is in it, so a fold that spans 2008 is one
					in which those names cannot lose money. The bias is not a constant; it grows the
					further back a window reaches, and every fold table carries its universe size so a
					reader can weight it.
				</P>

				<P>
					The walk-forward therefore never reports absolute return as evidence. A stock-picking
					book is compared with an equal-weight basket of the same screened names, fold by fold,
					so the bias sits on both sides of the difference. On that comparison, no screen-driven
					book beat equal weight on any window of three years or more, and the two books that led
					the live table in September had drawn down eighteen percent inside two months. That
					result is in the repo. The engine remains paper-only, and the next research gates are
					calendar-bound: the point-in-time tables are not deep enough for a fair
					stock-selection test until 2029 unless I buy a dataset with the delisted names in it.
				</P>

				<H2>Versions</H2>

				<P>
					The engine has changed shape several times since July. Figure 1 shows v6.
				</P>

				<Versions />

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

				<Box
					as="dl"
					mt={{ base: 12, md: 16 }}
					borderTop="1px solid"
					borderColor="border.subtle"
					fontFamily="var(--font-mono)"
					fontSize="12px">
					{facts.map(([label, value]) => (
						<Box
							key={label}
							display="flex"
							flexDirection={{ base: "column", md: "row" }}
							justifyContent="space-between"
							gap={{ base: 1, md: 4 }}
							py={{ base: 3, md: 2 }}
							borderBottom="1px solid"
							borderColor="border.subtle">
							<Box as="dt" color="text.muted">
								{label}
							</Box>
							<Box as="dd" ml={0} textAlign={{ base: "left", md: "right" }} fontWeight="700">
								{value}
							</Box>
						</Box>
					))}
				</Box>

				<H2>Paper trading only</H2>

				<P>
					It holds no credentials and connects to no broker, so it cannot move money. The two services bind
					to loopback and the repo ships no market data. I built it to test whether the ideas hold up under rules I set in advance. So far, none has passed, and the reports in the repo show why.
				</P>

				<CaseStudyFooter links={links} next={{ name: "Skillpack", href: "/skillpack", detail: "One home for coding-agent skills, synced as a git subtree" }} />
			</Container>
		</Layout>
	);
}
