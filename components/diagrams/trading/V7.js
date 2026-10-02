import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node, Packet } from "../parts";

export const CLAIM =
	"v7, 29 September 2026: market data, headlines and macro feeds land in DuckDB under one writer, each fact with the time it became available. Each night a fixed rule and a model both score every candidate, and the nightly agent keeps its own portfolio. Code, not the model, turns scores into sized orders; a pre-open check may only cancel, and every order fills at the next open or through a limit order at the open. Every decision is kept in one ledger, labelled later, and a paired test against the rule decides on fixed check dates. The challenger lab and event triggers are switched off, and there is no broker yet: it is still all paper.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The nightly loop · v7",
	title: "The model scores, code trades, the ledger decides",
	caption:
		"Sources on the left, one writer, three decision paths, then sizing and fills, then the evidence on the right. Dashed boxes place no orders. Nothing here moves a strategy to real money on its own.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Scores and orders", kind: "request" },
		{ label: "Fill", kind: "accent" },
		{ label: "Evidence", kind: "response" },
	],
	viewBox: "0 0 1120 672",
};

// Claim: the model only scores; code owns sizing, fills and halts; every
// decision is paired with a rule and judged at fixed looks. Accent follows
// the order from pre-open check to fill to the sim ledger. 8px grid.

const SOURCES = [
	{ y: 128, label: "Yahoo · Nasdaq", sub: "daily + intraday", icon: "cloud", hint: "Yahoo supplies the price bars. Nasdaq checks them rather than standing in." },
	{ y: 208, label: "TradingView", sub: "research only", icon: "cloud", hint: "Quotes and bars for research. They never set a price, a fill or an order." },
	{ y: 288, label: "RSS headlines", sub: "11 feeds", icon: "cloud", hint: "Headline titles collected through the day, used as research input only." },
	{ y: 368, label: "SEC 8-K", sub: "waits on access", icon: "lock", gated: true, hint: "Capture of company event filings waits on SEC access, so none arrive yet." },
	{ y: 448, label: "Macro feeds", sub: "FRED · Cboe", icon: "chart", hint: "Also FINRA, CFTC, AAII and SqueezeMetrics: market-wide and sentiment data." },
];

const STORE = [
	{ y: 160, label: "prices", sub: "verified", hint: "Cross-checked against a second source. Every simulated fill is priced from these." },
	{ y: 240, label: "facts", sub: "as-of time", hint: "Each fact carries the time it became available, so no decision sees later news." },
	{ y: 320, label: "headlines", sub: "time-stamped", hint: "Headline titles with their arrival times. They can wake an event trigger." },
];

const DECIDE = [
	{ y: 128, h: 56, label: "rule baseline", sub: "fixed ranking", hint: "The fixed ranking the model must beat, scored on the same names and dates." },
	{ y: 208, h: 64, label: "model scores", sub: "every candidate", icon: "agent", badge: "3", hint: "The model scores every nightly candidate in a wider universe, but sizes nothing." },
	{ y: 296, h: 56, label: "nightly agent", sub: "one locked trade tool", icon: "agent", hint: "Keeps its own portfolio. It abstained on 92% of its standouts, too few trades to judge." },
	{ y: 376, h: 56, label: "event triggers", sub: "news · movers · watch only", icon: "robot", dashed: true, hint: "Built to react to headlines and intraday movers within minutes. They place no orders." },
	{ y: 456, h: 56, label: "challenger lab", sub: "built · switched off", icon: "robot", dashed: true, hint: "Other model policies on the same inputs, waiting for scoring to run a clean first cycle." },
];

