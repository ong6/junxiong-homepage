// The figures on /uipack, each a uipack preset fed with one of my own
// projects. Every fact here is read from the repo it describes; when a
// number changes there, change it here in the same session.

export const groundplane = {
	figure: {
		number: "Figure 01",
		eyebrow: "Agent loop · groundplane",
		title: "Checking the answer against tool results",
		caption:
			"The caller asks, the agent calls three tools and records what came back as facts. Configured checks validate declared output fields against those facts before the application returns the result.",
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

export const skills = {
	figure: {
		number: "Figure 02",
		eyebrow: "Sync loop · skills",
		title: "Linked in at session start, published back",
		caption:
			"Each machine keeps a checkout of ong6/skills and links it into its repos. Edits travel back through a guarded publish. The marketplace only ever reads.",
		alt: "The ong6/skills repo holds skills, a catalog and a plugin manifest. Each machine links its checkout into a repo at session start and publishes edits back, while the plugin marketplace reads upstream one way.",
	},
	upstream: {
		label: "Upstream",
		sub: "ong6/skills",
		items: [
			{ label: "skills/", sub: "24 × SKILL.md", icon: "doc" },
			{ label: "catalog.yaml", sub: "build fails on drift", icon: "doc" },
			{ label: ".claude-plugin/", sub: "marketplace + plugin", icon: "tool" },
		],
	},
	consumers: [
		{ label: "private-notes", sub: "symlinks", icon: "git", hooks: ["skills up", "publish"] },
		{ label: "Plugin marketplace", sub: "read-only", icon: "cloud", plugin: true },
	],
	pull: "link when clean",
	push: "publish after guard",
};

export const aiToolchain = {
	figure: {
		number: "Figure 01",
		eyebrow: "AI toolchain · three open-source projects",
		title: "Write the instruction, prove it helps, check the facts",
		caption:
			"My skills repo supplies the instruction. Skillsmith compares it with the same agent and task without the skill. Groundplane then checks declared output fields against recorded tool facts at runtime.",
		alt: "Three stages flow left to right: my skills repo supplies an agent instruction, Skillsmith runs a blind heldout comparison against a no-skill baseline, and Groundplane checks declared fields against recorded tool facts at runtime.",
	},
	stages: [
		{ label: "Agent skills", sub: "load SKILL.md", icon: "doc" },
		{ label: "Skillsmith", sub: "blind tests", icon: "chart" },
		{ label: "Keep or retire", sub: "machine gate", icon: "git" },
		{ label: "Groundplane", sub: "fact checks", icon: "lock" },
		{ label: "Agent output", sub: "pass or raise", icon: "agent" },
	],
	laneTitle: "One job at each stage",
};

export const fieldEngineering = {
	figure: {
		number: "Figure 03",
		eyebrow: "Service map · field-engineering skills",
		title: "Three skills, plain files",
		caption:
			"Two skills write and audit the customer deck; one keeps the pilot record. An agent drafts and proposes, but only a person records a review or a proceed, hold or stop call.",
		alt: "A field engineer, an agent and a customer on the left use the field-engineering skills in the middle: create-fde-deck, check_deck.py, review-fde-deck, track-pilot-evidence, pilot.py propose and pilot.py record. On the right sit the Markdown deck, the pilot record with SHA-256 attachments and the customer handover.",
	},
	clients: [
		{ label: "Field engineer", sub: "records the call", icon: "user" },
		{ label: "Agent", sub: "drafts · proposes", icon: "agent" },
		{ label: "Customer", sub: "gets handover", icon: "user" },
	],
	platform: {
		title: "field-engineering skills",
		cells: [
			{ label: "create-fde-deck", sub: "Markdown deck" },
			{ label: "check_deck.py", sub: "density check" },
			{ label: "review-fde-deck", sub: "ranked fixes" },
			{ label: "track-pilot-evidence", sub: "criteria · evidence" },
			{ label: "pilot.py propose", sub: "agent proposes" },
			{ label: "pilot.py record", sub: "person decides" },
		],
	},
	resources: [
		{ label: "Markdown deck", sub: "evidence-labelled", icon: "doc" },
		{ label: "pilot.json", sub: "SHA-256 attachments", icon: "blob" },
		{ label: "Handover", sub: "customer view", icon: "doc" },
	],
	laneTitles: ["Who", "Skills", "What it keeps"],
};

// Manual verification before pushing to the site's automatic deployment.
export const deploy = (e2eCount) => ({
	figure: {
		number: "Figure 04",
		eyebrow: "Pipeline · this site",
		title: "Check locally, then push",
		caption:
			"I review the copy, run lint and a production build, then check motion and geometry in Playwright. These are manual checks before pushing; Vercel deploys pushes to main automatically.",
		alt: `The manual release workflow: edit, review copy, run lint and build, then run Playwright before pushing to Vercel and the live site.`,
	},
	stages: [
		{ label: "Edit", sub: "pages · svg", icon: "doc" },
		{ label: "unslop", sub: "AI tells out", icon: "tool" },
		{ label: "Lint + build", sub: "run locally", icon: "terminal" },
		{ label: "Vercel", sub: "auto deploy", icon: "cloud" },
		{ label: "Live", sub: "junxiong.dev", icon: "browser" },
	],
	queue: { label: "Playwright", sub: `${e2eCount} cases`, icon: "browser", after: 2, depth: 3 },
	laneTitle: "Manual checks before push",
});

export const connectorRule = {
	figure: {
		number: "Figure 05",
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
