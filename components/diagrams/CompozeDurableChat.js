import { Defs } from "./parts";
import { Packet } from "uipack";
import { Activation, Lifeline, Lost, Message, Note, Participant, SelfLoop } from "./sequence";

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
		{ label: "Tokens", kind: "response" },
		{ label: "Hand-off", kind: "accent" },
	],
	viewBox: "0 0 1200 656",
};

// Claim: a disconnect mid-answer hands the job to durable QStash steps, and a
// retry resumes after the last one that completed. Time runs down the page;
// accent follows the hand-off.

const B = 200;
const C = 560;
const Q = 960;

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			<Participant x={B - 100} y={32} w={200} h={56} label="Browser" icon="browser" />
			<Participant x={C - 100} y={32} w={200} h={56} label="Chat route" icon="service" />
			<Participant x={Q - 100} y={32} w={200} h={56} label="QStash workflow" icon="queue" accent />
			<Lifeline x={B} y1={88} y2={632} />
			<Lifeline x={C} y1={88} y2={632} />
			<Lifeline x={Q} y1={88} y2={632} />

			<Activation x={C} y1={128} y2={320} />
			<Activation x={Q} y1={304} y2={600} accent />

			<Message id={id} from={B} to={C} y={136} n={1} label="ask" kind="request" />
			<Message id={id} from={C} to={B} y={192} n={2} label="stream tokens" kind="response" dashed />
			<Lost id={id} from={B} to={C} y={248} n={3} label="disconnects mid-answer" />
			<Message id={id} from={C} to={Q} y={312} n={4} label="abort listener hands off the job" accent />

			<Note
				x={992}
				y={336}
				w={184}
				h={140}
				title="Durable steps"
				lines={["1 init", "2 load context", "3 RAG query", "4 generation", "5 finalise"]}
				accent
			/>

			<SelfLoop id={id} x={Q} y={512} h={40} side="left" w={56} n={5} />
			<text x={888} y={528} textAnchor="end" fontFamily="var(--uipack-mono)" fontSize={12} fill="currentColor">
				retry resumes after
			</text>
			<text x={888} y={546} textAnchor="end" fontFamily="var(--uipack-mono)" fontSize={12} fill="currentColor">
				the last completed step
			</text>

			<Note x={C - 120} y={400} w={240} h={64} title="Fallback" lines={["QStash unreachable →", "plain streaming"]} />

			<Packet points={[[B + 14, 136], [C - 8, 136]]} kind="request" dur={1.6} />
			<Packet points={[[C - 14, 192], [B + 8, 192]]} kind="response" dur={1.6} delay={-0.4} />
			<Packet points={[[C + 14, 312], [Q - 8, 312]]} kind="accent" dur={1.8} />
		</>
	);
}

