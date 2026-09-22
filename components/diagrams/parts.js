// The site's diagram vocabulary, now drawn by uipack. The old hand-laid
// primitives (Line with x1/y1/x2/y2, accent as a colour string) are kept as
// thin wrappers so every figure keeps its 8px-grid coordinates; new work uses
// the uipack parts directly.
import {
	Badge as UBadge,
	Connector,
	Defs as UDefs,
	Group as UGroup,
	Label as ULabel,
	Lane as ULane,
	Node as UNode,
	Packet,
	route,
} from "uipack";

export { Connector, Packet, route };

// Text sizes are clamped by uipack's own floor (Figure `minFont`, 11px at the
// rendered width), so nothing here needs to raise them.
export const Defs = ({ id }) => <UDefs id={id} />;

export const Node = ({ accent, ...rest }) => <UNode {...rest} accent={!!accent} />;

// Dashed region: an environment, a tenant boundary, an async area.
export const Group = ({ accent, titleSize = 11, ...rest }) => <UGroup {...rest} variant="dashed" accent={!!accent} titleSize={titleSize} />;

export const Lane = (props) => <ULane {...props} />;

// Straight segment or arrow. `kind` colours it by token kind; `accent` is the
// figure's one highlighted path.
export const Line = ({ x1, y1, x2, y2, id, arrow = true, accent, dashed, kind, flow }) => (
	<Connector
		points={[
			[x1, y1],
			[x2, y2],
		]}
		defs={id}
		arrow={arrow}
		dashed={dashed}
		kind={kind || (accent ? "accent" : undefined)}
		flow={flow}
	/>
);

export const Label = ({ accent, ...rest }) => <ULabel {...rest} accent={!!accent} />;

// Step marker: uipack's Badge, one unit larger than its default and with a
// digit that follows the figure's text floor.
export const Badge = ({ accent, r = 10, ...rest }) => <UBadge {...rest} accent={!!accent} r={r} size={11} />;

// A packet on a straight segment; the figure passes the same coordinates it
// gave the Line.
export const Flow = ({ x1, y1, x2, y2, kind = "request", dur = 2.4, delay = 0, reverse, r = 4.5, flow }) => (
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
		flow={flow}
	/>
);
