import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node } from "../parts";

export const CLAIM =
	"v1, July 2026: Nasdaq's symbol list and Yahoo daily bars land in DuckDB, Stooq is blocked, a Minervini screen ranks the liquid names, ten paper portfolios plus a discretionary portfolio trade them, every order fills at the next open, and the reports are committed to git.";

export const meta = {
	number: "Figure 01 · v1",
	eyebrow: "16–27 July 2026",
	title: "One source, one screen, ten portfolios",
	caption: "The first nightly. Stooq was blocked on day one, so Yahoo became the only price source.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Orders", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
	],
	viewBox: "0 0 1120 520",
};

export function Wide({ id }) {
	const toLedger = [[536, 424], [516, 424], [516, 300], [480, 300]];
	return (
		<>
			<Defs id={id} />

			{/* sources */}
			<Node x={40} y={128} w={208} h={56} label="Nasdaq Trader" sub="symbol list" hint="Its symbol list over HTTPS defined the universe: 13,053 symbols parsed, 12,209 kept." icon="cloud" size={13} subSize={10} flow="collect" />
			<Node x={40} y={200} w={208} h={56} label="Yahoo" sub="daily bars" hint="Through yfinance it supplied every daily bar once the planned source failed." icon="cloud" size={13} subSize={10} flow="collect" />
			<Node x={40} y={272} w={208} h={56} label="Stooq" sub="blocked day one" hint="The planned price source. On 16 July it returned a JavaScript anti-bot page." icon="warning" size={13} subSize={10} dashed />
			<Badge cx={40} cy={128} text="1" />
			<Line id={id} x1={248} y1={156} x2={304} y2={156} flow="collect" />
			<Line id={id} x1={248} y1={228} x2={304} y2={228} flow="collect" />

			{/* store */}
			<Group x={288} y={96} w={208} h={264} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Badge cx={288} cy={96} text="2" />
			<Node x={304} y={128} w={176} h={56} label="universe" sub="4,118 liquid" hint="Only names with a $3 close and $5M median dollar volume count as liquid." icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={200} w={176} h={56} label="prices" sub="19.8M rows" hint="Yahoo daily bars, some back to 1962, with no split or dividend handling yet." icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={272} w={176} h={56} label="paper tables" sub="orders · fills" hint="Orders and fills. Each night's step writes them in one transaction or not at all." icon="db" size={12} subSize={10} flow="fill" />

			{/* decide */}
			<Label x={536} y={176} text="CRON 22:30 UTC · WEEKDAYS" size={10} />
			<Line id={id} x1={480} y1={228} x2={536} y2={228} flow="collect" />
			<Node x={536} y={200} w={224} h={56} label="screen" sub="trend screen + rank" hint="The Minervini trend template on the liquid names, ranked by relative strength." size={13} subSize={10} flow={["collect", "decide"]} />
			<Badge cx={536} cy={200} text="3" />
			<Line id={id} x1={648} y1={256} x2={648} y2={296} flow="decide" />
			<Node x={536} y={296} w={224} h={56} label="paper portfolios" sub="10 + 1 manual" hint="Ten fixed-rule portfolios started on 17 July with $39,000 of paper money each." size={13} subSize={10} flow={["decide", "fill"]} />
			<Line id={id} x1={648} y1={352} x2={648} y2={392} accent flow="fill" />
			<Label x={660} y={376} text="next open" accent size={10} />
			<Node x={536} y={392} w={224} h={64} label="fill" sub="next open + slippage" hint="Adds a cost based on 60-day dollar volume and rejects orders over 1% of that volume." size={13} subSize={10} flow="fill" />
			<Badge cx={536} cy={392} text="4" accent />
			<Connector points={toLedger} defs={id} flow="fill" kind="accent" />

			{/* serve */}
			<Node x={840} y={296} w={240} h={56} label="API + UI" sub="manual orders" hint="A local page for risk-checked manual orders. The portfolio it created broke four nights." icon="browser" size={13} subSize={10} flow="decide" />
			<Line id={id} x1={840} y1={324} x2={760} y2={324} flow="decide" />
			<Label x={800} y={316} text="orders" anchor="middle" size={10} />
			<Node x={840} y={392} w={240} h={64} label="sync" sub="reports to git" hint="Commits the night's screen and portfolio reports to git. A failed sync only warns." icon="git" size={13} subSize={10} flow="fill" />
			<Line id={id} x1={760} y1={424} x2={840} y2={424} flow="fill" />

			<Lane x={40} w={208} y={40} title="Sources" />
			<Lane x={288} w={208} y={40} title="Store" />
			<Lane x={536} w={224} y={40} title="Decide" />
			<Lane x={840} w={240} y={40} title="Serve" />
			<Flow x1={248} y1={228} x2={304} y2={228} kind="change" dur={1.4} flow="collect" />
			<Flow x1={480} y1={228} x2={536} y2={228} kind="change" dur={1.4} delay={-0.5} flow="collect" />
			<Flow x1={648} y1={256} x2={648} y2={296} kind="request" dur={1.2} flow="decide" />
			<Flow x1={648} y1={352} x2={648} y2={392} kind="accent" dur={1.2} flow="fill" />
		</>
	);
}
