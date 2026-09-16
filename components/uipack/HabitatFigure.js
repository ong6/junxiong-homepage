import { Connector, Defs, Figure, Group, Label, Lane, Node, Packet, anchor, route } from "uipack";

// The overview figure from OpenAI's Habitat post, redrawn with uipack. Ported
// from the library's examples/Habitat.tsx so the page shows the reference the
// library was built to reach.

const CLIENTS = [
	["ChatGPT", "client"],
	["API", "service"],
	["Codex", "agent"],
	["Internal services", "queue"],
	["And more", "more"],
];

const PLATFORM = [
	["Caching", "Caches"],
	["ACL policies", "Authorization"],
	["Placement & residency", "Data residency"],
	["Encryption", "Data security"],
	["Isolation", "Multi-tenancy"],
	["Rate limiting", "Request shaping"],
];

const STORES = [
	["Azure Cosmos DB", "Online storage", "db"],
	["Nanobase", "Online storage", "db"],
	["Valkey", "Caches", "cache"],
	["Blob storage", "Storage resources", "blob"],
];

const SINKS = ["Databricks", "Rockset", "Kafka", "And more"];

const ID = "habitat";

export function HabitatWide() {
	const platform = { x: 328, y: 64, w: 600, h: 272 };
	const busX = 232;
	const storeBusX = 1000;
	const cdc = { x: 528, y: 384, w: 200, h: 56 };

	const clientPaths = CLIENTS.map((_, i) => {
		const box = { x: 24, y: 96 + i * 56, w: 176, h: 40 };
		return route(anchor(box, "right"), [busX, anchor(box, "right")[1]], "h");
	});
	const bus = [
		[busX, 116],
		[busX, 116 + 4 * 56],
	];
	const toPlatform = [
		[busX, 200],
		[platform.x, 200],
	];
	const toStores = [
		[platform.x + platform.w, 200],
		[storeBusX, 200],
	];
	const storePaths = STORES.map((_, i) => {
		const box = { x: 1024, y: 96 + i * 64, w: 200, h: 48 };
		return [[storeBusX, anchor(box, "left")[1]], anchor(box, "left")];
	});
	const storeBus = [
		[storeBusX, 120],
		[storeBusX, 120 + 3 * 64],
	];
	const cdcPath = [
		[platform.x + platform.w / 2, platform.y + platform.h],
		[cdc.x + cdc.w / 2, cdc.y],
	];
	const sinkPaths = SINKS.map((_, i) => {
		const x = 392 + i * 152 + 64;
		return route([cdc.x + cdc.w / 2, cdc.y + cdc.h], [x, 480], "v", "v");
	});

	return (
		<>
			<Defs id={ID} />
			<Lane x={24} w={176} y={44} title="Clients" size={14} />
			<Lane x={328} w={600} y={44} title="Online storage platform" size={14} />
			<Lane x={1024} w={200} y={44} title="Storage resources" size={14} />

			{CLIENTS.map(([label, icon], i) => (
				<Node key={label} x={24} y={96 + i * 56} w={176} h={40} label={label} icon={icon} size={15} />
			))}

			<Group {...platform} title="Habitat">
				{PLATFORM.map(([label, sub], i) => (
					<Node
						key={label}
						x={platform.x + 24 + (i % 3) * 192}
						y={platform.y + 44 + Math.floor(i / 3) * 72}
						w={168}
						h={56}
						label={label}
						sub={sub}
						align="left"
						size={14}
						subSize={13.5}
					/>
				))}
				<Node x={platform.x + 24} y={platform.y + 188} w={552} h={56} label="Routing" sub="Schema lookup · Data residency" align="left" size={15} subSize={13.5} />
			</Group>

			{STORES.map(([label, sub, icon], i) => (
				<Node key={label} x={1024} y={96 + i * 64} w={200} h={48} label={label} sub={sub} icon={icon} size={15} subSize={13.5} />
			))}

			{clientPaths.map((p, i) => (
				<Connector key={i} points={p} defs={ID} arrow="both" />
			))}
			<Connector points={bus} defs={ID} arrow={false} />
			<Connector points={toPlatform} defs={ID} arrow="both" />
			<Connector points={toStores} defs={ID} arrow="both" />
			<Connector points={storeBus} defs={ID} arrow={false} />
			{storePaths.map((p, i) => (
				<Connector key={i} points={p} defs={ID} arrow="both" />
			))}

			<Packet points={toPlatform} kind="request" dur={2.4} />
			<Packet points={toPlatform} kind="request" dur={2.4} delay={-1.2} />
			<Packet points={toPlatform} kind="response" dur={2.4} delay={-0.6} reverse />
			<Packet points={toStores} kind="request" dur={2.4} delay={-0.3} />
			<Packet points={toStores} kind="response" dur={2.4} delay={-1.5} reverse />
			{clientPaths.map((p, i) => (
				<Packet key={i} points={p} kind={i % 2 ? "response" : "request"} dur={1.6} delay={-i * 0.4} reverse={i % 2 === 1} r={4} />
			))}
			{storePaths.map((p, i) => (
				<Packet key={i} points={p} kind={i % 2 ? "request" : "response"} dur={1.6} delay={-i * 0.5} reverse={i % 2 === 0} r={4} />
			))}

			<Connector points={cdcPath} defs={ID} kind="change" />
			<Packet points={cdcPath} kind="change" dur={2} />
			<Node {...cdc} label="CDC Services" sub="Change Data Capture" icon="queue" size={15} subSize={13.5} />
			{sinkPaths.map((p, i) => (
				<Connector key={i} points={p} defs={ID} kind="change" />
			))}
			{sinkPaths.map((p, i) => (
				<Packet key={i} points={p} kind="change" dur={2.2} delay={-i * 0.55} />
			))}
			{SINKS.map((label, i) => (
				<Node key={label} x={392 + i * 152} y={480} w={128} h={40} label={label} icon={i === 3 ? "more" : "service"} size={15} />
			))}
			<Label x={platform.x + platform.w / 2 + 10} y={platform.y + platform.h + 28} text="changes" size={14} />
		</>
	);
}

