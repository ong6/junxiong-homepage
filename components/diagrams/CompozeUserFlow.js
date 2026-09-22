import { Defs, Flow, Label, Line } from "./parts";
import { Connector, Packet } from "uipack";
import { Action, Actor, Decision, LaneRule, Outcome, Screen } from "./userflow";

export const CLAIM =
	"An admin connects sources and watches ingest until the knowledge base is ready; a user picks an agent, asks, and gets an answer with its sources attached, or a refusal when nothing clears the floor.";

export const meta = {
	number: "Figure 02",
	eyebrow: "User flow",
	title: "Two people, two jobs: fill the knowledge base, then question it",
	caption:
		"An admin connects Lark or Drive and watches each document until it is ready or fails. A user picks an agent, starts from example prompts, and gets a cited answer, or a refusal when nothing clears the 0.35 floor.",
	legend: [
		{ label: "Admin", kind: "change" },
		{ label: "User", kind: "request" },
		{ label: "Answer", kind: "response" },
	],
	viewBox: "0 0 1200 672",
	narrowViewBox: "0 0 360 1480",
};

// Claim: the product has two users with different jobs. The admin's flow ends
// where the user's search begins, drawn as the one accent hop between lanes.

const Path = ({ id, points, kind, dashed, arrow = true }) => (
	<Connector points={points} defs={id} kind={kind} dashed={dashed} arrow={arrow} />
);

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- admin lane ---------- */}
			<Actor cx={92} cy={168} role="Admin" sub="per tenant" />
			<Line id={id} x1={120} y1={168} x2={184} y2={168} />
			<Action x={184} y={146} w={160} label="Connect Lark / Drive" sub="OAuth" />
			<Line id={id} x1={344} y1={168} x2={376} y2={168} />
			<Screen x={376} y={104} w={152} title="Knowledge base" lines={["select files", "source per file"]} />
			<Line id={id} x1={528} y1={168} x2={560} y2={168} />
			<Screen x={560} y={104} w={152} title="Ingest status" lines={["queued → ready", "failures counted"]} />
			<Line id={id} x1={712} y1={168} x2={736} y2={168} />
			<Decision cx={776} cy={168} label="Failed?" />
			<Line id={id} x1={776} y1={208} x2={776} y2={256} />
			<Label x={786} y={236} text="yes" size={11} />
			<Action x={712} y={256} w={128} h={40} label="Retry from step" />
			<Path id={id} points={[[712, 276], [636, 276], [636, 232]]} dashed />
			<Line id={id} x1={816} y1={168} x2={848} y2={168} />
			<Label x={832} y={158} text="no" anchor="middle" size={11} />
			<Outcome x={848} y={140} w={176} label="Ready to search" sub="indexed" />

			<LaneRule x1={24} x2={1176} y={336} />

			{/* ---------- user lane ---------- */}
			<Actor cx={92} cy={488} role="User" sub="staff" />
			<Line id={id} x1={120} y1={488} x2={184} y2={488} />
			<Screen x={184} y={424} w={152} title="Pick an agent" lines={["4 domain agents", "own tools each"]} />
			<Line id={id} x1={336} y1={488} x2={368} y2={488} />
			<Screen x={368} y={424} w={152} title="Empty state" lines={["example prompts", "tool list shown"]} />
			<Line id={id} x1={520} y1={488} x2={552} y2={488} />
			<Action x={552} y={466} w={144} label="Ask a question" />
			<Line id={id} x1={696} y1={488} x2={720} y2={488} />
			<Decision cx={760} cy={488} label="≥ 0.35?" />
			<Line id={id} x1={760} y1={528} x2={760} y2={576} />
			<Label x={770} y={556} text="no" size={11} />
			<Action x={696} y={576} w={128} h={40} label="Refuses" sub="names what's missing" />
			<Line id={id} x1={800} y1={488} x2={832} y2={488} />
			<Label x={816} y={478} text="yes" anchor="middle" size={11} />
			<Screen x={832} y={424} w={160} title="Cited answer" lines={["tool call shown", "sources + scores"]} />
			<Line id={id} x1={992} y1={488} x2={1024} y2={488} />
			<Outcome x={1024} y={460} w={160} label="Opens citations" sub="then trusts it" />

			{/* the admin's outcome is what the user's search reads */}
			<Path id={id} points={[[936, 196], [936, 392], [912, 392], [912, 424]]} kind="accent" dashed />
			<Label x={948} y={300} text="searchable" accent size={11} />

			{/* ---------- packets ---------- */}
			<Flow x1={120} y1={168} x2={184} y2={168} kind="change" dur={1.2} />
			<Flow x1={344} y1={168} x2={376} y2={168} kind="change" dur={1} delay={-0.3} />
			<Flow x1={528} y1={168} x2={560} y2={168} kind="change" dur={1} delay={-0.6} />
			<Flow x1={816} y1={168} x2={848} y2={168} kind="change" dur={1} delay={-0.9} />
			<Packet points={[[936, 196], [936, 392], [912, 392], [912, 424]]} kind="accent" dur={2.4} />
			<Flow x1={120} y1={488} x2={184} y2={488} kind="request" dur={1.2} />
			<Flow x1={336} y1={488} x2={368} y2={488} kind="request" dur={1} delay={-0.3} />
			<Flow x1={520} y1={488} x2={552} y2={488} kind="request" dur={1} delay={-0.6} />
			<Flow x1={696} y1={488} x2={720} y2={488} kind="request" dur={1} delay={-0.9} />
			<Flow x1={992} y1={488} x2={1024} y2={488} kind="response" dur={1} />
		</>
	);
}

