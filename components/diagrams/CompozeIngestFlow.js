import { Defs, Flow, Group, Label, Line, Node } from "./parts";

export const CLAIM =
	"Documents are deduplicated by content hash, redacted, and moved through a checkpointed async pipeline into pgvector, with failures landing in a dead-letter queue the admin UI shows.";

export const meta = {
	number: "Figure 06",
	eyebrow: "Ingest",
	title: "How an uploaded document is processed, and where failures go",
	caption:
		"A content hash drops files already seen. PII comes out before chunking. The dashed region runs later on QStash, and every stage can drop out to a dead-letter queue the admin UI shows.",
	legend: [
		{ label: "Document", kind: "change" },
		{ label: "Failure", kind: "neutral" },
	],
	viewBox: "0 0 720 1104",
};


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

export function Wide({ id }) {
	const stages = STAGES.map((s, i) => ({ ...s, y: 336 + i * 88 }));
	return (
		<>
			<Defs id={id} />

			<Node
				x={40}
				y={32}
				w={312}
				h={72}
				label="Lark / Feishu"
				sub="OAuth · MCP: docs, wiki, sheets"
				subSize={11} flow="document" />
			<Node x={368} y={32} w={312} h={72} label="Google Drive" sub="OAuth" flow="document" />
			<Line id={id} x1={196} y1={104} x2={196} y2={136} arrow={false} flow="document" />
			<Line id={id} x1={524} y1={104} x2={524} y2={136} arrow={false} flow="document" />
			<Line id={id} x1={196} y1={136} x2={524} y2={136} arrow={false} flow="document" />
			<Line id={id} x1={360} y1={136} x2={360} y2={176} flow="document" />
			<Label x={372} y={162} text="file selected" />

			<Node x={232} y={176} w={256} h={72} label="Ingest job" sub="status: queued" flow="document" />
			<Line id={id} x1={360} y1={248} x2={360} y2={336} accent flow="document" />
			<Label x={372} y={278} text="async · Upstash QStash" accent />

			<Group
				x={160}
				y={296}
				w={400}
				h={648}
				title="ASYNC · QSTASH JOB"
				accent flow="document" />

			{stages.map((s) => (
				<g key={s.label}>
					<Node x={184} y={s.y} w={352} h={56} label={s.label} sub={s.sub} flow="document" />
					{s.arrow ? (
						<>
							<Line id={id} x1={360} y1={s.y + 56} x2={360} y2={s.y + 88} flow="document" />
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
						dashed flow="failure" />
				</g>
			))}

			<Line id={id} x1={136} y1={364} x2={136} y2={1000} dashed flow="failure" />
			<Label x={124} y={648} text="on failure" anchor="end" size={11} />
			<Cross cx={136} cy={672} />

			<Line id={id} x1={360} y1={920} x2={360} y2={1000} flow="document" />
			<Label x={348} y={978} text="chunks + embeddings" anchor="end" size={11} />
			<Line id={id} x1={360} y1={972} x2={592} y2={972} arrow={false} flow="document" />
			<Line id={id} x1={592} y1={972} x2={592} y2={1000} flow="document" />
			<Label x={476} y={966} text="job complete" anchor="middle" size={11} />

			<Node
				x={40}
				y={1000}
				w={216}
				h={72}
				label="status: failed · DLQ"
				sub="retry from step"
				size={13}
				subSize={11} flow="failure" />
			<Node
				x={296}
				y={1000}
				w={176}
				h={72}
				label="Postgres · pgvector"
				sub="chunks + vectors"
				size={13}
				subSize={11} flow="document" />
			<Node
				x={504}
				y={1000}
				w={176}
				h={72}
				label="status: ready"
				sub="shown in the UI"
				size={13}
				subSize={11} flow="document" />

			{/* ---------- packets ---------- */}
			<Flow x1={360} y1={136} x2={360} y2={176} kind="change" dur={1.2} flow="document" />
			<Flow x1={360} y1={248} x2={360} y2={336} kind="change" dur={1.8} flow="document" />
			{stages
				.filter((s) => s.arrow)
				.map((s, i) => (
					<Flow key={s.label} x1={360} y1={s.y + 56} x2={360} y2={s.y + 88} kind="change" dur={1.2} delay={-i * 0.2} flow="document" />
				))}
			<Flow x1={360} y1={920} x2={360} y2={1000} kind="change" dur={1.6} flow="document" />
			<Flow x1={592} y1={972} x2={592} y2={1000} kind="change" dur={1} delay={-0.5} flow="document" />
			<Flow x1={136} y1={364} x2={136} y2={1000} kind="neutral" dur={6} flow="failure" />
		</>
	);
}
