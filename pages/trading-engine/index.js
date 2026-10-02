import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import CaseStudyFooter from "../../components/CaseStudyFooter";
import DiagramFigure from "../../components/DiagramFigure";
import * as V8 from "../../components/diagrams/trading/V8";
import Layout from "../../components/layouts/Articles";
import ProjectLinks from "../../components/ProjectLinks";
import VersionSwitcher from "../../components/VersionSwitcher";
import { VERSIONS } from "../../lib/tradingVersions";

// Sources: the public engine repository at a1deeef, especially BUILDLOG.md
// (2026-09-29 through 2026-10-02), docs/system-blueprint.md, docs/product.md,
// docs/backtest-standard.md, docs/pit-free-audit-2026-10-01.md and docs/site/*.md.
// Counts were rerun with pytest --collect-only and tools.metrics_snapshot.

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

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
	["status", "paper only · no broker connection"],
	["paper portfolios", "25 active in the simulator"],
	["matched AI comparison", "AI-ranked · rule-ranked · rule with an AI veto"],
	["shared backtest", "event and portfolio strategies · one deterministic core"],
	["evidence rules", "no peeking · named costs · gross benchmark · calendar-day deflated Sharpe"],
	["holdout", "sealed · one opening"],
	["synthetic proof", "planted edge found in 48/50 seeds · noise flagged in 7/200 (3.5%)"],
	["full benchmark", "3,000 stocks × 3,800 sessions · 16 workers · 989.05 s → 0.847 s"],
	["nightly", "about 18 minutes removed from the measured 44.5-minute path"],
	["historical coverage", "old store held roughly 30–38% of listed names per year, 2010–25"],
	["tests", "4,217 collected"],
];

const links = [
	{ name: "Product docs", detail: "How it works, research and operations", href: "/trading-engine/docs" },
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
			description="A paper-trading research engine where every strategy runs through one shared backtest core and one evidence path.">
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

					<VersionSwitcher active="v8" mt={6} />

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						Since v7, the engine has changed shape. Every strategy is now a short
						specification that runs through one shared backtest core and one evidence path
						before a paper portfolio can observe it. The AI comparison is live, operations
						are less fragile, and the data layer now shows how much history the old store
						missed. It is still paper only. No policy has beaten its frozen control yet.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="te-v8"
					headingLevel={2}
					diagram={V8}
					caption="fig. 1 — v8. Public and separately held private strategies become short specifications. One core owns the no-peeking view, named costs, event or portfolio simulation, gross benchmark, calendar-day deflated Sharpe and sealed holdout. Only its evidence report reaches a paper portfolio. The private live-paper bridge is next, not active."
				/>

				<H2>One core, then evidence</H2>

				<P>
					Before v8, a new strategy could bring its own replay machinery. Now it only
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

				<H2>Versions</H2>

				<P>
					The engine has changed shape several times since July. Figure 1 shows v8. Each
					earlier version has its own page with the diagram as it stood then.
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
					The engine has no broker connection or authority over real money. I built it to
					get to a trustworthy yes or no, with every loss, unavailable input and failed
					check left in the record. The product docs carry the full data, research and
					operations detail.
				</P>

				<CaseStudyFooter links={links} next={{ name: "Skillpack", href: "/skillpack", detail: "One home for coding-agent skills, synced as a git subtree" }} />
			</Container>
		</Layout>
	);
}
