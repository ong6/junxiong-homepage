import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillsmithArchitecture from "../components/diagrams/SkillsmithArchitecture";
import Layout from "../components/layouts/Articles";

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

const facts = [
	["steps", "5 · gate through keep or retire"],
	["skill body", "under 500 lines · linted"],
	["revisions", "3 serious attempts, then archive"],
	["gate versions", "3 · older bundles still accepted"],
	["clients", "Claude Code + Codex"],
	["model calls", "0 · supplied by the host"],
	["runtime", "Python standard library"],
	["status", "MIT · github.com/ong6/skillsmith"],
];

const links = [
	{ name: "Source on GitHub", detail: "MIT, Claude Code and Codex", href: "https://github.com/ong6/skillsmith", external: true },
];

export default function Skillsmith() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Skillsmith"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skillsmith",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Skillsmith makes an agent skill from your repo, compares it with a no-skill baseline, and keeps it only when fresh heldout evidence clears a machine-checked gate.">
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
						Skillsmith
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I wanted to know whether my agent instructions actually helped. Skillsmith drafts a skill from the repo I am working in, then runs the same task with and without it, compares the results without telling the judges which is which, and checks the candidate on cases that were not used to revise it.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="skillsmith-lifecycle"
					headingLevel={2}
					diagram={SkillsmithArchitecture}
					caption="fig. 1 — the five steps in order. Making the skill is the front half; proving it is the back half. Nothing is kept on the strength of the draft alone."
				/>

				<H2>Deciding whether it should be a skill</H2>
				<P>
					Before anything is written, skillsmith asks whether the job needs a skill at all, or belongs in an <Code>AGENTS.md</Code> rule, a hook, a memory or a one-off answer. If a skill is right, <Code>inventory.py</Code> lists the skills and conventions the repo already has, so the new one fills a gap instead of overlapping one.
				</P>
				<P>
					The draft starts from its trigger description, keeps the body under 500 lines, and passes <Code>lint_skill.py</Code> before any run. It installs as one skill for both clients: <Code>.claude/skills/skillsmith</Code> for Claude Code, exposed to Codex at <Code>.agents/skills/skillsmith</Code>.
				</P>

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
					New candidates get up to three serious attempts by default. An existing skill keeps its last passing version until a revision passes. A new skill without a clear heldout win whose uncertainty lower bound clears the gate is archived. <Code>lifecycle_gate.py</Code> checks the attempt history, retired heldouts and final action, while the payload helper confirms that Claude Code and Codex loaded the exact frozen files.
				</P>

				<Box as="dl" mt={{ base: 12, md: 16 }} borderTop="1px solid" borderColor="border.subtle" fontFamily="var(--font-mono)" fontSize="12px">
					{facts.map(([label, value]) => (
						<Box key={label} display="flex" justifyContent="space-between" gap={4} py={2} borderBottom="1px solid" borderColor="border.subtle">
							<Box as="dt" color="text.muted">{label}</Box>
							<Box as="dd" ml={0} textAlign="right" fontWeight="700">{value}</Box>
						</Box>
					))}
				</Box>

				<AiToolFamily current="/skillsmith" />
				<CaseStudyFooter links={links} next={{ name: "Groundplane", href: "/groundplane", detail: "An agent boundary you can inspect" }} />
			</Container>
		</Layout>
	);
}
