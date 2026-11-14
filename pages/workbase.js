import { Box, Container, Heading, Text } from "@chakra-ui/react";
import AiToolFamily from "../components/AiToolFamily";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import DiagramFigure from "../components/DiagramFigure";
import * as WorkbaseArchitecture from "../components/diagrams/WorkbaseArchitecture";
import Layout from "../components/layouts/Articles";
import FactList from "../components/FactList";
import { BackLink, P, H2, Code, ARTICLE_TITLE } from "../components/ArticleParts";

// Every fact below is checkable in github.com/ong6/workbase: README.md,
// DESIGN.md, template/AGENTS.md, template/.gitignore, bin/new-workbase and
// evals/ (README.md "My results", grade.py, run.sh).
const facts = [
	["manual", "55 lines · a 10-row filing table"],
	["setup flags", "--remote · --local · --adopt"],
	["eval cost", "$0.98 old setup · $0.97 workbase"],
	["migration", "dossiers 1,866 → 44 files · no lookup lost"],
	["bundled skill", "council · runs only when asked"],
	["runtime", "Bash setup script · Python grader"],
	["status", "MIT · github.com/ong6/workbase"],
];

const links = [
	{ name: "Source on GitHub", detail: "MIT: the template, setup script and eval kit", href: "https://github.com/ong6/workbase", external: true },
];

export default function Workbase() {
	const accent = "brand.solid";

	return (
		<Layout
			contents
			title="Workbase"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/workbase",
				programmingLanguage: "Shell",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Workbase is a notes folder for one job with the company's repos inside it, and a manual that tells a coding agent where each kind of fact goes and where to look before answering.">
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<BackLink href="/ai-tooling">AI tooling</BackLink>

					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						Workbase
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700" letterSpacing=".08em" textTransform="uppercase">
						2026 · open source · claude code + codex
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="lede" fontWeight="600">
						Workbase is a notes folder for one job that my coding agent keeps up to date. I clone the company&apos;s repos inside it, and every agent session started below it reads the same manual, which says where each kind of fact goes and where to look before answering.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="workbase-lookups"
					headingLevel={2}
					diagram={WorkbaseArchitecture}
					caption="fig. 1 — a question goes to the file the manual names first, and the answer comes back from it. A capture goes to the file for its kind of fact, never to the agent's own memory."
				/>

				<H2>Where it came from</H2>
				<P>
					Before this I ran a heavier setup at my job for about four months: 27 skills, a phase pipeline per feature and an activity log. Most of it went unused. Twelve of the skills were never used in about 190 work sessions, and the hand-kept daily log and work board stopped being updated within a few weeks.
				</P>
				<P>
					Workbase is what was left after keeping only the parts I used. It stores what the company&apos;s systems don&apos;t: why something was decided, what an acronym means, how the deploy broke last time and how it was fixed.
				</P>

				<H2>The folder and the manual</H2>
				<P>
					I make one workbase per job with <Code>bin/new-workbase</Code> and clone the company&apos;s repos inside it. Its <Code>.gitignore</Code> starts with <Code>{"/*"}</Code> and lists only the workbase&apos;s own files, so the repos are never committed with the notes. The script won&apos;t nest a workbase inside another git repo, overwrite an existing folder, or add a remote that matches a pattern I&apos;ve marked as personal.
				</P>
				<P>
					The manual is <Code>AGENTS.md</Code>, and <Code>CLAUDE.md</Code> is a symlink to it, so Claude Code and Codex read one file. Claude Code loads it in any session started in a repo below the workbase. An <Code>@AGENTS.md</Code> import doesn&apos;t work for this: Claude Code skipped the import from the parent folder when the session started inside a repo.
				</P>

				<H2>Where things go</H2>
				<P>
					The manual names a file for every kind of fact: a row in <Code>decisions.md</Code> with the date, what, why, who and a link; shipped outcomes with their numbers in <Code>wins.md</Code>; acronyms in <Code>glossary.md</Code>; a card per repo or service in <Code>systems/</Code>. When I mention one of these, the agent files it in the same session and says where in one line. Anything it can&apos;t place goes to <Code>inbox.md</Code>.
				</P>
				<P>
					A second list says where to look before answering: errors and permission problems in <Code>systems/gotchas/</Code> first, a feature&apos;s state in its project folder, an acronym in the glossary. Reads are free, but sending messages, editing shared docs and changing tickets wait for my yes.
				</P>

				<H2>Testing it on my notes</H2>
				<P>
					I wrote ten questions and capture requests from my own work notes, each with a known answer: seven lookups and three captures. Each ran on Sonnet against my old setup and against the same notes moved into the template, with every session started inside a repo. <Code>evals/grade.py</Code> marks them mechanically: a lookup passes if the answer contains the expected words, a capture if a file with the expected name changed and holds them.
				</P>
				<P>
					The old setup passed 4 of 10. All three captures went into the agent&apos;s auto-memory, which nothing else can search. The list of shipped features existed only as JSON in a registry nothing indexed, and the doc index lived outside the workspace. The workbase passed 9, in 51 turns to the old setup&apos;s 65.
				</P>
				<P>
					Both setups missed the same question: the fix for a known 403 was in a gotcha note, and neither session looked there. Adding &quot;errors go to <Code>systems/gotchas/</Code> first&quot; to the manual fixed it. The question then passed in 3 of 3 reruns and took 4 turns instead of 12.
				</P>
				<P>
					Each task ran once per setup, on one model, graded by keyword and file. The tenth pass came from a manual change made after seeing that miss, and it was checked on the same question. The tasks and notes are private, so the repo ships the scripts and an example task file for running the same test on your own notes.
				</P>

				<H2>What it doesn&apos;t do</H2>
				<P>
					It&apos;s built for one person: no shared registry, no team dashboard, and no notes committed into team repos. Nothing runs on a schedule.
				</P>
				<P>
					The company owns the workbase, so it stays on company machines and company git, or on the laptop with <Code>--local</Code>, which keeps the remote but disables pushes. Not built yet: a morning summary from calendar, mentions and open PRs, and a review drafter that works from <Code>wins.md</Code>.
				</P>

				<FactList facts={facts} />

				<AiToolFamily current="/workbase" />
				<CaseStudyFooter links={links} next={{ name: "Agent skills", href: "/skills", detail: "The reusable instructions my agents load, kept in one public repo" }} />
			</Container>
		</Layout>
	);
}
