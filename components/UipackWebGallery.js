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
	fieldpack,
	groundplane,
	aiToolchain,
	skillpack,
} from "../lib/uipackGallery";

// A figure breaks out of the prose column to the main container width, like
// every case-study figure. Built from the preset's parts rather than its
// ready-made figure so phones scroll the wide drawing instead of getting the
// preset's stacked narrow one.
function GalleryFigure({ id, spec, parts, note }) {
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
				number={meta.number}
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
					fontSize="11px"
					lineHeight="1.6"
					color="text.muted">
					{note}
				</Text>
			) : null}
		</Box>
	);
}

// Match the discovered browser-suite count when its coverage changes.
const E2E_CASES = 140;

const GALLERY = [
	{
		id: "ai",
		spec: aiToolchain,
		parts: pipelineParts,
		note: "fig. 1 — the AI toolchain. Each project owns one decision: what the agent reads, whether the instruction helps, and whether the output agrees with recorded facts.",
	},
	{
		id: "gp",
		spec: groundplane,
		parts: agentLoopParts,
		note: "fig. 2 — groundplane. Hover the agent or a tool: the flow it belongs to lights up, the rest dims.",
	},
	{
		id: "sp",
		spec: skillpack,
		parts: syncLoopParts,
		note: "fig. 3 — skillpack. The pull and push are two connectors; each carries one head and one packet direction.",
	},
	{
		id: "fp",
		spec: fieldpack,
		parts: serviceMapParts,
		note: "fig. 4 — fieldpack. A bus on each side of the platform. Stubs carry no heads, the junction dot marks the join.",
	},
	{
		id: "dp",
		spec: deploy(E2E_CASES),
		parts: pipelineParts,
		note: "fig. 5 — this site. I run the browser suite before pushing. Vercel deploys main automatically; these checks are not an enforced deployment gate.",
	},
	{
		id: "cr",
		spec: connectorRule,
		parts: beforeAfterParts,
		note: "fig. 6 — the rule the earlier figures broke. The changed stages and their inbound edges are in accent.",
	},
];

export default function UipackWebGallery() {
	return GALLERY.map(({ id, spec, parts, note }) => (
		<GalleryFigure key={id} id={id} spec={spec} parts={parts} note={note} />
	));
}
