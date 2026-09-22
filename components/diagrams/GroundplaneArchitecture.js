import { Badge, Defs, Flow, Group, Label, Lane, Line, Node } from "./parts";

export const CLAIM =
	"Tool results are recorded as typed facts with provenance. A boundary names the facts and checks for structured model output. Configured checks validate declared fields and raise UnsupportedClaim when a claim check fails; free-form prose is outside their scope.";

export const meta = {
	number: "Figure 02",
	eyebrow: "The whole library",
	title: "Facts recorded, declared fields checked",
	caption:
		"Tools write typed facts into a registry. A boundary names the facts and checks that apply to structured fields. Its configured checks return the output or raise on the first failed claim check; prose is not checked.",
	legend: [
		{ label: "Facts", kind: "change" },
		{ label: "Model output", kind: "request" },
		{ label: "Verdict", kind: "response" },
	],
	viewBox: "0 0 1120 656",
};


// Claim: tool results are recorded as typed facts with provenance; a boundary
// declares which facts a block of model output may use; a deterministic
// checker validates declared fields and raises UnsupportedClaim on the first
// failed claim check. Free-form prose stays outside this boundary.
//
// Accent follows the model's output through the boundary and the checker to
// the raise — the loud failure is what the library exists for. Recording facts
// (tools, adapters, registry) stays in currentColor. 8px grid throughout.

const CHECKS = [
	"superlative",
	"ranking_prefix",
	"aggregate_reconciles",
	"entities_recorded",
	"row_integrity",
	"comparison",
];

// Tool → the registry row it feeds, and what travels on the arrow.
const TOOLS = [
	["metrics", "scores"],
	["SQL", "rows"],
	["API", "names"],
];

const FACTS = [
	["Ranking", "record_ranking()"],
	["Table", "record_table()"],
	["Domain", "record_domain()"],
	["Fact", "value + provenance"],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- tools ---------- */}
			<Group x={40} y={64} w={136} h={288} title="TOOLS" />
			{TOOLS.map(([label, carries], i) => (
				<g key={label}>
					<Node x={64} y={112 + i * 80} w={88} h={56} label={label} size={13} flow="record" />
					<Line id={id} x1={176} y1={140 + i * 80} x2={248} y2={140 + i * 80} flow="record" />
					<Label x={212} y={132 + i * 80} text={carries} anchor="middle" size={11} />
				</g>
			))}

			{/* ---------- registry ---------- */}
			<Group x={248} y={64} w={208} h={368} title="FACTREGISTRY · WRITE-ONCE" flow="record" />
			<Badge cx={248} cy={64} text="1" />
			{FACTS.map(([label, sub], i) => (
				<Node
					key={label}
					x={272}
					y={112 + i * 80}
					w={160}
					h={56}
					label={label}
					sub={sub}
					size={13}
					subSize={11} flow="record" />
			))}

			{/* ---------- adapters ---------- */}
			<Group x={40} y={496} w={416} h={128} title="ADAPTERS · OPTIONAL EXTRAS" flow="record" />
			<Node
				x={64}
				y={544}
				w={176}
				h={56}
				label="LangGraph node"
				sub="guarded_node()"
				size={13}
				subSize={11} flow="record" />
			<Node
				x={256}
				y={544}
				w={176}
				h={56}
				label="MCP tool result"
				sub="record_result()"
				size={13}
				subSize={11} flow="record" />
			<Line id={id} x1={352} y1={496} x2={352} y2={432} flow="record" />
			<Label x={364} y={468} text="as facts" size={11} />

			{/* ---------- model + boundary ---------- */}
			<Node
				x={512}
				y={64}
				w={144}
				h={64}
				label="Model"
				sub="structured output"
				size={14}
				subSize={11} flow="check" />
			<Badge cx={512} cy={64} text="3" accent />
			<Line id={id} x1={584} y1={128} x2={584} y2={216} accent flow="check" />
			<Label x={596} y={176} text="submit()" accent size={11} />

			<Node
				x={512}
				y={216}
				w={144}
				h={64}
				label="boundary(...)"
				sub="facts= · checks="
				size={14}
				subSize={11} flow={["record", "check"]} />
			<Badge cx={512} cy={216} text="2" accent />
			<Line id={id} x1={456} y1={248} x2={512} y2={248} flow="record" />
			<Label x={484} y={240} text="facts" anchor="middle" size={11} />

			<Line id={id} x1={656} y1={248} x2={712} y2={248} accent flow="check" />
			<Label x={684} y={240} text="checks" anchor="middle" accent size={11} />

			{/* ---------- checker ---------- */}
			<Group x={712} y={64} w={200} h={488} title="CHECKER · DETERMINISTIC" flow="check" />
			<Badge cx={712} cy={64} text="4" accent />
			{CHECKS.map((name, i) => (
				<Node key={name} x={736} y={112 + i * 72} w={152} h={56} label={name} size={12} flow="check" />
			))}

			{/* ---------- outcomes ---------- */}
			<Line id={id} x1={912} y1={208} x2={960} y2={208} flow="check" />
			<Label x={936} y={200} text="ok" anchor="middle" size={10} />
			<Node
				x={960}
				y={176}
				w={128}
				h={64}
				label="pass"
				sub="output returned"
				size={14}
				subSize={11} flow="check" />

			<Line id={id} x1={912} y1={320} x2={960} y2={320} accent flow="check" />
			<Label x={936} y={312} text="fails" anchor="middle" accent size={10} />
			<Node
				x={960}
				y={288}
				w={128}
				h={64}
				label="raise"
				sub="UnsupportedClaim"
				size={14}
				subSize={10} flow="check" />
			<Badge cx={960} cy={288} text="5" accent />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={416} y={40} title="Record" />
			<Lane x={512} w={144} y={40} title="Generate" />
			<Lane x={712} w={376} y={40} title="Check" />
			{TOOLS.map(([label], i) => (
				<Flow key={label} x1={176} y1={140 + i * 80} x2={248} y2={140 + i * 80} kind="change" dur={1.8} delay={-i * 0.6} flow="record" />
			))}
			<Flow x1={352} y1={496} x2={352} y2={432} kind="change" dur={1.8} delay={-0.9} flow="record" />
			<Flow x1={456} y1={248} x2={512} y2={248} kind="change" dur={1.6} flow="record" />
			<Flow x1={584} y1={128} x2={584} y2={216} kind="request" dur={1.8} flow="check" />
			<Flow x1={656} y1={248} x2={712} y2={248} kind="request" dur={1.6} delay={-0.8} flow="check" />
			<Flow x1={912} y1={208} x2={960} y2={208} kind="response" dur={1.6} flow="check" />
			<Flow x1={912} y1={320} x2={960} y2={320} kind="response" dur={1.6} delay={-0.8} flow="check" />
		</>
	);
}
