import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import GroundplaneArchitecture from "../components/diagrams/GroundplaneArchitecture";
import Layout from "../components/layouts/Articles";

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

// Code rendered as text, not an image, so it stays selectable and readable in
// both themes. `tone` marks the one line the figure is about.
const CodeBlock = ({ title, lines }) => {
	const muted = useColorModeValue("graphite.500", "graphite.300");
	const hot = useColorModeValue("mint.700", "mint.300");
	return (
		<Box
			mt={4}
			border="1px solid"
			borderColor="border.subtle"
			bg="surface.raised"
			px={{ base: 4, md: 5 }}
			py={{ base: 4, md: 5 }}
			overflowX="auto">
			<Text
				fontFamily="var(--font-mono)"
				fontSize="10px"
				letterSpacing=".08em"
				textTransform="uppercase"
				color="text.muted">
				{title}
			</Text>
			<Box
				as="pre"
				mt={3}
				m={0}
				fontFamily="var(--font-mono)"
				fontSize={{ base: "11px", md: "12.5px" }}
				lineHeight="1.75"
				whiteSpace="pre">
				{lines.map(([text, tone], i) => (
					<Box
						as="span"
						key={i}
						display="block"
						color={tone === "muted" ? muted : tone === "hot" ? hot : "page.text"}
						fontWeight={tone === "hot" ? "700" : "400"}>
						{text || " "}
					</Box>
				))}
			</Box>
		</Box>
	);
};

const CodeFigure = ({ caption, children }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0}>
		{children}
		<Text
			as="figcaption"
			mt={3}
			fontFamily="var(--font-mono)"
			fontSize="11px"
			lineHeight="1.6"
			color="text.muted">
			{caption}
		</Text>
	</Box>
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
	["status", "v0.1.0 · MIT · PyPI release pending"],
];

export default function Groundplane() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Groundplane"
			description="Groundplane is an open-source Python library that draws a hard line between what a model may write and what must come from code, and raises when the model crosses it.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/#work" fontSize="13px" fontWeight="700">
						← Selected projects
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
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · python
					</Text>

					<Text
						mt={7}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						An agent calls tools, gets ground truth, then writes prose. The
						prose usually matches. When it does not, nothing throws and the
						customer reads it. Groundplane records the tool results as typed
						facts, lets the model fill in fields, and raises the moment a field
						says something the facts do not support. Code on{" "}
						<Link href="https://github.com/ong6/groundplane" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<GroundplaneArchitecture figure="fig. 1" />

				<H2>Where it came from</H2>

				<P>
					I first built this shape inside a production AI platform at TikTok.
					Summaries there rank things, and a ranking a model writes from a table
					of numbers is right most of the time. Most of the time is not a
					guarantee, and a senior stakeholder was not going to sign off on
					output that could quietly name the wrong winner. The pushback was
					right, and it is what produced the design.
				</P>

				<P>
					The fix was to compute the ranking in code and constrain the model to
					phrasing it. The model could describe the winner. It could no longer
					choose one. Groundplane is that idea taken out of the platform,
					generalised past the argmax case, and published under MIT.
				</P>

				<H2>Declared facts, not detected hallucinations</H2>

				<P>
					You cannot prompt this away. &ldquo;Only state what is in the
					data&rdquo; is an instruction to the component that failed. You also
					cannot grade it with a second model, because an LLM judge is the same
					class of component making the same class of mistake with a rubber
					stamp. So the library does neither. Tool results go into a{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">
						FactRegistry
					</Box>{" "}
					as typed facts, each carrying the tool call and arguments that
					produced it. Facts are write-once. If a later call changes the value,
					that is a new fact with a new name, so provenance never lies.
				</P>

				<P>
					A{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">
						boundary
					</Box>{" "}
					wraps the block of model output and names the facts it may lean on.
					The model emits structured fields, never prose; submitting a plain
					string is a TypeError. Leaving the block without submitting anything
					also raises, because a check that silently never ran is worse than no
					check.
				</P>

				<CodeFigure caption="fig. 2 — the README before and after. The before trusts whatever the model wrote. The after records the ranking with its provenance, lets the model fill in a winner field, and the boundary refuses it. The error text is what the library actually raises for this input.">
					<CodeBlock title="before" lines={BEFORE} />
					<CodeBlock title="after" lines={AFTER} />
					<CodeBlock title="raised" lines={ERROR} />
				</CodeFigure>

				<H2>Six checks, one question each</H2>

				<P>
					Each check asks how the recorded facts relate to each other, which
					is what a per-field validator cannot see. Every value in a swapped
					row is a real value, and a wrong argmax is spelled the same as the
					right one.
				</P>

				<P>
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">superlative</Box>{" "}
					checks that the named winner is the computed argmax and any quoted
					score is the computed score. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">ranking_prefix</Box>{" "}
					checks a top-k list against the computed order, including a cut that
					falls inside a block of tied scores. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">aggregate_reconciles</Box>{" "}
					recomputes a stated sum, mean, count, min, max or median over the
					recorded rows and refuses to do it over a truncated table. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">entities_recorded</Box>{" "}
					checks that every name the model used came from a recorded set. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">row_integrity</Box>{" "}
					resolves the named row first and reads every other field off that
					one row, which catches the neighbour&apos;s value in the wrong column.{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">comparison</Box>{" "}
					recomputes &ldquo;A beat B by 12%&rdquo; in code and, when the
					number is wrong, says which convention it does match: percentage
					points, a ratio, or the two entities reversed.
				</P>

				<P>
					Numeric comparisons are exact by default. Every check takes a
					tolerance, but it starts at zero rather than the usual nine digits of
					forgiveness, because a checker built to catch a wrong number should
					not quietly wave one through.
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
							justifyContent="space-between"
							gap={4}
							py={2}
							borderBottom="1px solid"
							borderColor="border.subtle">
							<Box as="dt" color="text.muted">
								{label}
							</Box>
							<Box as="dd" ml={0} textAlign="right" fontWeight="700">
								{value}
							</Box>
						</Box>
					))}
				</Box>

				<H2>Failing loudly</H2>

				<P>
					The error message is most of the product. It carries the field, what
					the model said, what the facts support, the tool call with its
					arguments, and where the model&apos;s pick actually ranked. Whoever
					is reading it at 2am can tell at once whether the data or the prose
					was wrong, without opening a trace.
				</P>

				<P>
					Inside a LangGraph graph the same failure can become a state update
					instead of a crash, so the graph routes back to the model with the
					checker&apos;s message as the correction. A misconfigured check still
					propagates, because a developer bug is not something to reask the
					model about. The MCP adapter records a tool result as a fact with the
					call as provenance, and prefers the structured payload over the text
					blocks, since text is a rendering and reading it is parsing prose
					again.
				</P>

				<H2>What it is not</H2>

				<P>
					It is not a hallucination detector. It validates declared fields
					against declared facts, and if the model names the right winner and
					then editorialises misleadingly around it, that passes. I kept the
					scope that narrow on purpose. Every system I looked at that tried to
					verify open prose ended up handing the verdict to embeddings or a
					judge model, which brings back the probabilistic answer this exists
					to remove.
				</P>

				<P>
					The core has no dependencies and the adapters import neither
					framework they adapt, so the whole thing is readable and testable
					with a plain interpreter. A hundred and sixty-nine tests run on five Python
					versions in CI, many of them adversarial cases where the plausible
					model answer is provably wrong.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
