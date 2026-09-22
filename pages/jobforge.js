import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import DiagramFigure from "../components/DiagramFigure";
import * as JobforgeArchitecture from "../components/diagrams/JobforgeArchitecture";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";

// Same shape as /groundplane: one ~680px column of prose, one architecture
// figure of the drill loop, two code figures rendered as text, and a single
// mono fact table.

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

const Code = (props) => (
	<Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />
);

// The grading rule and the closing line, in the words the drill skill uses.
const GRADE = [
	["> Before you write anything: what are you going to do, and why that?", "muted"],
	[""],
	["pattern          dp-2d"],
	["state-definition present   \"dp[i][j] is the best score using the first i and j\""],
	["base-case        present   \"row zero and column zero are all zero\""],
	["transition       vague     \"then I fill in the table\""],
	["iteration-order  missing   -"],
	[""],
	["verdict: failed", "hot"],
	["iteration-order was missing. You said \"then I fill in the table\" —", "hot"],
	["fill it in which direction, and what does each cell need already computed?", "hot"],
];

// Straight from docs/state-schema.md. The due date is in the row; nothing
// else schedules.
const ROW = [
	["| date       | pattern         | verdict | missing         | due        |"],
	["|------------|-----------------|---------|-----------------|------------|"],
	["| 2026-08-27 | monotonic-stack | half    | iteration-order | 2026-08-30 |"],
];

// hooks/drill-banner.py, with the one filename it may open. The banner text
// is what the hook prints for a three-day streak.
const HOOK = [
	['REP_LOG_FILENAME = "rep-log.md"  # the only filename this process may ever open'],
	[""],
	["def rep_log_path() -> str:"],
	['    """The only path-producing function in this module."""'],
	["    return os.path.join(jobforge_home(), REP_LOG_FILENAME)"],
	[""],
	["def _read() -> str:"],
	["    path = rep_log_path()"],
	["    if os.path.basename(path) != REP_LOG_FILENAME:"],
	['        return ""'],
	["    ..."],
];

const BANNER = [
	["🔨 3-day streak, not yet logged today. /jobforge:drill", "hot"],
	["   Median session 24 min — the floor is 20.", "hot"],
];

const facts = [
	["form", "Claude Code plugin · 1 SessionStart hook · 6 skills"],
	["patterns", "16 · 8 Tier A, 8 Tier B"],
	["element ids", "11, global across patterns"],
	["verdicts", "failed · half · coded · named-clean"],
	["intervals", "+3 days / +14 days, written into the row"],
	["tests", "35, unittest, all deterministic"],
	["runtime", "python 3 · stdlib only · 0 dependencies"],
	["state", "markdown in ~/jobforge, no telemetry"],
	["tracked files", "53"],
	["status", "v0.1.0 · MIT · derived from swe-interview-coach"],
];

const links = [
	{ name: "Source on GitHub", detail: "Claude Code plugin, local first", href: "https://github.com/ong6/jobforge", external: true },
];

