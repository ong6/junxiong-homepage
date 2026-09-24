import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import AiToolFamily from "../components/AiToolFamily";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillpackArchitecture from "../components/diagrams/SkillpackArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";

// Case study in the same shape as /groundplane: one ~680px column of prose,
// the sync figure, a terminal figure, and a single mono fact table.

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// What the two hooks print. The messages are the ones sync.sh actually emits.
const SESSION = [
	["$ sync.sh --start", "muted"],
	["skills-sync: merged upstream changes into .claude/shared-skills"],
	[""],
	["# ... a session that edits skills/unslop/SKILL.md ...", "muted"],
	[""],
	["$ sync.sh --stop", "muted"],
	["skills-sync: pushed .claude/shared-skills to upstream", "hot"],
];

const CONFLICT = [
	["$ sync.sh --stop", "muted"],
	["skills-sync: CONFLICT merging upstream into .claude/shared-skills", "hot"],
	["  (in: skills/handoff/SKILL.md). Resolve: git subtree merge --squash ..."],
	["$ echo $?", "muted"],
	["2"],
];

const facts = [
	["skills", "8 · one SKILL.md each"],
	["catalog", "8 categories · 5 hold my skills, all link out"],
	["install paths", "2 · plugin marketplace, git subtree"],
	["agents", "Claude Code, Codex"],
	["sync", "Bash · git subtree · both directions"],
	["sync tests", "temporary repos and bare remotes · no network"],
	["catalog build", "exits 1 when tree and catalog disagree"],
	["status", "MIT · github.com/ong6/skillpack"],
];

const links = [
	{ name: "Source on GitHub", detail: "MIT, Claude Code and Codex", href: "https://github.com/ong6/skillpack", external: true },
];

export default function Skillpack() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Skillpack"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skillpack",
				programmingLanguage: "Shell",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Skillpack is the Claude Code and Codex skills I run in every repo, kept as a
			git subtree that syncs both ways. A skill edited in one repo reaches the
			rest.">
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
						Skillpack
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
						eight copied into several repos, and each copy drifted. Skillpack is the one folder they
						live in now. Every repo pulls it as a git subtree, and a hook pushes edits back.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="sparch"
					headingLevel={2}
					diagram={SkillpackArchitecture}
					caption="fig. 1 — the sync loop. ① Upstream holds the skills, a catalog that
					regenerates the README, and the plugin manifest. ② A consumer repo
					carries the folder as a squashed subtree and symlinks it into the paths
					Claude Code and Codex read. A SessionStart hook merges the last
					background fetch; the first fetch on a new clone is synchronous. ③ A Stop hook
					commits only the skills folder. Unrelated edits defer merging and pushing;
					an existing Git operation defers the whole sync. ④ The plugin marketplace installs the
					same repo read-only."
				/>

				<H2>Editing skills where I use them</H2>

				<P>
					The plugin install is useful when I just want to use the skills. But I also want to edit them while working. Before the shared folder, a fix made in one repo stayed there and the other copies fell behind.
				</P>

				<P>
					So the subtree is the canonical copy: a normal folder in the consumer repo, edited in
					place. A hook carries changes upstream when the checkout is ready to sync. Other repos
					pick them up at session start after fetching. Claude Code and Codex read the same files
					through symlinks.
				</P>

				<H2>One script, run by two hooks</H2>

				<P>
					<Code>sync.sh --start</Code> runs at SessionStart. It merges what the last background
					fetch brought in, then fetches again in the background for the next session. The first run
					on a new clone fetches synchronously, so it can wait on GitHub.
				</P>

				<P>
					<Code>sync.sh --stop</Code> commits only the skills folder, even when other files are
					staged. If unrelated staged, unstaged or untracked work remains, it defers the merge and
					push. An existing merge, rebase, cherry-pick or revert defers the whole sync before any
					commit. A later run retries once that work is resolved.
				</P>

				<P>
					State is two hashes in <Code>.git/skills-sync</Code>: the folder tree last synced and the
					upstream commit it matched. A deferred sync leaves them unchanged. When the folder has no
					new changes, Stop skips the fetch and push.
				</P>

				<CodeFigure
					caption="fig. 2 — one session as the hooks see it, then the conflict path. A conflict
				aborts the merge, leaves the tree clean and exits 2, the one exit code
				the hook treats as a reason to wake the agent. A missing network or an
				empty upstream is a line on stderr and exit 0.">
					<CodeBlock title="a normal session" lines={SESSION} />
					<CodeBlock title="same line edited on both sides" lines={CONFLICT} />
				</CodeFigure>

				<P>
					Bootstrapping was the hard part. A folder made by hand has no subtree history, and{" "}
					<Code>git subtree push</Code> fails one way against an empty upstream and another way
					against a missing branch. The test script builds a bare upstream in a temp directory,
					wires temporary consumer repos to it, and exercises fresh installs, edits from either
					side, concurrent changes, conflicts, empty upstreams and unavailable remotes. Regression
					checks also compare the index and file contents before and after a deferred sync,
					including unrelated staged work and an existing Git operation. All of it runs locally,
					with no network.
				</P>

				<H2>Keeping the catalog current</H2>

				<P>
					<Code>catalog.yaml</Code> puts each skill in exactly one category and lists, per category,
					other people&apos;s skills I rate. A script regenerates the README tables from it plus
					each skill&apos;s frontmatter, and exits 1 if a folder on disk is missing from the catalog
					or the catalog names a folder that does not exist. This catches a missing or renamed skill when the catalog is built.
				</P>

				<P>
					Three categories currently contain only links to other projects. I want the catalog to be useful even where I have not written a skill myself.
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
					Only generic skills go in. Anything naming a private path, an account or a price stays in
					the consumer repo beside the subtree. The store this grew out of keeps more of those than
					it publishes. The eight here cover web and video research, system diagrams, 3D and Blender
					authoring, printable PDFs, session handoffs and the feedback loop that patches the relevant skill or rule after feedback.
				</P>

				<AiToolFamily current="/skillpack" />
				<CaseStudyFooter links={links} next={{ name: "Jobforge", href: "/jobforge", detail: "Coding drills that grade the plan before the code" }} />
			</Container>
		</Layout>
	);
}
