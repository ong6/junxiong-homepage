import { Defs, Group, Label, Line, Node } from "./primitives";

export const CLAIM =
	"Documents are deduplicated by content hash, redacted, and moved through a checkpointed async pipeline into pgvector, with failures landing in a dead-letter queue the admin UI shows.";

// Claim: documents are deduplicated by content hash, redacted, and moved
// through a checkpointed async pipeline into pgvector — with failures landing
// in a dead-letter queue the admin UI shows.
//
// Accent marks the async region and the hop that hands work to it; the failure
// rail is a dashed currentColor exit with a ✕ on it.

const STAGES = [
	{ label: "Content hash", sub: "skip if seen", arrow: "new file" },
	{ label: "Download", arrow: "raw file" },
	{ label: "Extract", sub: "LlamaParse", arrow: "plain text" },
	{ label: "Redact PII", sub: "before chunking", arrow: "clean text" },
	{ label: "Chunk", arrow: "~1000 chars" },
	{ label: "Batch embed", sub: "cache by hash", arrow: "OpenAI · 1536-dim" },
	{ label: "Store" },
];

const Cross = ({ cx, cy, s = 5 }) => (
	<g stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.5">
		<line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} />
		<line x1={cx - s} y1={cy + s} x2={cx + s} y2={cy - s} />
	</g>
);

export function Wide({ accent, id = "cif-w" }) {
	const stages = STAGES.map((s, i) => ({ ...s, y: 336 + i * 88 }));
	return (
		<svg
			viewBox="0 0 720 1104"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Node
				x={40}
				y={32}
				w={312}
				h={72}
				label="Lark / Feishu"
				sub="OAuth · MCP: docs, wiki, sheets"
				subSize={11}
			/>
			<Node x={368} y={32} w={312} h={72} label="Google Drive" sub="OAuth" />
			<Line id={id} x1={196} y1={104} x2={196} y2={136} arrow={false} />
			<Line id={id} x1={524} y1={104} x2={524} y2={136} arrow={false} />
			<Line id={id} x1={196} y1={136} x2={524} y2={136} arrow={false} />
			<Line id={id} x1={360} y1={136} x2={360} y2={176} />
			<Label x={372} y={162} text="file selected" />

			<Node x={232} y={176} w={256} h={72} label="Ingest job" sub="status: queued" />
			<Line id={id} x1={360} y1={248} x2={360} y2={336} accent={accent} />
			<Label x={372} y={278} text="async · Upstash QStash" accent={accent} />

			<Group
				x={160}
				y={296}
				w={400}
				h={648}
				title="ASYNC · QSTASH JOB"
				accent={accent}
			/>

			{stages.map((s) => (
				<g key={s.label}>
					<Node x={184} y={s.y} w={352} h={56} label={s.label} sub={s.sub} />
					{s.arrow ? (
						<>
							<Line id={id} x1={360} y1={s.y + 56} x2={360} y2={s.y + 88} />
							<Label x={372} y={s.y + 78} text={s.arrow} size={11} />
						</>
					) : null}
					{/* every stage can drop out of the pipeline */}
					<Line
						id={id}
						x1={184}
						y1={s.y + 28}
						x2={136}
						y2={s.y + 28}
						arrow={false}
						dashed
					/>
				</g>
			))}

			<Line id={id} x1={136} y1={364} x2={136} y2={1000} dashed />
			<Label x={124} y={648} text="on failure" anchor="end" size={11} />
			<Cross cx={136} cy={672} />

			<Line id={id} x1={360} y1={920} x2={360} y2={1000} />
			<Label x={348} y={978} text="chunks + embeddings" anchor="end" size={11} />
			<Line id={id} x1={360} y1={972} x2={592} y2={972} arrow={false} />
			<Line id={id} x1={592} y1={972} x2={592} y2={1000} />
			<Label x={476} y={966} text="job complete" anchor="middle" size={11} />

			<Node
				x={40}
				y={1000}
				w={216}
				h={72}
				label="status: failed · DLQ"
				sub="retry from step"
				size={13}
				subSize={11}
			/>
			<Node
				x={296}
				y={1000}
				w={176}
				h={72}
				label="Postgres · pgvector"
				sub="chunks + vectors"
				size={13}
				subSize={11}
			/>
			<Node
				x={504}
				y={1000}
				w={176}
				h={72}
				label="status: ready"
				sub="shown in the UI"
				size={13}
				subSize={11}
			/>
		</svg>
	);
}

export function Narrow({ accent }) {
	const id = "cif-n";
	const stages = STAGES.map((s, i) => ({ ...s, y: 288 + i * 80 }));
	return (
		<svg
			viewBox="0 0 360 1032"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Node
				x={60}
				y={24}
				w={136}
				h={64}
				label="Lark / Feishu"
				sub="OAuth · MCP"
				size={13}
				subSize={10}
			/>
			<Node
				x={204}
				y={24}
				w={136}
				h={64}
				label="Google Drive"
				sub="OAuth"
				size={13}
				subSize={10}
			/>
			<Line id={id} x1={128} y1={88} x2={128} y2={112} arrow={false} />
			<Line id={id} x1={272} y1={88} x2={272} y2={112} arrow={false} />
			<Line id={id} x1={128} y1={112} x2={272} y2={112} arrow={false} />
			<Line id={id} x1={200} y1={112} x2={200} y2={144} />
			<Label x={210} y={134} text="file selected" size={10} />

			<Node
				x={60}
				y={144}
				w={280}
				h={64}
				label="Ingest job"
				sub="status: queued"
				size={14}
				subSize={11}
			/>
			<Line id={id} x1={200} y1={208} x2={200} y2={288} accent={accent} />
			<Label x={210} y={240} text="async · QStash" accent={accent} size={11} />

			<Group
				x={60}
				y={248}
				w={280}
				h={592}
				title="ASYNC · QSTASH"
				accent={accent}
				titleSize={10}
			/>

			{stages.map((s) => (
				<g key={s.label}>
					<Node
						x={84}
						y={s.y}
						w={232}
						h={48}
						label={s.label}
						sub={s.sub}
						size={13}
						subSize={10}
					/>
					{s.arrow ? (
						<>
							<Line id={id} x1={200} y1={s.y + 48} x2={200} y2={s.y + 80} />
							<Label x={210} y={s.y + 68} text={s.arrow} size={10} />
						</>
					) : null}
					<Line
						id={id}
						x1={84}
						y1={s.y + 24}
						x2={36}
						y2={s.y + 24}
						arrow={false}
						dashed
					/>
				</g>
			))}

			<Line id={id} x1={36} y1={312} x2={36} y2={928} arrow={false} dashed />
			<Line id={id} x1={36} y1={928} x2={110} y2={928} arrow={false} dashed />
			<Line id={id} x1={110} y1={928} x2={110} y2={952} dashed />
			<Cross cx={36} cy={592} s={4} />

			<Line id={id} x1={200} y1={816} x2={200} y2={864} />
			<Label x={210} y={856} text="chunks + vectors" size={10} />
			<Node
				x={60}
				y={864}
				w={280}
				h={56}
				label="Postgres · pgvector"
				sub="chunks + embeddings"
				size={13}
				subSize={10}
			/>

			<Line id={id} x1={272} y1={920} x2={272} y2={952} />
			<Node
				x={20}
				y={952}
				w={180}
				h={56}
				label="status: failed · DLQ"
				sub="retry from step"
				size={11}
				subSize={9}
			/>
			<Node
				x={208}
				y={952}
				w={128}
				h={56}
				label="status: ready"
				sub="shown in UI"
				size={11}
				subSize={9}
			/>
		</svg>
	);
}

