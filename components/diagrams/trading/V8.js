import { Bus } from "uipack";
import { Connector, Defs, Group, Label, Lane, Node, Packet } from "../parts";

export const CLAIM =
	"Every public or private strategy is reduced to a short specification, then follows one shared backtest core and one evidence path before a paper portfolio can observe it. The core enforces no-peeking data, named costs, native event or portfolio simulation, a gross benchmark, calendar-day deflated Sharpe and a sealed holdout.";

export const meta = {
	number: "Figure 01",
	eyebrow: "One evidence path · v8",
	title: "Every strategy goes through the same core",
	caption:
		"A short strategy specification enters one evaluator; the evaluator owns the data boundary, simulation and proof before a paper portfolio can observe the result.",
	legend: [
		{ label: "Strategy", kind: "change" },
		{ label: "Backtest", kind: "request" },
		{ label: "Evidence", kind: "response" },
		{ label: "Paper path", kind: "accent" },
	],
	viewBox: "0 0 1120 456",
};

// Claim: public and separately held private strategies share one declarative
// evaluator and evidence path before paper observation. The private live-book
// bridge is the next boundary, not an active trading path. 8px grid throughout.

export function Wide({ id }) {
	const publicPath = [
		[216, 144],
		[232, 144],
		[232, 184],
		[248, 184],
	];
	const privatePath = [
		[216, 256],
		[232, 256],
		[232, 184],
		[248, 184],
	];
	const specToCore = [
		[376, 184],
		[432, 184],
	];
	const coreToEvidence = [
		[768, 184],
		[824, 184],
	];
	const evidenceToPaper = [
		[944, 184],
		[976, 184],
	];

	return (
		<>
			<Defs id={id} />

			<Lane x={40} w={176} y={40} title="Strategies" />
			<Lane x={248} w={128} y={40} title="Specification" />
			<Lane x={408} w={384} y={40} title="Shared core" />
			<Lane x={824} w={120} y={40} title="Evidence" />
			<Lane x={976} w={112} y={40} title="Paper" />

			<Node x={40} y={112} w={176} h={64} label="public strategy" sub="open spec" icon="doc" flow="study" />
			<Node x={40} y={224} w={176} h={64} label="private strategy" sub="separate repo" icon="lock" dashed flow="study" />

			<Bus
				axis="v"
				at={232}
				from={144}
				to={256}
				stubs={[
					{ at: 144, to: 216, flow: "study" },
					{ at: 256, to: 216, flow: "study" },
					{ at: 184, to: 248, arrow: true, flow: "study" },
				]}
				kind="change"
				flow="study"
				defs={id}
			/>
			<Label x={232} y={96} text="freeze" anchor="middle" size={10} />
			<Packet points={publicPath} kind="change" dur={2.2} flow="study" />
			<Packet points={privatePath} kind="change" dur={2.2} delay={-1.1} flow="study" />

			<Node x={248} y={152} w={128} h={64} label="strategy spec" sub="two modes" flow="study" />
			<Connector points={specToCore} defs={id} kind="request" flow="study" />
			<Label x={400} y={168} text="run" anchor="middle" size={10} />
			<Packet points={specToCore} kind="request" dur={1.4} flow="study" />

			<Group x={408} y={80} w={384} h={304} title="SHARED BACKTEST CORE" flow="study" accent />
			<Node x={432} y={152} w={336} h={64} label="native simulation" sub="events + portfolios" icon="tool" flow="study" accent />
			<Node x={432} y={256} w={96} h={48} label="no peeking" size={11} flow="study" />
			<Node x={544} y={256} w={96} h={48} label="named costs" size={11} flow="study" />
			<Node x={656} y={256} w={112} h={48} label="gross benchmark" size={11} flow="study" />
			<Node x={472} y={320} w={120} h={48} label="calendar DSR" size={11} flow="study" />
			<Node x={608} y={320} w={120} h={48} label="sealed holdout" size={11} flow="study" />

			<Connector points={coreToEvidence} defs={id} kind="response" flow="study" />
			<Label x={800} y={168} text="report" anchor="middle" size={10} />
			<Packet points={coreToEvidence} kind="response" dur={1.4} delay={-0.7} flow="study" />
			<Node x={824} y={152} w={120} h={64} label="report" sub="evidence" icon="doc" flow="study" />

			<Connector points={evidenceToPaper} defs={id} kind="accent" flow="study" />
			<Label x={960} y={168} text="paper" anchor="middle" size={9} accent />
			<Packet points={evidenceToPaper} kind="accent" dur={1.2} flow="study" />
			<Node x={976} y={152} w={112} h={64} label="paper book" sub="paper only" flow="study" accent />
		</>
	);
}

