import { Badge, Defs, Group, Label, Line, Node } from "./primitives";

export const CLAIM =
	"One multi-tenant Next.js app sits between the customer's document sources and three model providers, with Postgres and pgvector as the only store, QStash workers running ingest off the request path, and evaluation and tracing beside the request path.";

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

export function Wide({ accent, id = "carch-w" }) {
	return (
		<svg
			viewBox="0 0 1200 792"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			{/* ---------- sources ---------- */}
			<Group x={40} y={64} w={256} h={368} title="SOURCES" />
			<Node
				x={64}
				y={112}
				w={208}
				h={64}
				label="Lark / Feishu"
				sub="OAuth · MCP"
				size={14}
				subSize={11}
			/>
			<Node
				x={64}
				y={224}
				w={208}
				h={64}
				label="Google Drive"
				sub="OAuth"
				size={14}
				subSize={11}
			/>
			<Node
				x={64}
				y={336}
				w={208}
				h={64}
				label="Direct upload"
				sub="browser"
				size={14}
				subSize={11}
			/>

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
				subSize={11}
			/>
			<Badge cx={384} cy={112} text="1" accent={accent} />
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
				subSize={10}
			/>
			<Node
				x={384}
				y={224}
				w={160}
				h={64}
				label="RAG search"
				sub="9 tools · spotlighting"
				size={13}
				subSize={10}
			/>
			<Badge cx={384} cy={224} text="2" accent={accent} />
			<Node
				x={568}
				y={224}
				w={160}
				h={64}
				label="Answer + citations"
				sub="score per chunk"
				size={13}
				subSize={11}
			/>
			<Badge cx={568} cy={224} text="5" accent={accent} />
			<Node
				x={752}
				y={224}
				w={160}
				h={64}
				label="Model gateway"
				sub="9 models"
				size={13}
				subSize={11}
			/>
			<Badge cx={752} cy={224} text="4" accent={accent} />
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
			<Group x={1000} y={64} w={160} h={368} title="PROVIDERS" />
			<Node x={1016} y={112} w={128} h={56} label="OpenAI" sub="embed · llm" size={13} subSize={10} />
			<Node x={1016} y={192} w={128} h={56} label="Anthropic" sub="llm" size={13} subSize={10} />
			<Node x={1016} y={272} w={128} h={56} label="Google" sub="llm" size={13} subSize={10} />
			<Node x={1016} y={352} w={128} h={56} label="LlamaParse" sub="extraction" size={13} subSize={10} />

			{/* ---------- async ---------- */}
			<Group
				x={40}
				y={496}
				w={544}
				h={208}
				title="ASYNC · QSTASH WORKERS · OFF THE REQUEST PATH"
			/>
			{STAGES.map(([label, letter, param], i) => (
				<g key={label}>
					<Node x={64 + i * 104} y={584} w={80} h={64} label={label} size={13} />
					<Badge cx={64 + i * 104} cy={584} text={letter} />
					<text
						x={104 + i * 104}
						y={668}
						textAnchor="middle"
						fontSize="11"
						fontFamily="var(--font-mono)"
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
							y2={616}
						/>
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
				title="TENANT ID ON EVERY ROW · ROW-LEVEL SECURITY"
			/>
			<Node x={680} y={576} w={208} h={64} label="tenants" sub="users · roles" size={13} subSize={11} />
			<Node x={912} y={576} w={208} h={64} label="documents" sub="status" size={13} subSize={11} />
			<Node x={680} y={656} w={208} h={64} label="chunks" sub="+ embeddings" size={13} subSize={11} />
			<Badge cx={680} cy={656} text="3" accent={accent} />
			<Node x={912} y={656} w={208} h={64} label="messages" sub="+ citations" size={13} subSize={11} />

			{/* ---------- wiring ---------- */}
			<Line id={id} x1={296} y1={256} x2={360} y2={256} />
			<Label x={328} y={248} text="oauth" anchor="middle" size={11} />

			<Line id={id} x1={936} y1={256} x2={1000} y2={256} accent={accent} />
			<Label x={968} y={248} text="llm call" anchor="middle" accent={accent} size={10} />

			<Line id={id} x1={680} y1={432} x2={680} y2={496} accent={accent} />
			<Label x={664} y={470} text="cosine · floor 0.35" anchor="end" accent={accent} size={11} />
			<Line id={id} x1={752} y1={496} x2={752} y2={432} accent={accent} />
			<Label x={764} y={470} text="chunks + scores" accent={accent} size={11} />

			<Line id={id} x1={448} y1={432} x2={448} y2={464} arrow={false} />
			<Line id={id} x1={448} y1={464} x2={104} y2={464} arrow={false} />
			<Label x={276} y={458} text="async · QStash" anchor="middle" size={11} />
			<Line id={id} x1={104} y1={464} x2={104} y2={584} />

			<Line id={id} x1={560} y1={616} x2={648} y2={616} />
			<Label x={604} y={608} text="chunks" anchor="middle" size={11} />
		</svg>
	);
}

// Mobile reads as one column: sources, the async pipeline, the store, the app,
// the providers — with the two request-path arrows between store and app.
export function Narrow({ accent }) {
	const id = "carch-n";
	const cell = (col, row, y0) => ({ x: col ? 184 : 44, y: y0 + row * 56 });
	return (
		<svg
			viewBox="0 0 360 1232"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Group x={20} y={24} w={320} h={156} title="SOURCES" titleSize={10} />
			<Node {...cell(0, 0, 56)} w={132} h={44} label="Lark / Feishu" sub="OAuth · MCP" size={12} subSize={10} />
			<Node {...cell(1, 0, 56)} w={132} h={44} label="Google Drive" sub="OAuth" size={12} subSize={10} />
			<Node {...cell(0, 1, 56)} w={132} h={44} label="Direct upload" sub="browser" size={12} subSize={10} />

			<Line id={id} x1={180} y1={180} x2={180} y2={228} />
			<Label x={190} y={208} text="async · QStash" size={10} />

			<Group x={20} y={228} w={320} h={212} title="ASYNC · QSTASH WORKERS" titleSize={10} />
			{STAGES.map(([label, letter, param], i) => {
				const pos = cell(i % 2, Math.floor(i / 2), 260);
				return (
					<g key={label}>
						<Node {...pos} w={132} h={44} label={label} sub={param} size={12} subSize={9} />
						<Badge cx={pos.x} cy={pos.y} text={letter} r={8} />
					</g>
				);
			})}

			<Line id={id} x1={180} y1={440} x2={180} y2={488} />
			<Label x={190} y={468} text="chunks + vectors" size={10} />

			<Group x={20} y={488} w={320} h={200} title="POSTGRES · PGVECTOR" titleSize={10} />
			<Group
				x={32}
				y={520}
				w={296}
				h={144}
				title="TENANT ID ON EVERY ROW · ROW-LEVEL SECURITY"
				titleSize={9}
			/>
			<Node {...cell(0, 0, 548)} w={132} h={44} label="tenants" sub="users · roles" size={12} subSize={9} />
			<Node {...cell(1, 0, 548)} w={132} h={44} label="documents" sub="status" size={12} subSize={9} />
			<Node {...cell(0, 1, 548)} w={132} h={44} label="chunks" sub="+ embeddings" size={12} subSize={9} />
			<Badge cx={44} cy={604} text="3" accent={accent} r={8} />
			<Node {...cell(1, 1, 548)} w={132} h={44} label="messages" sub="+ citations" size={12} subSize={9} />

			<Line id={id} x1={100} y1={736} x2={100} y2={688} accent={accent} />
			<Label x={92} y={716} text="floor 0.35" anchor="end" accent={accent} size={10} />
			<Line id={id} x1={260} y1={688} x2={260} y2={736} accent={accent} />
			<Label x={270} y={716} text="chunks" accent={accent} size={10} />

			<Group x={20} y={736} w={320} h={268} title="APP · MULTI-TENANT" titleSize={10} />
			<Node {...cell(0, 0, 768)} w={132} h={44} label="Domain agents" size={12} />
			<Badge cx={44} cy={768} text="1" accent={accent} r={8} />
			<Node {...cell(1, 0, 768)} w={132} h={44} label="Admin · RBAC" size={12} />
			<Node {...cell(0, 1, 768)} w={132} h={44} label="RAG search" sub="spotlighting" size={12} subSize={9} />
			<Badge cx={44} cy={824} text="2" accent={accent} r={8} />
			<Node {...cell(1, 1, 768)} w={132} h={44} label="Model gateway" size={12} />
			<Badge cx={184} cy={824} text="4" accent={accent} r={8} />
			<Node {...cell(0, 2, 768)} w={132} h={44} label="Answer + cites" size={12} />
			<Badge cx={44} cy={880} text="5" accent={accent} r={8} />
			<Node {...cell(1, 2, 768)} w={132} h={44} label="Job status" size={12} />
			<Node
				x={44}
				y={936}
				w={272}
				h={44}
				label="Eval + traces"
				sub="golden set · CI gate · cost/tenant"
				size={12}
				subSize={9}
			/>

			<Line id={id} x1={180} y1={1004} x2={180} y2={1052} accent={accent} />
			<Label x={190} y={1032} text="llm call" accent={accent} size={10} />

			<Group x={20} y={1052} w={320} h={156} title="MODEL PROVIDERS" titleSize={10} />
			<Node {...cell(0, 0, 1084)} w={132} h={44} label="OpenAI" sub="embeddings" size={12} subSize={9} />
			<Node {...cell(1, 0, 1084)} w={132} h={44} label="Anthropic" sub="llm" size={12} subSize={9} />
			<Node {...cell(0, 1, 1084)} w={132} h={44} label="Google" sub="llm" size={12} subSize={9} />
			<Node {...cell(1, 1, 1084)} w={132} h={44} label="LlamaParse" sub="extraction" size={12} subSize={9} />
		</svg>
	);
}

