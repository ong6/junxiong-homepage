import { pipelineParts } from "uipack/presets";

export const CLAIM =
	"Skillsmith gates the request, grounds it in the repo's existing skills, drafts to a lint, proves the draft against a no-skill baseline on fresh heldouts, and keeps or retires it.";

const lifecycle = {
	figure: {
		number: "Figure 01",
		eyebrow: "Skill lifecycle · skillsmith",
		title: "Gate, ground, draft, prove, then keep or retire",
		caption:
			"The gate can stop the run before anything is written, and the last step can retire the skill the run just drafted.",
		alt: "Five stages flow left to right: gate the request, ground it in the repo's existing skills with inventory.py, draft and lint the skill with lint_skill.py, prove it against a no-skill baseline with eval_gate.py, then keep or retire it with lifecycle_gate.py.",
	},
	stages: [
		{ label: "Gate", sub: "skill or rule?", icon: "lock", hint: "Asks whether this needs a skill at all, or an AGENTS.md rule, a hook or a memory instead." },
		{ label: "Ground", sub: "inventory.py", icon: "db", hint: "Lists the skills and conventions the repo already has, so the new one fills a gap." },
		{ label: "Draft", sub: "lint_skill.py", icon: "doc", hint: "Starts from the trigger description, stays under 500 lines, and must pass the lint first." },
		{ label: "Prove", sub: "eval_gate.py", icon: "chart", hint: "Runs the task with and without the skill, and blind judges compare the anonymous results." },
		{ label: "Keep or retire", sub: "≤ 3 revisions", icon: "git", hint: "Kept only if it beats the no-skill baseline on heldout cases it was not tuned on." },
	],
	laneTitle: "Make, then prove",
};

const layout = pipelineParts(lifecycle, "skillsmith-meta");

export const meta = {
	...lifecycle.figure,
	legend: layout.legend,
	viewBox: layout.viewBox,
};

export function Wide({ id }) {
	return pipelineParts(lifecycle, id).wide;
}
