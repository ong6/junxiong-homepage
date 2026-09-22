// User-flow vocabulary: who is acting, what they see, what they do, where the
// flow branches and where it lands. Drawn on uipack's tokens so the figures sit
// beside the system diagrams without looking borrowed.
//
//   Actor    circle + person glyph, mono role label   (who)
//   Screen   mini window: title bar, title, two lines (what they see)
//   Action   pill                                     (what they do)
//   Decision diamond                                  (where it branches)
//   Outcome  stadium with a check, accent             (where it lands)
import { useFontFloor } from "uipack";

const STROKE = { stroke: "currentColor", strokeOpacity: 0.7, strokeWidth: 1.25 };

export function Actor({ cx, cy, r = 28, role, sub, labelSide = "below" }) {
	const size = useFontFloor(11);
	const subSize = useFontFloor(11);
	const s = (r * 1.25) / 16;
	const below = labelSide === "below";
	const tx = below ? cx : cx + r + 14;
	const ty = below ? cy + r + 22 : cy - 2;
	return (
		<g data-uipack="actor">
			<circle cx={cx} cy={cy} r={r} fill="var(--uipack-surface-raised, var(--uipack-surface))" {...STROKE} />
			<g
				transform={`translate(${cx - 8 * s}, ${cy - 8 * s}) scale(${s})`}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5 / s}
				strokeLinecap="round"
				strokeLinejoin="round">
				<circle cx="8" cy="5.5" r="3" />
				<path d="M2.5 14.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
			</g>
			<text
				x={tx}
				y={ty}
				textAnchor={below ? "middle" : "start"}
				fontFamily="var(--uipack-mono)"
				fontSize={size}
				fontWeight={700}
				letterSpacing=".08em"
				fill="currentColor">
				{role.toUpperCase()}
			</text>
			{sub ? (
				<text
					x={tx}
					y={ty + subSize + 6}
					textAnchor={below ? "middle" : "start"}
					fontFamily="var(--uipack-mono)"
					fontSize={subSize}
					fill="currentColor"
					fillOpacity={0.7}>
					{sub}
				</text>
			) : null}
		</g>
	);
}

export function Screen({ x, y, w, h = 128, title, lines = [], accent }) {
	const titleSize = useFontFloor(13);
	const lineSize = useFontFloor(11);
	const bar = 22;
	const stroke = accent ? "var(--uipack-accent)" : "currentColor";
	return (
		<g data-uipack="screen">
			<rect x={x} y={y} width={w} height={h} rx={6} fill="var(--uipack-surface)" stroke={stroke} strokeOpacity={accent ? 1 : 0.7} strokeWidth={1.25} />
			<line x1={x} y1={y + bar} x2={x + w} y2={y + bar} stroke={stroke} strokeOpacity={0.35} strokeWidth={1} />
			{[0, 1, 2].map((i) => (
				<circle key={i} cx={x + 12 + i * 9} cy={y + bar / 2} r={2.5} fill="currentColor" fillOpacity={0.35} />
			))}
			<text x={x + 14} y={y + bar + 24} fontSize={titleSize} fontWeight={600} fill={accent ? "var(--uipack-accent)" : "currentColor"}>
				{title}
			</text>
			{lines.map((t, i) => (
				<text
					key={t}
					x={x + 14}
					y={y + bar + 46 + i * (lineSize + 7)}
					fontFamily="var(--uipack-mono)"
					fontSize={lineSize}
					fill="currentColor"
					fillOpacity={0.75}>
					{t}
				</text>
			))}
			<rect x={x + 14} y={y + h - 16} width={(w - 28) * 0.55} height={5} rx={2.5} fill="currentColor" fillOpacity={0.12} />
		</g>
	);
}

export function Action({ x, y, w, h = 44, label, sub }) {
	const size = useFontFloor(13);
	const subSize = useFontFloor(11);
	return (
		<g data-uipack="action">
			<rect x={x} y={y} width={w} height={h} rx={h / 2} fill="var(--uipack-surface-raised, var(--uipack-surface))" {...STROKE} />
			<text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={600} fill="currentColor">
				{label}
			</text>
			{sub ? (
				<text
					x={x + w / 2}
					y={y + h + subSize + 6}
					textAnchor="middle"
					fontFamily="var(--uipack-mono)"
					fontSize={subSize}
					fill="currentColor"
					fillOpacity={0.7}>
					{sub}
				</text>
			) : null}
		</g>
	);
}

export function Decision({ cx, cy, r = 40, label }) {
	const size = useFontFloor(11);
	return (
		<g data-uipack="decision">
			<path d={`M ${cx} ${cy - r} L ${cx + r} ${cy} L ${cx} ${cy + r} L ${cx - r} ${cy} Z`} fill="var(--uipack-surface)" {...STROKE} strokeLinejoin="round" />
			<text x={cx} y={cy + size * 0.35} textAnchor="middle" fontFamily="var(--uipack-mono)" fontSize={size} fontWeight={700} fill="currentColor">
				{label}
			</text>
		</g>
	);
}

export function Outcome({ x, y, w, h = 56, label, sub }) {
	const size = useFontFloor(13);
	const subSize = useFontFloor(11);
	const cx = x + 22;
	const cy = y + h / 2;
	return (
		<g data-uipack="outcome">
			<rect x={x} y={y} width={w} height={h} rx={h / 2} fill="var(--uipack-surface)" stroke="var(--uipack-accent)" strokeWidth={1.5} />
			<circle cx={cx} cy={cy} r={10} fill="none" stroke="var(--uipack-accent)" strokeWidth={1.5} />
			<path d={`M ${cx - 4.5} ${cy} l 3 3 l 6 -6`} fill="none" stroke="var(--uipack-accent)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
			<text x={x + 42} y={sub ? cy - 3 : cy + size * 0.35} fontSize={size} fontWeight={600} fill="var(--uipack-accent)">
				{label}
			</text>
			{sub ? (
				<text x={x + 42} y={cy + subSize + 2} fontFamily="var(--uipack-mono)" fontSize={subSize} fill="currentColor" fillOpacity={0.75}>
					{sub}
				</text>
			) : null}
		</g>
	);
}

// Faint horizontal rule between lanes.
export function LaneRule({ x1, x2, y }) {
	return <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeOpacity={0.18} strokeWidth={1} strokeDasharray="2 6" />;
}
