import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node, Packet, route } from "./parts";

export const CLAIM =
	"Real daily bars land in DuckDB under one writer. A nightly screen ranks the liquid universe and 21 pre-registered paper books turn it into orders at the close. Every order fills at the next open through one look-ahead guard, with a spread tier, five basis points and a one-percent-of-volume cap. Frozen forward monitors and a Sunday walk-forward read the equity paths and can kill a book, never promote one.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The nightly loop",
	title: "Signal at the close, fill at the next open, judge later",
	caption:
		"Bars in, screen, orders, next-open fill, ledger. The monitors on the right read the equity paths and apply a rule frozen before the first signal. Nothing on this canvas can promote a strategy.",
	legend: [
		{ label: "Bars", kind: "change" },
		{ label: "Ranked names", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Verdict", kind: "response" },
	],
	viewBox: "0 0 1120 640",
	narrowViewBox: "0 0 360 984",
};

// Claim: orders signalled at close t fill only at open t+1, through one guard,
// and the evidence loop can kill but never promote. Accent follows that path:
// orders → fill → ledger. Collection and the monitors stay in currentColor.
// 8px grid throughout.

const STORE = [
	["prices", "cache · watermarked"],
	["universe · screen · fundamentals", "point-in-time"],
	["sim ledger", "orders · fills · cash"],
];

export function Wide({ id }) {
	const toWalkForward = route([760, 356], [824, 260], "h");
	return (
		<>
			<Defs id={id} />

			{/* ---------- collect ---------- */}
			<Node
				x={64}
				y={112}
				w={208}
				h={56}
				label="Yahoo · Nasdaq"
				sub="bars · splits · dividends"
				icon="cloud"
				size={13}
				subSize={11}
				flow="collect"
			/>
			<Line id={id} x1={168} y1={168} x2={168} y2={208} flow="collect" />
			<Label x={180} y={192} text="bounded batches" size={11} />
			<Node
				x={64}
				y={208}
				w={208}
				h={56}
				label="collect"
				sub="frees the writer per batch"
				size={13}
				subSize={11}
				flow="collect"
			/>
			<Line id={id} x1={168} y1={264} x2={168} y2={296} flow="collect" />
			<Label x={180} y={284} text="commit" size={11} />

			<Group x={40} y={296} w={256} h={304} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={40} cy={296} text="1" />
			{STORE.map(([label, sub], i) => (
				<Node
					key={label}
					x={64}
					y={336 + i * 96}
					w={208}
					h={56}
					label={label}
					sub={sub}
					icon="db"
					size={12}
					subSize={10}
					flow={i === 2 ? "fill" : "collect"}
				/>
			))}

			{/* ---------- decide ---------- */}
			<Line id={id} x1={296} y1={364} x2={360} y2={364} flow="collect" />
			<Label x={328} y={356} text="bars" anchor="middle" size={11} />
			<Node
				x={360}
				y={336}
				w={160}
				h={56}
				label="screen"
				sub="4,097 liquid names"
				size={13}
				subSize={11}
				flow="collect"
			/>
			<Badge cx={360} cy={336} text="2" />
			<Line id={id} x1={520} y1={364} x2={584} y2={364} flow="decide" />
			<Label x={552} y={356} text="ranked" anchor="middle" size={11} />
			<Node
				x={584}
				y={336}
				w={176}
				h={56}
				label="21 paper books"
				sub="frozen rules"
				size={13}
				subSize={11}
				flow={["decide", "fill", "prove"]}
			/>
			<Badge cx={584} cy={336} text="3" />

			<Line id={id} x1={672} y1={392} x2={672} y2={432} flow="fill" />
			<Label x={684} y={416} text="signal at close t" size={11} />
			<Node
				x={584}
				y={432}
				w={176}
				h={56}
				label="orders"
				sub="never same-bar"
				size={13}
				subSize={11}
				flow="fill"
			/>

			<Line id={id} x1={672} y1={488} x2={672} y2={528} accent flow="fill" />
			<Label x={684} y={512} text="open t+1 only" accent size={11} />
			<Node
				x={584}
				y={528}
				w={176}
				h={64}
				label="fill"
				sub="spread + 5 bp · ≤ 1% ADV"
				size={13}
				subSize={10}
				flow="fill"
			/>
			<Badge cx={584} cy={528} text="4" accent />

			<Line id={id} x1={584} y1={560} x2={296} y2={560} accent flow="fill" />
			<Label x={440} y={552} text="fills · dividends credited" anchor="middle" accent size={11} />

			{/* ---------- prove ---------- */}
			<Connector points={toWalkForward} defs={id} flow="prove" />
			<Label x={804} y={312} text="same rule, old bars" size={10} />
			<Node
				x={824}
				y={232}
				w={256}
				h={56}
				label="walk-forward · Sundays"
				sub="10 folds · train 24 mo · test 12 mo"
				size={13}
				subSize={10}
				flow="prove"
			/>

			<Line id={id} x1={760} y1={372} x2={824} y2={372} flow="prove" />
			<Label x={792} y={388} text="equity" anchor="middle" size={11} />
			<Node
				x={824}
				y={336}
				w={256}
				h={64}
				label="forward monitors"
				sub="kill rule frozen before signal 1"
				size={13}
				subSize={10}
				flow="prove"
			/>
			<Badge cx={824} cy={336} text="5" />

			<Line id={id} x1={952} y1={400} x2={952} y2={464} flow="prove" />
			<Label x={964} y={436} text="CONTINUE · KILL" size={11} />
			<Node
				x={824}
				y={464}
				w={256}
				h={56}
				label="reports · API · UI"
				sub="league.md · GET /meta"
				size={13}
				subSize={10}
				flow="prove"
			/>
			<Label x={952} y={556} text="no path promotes a book" anchor="middle" size={11} />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={256} y={40} title="Collect" />
			<Lane x={360} w={400} y={40} title="Decide" />
			<Lane x={824} w={256} y={40} title="Prove" />
			<Flow x1={168} y1={168} x2={168} y2={208} kind="change" dur={1.6} flow="collect" />
			<Flow x1={168} y1={264} x2={168} y2={296} kind="change" dur={1.4} delay={-0.7} flow="collect" />
			<Flow x1={296} y1={364} x2={360} y2={364} kind="change" dur={1.6} flow="collect" />
			<Flow x1={520} y1={364} x2={584} y2={364} kind="request" dur={1.4} flow="decide" />
			<Flow x1={672} y1={392} x2={672} y2={432} kind="accent" dur={1.6} flow="fill" />
			<Flow x1={672} y1={488} x2={672} y2={528} kind="accent" dur={1.6} delay={-0.8} flow="fill" />
			<Flow x1={584} y1={560} x2={296} y2={560} kind="accent" dur={2.4} delay={-0.4} flow="fill" />
			<Packet points={toWalkForward} kind="request" dur={2} flow="prove" />
			<Flow x1={760} y1={372} x2={824} y2={372} kind="request" dur={1.6} delay={-0.5} flow="prove" />
			<Flow x1={952} y1={400} x2={952} y2={464} kind="response" dur={1.6} flow="prove" />
		</>
	);
}

