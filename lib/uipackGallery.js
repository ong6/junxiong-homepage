// The figures on /uipack, each a uipack preset fed with one of my own
// projects. Every fact here is read from the repo it describes; when a
// number changes there, change it here in the same session.

export const groundplane = {
	figure: {
		number: "Figure 01",
		eyebrow: "Agent loop · groundplane",
		title: "Tools answer, the boundary decides",
		caption:
			"The caller asks, the agent calls three tools and records what came back as facts. Nothing goes back to the caller until the boundary has checked every field against those facts.",
		alt: "A caller sends a request to an agent, the agent calls metrics, SQL and API tools and records their results as facts, then its output passes a groundplane boundary before it is returned.",
	},
	user: { label: "Caller", sub: "your app", icon: "user" },
	agent: { label: "Agent", sub: "plan · call · fill fields", icon: "agent" },
	tools: [
		{ label: "metrics", sub: "record_ranking()", icon: "chart" },
		{ label: "SQL", sub: "record_table()", icon: "db" },
		{ label: "API", sub: "record_domain()", icon: "cloud" },
	],
	boundary: { label: "groundplane boundary", sub: "facts= · checks= · 6 checks", icon: "lock" },
	output: { label: "Output", sub: "pass, or raise UnsupportedClaim", icon: "doc" },
	laneTitles: ["Caller", "Agent", "Tools"],
};

export const skillpack = {
	figure: {
		number: "Figure 02",
		eyebrow: "Sync loop · skillpack",
		title: "The skills repo travels as a subtree",
		caption:
			"My store carries ong6/skillpack as a git subtree. Opening a session merges whatever moved upstream; closing one pushes my edits back. The marketplace only ever reads.",
		alt: "The ong6/skillpack repo on the left holds skills, a catalog and a plugin manifest; the personal data store on the right pulls at session start and pushes at session stop, and the plugin marketplace reads upstream one way.",
	},
	upstream: {
		label: "Upstream",
		sub: "ong6/skillpack",
		items: [
			{ label: "skills/", sub: "8 × SKILL.md", icon: "doc" },
			{ label: "catalog.yaml", sub: "build fails on drift", icon: "doc" },
			{ label: ".claude-plugin/", sub: "marketplace + plugin", icon: "tool" },
		],
	},
	consumers: [
		{ label: "personal-data-store", sub: "git subtree", icon: "git", hooks: ["SessionStart", "Stop"] },
		{ label: "Plugin marketplace", sub: "read-only", icon: "cloud", plugin: true },
	],
	pull: "merge at start",
	push: "push at stop",
};

export const skillforge = {
	figure: {
		number: "Figure 03",
		eyebrow: "Skill lifecycle · skillforge",
		title: "A skill earns its place, then flows back",
		caption:
			"A skill is written in skillpack, scored in skillforge against a run with no skill at all, frozen as a revision, installed where I work, and patched from feedback the same session.",
		alt: "An author writes a skill in skillpack, skillforge evaluates it against a no-skill baseline, an immutable revision is cut and installed into the store and the plugin marketplace, and feedback loops back to the author.",
	},
	author: { label: "skillpack", sub: "one folder each", icon: "doc" },
	evaluate: { label: "skillforge", sub: "frozen cases · scored", icon: "chart", baseline: "no-skill run" },
	version: { label: "Revision", sub: "immutable", icon: "git" },
	consumers: [
		{ label: "personal-data-store", sub: "subtree", icon: "git" },
		{ label: "Plugin install", sub: "read-only", icon: "cloud" },
	],
	feedback: { label: "feedback-loop", sub: "logged, skill patched", icon: "warning" },
};

export const fieldpack = {
	figure: {
		number: "Figure 04",
		eyebrow: "Service map · fieldpack",
		title: "Three local-first tools, one install",
		caption:
			"deckforge, skillforge and proofpack are pinned as submodules under one umbrella with a shared setup, doctor and cross-product verification. Everything runs on the laptop.",
		alt: "A laptop, an agent and a customer on the left use the fieldpack platform in the middle, whose cells are deckforge, skillforge, proofpack, the integration script, verification and the submodule pins; on the right sit the deck library, a headless Chromium and the HTML handover.",
	},
	clients: [
		{ label: "Laptop", sub: "local-first", icon: "terminal" },
		{ label: "Agent", sub: "CLI · MCP", icon: "agent" },
		{ label: "Customer", sub: "gets the handover", icon: "user" },
	],
	platform: {
		title: "fieldpack",
		cells: [
			{ label: "deckforge", sub: "presentation studio" },
			{ label: "skillforge", sub: "skill evaluation" },
			{ label: "proofpack", sub: "pilot evidence" },
			{ label: "integration.mjs", sub: "setup · doctor" },
			{ label: "verification", sub: "pipeline · browser" },
			{ label: "submodules", sub: "three repos, pinned" },
		],
	},
	resources: [
		{ label: "Deck library", sub: "versioned, local", icon: "blob" },
		{ label: "Chromium", sub: "headless · preflight", icon: "browser" },
		{ label: "HTML handover", sub: "customer-safe", icon: "doc" },
	],
	laneTitles: ["Who", "fieldpack", "What it keeps"],
};

// The site's own path to production, from the design brief.
export const deploy = (e2eCount) => ({
	figure: {
		number: "Figure 05",
		eyebrow: "Pipeline · this site",
		title: "Every change waits on the browser suite",
		caption:
			"Copy goes through unslop, the build runs ESLint and Next, and nothing reaches Vercel until the Playwright suite has moved a packet, paused it and checked the geometry.",
		alt: `Five stages in a line: edit, unslop, build, then a queue of Playwright cases, then Vercel and the live site.`,
	},
	stages: [
		{ label: "Edit", sub: "pages · svg", icon: "doc" },
		{ label: "unslop", sub: "AI tells out", icon: "tool" },
		{ label: "Build", sub: "eslint · next", icon: "terminal" },
		{ label: "Vercel", sub: "auto deploy", icon: "cloud" },
		{ label: "Live", sub: "junxiong.dev", icon: "browser" },
	],
	queue: { label: "Playwright", sub: `${e2eCount} cases`, icon: "browser", after: 2, depth: 3 },
	laneTitle: "Push to main",
});

export const connectorRule = {
	figure: {
		number: "Figure 06",
		eyebrow: "Before and after · the connector rule",
		title: "One head per line, the reply rides back",
		caption:
			"The first cut drew a head at both ends of every stub and let packets sit on them. Now a connector carries one arrowhead in the request direction, the response is a reversed packet on the same points, and nothing touches a border.",
		alt: "Two stacked panels. Before: client, a stub with two arrowheads, a packet on a head, service. After: client, one connector with one head, a reversed packet for the response, service, with the changed stages highlighted.",
	},
	before: {
		title: "Before",
		stages: [
			{ label: "Client", sub: "sends", icon: "client" },
			{ label: "Stub", sub: "two heads", icon: "warning" },
			{ label: "Packet", sub: "on the head", icon: "warning" },
			{ label: "Service", sub: "replies", icon: "service" },
		],
	},
	after: {
		title: "After",
		stages: [
			{ label: "Client", sub: "sends", icon: "client" },
			{ label: "Connector", sub: "one head", icon: "tool" },
			{ label: "Packet", sub: "rides back", icon: "tool" },
			{ label: "Service", sub: "replies", icon: "service" },
		],
		changed: [1, 2],
	},
};
