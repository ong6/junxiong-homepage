import { Box, Text, useColorModeValue, useToken } from "@chakra-ui/react";
import { Badge, Defs, Group, Label, Line, Node } from "./primitives";

// Claim: tool results are recorded as typed facts with provenance; a boundary
// declares which facts a block of model output may use; a deterministic
// checker resolves every claim against them and raises UnsupportedClaim on the
// first that fails.
//
// Accent follows the model's output through the boundary and the checker to
// the raise — the loud failure is what the library exists for. Recording facts
// (tools, adapters, registry) stays in currentColor. 8px grid throughout.

const CLAIM =
	"Tool results are recorded as typed facts with provenance; a boundary declares which facts a block of model output may use; a deterministic checker resolves every claim against them and raises UnsupportedClaim on the first that fails.";

const CHECKS = [
	"superlative",
	"ranking_prefix",
	"aggregate_reconciles",
	"entities_recorded",
	"row_integrity",
	"comparison",
];

// Tool → the registry row it feeds, and what travels on the arrow.
const TOOLS = [
	["metrics", "scores"],
	["SQL", "rows"],
	["API", "names"],
];

const FACTS = [
	["Ranking", "record_ranking()"],
	["Table", "record_table()"],
	["Domain", "record_domain()"],
	["Fact", "value + provenance"],
];

function Wide({ accent }) {
	const id = "gparch-w";
	return (
		<svg
			viewBox="0 0 1120 656"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			{/* ---------- tools ---------- */}
			<Group x={40} y={64} w={136} h={288} title="TOOLS" />
			{TOOLS.map(([label, carries], i) => (
				<g key={label}>
					<Node x={64} y={112 + i * 80} w={88} h={56} label={label} size={13} />
					<Line id={id} x1={176} y1={140 + i * 80} x2={248} y2={140 + i * 80} />
					<Label x={212} y={132 + i * 80} text={carries} anchor="middle" size={11} />
				</g>
			))}

			{/* ---------- registry ---------- */}
			<Group x={248} y={64} w={208} h={368} title="FACTREGISTRY · WRITE-ONCE" />
			<Badge cx={248} cy={64} text="1" />
			{FACTS.map(([label, sub], i) => (
				<Node
					key={label}
					x={272}
					y={112 + i * 80}
					w={160}
					h={56}
					label={label}
					sub={sub}
					size={13}
					subSize={11}
				/>
			))}

			{/* ---------- adapters ---------- */}
			<Group x={40} y={496} w={416} h={128} title="ADAPTERS · OPTIONAL EXTRAS" />
			<Node
				x={64}
				y={544}
				w={176}
				h={56}
				label="LangGraph node"
				sub="guarded_node()"
				size={13}
				subSize={11}
			/>
			<Node
				x={256}
				y={544}
				w={176}
				h={56}
				label="MCP tool result"
				sub="record_result()"
				size={13}
				subSize={11}
			/>
			<Line id={id} x1={352} y1={496} x2={352} y2={432} />
			<Label x={364} y={468} text="as facts" size={11} />

			{/* ---------- model + boundary ---------- */}
			<Node
				x={512}
				y={64}
				w={144}
				h={64}
				label="Model"
				sub="structured output"
				size={14}
				subSize={11}
			/>
			<Badge cx={512} cy={64} text="3" accent={accent} />
			<Line id={id} x1={584} y1={128} x2={584} y2={216} accent={accent} />
			<Label x={596} y={176} text="submit()" accent={accent} size={11} />

			<Node
				x={512}
				y={216}
				w={144}
				h={64}
				label="boundary(...)"
				sub="facts= · checks="
				size={14}
				subSize={11}
			/>
			<Badge cx={512} cy={216} text="2" accent={accent} />
			<Line id={id} x1={456} y1={248} x2={512} y2={248} />
			<Label x={484} y={240} text="facts" anchor="middle" size={11} />

			<Line id={id} x1={656} y1={248} x2={712} y2={248} accent={accent} />
			<Label x={684} y={240} text="checks" anchor="middle" accent={accent} size={11} />

			{/* ---------- checker ---------- */}
			<Group x={712} y={64} w={200} h={488} title="CHECKER · DETERMINISTIC" />
			<Badge cx={712} cy={64} text="4" accent={accent} />
			{CHECKS.map((name, i) => (
				<Node key={name} x={736} y={112 + i * 72} w={152} h={56} label={name} size={12} />
			))}

			{/* ---------- outcomes ---------- */}
			<Line id={id} x1={912} y1={208} x2={960} y2={208} />
			<Label x={936} y={200} text="ok" anchor="middle" size={10} />
			<Node
				x={960}
				y={176}
				w={128}
				h={64}
				label="pass"
				sub="output returned"
				size={14}
				subSize={11}
			/>

			<Line id={id} x1={912} y1={320} x2={960} y2={320} accent={accent} />
			<Label x={936} y={312} text="fails" anchor="middle" accent={accent} size={10} />
			<Node
				x={960}
				y={288}
				w={128}
				h={64}
				label="raise"
				sub="UnsupportedClaim"
				size={14}
				subSize={10}
			/>
			<Badge cx={960} cy={288} text="5" accent={accent} />
		</svg>
	);
}

