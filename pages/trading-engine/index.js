import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import CaseStudyFooter from "../../components/CaseStudyFooter";
import DiagramFigure from "../../components/DiagramFigure";
import * as V8 from "../../components/diagrams/trading/V8";
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
						portfolio can trade it. No policy has beaten its frozen control yet.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="te-now"
					headingLevel={2}
					diagram={V8}
					caption="fig. 1 — the engine running now (update 1.8). Public and separately held private strategies become short specifications. One core owns the no-peeking view, named costs, event or portfolio simulation, gross benchmark, calendar-day deflated Sharpe and sealed holdout. Only its evidence report reaches a paper portfolio. The private live-paper bridge is next, not active."
				/>

				<H2>Two engines</H2>

				<P>
					Engine v1 was a research simulator: every strategy ran as a paper portfolio inside the
					engine, through eight updates from July to October. Engine v2 changes what the engine is
					for. It becomes the executor and ledger, and each strategy trades its own paper account
					and pays commissions on every fill. An update inside an engine moves the number after the
					dot; a new engine number means the engine&apos;s job changed.
				</P>

				<TradingVersionList items={ERAS} />

				<CaseStudyFooter links={links} next={{ name: "Agent skills", href: "/skills", detail: "One home for coding-agent skills, linked into every repo" }} />
			</Container>
		</Layout>
	);
}