// Mobile reads as one column in the order a day happens: sources, the store,
// screen, books, orders, the fill, the ledger, then the two judges and the
// reports.
export function Narrow({ id }) {
	const step = (label, sub, y, extra = {}) => (
		<Node x={32} y={y} w={296} h={44} label={label} sub={sub} size={12} subSize={9} {...extra} />
	);
	return (
		<>
			<Defs id={id} />

			{step("Yahoo · Nasdaq", "bars · splits · dividends", 56, { flow: "collect" })}
			<Line id={id} x1={180} y1={100} x2={180} y2={132} flow="collect" />
			{step("collect", "bounded batches", 132, { flow: "collect" })}
			<Line id={id} x1={180} y1={176} x2={180} y2={208} flow="collect" />

			<Group x={20} y={208} w={320} h={188} title="DUCKDB · ONE WRITER" titleSize={10} />
			<Badge cx={20} cy={208} text="1" r={8} />
			{step("prices", "cache · watermarked", 240)}
			{step("universe · screen · fundamentals", "point-in-time", 292)}
			{step("sim ledger", "orders · fills · cash", 344, { flow: "fill" })}

			<Line id={id} x1={180} y1={396} x2={180} y2={428} flow="collect" />
			<Label x={190} y={416} text="bars" size={10} />
			{step("screen", "4,097 liquid names", 428, { flow: "collect" })}
			<Badge cx={32} cy={428} text="2" r={8} />
			<Line id={id} x1={180} y1={472} x2={180} y2={504} flow="decide" />
			<Label x={190} y={492} text="ranked" size={10} />
			{step("21 paper books", "frozen rules", 504, { flow: ["decide", "fill", "prove"] })}
			<Badge cx={32} cy={504} text="3" r={8} />
			<Line id={id} x1={180} y1={548} x2={180} y2={580} flow="fill" />
			<Label x={190} y={568} text="signal at close t" size={10} />
			{step("orders", "never same-bar", 580, { flow: "fill" })}
			<Line id={id} x1={180} y1={624} x2={180} y2={656} accent flow="fill" />
			<Label x={190} y={644} text="open t+1 only" accent size={10} />
			<Node
				x={32}
				y={656}
				w={296}
				h={52}
				label="fill"
				sub="spread + 5 bp · ≤ 1% ADV"
				size={12}
				subSize={9}
				flow="fill"
			/>
			<Badge cx={32} cy={656} text="4" accent r={8} />
			<Line id={id} x1={180} y1={708} x2={180} y2={740} accent flow="fill" />
			<Label x={190} y={728} text="equity path" accent size={10} />

			{step("forward monitors", "kill rule frozen before signal 1", 740, { flow: "prove" })}
			<Badge cx={32} cy={740} text="5" r={8} />
			<Line id={id} x1={180} y1={784} x2={180} y2={816} flow="prove" />
			<Label x={190} y={804} text="CONTINUE · KILL" size={10} />
			{step("walk-forward · Sundays", "10 folds · train 24 mo · test 12 mo", 816, { flow: "prove" })}
			<Line id={id} x1={180} y1={860} x2={180} y2={892} flow="prove" />
			{step("reports · API · UI", "league.md · GET /meta", 892, { flow: "prove" })}
			<Label x={180} y={964} text="no path promotes a book" anchor="middle" size={10} />

			<Flow x1={180} y1={100} x2={180} y2={132} kind="change" dur={1.4} flow="collect" />
			<Flow x1={180} y1={396} x2={180} y2={428} kind="change" dur={1.4} flow="collect" />
			<Flow x1={180} y1={472} x2={180} y2={504} kind="request" dur={1.4} flow="decide" />
			<Flow x1={180} y1={548} x2={180} y2={580} kind="accent" dur={1.4} flow="fill" />
			<Flow x1={180} y1={624} x2={180} y2={656} kind="accent" dur={1.4} delay={-0.7} flow="fill" />
			<Flow x1={180} y1={708} x2={180} y2={740} kind="accent" dur={1.4} delay={-0.3} flow="fill" />
			<Flow x1={180} y1={784} x2={180} y2={816} kind="response" dur={1.4} flow="prove" />
		</>
	);
}