export default function Jobforge() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Jobforge"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/jobforge",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Jobforge is an open-source Claude Code plugin for coding-interview prep. It
			grades the plan you say out loud, not the code you submit, and keeps
			résumé, targets and interview debriefs in one local markdown corpus.">
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
						Jobforge
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · claude code plugin
					</Text>

					<Text
						mt={8}
						fontSize={{ base: "19px", md: "21px" }}
						lineHeight="1.6"
						fontWeight="600">
						The coding-interview tools I tried focused on the submitted code. I wanted help with the part before that, when I said
						&ldquo;I&apos;ll DP this&rdquo; and started typing. Jobforge is a
						Claude Code plugin that asks for the plan first and grades that.
						It also keeps my résumé, target roles, lessons and interview debriefs in local Markdown files.
					</Text>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<DiagramFigure
					id="jfarch"
					headingLevel={2}
					diagram={JobforgeArchitecture}
					caption="fig. 1 — the drill loop. ① The SessionStart hook reads rep-log.md, the only file it may open, and prints one banner. ② You state the plan before any code. ③ The drill picks the pattern bank.md says is due and generates a problem from that pattern's discriminator. ④ It grades the plan against the pattern's required elements. ⑤ It writes one row: verdict, missing element, due date. ⑥ An interview debrief writes each failed question into the same bank, due three days on."
				/>

				<H2>What it is</H2>

				<P>
					It runs as a plugin with one SessionStart hook, six skills, sixteen pattern files and a Python harness for running solutions. State is
					markdown in <Code>~/jobforge</Code> that you can read, edit and{" "}
					remove. I built it mid-prep, interviews on the calendar, from a private version that
					had run for a few weeks. I chose the initial settings from my practice log.
				</P>

				<P>
					<Code>/jobforge:drill</Code> generates a problem for a due pattern
					and asks what you would do before you write anything.{" "}
					<Code>/jobforge:interview-debrief</Code> records an interview you sat, with the same vocabulary, and queues whatever
					broke.{" "}
					<Code>/jobforge:status</Code> shows the streak and which element
					keeps failing. <Code>/jobforge:archive</Code> is the intended
					ending: past your target date, it stops.
				</P>

				<H2>Explaining the plan before coding</H2>

				<P>
										I read the source of six tools before building this. Their mistake classifiers worked from submissions. I wanted to check whether I could explain the solution before typing it, including cases where I could produce correct code without explaining why it worked.
				</P>

				<P>
					Each pattern declares three to five required elements from a global
					list of eleven: base case seeded, transition stated as a formula,
					iteration order justified, and so on. The drill marks each one{" "}
					<Code>present</Code>, <Code>vague</Code> or <Code>missing</Code>{" "}
					and must quote the part of your explanation that supports its mark.
					&ldquo;I&apos;ll build up the table&rdquo; is a vague{" "}
					<Code>transition</Code>. It does not explain the recurrence or the order in which to fill the cells.
				</P>

				<CodeFigure caption="fig. 2 — a graded plan and the row it writes. The verdict is on the stated
				plan. A recovery after prompting does not change it, because an
				interview measures what you produced unprompted. The due date is
				computed at grading time and stored in the row. No scheduler, no queue
				file, nothing to desynchronise.">
					<CodeBlock title="/jobforge:drill · grading" lines={GRADE} />
					<CodeBlock title="bank.md · one row per rep" lines={ROW} />
				</CodeFigure>

				<P>
										The same element IDs are used across patterns. A missing{" "}
					<Code>base-case</Code> on <Code>dp-2d</Code> and a missing{" "}
					<Code>base-case</Code> on <Code>prefix-sum</Code> land in the same column, so after sixty days <Code>/jobforge:status</Code> can say one seed was missed on five unrelated patterns. The missed element
					is also what gets scheduled: the next rep is a different pattern that
					depends on it, never the same problem three days later.
				</P>

				<H2>One banner, one subject</H2>

				<P>
										The hook prints one line at session start when you have not drilled
					today. That is the plugin&apos;s only unsolicited reminder. It reads <Code>rep-log.md</Code> and nothing else. No code path leads from it to the résumé, the target list
					or the bank, so it cannot nag about them. I did not want it also telling me{" "}
					<em>your LinkedIn headline is stale</em>, when I had opened the tool to practise.
				</P>

				<P>
										A test checks that the hook stays within those limits.{" "}
					<Code>tests/test_push_pull_boundary.py</Code> strips the comments
					and asserts the hook contains exactly one <Code>os.path.join</Code>,
					one <Code>open(</Code>, one markdown filename, no networking
										imports, and no mention of resume, targets, profile, bank or
					interviews. An extra file read would fail that check.
				</P>

				<CodeFigure caption="fig. 3 — the hook and what it prints. The banner stays silent on a day
				already logged, past the target date, and before setup. The fact on the
				second line rotates by day so it does not become furniture.">
					<CodeBlock title="hooks/drill-banner.py" lines={HOOK} />
					<CodeBlock title="session start" lines={BANNER} />
				</CodeFigure>

				<P>
					The same tiering runs inside the skills. The drill reads the rep
										log, the bank and the pattern files. It never opens the résumé: a tool
					picking a graph problem has no reason to, and you cannot audit what it
					never opened. Nothing in the plugin sends anything anywhere, so there
					is no telemetry setting. The README also notes that if your
					employer manages the machine, put <Code>JOBFORGE_HOME</Code> on a personal volume.
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

				<H2>Where I kept the scope small</H2>

				<P>
										It does not capture submissions. A browser extension sits at the moment
					you hit submit and can interrupt you. A CLI agent exists only when
					invoked. Several extensions already do auto-capture with FSRS
					scheduling well, and I read them before deciding not to compete there.
					I kept this plugin focused on the spoken plan, which is the part I wanted an agent to review.
				</P>

				<P>
										The plugin does not ship a problem bank or save generated questions. Problems come from the pattern&apos;s discriminator,
					never from a title, re-skinned to your own domain. The state files hold
					a pattern, a verdict, an element id and a date. I only keep the practice record.
				</P>

				<P>
					The system-design references, the harness and the Excalidraw
					canvas are derived from{" "}
					<Link href="https://github.com/kirilxd/swe-interview-coach" isExternal>
						swe-interview-coach
					</Link>{" "}
					under MIT, with attribution per file. The taxonomy, the grading
										mechanism, the hook, the bank and the interview schema are new. Every
					constant generalises from one person&apos;s log, so it sits in
					frontmatter and is meant to be changed.
				</P>

				<CaseStudyFooter links={links} next={{ name: "Groundplane", href: "/groundplane", detail: "An agent boundary you can inspect" }} />
			</Container>
		</Layout>
	);
}
