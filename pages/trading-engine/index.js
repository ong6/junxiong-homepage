import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import CaseStudyFooter from "../../components/CaseStudyFooter";
import DiagramFigure from "../../components/DiagramFigure";
import * as Engine2 from "../../components/diagrams/trading/Engine2";
import Layout from "../../components/layouts/Articles";
import ProjectLinks from "../../components/ProjectLinks";
import TradingVersionList from "../../components/TradingVersionList";
import { ERAS } from "../../lib/tradingVersions";
import { BackLink, P, H2, ARTICLE_TITLE } from "../../components/ArticleParts";

// Overview of the trading engine: what it is, the engine running now, and the
// two engine eras. Each era has its own page (/trading-engine/v1, /v2) and each
// v1 update its own write-up (/trading-engine/v1/1.N).




const links = [
	{ name: "Product docs", detail: "How it works, research and operations", href: "/trading-engine/docs" },
	{ name: "Source on GitHub", detail: "Python, MIT", href: "https://github.com/ong6/trading-engine", external: true },
];

export default function TradingEngine() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			contents
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
					<BackLink href="/#work">Selected projects</BackLink>

					<Heading
						as="h1"
						mt={{ base: 8, md: 10 }}
						fontSize={ARTICLE_TITLE}
						lineHeight="1"
						letterSpacing="-.045em">
						Trading engine
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".08em"
						textTransform="uppercase">
						2026 · open source · Python
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						A paper-trading engine I&apos;ve been building since July 2026, to find out whether a
						strategy, or a model reading the market, makes money after costs. Every strategy goes
						through the same backtest core and the same evidence checks before it gets a paper
						portfolio. Nothing has beaten its frozen control yet.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="te-now"
					headingLevel={2}
					diagram={Engine2}
					caption="fig. 1 — Engine v2 with its deploy checks, live since 21 October: a fresh reviewer, replayed provider responses, a check of every scheduled job and a deploy gate. An invariant monitor, still watch-only, checks each published snapshot before reports read it."
				/>

				<H2>Two engines</H2>

				<P>
					Engine v1 was a research simulator. Every strategy ran as a paper portfolio inside it,
					through eight updates from July to October. Engine v2 has been live on paper since 18
					October and does a different job: it fills the orders, keeps the books and charges
					commissions on every fill, and each strategy gets its own paper account. Every change goes
					to a fresh reviewer that didn&apos;t write it. The checks in fig. 1 went live with the 21
					October update. A new engine number means the engine&apos;s job
					changed; updates inside an engine move the number after the dot.
				</P>

				<TradingVersionList items={ERAS.filter((era) => era.v === "v2")} />

				<H2>Engine v1 updates</H2>

				<P>
					Each update has its own page with the diagram as the engine stood then. Update 1.8 added
					the shared backtest core, which Engine v2 still uses for research.
				</P>

				<TradingVersionList />

				<CaseStudyFooter links={links} next={{ name: "Agent skills", href: "/skills", detail: "One home for coding-agent skills, linked into every repo" }} />
			</Container>
		</Layout>
	);
}
