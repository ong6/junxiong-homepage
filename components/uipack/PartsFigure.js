import { Chip, Connector, Defs, Figure, Group, Label, Lane, Node, Packet, Token, icons, pointAlong, route } from "uipack";
import { Badge, Floor } from "../diagrams/parts";

// Every component once, on the 8px grid. `id`s on the first connector and
// packet are what the browser tests sample.

const names = Object.keys(icons);

export default function PartsFigure() {
	const a = route([120, 60], [360, 140], "h");
	const b = route([120, 140], [360, 60], 240, "h");
	const c = route([440, 40], [600, 160], "v");
	const d = [
		[280, 220],
		[640, 220],
	];
	return (
		<Figure
			number="Figure 02"
			eyebrow="Every part"
			title="Nodes, groups, chips, connectors, packets"
			caption="One of each. Connectors are orthogonal polylines with rounded corners and take a token kind for colour; packets ride the same points."
			legend={[
				{ label: "Request", kind: "request" },
				{ label: "Response", kind: "response" },
				{ label: "Change", kind: "change" },
				{ label: "Neutral", kind: "neutral" },
			]}
			viewBox="0 0 1120 360"
			alt="A sampler of every uipack component: four node variants, three connector kinds with packets, a solid group of chips, a dashed boundary, and the icon set.">
			<Floor min={12}>
			<Defs id="parts" />
			<Lane x={0} w={260} y={20} title="Nodes" size={12} />
			<Node x={16} y={40} w={200} h={40} label="Plain" />
			<Node x={16} y={96} w={200} h={56} label="With sub" sub="mono second line" align="left" icon="service" subSize={12} />
			<Node x={16} y={168} w={200} h={40} label="Accent" accent />
			<Node x={16} y={224} w={200} h={40} label="Dashed" dashed />
			<Badge cx={216} cy={40} text="1" r={10} />
			<Badge cx={216} cy={168} text="A" accent r={10} />

			<Lane x={280} w={380} y={20} title="Connectors + packets" size={12} />
			<Connector points={a} defs="parts" kind="request" id="e2e-conn" />
			<Packet points={a} kind="request" dur={2} id="e2e-packet" />
			<Connector points={b} defs="parts" kind="response" dashed />
			<Packet points={b} kind="response" dur={2.5} delay={-1} />
			<Connector points={c} defs="parts" kind="change" arrow="both" />
			<Packet points={c} kind="change" dur={2} />
			<Packet points={c} kind="change" dur={2} delay={-1} reverse />
			<Connector points={d} defs="parts" />
			<Packet points={d} kind="neutral" dur={3} />
			<Label x={460} y={212} text="plain connector" anchor="middle" size={12} />
			<Label x={460} y={250} text="Label with underlay, sans" anchor="middle" font="sans" size={12} />

			<Lane x={700} w={400} y={20} title="Groups + chips" size={12} />
			<Group x={700} y={40} w={400} h={120} title="Solid group">
				<Chip x={716} y={80} w={72} label="A1" size={12} />
				<Chip x={796} y={80} w={72} label="B2" kind="request" size={12} />
				<Chip x={876} y={80} w={72} label="busy" kind="accent" size={12} />
				<Chip x={956} y={80} w={72} dashed />
				<Chip x={716} y={116} w={312} h={20} label="overloaded" kind="change" size={12} />
			</Group>
			<Group x={700} y={184} w={400} h={96} title="Dashed boundary" variant="dashed" accent titleSize={12}>
				<Node x={716} y={220} w={176} h={40} label="Inside" icon="agent" />
				<Node x={908} y={220} w={176} h={40} label="Tenant" icon="db" />
			</Group>

			<Lane x={0} w={260} y={300} title="Icons" size={12} />
			{names.map((n, i) => (
				<g
					key={n}
					transform={`translate(${16 + i * 36}, 316)`}
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round">
					{icons[n]}
				</g>
			))}
			</Floor>
		</Figure>
	);
}

// What a reduced-motion viewer sees: the same paths, one token each, parked
// at the midpoint, no controls. Drawn with Token + pointAlong so the page can
// show it without asking the browser to change its setting.
export function StaticFigure() {
	const a = route([40, 40], [300, 120], "h");
	const b = route([340, 120], [600, 40], "h");
	const [ax, ay] = pointAlong(a, 0.5);
	const [bx, by] = pointAlong(b, 0.5);
	return (
		<Figure
			number="Figure 03"
			eyebrow="Reduced motion"
			title="The same figure when the viewer asks for less motion"
			caption="Packets render once at the path midpoint and never move; Pause and Replay are hidden. Server rendering produces the same static frame, so nothing jumps on hydration."
			legend={[
				{ label: "Request", kind: "request" },
				{ label: "Response", kind: "response" },
			]}
			controls={false}
			viewBox="0 0 640 160"
			alt="Two connectors with one static token each at their midpoints.">
			<Defs id="static" />
			<Node x={16} y={20} w={120} h={40} label="Client" icon="client" />
			<Node x={504} y={100} w={120} h={40} label="Service" icon="service" />
			<Connector points={[[136, 40], [504, 120]]} defs="static" kind="request" />
			<Connector points={a} defs="static" arrow={false} dashed />
			<Connector points={b} defs="static" arrow={false} dashed />
			<Token kind="request" cx={ax} cy={ay} />
			<Token kind="response" cx={bx} cy={by} />
		</Figure>
	);
}
