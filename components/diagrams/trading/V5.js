import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node } from "../parts";

export const CLAIM =
	"v5, 18–24 September 2026: the rule books run as before, and a nightly agent reads point-in-time facts, picks from five standouts, and may place one paper trade through a locked tool that code sizes and risk-checks. Hourly and four-hour agents only observe. A ledger scores every agent decision against its control, and SEC and Alpaca stay gated.";

export const meta = {
	number: "Figure 01 · v5",
	eyebrow: "18–24 September 2026",
	title: "An agent with one narrow job",
	caption: "The agent can place one paper trade through a locked tool; code decides its size and whether it passes.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Decision", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Score", kind: "response" },
	],
	viewBox: "0 0 1120 600",
};

export function Wide({ id }) {
	const shadowsToLedger = [[816, 124], [836, 124], [836, 208], [856, 208]];
	return (
		<>
			<Defs id={id} />

			{/* sources */}
			<Node x={40} y={192} w={208} h={56} label="Yahoo 5m + news" sub="exact receipts" icon="cloud" size={13} subSize={10} flow="collect" />
			<Node x={40} y={288} w={208} h={56} label="SEC · Alpaca" sub="gated, not live" icon="lock" size={13} subSize={10} dashed />
			<Node x={40} y={384} w={208} h={56} label="Yahoo + Nasdaq" sub="EOD · verifier" icon="cloud" size={13} subSize={10} flow="collect" />
			<Badge cx={40} cy={192} text="1" />
			<Line id={id} x1={248} y1={220} x2={304} y2={220} flow="collect" />
			<Line id={id} x1={248} y1={412} x2={304} y2={412} flow="collect" />

			{/* store */}
			<Group x={288} y={160} w={208} h={384} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Node x={304} y={192} w={176} h={56} label="facts" sub="as-of cutoffs" icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={384} w={176} h={56} label="prices" sub="restated cache" icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={472} w={176} h={56} label="sim ledger" sub="fills · cash" icon="db" size={12} subSize={10} flow="fill" />

			{/* decide */}
			<Node x={536} y={96} w={280} h={56} label="hourly + 4-hour agents" sub="observe only" icon="robot" size={12} subSize={10} dashed flow="prove" />
			<Line id={id} x1={480} y1={220} x2={536} y2={220} flow="collect" />
			<Node x={536} y={192} w={280} h={56} label="daily agent" sub="02:00 UTC · five standouts" icon="agent" size={13} subSize={10} flow={["decide", "prove"]} />
			<Badge cx={536} cy={192} text="2" />
			<Line id={id} x1={676} y1={248} x2={676} y2={288} flow="decide" />
			<Label x={688} y={272} text="swing only" size={10} />
			<Node x={536} y={288} w={280} h={56} label="locked tool" sub="one trade, sized by code" icon="lock" size={13} subSize={10} flow="decide" />
			<Badge cx={536} cy={288} text="3" />
			<Line id={id} x1={676} y1={344} x2={676} y2={384} flow="decide" />
			<Line id={id} x1={480} y1={412} x2={536} y2={412} flow="collect" />
			<Node x={536} y={384} w={280} h={56} label="paper league" sub="21 rule books + agent book" size={13} subSize={10} flow={["decide", "fill", "prove"]} />
			<Line id={id} x1={600} y1={440} x2={600} y2={472} accent flow="fill" />
			<Node x={536} y={472} w={280} h={56} label="fill" sub="next open only" size={13} subSize={10} flow="fill" />
			<Line id={id} x1={536} y1={500} x2={480} y2={500} accent flow="fill" />

			{/* prove */}
			<Connector points={shadowsToLedger} defs={id} flow="prove" />
			<Line id={id} x1={816} y1={228} x2={856} y2={228} flow="prove" />
			<Node x={856} y={192} w={224} h={64} label="agent ledger" sub="1 · 5 · 10 · 20-day labels" size={13} subSize={10} flow="prove" />
			<Badge cx={856} cy={192} text="4" />
			<Line id={id} x1={816} y1={412} x2={856} y2={412} flow="prove" />
			<Node x={856} y={384} w={224} h={56} label="forward monitors" sub="sector · XS · E1" size={13} subSize={10} flow="prove" />
			<Node x={856} y={472} w={224} h={56} label="operating contract" sub="maintain mode · budgets" size={13} subSize={10} flow="prove" />

			<Lane x={40} w={208} y={40} title="Sources" />
			<Lane x={288} w={208} y={40} title="Store" />
			<Lane x={536} w={280} y={40} title="Decide" />
			<Lane x={856} w={224} y={40} title="Prove" />
			<Flow x1={480} y1={220} x2={536} y2={220} kind="change" dur={1.4} flow="collect" />
			<Flow x1={676} y1={248} x2={676} y2={288} kind="request" dur={1.2} flow="decide" />
			<Flow x1={676} y1={344} x2={676} y2={384} kind="request" dur={1.2} delay={-0.6} flow="decide" />
			<Flow x1={600} y1={440} x2={600} y2={472} kind="accent" dur={1.2} flow="fill" />
			<Flow x1={816} y1={228} x2={856} y2={228} kind="response" dur={1.4} flow="prove" />
		</>
	);
}
