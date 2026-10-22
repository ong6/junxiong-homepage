import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillsArchitecture from "../components/diagrams/SkillsArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import FactList from "../components/FactList";

// Case study in the same shape as /groundplane: one ~680px column of prose,
// the link-and-publish figure, a terminal figure, and a single mono fact table.

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// Real output from bin/skills in a scratch home with one machine profile and
// a fresh clone of ong6/skills; the guard hit is a home path added on purpose.
const SESSION = [
	["$ skills up --repo . --machines machines.json", "muted"],
	["skills: 24 linked (Laptop, project) · fetched just now"],
	["$ skills doctor --repo . --machines machines.json", "muted"],
	["machine  Laptop (skills profile)"],
	["scope    project · root ~/src · private no"],
	["skills   24 selected of 24 available"],
	["links    ~/src/notes/.agents/skills: 24 ok"],
	["links    ~/src/notes/.claude/skills: 24 ok"],
	["doctor: ok", "hot"],
];

const GUARD = [
	["$ skills guard skills/", "muted"],
	["skills/handoff/SKILL.md:19: home-path"],
	["guard: 1 hit(s) in 1 file(s); fix them or mark a", "hot"],
	["  deliberate line with `public-guard: allow`", "hot"],
	["$ echo $?", "muted"],
	["2"],
];

const facts = [
	["skills", "24 · one SKILL.md each"],
	["catalog", "7 categories · 18 links out"],
	["install paths", "3 · one folder, bin/skills, plugin"],
	["agents", "Claude Code, Codex"],
	["bin/skills", "one file · stdlib Python 3.7+"],
	["cli tests", "22 · CI on Python 3.12 and 3.7"],
	["catalog build", "exits 1 when tree and catalog disagree"],
	["status", "MIT · github.com/ong6/skills"],
];

const links = [
	{ name: "Source on GitHub", detail: "MIT, Claude Code and Codex", href: "https://github.com/ong6/skills", external: true },
];

export default function Skills() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Agent skills"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skills",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="The Claude Code and Codex skills I run in every repo, kept in one public repo and linked into place on each machine. A skill edited in one repo reaches the rest.">
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
						Agent skills
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						A skill is a markdown file that tells a coding agent when to do something and how. I had
					the same eight copied into several repos, and every copy drifted. Now the ones I can share
					live in one public repo, <Code>ong6/skills</Code>, and a small command links them into
					every repo I work in and sends my edits back.
				</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="sparch"
					headingLevel={2}
					diagram={SkillsArchitecture}
					caption="fig. 1 — each machine keeps one checkout of the repo. At session start, skills up updates it and links the enabled skills into the folders Claude Code and Codex read. Edits go back through skills publish."
				/>

				<H2>Editing skills where I use them</H2>

				<P>
					You can install the repo as a plugin, which is fine if you only want to use the skills. I
					also wanted to fix them while I work. Before the shared repo, a fix made in one repo stayed
					there and the other copies fell behind. So each machine keeps one clone, every repo links
					into it, and an edit made from anywhere lands in the same files. Publishing sends it
					upstream, and my other machines pick it up the next time a session starts.
				</P>

				<H2>One command, run by a hook</H2>

				<P>
					<Code>skills up</Code> runs when a session starts. It looks the machine up in{" "}
					<Code>machines.json</Code>, links the skills that machine should have and removes the ones
					it shouldn&apos;t. It never prompts, only updates a clean checkout, and finishes in well
					under a second when nothing has changed. <Code>skills publish</Code> goes the other way: it
					runs a safety check, lints what changed, then commits and pushes.
				</P>

				<CodeFigure caption="fig. 2 — a session start, then the safety check catching a home-directory path in a public skill. Publish runs the same check and stops before anything is committed.">
					<CodeBlock title="a session start" lines={SESSION} />
					<CodeBlock title="a home path in a public skill" lines={GUARD} />
				</CodeFigure>

				<P>
					The tests build throwaway home folders and git remotes and run without a network, on
					Python 3.12 and on 3.7, the oldest machine I link skills into.
				</P>

				<H2>The catalog</H2>

				<P>
					A catalog file puts each skill in one category and also lists other people&apos;s skills I
					rate, so the README is useful even where I haven&apos;t written one myself. The README
					tables are generated from it, and the build fails if the catalog and the folders disagree.
				</P>

				<FactList facts={facts} />

				<H2>What stays out</H2>

				<P>
					Only skills I can share go in. Anything with my paths, accounts or writing voice lives in a
					private repo. Before anything is published, <Code>skills guard</Code> blocks things like
					home-directory paths, personal email addresses, keys and tokens. The 24 public ones cover
					research, writing, design, trips and shopping, interview practice, and making and testing
					skills.
				</P>

				<AiToolFamily current="/skills" />
				<CaseStudyFooter links={links} next={{ name: "Skillsmith", href: "/skillsmith", detail: "Drafts a skill from the repo, then a blind test decides whether it stays" }} />
			</Container>
		</Layout>
	);
}
