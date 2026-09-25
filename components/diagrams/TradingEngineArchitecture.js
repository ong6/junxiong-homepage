import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node, Packet, route } from "./parts";

export const CLAIM =
	"Nightly feeds from Yahoo, Nasdaq and a set of macro and sentiment publishers land in DuckDB under one writer, each response kept as an exact receipt; Alpaca, SEC EDGAR and licensed history are wired in behind credential gates, and TradingView and Stooq are blocked. A screen ranks about 4,100 liquid names, 21 pre-registered paper books turn it into orders at the close, and an AI agent runs one more book through a locked simulator tool. Every order fills at the next open through one guard. Forward monitors, a Sunday walk-forward and an agent ledger read the results and can kill a book, never promote one.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The nightly loop",
	title: "Where the data comes from, and what each night does with it",
	caption:
		"Sources on the left, one writer in the middle, decisions and fills, then the evidence on the right. The dashed boxes have no order authority. Nothing on this canvas can promote a strategy.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Ranked names", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Verdict", kind: "response" },
	],
	viewBox: "0 0 1120 672",
};

// Claim: many sources, one writer; orders signalled at close t fill only at
// open t+1 through one guard; the agent trades one book through the same
// path; the evidence column can kill but never promote. Accent follows
// orders → fill → ledger. 8px grid throughout.

const SOURCES = [
	{ y: 96, label: "Yahoo", sub: "bars · actions · intraday", icon: "cloud", to: 176 },
	{ y: 176, label: "Nasdaq", sub: "universe · price check", icon: "cloud", to: 208 },
	{ y: 256, label: "Macro feeds", sub: "FRED · Cboe · FINRA · CFTC", icon: "chart", to: 240 },
	{ y: 352, label: "Credential-gated", sub: "Alpaca · EDGAR · PIT data", icon: "lock", to: 264, gated: true },
];

const STORE = [
	{ y: 344, h: 56, label: "prices", sub: "cache · verified" },
	{ y: 424, h: 56, label: "facts", sub: "bitemporal receipts" },
	{ y: 504, h: 64, label: "sim ledger", sub: "fills · cash", flow: "fill" },
];

