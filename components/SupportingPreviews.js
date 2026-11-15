import { Box, Flex, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { Connector, Defs, Figure, Node } from "uipack";

// Static previews for the "Also building" cards, in the lead cards' grammar:
// a flat 1px panel on the dotted canvas, mono labels at 12px, values at 16px.

const labelStyle = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
};

const panelProps = {
	"data-panel": true,
	maxW: "480px",
	bg: "preview.panel",
	border: "1px solid",
	borderColor: "border.subtle",
	borderRadius: "4px",
	boxShadow: "4px 4px 0 var(--chakra-colors-preview-shadow)",
};

// Every value is stated on /trading-engine/v2 ("What the engine owns" and the
// fact table): the $1.56 example fill, the fill types and the halt rules.
const fillRows = [
	["Fill", "Opening auction"],
	["Commission and fees", "$1.56"],
	["Account halts at", "−20% from peak · −5% in a day"],
];

export function TradingPreview() {
	return (
		<Box {...panelProps} overflow="hidden">
			<Flex justify="space-between" gap={4} px={4} py={2} borderBottom="1px solid" borderColor="border.subtle" color="text.muted" sx={labelStyle}>
				<Text>Engine v2</Text>
				<Text>Example fill</Text>
			</Flex>
			<Box p={4}>
				<Text fontSize="16px" fontWeight="700" lineHeight="text">
					Buy 300 shares at $5
				</Text>
				<Box as="dl" mt={3}>
					{fillRows.map(([label, value], index) => (
						<Flex key={label} wrap="wrap" align="baseline" justify="space-between" columnGap={6} py={2} borderTop="1px solid" borderColor="border.subtle">
							<Text as="dt" color="text.muted" lineHeight="text" sx={{ ...labelStyle, fontWeight: "400" }}>
								{label}
							</Text>
							<Text as="dd" m={0} ml="auto" fontSize="16px" lineHeight="text" fontWeight={index === 1 ? "700" : "400"} textAlign="right">
								{value}
							</Text>
						</Flex>
					))}
				</Box>
			</Box>
		</Box>
	);
}

// What UiPack holds, drawn with its own parts: one source of type, colour and
// spacing feeding the three things the card names. The words come from
// /uipack ("react + svg", Pause and Replay, speaker notes on every starter).
const OUTPUTS = [
	{ label: "Figures", sub: "react + svg", icon: "chart" },
	{ label: "Motion", sub: "pause · replay", icon: "tool" },
	{ label: "Slide starters", sub: "with speaker notes", icon: "doc" },
];

// Drawn at 1:1 so the labels render at their set sizes (16 / 12px): the wide
// drawing fits the 446px panel beside the copy, the narrow one a phone.
const NODE_TYPE = { size: 16, subSize: 12 };

function Wide() {
	return (
		<>
			<Defs id="home-uipack" />
			<Node x={4} y={72} w={196} h={64} label="UiPack" sub="type · colour · spacing" accent {...NODE_TYPE} />
			{OUTPUTS.map((out, i) => {
				const y = 4 + i * 72;
				return (
					<Fragment key={out.label}>
						<Connector
							defs="home-uipack"
							points={[
								[200, 104],
								[224, 104],
								[224, y + 28],
								[248, y + 28],
							]}
						/>
						<Node x={248} y={y} w={196} h={56} label={out.label} sub={out.sub} icon={out.icon} {...NODE_TYPE} />
					</Fragment>
				);
			})}
		</>
	);
}

function Narrow() {
	return (
		<>
			<Defs id="home-uipack-n" />
			<Node x={4} y={4} w={232} h={56} label="UiPack" sub="type · colour · spacing" accent {...NODE_TYPE} />
			{OUTPUTS.map((out, i) => {
				const y = 84 + i * 68;
				return (
					<Fragment key={out.label}>
						<Connector
							defs="home-uipack-n"
							points={[
								[20, 60],
								[20, y + 28],
								[44, y + 28],
							]}
						/>
						<Node x={44} y={y} w={192} h={56} label={out.label} sub={out.sub} icon={out.icon} {...NODE_TYPE} />
					</Fragment>
				);
			})}
		</>
	);
}

// The uipack Figure supplies the parts' styles and the phone switch; its own
// frame and ground give way to the panel's, so the card reads like the others.
const figureSx = {
	"& .uipack": { border: 0, borderRadius: 0, background: "transparent" },
	"& .uipack__canvas": { padding: "16px", background: "transparent" },
	"& .uipack__canvas > svg.uipack--wide": { maxWidth: "448px", marginInline: "auto" },
	"& .uipack__canvas > svg.uipack--narrow": { maxWidth: "240px", marginInline: "auto" },
};

export function UipackPreview() {
	return (
		<Box {...panelProps} overflow="hidden" sx={figureSx}>
			<Figure
				id="home-uipack"
				static
				expandable={false}
				chrome="quiet"
				background="plain"
				minFont={12}
				viewBox="0 0 448 208"
				narrow={<Narrow />}
				narrowViewBox="0 0 240 292"
				alt="UiPack supplies one set of type, colour and spacing to three kinds of part: figures in React and SVG, motion with pause and replay, and slide starters with speaker notes.">
				<Wide />
			</Figure>
		</Box>
	);
}
