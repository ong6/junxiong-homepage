// Shared SVG parts for the hand-laid case-study diagrams. Everything is drawn
// on an 8px grid in `currentColor`, with one accent hue per figure passed in by
// the caller, so the same primitives read correctly in light and dark.

export const SURFACE = "var(--chakra-colors-surface-raised)";
export const PAGE = "var(--chakra-colors-page-bg)";

export const Defs = ({ id, accent }) => (
	<defs>
		<marker
			id={`${id}-head`}
			markerWidth="8"
			markerHeight="8"
			refX="8"
			refY="4"
			orient="auto"
			markerUnits="userSpaceOnUse">
			<path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
		</marker>
		<marker
			id={`${id}-head-accent`}
			markerWidth="8"
			markerHeight="8"
			refX="8"
			refY="4"
			orient="auto"
			markerUnits="userSpaceOnUse">
			<path d="M0,0 L8,4 L0,8 z" fill={accent} />
		</marker>
	</defs>
);

export const Node = ({ x, y, w, h, label, sub, size = 15, subSize = 12 }) => (
	<g>
		<rect
			x={x}
			y={y}
			width={w}
			height={h}
			rx="6"
			fill={SURFACE}
			stroke="currentColor"
			strokeOpacity="0.55"
			strokeWidth="1.25"
		/>
		<text
			x={x + w / 2}
			y={sub ? y + h / 2 - 2 : y + h / 2 + 5}
			textAnchor="middle"
			fontSize={size}
			fontWeight="600"
			fill="currentColor">
			{label}
		</text>
		{sub ? (
			<text
				x={x + w / 2}
				y={y + h / 2 + 18}
				textAnchor="middle"
				fontSize={subSize}
				fontFamily="var(--font-mono)"
				fill="currentColor"
				fillOpacity="0.7">
				{sub}
			</text>
		) : null}
	</g>
);

// Dashed region: an environment, a tenant boundary, an async area.
export const Group = ({ x, y, w, h, title, accent, titleSize = 11 }) => (
	<g>
		<rect
			x={x}
			y={y}
			width={w}
			height={h}
			rx="10"
			fill="none"
			stroke={accent || "currentColor"}
			strokeOpacity={accent ? 0.55 : 0.35}
			strokeWidth="1.25"
			strokeDasharray="4 4"
		/>
		<text
			x={x + 16}
			y={y + 22}
			fontSize={titleSize}
			fontFamily="var(--font-mono)"
			letterSpacing=".08em"
			fill={accent || "currentColor"}
			fillOpacity={accent ? 1 : 0.7}>
			{title}
		</text>
	</g>
);

// Arrow or plain segment. Labels carry a page-coloured underlay so they never
// cross a stroke.
export const Line = ({ x1, y1, x2, y2, id, arrow = true, accent, dashed }) => (
	<line
		x1={x1}
		y1={y1}
		x2={x2}
		y2={y2}
		stroke={accent || "currentColor"}
		strokeOpacity={accent ? 1 : 0.55}
		strokeWidth="1.25"
		strokeDasharray={dashed ? "5 4" : undefined}
		markerEnd={arrow ? `url(#${id}-head${accent ? "-accent" : ""})` : undefined}
	/>
);

export const Label = ({ x, y, text, anchor = "start", accent, size = 12 }) => {
	const w = text.length * size * 0.62 + 8;
	const rx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w + 4 : x - 4;
	return (
		<g>
			<rect x={rx} y={y - size + 1} width={w} height={size + 5} fill={PAGE} />
			<text
				x={x}
				y={y}
				textAnchor={anchor}
				fontSize={size}
				fontFamily="var(--font-mono)"
				fill={accent || "currentColor"}
				fillOpacity={accent ? 1 : 0.75}>
				{text}
			</text>
		</g>
	);
};

// Step marker: a circled digit or letter, sat on a node corner or an arrow.
export const Badge = ({ cx, cy, text, accent, r = 9 }) => (
	<g>
		<circle
			cx={cx}
			cy={cy}
			r={r}
			fill={PAGE}
			stroke={accent || "currentColor"}
			strokeOpacity={accent ? 1 : 0.55}
			strokeWidth="1.25"
		/>
		<text
			x={cx}
			y={cy + 3.5}
			textAnchor="middle"
			fontSize="10"
			fontFamily="var(--font-mono)"
			fontWeight="700"
			fill={accent || "currentColor"}
			fillOpacity={accent ? 1 : 0.8}>
			{text}
		</text>
	</g>
);
