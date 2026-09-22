import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node, Packet } from "./parts";

export const CLAIM =
	"A SessionStart hook that reads one file prints the drill banner; the drill picks the due pattern from bank.md, generates a problem from the pattern's discriminator, grades the plan you say out loud against that pattern's required elements, and writes one row with the verdict, the missing element and the next due date; an interview debrief writes its failures into the same bank.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The drill loop",
	title: "One file read, one plan graded, one row written",
	caption:
		"The hook reads rep-log.md and nothing else. The drill picks what bank.md says is due, generates from the pattern's discriminator, grades the spoken plan against that pattern's required elements, and writes one row with verdict, missing element and due date. A debrief of a real interview writes failures into the same bank.",
	legend: [
		{ label: "Reads", kind: "change" },
		{ label: "The plan, out loud", kind: "request" },
		{ label: "Row written", kind: "response" },
	],
	viewBox: "0 0 1120 664",
};

// Claim: see CLAIM. Accent follows the plan: the sentence you say before the
// code, into the grader, out as a row. Everything the plugin reads stays in
// currentColor. Every path is verified against the plugin source: the hook is
// hooks/drill-banner.py, the four steps are sections 2 to 5 of
// skills/drill/SKILL.md, the debrief is skills/interview-debrief/SKILL.md,
// and the files are docs/state-schema.md. 8px grid throughout.

const STEPS = [
	["Pick the due pattern", "due rows in bank.md"],
	["Generate a problem", "from the discriminator"],
	["Grade the plan", "present · vague · missing"],
	["Write the row", "verdict · missing · due"],
];

const FILES = [
	["rep-log.md", "one row per day"],
	["bank.md", "one row per rep"],
	["interviews/", "one file each"],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- lanes ---------- */}
			<Lane x={40} w={232} y={40} title="Session" />
			<Lane x={320} w={480} y={40} title="Plugin" />
			<Lane x={848} w={240} y={40} title="~/jobforge" />

			{/* ---------- session ---------- */}
			<Node x={64} y={112} w={208} h={56} label="SessionStart hook" sub="drill-banner.py" size={13} subSize={11} flow="rep" />
			<Badge cx={64} cy={112} text="1" />
			<Line id={id} x1={168} y1={168} x2={168} y2={384} flow="rep" />
			<Label x={180} y={280} text="banner" size={11} />

			<Node x={64} y={384} w={208} h={56} label="You" sub="plan before code" size={13} subSize={11} flow="rep" />
			<Badge cx={64} cy={384} text="2" accent />
			<Line id={id} x1={272} y1={412} x2={344} y2={412} accent flow="rep" />

			{/* ---------- drill ---------- */}
			<Group x={320} y={184} w={480} h={360} title="/JOBFORGE:DRILL · ONE REP" flow="rep" />
			{STEPS.map(([label, sub], i) => (
				<Node key={label} x={344} y={224 + i * 80} w={272} h={56} label={label} sub={sub} size={13} subSize={10} flow="rep" />
			))}
			<Badge cx={344} cy={224} text="3" />
			<Badge cx={344} cy={384} text="4" accent />
			<Badge cx={344} cy={464} text="5" accent />

			<Node x={640} y={304} w={136} h={56} label="patterns/" sub="required_elements" size={12} subSize={10} flow="rep" />
			<Line id={id} x1={640} y1={332} x2={616} y2={332} flow="rep" />

			{/* ---------- debrief ---------- */}
			<Node x={344} y={584} w={272} h={56} label="/jobforge:interview-debrief" sub="failed rows · due +3d" size={13} subSize={10} flow="debrief" />
			<Badge cx={344} cy={584} text="6" />

			{/* ---------- state ---------- */}
			<Group x={848} y={64} w={240} h={328} title="STATE · MARKDOWN" flow={["rep", "debrief"]} />
			{FILES.map(([label, sub], i) => (
				<Node
					key={label}
					x={872}
					y={112 + i * 88}
					w={192}
					h={56}
					label={label}
					sub={sub}
					size={13}
					subSize={10}
					flow={i === 2 ? "debrief" : i === 1 ? ["rep", "debrief"] : "rep"}
				/>
			))}

			{/* hook reads rep-log.md, the only file it may open */}
			<Line id={id} x1={872} y1={140} x2={272} y2={140} flow="rep" />
			<Label x={560} y={132} text="reads · its only file" anchor="middle" size={11} />

			{/* bank → pick */}
			<Connector points={[[872, 216], [808, 216], [808, 252], [616, 252]]} defs={id} flow="rep" />
			<Label x={760} y={244} text="what is due" anchor="middle" size={10} />

			{/* write row → bank, debrief joins the same path */}
			<Connector points={[[616, 492], [824, 492], [824, 240], [872, 240]]} defs={id} kind="accent" flow="rep" />
			<Connector points={[[616, 612], [824, 612], [824, 492]]} defs={id} arrow={false} flow="debrief" />
			<circle cx={824} cy={492} r={3} fill="currentColor" />
			<Label x={720} y={484} text="row" anchor="middle" accent size={10} />

			{/* interviews → debrief */}
			<Connector points={[[872, 316], [840, 316], [840, 628], [616, 628]]} defs={id} flow="debrief" />

			{/* ---------- packets ---------- */}
			<Flow x1={872} y1={140} x2={272} y2={140} kind="change" dur={3} flow="rep" />
			<Packet points={[[872, 216], [808, 216], [808, 252], [616, 252]]} kind="change" dur={2.2} delay={-0.7} flow="rep" />
			<Flow x1={640} y1={332} x2={616} y2={332} kind="change" dur={1.2} flow="rep" />
			<Flow x1={272} y1={412} x2={344} y2={412} kind="request" dur={1.6} flow="rep" />
			<Packet points={[[616, 492], [824, 492], [824, 240], [872, 240]]} kind="response" dur={2.6} flow="rep" />
			<Packet points={[[872, 316], [840, 316], [840, 628], [616, 628]]} kind="change" dur={2.8} delay={-1.2} flow="debrief" />
			<Packet points={[[616, 612], [824, 612], [824, 492], [824, 240], [872, 240]]} kind="response" dur={3} delay={-1.5} flow="debrief" />
		</>
	);
}
