import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node } from "../parts";

export const CLAIM =
	"v4, late August to mid-September 2026: no model in the loop. Yahoo stays the only price source and Nasdaq verifies it, macro feeds build regime signals, 21 books trade through fill model v4, and a 10-fold walk-forward, a no-model sweep farm and three frozen forward monitors decide what survives. Nothing on the evidence side can promote a book.";

export const meta = {
	number: "Figure 01 · v4",
	eyebrow: "18 August – 17 September 2026",
	title: "No model, stricter evidence",
	caption: "The agent layer is gone; grids, folds and frozen monitors do the judging.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Orders", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Verdict", kind: "response" },
	],
	viewBox: "0 0 1120 520",
};

const SOURCES = [
	[112, "Yahoo", "EOD, only source", false],
	[208, "Macro feeds", "breadth · credit · VIX", false],
	[288, "Nasdaq list", "universe", false],
	[368, "Nasdaq API", "verifies prices", true],
];

const STORE = [
	[112, "prices", "restated cache", "collect"],
	[208, "signals", "macro regime", "collect"],
	[288, "universe", "daily snapshot", "collect"],
	[368, "sim ledger", "fills · cash", "fill"],
];

export function Wide({ id }) {
	const toMonitors = [[760, 222], [800, 222], [800, 140], [840, 140]];
	const toLedger = [[536, 336], [516, 336], [516, 396], [480, 396]];
	return (
		<>
			<Defs id={id} />

			{SOURCES.map(([y, label, sub, dashed]) => (
				<Node key={label} x={40} y={y} w={208} h={56} label={label} sub={sub} icon={dashed ? "tool" : "cloud"} size={13} subSize={10} dashed={dashed} flow="collect" />
			))}
			<Badge cx={40} cy={112} text="1" />
			<Label x={144} y={456} text="Stooq: blocked" anchor="middle" size={10} />
			{SOURCES.slice(0, 3).map(([y, label]) => (
				<Line key={label} id={id} x1={248} y1={y + 28} x2={304} y2={y + 28} flow="collect" />
			))}

			<Group x={288} y={80} w={208} h={368} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={288} cy={80} text="2" />
			{STORE.map(([y, label, sub, flow]) => (
				<Node key={label} x={304} y={y} w={176} h={56} label={label} sub={sub} icon="db" size={12} subSize={10} flow={flow} />
			))}

			<Line id={id} x1={480} y1={140} x2={536} y2={140} flow="collect" />
			<Node x={536} y={112} w={224} h={56} label="screen" sub="Minervini + RS rank" size={13} subSize={10} flow={["collect", "decide"]} />
			<Line id={id} x1={648} y1={168} x2={648} y2={208} flow="decide" />
			<Line id={id} x1={480} y1={236} x2={536} y2={236} flow="collect" />
			<Node x={536} y={208} w={224} h={56} label="paper league" sub="21 frozen books" size={13} subSize={10} flow={["decide", "fill", "prove"]} />
			<Badge cx={536} cy={208} text="3" />
			<Line id={id} x1={648} y1={264} x2={648} y2={304} accent flow="fill" />
			<Node x={536} y={304} w={224} h={64} label="fill model v4" sub="next open · 3 profiles" size={13} subSize={10} flow="fill" />
			<Connector points={toLedger} defs={id} flow="fill" kind="accent" />
			<Node x={536} y={400} w={224} h={56} label="agent layer" sub="retired 18 Aug" size={12} subSize={10} dashed />

			<Connector points={toMonitors} defs={id} flow="prove" />
			<Node x={840} y={112} w={240} h={56} label="forward monitors" sub="sector · XS · E1, frozen" size={13} subSize={10} flow="prove" />
			<Badge cx={840} cy={112} text="4" />
			<Line id={id} x1={760} y1={244} x2={840} y2={244} flow="prove" />
			<Node x={840} y={208} w={240} h={56} label="walk-forward" sub="Sundays · 10 folds" size={13} subSize={10} flow="prove" />
			<Node x={840} y={304} w={240} h={56} label="sweep farm" sub="grids, no model calls" icon="queue" size={13} subSize={10} flow="prove" />
			<Label x={852} y={296} text="reads a copy of the store" size={10} />
			<Line id={id} x1={960} y1={360} x2={960} y2={400} flow="prove" />
			<Label x={972} y={384} text="CONTINUE · KILL" size={10} />
			<Node x={840} y={400} w={240} h={56} label="reports · API · UI" sub="read-only" size={13} subSize={10} flow="prove" />

			<Lane x={40} w={208} y={32} title="Sources" />
			<Lane x={288} w={208} y={32} title="Store" />
			<Lane x={536} w={224} y={32} title="Decide" />
			<Lane x={840} w={240} y={32} title="Prove" />
			<Flow x1={248} y1={140} x2={304} y2={140} kind="change" dur={1.4} flow="collect" />
			<Flow x1={480} y1={140} x2={536} y2={140} kind="change" dur={1.4} delay={-0.5} flow="collect" />
			<Flow x1={648} y1={264} x2={648} y2={304} kind="accent" dur={1.2} flow="fill" />
			<Flow x1={760} y1={244} x2={840} y2={244} kind="request" dur={1.4} flow="prove" />
			<Flow x1={960} y1={360} x2={960} y2={400} kind="response" dur={1.2} flow="prove" />
		</>
	);
}
