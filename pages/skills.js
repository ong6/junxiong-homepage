import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillsArchitecture from "../components/diagrams/SkillsArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";

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
						Agent skills
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						A skill is a markdown file that tells a coding agent when to act and how. I had the same
						eight copied into several repos, and each copy drifted. Now the shareable ones live in one
						public repo, <Code>ong6/skills</Code>. A small command links them into every repo I work
						in, and publishes my edits back.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="sparch"
					headingLevel={2}
					diagram={SkillsArchitecture}
					caption="fig. 1 — link and publish. The repo holds the skills, a catalog that
					regenerates the README, the bin/skills command and the plugin manifest. Each
					machine keeps one checkout. At session start, skills up fast-forwards it in the
					background when it is clean and symlinks the skills that machine's profile
					enables into the paths Claude Code and Codex read. An edit goes back through
					skills publish. The plugin marketplace installs the same repo read-only."
				/>

				<H2>Editing skills where I use them</H2>

				<P>
					The plugin install is useful when I just want to use the skills. But I also want to edit them while working. Before the shared repo, a fix made in one repo stayed there and the other copies fell behind.
				</P>

				<P>
					So the checkout is the canonical copy: one clone per machine, beside my other repos.
					Each repo gets symlinks into it, so an edit made from any repo lands in the same files.
					Publishing carries it upstream, and other machines pick it up at their next session
					start. Claude Code and Codex read the same files through the same links.
				</P>

				<H2>One command, run by a hook</H2>

				<P>
					<Code>skills up</Code> runs at SessionStart. It finds this machine in a{" "}
					<Code>machines.json</Code> registry, links the skills its profile enables into{" "}
					<Code>.claude/skills</Code> and <Code>.agents/skills</Code>, and removes links it no
					longer wants. Fetching runs in the background, and a checkout only fast-forwards when it
					is clean. The hook never prompts, always exits 0, and returns in well under a second when
					nothing changed.
				</P>

				<P>
					A profile picks the scope. Project scope links into named repos only; user scope links
					into the home folders, so every repo sees the skills. <Code>enable</Code> and{" "}
					<Code>disable</Code> take skill names or a whole category. Only symlinks that point into
					the checkouts are ever created or removed; anything else in a link folder is left alone
					and reported.
				</P>

				<P>
					<Code>skills publish</Code> is the way back. It takes a lock, runs the public-safety
					guard, lints the skills that changed, commits and pushes. If the push is rejected, it
					rebases once and tries again. <Code>skills doctor</Code> reports the profile, every link,
					dirty checkouts and the last fetch, and exits 1 when something is off.
				</P>

				<CodeFigure
					caption="fig. 2 — a session start as the hook sees it, then the guard on a home path
				added to a public skill. publish runs the same guard and refuses with exit 2, before
				anything is committed.">
					<CodeBlock title="a session start" lines={SESSION} />
					<CodeBlock title="a home path in a public skill" lines={GUARD} />
				</CodeFigure>

				<P>
					The tests build temporary homes, checkouts and bare remotes, then exercise linking,
					stale and foreign links, both scopes, category selectors, publishing and the guard. CI
					runs them on Python 3.12 and on 3.7, the oldest machine I link skills into. All of it runs
					locally, with no network.
				</P>

				<H2>Keeping the catalog current</H2>

				<P>
					<Code>catalog.yaml</Code> puts each skill in exactly one category and lists, per category,
					other people&apos;s skills I rate. A script regenerates the README tables from it plus
					each skill&apos;s frontmatter, and exits 1 if a folder on disk is missing from the catalog
					or the catalog names a folder that does not exist. This catches a missing or renamed skill when the catalog is built. <Code>bin/skills</Code> reads the same file, so a profile can switch a whole category on or off.
				</P>

				<P>
					Five of the seven categories also link to other people&apos;s projects. I want the catalog to be useful even where I have not written a skill myself.
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

				<H2>What stays out</H2>

				<P>
					Only shareable skills go in. Anything naming my paths, accounts or voice lives in a
					separate private repo, which can use public skills by name; the public repo never points
					back. <Code>skills guard</Code> blocks home-directory paths, personal email addresses,
					phone numbers, keys and tokens, and skill code that launches another agent CLI. The 24
					here cover research, writing, design, trips and shopping, interview practice,
					field-engineering decks and pilot evidence, and making and testing skills.
				</P>

				<AiToolFamily current="/skills" />
				<CaseStudyFooter links={links} next={{ name: "Skillsmith", href: "/skillsmith", detail: "Drafts a skill from the repo, then a blind test decides whether it stays" }} />
			</Container>
		</Layout>
	);
}