export function Wide({ id }) {
	const sourcePaths = SOURCES.map(({ y, to, gated }) => {
		const from = [264, y + 32];
		if (from[1] === to) return [from, [304, to]];
		return route(from, [304, to], gated ? 292 : 284);
	});
	const toAgent = [[616, 344], [616, 264], [704, 264]];
	const toWalkForward = route([832, 392], [872, 468], 852);

	return (
		<>
			<Defs id={id} />

			{/* ---------- sources ---------- */}
			{SOURCES.map(({ y, label, sub, icon, gated }) => (
				<Node
					key={label}
					x={40}
					y={y}
					w={224}
					h={64}
					label={label}
					sub={sub}
					icon={icon}
					size={13}
					subSize={10}
					dashed={gated}
					flow="collect"
				/>
			))}
			<Badge cx={40} cy={96} text="1" />
			<Label x={152} y={448} text="TradingView · Stooq: blocked" anchor="middle" size={10} />
			{sourcePaths.map((points, i) => (
				<Connector key={SOURCES[i].label} points={points} defs={id} flow="collect" />
			))}

			{/* ---------- store ---------- */}
			<Node
				x={304}
				y={160}
				w={208}
				h={112}
				label="collect"
				sub="job queue · batched"
				icon="queue"
				size={13}
				subSize={10}
				flow="collect"
			/>
			<Line id={id} x1={408} y1={272} x2={408} y2={312} flow="collect" />
			<Label x={420} y={296} text="commit" size={11} />
			<Group x={304} y={312} w={208} h={288} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={304} cy={312} text="2" />
			{STORE.map(({ y, h, label, sub, flow }) => (
				<Node
					key={label}
					x={320}
					y={y}
					w={176}
					h={h}
					label={label}
					sub={sub}
					icon="db"
					size={12}
					subSize={10}
					flow={flow || "collect"}
				/>
			))}

			{/* ---------- decide ---------- */}
			<Node
				x={552}
				y={96}
				w={280}
				h={56}
				label="intraday shadow agents"
				sub="hourly · 4-hourly · no orders"
				icon="robot"
				size={12}
				subSize={10}
				dashed
				flow="decide"
			/>

			<Line id={id} x1={512} y1={372} x2={552} y2={372} flow="collect" />
			<Node
				x={552}
				y={344}
				w={128}
				h={56}
				label="screen"
				sub="~4,100 names"
				size={13}
				subSize={10}
				flow={["collect", "decide"]}
			/>
			<Badge cx={552} cy={344} text="3" />

			<Connector points={toAgent} defs={id} flow="decide" />
			<Label x={628} y={256} text="standouts" size={10} />
			<Node
				x={704}
				y={232}
				w={128}
				h={64}
				label="AI agent"
				sub="locked tool"
				icon="agent"
				size={13}
				subSize={10}
				flow={["decide", "prove"]}
			/>
			<Badge cx={704} cy={232} text="6" />
			<Line id={id} x1={768} y1={296} x2={768} y2={344} flow="decide" />
			<Label x={780} y={324} text="one book" size={10} />

			<Line id={id} x1={680} y1={372} x2={704} y2={372} flow="decide" />
			<Node
				x={704}
				y={344}
				w={128}
				h={56}
				label="paper books"
				sub="21 rules + agent"
				size={12}
				subSize={10}
				flow={["decide", "fill", "prove"]}
			/>

			<Line id={id} x1={768} y1={400} x2={768} y2={424} flow="fill" />
			<Node
				x={704}
				y={424}
				w={128}
				h={56}
				label="orders"
				sub="signal at close"
				size={13}
				subSize={10}
				flow="fill"
			/>
			<Line id={id} x1={768} y1={480} x2={768} y2={504} accent flow="fill" />
			<Node
				x={704}
				y={504}
				w={128}
				h={64}
				label="fill"
				sub="next open only"
				size={13}
				subSize={10}
				flow="fill"
			/>
			<Badge cx={704} cy={504} text="4" accent />
			<Line id={id} x1={704} y1={536} x2={496} y2={536} accent flow="fill" />
			<Label x={600} y={528} text="fills · dividends" anchor="middle" accent size={11} />

			{/* ---------- prove ---------- */}
			<Line id={id} x1={832} y1={264} x2={872} y2={264} flow="prove" />
			<Node
				x={872}
				y={232}
				w={208}
				h={64}
				label="agent ledger"
				sub="each call vs its control"
				size={13}
				subSize={10}
				flow="prove"
			/>

			<Line id={id} x1={832} y1={372} x2={872} y2={372} flow="prove" />
			<Node
				x={872}
				y={344}
				w={208}
				h={56}
				label="forward monitors"
				sub="kill rule fixed up front"
				size={13}
				subSize={10}
				flow="prove"
			/>
			<Badge cx={872} cy={344} text="5" />

			<Connector points={toWalkForward} defs={id} flow="prove" />
			<Label x={884} y={432} text="same rules, old bars" size={10} />
			<Node
				x={872}
				y={440}
				w={208}
				h={56}
				label="walk-forward"
				sub="Sundays · 10 folds"
				size={13}
				subSize={10}
				flow="prove"
			/>

			<Line id={id} x1={976} y1={496} x2={976} y2={536} flow="prove" />
			<Label x={988} y={520} text="CONTINUE · KILL" size={10} />
			<Node
				x={872}
				y={536}
				w={208}
				h={56}
				label="reports · API · UI"
				sub="league.md · GET /meta"
				size={13}
				subSize={10}
				flow="prove"
			/>
			<Label x={976} y={624} text="no path promotes a book" anchor="middle" size={11} />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={224} y={40} title="Sources" />
			<Lane x={304} w={208} y={40} title="Store" />
			<Lane x={552} w={280} y={40} title="Decide" />
			<Lane x={872} w={208} y={40} title="Prove" />
			{sourcePaths.slice(0, 3).map((points, i) => (
				<Packet key={i} points={points} kind="change" dur={1.8} delay={-0.6 * i} flow="collect" />
			))}
			<Flow x1={408} y1={272} x2={408} y2={312} kind="change" dur={1.4} flow="collect" />
			<Flow x1={512} y1={372} x2={552} y2={372} kind="change" dur={1.4} delay={-0.5} flow="collect" />
			<Packet points={toAgent} kind="request" dur={1.8} flow="decide" />
			<Flow x1={768} y1={400} x2={768} y2={424} kind="accent" dur={1.2} flow="fill" />
			<Flow x1={768} y1={480} x2={768} y2={504} kind="accent" dur={1.2} delay={-0.6} flow="fill" />
			<Flow x1={704} y1={536} x2={496} y2={536} kind="accent" dur={2.2} delay={-0.4} flow="fill" />
			<Flow x1={832} y1={372} x2={872} y2={372} kind="request" dur={1.4} flow="prove" />
			<Packet points={toWalkForward} kind="request" dur={1.8} delay={-0.9} flow="prove" />
			<Flow x1={976} y1={496} x2={976} y2={536} kind="response" dur={1.4} flow="prove" />
		</>
	);
}
