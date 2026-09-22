import { Badge, Defs, Flow, Group, Label, Lane, Line, Node, Packet } from "./parts";

export const CLAIM =
	"One multi-tenant Next.js app sits between the customer's document sources and three model providers, with Postgres and pgvector as the only store, QStash workers running ingest off the request path, and evaluation and tracing beside the request path.";

export const meta = {
	number: "Figure 03",
	eyebrow: "The whole system",
	title: "One request path, one store, ingest off to the side",
	caption:
		"A question walks agent, retrieval, pgvector, gateway and cited answer inside one request. Ingest runs on QStash workers and lands in the same Postgres.",
	legend: [
		{ label: "Request", kind: "request" },
		{ label: "Response", kind: "response" },
		{ label: "Ingest", kind: "change" },
	],
	viewBox: "0 0 1200 792",
};


// Claim: one multi-tenant Next.js app sits between the customer's document
// sources and three model providers, with Postgres/pgvector as the only store,
// QStash workers doing ingest off the request path, and evaluation and tracing
// beside the request path.
//
// Accent follows the request path (1-5); ingest (A-E) stays in currentColor so
// the two paths never read as one. 8px grid throughout.

const STAGES = [
	["Download", "A", "source api"],
	["Extract", "B", "LlamaParse"],
	["Chunk", "C", "~1000 chars"],
	["Embed", "D", "1536-dim"],
	["Store", "E", "to pgvector"],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- sources ---------- */}
			<Group x={40} y={64} w={256} h={368} title="SOURCES" flow="ingest" />
			<Node
				x={64}
				y={112}
				w={208}
				h={64}
				label="Lark / Feishu"
				sub="OAuth · MCP"
				size={14}
				subSize={11} flow="ingest" />
			<Node
				x={64}
				y={224}
				w={208}
				h={64}
				label="Google Drive"
				sub="OAuth"
				size={14}
				subSize={11} flow="ingest" />
			<Node
				x={64}
				y={336}
				w={208}
				h={64}
				label="Direct upload"
				sub="browser"
				size={14}
				subSize={11} flow="ingest" />

			{/* ---------- app: 3 columns, with eval spanning the last row ---------- */}
			<Group x={360} y={64} w={576} h={368} title="APP · ONE CODEBASE, MULTI-TENANT" />
			<Node
				x={384}
				y={112}
				w={160}
				h={64}
				label="Domain agents"
				sub="4 · tenant-gated"
				size={13}
				subSize={11} flow="request" />
			<Badge cx={384} cy={112} text="1" accent />
			<Node
				x={568}
				y={112}
				w={160}
				h={64}
				label="Admin portal"
				sub="RBAC · 3 roles"
				size={13}
				subSize={11}
			/>
			<Node
				x={752}
				y={112}
				w={160}
				h={64}
				label="Job status"
				sub="queued/failed/DLQ"
				size={13}
				subSize={10} flow="ingest" />
			<Node
				x={384}
				y={224}
				w={160}
				h={64}
				label="RAG search"
				sub="9 tools · spotlight"
				size={13}
				subSize={10} flow="request" />
			<Badge cx={384} cy={224} text="2" accent />
			<Node
				x={568}
				y={224}
				w={160}
				h={64}
				label="Answer + citations"
				sub="score per chunk"
				size={13}
				subSize={11} flow="request" />
			<Badge cx={568} cy={224} text="5" accent />
			<Node
				x={752}
				y={224}
				w={160}
				h={64}
				label="Model gateway"
				sub="9 models"
				size={13}
				subSize={11} flow="request" />
			<Badge cx={752} cy={224} text="4" accent />
			<Node
				x={384}
				y={336}
				w={528}
				h={64}
				label="Eval + traces"
				sub="golden set · CI gate · cost/tenant"
				size={13}
				subSize={11}
			/>

			{/* ---------- providers ---------- */}
			<Group x={1000} y={64} w={160} h={368} title="PROVIDERS" flow="request" />
			<Node x={1016} y={112} w={128} h={56} label="OpenAI" sub="embed · llm" size={13} subSize={10} flow={["request", "ingest"]} />
			<Node x={1016} y={192} w={128} h={56} label="Anthropic" sub="llm" size={13} subSize={10} flow="request" />
			<Node x={1016} y={272} w={128} h={56} label="Google" sub="llm" size={13} subSize={10} flow="request" />
			<Node x={1016} y={352} w={128} h={56} label="LlamaParse" sub="extraction" size={13} subSize={10} flow="ingest" />

			{/* ---------- async ---------- */}
			<Group
				x={40}
				y={496}
				w={544}
				h={208}
				title="ASYNC · QSTASH WORKERS · OFF THE REQUEST PATH" flow="ingest" />
			{STAGES.map(([label, letter, param], i) => (
				<g key={label}>
					<Node x={64 + i * 104} y={584} w={80} h={64} label={label} size={13} flow="ingest" />
					<Badge cx={64 + i * 104} cy={584} text={letter} />
					<text
						x={104 + i * 104}
						y={668}
						textAnchor="middle"
						fontSize="13"
						fontFamily="var(--uipack-mono)"
						fill="currentColor"
						fillOpacity="0.7">
						{param}
					</text>
					{i < 4 ? (
						<Line
							id={id}
							x1={144 + i * 104}
							y1={616}
							x2={168 + i * 104}
							y2={616} flow="ingest" />
					) : null}
				</g>
			))}

			{/* ---------- data ---------- */}
			<Group x={648} y={496} w={512} h={264} title="POSTGRES · PGVECTOR — THE ONLY STORE" />
			<Group
				x={672}
				y={532}
				w={464}
				h={204}
				title="TENANT ID ON EVERY ROW · RLS"
			/>
			<Node x={680} y={576} w={208} h={64} label="tenants" sub="users · roles" size={13} subSize={11} />
			<Node x={912} y={576} w={208} h={64} label="documents" sub="status" size={13} subSize={11} flow="ingest" />
			<Node x={680} y={656} w={208} h={64} label="chunks" sub="+ embeddings" size={13} subSize={11} flow={["request", "ingest"]} />
			<Badge cx={680} cy={656} text="3" accent />
			<Node x={912} y={656} w={208} h={64} label="messages" sub="+ citations" size={13} subSize={11} />

			{/* ---------- wiring ---------- */}
			<Line id={id} x1={296} y1={256} x2={360} y2={256} flow="ingest" />
			<Label x={328} y={248} text="oauth" anchor="middle" size={11} />

			<Line id={id} x1={936} y1={256} x2={1000} y2={256} accent flow="request" />
			<Label x={968} y={248} text="llm call" anchor="middle" accent size={10} />

			<Line id={id} x1={680} y1={432} x2={680} y2={496} accent flow="request" />
			<Label x={664} y={470} text="cosine · floor 0.35" anchor="end" accent size={11} />
			<Line id={id} x1={752} y1={496} x2={752} y2={432} accent flow="request" />
			<Label x={764} y={470} text="chunks + scores" accent size={11} />

			<Line id={id} x1={448} y1={432} x2={448} y2={464} arrow={false} flow="ingest" />
			<Line id={id} x1={448} y1={464} x2={104} y2={464} arrow={false} flow="ingest" />
			<Label x={276} y={458} text="async · QStash" anchor="middle" size={11} />
			<Line id={id} x1={104} y1={464} x2={104} y2={584} flow="ingest" />

			<Line id={id} x1={560} y1={616} x2={648} y2={616} flow="ingest" />
			<Label x={604} y={608} text="chunks" anchor="middle" size={11} />

			{/* ---------- lanes + packets ---------- */}
			<Lane x={40} w={256} y={40} title="Sources" />
			<Lane x={360} w={576} y={40} title="App" />
			<Lane x={1000} w={160} y={40} title="Providers" />
			<Flow x1={296} y1={256} x2={360} y2={256} kind="change" dur={1.8} flow="ingest" />
			<Flow x1={936} y1={256} x2={1000} y2={256} kind="request" dur={1.6} flow="request" />
			<Flow x1={936} y1={256} x2={1000} y2={256} kind="response" dur={1.6} delay={-0.8} reverse flow="request" />
			<Flow x1={680} y1={432} x2={680} y2={496} kind="request" dur={1.6} flow="request" />
			<Flow x1={752} y1={496} x2={752} y2={432} kind="response" dur={1.6} delay={-0.8} flow="request" />
			<Packet
				points={[
					[448, 432],
					[448, 464],
					[104, 464],
					[104, 584],
				]}
				kind="change"
				dur={3.2}
				r={4.5}
				flow="ingest"
			/>
			{STAGES.slice(0, 4).map(([label], i) => (
				<Flow key={label} x1={144 + i * 104} y1={616} x2={168 + i * 104} y2={616} kind="change" dur={1.2} delay={-i * 0.3} flow="ingest" />
			))}
			<Flow x1={560} y1={616} x2={648} y2={616} kind="change" dur={1.6} flow="ingest" />
		</>
	);
}
