import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Figure } from "uipack";
import { MOBILE_MIN_FONT, MOBILE_QUERY, MOBILE_SCALE, SwipeHint, mobileScrollProps, useIsMobile, useOverflow, viewBoxWidth } from "./figureMobile";
import Portal from "./Portal";
import styles from "./DiagramFigure.module.css";
// One figure wrapper for every diagram. Inline, the drawing sits in a uipack
// Figure (eyebrow, title, caption, legend, Pause and Replay, dotted canvas).
// Its own Open canvas is switched off: Expand below is the one way to enlarge.
// Phones keep the wide drawing and scroll it sideways (see figureMobile.js).
// An expand control under the card opens the wide drawing full-screen with
// wheel / pinch zoom and drag pan, written by hand on a CSS transform so
// nothing new ships in the bundle.

// Zoom floor is MIN or the fit-to-screen scale, whichever is smaller.
const MIN = 0.5;
const MAX = 6;
const PAD = 48;
// Height kept clear for the zoom toolbar at the top of the stage.
const TOOLBAR = 72;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Toolbar button: mono glyph, theme border, kept tiny so the overlay stays
// small.
const Ctl = forwardRef(function Ctl({ label, className, children, ...rest }, ref) {
	return (
		<button type="button" aria-label={label} title={label} className={className ? `${styles.ctl} ${className}` : styles.ctl} ref={ref} {...rest}>
			{children}
		</button>
	);
});

