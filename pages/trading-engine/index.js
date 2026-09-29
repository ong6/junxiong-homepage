import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { CodeBlock, CodeFigure } from "../../components/CodeBlock";
import DiagramFigure from "../../components/DiagramFigure";
import * as TradingEngineArchitecture from "../../components/diagrams/TradingEngineArchitecture";
import Layout from "../../components/layouts/Articles";
import CaseStudyFooter from "../../components/CaseStudyFooter";
import ProjectLinks from "../../components/ProjectLinks";
import VersionSwitcher from "../../components/VersionSwitcher";
import { VERSIONS } from "../../lib/tradingVersions";

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

function Versions() {
	return (
		<Box as="ol" listStyleType="none" mt={6} borderTop="1px solid" borderColor="border.subtle">
			{VERSIONS.map(({ v, href, when, title, body, current }) => (
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
							{current ? (
								title
							) : (
								<Link as={NextLink} href={href} prefetch={false}>
									{title} →
								</Link>
							)}
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
	["paper books", "25 active in the simulator"],
	["AI decision paths", "nightly agent since 21 Sep · candidate scoring since 29 Sep"],
	["comparator books", "model-ranked · rule-ranked control · rule + model veto"],
	["paired test", "model vs rule on the same names · looks at 60, 90, 120 sessions"],
	["entries", "volatility sizing · limit-on-open · pre-open check may only cancel"],
	["built, switched off", "challenger lab · filing reader · text labs · optimizer"],
	["tests logged", "103 written down in advance · counted as 139 trials"],
	["strategy modules", "30 · one file each, pre-registered"],
	["data sources", "Yahoo · Nasdaq · FRED · Cboe · FINRA · CFTC · AAII · NAAIM · SqueezeMetrics"],
	["research-only sources", "TradingView quotes and bars · RSS headlines"],
	["not connected yet", "SEC 8-K (awaiting access) · Alpaca IEX · licensed history"],
	["fill model", "next open · spread tier + 5 bp · ≤ 1 % of 60-day volume"],
	["walk-forward", "10 folds · train 24 mo · validate 12 mo"],
	["store", "DuckDB · one writer · exact response receipts"],
	["api", "34 loopback routes · reads plus paper orders"],
	["tests", "4,078 collected"],
	["python", "~118k lines outside tests · started 2026-07-16"],
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

					<VersionSwitcher active="v7" mt={6} />

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I built this to test trading ideas on real US market data without placing live trades. It runs nightly on one Linux box and keeps 25 paper portfolios, each with rules fixed before trading starts. Since 29 September a model scores every nightly candidate next to a fixed rule, and a paired test decides at set dates whether the model adds anything. So far no policy has beaten its control on live data.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="tearch"
					headingLevel={2}
					diagram={TradingEngineArchitecture}
					caption="fig. 1 — one night in v7. ① Yahoo, Nasdaq, TradingView, RSS headlines and a set of macro
					publishers feed the collectors; SEC 8-K capture waits on access. ② One writer commits every
					batch to DuckDB, and each fact carries the time it became available. ③ A fixed rule and a
					model both score every candidate, and the nightly agent keeps its own book; event triggers
					and the challenger lab place no orders. ④ Code sizes each position and checks risk; before
					the open the model may cancel an order but never add one. ⑤ Orders fill at the next open or
					a limit-on-open, and nowhere else. ⑥ Every decision lands in one ledger, is labelled later,
					and a paired test against the rule decides at 60, 90 and 120 sessions. It is all still paper,
					so the IBKR broker link is not open yet."
				/>

				<H2>Scoring every candidate</H2>

				<P>
					Until v7 the AI made one pick a night from five standouts, and it abstained on 92% of
					them. At that pace, twenty trades would arrive around February 2027, and twenty trades can
					only detect an edge of about five percent per trade. That is too little evidence to judge
					anything.
				</P>

				<P>
					So the unit of evidence changed from a trade to a scored candidate. Each night the model
					and a fixed rule both score every candidate in a wider universe, and each score is later
					labelled with what the stock did. A paired test compares the two on the same names and
					dates, and I only read it at 60, 90 and 120 scored sessions. Three simulator books trade on
					the scores with identical mechanics: one ranked by the model, one by the rule, and one by
					the rule with a model veto.
				</P>

				<P>
					The model still sizes nothing. Code sizes each position from recent volatility, fixes the
					stop at entry and places a limit-on-open order. Before the open the model can look again
					and cancel an order, never add or resize one, and every cancelled order keeps the fill it
					would have had, so the cancel decision is scored too. Headlines and intraday movers can now
					trigger a decision within minutes, but those triggers run in shadow and place no orders.
				</P>

				<H2>Built, but switched off</H2>

				<P>
					Next to it sits a challenger lab: other model policies on the same inputs, a reader for
					filings and earnings releases, factor-neutral statistics, sequential tests and a
					score-to-weight optimizer. All of it is built and none of it is on. It waits until the new
					scoring has run a clean first cycle, and a challenger only takes over a book after a sequential
					test passes and I approve it.
				</P>

				<H2>When a simulated order can fill</H2>

				<P>
					I wanted to avoid a backtest using a price it could not have traded. The engine enforces the timing rule in one place: an order signalled from the
					close of day <Code>t</Code> fills at the open of day <Code>t+1</Code>, and{" "}
					<Code>attempt_fill</Code> raises if you ask for anything else. It raises under{" "}
					<Code>python -O</Code> too, so optimisation cannot remove the timing check.
				</P>

				<P>
					The fill price is the open moved against you by a half-spread estimated from the
					sixty-day median dollar volume, plus five basis points a side. The v7 books enter with a limit-on-open instead, which skips the trade when the stock opens too far above the signal close. An order over one percent
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
					quarterly ETF rebalance. Each failed the pass mark it set up front. The three calendar
					timers lost to a static exposure-matched control, which keeps the comparison from simply rewarding a different amount of market exposure. Three are still accruing: a sector-momentum
					book that needs two hundred shared sessions before its kill rule can fire, a 12-1
					cross-sectional momentum book measured against an unscreened control, and a
					forty-Monday test of SPY&apos;s open-to-close drift.
				</P>

				<P>
					Since 28 September new strategy research runs in a private repo against this engine,
					under the same pre-registration rules, and its results stay there. The public log
					holds 103 tests written down in advance, counted conservatively as 139 trials when a result is corrected
					for how many ideas were tried.
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
					result is in the repo. The engine remains paper-only, and the next research steps are
					bound by the calendar: the point-in-time tables are not deep enough for a fair
					stock-selection test until 2029 unless I buy a dataset with the delisted names in it.
				</P>

				<H2>Versions</H2>

				<P>
					The engine has changed shape several times since July. Figure 1 shows v7. Each earlier
					version has its own page with the diagram as it stood then.
				</P>

				<Versions />

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
