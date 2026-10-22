import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillsmithArchitecture from "../components/diagrams/SkillsmithArchitecture";
import Layout from "../components/layouts/Articles";
import FactList from "../components/FactList";

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
	["status", "MIT · a skill in github.com/ong6/skills"],
];

const links = [
	{ name: "Source on GitHub", detail: "MIT, part of my public skills repo", href: "https://github.com/ong6/skills/tree/main/skills/skillsmith", external: true },
];

export default function Skillsmith() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Skillsmith"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skills/tree/main/skills/skillsmith",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Skillsmith makes an agent skill from your repo, tests it against a no-skill baseline, and keeps it only when it wins on fresh heldout tasks.">
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

					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={{ base: "40px", md: "52px" }} lineHeight="1" letterSpacing="-.045em">
						Skillsmith
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						I wanted to know whether my agent instructions actually helped. Skillsmith drafts a skill from the repo I&apos;m working in, then runs the same tasks with and without it and has judges compare the results without knowing which is which. The skill is kept only if it wins on cases it wasn&apos;t tuned on.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="skillsmith-lifecycle"
					headingLevel={2}
					diagram={SkillsmithArchitecture}
					caption="fig. 1 — the first steps decide whether a skill is needed and draft it; the later ones test it against the agent without it. It&apos;s kept only if it passes."
				/>

				<H2>Deciding whether it should be a skill</H2>
				<P>
					First it checks whether the job needs a skill at all, or would work better as a rule in <Code>AGENTS.md</Code>, a hook or a one-off answer. If a skill makes sense, it lists what the repo already has, so the new one fills a gap instead of overlapping. The draft stays under 500 lines and has to pass a lint check before any test runs.
				</P>

				<H2>Testing it fairly</H2>
				<P>
					Both versions run fresh, with the same model, tools, task and scoring. I use one set of cases to improve the skill and a separate held-out set to decide whether to keep it. Once I&apos;ve used a held-out result to change the skill, that case no longer counts as a fresh test. The judges get anonymous A/B packets in a balanced order, and anything with an exact answer is checked in code first. A critical failure counts against the skill even if its average score is higher.
				</P>

				<H2>When it doesn&apos;t pass</H2>
				<P>
					A new skill gets up to three serious attempts. If it still doesn&apos;t win on the held-out cases, it&apos;s archived. An existing skill keeps its last passing version until a revision beats it.
				</P>

				<FactList facts={facts} />

				<AiToolFamily current="/skillsmith" />
				<CaseStudyFooter links={links} next={{ name: "Groundplane", href: "/groundplane", detail: "Checks an agent's declared fields against recorded tool results" }} />
			</Container>
		</Layout>
	);
}
