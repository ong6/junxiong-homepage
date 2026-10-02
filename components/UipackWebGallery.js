import { Box, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { Figure } from "uipack";
import {
	agentLoopParts,
	beforeAfterParts,
	pipelineParts,
	serviceMapParts,
	syncLoopParts,
} from "uipack/presets";
import { MOBILE_MIN_FONT, SwipeHint, mobileScrollSx, useIsMobile, useOverflow, viewBoxWidth } from "./figureMobile";
import {
	connectorRule,
	deploy,
	fieldEngineering,
	groundplane,
	aiToolchain,
	skills,
} from "../lib/uipackGallery";

// A figure breaks out of the prose column to the main container width, like
// every case-study figure. Built from the preset's parts rather than its
// ready-made figure so phones scroll the wide drawing instead of getting the
// preset's stacked narrow one.
function GalleryFigure({ id, spec, parts, n, note }) {
	const ref = useRef(null);
	const mobile = useIsMobile();
	const overflow = useOverflow(ref, mobile);
	const p = parts(spec, id);
	const meta = spec.figure;
	return (
		<Box
			as="figure"
			ref={ref}
			my={{ base: 10, md: 14 }}
			mx={0}
			w="min(100vw - 32px, 1088px)"
			maxW="none"
			sx={mobileScrollSx(viewBoxWidth(p.viewBox))}>
			<Figure
				id={id}
				number={`Figure ${String(n).padStart(2, "0")}`}
				eyebrow={meta.eyebrow}
				title={meta.title}
				caption={meta.caption}
				headingLevel={meta.headingLevel}
				legend={p.legend}
				viewBox={p.viewBox}
				minFont={mobile ? MOBILE_MIN_FONT : 11}
				alt={meta.alt}>
				{p.wide}
			</Figure>
			{overflow ? <SwipeHint /> : null}
			{note ? (
				<Text
					as="figcaption"
					mt={3}
					fontFamily="var(--font-mono)"
					fontSize="12px"
					lineHeight="1.6"
					color="text.muted">
					fig. {n} — {note}
				</Text>
			) : null}
		</Box>
	);
}

// Match the discovered browser-suite count when its coverage changes.
const E2E_CASES = 183;

const GALLERY = [
	{
		id: "ai",
		spec: aiToolchain,
		parts: pipelineParts,
		note: "the AI toolchain. Each project owns one decision: what the agent reads, whether the instruction helps, and whether the output agrees with recorded facts.",
	},
	{
		id: "gp",
		spec: groundplane,
		parts: agentLoopParts,
		note: "groundplane. Hover the agent or a tool: the flow it belongs to lights up, the rest dims.",
	},
	{
		id: "sp",
		spec: skills,
		parts: syncLoopParts,
		note: "skills. The pull and push are two connectors; each carries one head and one packet direction.",
	},
	{
		id: "fp",
		spec: fieldEngineering,
		parts: serviceMapParts,
		note: "field-engineering skills. A bus on each side of the platform. Stubs carry no heads, the junction dot marks the join.",
	},
	{
		id: "dp",
		spec: deploy(E2E_CASES),
		parts: pipelineParts,
		note: "this site. I run the browser suite before pushing. Vercel deploys main automatically; these checks are not an enforced deployment gate.",
	},
	{
		id: "cr",
		spec: connectorRule,
		parts: beforeAfterParts,
		note: "the rule the earlier figures broke. The changed stages and their inbound edges are in accent.",
	},
];

// The gallery numbers its own figures, so the title and the caption under it
// always agree, whatever number a spec carries on its home page.
export default function UipackWebGallery() {
	return GALLERY.map(({ id, spec, parts, note }, i) => (
		<GalleryFigure key={id} id={id} spec={spec} parts={parts} n={i + 1} note={note} />
	));
}
