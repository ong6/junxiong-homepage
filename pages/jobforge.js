import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";

// Same shape as /groundplane: one ~680px column of prose, two code figures
// rendered as text, and a single mono fact table. No architecture diagram;
// the plugin is a hook, six skills and some markdown, and a figure of the
// actual banner says more than boxes would.

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
			description="Jobforge is an open-source Claude Code plugin for coding-interview prep that grades the plan you say out loud, not the code you submit, and keeps résumé, targets and interview debriefs in one local markdown corpus.">
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
						Every coding-interview tool I tried grades the submitted code.
						My failures were in the two minutes before it, where I said
						&ldquo;I&apos;ll DP this&rdquo; and started typing. Jobforge is a
						Claude Code plugin that asks for the plan first and grades that.
						Résumé, target list, teaching and interview debriefs live in the
						same local corpus, so one tool sees the whole picture. Code on{" "}
						<Link href="https://github.com/ong6/jobforge" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<H2>What it is</H2>

				<P>
					A plugin, not a service. One SessionStart hook, six skills, sixteen
					pattern files and a Python harness that runs your solution. State is
					markdown in <Code>~/jobforge</Code> that you can read, edit and{" "}
					<Code>rm -rf</Code>. I built it mid-prep, with interviews on the
					calendar, out of a private version that had been running for a few
					weeks. The constants in it are what that log produced, not what a
					paper said.
				</P>

				<P>
					<Code>/jobforge:drill</Code> generates a problem for a due pattern
					and asks what you would do before you write anything.{" "}
					<Code>/jobforge:interview-debrief</Code> records an interview you
					actually sat, with the same vocabulary, and queues whatever broke.{" "}
					<Code>/jobforge:status</Code> shows the streak and which element
					keeps failing. <Code>/jobforge:archive</Code> is the intended
					ending: past your target date, it stops.
				</P>

				<H2>The plan, not the code</H2>

				<P>
					Every mistake-classifier in this space fires on a rejected
					submission. None of them can fire when you wrote correct code for
					the wrong reason, and none of them has any notion of a plan you
					stated before typing. That is the one gap I found after reading
					six of them at source level, and it is the only thing this plugin
					claims.
				</P>

				<P>
					Each pattern declares three to five required elements from a global
					list of eleven: base case seeded, transition stated as a formula,
					iteration order justified, and so on. The drill marks each one{" "}
					<Code>present</Code>, <Code>vague</Code> or <Code>missing</Code>{" "}
					under one rule: no quote of your own words, not present.
					&ldquo;I&apos;ll build up the table&rdquo; is a vague{" "}
					<Code>transition</Code>. It passes casual listening, and it is the
					exact sentence that turns into a stall in the room.
				</P>

				<CodeFigure caption="fig. 1 — a graded plan and the row it writes. The verdict is on the stated plan; a recovery after prompting does not change it, because an interview measures what you produced unprompted. The due date is computed at grading time and stored in the row. There is no scheduler and no queue file, so there is nothing to desynchronise.">
					<CodeBlock title="/jobforge:drill · grading" lines={GRADE} />
					<CodeBlock title="bank.md · one row per rep" lines={ROW} />
				</CodeFigure>

				<P>
					The element ids being global is the point. A missing{" "}
					<Code>base-case</Code> on <Code>dp-2d</Code> and a missing{" "}
					<Code>base-case</Code> on <Code>prefix-sum</Code> land in the same
					column, so after sixty days <Code>/jobforge:status</Code> can say
					that one seed has been missed on five unrelated patterns. The
					element you missed is also what gets scheduled: the next rep is a
					different pattern that depends on it, never the same problem again
					in three days.
				</P>

				<H2>One banner, one subject</H2>

				<P>
					The hook prints one line at session start when you have not drilled
					today, and it is the only surface that speaks before you do. It
					reads <Code>rep-log.md</Code> and nothing else. There is no code
					path from it to the résumé, the target list or the bank, so it
					cannot nag about them. The first time a banner can also say{" "}
					<em>your LinkedIn headline is stale</em>, it stops being an
					instruction and becomes wallpaper, and the drill loop dies with it.
				</P>

				<P>
					That line is enforced by a test, not a comment.{" "}
					<Code>tests/test_push_pull_boundary.py</Code> strips the comments
					and asserts the hook contains exactly one <Code>os.path.join</Code>,
					one <Code>open(</Code>, one markdown filename, no networking
					imports, and no occurrence of resume, targets, profile, bank or
					interviews. A contributor who adds a helpful second line fails
					CI.
				</P>

				<CodeFigure caption="fig. 2 — the hook and what it prints. The banner is silent on a day already logged, silent past the target date, and silent before setup. The fact on the second line rotates by day so it does not become furniture.">
					<CodeBlock title="hooks/drill-banner.py" lines={HOOK} />
					<CodeBlock title="session start" lines={BANNER} />
				</CodeFigure>

				<P>
					The same tiering runs inside the skills. The drill reads the rep
					log, the bank and the pattern files. It never opens the résumé,
					because a tool that reads a résumé to pick a graph problem has no
					reason to, and you cannot audit what it never opened. Nothing in
					the plugin sends anything anywhere, so there is no telemetry
					setting. The README says the quiet part: if your employer manages
					the machine, put <Code>JOBFORGE_HOME</Code> on a personal volume.
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

				<H2>What it is not</H2>

				<P>
					It does not capture submissions. A browser extension sits at the
					moment you hit submit and can interrupt you; a CLI agent exists
					only when invoked. Several extensions already do auto-capture with
					FSRS scheduling well, and I read them before deciding not to
					compete there. An agent wins only where thinking out loud is the
					input, and anything drifting away from that is drifting onto
					ground where an extension is structurally better.
				</P>

				<P>
					It is not a problem bank. Nothing ships and nothing generated is
					written to disk. Problems come from the pattern&apos;s discriminator,
					never from a title, re-skinned to your own domain, and the state
					files hold a pattern, a verdict, an element id and a date. A
					problems directory would slowly become a derivative-works corpus,
					so there is none.
				</P>

				<P>
					The system-design references, the harness and the Excalidraw
					canvas are derived from{" "}
					<Link href="https://github.com/kirilxd/swe-interview-coach" isExternal>
						swe-interview-coach
					</Link>{" "}
					under MIT, with attribution per file. The taxonomy, the grading
					mechanism, the hook, the bank and the interview schema are new.
					Every constant generalises from one person&apos;s log, so they sit in
					frontmatter and are meant to be changed.
				</P>

				<Box h={{ base: 12, md: 20 }} />
			</Container>
		</Layout>
	);
}