// Mobile reads as one column: tools and adapters, the registry, the boundary
// with the model feeding it from the right, the checker, the two outcomes.
function Narrow({ accent }) {
	const id = "gparch-n";
	return (
		<svg
			viewBox="0 0 360 968"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Group x={20} y={24} w={320} h={208} title="TOOLS" titleSize={10} />
			{TOOLS.map(([label], i) => (
				<Node key={label} x={32 + i * 104} y={56} w={88} h={44} label={label} size={12} />
			))}
			<Group x={32} y={116} w={296} h={100} title="ADAPTERS" titleSize={9} />
			<Node x={44} y={148} w={132} h={44} label="LangGraph node" sub="guarded_node()" size={12} subSize={9} />
			<Node x={184} y={148} w={132} h={44} label="MCP tool result" sub="record_result()" size={12} subSize={9} />

			<Line id={id} x1={180} y1={232} x2={180} y2={280} />
			<Label x={190} y={260} text="scores · rows · names" size={10} />

			<Group x={20} y={280} w={320} h={156} title="FACTREGISTRY · WRITE-ONCE" titleSize={10} />
			<Badge cx={20} cy={280} text="1" r={8} />
			{FACTS.map(([label, sub], i) => (
				<Node
					key={label}
					x={i % 2 ? 184 : 44}
					y={312 + Math.floor(i / 2) * 56}
					w={132}
					h={44}
					label={label}
					sub={sub}
					size={12}
					subSize={9}
				/>
			))}

			<Line id={id} x1={110} y1={436} x2={110} y2={544} />
			<Label x={120} y={492} text="facts" size={10} />

			<Node x={184} y={468} w={132} h={44} label="Model" sub="structured output" size={12} subSize={9} />
			<Badge cx={184} cy={468} text="3" accent={accent} r={8} />
			<Line id={id} x1={250} y1={512} x2={250} y2={544} accent={accent} />
			<Label x={260} y={532} text="submit()" accent={accent} size={10} />

			<Node x={44} y={544} w={272} h={52} label="boundary(...)" sub="facts= · checks=" size={13} subSize={10} />
			<Badge cx={44} cy={544} text="2" accent={accent} r={8} />

			<Line id={id} x1={180} y1={596} x2={180} y2={644} accent={accent} />
			<Label x={190} y={624} text="checks" accent={accent} size={10} />

			<Group x={20} y={644} w={320} h={192} title="CHECKER · DETERMINISTIC" titleSize={10} />
			<Badge cx={20} cy={644} text="4" accent={accent} r={8} />
			{CHECKS.map((name, i) => (
				<Node
					key={name}
					x={i % 2 ? 184 : 44}
					y={676 + Math.floor(i / 2) * 48}
					w={132}
					h={40}
					label={name}
					size={10}
				/>
			))}

			<Line id={id} x1={110} y1={836} x2={110} y2={884} />
			<Label x={120} y={864} text="ok" size={10} />
			<Node x={44} y={884} w={132} h={52} label="pass" sub="output returned" size={12} subSize={9} />

			<Line id={id} x1={250} y1={836} x2={250} y2={884} accent={accent} />
			<Label x={260} y={864} text="fails" accent={accent} size={10} />
			<Node x={184} y={884} w={132} h={52} label="raise" sub="UnsupportedClaim" size={12} subSize={9} />
			<Badge cx={184} cy={884} text="5" accent={accent} r={8} />
		</svg>
	);
}

export default function GroundplaneArchitecture({ figure }) {
	const [mint600, mint300] = useToken("colors", ["mint.600", "mint.300"]);
	const accent = useColorModeValue(mint600, mint300);

	return (
		<Box
			as="figure"
			my={{ base: 10, md: 14 }}
			mx={0}
			width={{ base: "100%", lg: "calc(100vw - 32px)" }}
			maxW={{ base: "100%", lg: "1088px" }}>
			<Box
				border="1px solid"
				borderColor="border.subtle"
				px={{ base: 3, md: 5 }}
				py={{ base: 4, md: 6 }}
				lineHeight={0}>
				<Box display={{ base: "none", lg: "block" }}>
					<Wide accent={accent} />
				</Box>
				<Box display={{ base: "block", lg: "none" }}>
					<Narrow accent={accent} />
				</Box>
			</Box>
			<Text
				as="figcaption"
				mt={3}
				maxW="680px"
				fontFamily="var(--font-mono)"
				fontSize="11px"
				lineHeight="1.6"
				color="text.muted">
				{figure} — the whole library. ① Tool results are recorded as typed
				facts, each with the tool call that produced it; the two adapters do
				the same from inside LangGraph or MCP. ② A boundary names which facts
				a block of output may use and which checks run. ③ The model submits
				structured fields, never prose. ④ Five deterministic checks resolve
				each field against the recorded facts. ⑤ The first unsupported claim
				raises UnsupportedClaim with the provenance in the message; nothing is
				logged and ignored.
			</Text>
		</Box>
	);
}
