import { Badge, Defs, Group, Label, Line, Node } from "./primitives";

export const CLAIM =
	"One skills repo is a git subtree inside every consumer repo. A SessionStart hook merges what upstream moved, a Stop hook commits local edits and pushes them back, so a skill edited where it is used reaches every other repo; the plugin marketplace reads the same repo one way.";

// Claim: one skills repo is a git subtree inside every consumer repo. A
// SessionStart hook merges what upstream moved, a Stop hook commits local
// edits and pushes them back, so a skill edited where it is used reaches every
// other repo; the plugin marketplace reads the same repo one way.
//
// Accent follows the return path: the Stop hook and the push back upstream,
// because that direction is the point. Fetching, symlinks and the plugin path
// stay in currentColor. 8px grid throughout.

const UPSTREAM = [
	["skills/", "8 × SKILL.md"],
	["catalog.yaml → README", "build fails on drift"],
	[".claude-plugin/", "marketplace + plugin"],
];

export function Wide({ accent, id = "sparch-w" }) {
	return (
		<svg
			viewBox="0 0 1120 528"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			{/* ---------- upstream ---------- */}
			<Group x={40} y={64} w={280} h={296} title="UPSTREAM · ong6/skillpack" />
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
				/>
			))}

			{/* ---------- consumer ---------- */}
			<Group x={472} y={64} w={408} h={352} title="CONSUMER REPO · THIS STORE, EVERY OTHER REPO" />
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
			/>

			<Line id={id} x1={580} y1={168} x2={580} y2={208} />
			<Line id={id} x1={772} y1={168} x2={772} y2={208} />
			<Label x={676} y={192} text="symlinks" anchor="middle" size={11} />
			<Node x={496} y={208} w={168} h={56} label=".claude/skills/" sub="Claude Code" size={13} subSize={11} />
			<Node x={688} y={208} w={168} h={56} label=".agents/skills/" sub="Codex" size={13} subSize={11} />

			<Node
				x={496}
				y={320}
				w={168}
				h={56}
				label="SessionStart hook"
				sub="sync.sh --start"
				size={13}
				subSize={11}
			/>
			<Node x={688} y={320} w={168} h={56} label="Stop hook" sub="sync.sh --stop" size={13} subSize={11} />
			<Badge cx={688} cy={320} text="3" accent={accent} />

			{/* ---------- the loop ---------- */}
			<Line id={id} x1={320} y1={140} x2={472} y2={140} />
			<Label x={396} y={132} text="fetch in background" anchor="middle" size={11} />
			<Label x={396} y={158} text="merge at start" anchor="middle" size={11} />

			<Line id={id} x1={472} y1={348} x2={320} y2={348} accent={accent} />
			<Label x={396} y={340} text="commit folder edits" anchor="middle" accent={accent} size={11} />
			<Label x={396} y={366} text="merge upstream, push" anchor="middle" accent={accent} size={11} />

			{/* ---------- plugin path ---------- */}
			<Line id={id} x1={180} y1={360} x2={180} y2={448} />
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
			/>
			<Badge cx={64} cy={448} text="4" />
		</svg>
	);
}

// Mobile reads as one column: upstream, the two arrows of the loop side by
// side, the consumer with its symlinks and hooks, then the plugin consumer.
export function Narrow({ accent }) {
	const id = "sparch-n";
	return (
		<svg
			viewBox="0 0 360 652"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Group x={20} y={24} w={320} h={200} title="UPSTREAM · ong6/skillpack" titleSize={10} />
			<Badge cx={20} cy={24} text="1" r={8} />
			{UPSTREAM.map(([label, sub], i) => (
				<Node
					key={label}
					x={44}
					y={56 + i * 52}
					w={272}
					h={44}
					label={label}
					sub={sub}
					size={12}
					subSize={9}
				/>
			))}

			<Line id={id} x1={110} y1={224} x2={110} y2={296} />
			<Label x={120} y={252} text="fetch, merge" size={10} />
			<Label x={120} y={268} text="at start" size={10} />
			<Line id={id} x1={250} y1={296} x2={250} y2={224} accent={accent} />
			<Label x={260} y={252} text="commit, push" accent={accent} size={10} />
			<Label x={260} y={268} text="at stop" accent={accent} size={10} />

			<Group x={20} y={296} w={320} h={252} title="CONSUMER REPO · EVERY REPO OF MINE" titleSize={10} />
			<Badge cx={20} cy={296} text="2" r={8} />
			<Node x={44} y={328} w={272} h={44} label=".claude/shared-skills/" sub="git subtree, squashed" size={12} subSize={9} />
			<Line id={id} x1={110} y1={372} x2={110} y2={412} />
			<Line id={id} x1={250} y1={372} x2={250} y2={412} />
			<Label x={180} y={396} text="symlinks" anchor="middle" size={10} />
			<Node x={44} y={412} w={132} h={44} label=".claude/skills/" sub="Claude Code" size={11} subSize={9} />
			<Node x={184} y={412} w={132} h={44} label=".agents/skills/" sub="Codex" size={11} subSize={9} />
			<Node x={44} y={480} w={132} h={44} label="SessionStart" sub="sync.sh --start" size={11} subSize={9} />
			<Node x={184} y={480} w={132} h={44} label="Stop hook" sub="sync.sh --stop" size={11} subSize={9} />
			<Badge cx={184} cy={480} text="3" accent={accent} r={8} />

			<Node x={44} y={580} w={272} h={44} label="Plugin consumer" sub="installs upstream read-only" size={12} subSize={9} />
			<Badge cx={44} cy={580} text="4" r={8} />
		</svg>
	);
}