function Overlay({ Wide, id, viewBox, alt, caption, onClose }) {
	// The Portal mounts its children a tick after the overlay renders, so the
	// stage is tracked as state rather than a ref: effects wait for it.
	const [stage, setStage] = useState(null);
	const svgBoxRef = useRef(null);
	const panelRef = useRef(null);
	const closeRef = useRef(null);
	const [size, setSize] = useState({ w: 0, h: 0 });
	const [view, setView] = useState({ s: 1, x: 0, y: 0, fit: 1 });
	void alt;
	const [dragging, setDragging] = useState(false);
	const pointers = useRef(new Map());
	const gesture = useRef(null);

	const captionRef = useRef(null);

	// Read the drawing's native size from its viewBox, then fit it between the
	// toolbar and the caption panel. On a phone, fitting a wide drawing shrinks
	// its labels past reading, so it opens at the inline figure's scale instead,
	// top-left, ready to pan; "fit" still shows the whole drawing.
	const fit = useCallback(
		(whole = false) => {
			const svg = svgBoxRef.current && svgBoxRef.current.querySelector("svg");
			if (!stage || !svg) return;
			const vb = svg.viewBox.baseVal;
			setSize({ w: vb.width, h: vb.height });
			const sw = stage.clientWidth;
			const sh = stage.clientHeight;
			const top = TOOLBAR;
			const bottom = (captionRef.current ? captionRef.current.offsetHeight : 0) + PAD / 2;
			const room = sh - top - bottom;
			const s = Math.min((sw - PAD) / vb.width, (room - PAD) / vb.height, MAX);
			if (!whole && window.matchMedia(MOBILE_QUERY).matches && s < MOBILE_SCALE) {
				setView({ s: MOBILE_SCALE, x: PAD / 2, y: top + PAD / 2, fit: s });
				return;
			}
			setView({ s, x: (sw - vb.width * s) / 2, y: top + (room - vb.height * s) / 2, fit: s });
		},
		[stage],
	);

	// Zoom so the stage point (cx, cy) stays under the cursor.
	const zoomAt = useCallback((factor, cx, cy) => {
		setView((v) => {
			const s = clamp(v.s * factor, Math.min(MIN, v.fit), MAX);
			const k = s / v.s;
			return { ...v, s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
		});
	}, []);

	const zoomCentre = (factor) => {
		if (!stage) return;
		zoomAt(factor, stage.clientWidth / 2, stage.clientHeight / 2);
	};

	useEffect(() => {
		if (!stage) return undefined;
		fit();
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const trigger = document.activeElement;
		if (closeRef.current) closeRef.current.focus();
		const onResize = () => fit();
		window.addEventListener("resize", onResize);
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener("resize", onResize);
			if (trigger && typeof trigger.focus === "function") trigger.focus();
		};
	}, [stage, fit]);

	// Wheel must be non-passive to stop the page scrolling underneath.
	useEffect(() => {
		if (!stage) return undefined;
		const onWheel = (e) => {
			e.preventDefault();
			const r = stage.getBoundingClientRect();
			const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015));
			zoomAt(factor, e.clientX - r.left, e.clientY - r.top);
		};
		stage.addEventListener("wheel", onWheel, { passive: false });
		return () => stage.removeEventListener("wheel", onWheel);
	}, [stage, zoomAt]);

	// Esc closes; Tab stays inside the dialog.
	const onKeyDown = (e) => {
		if (e.key === "Escape") {
			e.stopPropagation();
			onClose();
			return;
		}
		if (e.key === "Tab" && panelRef.current) {
			const items = panelRef.current.querySelectorAll("button");
			if (!items.length) return;
			const first = items[0];
			const last = items[items.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	};

	const onPointerDown = (e) => {
		if (e.button != null && e.button !== 0) return;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {
			// Synthetic or already-released pointers: capture is a nicety, not a need.
		}
		pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const pts = [...pointers.current.values()];
		const v = view;
		setDragging(true);
		if (pts.length === 1) {
			gesture.current = { kind: "pan", x: v.x, y: v.y, sx: pts[0].x, sy: pts[0].y, moved: false };
		} else if (pts.length === 2) {
			const r = e.currentTarget.getBoundingClientRect();
			gesture.current = {
				kind: "pinch",
				s: v.s,
				fit: v.fit,
				x: v.x,
				y: v.y,
				d: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
				mx: (pts[0].x + pts[1].x) / 2 - r.left,
				my: (pts[0].y + pts[1].y) / 2 - r.top,
				moved: true,
			};
		}
	};

	const onPointerMove = (e) => {
		if (!pointers.current.has(e.pointerId) || !gesture.current) return;
		pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const g = gesture.current;
		const pts = [...pointers.current.values()];
		if (g.kind === "pan" && pts.length === 1) {
			const dx = pts[0].x - g.sx;
			const dy = pts[0].y - g.sy;
			if (Math.abs(dx) + Math.abs(dy) > 3) g.moved = true;
			setView((v) => ({ ...v, x: g.x + dx, y: g.y + dy }));
		} else if (g.kind === "pinch" && pts.length === 2) {
			const r = e.currentTarget.getBoundingClientRect();
			const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			const mx = (pts[0].x + pts[1].x) / 2 - r.left;
			const my = (pts[0].y + pts[1].y) / 2 - r.top;
			const s = clamp((g.s * d) / g.d, Math.min(MIN, g.fit), MAX);
			const k = s / g.s;
			setView((v) => ({
				...v,
				s,
				x: mx - (g.mx - g.x) * k,
				y: my - (g.my - g.y) * k,
			}));
		}
	};

	const onPointerUp = (e) => {
		const wasClick = gesture.current && gesture.current.kind === "pan" && !gesture.current.moved;
		pointers.current.delete(e.pointerId);
		if (pointers.current.size === 0) {
			gesture.current = null;
			setDragging(false);
			// A plain click on the scrim (not on the drawing) closes.
			const box = svgBoxRef.current && svgBoxRef.current.getBoundingClientRect();
			const onDrawing =
				box &&
				e.clientX >= box.left &&
				e.clientX <= box.right &&
				e.clientY >= box.top &&
				e.clientY <= box.bottom;
			if (wasClick && !onDrawing) onClose();
		} else if (pointers.current.size === 1) {
			const [p] = pointers.current.values();
			const v = view;
			gesture.current = { kind: "pan", x: v.x, y: v.y, sx: p.x, sy: p.y, moved: true };
		}
	};

	const pct = Math.round((view.s / (view.fit || 1)) * 100);

	return (
		<Portal>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label={`Diagram ${shortCaption(caption)}, expanded`}
				onKeyDown={onKeyDown}
				className={styles.overlay}>
				<div
					ref={setStage}
					className={styles.stage}
					style={{ touchAction: "none", cursor: dragging ? "grabbing" : "grab" }}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}>
					<div
						ref={svgBoxRef}
						className={styles.drawing}
						style={{
							width: size.w ? `${size.w}px` : "1200px",
							height: size.h ? `${size.h}px` : "auto",
							transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
							transformOrigin: "0 0",
							willChange: "transform",
						}}>
						<div className="uipack" style={{ border: "none", background: "transparent" }}>
							<svg viewBox={viewBox} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label={alt}>
								<Wide id={id} />
							</svg>
						</div>
					</div>
				</div>

				<div className={styles.toolbar}>
					<span className={styles.zoom} aria-live="polite">
						{pct}%
					</span>
					<Ctl label="Zoom out" onClick={() => zoomCentre(1 / 1.25)}>
						−
					</Ctl>
					<Ctl label="Zoom in" onClick={() => zoomCentre(1.25)}>
						+
					</Ctl>
					<Ctl label="Reset zoom" onClick={() => fit(true)} className={styles.ctlWord}>
						fit
					</Ctl>
					<Ctl ref={closeRef} label="Close diagram" onClick={onClose}>
						×
					</Ctl>
				</div>

				<div ref={captionRef} className={styles.overlayCaption}>
					<p className={styles.overlayCaptionText}>{captionMarks(caption)}</p>
				</div>
			</div>
		</Portal>
	);
}

