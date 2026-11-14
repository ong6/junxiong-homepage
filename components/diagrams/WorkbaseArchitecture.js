import { Bus, Connector, Cross, Defs, Group, Label, Lane, Node, Packet } from "uipack";

// Facts from github.com/ong6/workbase: template/AGENTS.md ("Finding things",
// "Where things go", "Rules"), template/.gitignore (starts with /*),
// bin/new-workbase (CLAUDE.md symlinked to AGENTS.md) and DESIGN.md ("The
// workbase is the workspace root", "The manual routes lookups").
export const CLAIM =
	"The workbase is one folder per job with the company's repos cloned inside it and ignored by its git. An agent session started inside a repo loads the manual, AGENTS.md. Its Finding things list sends a question to a named file first, such as systems/gotchas/ for errors; its Where things go table files each capture in the file for that kind of fact. The agent's own auto-memory is ruled out.";

export const meta = {
	number: "Figure 01",
	eyebrow: "Lookups and captures · workbase",
	title: "Where the manual sends a question and where it files a capture",
	caption:
		"A session started in any repo below the workbase reads the same manual. A question goes to the file the manual names first; a capture goes to the file for its kind of fact.",
	legend: [
		{ label: "Question", kind: "request" },
		{ label: "Answer", kind: "response" },
		{ label: "Capture", kind: "change" },
	],
	viewBox: "0 0 1120 688",
};

// 8px grid. Columns: session 80–272, manual 400–616, bus trunk 696, notes 752–1056.
const SESSION = { x: 80, y: 232, w: 192, h: 72 };
const FIND = { x: 400, y: 232, w: 216, h: 72 }; // centre y 268
const FILE = { x: 400, y: 360, w: 216, h: 72 }; // centre y 396
const NOTES_X = 752;
const NOTES_W = 304;
const TRUNK = 696;

// [path, what it holds, hint, row y]
const LOOKUPS = [
	["systems/gotchas/", "errors: grep here first", "A note for each error already fixed. The manual sends errors, 403s and deploy problems here before anything else.", 112],
	["projects/<slug>/", "goal · status · req changes", "One folder per piece of work. A feature's state and its requirement changes are looked up here.", 184],
	["glossary.md", "acronyms · internal names", "Acronyms and internal names, looked up before answering and added to when a new one comes up.", 256],
];

const CAPTURES = [
	["decisions.md", "date · what · why · who · link", "One row per decision. Decisions are also where the manual looks when asked what was agreed.", 344],
	["wins.md", "outcomes with numbers", "Shipped outcomes with their numbers and evidence links, kept for review time.", 416],
	["inbox.md", "when unsure", "Anything the agent can't place goes here as a bullet instead of being guessed into a file.", 488],
];

const mid = (row) => row + 28;

const ASK = [
	[SESSION.x + SESSION.w, 268],
	[FIND.x, 268],
];
const TO_GOTCHAS = [
	[FIND.x + FIND.w, 268],
	[TRUNK, 268],
	[TRUNK, mid(112)],
	[NOTES_X, mid(112)],
];
const CAPTURE = [
	[SESSION.x + SESSION.w / 2, SESSION.y + SESSION.h],
	[SESSION.x + SESSION.w / 2, 396],
	[FILE.x, 396],
];
const toCapture = (row) => [
	[FILE.x + FILE.w, 396],
	[TRUNK, 396],
	[TRUNK, mid(row)],
	[NOTES_X, mid(row)],
];

