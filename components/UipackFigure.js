import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { Figure } from "uipack";
import { agentLoopParts } from "uipack/presets";
import { MOBILE_MIN_FONT, SwipeHint, mobileScrollSx, useIsMobile, useOverflow, viewBoxWidth } from "./figureMobile";

// The one live figure on /uipack: uipack's agent-loop preset fed with
// Groundplane. Every fact here is read from github.com/ong6/groundplane;
// when a number changes there, change it here in the same session. The
// title and caption stay distinct from the /groundplane case study's own
// figure (e2e/polish.spec.js).
const groundplane = {
	figure: {
		eyebrow: "Agent loop · groundplane",
		title: "Checking the answer against tool results",
		caption:
			"The caller asks, the agent calls three tools and records what came back as facts. Configured checks validate declared output fields against those facts before the application returns the result.",
		alt: "A caller sends a request to an agent, the agent calls metrics, SQL and API tools and records their results as facts, then its output passes a groundplane boundary before it is returned.",
	},
	user: { label: "Caller", sub: "your app", icon: "user" },
	agent: { label: "Agent", sub: "plan · call · fill fields", icon: "agent" },
	tools: [
		{ label: "metrics", sub: "record_ranking()", icon: "chart" },
		{ label: "SQL", sub: "record_table()", icon: "db" },
		{ label: "API", sub: "record_domain()", icon: "cloud" },
	],
	boundary: { label: "groundplane boundary", sub: "facts= · checks= · 6 checks", icon: "lock" },
	output: { label: "Output", sub: "pass, or raise UnsupportedClaim", icon: "doc" },
	laneTitles: ["Caller", "Agent", "Tools"],
};

// Breaks out of the prose column to the main container width, like every
// case-study figure. Built from the preset's parts rather than its ready-made
// figure so phones scroll the wide drawing instead of getting the preset's
// stacked narrow one.
export default function UipackFigure(props) {
	const ref = useRef(null);
	const mobile = useIsMobile();
	const overflow = useOverflow(ref, mobile);
	const p = agentLoopParts(groundplane, "gp");
	const meta = groundplane.figure;
	return (
		<Box
			as="figure"
			ref={ref}
			data-reveal
			mx={0}
			w="min(100vw - 32px, 1088px)"
			maxW="none"
			// Above the wide-screen side rail, on an opaque ground, like
			// DiagramFigure: the drawing and its controls slide over the rail.
			position="relative"
			zIndex={1}
			bg="page.bg"
			sx={mobileScrollSx(viewBoxWidth(p.viewBox))}
			{...props}>
			<Figure
				id="gp"
				number="Figure 01"
				eyebrow={meta.eyebrow}
				title={meta.title}
				caption={meta.caption}
				legend={p.legend}
				viewBox={p.viewBox}
				minFont={mobile ? MOBILE_MIN_FONT : 11}
				alt={meta.alt}>
				{p.wide}
			</Figure>
			{overflow ? <SwipeHint /> : null}
		</Box>
	);
}