// `diagram` is a module exporting `meta` (number, eyebrow, title, caption,
// legend, viewBox), `CLAIM` (the accessible description) and `Wide`, a
// fragment of uipack parts taking `{ id }`. `id` prefixes marker ids so the
// inline drawing and the overlay copy never collide. A module may still export
// `Narrow`; it is no longer rendered (phones scroll the wide drawing instead).
// A narrow drawing stays near its designed size instead of stretching to the
// full 1088px (a 720-unit drawing would otherwise render at 1.4x). Never
// narrower than the prose column; 66px covers the canvas padding and border.
const natural = (viewBox) => Math.min(1088, Math.max(680, viewBoxWidth(viewBox) + 66));

// Captions name a figure's numbered step badges as ① ② ③. IBM Plex has no
// circled digits, so those glyphs fell back to a system font. Each one is set
// instead in the site's numeral treatment, a plain mono number with no ring
// (STYLE.md, --ui-num-*), in bold ink so it reads as the badge it points at.
// The caption prop stays a string (shortCaption and the e2e specs read it).
const CIRCLED = /([\u2460-\u2473])/;
const StepMark = ({ n }) => (
	<span data-step-mark className={styles.stepMark}>
		{n}
	</span>
);
const captionMarks = (c) =>
	typeof c === "string" && CIRCLED.test(c)
		? c.split(CIRCLED).map((part, i) => (i % 2 ? <StepMark key={i} n={part.codePointAt(0) - 0x2460 + 1} /> : part))
		: c;

const shortCaption = (c) => {
	const m = /^fig\.\s*\d+/i.exec(c || "");
	return m ? m[0] : "";
};

export default function DiagramFigure({ id, diagram, caption, headingLevel }) {
	const { meta, CLAIM, Wide } = diagram;
	const [open, setOpen] = useState(false);
	const boxRef = useRef(null);
	const mobile = useIsMobile();
	const overflow = useOverflow(boxRef, mobile);
	const scroll = mobileScrollProps(viewBoxWidth(meta.viewBox));

	// A phone scrolls the wide drawing sideways. A drawing whose content starts
	// well inside its canvas (a centred vertical flow) would open on empty
	// dots with its boxes cut at the edge, so start at the content's left edge.
	useEffect(() => {
		if (!mobile || !overflow) return;
		const canvas = boxRef.current && boxRef.current.querySelector(".uipack__canvas");
		const svg = canvas && canvas.querySelector("svg.uipack--wide");
		if (!svg || canvas.scrollLeft !== 0 || !svg.getBBox) return;
		const view = svg.viewBox.baseVal;
		if (!view || !view.width) return;
		const scale = svg.getBoundingClientRect().width / view.width;
		const left = (svg.getBBox().x - view.x) * scale;
		if (left > 40) canvas.scrollTo({ left: Math.round(left - 16), behavior: "instant" });
	}, [mobile, overflow]);

	return (
		// A drawing wider than the prose column breaks out to the main container's
		// content width (1120px minus its 16px gutters), which the column's left
		// edge already sits on, so the figure reads centred in the viewport.
		<figure
			ref={boxRef}
			data-reveal
			className={`${styles.figure} ${scroll.className}`}
			style={{ ...scroll.style, width: `min(100vw - 32px, ${natural(meta.viewBox)}px)` }}>
			<Figure
				id={`${id}-figure`}
				headingLevel={headingLevel}
				number={meta.number}
				eyebrow={meta.eyebrow}
				title={meta.title}
				// The page caption already describes the drawing; showing the module's
				// own caption as well said the same thing twice.
				caption={caption ? undefined : meta.caption}
				legend={meta.legend}
				viewBox={meta.viewBox}
				minFont={mobile ? MOBILE_MIN_FONT : 11}
				expandable={false}
				alt={CLAIM}>
				<Wide id={`${id}-w`} />
			</Figure>
			{overflow ? <SwipeHint /> : null}
			<div className={styles.below}>
				<figcaption id={`${id}-caption`} className={styles.caption}>
					{captionMarks(caption)}
				</figcaption>
				<button
					type="button"
					aria-describedby={`${id}-caption`}
					aria-haspopup="dialog"
					aria-label={`Expand diagram ${shortCaption(caption)}`}
					onClick={() => setOpen(true)}
					className={styles.expand}>
					expand
				</button>
			</div>
			{open ? (
				<Overlay
					Wide={Wide}
					id={`${id}-zoom`}
					viewBox={meta.viewBox}
					alt={CLAIM}
					caption={caption}
					onClose={() => setOpen(false)}
				/>
			) : null}
		</figure>
	);
}
