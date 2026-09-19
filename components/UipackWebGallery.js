import { Box, Text } from "@chakra-ui/react";
import {
	agentLoop,
	beforeAfter,
	pipeline,
	serviceMap,
	skillLifecycle,
	syncLoop,
} from "uipack/presets";
import {
	connectorRule,
	deploy,
	fieldpack,
	groundplane,
	skillforge,
	skillpack,
} from "../lib/uipackGallery";

// A figure breaks out of the prose column to the main container width, like
// every case-study figure.
const Wide = ({ note, children }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0} w="min(100vw - 32px, 1088px)" maxW="none">
		{children}
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

// Match the discovered browser-suite count when its coverage changes.
const E2E_CASES = 101;

const GALLERY = [
	{
		id: "gp",
		render: () => agentLoop(groundplane, "gp"),
		note: "fig. 1 — groundplane. Hover the agent or a tool: the flow it belongs to lights up, the rest dims.",
	},
	{
		id: "sp",
		render: () => syncLoop(skillpack, "sp"),
		note: "fig. 2 — skillpack. The pull and push are two connectors; each carries one head and one packet direction.",
	},
	{
		id: "sf",
		render: () => skillLifecycle(skillforge, "sf"),
		note: "fig. 3 — skillforge. The dashed edge is feedback. It runs against the loop on purpose.",
	},
	{
		id: "fp",
		render: () => serviceMap(fieldpack, "fp"),
		note: "fig. 4 — fieldpack. A bus on each side of the platform. Stubs carry no heads, the junction dot marks the join.",
	},
	{
		id: "dp",
		render: () => pipeline(deploy(E2E_CASES), "dp"),
		note: "fig. 5 — this site. I run the browser suite before pushing. Vercel deploys main automatically; these checks are not an enforced deployment gate.",
	},
	{
		id: "cr",
		render: () => beforeAfter(connectorRule, "cr"),
		note: "fig. 6 — the rule the earlier figures broke. The changed stages and their inbound edges are in accent.",
	},
];

export default function UipackWebGallery() {
	return GALLERY.map(({ id, render, note }) => (
		<Wide key={id} note={note}>
			{render()}
		</Wide>
	));
}
