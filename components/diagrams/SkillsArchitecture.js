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
			{ label: "skills/", sub: "24 × SKILL.md", icon: "doc", hint: "One folder per skill. Its SKILL.md tells an agent when to act and how." },
			{ label: "catalog.yaml", sub: "one category per skill", icon: "doc", hint: "Puts each skill in one category. The README is built from it, and the build fails if it drifts from the folders." },
			{ label: "bin/skills", sub: "up · doctor · guard · publish", icon: "terminal", hint: "One stdlib Python file that links skills in, checks the setup, and guards and publishes edits." },
			{ label: ".claude-plugin/", sub: "marketplace + plugin", icon: "tool", hint: "Lets Claude Code install the skills as a plugin, without a checkout." },
		],
	},
	consumers: [
		{ label: "Notes repo", sub: "project scope", icon: "git", hooks: ["skills up", "publish"], hint: "Project scope: the skills are linked into this repo only." },
		{ label: "Every repo, home machines", sub: "user scope", icon: "git", hooks: ["skills up", "publish"], hint: "User scope: links go into the home folders, so every repo on the machine sees the skills." },
		{ label: "Dev box", sub: "public only", icon: "git", hooks: ["skills up", "publish"], hint: "Its profile links the public skills only." },
		{ label: "Plugin marketplace", sub: "read-only", icon: "cloud", plugin: true, hint: "Installs from GitHub one way. Edits never flow back through it." },
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
