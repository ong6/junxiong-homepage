import { Box, Portal, Text, VisuallyHidden, useColorModeValue, useToken } from "@chakra-ui/react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

// One figure wrapper for every hand-drawn SVG diagram. Inline it sits in the
// prose column at the column's width (the SVG keeps its viewBox, so it scales),
// with a wide and a narrow drawing swapped by CSS at `breakpoint`. Clicking
// opens the wide drawing full-screen with wheel / pinch zoom and drag pan,
// written by hand on a CSS transform so nothing new ships in the bundle.

// Zoom floor is MIN or the fit-to-screen scale, whichever is smaller.
const MIN = 0.5;
const MAX = 6;
const PAD = 48;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Toolbar button: mono glyph, theme border, no Chakra Button so the overlay
// stays tiny.
const Ctl = forwardRef(function Ctl({ label, children, ...rest }, ref) {
	return (
		<Box
			as="button"
			type="button"
			aria-label={label}
			title={label}
			w="44px"
			h="44px"
			display="grid"
			placeItems="center"
			border="1px solid"
			borderColor="border.subtle"
			bg="surface.raised"
			color="page.text"
			fontFamily="var(--font-mono)"
			fontSize="18px"
			lineHeight="1"
			cursor="pointer"
			_hover={{ borderColor: "page.text" }}
			_focusVisible={{ outline: "2px solid", outlineColor: "mint.500", outlineOffset: "2px" }}
			ref={ref}
			{...rest}>
			{children}
		</Box>
	);
});

function Overlay({ Wide, id, accent, caption, onClose }) {
	// Chakra's Portal mounts its children a tick after the overlay renders, so
	// the stage is tracked as state rather than a ref: effects wait for it.
	const [stage, setStage] = useState(null);
	const svgBoxRef = useRef(null);
	const panelRef = useRef(null);
	const closeRef = useRef(null);
	const [size, setSize] = useState({ w: 0, h: 0 });
	const [view, setView] = useState({ s: 1, x: 0, y: 0, fit: 1 });
	const [dragging, setDragging] = useState(false);
	const pointers = useRef(new Map());
	const gesture = useRef(null);

	const scrim = useColorModeValue("#F1EEE6", "#0E1512");

	// Read the drawing's native size from its viewBox, then fit it to the stage.
	const fit = useCallback(() => {
		const svg = svgBoxRef.current && svgBoxRef.current.querySelector("svg");
		if (!stage || !svg) return;
		const vb = svg.viewBox.baseVal;
		setSize({ w: vb.width, h: vb.height });
		const sw = stage.clientWidth;
		const sh = stage.clientHeight;
		const s = Math.min((sw - PAD) / vb.width, (sh - PAD) / vb.height, MAX);
		setView({ s, x: (sw - vb.width * s) / 2, y: (sh - vb.height * s) / 2, fit: s });
	}, [stage]);

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
		window.addEventListener("resize", fit);
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener("resize", fit);
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
		} catch (err) {
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
			<Box
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label={`Diagram ${shortCaption(caption)}, expanded`}
				onKeyDown={onKeyDown}
				position="fixed"
				inset={0}
				zIndex="modal"
				bg={scrim}
				color="page.text">
				<Box
					ref={setStage}
					position="absolute"
					inset={0}
					overflow="hidden"
					cursor={dragging ? "grabbing" : "grab"}
					style={{ touchAction: "none" }}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}>
					<Box
						ref={svgBoxRef}
						position="absolute"
						top={0}
						left={0}
						w={size.w ? `${size.w}px` : "1200px"}
						h={size.h ? `${size.h}px` : "auto"}
						lineHeight={0}
						pointerEvents="none"
						style={{
							transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
							transformOrigin: "0 0",
							willChange: "transform",
						}}>
						<Wide accent={accent} id={id} />
					</Box>
				</Box>

				<Box
					position="absolute"
					top={{ base: 3, md: 5 }}
					right={{ base: 3, md: 5 }}
					display="flex"
					gap={2}
					alignItems="center">
					<Text
						as="span"
						fontFamily="var(--font-mono)"
						fontSize="11px"
						color="text.muted"
						mr={1}
						aria-live="polite">
						{pct}%
					</Text>
					<Ctl label="Zoom out" onClick={() => zoomCentre(1 / 1.25)}>
						−
					</Ctl>
					<Ctl label="Zoom in" onClick={() => zoomCentre(1.25)}>
						+
					</Ctl>
					<Ctl label="Reset zoom" onClick={fit} fontSize="13px">
						fit
					</Ctl>
					<Ctl ref={closeRef} label="Close diagram" onClick={onClose}>
						×
					</Ctl>
				</Box>

				<Box
					position="absolute"
					left={{ base: 3, md: 5 }}
					right={{ base: 3, md: 5 }}
					bottom={{ base: 3, md: 5 }}
					maxW="680px"
					px={3}
					py={2}
					bg={scrim}
					border="1px solid"
					borderColor="border.subtle"
					pointerEvents="none">
					<Text
						fontFamily="var(--font-mono)"
						fontSize="11px"
						lineHeight="1.6"
						color="text.muted"
						noOfLines={{ base: 2, md: 4 }}>
						{caption}
					</Text>
				</Box>
			</Box>
		</Portal>
	);
}

