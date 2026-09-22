import { Defs, Flow, Group, Label, Line, Node, Packet } from "./parts";

export const CLAIM =
	"A question fans out across five knowledge bases with hybrid search, the survivors are reranked by a cross-encoder, and every citation is checked against its chunk before the answer ships.";

export const meta = {
	number: "Figure 05",
	eyebrow: "Query",
	title: "One question, five knowledge bases, every citation checked",
	caption:
		"A question fans out across five knowledge bases with hybrid search. Only chunks over the 0.35 floor survive, a cross-encoder orders them, and each citation is checked against its chunk before the answer ships.",
	legend: [
		{ label: "Question", kind: "request" },
		{ label: "Retrieval", kind: "accent" },
		{ label: "Answer", kind: "response" },
	],
	viewBox: "0 0 720 1032",
};


// Claim: a question fans out across five knowledge bases with hybrid search,
// the survivors are reranked by a cross-encoder, and every citation is checked
// against its chunk before the answer ships. Accent follows the retrieval path.

const KB_X_WIDE = [68, 188, 308, 428, 548];


export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			<Node x={232} y={32} w={256} h={56} label="User question" flow="ask" />
			<Line id={id} x1={360} y1={88} x2={360} y2={128} flow="ask" />
			<Label x={372} y={112} text="asks" />

			<Node
				x={232}
				y={128}
				w={256}
				h={72}
				label="Domain agent"
				sub="1 of 4 · tenant-gated"
			/>
			<Line id={id} x1={360} y1={200} x2={360} y2={240} flow="ask" />
			<Label x={372} y={224} text="tool call" />

			<Node
				x={232}
				y={240}
				w={256}
				h={72}
				label="Contextual RAG search"
				sub="OpenAI embed · 1536-dim"
			/>

			{/* fan-out: one stub, one bus, five hybrid lanes — the accented path */}
			<Line id={id} x1={360} y1={312} x2={360} y2={384} arrow={false} accent flow={["ask", "retrieval"]} />
			<Label x={372} y={340} text="BM25 + vector · RRF" accent />
			<Line id={id} x1={120} y1={384} x2={600} y2={384} arrow={false} accent flow="retrieval" />
			{KB_X_WIDE.map((x) => (
				<Line key={x} id={id} x1={x + 52} y1={384} x2={x + 52} y2={408} accent flow="retrieval" />
			))}

			<Group
				x={44}
				y={352}
				w={632}
				h={136}
				title="UP TO 5 KNOWLEDGE BASES · PARALLEL" flow="retrieval" />
			{KB_X_WIDE.map((x, i) => (
				<Node key={x} x={x} y={408} w={104} h={56} label={`kb ${i + 1}`} size={13} flow="retrieval" />
			))}

			{/* merge */}
			{KB_X_WIDE.map((x) => (
				<Line
					key={x}
					id={id}
					x1={x + 52}
					y1={464}
					x2={x + 52}
					y2={496}
					arrow={false}
					accent flow="retrieval" />
			))}
			<Line id={id} x1={120} y1={496} x2={600} y2={496} arrow={false} accent flow="retrieval" />
			<Line id={id} x1={360} y1={496} x2={360} y2={536} accent flow="retrieval" />
			<Label x={372} y={521} text="floor 0.35" accent />

			<Node
				x={232}
				y={536}
				w={256}
				h={72}
				label="Cross-encoder rerank"
				sub="final order"
			/>
			<Line id={id} x1={360} y1={608} x2={360} y2={648} flow="retrieval" />
			<Label x={372} y={632} text="top chunks" />

			<Node
				x={232}
				y={648}
				w={256}
				h={72}
				label="Summarise references"
				sub="kept chunks only"
			/>
			<Line id={id} x1={360} y1={720} x2={360} y2={760} flow="retrieval" />
			<Label x={372} y={744} text="prompt context" />

			<Node
				x={232}
				y={760}
				w={256}
				h={72}
				label="Model gateway"
				sub="9 models · prompt cache"
			/>

			{/* the draft answer is checked claim-by-claim before it ships */}
			<Line id={id} x1={360} y1={832} x2={360} y2={928} flow="answer" />
			<Label x={348} y={912} text="writes" anchor="end" />
			<Line id={id} x1={360} y1={880} x2={488} y2={880} flow="answer" />
			<Label x={424} y={874} text="every citation" anchor="middle" size={11} />
			<Node
				x={488}
				y={848}
				w={192}
				h={64}
				label="Citation entailment check"
				sub="claim ⊨ chunk"
				size={12}
				subSize={11} flow="answer" />

			<Node
				x={232}
				y={928}
				w={256}
				h={72}
				label="Answer with citations"
				sub="match score per chunk"
			/>

			{/* ---------- packets ---------- */}
			<Flow x1={360} y1={88} x2={360} y2={128} kind="request" dur={1.2} flow="answer" />
			<Flow x1={360} y1={200} x2={360} y2={240} kind="request" dur={1.2} delay={-0.6} flow="ask" />
			{KB_X_WIDE.map((x, i) => (
				<Packet
					key={x}
					points={[
						[360, 312],
						[360, 384],
						[x + 52, 384],
						[x + 52, 408],
					]}
					kind="accent"
					flow="retrieval"
					dur={2.4}
					delay={-i * 0.25}
					r={4.5}
				/>
			))}
			{KB_X_WIDE.map((x, i) => (
				<Packet
					key={x}
					points={[
						[x + 52, 464],
						[x + 52, 496],
						[360, 496],
						[360, 536],
					]}
					kind="accent"
					flow="retrieval"
					dur={2.4}
					delay={-1.2 - i * 0.25}
					r={4.5}
				/>
			))}
			<Flow x1={360} y1={608} x2={360} y2={648} kind="request" dur={1.2} flow="retrieval" />
			<Flow x1={360} y1={720} x2={360} y2={760} kind="request" dur={1.2} delay={-0.6} flow="retrieval" />
			<Flow x1={360} y1={832} x2={360} y2={928} kind="response" dur={2} flow="answer" />
			<Flow x1={360} y1={880} x2={488} y2={880} kind="response" dur={1.6} delay={-0.8} flow="answer" />
		</>
	);
}
