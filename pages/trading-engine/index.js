import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import CaseStudyFooter from "../../components/CaseStudyFooter";
import DiagramFigure from "../../components/DiagramFigure";
import * as Engine2 from "../../components/diagrams/trading/Engine2";
import Layout from "../../components/layouts/Articles";
import ProjectLinks from "../../components/ProjectLinks";
import TradingVersionList from "../../components/TradingVersionList";
import { ERAS } from "../../lib/tradingVersions";

// Overview of the trading engine: what it is, the engine running now, and the
// two engine eras. Each era has its own page (/trading-engine/v1, /v2) and each
// v1 update its own write-up (/trading-engine/v1/1.N).

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);


const links = [
	{ name: "Product docs", detail: "How it works, research and operations", href: "/trading-engine/docs" },
	{ name: "Source on GitHub", detail: "Python, MIT", href: "https://github.com/ong6/trading-engine", external: true },
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
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · Python
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						A paper-trading engine I have built since July 2026 to find out
						whether a strategy, or a model reading the market, makes money after costs. Every
						strategy runs through one shared backtest core and one evidence path before a paper
						portfolio can trade it, and since 18 October the engine fills the orders and charges
						commissions on every fill. No policy has beaten its frozen control yet.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="te-now"
					headingLevel={2}
					diagram={Engine2}
					caption="fig. 1 — Engine v2 with the checks I am adding in the next update. A change will pass a fresh reviewer, replayed provider responses, the schedule check and the deploy gate before it deploys; the live store will open only to the engine's own services, and an invariant monitor, watch-only at first, will check each published snapshot before reports read it."
				/>

				<H2>Two engines</H2>

				<P>
					Engine v1 was a research simulator: every strategy ran as a paper portfolio inside the
					engine, through eight updates from July to October. Engine v2, live on paper since 18
					October, changes what the engine is for. It becomes the executor and ledger: it fills the
					orders, keeps the books and charges commissions on every fill, and each strategy moves into
					its own paper account. Every change goes to a fresh reviewer that did not write it, and this week I built tests against recorded provider responses, a check of every scheduled job, an
					invariant monitor and a deploy gate, which land on the main branch in the next update. An
					update inside an engine moves the number after the dot; a new engine number means the
					engine&apos;s job changed.
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
