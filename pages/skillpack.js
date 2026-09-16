import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillpackArchitecture from "../components/diagrams/SkillpackArchitecture";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";

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
	["sync", "157 lines of bash · both directions"],
	["sync tests", "15 scenarios, sandboxed, no network"],
	["catalog build", "exits 1 when tree and catalog disagree"],
	["status", "MIT · github.com/ong6/skillpack"],
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
												A skill is a markdown file that tells a coding agent when to act and
						how. I had the same eight copied into several repos, and each copy
						drifted. Skillpack is the one folder they live in now. Every repo
						pulls it as a git subtree, and a hook pushes edits back. Code on{" "}
						<Link href="https://github.com/ong6/skillpack" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<DiagramFigure
					id="sparch"
					wide={SkillpackArchitecture.Wide}
					narrow={SkillpackArchitecture.Narrow}
					breakpoint="lg"
					caption="fig. 1 — the sync loop. ① Upstream holds the skills, a catalog that
					regenerates the README, and the plugin manifest. ② A consumer repo
					carries the folder as a squashed subtree and symlinks it into the paths
					Claude Code and Codex read. A SessionStart hook merges the last
					background fetch. ③ A Stop hook commits edits inside the folder, merges
					upstream if it moved, and pushes. ④ The plugin marketplace installs the
					same repo read-only."
				/>

				<H2>Edit where you use it</H2>

				<P>
										The plugin route is fine for reading: install once and forget it. But a
					skill only improves while it is in use, and the plugin copy is not the
					one in use. Every fix I made landed in one repo and stayed there.
				</P>

				<P>
										So the subtree is the canonical copy: a normal folder in the consumer
					repo, edited in place. A hook carries each change upstream before the
					session ends. The next repo to start a session merges it, no pull
					request. Both agents read the same files through symlinks, so there is
					no Claude version and no Codex version.
				</P>

				<H2>Two hooks, one script</H2>

				<P>
					<Code>sync.sh --start</Code> runs at SessionStart. It merges what the last background fetch brought in,
					no network needed, then fetches again in the background. The session
					never waits on GitHub.
				</P>

				<P>
					<Code>sync.sh --stop</Code> runs at Stop. It commits only the skills folder, so a merge never runs over
					unrelated uncommitted work. Then it merges upstream if it moved, and
					pushes. State is two hashes in <Code>.git/skills-sync</Code>: the folder tree last synced and the upstream commit it matched. When they
					match, the script exits without touching git.
				</P>

				<CodeFigure caption="fig. 2 — one session as the hooks see it, then the conflict path. A conflict
				aborts the merge, leaves the tree clean and exits 2, the one exit code
				the hook treats as a reason to wake the agent. A missing network or an
				empty upstream is a line on stderr and exit 0.">
					<CodeBlock title="a normal session" lines={SESSION} />
					<CodeBlock title="same line edited on both sides" lines={CONFLICT} />
				</CodeFigure>

				<P>
										Bootstrapping was the hard part. A folder made by hand has no subtree
					history, and{" "}
					<Code>git subtree push</Code> fails one way against an empty upstream and another way against a missing
					branch. The test script builds a bare upstream in a temp directory,
					wires three consumer repos to it, and walks fifteen scenarios through
					them: fresh install, edits from either side, concurrent edits to
					different files, the same line changed on both sides, an empty
					upstream, an unreachable one. About twenty seconds, no network.
				</P>

				<H2>The catalog is a map</H2>

				<P>
					<Code>catalog.yaml</Code> puts each skill in exactly one category and lists, per category,
					other people&apos;s skills I rate. A script regenerates the README tables from it plus
					each skill&apos;s frontmatter, and exits 1 if a folder on disk is missing from the catalog
					or the catalog names a folder that does not exist. The README cannot describe a tree that
					is not there.
				</P>

				<P>
										Three categories hold none of my skills yet and exist for the links.
					Deliberate: someone looking for an interview drill should find
					jobforge, and the coach it derives from, in the same place they found
					unslop.
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
										Only generic skills go in. Anything naming a private path, an account
					or a price stays in the consumer repo beside the subtree. The store
					this grew out of keeps more of those than it publishes. The eight here
					survived being pulled out of that context: writing, web extraction,
					diagrams, a PDF builder, a session handoff, and the feedback loop that
					patches whichever skill or rule earned the complaint.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
