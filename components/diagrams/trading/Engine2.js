import { Connector, Defs, Group, Lane, Node, Packet } from "../parts";

export const CLAIM =
	"From the next update, a code change reaches the live engine only after a reviewer that did not write it, tests that replay recorded provider responses, a check of every scheduled job and a deploy gate that compares the code's fingerprint with its registered version. The engine fills orders, charges commissions and keeps the ledger in a store that will open only to live services, and an invariant monitor, watch-only at first, checks every published snapshot before reports read it.";

export const meta = {
	number: "Figure 01",
	eyebrow: "Engine v2 · checks landing next",
	title: "Checked before it deploys, checked again after every night, from the next update",
	caption:
		"With the next update, a change will pass four checks before it can deploy, and reports will read the published snapshot only after the invariant monitor has checked it.",
	legend: [
		{ label: "Change", kind: "change" },
		{ label: "Checks", kind: "request" },
		{ label: "Live paper", kind: "accent" },
		{ label: "Published", kind: "response" },
	],
	viewBox: "0 0 1120 464",
};

// Claim (from the next update): four checks gate every deploy, and every published snapshot is
// checked before anything reads it. 8px grid throughout.

export function Wide({ id }) {
	const changeToReview = [
		[184, 132],
		[248, 132],
	];
	const reviewToReplay = [
		[384, 160],
		[384, 184],
	];
	const replayToSchedule = [
		[384, 240],
		[384, 264],
	];
	const scheduleToGate = [
		[384, 320],
		[384, 344],
	];
	const gateToEngine = [
		[520, 372],
		[560, 372],
		[560, 132],
		[600, 132],
	];
	const storeToSnapshot = [
		[736, 320],
		[736, 344],
	];
	const snapshotToMonitor = [
		[872, 372],
		[912, 372],
	];
	const monitorToReports = [
		[1000, 344],
		[1000, 320],
	];

	return (
		<>
			<Defs id={id} />

			<Lane x={40} w={144} y={40} title="Change" />
			<Lane x={232} w={304} y={40} title="Before deploy" />
			<Lane x={584} w={304} y={40} title="Live" />
			<Lane x={912} w={176} y={40} title="After each run" />

			<Node x={40} y={104} w={144} h={56} label="code change" sub="its own branch" icon="git" hint="Every fix or feature is built on its own branch, away from the running engine." flow="ship" />
			<Connector points={changeToReview} defs={id} kind="change" flow="ship" />
			<Packet points={changeToReview} kind="change" dur={1.2} flow="ship" />

			<Group x={232} y={80} w={304} h={344} title="FOUR CHECKS" flow="ship" />
			<Node x={248} y={104} w={272} h={56} label="fresh reviewer" sub="did not write the change" icon="agent" hint="A separate AI agent that never saw the work reads the change, reruns its tests and either accepts it or sends back a list of defects." flow="ship" />
			<Connector points={reviewToReplay} defs={id} kind="request" flow="ship" />
			<Node x={248} y={184} w={272} h={56} label="recorded provider replies" sub="replayed in tests" icon="doc" hint="Real responses from each data provider are saved once and replayed in the test suite, so a provider changing its format fails a test instead of a deploy." flow="ship" />
			<Connector points={replayToSchedule} defs={id} kind="request" flow="ship" />
			<Node x={248} y={264} w={272} h={56} label="schedule manifest" sub="every job, before and live" icon="queue" hint="One file lists every scheduled job and the host setup it needs. A checker compares it with the code before a deploy and with the running machine afterwards." flow="ship" />
			<Connector points={scheduleToGate} defs={id} kind="request" flow="ship" />
			<Node x={248} y={344} w={272} h={56} label="deploy gate" sub="fingerprint = registered" icon="lock" hint="Strategies with a written test plan are registered with a fingerprint of their code. The gate refuses a deploy whose code no longer matches it." flow="ship" />
			<Packet points={reviewToReplay} kind="request" dur={0.8} flow="ship" />
			<Packet points={replayToSchedule} kind="request" dur={0.8} delay={-0.27} flow="ship" />
			<Packet points={scheduleToGate} kind="request" dur={0.8} delay={-0.53} flow="ship" />

			<Connector points={gateToEngine} defs={id} kind="accent" flow="ship" />
			<Packet points={gateToEngine} kind="accent" dur={1.8} flow="ship" />

			<Group x={584} y={80} w={304} h={344} title="LIVE ENGINE" flow="ship" accent />
			<Node x={600} y={104} w={272} h={56} label="fills and ledger" sub="open · close · intraday" icon="tool" hint="The engine fills paper orders at the opening auction, the closing auction or from minute bars, and keeps every account's books." flow="ship" accent />
			<Node x={600} y={184} w={132} h={56} label="commissions" sub="every fill" size={11} subSize={10} hint="Commission and regulatory fees on every fill, from one rate table that records the date each rate took effect." flow="ship" />
			<Node x={740} y={184} w={132} h={56} label="risk halts" sub="loss limits" size={11} subSize={10} hint="An account stops trading 20% below its peak, after a 5% loss in a day or on any ledger mismatch." flow="ship" />
			<Node x={600} y={264} w={272} h={56} label="live store" sub="live services only, next" icon="db" hint="In the next update, a test and a check on the running machine make sure nothing but the engine's own scheduled services can open the live store; research reads a snapshot instead." flow="ship" />
			<Connector points={storeToSnapshot} defs={id} kind="response" flow="ship" />
			<Node x={600} y={344} w={272} h={56} label="published snapshot" sub="copy for readers" icon="db" hint="After each run the engine publishes a read-only copy. Reports, checks and research read this copy, never the live store." flow="ship" />

			<Connector points={snapshotToMonitor} defs={id} kind="response" flow="ship" />
			<Packet points={snapshotToMonitor} kind="response" dur={1.2} flow="ship" />
			<Node x={912} y={344} w={176} h={56} label="invariant monitor" sub="watch-only first" size={11} subSize={10} icon="warning" hint="Checks rules that must always hold: prices, positions, cash and results agree with each other. It runs beside the engine in watch-only mode first, with each known exception given an expiry date." flow="ship" />
			<Connector points={monitorToReports} defs={id} kind="response" flow="ship" />
			<Node x={912} y={264} w={176} h={56} label="reports" sub="read the snapshot" size={11} subSize={10} icon="chart" hint="Portfolio reports and the status page are built from the checked snapshot." flow="ship" />
		</>
	);
}
