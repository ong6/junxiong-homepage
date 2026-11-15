import { Bus, Chip, Connector, Defs, Group, Label, Lane, Node, Packet } from "uipack";

// The home lab at the rough level the page describes. Every box and hint uses
// only the facts cleared for the page (the owner's brief, 2026-11-16): two
// sides, the pieces named generically, the open-source software, the rules and
// what runs today. Dashed outlines are planned; solid ones exist or run today.
export const CLAIM =
	"A plan for the home lab. Family phones and the TV reach only the family apps, which sit in their own zone, through one front door. My phone reaches everything over the private network, a mesh VPN. A small server runs the services in Proxmox virtual machines: the family apps (Immich, Jellyfin, Open WebUI), Home Assistant, my personal apps (Forgejo, Coolify, a status dashboard) and LiteLLM, the model router. The router sends my coding agents to local models on the Mac Studio first and to a cloud model as the fallback. A storage box only stores. Dashed outlines are planned; the private network and the agent, which runs on a laptop today, are running.";

export const meta = {
	number: "Figure 01",
	eyebrow: "The plan · home lab",
	title: "Who reaches what, and where it runs",
	caption:
		"Family devices reach only the family apps, through one front door; my phone reaches everything over the private network. Dashed outlines are planned.",
	legend: [
		{ label: "Request", kind: "request" },
		{ label: "Response", kind: "response" },
	],
	viewBox: "0 0 1120 624",
};

// 8px grid. Columns: who 40–200, way in (chips) centred on 280, small server
// 448–760 (nodes 472–736), storage and models 832–1080, model bus at 792.
const WHO_X = 40;
const WHO_W = 160;
const SERVER = { x: 448, y: 88, w: 312, h: 424 };
const APP_X = 472;
const APP_W = 264;
const RIGHT_X = 832;
const RIGHT_W = 248;
const TRUNK = 792;
const MAC = { x: RIGHT_X, y: 256, w: RIGHT_W, h: 232 };

// Row centres.
const FAMILY_Y = 164;
const MINE_Y = 308;
const MODELS_Y = 452;
const LOCAL_Y = 332;
const CLOUD_Y = 548;

const FAMILY = [
	[WHO_X + WHO_W, FAMILY_Y],
	[APP_X, FAMILY_Y],
];
const MINE = [
	[WHO_X + WHO_W, MINE_Y],
	[SERVER.x, MINE_Y],
];
const MODEL_CALLS = [
	[WHO_X + WHO_W, MODELS_Y],
	[APP_X, MODELS_Y],
];
const TO_STORAGE = [
	[SERVER.x + SERVER.w, FAMILY_Y],
	[RIGHT_X, FAMILY_Y],
];
const MAC_TO_STORAGE = [
	[960, MAC.y],
	[960, 200],
];

