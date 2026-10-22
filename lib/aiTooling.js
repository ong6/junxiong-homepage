// The AI tooling family, bottom of the agent stack first. `external` entries link
// straight to their repo instead of a page on the site. One source for the
// homepage card, /ai-tooling and the sibling block on each tool's page.
export const AI_TOOLING = [
	{
		name: "Workbase",
		href: "https://github.com/ong6/workbase",
		external: true,
		layer: "Memory",
		when: "Across every session at a job",
		short: "A notes folder per job that the agent keeps up to date.",
		detail:
			"A notes folder for each job, with the company's repos cloned inside it. Its manual tells the agent where decisions, wins, acronyms and fixes go, and where to look before answering. On my own work notes, it took a test of ten real lookups and captures from 4 passing to 10.",
		meta: "Template · setup script · evals · MIT",
	},
	{
		name: "Agent skills",
		href: "/skills",
		layer: "Context",
		when: "Before the agent starts",
		short: "The reusable instructions my agents load.",
		detail:
			"Skills are markdown files that tell a coding agent when to do something and how. I keep the shareable ones in one public repo, and a small command links them into every repo I work in, so a fix made in one place reaches all of them.",
		meta: "24 skills · Claude Code and Codex · MIT",
	},
	{
		name: "Skillsmith",
		href: "/skillsmith",
		layer: "Evaluation",
		when: "While a skill is being written",
		short: "Drafts a skill, then a blind test decides whether it stays.",
		detail:
			"Skillsmith drafts a skill from the repo, then runs the same tasks with and without it. The judges don't know which result is which, and the skill is only kept if it wins on cases it wasn't tuned on.",
		meta: "Python standard library · part of the skills repo",
	},
	{
		name: "Groundplane",
		href: "/groundplane",
		layer: "Runtime checks",
		when: "After the agent calls its tools",
		short: "Checks agent output against recorded tool results.",
		detail:
			"A Python library that checks an agent's structured answer against the tool results it recorded. If the model names the wrong winner or gets a total wrong, it raises an error that shows what the data actually said.",
		meta: "6 checks · 169 tests · MIT",
	},
];