// `wide` and `narrow` are components taking `{ accent, id }`; `id` prefixes the
// overlay copy's marker ids so they never collide with the inline drawing.
// `breakpoint` is the Chakra breakpoint at which the wide drawing takes over.
const shortCaption = (c) => {
	const m = /^fig\.\s*\d+/i.exec(c || "");
	return m ? m[0] : "";
};

export default function DiagramFigure({ id, wide: Wide, narrow: Narrow, breakpoint = "lg", caption }) {
	const [mint600, mint300] = useToken("colors", ["mint.600", "mint.300"]);
	const accent = useColorModeValue(mint600, mint300);
	const [open, setOpen] = useState(false);

	return (
		<Box as="figure" my={{ base: 10, md: 14 }} mx={0} w="100%" maxW="100%">
			<Box
				as="button"
				type="button"
				aria-describedby={`${id}-caption`}
				aria-haspopup="dialog"
				onClick={() => setOpen(true)}
				display="block"
				w="100%"
				position="relative"
				textAlign="left"
				border="1px solid"
				borderColor="border.subtle"
				bg="transparent"
				color="page.text"
				px={{ base: 3, md: 5 }}
				py={{ base: 4, md: 6 }}
				lineHeight={0}
				cursor="zoom-in"
				_hover={{ borderColor: "page.text" }}
				_focusVisible={{ outline: "2px solid", outlineColor: "mint.500", outlineOffset: "2px" }}>
				<Box display={{ base: "none", [breakpoint]: "block" }} aria-hidden="true">
					<Wide accent={accent} />
				</Box>
				<Box display={{ base: "block", [breakpoint]: "none" }} aria-hidden="true">
					<Narrow accent={accent} />
				</Box>
				<Text
					as="span"
					position="absolute"
					top={2}
					right={2}
					px={2}
					py={1}
					bg="surface.raised"
					border="1px solid"
					borderColor="border.subtle"
					fontFamily="var(--font-mono)"
					fontSize={{ base: "11px", md: "12px" }}
					fontWeight="700"
					lineHeight="1"
					letterSpacing=".08em"
					textTransform="uppercase"
					color="text.muted">
					<Box as="span" aria-hidden="true">⤢ </Box>expand
					<VisuallyHidden> diagram {shortCaption(caption)}</VisuallyHidden>
				</Text>
			</Box>
			<Text
				as="figcaption"
				id={`${id}-caption`}
				mt={3}
				fontFamily="var(--font-mono)"
				fontSize="11px"
				lineHeight="1.6"
				color="text.muted">
				{caption}
			</Text>
			{open ? (
				<Overlay Wide={Wide} id={`${id}-zoom`} accent={accent} caption={caption} onClose={() => setOpen(false)} />
			) : null}
		</Box>
	);
}