export function HabitatNarrow() {
	const platform = { x: 16, y: 232, w: 328, h: 168 };
	const down = [
		[180, 200],
		[180, 232],
	];
	const toStore = [
		[180, 400],
		[180, 432],
	];
	return (
		<>
			<Defs id={`${ID}-n`} />
			<Lane x={16} w={328} y={20} title="Clients" />
			{CLIENTS.slice(0, 4).map(([label, icon], i) => (
				<Node key={label} x={16 + (i % 2) * 168} y={40 + Math.floor(i / 2) * 56} w={160} h={40} label={label} icon={icon} size={13} />
			))}
			<Connector points={down} defs={`${ID}-n`} arrow="both" />
			<Packet points={down} kind="request" dur={1.6} />
			<Packet points={down} kind="response" dur={1.6} delay={-0.8} reverse />
			<Group {...platform} title="Habitat">
				{PLATFORM.slice(0, 4).map(([label], i) => (
					<Node key={label} x={platform.x + 16 + (i % 2) * 152} y={platform.y + 40 + Math.floor(i / 2) * 56} w={136} h={40} label={label} size={12} />
				))}
			</Group>
			<Connector points={toStore} defs={`${ID}-n`} arrow="both" />
			<Packet points={toStore} kind="request" dur={1.6} delay={-0.4} />
			<Lane x={16} w={328} y={452} title="Storage" />
			{STORES.slice(0, 2).map(([label, sub, icon], i) => (
				<Node key={label} x={16 + i * 168} y={464} w={160} h={48} label={label} sub={sub} icon={icon} size={12} subSize={10} />
			))}
		</>
	);
}

export default function HabitatFigure() {
	return (
		<Figure
			number="Figure 01"
			eyebrow="The reference"
			title="OpenAI's Habitat overview, redrawn"
			caption="The figure the library was built to reach: three lanes, one boxed platform, a change-data-capture row, packets on every path. Every part here is a uipack component."
			legend={[
				{ label: "Request", kind: "request" },
				{ label: "Response", kind: "response" },
				{ label: "Changes (CDC)", kind: "change" },
			]}
			viewBox="0 0 1248 544"
			narrow={<HabitatNarrow />}
			narrowViewBox="0 0 360 528"
			alt="Clients on the left call Habitat, a boxed platform of caching, ACL, placement, encryption, isolation, rate limiting and routing, which reads and writes four storage resources on the right; a change-data-capture service under the platform fans out to Databricks, Rockset and Kafka.">
			<HabitatWide />
		</Figure>
	);
}