export function Narrow({ id }) {
	return (
		<>
			<Defs id={id} />

			{/* ---------- admin lane ---------- */}
			<Actor cx={52} cy={48} r={24} role="Admin" sub="per tenant" labelSide="right" />
			<Path id={id} points={[[52, 72], [52, 132], [100, 132]]} />
			<Action x={100} y={112} w={160} h={40} label="Connect Lark / Drive" />
			<Line id={id} x1={180} y1={152} x2={180} y2={184} />
			<Screen x={100} y={184} w={160} h={112} title="Knowledge base" lines={["select files", "source per file"]} />
			<Line id={id} x1={180} y1={296} x2={180} y2={328} />
			<Screen x={100} y={328} w={160} h={112} title="Ingest status" lines={["queued → ready", "failures counted"]} />
			<Line id={id} x1={180} y1={440} x2={180} y2={472} />
			<Decision cx={180} cy={508} r={36} label="Failed?" />
			<Line id={id} x1={216} y1={508} x2={248} y2={508} />
			<Action x={248} y={488} w={104} h={40} label="Retry step" />
			<Path id={id} points={[[300, 488], [300, 384], [260, 384]]} dashed />
			<Line id={id} x1={180} y1={544} x2={180} y2={576} />
			<Label x={190} y={566} text="no" size={10} />
			<Outcome x={100} y={576} w={160} h={48} label="Ready to search" />
			<Label x={180} y={652} text="now searchable by users" anchor="middle" accent size={10} />

			<LaneRule x1={16} x2={344} y={680} />

			{/* ---------- user lane ---------- */}
			<Actor cx={52} cy={744} r={24} role="User" sub="staff" labelSide="right" />
			<Path id={id} points={[[52, 768], [52, 856], [100, 856]]} />
			<Screen x={100} y={800} w={160} h={112} title="Pick an agent" lines={["4 domain agents", "own tools each"]} />
			<Line id={id} x1={180} y1={912} x2={180} y2={944} />
			<Screen x={100} y={944} w={160} h={112} title="Empty state" lines={["example prompts", "tool list shown"]} />
			<Line id={id} x1={180} y1={1056} x2={180} y2={1088} />
			<Action x={100} y={1088} w={160} h={40} label="Ask a question" />
			<Line id={id} x1={180} y1={1128} x2={180} y2={1160} />
			<Decision cx={180} cy={1196} r={36} label="≥ 0.35?" />
			<Line id={id} x1={216} y1={1196} x2={248} y2={1196} />
			<Label x={232} y={1188} text="no" anchor="middle" size={10} />
			<Action x={248} y={1176} w={104} h={40} label="Refuses" />
			<Line id={id} x1={180} y1={1232} x2={180} y2={1264} />
			<Label x={190} y={1254} text="yes" size={10} />
			<Screen x={100} y={1264} w={160} h={112} title="Cited answer" lines={["tool call shown", "sources + scores"]} />
			<Line id={id} x1={180} y1={1376} x2={180} y2={1408} />
			<Outcome x={100} y={1408} w={160} h={48} label="Opens citations" />

			<Flow x1={180} y1={152} x2={180} y2={184} kind="change" dur={1} />
			<Flow x1={180} y1={296} x2={180} y2={328} kind="change" dur={1} delay={-0.3} />
			<Flow x1={180} y1={440} x2={180} y2={472} kind="change" dur={1} delay={-0.6} />
			<Flow x1={180} y1={912} x2={180} y2={944} kind="request" dur={1} />
			<Flow x1={180} y1={1056} x2={180} y2={1088} kind="request" dur={1} delay={-0.3} />
			<Flow x1={180} y1={1128} x2={180} y2={1160} kind="request" dur={1} delay={-0.6} />
			<Flow x1={180} y1={1376} x2={180} y2={1408} kind="response" dur={1} />
		</>
	);
}
