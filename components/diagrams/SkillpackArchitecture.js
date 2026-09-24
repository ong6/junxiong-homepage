import { Badge, Defs, Flow, Group, Label, Lane, Line, Node } from "./parts";

export const CLAIM =
	"Each consumer carries the skills as a git subtree. SessionStart merges fetched changes and Stop commits only the skills folder, then merges and pushes when the checkout is clean. Unrelated work or an existing Git operation defers sync; the plugin marketplace reads upstream one way.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The sync loop",
	title: "Skills are edited in each repo and synced back to one source",
	caption:
		"SessionStart merges fetched changes; the first fetch is synchronous. Stop commits only the skills folder. Unrelated work defers merging and pushing, and an existing Git operation defers the whole sync. The plugin path reads upstream one way.",
	legend: [
		{ label: "Fetch + merge", kind: "request" },
		{ label: "Commit + push back", kind: "accent" },
		{ label: "Plugin install", kind: "change" },
	],
	viewBox: "0 0 1120 528",
};

// Claim: fetched changes merge at SessionStart and folder edits push at Stop
// when the checkout is ready. Unrelated work and existing operations defer sync.
//
// Accent follows the return path: the Stop hook and the push back upstream,
// because that direction is the point. Fetching, symlinks and the plugin path
// stay in currentColor. 8px grid throughout.

const UPSTREAM = [
	["skills/", "8 × SKILL.md"],
	["catalog.yaml → README", "build fails on drift"],
	[".claude-plugin/", "marketplace + plugin"],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- upstream ---------- */}
			<Group
				x={40}
				y={64}
				w={280}
				h={296}
				title="UPSTREAM · ong6/skillpack"
				flow={["pull", "push", "plugin"]}
			/>
			<Badge cx={40} cy={64} text="1" />
			{UPSTREAM.map(([label, sub], i) => (
				<Node
					key={label}
					x={64}
					y={112 + i * 80}
					w={232}
					h={56}
					label={label}
					sub={sub}
					size={13}
					subSize={11}
					flow={["pull", "push"]}
				/>
			))}

			{/* ---------- consumer ---------- */}
			<Group
				x={472}
				y={64}
				w={408}
				h={352}
				title="CONSUMER REPO · THIS STORE, EVERY OTHER REPO"
				flow={["pull", "push"]}
			/>
			<Badge cx={472} cy={64} text="2" />
			<Node
				x={496}
				y={112}
				w={360}
				h={56}
				label=".claude/shared-skills/"
				sub="git subtree, squashed"
				size={13}
				subSize={11}
				flow={["pull", "push"]}
			/>

			<Line id={id} x1={580} y1={168} x2={580} y2={208} flow="pull" />
			<Line id={id} x1={772} y1={168} x2={772} y2={208} flow="pull" />
			<Label x={676} y={192} text="symlinks" anchor="middle" size={11} />
			<Node
				x={496}
				y={208}
				w={168}
				h={56}
				label=".claude/skills/"
				sub="Claude Code"
				size={13}
				subSize={11}
				flow="pull"
			/>
			<Node
				x={688}
				y={208}
				w={168}
				h={56}
				label=".agents/skills/"
				sub="Codex"
				size={13}
				subSize={11}
				flow="pull"
			/>

			<Node
				x={496}
				y={320}
				w={168}
				h={56}
				label="SessionStart hook"
				sub="sync.sh --start"
				size={13}
				subSize={11}
				flow="pull"
			/>
			<Node
				x={688}
				y={320}
				w={168}
				h={56}
				label="Stop hook"
				sub="sync.sh --stop"
				size={13}
				subSize={11}
				flow="push"
			/>
			<Badge cx={688} cy={320} text="3" accent />

			{/* ---------- the loop ---------- */}
			<Line id={id} x1={320} y1={140} x2={472} y2={140} flow="pull" />
			<Label x={396} y={132} text="fetched changes" anchor="middle" size={11} />
			<Label x={396} y={158} text="merge when clean" anchor="middle" size={11} />

			<Line id={id} x1={472} y1={348} x2={320} y2={348} accent flow="push" />
			<Label x={396} y={340} text="commit folder edits" anchor="middle" accent size={11} />
			<Label x={396} y={366} text="push when clean" anchor="middle" accent size={11} />

			{/* ---------- plugin path ---------- */}
			<Line id={id} x1={180} y1={360} x2={180} y2={448} flow="plugin" />
			<Label x={192} y={408} text="/plugin install" size={11} />
			<Node
				x={64}
				y={448}
				w={232}
				h={56}
				label="Plugin consumer"
				sub="read-only, no edits back"
				size={13}
				subSize={11}
				flow="plugin"
			/>
			<Badge cx={64} cy={448} text="4" />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={280} y={40} title="Upstream" />
			<Lane x={472} w={408} y={40} title="Consumer" />
			<Flow x1={320} y1={140} x2={472} y2={140} kind="request" dur={2.2} flow="pull" />
			<Flow x1={320} y1={140} x2={472} y2={140} kind="request" dur={2.2} delay={-1.1} flow="pull" />
			<Flow x1={472} y1={348} x2={320} y2={348} kind="accent" dur={2.2} delay={-0.5} flow="push" />
			<Flow x1={180} y1={360} x2={180} y2={448} kind="change" dur={2} flow="plugin" />
		</>
	);
}