export function Wide({ id }) {
	const toLedger = [[640, 128], [640, 104], [1000, 104], [1000, 128]];
	const fillToStore = [[760, 448], [760, 560], [340, 560], [340, 496]];
	const fillToBooks = [[888, 416], [904, 416], [904, 468], [920, 468]];

	return (
		<>
			<Defs id={id} />

			{/* ---------- sources ---------- */}
			{SOURCES.map(({ y, label, sub, icon, gated, hint }) => (
				<Node key={label} x={40} y={y} w={184} h={56} label={label} sub={sub} hint={hint} icon={icon} size={13} subSize={10} dashed={gated} flow="collect" />
			))}
			<Badge cx={40} cy={128} text="1" />
			{SOURCES.map(({ y, label, gated }) => (
				<Line key={label} id={id} x1={224} y1={y + 28} x2={256} y2={y + 28} dashed={gated} flow="collect" />
			))}

			{/* ---------- store ---------- */}
			<Group x={256} y={128} w={168} h={384} title="ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={256} cy={128} text="2" />
			{STORE.map(({ y, label, sub, hint }) => (
				<Node key={label} x={268} y={y} w={144} h={56} label={label} sub={sub} hint={hint} icon="db" size={12} subSize={10} flow="collect" />
			))}
			<Node x={268} y={432} w={144} h={64} label="paper ledger" sub="fills · cash" hint="Fills and dividends for all 25 paper portfolios. Dividends land on the ex-date." icon="db" size={12} subSize={10} flow="fill" />

			{/* ---------- decide ---------- */}
			<Line id={id} x1={412} y1={268} x2={440} y2={268} arrow={false} flow="collect" />
			<Line id={id} x1={440} y1={156} x2={440} y2={484} arrow={false} flow="collect" />
			{DECIDE.map(({ y, h, label, sub, icon, dashed, badge, hint }) => (
				<g key={label}>
					<Line id={id} x1={440} y1={y + h / 2} x2={456} y2={y + h / 2} dashed={dashed} flow="collect" />
					<Node x={456} y={y} w={232} h={h} label={label} sub={sub} hint={hint} icon={icon} size={13} subSize={10} dashed={dashed} flow={dashed ? "collect" : ["collect", "decide"]} />
					{badge ? <Badge cx={456} cy={y} text={badge} /> : null}
				</g>
			))}

			{/* ---------- size, check, fill ---------- */}
			<Line id={id} x1={688} y1={156} x2={704} y2={156} arrow={false} flow="decide" />
			<Line id={id} x1={688} y1={324} x2={704} y2={324} arrow={false} flow="decide" />
			<Line id={id} x1={704} y1={156} x2={704} y2={324} arrow={false} flow="decide" />
			<Line id={id} x1={688} y1={240} x2={720} y2={240} flow="decide" />
			<Node x={720} y={208} w={168} h={64} label="sizing + risk" sub="code only" hint="Sizes each position from recent volatility and fixes the stop at entry." icon="lock" size={13} subSize={10} flow={["decide", "fill"]} />
			<Badge cx={720} cy={208} text="4" />
			<Line id={id} x1={804} y1={272} x2={804} y2={304} flow="fill" />
			<Node x={720} y={304} w={168} h={56} label="pre-open check" sub="may only cancel" hint="A cancelled order keeps the fill it would have had, so the cancel itself is scored." icon="agent" size={13} subSize={10} flow="fill" />
			<Line id={id} x1={804} y1={360} x2={804} y2={384} accent flow="fill" />
			<Node x={720} y={384} w={168} h={64} label="fill" sub="next open or limit" hint="A limit order at the open skips the trade if the stock opens too far above the close." size={13} subSize={10} flow="fill" />
			<Badge cx={720} cy={384} text="5" accent />
			<Connector points={fillToStore} defs={id} kind="accent" flow="fill" />
			<Label x={552} y={552} text="fills · dividends" anchor="middle" accent size={11} />

			<Line id={id} x1={848} y1={448} x2={848} y2={584} dashed flow="fill" />
			<Label x={836} y={528} text="later" anchor="end" size={10} />
			<Node x={720} y={584} w={168} h={56} label="IBKR broker" sub="not open yet" hint="No credentials and no broker connection yet, so nothing here can move money." icon="lock" size={13} subSize={10} dashed />

			{/* ---------- evidence ---------- */}
			<Connector points={toLedger} defs={id} flow="prove" />
			<Label x={820} y={96} text="every decision, kept" anchor="middle" size={10} />
			<Node x={920} y={128} w={160} h={64} label="ledger" sub="labels at 1–20 days" hint="Every decision is kept, cancels included, and later labelled with what the stock did." size={13} subSize={10} flow="prove" />
			<Badge cx={920} cy={128} text="6" />
			<Line id={id} x1={1000} y1={192} x2={1000} y2={232} flow="prove" />
			<Node x={920} y={232} w={160} h={64} label="paired test" sub="model vs rule" hint="Decides whether the model adds anything over the rule. So far no policy beat its control." size={13} subSize={10} flow="prove" />
			<Line id={id} x1={1000} y1={296} x2={1000} y2={336} flow="prove" />
			<Node x={920} y={336} w={160} h={64} label="fixed check dates" sub="60 · 90 · 120 days" hint="The paired test is read only on these scored trading days, never in between." size={13} subSize={10} flow="prove" />
			<Label x={1000} y={416} text="KEEP · DROP" anchor="middle" size={10} />

			<Connector points={fillToBooks} defs={id} flow="fill" />
			<Node x={920} y={440} w={160} h={56} label="3 test portfolios" sub="model · rule · veto" hint="Model-ranked, rule-ranked, and rule with a model veto, all with identical mechanics." size={12} subSize={10} flow={["fill", "prove"]} />
			<Node x={920} y={528} w={160} h={56} label="every test logged" sub="wins and losses" hint="103 tests written down in advance, counted as 139 trials. Failures stay on record." size={12} subSize={10} flow="prove" />
			<Label x={1000} y={616} text="I decide go-live" anchor="middle" size={11} />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={184} y={40} title="Sources" />
			<Lane x={256} w={168} y={40} title="DuckDB" />
			<Lane x={456} w={232} y={40} title="Decide" />
			<Lane x={720} w={168} y={40} title="Size · fill" />
			<Lane x={920} w={160} y={40} title="Evidence" />
			{SOURCES.filter((s) => !s.gated).map(({ y }, i) => (
				<Flow key={y} x1={224} y1={y + 28} x2={256} y2={y + 28} kind="change" dur={1.2} delay={-0.4 * i} flow="collect" />
			))}
			<Flow x1={440} y1={240} x2={456} y2={240} kind="change" dur={1} flow="collect" />
			<Flow x1={688} y1={240} x2={720} y2={240} kind="request" dur={1} flow="decide" />
			<Flow x1={804} y1={272} x2={804} y2={304} kind="request" dur={1.2} flow="fill" />
			<Flow x1={804} y1={360} x2={804} y2={384} kind="accent" dur={1} delay={-0.5} flow="fill" />
			<Packet points={fillToStore} kind="accent" dur={2.4} flow="fill" />
			<Packet points={toLedger} kind="response" dur={2.2} flow="prove" />
			<Flow x1={1000} y1={192} x2={1000} y2={232} kind="response" dur={1.2} flow="prove" />
			<Flow x1={1000} y1={296} x2={1000} y2={336} kind="response" dur={1.2} delay={-0.6} flow="prove" />
		</>
	);
}
