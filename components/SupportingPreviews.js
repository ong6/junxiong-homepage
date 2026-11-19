import { Fragment } from "react";
import { Connector, Defs, Figure, Node } from "uipack";
import styles from "./SupportingPreviews.module.css";

// Static previews for the "Also building" cards, in the lead cards' grammar:
// a flat 1px panel on the dotted canvas, mono labels at 12px, values at 16px.

// Every value is stated on /trading-engine/v2 ("What the engine owns" and the
// fact table): the $1.56 example fill, the fill types and the halt rules.
const fillRows = [
	["Fill", "Opening auction"],
	["Commission and fees", "$1.56"],
	["Account halts at", "−20% from peak · −5% in a day"],
];

export function TradingPreview() {
	return (
		<div data-panel className={styles.panel}>
			<div className={styles.head}>
				<p>Engine v2</p>
				<p>Example fill</p>
			</div>
			<div className={styles.body}>
				<p className={styles.fill}>Buy 300 shares at $5</p>
				<dl className={styles.rows}>
					{fillRows.map(([label, value], index) => (
						<div key={label} className={styles.row}>
							<dt className={styles.label}>{label}</dt>
							<dd className={`${styles.value} ${index === 1 ? styles.strong : ""}`}>{value}</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
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
export function UipackPreview() {
	return (
		<div data-panel className={`${styles.panel} ${styles.figure}`}>
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
		</div>
	);
}
