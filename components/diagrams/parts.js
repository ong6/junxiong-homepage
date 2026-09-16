// The site's diagram vocabulary, now drawn by uipack. The old hand-laid
// primitives (Line with x1/y1/x2/y2, accent as a colour string) are kept as
// thin wrappers so every figure keeps its 8px-grid coordinates; new work uses
// the uipack parts directly.
import { createContext, useContext } from "react";
import {
	Chip,
	Connector,
	Defs as UDefs,
	Group as UGroup,
	Label as ULabel,
	Lane as ULane,
	Node as UNode,
	Packet,
	Token,
	anchor,
	pointAlong,
	route,
} from "uipack";

export { Chip, Connector, Packet, Token, anchor, pointAlong, route };

// A wide drawing is scaled down to the 1088px figure, so a font size in user
// units lands smaller on screen. `Floor` sets the smallest size a wide
// drawing may use (12 for a 1120 viewBox, 13 for 1200) so nothing renders
// under 11px at 1440. Narrow drawings scale about 1:1 and skip it.
const FloorCtx = createContext(0);
export const Floor = ({ min, children }) => <FloorCtx.Provider value={min}>{children}</FloorCtx.Provider>;
const useFloor = () => useContext(FloorCtx);
const atLeast = (v, min) => (v == null ? min : Math.max(v, min));

export const Defs = ({ id }) => <UDefs id={id} />;

export const Node = ({ accent, size = 14, subSize = 11, ...rest }) => {
	const min = useFloor();
	return <UNode {...rest} accent={!!accent} size={atLeast(size, min)} subSize={atLeast(subSize, min)} />;
};

// Dashed region: an environment, a tenant boundary, an async area.
export const Group = ({ accent, titleSize = 11, ...rest }) => {
	const min = useFloor();
	return <UGroup {...rest} variant="dashed" accent={!!accent} titleSize={atLeast(titleSize, min)} />;
};

export const Lane = ({ size = 11, ...rest }) => <ULane {...rest} size={atLeast(size, useFloor())} />;

// Straight segment or arrow. `kind` colours it by token kind; `accent` is the
// figure's one highlighted path.
export const Line = ({ x1, y1, x2, y2, id, arrow = true, accent, dashed, kind }) => (
	<Connector
		points={[
			[x1, y1],
			[x2, y2],
		]}
		defs={id}
		arrow={arrow}
		dashed={dashed}
		kind={kind || (accent ? "accent" : undefined)}
	/>
);

export const Label = ({ accent, size = 11, ...rest }) => <ULabel {...rest} accent={!!accent} size={atLeast(size, useFloor())} />;

// Step marker. Drawn here rather than uipack's Badge so the digit follows the
// floor (uipack fixes it at 10 user units).
export const Badge = ({ cx, cy, text, accent, r = 10 }) => {
	const size = atLeast(11, useFloor());
	const stroke = accent ? "var(--uipack-accent)" : "currentColor";
	return (
		<g data-uipack="badge">
			<circle cx={cx} cy={cy} r={r} fill="var(--uipack-bg)" stroke={stroke} strokeOpacity={accent ? 1 : 0.6} strokeWidth={1.25} />
			<text x={cx} y={cy + size * 0.36} textAnchor="middle" fontSize={size} fontFamily="var(--uipack-mono)" fontWeight={700} fill={stroke}>
				{text}
			</text>
		</g>
	);
};

// A packet on a straight segment; the figure passes the same coordinates it
// gave the Line.
export const Flow = ({ x1, y1, x2, y2, kind = "request", dur = 2.4, delay = 0, reverse, r = 4.5 }) => (
	<Packet
		points={[
			[x1, y1],
			[x2, y2],
		]}
		kind={kind}
		dur={dur}
		delay={delay}
		reverse={reverse}
		r={r}
	/>
);
