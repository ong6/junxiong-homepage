import { Box, Text, useColorModeValue, useToken } from "@chakra-ui/react";
import { Defs, Group, Label, Line, Node } from "./primitives";

// Claim: a question fans out across five knowledge bases with hybrid search,
// the survivors are reranked by a cross-encoder, and every citation is checked
// against its chunk before the answer ships. Accent follows the retrieval path.

const CLAIM =
	"A question fans out across five knowledge bases with hybrid search, the survivors are reranked by a cross-encoder, and every citation is checked against its chunk before the answer ships.";

const KB_X_WIDE = [68, 188, 308, 428, 548];
const KB_X_NARROW = [44, 100, 156, 212, 268];

const NARROW_TAIL = [
	{
		label: "Cross-encoder rerank",
		sub: "final order",
		arrow: "top chunks",
	},
	{
		label: "Summarise references",
		sub: "kept chunks only",
		arrow: "prompt context",
	},
	{
		label: "Model gateway",
		sub: "9 models · prompt cache",
		arrow: "writes",
	},
	{
		label: "Citation entailment check",
		sub: "claim ⊨ chunk",
		arrow: "verified",
	},
	{ label: "Answer with citations", sub: "match score per chunk" },
];

function Wide({ accent }) {
	const id = "cqf-w";
	return (
		<svg
			viewBox="0 0 720 1032"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Node x={232} y={32} w={256} h={56} label="User question" />
			<Line id={id} x1={360} y1={88} x2={360} y2={128} />
			<Label x={372} y={112} text="asks" />

			<Node
				x={232}
				y={128}
				w={256}
				h={72}
				label="Domain agent"
				sub="1 of 4 · tenant-gated"
			/>
			<Line id={id} x1={360} y1={200} x2={360} y2={240} />
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
			<Line id={id} x1={360} y1={312} x2={360} y2={384} arrow={false} accent={accent} />
			<Label x={372} y={340} text="BM25 + vector · RRF" accent={accent} />
			<Line id={id} x1={120} y1={384} x2={600} y2={384} arrow={false} accent={accent} />
			{KB_X_WIDE.map((x) => (
				<Line key={x} id={id} x1={x + 52} y1={384} x2={x + 52} y2={408} accent={accent} />
			))}

			<Group
				x={44}
				y={352}
				w={632}
				h={136}
				title="UP TO 5 KNOWLEDGE BASES · PARALLEL"
			/>
			{KB_X_WIDE.map((x, i) => (
				<Node key={x} x={x} y={408} w={104} h={56} label={`kb ${i + 1}`} size={13} />
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
					accent={accent}
				/>
			))}
			<Line id={id} x1={120} y1={496} x2={600} y2={496} arrow={false} accent={accent} />
			<Line id={id} x1={360} y1={496} x2={360} y2={536} accent={accent} />
			<Label x={372} y={521} text="floor 0.35" accent={accent} />

			<Node
				x={232}
				y={536}
				w={256}
				h={72}
				label="Cross-encoder rerank"
				sub="final order"
			/>
			<Line id={id} x1={360} y1={608} x2={360} y2={648} />
			<Label x={372} y={632} text="top chunks" />

			<Node
				x={232}
				y={648}
				w={256}
				h={72}
				label="Summarise references"
				sub="kept chunks only"
			/>
			<Line id={id} x1={360} y1={720} x2={360} y2={760} />
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
			<Line id={id} x1={360} y1={832} x2={360} y2={928} />
			<Label x={348} y={912} text="writes" anchor="end" />
			<Line id={id} x1={360} y1={880} x2={488} y2={880} />
			<Label x={424} y={874} text="every citation" anchor="middle" size={11} />
			<Node
				x={488}
				y={848}
				w={192}
				h={64}
				label="Citation entailment check"
				sub="claim ⊨ chunk"
				size={12}
				subSize={11}
			/>

			<Node
				x={232}
				y={928}
				w={256}
				h={72}
				label="Answer with citations"
				sub="match score per chunk"
			/>
		</svg>
	);
}