// [label, sub, icon, hint, row y]
const APPS = [
	[
		"Family apps",
		"Immich · Jellyfin · Open WebUI",
		"browser",
		"Immich for photos, Jellyfin for films and shows and Open WebUI for the shared AI chat will run in their own isolated machine.",
		128,
		"family",
	],
	["Home Assistant", "home automation", "service", "Home Assistant will run the home automation.", 224, "mine"],
	[
		"Personal apps",
		"Forgejo · Coolify · status",
		"git",
		"Forgejo for private git, Coolify to host my own small apps, and a status dashboard; public repos stay on GitHub.",
		320,
		"mine",
	],
	["Model router", "LiteLLM", "gateway", "LiteLLM will route local or cloud models into my coding agents.", 416, "models"],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			<Lane x={WHO_X} w={WHO_W} y={40} title="Who" />
			<Lane x={216} w={128} y={40} title="Way in" />
			<Lane x={SERVER.x} w={SERVER.w} y={40} title="Services" />
			<Lane x={RIGHT_X} w={RIGHT_W} y={40} title="Storage and models" />

			{/* Who reaches the lab. */}
			<Node
				x={WHO_X}
				y={128}
				w={WHO_W}
				h={72}
				label="Family devices"
				sub="phones · TV"
				icon="phone"
				flow="family"
				hint="My family use their own phones and the TV, with nothing extra to install."
			/>
			<Node
				x={WHO_X}
				y={272}
				w={WHO_W}
				h={72}
				label="My phone"
				sub="personal side"
				icon="phone"
				flow="mine"
				hint="My phone reaches every service; only I reach the personal side."
			/>
			<Node
				x={WHO_X}
				y={416}
				w={WHO_W}
				h={72}
				label="Coding agents"
				sub="my tools"
				icon="terminal"
				flow="models"
				hint="My coding agents will get their models through the router."
			/>

			{/* The small server: one always-on machine running virtual machines. */}
			<Group
				{...SERVER}
				variant="dashed"
				titleSize={11}
				title="SMALL SERVER · PROXMOX · PLANNED"
				flow={["family", "mine", "models", "storage"]}
				hint="One small, low-power, always-on server, on hand, with its Proxmox virtual machines still planned."
			/>
			{APPS.map(([label, sub, icon, hint, y, flow]) => (
				<Node key={label} x={APP_X} y={y} w={APP_W} h={72} label={label} sub={sub} icon={icon} dashed flow={flow} hint={hint} />
			))}

			{/* The two ways in. */}
			<Connector points={FAMILY} defs={id} flow="family" />
			<Label x={388} y={FAMILY_Y - 8} text="family zone" anchor="middle" size={11} />
			<Connector points={MINE} defs={id} flow="mine" />
			<Label x={396} y={MINE_Y - 8} text="everything" anchor="middle" size={11} />
			<Connector points={MODEL_CALLS} defs={id} flow="models" />
			<Label x={304} y={MODELS_Y - 8} text="model calls" anchor="middle" size={11} />

			{/* Storage: it stores and runs no apps. */}
			<Node
				x={RIGHT_X}
				y={128}
				w={RIGHT_W}
				h={72}
				label="Storage box"
				sub="stores only · no apps"
				icon="db"
				dashed
				flow="storage"
				hint="It will store and run no apps."
			/>
			<Connector points={TO_STORAGE} defs={id} flow="storage" />
			<Label x={796} y={FAMILY_Y - 8} text="shares" anchor="middle" size={11} />

			{/* The Mac Studio: local models and, once it arrives, the agent. */}
			<Group
				{...MAC}
				variant="dashed"
				titleSize={11}
				title="MAC STUDIO · ON ORDER"
				flow={["models", "storage"]}
				hint="A Mac Studio on my desk for local models and the agent, reaching only the shares and ports it needs."
			/>
			<Node
				x={856}
				y={296}
				w={200}
				h={72}
				label="Local models"
				sub="tried first"
				icon="model"
				dashed
				flow="models"
				hint="Local models come first; the Mac Studio that runs them is on order."
			/>
			<Node
				x={856}
				y={392}
				w={200}
				h={72}
				label="Agent"
				sub="on a laptop today"
				icon="agent"
				hint="The always-on agent I message from my phone, on a laptop until the Mac Studio arrives."
			/>
			<Connector points={MAC_TO_STORAGE} defs={id} flow="storage" />
			<Label x={972} y={232} text="only its shares" anchor="start" size={11} />

			<Node
				x={RIGHT_X}
				y={512}
				w={RIGHT_W}
				h={72}
				label="Cloud model"
				sub="fallback"
				icon="cloud"
				flow="models"
				hint="A cloud model is the fallback behind the local models."
			/>
			<Bus
				at={TRUNK}
				from={LOCAL_Y}
				to={CLOUD_Y}
				defs={id}
				flow="models"
				stubs={[
					{ at: MODELS_Y, to: APP_X + APP_W },
					{ at: LOCAL_Y, to: 856, arrow: true },
					{ at: CLOUD_Y, to: RIGHT_X, arrow: true },
				]}
			/>

			{/* Packets on the two ways in; they pass under the chips. */}
			<Packet points={FAMILY} kind="request" dur={2.6} flow="family" />
			<Packet points={FAMILY} kind="response" dur={2.6} delay={-1.3} reverse flow="family" />
			<Packet points={MINE} kind="request" dur={2.4} delay={-0.6} flow="mine" />
			<Packet points={MINE} kind="response" dur={2.4} delay={-1.8} reverse flow="mine" />

			<Chip
				x={232}
				y={FAMILY_Y - 16}
				w={96}
				h={32}
				label="Front door"
				dashed
				flow="family"
				hint="The family side's one way in from their phones and the TV, planned."
			/>
			<Chip
				x={216}
				y={MINE_Y - 16}
				w={128}
				h={32}
				label="Private network"
				flow="mine"
				hint="A mesh VPN between my devices, running since November 2026."
			/>

			{/* Key: what is planned and what runs. */}
			<Chip x={WHO_X} y={536} w={88} h={32} label="Planned" dashed hint="Dashed: planned, not set up yet." />
			<Chip x={WHO_X + 104} y={536} w={128} h={32} label="Running today" hint="Solid: exists or runs today." />
		</>
	);
}
