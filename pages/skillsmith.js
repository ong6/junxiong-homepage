import AiToolFamily from "../components/AiToolFamily";
import CaseStudyFooter from "../components/CaseStudyFooter";
import DiagramFigure from "../components/DiagramFigure";
import * as SkillsmithArchitecture from "../components/diagrams/SkillsmithArchitecture";
import Layout from "../components/layouts/Articles";
import FactList, { pickFacts } from "../components/FactList";
import { BackLink, MetaLine, P, H2, Code, ARTICLE_TITLE } from "../components/ArticleParts";
import { withNotes } from "../lib/notes";
import styles from "../styles/CaseStudy.module.css";




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

const railFacts = pickFacts(facts, ["steps", "clients", "runtime", "status"]);

const links = withNotes("/skillsmith", [
	{ name: "Source on GitHub", detail: "MIT, part of my public skills repo", href: "https://github.com/ong6/skills/tree/main/skills/skillsmith", external: true },
]);

export default function Skillsmith() {
	return (
		<Layout
			contents
			facts={railFacts}
			links={links}
			title="Skillsmith"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/skills/tree/main/skills/skillsmith",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="Skillsmith makes an agent skill from your repo, tests it against a no-skill baseline, and keeps it only when it wins on fresh heldout tasks.">
			<div className={`ui-container chakra-container ${styles.column}`}>
				<div className={styles.top}>
					<BackLink href="/ai-tooling">AI tooling</BackLink>

					<h1 className={`ui-heading ${ARTICLE_TITLE} ${styles.title}`}>Skillsmith</h1>

					<MetaLine>2026 · open source · claude code + codex</MetaLine>

					<p className={styles.lede}>
						I wanted to know whether my agent instructions actually helped. Skillsmith drafts a skill from the repo I&apos;m working in, then runs the same tasks with and without it and has judges compare the results without knowing which is which. The skill is kept only if it wins on cases it wasn&apos;t tuned on.
					</p>
				</div>

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
			</div>
		</Layout>
	);
}
