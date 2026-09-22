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
	narrowViewBox: "0 0 360 680",
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

const nb = 60;
const nc = 180;
const nq = 300;

export function Narrow({ id }) {
	return (
		<>
			<Defs id={id} />

			<Participant x={nb - 50} y={24} w={100} h={48} label="Browser" size={12} />
			<Participant x={nc - 50} y={24} w={100} h={48} label="Chat route" size={12} />
			<Participant x={nq - 50} y={24} w={100} h={48} label="QStash" size={12} accent />
			<Lifeline x={nb} y1={72} y2={660} />
			<Lifeline x={nc} y1={72} y2={660} />
			<Lifeline x={nq} y1={72} y2={660} />

			<Activation x={nc} y1={112} y2={296} />
			<Activation x={nq} y1={280} y2={560} accent />

			<Message id={id} from={nb} to={nc} y={120} n={1} label="ask" kind="request" labelSize={10} />
			<Message id={id} from={nc} to={nb} y={172} n={2} label="tokens" kind="response" dashed labelSize={10} />
			<Lost id={id} from={nb} to={nc} y={224} n={3} label="leaves" labelSize={10} />
			<Message id={id} from={nc} to={nq} y={288} n={4} label="hand off" accent labelSize={10} />

			<Note x={238} y={312} w={114} h={132} title="Steps" lines={["init", "load context", "RAG query", "generation", "finalise"]} accent />

			<SelfLoop id={id} x={nq} y={476} h={36} side="left" w={40} n={5} />
			<text x={250} y={530} textAnchor="end" fontFamily="var(--uipack-mono)" fontSize={10} fill="currentColor">
				retry after the
			</text>
			<text x={250} y={544} textAnchor="end" fontFamily="var(--uipack-mono)" fontSize={10} fill="currentColor">
				last completed step
			</text>

			<Note x={24} y={584} w={140} h={64} title="Fallback" lines={["no QStash →", "plain stream"]} />

			<Packet points={[[nb + 14, 120], [nc - 8, 120]]} kind="request" dur={1.4} />
			<Packet points={[[nc - 14, 172], [nb + 8, 172]]} kind="response" dur={1.4} delay={-0.4} />
			<Packet points={[[nc + 14, 288], [nq - 8, 288]]} kind="accent" dur={1.4} />
		</>
	);
}
