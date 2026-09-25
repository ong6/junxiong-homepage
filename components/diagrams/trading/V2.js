import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node } from "../parts";

export const CLAIM =
	"v2, late July 2026: Yahoo now supplies splits and dividends as well as bars, a fatal reconcile stage checks the price scale before the league trades, 16 books plus a discretionary book fill at the next open, a forward experiment logs Mondays, and a backtest farm replays the books' own code over past years.";

export const meta = {
	number: "Figure 01 · v2",
	eyebrow: "28 July – 3 August 2026",
	title: "Corporate actions and a backtest farm",
	caption: "The league only trades once the split and dividend reconcile passes.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Orders", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Evidence", kind: "response" },
	],
	viewBox: "0 0 1120 560",
};

const SOURCES = [
	[112, "Yahoo bars", "daily prices"],
	[208, "Yahoo actions", "splits · dividends"],
	[304, "Nasdaq Trader", "symbol list"],
];

const STORE = [
	[112, "prices", "restated cache", "collect"],
	[208, "corporate actions", "watermarked", "collect"],
	[304, "universe", "daily snapshot", "collect"],
	[400, "sim ledger", "fills · dividends", "fill"],
];

export function Wide({ id }) {
	const toFarm = [[760, 344], [800, 344], [800, 428], [840, 428]];
	return (
		<>
			<Defs id={id} />

			{SOURCES.map(([y, label, sub]) => (
				<Node key={label} x={40} y={y} w={208} h={56} label={label} sub={sub} icon="cloud" size={13} subSize={10} flow="collect" />
			))}
			<Badge cx={40} cy={112} text="1" />
			<Label x={144} y={392} text="Stooq: still blocked" anchor="middle" size={10} />
			{SOURCES.map(([y, label]) => (
				<Line key={label} id={id} x1={248} y1={y + 28} x2={304} y2={y + 28} flow="collect" />
			))}

			<Group x={288} y={80} w={208} h={416} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={288} cy={80} text="2" />
			{STORE.map(([y, label, sub, flow]) => (
				<Node key={label} x={304} y={y} w={176} h={y === 400 ? 64 : 56} label={label} sub={sub} icon="db" size={12} subSize={10} flow={flow} />
			))}

			<Line id={id} x1={480} y1={140} x2={536} y2={140} flow="collect" />
			<Node x={536} y={112} w={224} h={56} label="screen" sub="Minervini + RS rank" size={13} subSize={10} flow={["collect", "decide"]} />
			<Line id={id} x1={648} y1={168} x2={648} y2={208} flow="decide" />
			<Line id={id} x1={480} y1={236} x2={536} y2={236} flow="collect" />
			<Node x={536} y={208} w={224} h={56} label="reconcile" sub="fatal if scale breaks" size={13} subSize={10} flow={["collect", "decide"]} />
			<Badge cx={536} cy={208} text="3" />
			<Line id={id} x1={648} y1={264} x2={648} y2={304} flow="decide" />
			<Label x={660} y={288} text="scale sound" size={10} />
			<Node x={536} y={304} w={224} h={56} label="paper league" sub="16 books + discretionary" size={13} subSize={10} flow={["decide", "fill", "prove"]} />
			<Line id={id} x1={648} y1={360} x2={648} y2={400} accent flow="fill" />
			<Label x={660} y={384} text="open t+1" accent size={10} />
			<Node x={536} y={400} w={224} h={64} label="fill" sub="dividends first" size={13} subSize={10} flow="fill" />
			<Badge cx={536} cy={400} text="4" accent />
			<Line id={id} x1={536} y1={432} x2={480} y2={432} accent flow="fill" />

			<Line id={id} x1={760} y1={332} x2={840} y2={332} flow="prove" />
			<Node x={840} y={304} w={240} h={56} label="E1 experiment" sub="40 Mondays, frozen" size={13} subSize={10} flow="prove" />
			<Badge cx={840} cy={304} text="5" />
			<Connector points={toFarm} defs={id} flow="prove" />
			<Node x={840} y={400} w={240} h={56} label="backtest farm" sub="same code, old bars" icon="queue" size={13} subSize={10} flow="prove" />
			<Line id={id} x1={960} y1={456} x2={960} y2={496} flow="prove" />
			<Node x={840} y={496} w={240} h={48} label="reports" sub="committed to git" icon="git" size={13} subSize={10} flow="prove" />

			<Lane x={40} w={208} y={32} title="Sources" />
			<Lane x={288} w={208} y={32} title="Store" />
			<Lane x={536} w={224} y={32} title="Decide" />
			<Lane x={840} w={240} y={32} title="Prove" />
			<Flow x1={248} y1={236} x2={304} y2={236} kind="change" dur={1.4} flow="collect" />
			<Flow x1={480} y1={236} x2={536} y2={236} kind="change" dur={1.4} delay={-0.5} flow="collect" />
			<Flow x1={648} y1={264} x2={648} y2={304} kind="request" dur={1.2} flow="decide" />
			<Flow x1={648} y1={360} x2={648} y2={400} kind="accent" dur={1.2} flow="fill" />
			<Flow x1={960} y1={456} x2={960} y2={496} kind="response" dur={1.2} flow="prove" />
		</>
	);
}
