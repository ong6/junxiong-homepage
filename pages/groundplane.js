import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import DiagramFigure from "../components/DiagramFigure";
import * as GroundplaneArchitecture from "../components/diagrams/GroundplaneArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import Details from "../components/Details";
import FactList from "../components/FactList";

// A written case study in the same shape as /compoze: one ~680px column of
// prose, the architecture figure, a code figure, and a single mono fact table.

const P = (props) => (
	<Text
		mt={5}
		fontSize={{ base: "17px", md: "18px" }}
		lineHeight="1.8"
		{...props}
	/>
);

const H2 = (props) => (
	<Heading
		as="h2"
		mt={{ base: 12, md: 16 }}
		fontSize={{ base: "22px", md: "24px" }}
		{...props}
	/>
);


// Straight from the README. The "before" is what most agents do today; the
// "after" is the same question with the argmax computed in code.
const BEFORE = [
	['rows = warehouse.query("select campaign, ctr from campaign_daily")'],
	['summary = llm(f"Which campaign performed best?\\n{rows}")'],
	['# says "north". It was "harbour".', "muted"],
];

const AFTER = [
	["from groundplane import FactRegistry, boundary, superlative"],
	[""],
	["reg = FactRegistry()"],
	["reg.record_ranking("],
	['    "campaign_ctr",'],
	['    {"north": 0.0412, "harbour": 0.0455, "delta": 0.0301},'],
	['    key="ctr", tool="warehouse.query",'],
	['    args={"table": "campaign_daily", "window": "7d"},'],
	[")"],
	[""],
	['with boundary(reg, facts=["campaign_ctr"],'],
	['              checks=[superlative(fact="campaign_ctr")]) as b:'],
	["    b.submit(llm_structured(facts=b.facts()))"],
	['    # {"winner": "north", ...}', "muted"],
];

const ERROR = [
	["UnsupportedClaim: unsupported claim in field 'winner':", "hot"],
	["model said 'north', registered facts support 'harbour'", "hot"],
	["| fact='campaign_ctr'"],
	["| provenance=warehouse.query(table='campaign_daily', window='7d')"],
	["| computed argmax on 'ctr' is 'harbour' (0.0455);"],
	["  'north' ranked #2 at 0.0412"],
];

const facts = [
	["check families", "6"],
	["fact types", "4 · Fact, Ranking, Table, Domain"],
	["tests", "169, all deterministic"],
	["python", "3.10 – 3.14 in CI"],
	["runtime dependencies", "0"],
	["adapters", "2 · LangGraph, MCP"],
	["typing", "mypy, disallow_untyped_defs"],
	["library", "~2.6k lines · tests ~2.2k"],
	["status", "v0.1.0 · MIT · install from GitHub"],
];

const checks = [
	["superlative", "the named winner and any quoted score match the computed top value"],
	["ranking_prefix", "a top-k list matches the computed order, including ties"],
	["aggregate_reconciles", "a stated sum, mean, count, min, max or median matches the recorded rows"],
	["entities_recorded", "every name the model used came from the recorded data"],
	["row_integrity", "every field comes from the named row, not its neighbour"],
	["comparison", "\u201cA beat B by 12%\u201d is recomputed; when it\u2019s wrong, the error says which convention it does match"],
];

const links = [
	{ name: "Source on GitHub", detail: "Python library, MIT, install from GitHub", href: "https://github.com/ong6/groundplane", external: true },
	{ name: "UI Pack", detail: "The figures on this page are drawn with it", href: "/uipack" },
];

export default function Groundplane() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Groundplane"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/groundplane",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Groundplane is an open-source Python library that checks the fields an agent declares against the tool results it recorded, and traces each error to its source.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link
						as={NextLink}
						href="/ai-tooling"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
						← AI tooling
					</Link>

					<Heading
						as="h1"
						mt={{ base: 8, md: 10 }}
						fontSize={{ base: "40px", md: "52px" }}
						lineHeight="1"
						letterSpacing="-.045em">
						Groundplane
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · python
					</Text>

					<Text
						mt={8}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						Groundplane is a small Python library that checks an agent&apos;s answer against the tool results it was given. If the model reports the wrong winner or total, it raises an error showing what the data actually said.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<H2>Where it came from</H2>

				<P>
					I first built this inside an AI platform at TikTok. Some of our summaries had to rank a table of numbers, and a senior stakeholder pointed out that naming the wrong winner wasn&apos;t acceptable, even if the model usually got it right. So I moved the ranking into code: code worked out the winner and the model only described it. Groundplane is that idea pulled out into a library, extended beyond picking a winner, and published under MIT.
				</P>

				<CodeFigure caption="fig. 1 — before, the model&apos;s answer is trusted as is. After, the ranking is recorded with where it came from, the model fills a winner field, and Groundplane rejects it. The error is the library&apos;s real output for this input.">
					<CodeBlock title="before" lines={BEFORE} />
					<CodeBlock title="after" lines={AFTER} />
					<CodeBlock title="raised" lines={ERROR} />
				</CodeFigure>

				<H2>What it checks, and what it doesn&apos;t</H2>

				<P>
					It only checks the fields the model declares. If the model names the right winner and then says something misleading around it, that passes. I kept it that narrow on purpose. A judge model could read the prose too, but then the check would be probabilistic, and I wanted the same facts to give the same result every time.
				</P>

				<DiagramFigure
					id="gparch"
					headingLevel={2}
					diagram={GroundplaneArchitecture}
					caption="fig. 2 — tool results are recorded as facts along with the call that produced them, the model fills in structured fields, and the checks compare the two. The first mismatch raises UnsupportedClaim."
				/>

				<P>
					Tool results go into a <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">FactRegistry</Box>, each tagged with the tool call and arguments that produced it. A fact can&apos;t be overwritten; a new value becomes a new fact, so the old one and its source stay around. A <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">boundary</Box> wraps the part of the agent&apos;s work being checked and says which facts it may use. The model has to submit structured fields there. A plain string is rejected, and leaving the block without submitting also raises, so you know when validation never ran.
				</P>

				<H2>The six checks</H2>

				<P>
					A normal validator looks at each field on its own. These look at how the values relate, because two valid values can still end up on the wrong rows.
				</P>

				<FactList facts={checks} mt={6} />

				<P>
					Numbers are compared exactly unless the caller sets a tolerance.
				</P>

				<H2>Errors that explain themselves</H2>

				<P>
					The error says which field failed, what the model said, what the data says and which tool call it came from. For a ranking it also shows where the model&apos;s pick actually placed. Inside LangGraph, a failed check can go back to the model as a correction instead of crashing the run. A misconfigured check still crashes, since that&apos;s a bug for the developer to fix, not something to ask the model about again. An MCP adapter records tool results as facts the same way.
				</P>

				<P>
					The core has no dependencies, and 169 tests run on five Python versions in CI. Many of them are cases where the plausible answer is wrong.
				</P>

				<Details title="Package details">
					<FactList facts={facts} mt={3} />
				</Details>

				<AiToolFamily current="/groundplane" />
				<CaseStudyFooter links={links} next={{ name: "Compoze", href: "/compoze", detail: "Document-grounded assistants, a company I ran alone and sold to a client" }} />
			</Container>
		</Layout>
	);
}
