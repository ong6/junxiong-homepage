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
		{ label: "Gate", sub: "skill or rule?", icon: "lock" },
		{ label: "Ground", sub: "inventory.py", icon: "db" },
		{ label: "Draft", sub: "lint_skill.py", icon: "doc" },
		{ label: "Prove", sub: "eval_gate.py", icon: "chart" },
		{ label: "Keep or retire", sub: "≤ 3 revisions", icon: "git" },
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
