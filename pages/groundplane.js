import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import DiagramFigure from "../components/DiagramFigure";
import * as GroundplaneArchitecture from "../components/diagrams/GroundplaneArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
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

const Details = ({ title, children }) => (
	<Box
		as="details"
		mt={{ base: 8, md: 10 }}
		borderTop="1px solid"
		borderBottom="1px solid"
		borderColor="border.subtle"
		sx={{
			"@media print": {
				"&::details-content": { contentVisibility: "visible", height: "auto" },
				"& > .case-study-details-body": { display: "block" },
			},
		}}>
		<Box
			as="summary"
			minH="44px"
			py={3}
			px={1}
			fontSize="17px"
			fontWeight="700"
			cursor="pointer"
			_focusVisible={{ outline: "2px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}>
			{title}
		</Box>
		<Box className="case-study-details-body" pb={5}>
			{children}
		</Box>
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
	["status", "v0.1.0 · MIT · install from GitHub"],
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
			description="Groundplane is an open-source Python library that checks declared fields in agent output against recorded tool facts, with deterministic checks and errors that include provenance.">
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
						mt={8}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						Groundplane checks declared fields in an agent&apos;s structured
						output against facts recorded from tool calls. A failed check raises
						an error with the supporting tool call attached. Code on{" "}
						<Link href="https://github.com/ong6/groundplane" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<H2>Where it came from</H2>

				<P>
					I first built this shape inside a production AI platform at TikTok.
					Summaries there rank things, and a model ranking a table of numbers is
					right most of the time. Most of the time is not a guarantee. A senior
					stakeholder would not sign off on output that could name the wrong
					winner, and that pushback produced the design.
				</P>

				<P>
					The fix: compute the ranking in code and limit the model to phrasing
					it. The model could describe the winner but no longer choose one.
					Groundplane is that idea taken out of the platform, generalised past
					argmax, and published under MIT.
				</P>

				<CodeFigure caption="fig. 1 — the README before and after. The before trusts whatever the model
				wrote. The after records the ranking with its provenance, lets the model
				fill a winner field, and the boundary refuses it. The error text is what
				the library raises for this input.">
					<CodeBlock title="before" lines={BEFORE} />
					<CodeBlock title="after" lines={AFTER} />
					<CodeBlock title="raised" lines={ERROR} />
				</CodeFigure>

				<H2>Scope</H2>

				<P>
					It validates declared fields against declared facts. If the model
					names the right winner and editorialises misleadingly around it,
					that passes. I kept the scope that narrow on purpose. I compute
					rankings in code and check the model&apos;s structured output against
					them. A judge model would make this check probabilistic.
					Groundplane&apos;s check needs to return the same result for the same facts.
				</P>

				<DiagramFigure
					id="gparch"
					headingLevel={2}
					diagram={GroundplaneArchitecture}
					caption="fig. 2 — the whole library. ① Tool results are recorded as typed facts, each with the tool call that produced it; the two adapters do the same from inside LangGraph or MCP. ② A boundary names which facts a block of output may use and which checks run. ③ The model submits structured fields, never prose. ④ The configured checks validate declared fields against the recorded facts. ⑤ The first failed claim check raises UnsupportedClaim with the provenance in the message; nothing is logged and ignored."
				/>

				<H2>Recording facts and checking fields</H2>

				<P>
					The check runs in code after the model submits its fields. Tool results go
					into a{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">
						FactRegistry
					</Box>{" "}
					as typed facts, each carrying the tool call and arguments that produced
					it. Facts are write-once: a later call that changes the value is a new
					fact with a new name, preserving the earlier value and its provenance.
				</P>

				<P>
					A{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">
						boundary
					</Box>{" "}
					wraps a block of model output and names the facts it may use. The model
					emits structured fields, never prose. Submitting a plain string is a
					TypeError. Leaving the block without submitting also raises, because a
					check that silently never ran is worse than no check.
				</P>

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
					checks a top-k list against the computed order, including a cut inside
					a block of tied scores. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">aggregate_reconciles</Box>{" "}
					recomputes a stated sum, mean, count, min, max or median over the
					recorded rows and refuses a truncated table. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">entities_recorded</Box>{" "}
					checks that every name the model used came from a recorded set. <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">row_integrity</Box>{" "}
					resolves the named row first and reads every other field off that row,
					which catches a neighbour&apos;s value in the wrong column.{" "}
					<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em">comparison</Box>{" "}
					recomputes &ldquo;A beat B by 12%&rdquo; in code and, when the
					number is wrong, says which convention it does match: percentage
					points, a ratio, or the two entities reversed.
				</P>

				<P>
					Numeric comparisons are exact by default. Every check takes a
					tolerance, but it starts at zero, not the usual nine digits of
					forgiveness. A checker built to catch a wrong number should not wave
					one through.
				</P>

				<H2>Failing loudly</H2>

				<P>
					The error message is most of the product. It carries the field, what
					the model said, what the facts support, the tool call with its
					arguments, and where the model&apos;s pick ranked. Whoever reads it at
					2am can tell whether the data or the submitted field was wrong
					without opening a trace.
				</P>

				<P>
					Inside a LangGraph graph the same failure can become a state update
					instead of a crash. The graph routes back to the model with the
					checker&apos;s message as the correction. A misconfigured check still
					propagates: a developer bug is not something to reask the model about.
					The MCP adapter records a tool result as a fact with the call as
					provenance. It prefers the structured payload over the text blocks,
					because text is a rendering and reading it is parsing prose again.
				</P>

				<H2>Testing the checks</H2>

				<P>
					The core has no dependencies and the adapters import neither framework
					they adapt, so a plain interpreter can read and test all of it. 169
					tests run on five Python versions in CI, many of them adversarial cases
					where the plausible model answer is provably wrong.
				</P>

				<Details title="Package details">
					<Box
						as="dl"
						mt={3}
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
				</Details>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
