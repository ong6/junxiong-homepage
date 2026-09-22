import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import DiagramFigure from "../components/DiagramFigure";
import * as AiToolchainArchitecture from "../components/diagrams/AiToolchainArchitecture";
import Layout from "../components/layouts/Articles";

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

const facts = [
	["unit tests", "54"],
	["gate versions", "3 · older bundles still accepted"],
	["decision scripts", "3 · evaluation, lifecycle, payload"],
	["clients", "Claude Code + Codex"],
	["model calls", "0 · supplied by the host"],
	["runtime", "Python standard library"],
	["status", "MIT · github.com/ong6/skill-eval-pack"],
];

export default function SkillEvalPack() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Skill Eval Pack"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skill-eval-pack",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Skill Eval Pack compares a new or revised agent skill with a no-skill baseline and keeps it only when fresh heldout evidence clears a machine-checked gate.">
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

					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={{ base: "40px", md: "52px" }} lineHeight="1" letterSpacing="-.045em">
						Skill Eval Pack
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I wanted to know whether my agent instructions actually helped. This pack runs the same task with and without a skill, compares the results without telling the judges which is which, and checks the candidate on cases that were not used to revise it. Code on{" "}
						<Link href="https://github.com/ong6/skill-eval-pack" isExternal>GitHub</Link>.
					</Text>
				</Box>

				<DiagramFigure
					id="ai-toolchain"
					headingLevel={2}
					diagram={AiToolchainArchitecture}
					caption="fig. 1 — the three projects cover different failure points. Skillpack supplies the instruction. Skill Eval Pack asks whether it improved the work. Groundplane checks declared facts when the accepted instruction runs."
				/>

				<H2>Comparing with and without the skill</H2>
				<P>
					Both versions run in fresh contexts with the same model, tools, task and scoring criteria. I use development cases to improve the skill, then separate held-out cases to decide whether to keep it. Once I use a held-out result to make an edit, that case can no longer count as a fresh test.
				</P>

				<H2>Keeping the comparison blind</H2>
				<P>
					<Code>eval_gate.py prepare</Code> prepares anonymous A/B packets with the order balanced across comparisons. Independent judges see the full transcripts and results. Checks with exact answers run in code first. Any critical failure counts against the candidate, even if its average score is higher.
				</P>

				<H2>Keeping the previous version when an edit fails</H2>
				<P>
					New candidates get up to three serious attempts by default. An existing skill keeps its last passing version until a revision passes. The lifecycle helper checks the attempt history, retired heldouts and final action, while the payload helper confirms that Claude Code and Codex loaded the exact frozen files.
				</P>

				<Box as="dl" mt={{ base: 12, md: 16 }} borderTop="1px solid" borderColor="border.subtle" fontFamily="var(--font-mono)" fontSize="12px">
					{facts.map(([label, value]) => (
						<Box key={label} display="flex" justifyContent="space-between" gap={4} py={2} borderBottom="1px solid" borderColor="border.subtle">
							<Box as="dt" color="text.muted">{label}</Box>
							<Box as="dd" ml={0} textAlign="right" fontWeight="700">{value}</Box>
						</Box>
					))}
				</Box>

				<AiToolFamily current="/skill-eval-pack" />
				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
