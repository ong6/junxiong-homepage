import { Badge, Connector, Defs, Flow, Group, Label, Lane, Line, Node } from "../parts";

export const CLAIM =
	"v3, August 2026: a news analyst summarises RSS headlines each morning, two gaters can veto or shrink entries and three tuners can move parameters, but every proposal passes a validator that reads its bounds from a frozen charter, and each AI book is scored against an untouched twin. With no gate file the book trades its plain algorithm.";

export const meta = {
	number: "Figure 01 · v3",
	eyebrow: "4–17 August 2026",
	title: "A model beside five books, inside written bounds",
	caption: "The model could only veto, shrink or retune inside a charter. Retired on 18 August.",
	legend: [
		{ label: "Data", kind: "change" },
		{ label: "Proposal", kind: "request" },
		{ label: "Next-open fill", kind: "accent" },
		{ label: "Score", kind: "response" },
	],
	viewBox: "0 0 1120 616",
};

export function Wide({ id }) {
	const charterToValidator = [[480, 236], [512, 236], [512, 332], [536, 332]];
	const pricesToLeague = [[480, 348], [520, 348], [520, 432], [536, 432]];
	const leagueToLedger = [[536, 448], [526, 448], [526, 508], [480, 508]];
	return (
		<>
			<Defs id={id} />

			{/* sources */}
			<Node x={40} y={112} w={208} h={56} label="RSS headlines" sub="11 feeds, titles" icon="doc" size={13} subSize={10} flow="decide" />
			<Node x={40} y={320} w={208} h={56} label="Yahoo" sub="daily bars" icon="cloud" size={13} subSize={10} flow="collect" />
			<Node x={40} y={400} w={208} h={56} label="Nasdaq Trader" sub="symbol list" icon="cloud" size={13} subSize={10} flow="collect" />
			<Badge cx={40} cy={112} text="1" />
			<Line id={id} x1={248} y1={140} x2={536} y2={140} flow="decide" />
			<Line id={id} x1={248} y1={348} x2={304} y2={348} flow="collect" />
			<Line id={id} x1={248} y1={428} x2={304} y2={428} flow="collect" />

			{/* store */}
			<Node x={304} y={208} w={176} h={56} label="charters" sub="frozen bounds" icon="lock" size={12} subSize={10} flow="decide" />
			<Group x={288} y={288} w={208} h={272} title="DUCKDB · ONE WRITER" flow={["collect", "fill"]} />
			<Node x={304} y={320} w={176} h={56} label="prices" sub="Yahoo EOD" icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={400} w={176} h={56} label="universe" sub="daily snapshot" icon="db" size={12} subSize={10} flow="collect" />
			<Node x={304} y={480} w={176} h={56} label="sim ledger" sub="AI books + twins" icon="db" size={12} subSize={10} flow="fill" />

			{/* decide */}
			<Node x={536} y={112} w={128} h={56} label="news analyst" sub="11:00 brief" size={12} subSize={10} flow="decide" />
			<Badge cx={536} cy={112} text="2" />
			<Line id={id} x1={600} y1={168} x2={600} y2={208} flow="decide" />
			<Node x={536} y={208} w={128} h={56} label="gaters ×2" sub="21:40 · veto" size={12} subSize={10} flow="decide" />
			<Node x={688} y={208} w={128} h={56} label="tuners ×3" sub="Sun · params" size={12} subSize={10} flow="decide" />
			<Line id={id} x1={600} y1={264} x2={600} y2={304} flow="decide" />
			<Line id={id} x1={752} y1={264} x2={752} y2={304} flow="decide" />
			<Connector points={charterToValidator} defs={id} flow="decide" />
			<Node x={536} y={304} w={280} h={56} label="validator" sub="bounds read from the charter" size={13} subSize={10} flow="decide" />
			<Badge cx={536} cy={304} text="3" />
			<Line id={id} x1={676} y1={360} x2={676} y2={400} dashed flow="decide" />
			<Label x={688} y={384} text="no file = pure algo" size={10} />
			<Connector points={pricesToLeague} defs={id} flow="collect" />
			<Node x={536} y={400} w={280} h={64} label="paper league" sub="22:30 · 25 books" size={13} subSize={10} flow={["decide", "fill", "prove"]} />
			<Connector points={leagueToLedger} defs={id} flow="fill" kind="accent" />

			{/* prove */}
			<Line id={id} x1={816} y1={432} x2={856} y2={432} flow="prove" />
			<Node x={856} y={400} w={224} h={64} label="AI book vs twin" sub="same algo, frozen" size={13} subSize={10} flow="prove" />
			<Badge cx={856} cy={400} text="4" />
			<Line id={id} x1={968} y1={464} x2={968} y2={496} flow="prove" />
			<Node x={856} y={496} w={224} h={56} label="scoreboard" sub="26-week spread" size={13} subSize={10} flow="prove" />
			<Label x={968} y={588} text="RETIRED 18 AUG" anchor="middle" size={11} />

			<Lane x={40} w={208} y={40} title="Sources" />
			<Lane x={288} w={208} y={40} title="Store" />
			<Lane x={536} w={280} y={40} title="Decide" />
			<Lane x={856} w={224} y={40} title="Prove" />
			<Flow x1={248} y1={140} x2={536} y2={140} kind="request" dur={2.2} flow="decide" />
			<Flow x1={600} y1={264} x2={600} y2={304} kind="request" dur={1.2} flow="decide" />
			<Flow x1={752} y1={264} x2={752} y2={304} kind="request" dur={1.2} delay={-0.6} flow="decide" />
			<Flow x1={248} y1={348} x2={304} y2={348} kind="change" dur={1.4} flow="collect" />
			<Flow x1={968} y1={464} x2={968} y2={496} kind="response" dur={1.2} flow="prove" />
		</>
	);
}
