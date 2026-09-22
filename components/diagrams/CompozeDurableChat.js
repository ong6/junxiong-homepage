import { Defs, Flow, Group, Label, Line, Node } from "./parts";

export const CLAIM =
	"Chat streams by default; when the reader leaves mid-answer, an abort listener hands the job to a QStash workflow whose steps are durable, so a retry resumes after the last completed step.";

export const meta = {
	number: "Figure 09",
	eyebrow: "Chat",
	title: "An answer that finishes after the reader leaves",
	caption:
		"Chat streams by default. If the client disconnects before the stream completes, an abort listener hands the job to a QStash workflow. Each phase is a durable step, so a retry resumes after the last one that finished.",
	legend: [
		{ label: "Question", kind: "request" },
		{ label: "Hand-off", kind: "accent" },
		{ label: "Retry", kind: "neutral" },
	],
	viewBox: "0 0 720 992",
	narrowViewBox: "0 0 360 848",
};

// Claim: chat streams by default; a disconnect mid-answer hands the job to a
// QStash workflow of durable steps, and a retry resumes after the last one that
// completed. Accent follows the hand-off; the retry rail is dashed currentColor.

const STEPS = ["Init", "Load context", "RAG query", "Generation", "Finalise"];

export function Wide({ id }) {
	const steps = STEPS.map((label, i) => ({ label, y: 424 + i * 88 }));
	return (
		<>
			<Defs id={id} />

			<Node x={232} y={32} w={256} h={64} label="Browser" sub="streaming answer" />
			<Line id={id} x1={360} y1={96} x2={360} y2={160} />
			<Label x={372} y={134} text="question" />

			<Node x={232} y={160} w={256} h={64} label="Chat route" sub="streams by default" />
			<Line id={id} x1={488} y1={192} x2={528} y2={192} dashed />
			<Node
				x={528}
				y={160}
				w={160}
				h={64}
				label="Plain streaming"
				sub="if QStash is unreachable"
				size={13}
				subSize={11}
			/>

			<Line id={id} x1={360} y1={224} x2={360} y2={288} accent />
			<Label x={372} y={262} text="client gone, stream incomplete" accent size={11} />

			<Node x={232} y={288} w={256} h={56} label="Abort listener" sub="hands off the job" accent />
			<Line id={id} x1={360} y1={344} x2={360} y2={424} accent />
			<Label x={372} y={374} text="async · Upstash QStash" accent size={11} />

			<Group x={160} y={392} w={400} h={472} title="DURABLE STEPS" accent />

			{steps.map((s, i) => (
				<g key={s.label}>
					<Node x={184} y={s.y} w={352} h={56} label={s.label} />
					{i < steps.length - 1 ? (
						<>
							<Line id={id} x1={360} y1={s.y + 56} x2={360} y2={s.y + 88} />
							<Label x={372} y={s.y + 78} text="checkpoint" size={11} />
						</>
					) : null}
					<Line id={id} x1={536} y1={s.y + 28} x2={600} y2={s.y + 28} arrow={false} dashed />
				</g>
			))}

			<Line id={id} x1={600} y1={452} x2={600} y2={804} arrow={false} dashed />
			<Label x={612} y={620} text="retry resumes" size={11} />
			<Label x={612} y={638} text="after the last" size={11} />
			<Label x={612} y={656} text="completed step" size={11} />

			<Line id={id} x1={360} y1={832} x2={360} y2={896} />
			<Label x={372} y={870} text="saved answer" size={11} />
			<Node x={232} y={896} w={256} h={64} label="Postgres" sub="message + citations" />

			{/* ---------- packets ---------- */}
			<Flow x1={360} y1={96} x2={360} y2={160} kind="request" dur={1.2} />
			<Flow x1={360} y1={224} x2={360} y2={288} kind="accent" dur={1.2} />
			<Flow x1={360} y1={344} x2={360} y2={424} kind="accent" dur={1.4} />
			{steps.slice(0, -1).map((s, i) => (
				<Flow key={s.label} x1={360} y1={s.y + 56} x2={360} y2={s.y + 88} kind="request" dur={1.2} delay={-i * 0.2} />
			))}
			<Flow x1={600} y1={804} x2={600} y2={452} kind="neutral" dur={5} />
			<Flow x1={360} y1={832} x2={360} y2={896} kind="response" dur={1.2} />
		</>
	);
}

export function Narrow({ id }) {
	const steps = STEPS.map((label, i) => ({ label, y: 376 + i * 72 }));
	return (
		<>
			<Defs id={id} />

			<Node x={60} y={24} w={240} h={56} label="Browser" sub="streaming answer" size={14} subSize={11} />
			<Line id={id} x1={180} y1={80} x2={180} y2={136} />
			<Label x={190} y={114} text="question" size={10} />

			<Node
				x={60}
				y={136}
				w={240}
				h={56}
				label="Chat route"
				sub="no QStash → plain stream"
				size={14}
				subSize={10}
			/>
			<Line id={id} x1={180} y1={192} x2={180} y2={248} accent />
			<Label x={190} y={226} text="client leaves" accent size={10} />

			<Node
				x={60}
				y={248}
				w={240}
				h={56}
				label="Abort listener"
				sub="hands off the job"
				size={14}
				subSize={10}
				accent
			/>
			<Line id={id} x1={180} y1={304} x2={180} y2={376} accent />
			<Label x={190} y={330} text="QStash" accent size={10} />

			<Group x={48} y={344} w={264} h={392} title="DURABLE STEPS" accent titleSize={10} />

			{steps.map((s, i) => (
				<g key={s.label}>
					<Node x={72} y={s.y} w={216} h={48} label={s.label} size={13} />
					{i < steps.length - 1 ? (
						<Line id={id} x1={180} y1={s.y + 48} x2={180} y2={s.y + 72} />
					) : null}
					<Line id={id} x1={72} y1={s.y + 24} x2={28} y2={s.y + 24} arrow={false} dashed />
				</g>
			))}
			<Line id={id} x1={28} y1={400} x2={28} y2={688} arrow={false} dashed />

			<Line id={id} x1={180} y1={712} x2={180} y2={768} />
			<Node x={60} y={768} w={240} h={56} label="Postgres" sub="message + citations" size={13} subSize={10} />

			<Flow x1={180} y1={80} x2={180} y2={136} kind="request" dur={1} />
			<Flow x1={180} y1={192} x2={180} y2={248} kind="accent" dur={1} />
			<Flow x1={180} y1={304} x2={180} y2={376} kind="accent" dur={1.2} />
			<Flow x1={28} y1={688} x2={28} y2={400} kind="neutral" dur={5} />
			<Flow x1={180} y1={712} x2={180} y2={768} kind="response" dur={1} />
		</>
	);
}