function Narrow({ accent }) {
	const id = "cqf-n";
	const tail = NARROW_TAIL.map((s, i) => ({ ...s, y: 480 + i * 104 }));
	return (
		<svg
			viewBox="0 0 360 984"
			style={{ width: "100%", height: "auto", display: "block" }}
			role="img"
			aria-label={CLAIM}>
			<Defs id={id} accent={accent} />

			<Node x={40} y={24} w={280} h={52} label="User question" size={14} />
			<Line id={id} x1={180} y1={76} x2={180} y2={116} />
			<Label x={190} y={101} text="asks" size={11} />

			<Node
				x={40}
				y={116}
				w={280}
				h={64}
				label="Domain agent"
				sub="1 of 4 · tenant-gated"
				size={14}
				subSize={11}
			/>
			<Line id={id} x1={180} y1={180} x2={180} y2={220} />
			<Label x={190} y={205} text="tool call" size={11} />

			<Node
				x={40}
				y={220}
				w={280}
				h={64}
				label="Contextual RAG search"
				sub="OpenAI embed · 1536-dim"
				size={14}
				subSize={11}
			/>

			<Line id={id} x1={180} y1={284} x2={180} y2={352} arrow={false} accent={accent} />
			<Label x={190} y={310} text="BM25 + vector · RRF" accent={accent} size={11} />
			<Line id={id} x1={68} y1={352} x2={292} y2={352} arrow={false} accent={accent} />
			{KB_X_NARROW.map((x) => (
				<Line key={x} id={id} x1={x + 24} y1={352} x2={x + 24} y2={368} accent={accent} />
			))}

			<Group x={20} y={324} w={320} h={116} title="5 KBS · PARALLEL" titleSize={10} />
			{KB_X_NARROW.map((x, i) => (
				<Node key={x} x={x} y={368} w={48} h={48} label={`${i + 1}`} size={13} />
			))}

			{KB_X_NARROW.map((x) => (
				<Line
					key={x}
					id={id}
					x1={x + 24}
					y1={416}
					x2={x + 24}
					y2={448}
					arrow={false}
					accent={accent}
				/>
			))}
			<Line id={id} x1={68} y1={448} x2={292} y2={448} arrow={false} accent={accent} />
			<Line id={id} x1={180} y1={448} x2={180} y2={480} accent={accent} />
			<Label x={190} y={469} text="floor 0.35" accent={accent} size={11} />

			{tail.map((s) => (
				<g key={s.label}>
					<Node
						x={40}
						y={s.y}
						w={280}
						h={64}
						label={s.label}
						sub={s.sub}
						size={14}
						subSize={11}
					/>
					{s.arrow ? (
						<>
							<Line id={id} x1={180} y1={s.y + 64} x2={180} y2={s.y + 104} />
							<Label x={190} y={s.y + 89} text={s.arrow} size={11} />
						</>
					) : null}
				</g>
			))}
		</svg>
	);
}

export default function CompozeQueryFlow({ figure }) {
	const [mint600, mint300] = useToken("colors", ["mint.600", "mint.300"]);
	const accent = useColorModeValue(mint600, mint300);

	return (
		<Box as="figure" my={{ base: 10, md: 14 }} mx={0}>
			<Box
				border="1px solid"
				borderColor="border.subtle"
				px={{ base: 3, md: 5 }}
				py={{ base: 4, md: 6 }}
				lineHeight={0}>
				<Box display={{ base: "none", smmd: "block" }}>
					<Wide accent={accent} />
				</Box>
				<Box display={{ base: "block", smmd: "none" }}>
					<Narrow accent={accent} />
				</Box>
			</Box>
			<Text
				as="figcaption"
				mt={3}
				fontFamily="var(--font-mono)"
				fontSize="11px"
				lineHeight="1.6"
				color="text.muted">
				{figure} — one question, five knowledge bases searched at once, each
				lane running keyword and vector search and fusing the two. Only chunks
				over the 0.35 floor survive, a cross-encoder puts them in final order,
				and every citation in the draft is checked against the chunk it points
				at before the answer ships.
			</Text>
		</Box>
	);
}
