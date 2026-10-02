import { syncLoopParts } from "uipack/presets";

// Facts from ong6/skills: skills/, catalog.yaml, bin/skills and .claude-plugin/.
export const CLAIM =
	"The ong6/skills repo holds the skills, the catalog, the bin/skills command and a plugin manifest. At session start, skills up fast-forwards a clean checkout and links the skills a machine's profile enables into each repo; skills publish guards, lints and pushes edits back. The plugin marketplace reads the repo one way.";

const loop = {
	figure: {
		number: "Figure 01",
		eyebrow: "Link and publish · skills",
		title: "One checkout per machine, linked into every repo",
		caption:
			"skills up runs at session start: it fast-forwards a clean checkout in the background and links what the machine's profile enables. skills publish guards, lints, commits and pushes an edit. The plugin path reads upstream one way.",
	},
	upstream: {
		label: "ong6/skills",
		items: [
			{ label: "skills/", sub: "24 × SKILL.md", icon: "doc" },
			{ label: "catalog.yaml", sub: "one category per skill", icon: "doc" },
			{ label: "bin/skills", sub: "up · doctor · guard · publish", icon: "terminal" },
			{ label: ".claude-plugin/", sub: "marketplace + plugin", icon: "tool" },
		],
	},
	consumers: [
		{ label: "Notes repo", sub: "project scope", icon: "git", hooks: ["skills up", "publish"] },
		{ label: "Every repo, home machines", sub: "user scope", icon: "git", hooks: ["skills up", "publish"] },
		{ label: "Dev box", sub: "public only", icon: "git", hooks: ["skills up", "publish"] },
		{ label: "Plugin marketplace", sub: "read-only", icon: "cloud", plugin: true },
	],
	pull: "fast-forward + link",
	push: "guard · lint · push",
};

const layout = syncLoopParts(loop, "skills-meta");

export const meta = {
	...loop.figure,
	legend: layout.legend,
	viewBox: layout.viewBox,
};

export function Wide({ id }) {
	return syncLoopParts(loop, id).wide;
}
