// Sequence vocabulary: participants across the top, time runs down their
// lifelines, messages are numbered arrows between them. Drawn on uipack's
// tokens so a sequence reads as the same family as the system figures.
//
//   Participant  uipack Node at the head of a lifeline
//   Lifeline     faint dashed rule down from the participant
//   Activation   narrow bar while a participant is doing the work
//   Message      numbered arrow with its label above
//   Lost         a message that never arrives, ending in ✕
//   SelfLoop     a participant calling itself (a retry)
//   Note         dashed card pinned to a lifeline
import { Badge, Connector, Label as ULabel, Node, useFontFloor } from "uipack";

export const Participant = (props) => <Node {...props} />;

export function Lifeline({ x, y1, y2 }) {
	return <line x1={x} y1={y1} x2={x} y2={y2} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="3 5" />;
}

export function Activation({ x, y1, y2, accent }) {
	return (
		<rect
			x={x - 6}
			y={y1}
			width={12}
			height={y2 - y1}
			rx={2}
			fill={accent ? "var(--uipack-accent)" : "currentColor"}
			fillOpacity={0.14}
			stroke={accent ? "var(--uipack-accent)" : "currentColor"}
			strokeOpacity={0.6}
			strokeWidth={1}
		/>
	);
}

// Label sits centred above the arrow; the step badge sits on the sender's
// lifeline so the numbers read straight down the page.
export function Message({ id, from, to, y, n, label, kind, dashed, labelSize = 12, accent }) {
	const dir = to > from ? 1 : -1;
	return (
		<g data-uipack="message">
			<Connector
				points={[
					[from + dir * 14, y],
					[to - dir * 8, y],
				]}
				defs={id}
				kind={kind || (accent ? "accent" : undefined)}
				dashed={dashed}
			/>
			<ULabel x={(from + to) / 2} y={y - 10} text={label} anchor="middle" size={labelSize} accent={!!accent} />
			{n != null ? <Badge cx={from} cy={y} text={String(n)} r={10} size={11} accent={!!accent} /> : null}
		</g>
	);
}

export function Lost({ id, from, to, y, n, label, labelSize = 12 }) {
	const dir = to > from ? 1 : -1;
	const end = to - dir * 16;
	return (
		<g data-uipack="lost">
			<Connector
				points={[
					[from + dir * 14, y],
					[end, y],
				]}
				defs={id}
				arrow={false}
				dashed
			/>
			<g stroke="currentColor" strokeOpacity={0.8} strokeWidth={1.75} strokeLinecap="round">
				<line x1={end - 5} y1={y - 5} x2={end + 5} y2={y + 5} />
				<line x1={end - 5} y1={y + 5} x2={end + 5} y2={y - 5} />
			</g>
			<ULabel x={(from + to) / 2} y={y - 10} text={label} anchor="middle" size={labelSize} />
			{n != null ? <Badge cx={from} cy={y} text={String(n)} r={10} size={11} /> : null}
		</g>
	);
}

export function SelfLoop({ id, x, y, h = 36, side = "left", w = 44, n, kind }) {
	const dx = side === "left" ? -w : w;
	const off = side === "left" ? -8 : 8;
	return (
		<g data-uipack="self-loop">
			<Connector
				points={[
					[x + off, y],
					[x + dx, y],
					[x + dx, y + h],
					[x + off, y + h],
				]}
				defs={id}
				kind={kind}
				dashed
			/>
			{n != null ? <Badge cx={x} cy={y} text={String(n)} r={10} size={11} /> : null}
		</g>
	);
}

export function Note({ x, y, w, h, title, lines = [], accent }) {
	const titleSize = useFontFloor(12);
	const lineSize = useFontFloor(11);
	const stroke = accent ? "var(--uipack-accent)" : "currentColor";
	return (
		<g data-uipack="note">
			<rect x={x} y={y} width={w} height={h} rx={4} fill="var(--uipack-surface)" stroke={stroke} strokeOpacity={accent ? 0.9 : 0.6} strokeWidth={1.25} strokeDasharray="4 4" />
			<text x={x + 12} y={y + 20} fontFamily="var(--uipack-mono)" fontSize={titleSize} fontWeight={700} letterSpacing=".06em" fill={accent ? "var(--uipack-accent)" : "currentColor"}>
				{title.toUpperCase()}
			</text>
			{lines.map((t, i) => (
				<text key={t} x={x + 12} y={y + 38 + i * (lineSize + 6)} fontFamily="var(--uipack-mono)" fontSize={lineSize} fill="currentColor" fillOpacity={0.8}>
					{t}
				</text>
			))}
		</g>
	);
}