export function Wide({ id }) {
	return (
		<>
			<Defs id={id} />

			<Lane x={SESSION.x - 24} w={SESSION.w + 48} y={40} title="Session" />
			<Lane x={FIND.x - 24} w={FIND.w + 48} y={40} title="Manual" />
			<Lane x={NOTES_X} w={NOTES_W} y={40} title="Notes" />

			{/* The workbase root: its own git repo, tracking only its own files. */}
			<Group x={24} y={72} w={1072} h={496} variant="dashed" titleSize={11} title="~/WORK/<COMPANY>/ · WORKBASE ROOT, ITS OWN GIT" />

			<Group
				x={56}
				y={192}
				w={240}
				h={152}
				variant="dashed"
				titleSize={11}
				title="COMPANY REPO · IGNORED"
				hint="Cloned inside the workbase. Its .gitignore starts with /* and lists only its own files, so repos are never committed with the notes."
			/>
			<Node
				{...SESSION}
				label="Agent session"
				sub="Claude Code · Codex"
				icon="terminal"
				accent
				flow={["lookup", "capture"]}
				hint="Started inside a repo below the workbase, as in daily use. Claude Code loads the manual from the parent folder."
			/>

			{/* The manual. */}
			<Group x={376} y={112} w={264} h={344} variant="solid" titleSize={11} title="AGENTS.md · CLAUDE.md SYMLINKED" />
			<Node
				x={400}
				y={152}
				w={216}
				h={56}
				label="Rules"
				sub="reads free · writes ask"
				hint="Reading chat, docs and tickets is free. Sending messages, editing shared docs and changing tickets wait for a yes."
			/>
			<Node
				{...FIND}
				label="Finding things"
				sub="where to look first"
				flow="lookup"
				hint="Before answering from general knowledge or saying something isn't recorded, the agent checks the file named for that kind of question."
			/>
			<Node
				{...FILE}
				label="Where things go"
				sub="a file per kind of fact"
				flow="capture"
				hint="When a decision, win, number, acronym or person comes up, the agent files it in the same session and says where in one line."
			/>

			<Connector points={ASK} defs={id} flow="lookup" />
			<Label x={336} y={260} text="question" anchor="middle" size={11} />
			<Connector points={CAPTURE} defs={id} flow="capture" />
			<Label x={288} y={388} text="capture" anchor="middle" size={11} />

			{/* Notes at the workbase root. */}
			<Bus
				at={TRUNK}
				from={mid(112)}
				to={mid(256)}
				defs={id}
				flow="lookup"
				stubs={[{ at: 268, to: FIND.x + FIND.w }, ...LOOKUPS.map(([, , , y]) => ({ at: mid(y), to: NOTES_X, arrow: true }))]}
			/>
			<Bus
				at={TRUNK}
				from={mid(344)}
				to={mid(488)}
				defs={id}
				flow="capture"
				stubs={[{ at: 396, to: FILE.x + FILE.w }, ...CAPTURES.map(([, , , y]) => ({ at: mid(y), to: NOTES_X, arrow: true }))]}
			/>
			{LOOKUPS.map(([label, sub, hint, y]) => (
				<Node key={label} x={NOTES_X} y={y} w={NOTES_W} h={56} label={label} sub={sub} icon="doc" flow="lookup" hint={hint} />
			))}
			{CAPTURES.map(([label, sub, hint, y]) => (
				<Node key={label} x={NOTES_X} y={y} w={NOTES_W} h={56} label={label} sub={sub} icon="doc" flow="capture" hint={hint} />
			))}

			{/* Outside the workbase: the agent's own memory, ruled out by the manual. */}
			<Connector
				points={[
					[508, FILE.y + FILE.h],
					[508, 584],
				]}
				defs={id}
				arrow={false}
				dashed
				flow="capture"
			/>
			<Cross x={508} y={584} />
			<Label x={520} y={520} text="never" size={11} />
			<Node
				x={400}
				y={600}
				w={216}
				h={56}
				label="Auto-memory"
				sub="not searchable"
				dashed
				hint="The agent's own memory can't be searched by other tools, isn't backed up with the workbase and doesn't leave with the notes."
			/>

			{/* Packets: a question and its answer, then a capture being filed. */}
			<Packet points={ASK} kind="request" dur={2} flow="lookup" />
			<Packet points={TO_GOTCHAS} kind="request" dur={2.4} delay={-0.6} flow="lookup" />
			<Packet points={ASK} kind="response" dur={2} delay={-1} reverse flow="lookup" />
			<Packet points={CAPTURE} kind="change" dur={2.4} delay={-0.4} flow="capture" />
			<Packet points={toCapture(344)} kind="change" dur={2.4} delay={-1.2} flow="capture" />
			<Packet points={toCapture(416)} kind="change" dur={2.4} delay={-0.2} flow="capture" />
		</>
	);
}