export function Narrow({ id }) {
	const publicPath = [
		[96, 136],
		[96, 152],
		[176, 152],
		[176, 184],
	];
	const privatePath = [
		[264, 136],
		[264, 152],
		[176, 152],
		[176, 184],
	];
	const specToCore = [
		[176, 248],
		[176, 336],
	];
	const coreToEvidence = [
		[176, 672],
		[176, 752],
	];
	const evidenceToPaper = [
		[176, 816],
		[176, 864],
	];

	return (
		<>
			<Defs id={id} />
			<Lane x={24} w={312} y={40} title="Strategies" />
			<Node x={24} y={72} w={144} h={64} label="public strategy" sub="open spec" icon="doc" size={12} subSize={10} flow="study" />
			<Node x={192} y={72} w={144} h={64} label="private strategy" sub="separate repo" icon="lock" size={12} subSize={10} dashed flow="study" />
			<Bus
				axis="h"
				at={152}
				from={96}
				to={264}
				stubs={[
					{ at: 96, to: 136, flow: "study" },
					{ at: 264, to: 136, flow: "study" },
					{ at: 176, to: 184, arrow: true, flow: "study" },
				]}
				kind="change"
				flow="study"
				defs={id}
			/>
			<Label x={24} y={168} text="freeze" size={10} />
			<Packet points={publicPath} kind="change" dur={2.2} flow="study" />
			<Packet points={privatePath} kind="change" dur={2.2} delay={-1.1} flow="study" />

			<Node x={88} y={184} w={176} h={64} label="strategy spec" sub="two modes" icon="doc" flow="study" />
			<Connector points={specToCore} defs={id} kind="request" flow="study" />
			<Label x={192} y={296} text="run" size={10} />
			<Packet points={specToCore} kind="request" dur={1.6} flow="study" />

			<Group x={24} y={288} w={312} h={416} title="SHARED BACKTEST CORE" flow="study" accent />
			<Node x={48} y={336} w={256} h={64} label="native simulation" sub="events + portfolios" icon="tool" flow="study" accent />
			<Node x={48} y={456} w={120} h={56} label="no peeking" size={12} flow="study" />
			<Node x={184} y={456} w={128} h={56} label="named costs" size={12} flow="study" />
			<Node x={48} y={552} w={120} h={56} label="gross benchmark" size={11} flow="study" />
			<Node x={184} y={552} w={128} h={56} label="calendar DSR" size={11} flow="study" />
			<Node x={112} y={616} w={128} h={56} label="sealed holdout" size={11} flow="study" />

			<Connector points={coreToEvidence} defs={id} kind="response" flow="study" />
			<Label x={192} y={736} text="report" size={10} />
			<Packet points={coreToEvidence} kind="response" dur={1.6} flow="study" />
			<Node x={72} y={752} w={208} h={64} label="evidence report" sub="one path" icon="doc" flow="study" />

			<Connector points={evidenceToPaper} defs={id} kind="accent" flow="study" />
			<Label x={192} y={848} text="paper" size={10} accent />
			<Packet points={evidenceToPaper} kind="accent" dur={1.4} flow="study" />
			<Node x={72} y={864} w={208} h={64} label="paper book" sub="paper only" icon="chart" flow="study" accent />
		</>
	);
}
