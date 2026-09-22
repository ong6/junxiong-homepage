import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Phones get the wide drawing, not a squeezed or re-laid-out one. It renders
// at MOBILE_SCALE of its designed width and the canvas scrolls sideways, so the
// layout stays intact and text is only slightly smaller. The font floor drops
// to MOBILE_MIN_FONT there so uipack doesn't enlarge labels past their boxes.
// Used by DiagramFigure (case studies) and the /uipack gallery.
export const MOBILE_QUERY = "(max-width: 720px)";
export const MOBILE_SCALE = 0.85;
export const MOBILE_MIN_FONT = 9.5;

export const viewBoxWidth = (viewBox) => Number(String(viewBox).trim().split(/\s+/)[2]) || 1088;

export function useIsMobile() {
	const [mobile, setMobile] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mq = window.matchMedia(MOBILE_QUERY);
		const read = () => setMobile(mq.matches);
		read();
		mq.addEventListener("change", read);
		return () => mq.removeEventListener("change", read);
	}, []);
	return mobile;
}

// True while the inline canvas is wider than its box, so the swipe hint only
// shows when there is something to swipe to.
export function useOverflow(ref, active) {
	const [overflow, setOverflow] = useState(false);
	useEffect(() => {
		const canvas = ref.current && ref.current.querySelector(".uipack__canvas");
		if (!active || !canvas || typeof ResizeObserver === "undefined") {
			setOverflow(false);
			return;
		}
		const read = () => setOverflow(canvas.scrollWidth > canvas.clientWidth + 1);
		read();
		const ro = new ResizeObserver(read);
		ro.observe(canvas);
		return () => ro.disconnect();
	}, [ref, active]);
	return overflow;
}

// `sx` for the element wrapping a uipack Figure.
export const mobileScrollSx = (vbWidth) => ({
	[`@media ${MOBILE_QUERY}`]: {
		"& .uipack .uipack__canvas": { WebkitOverflowScrolling: "touch" },
		"& .uipack .uipack__canvas > svg.uipack--wide": {
			width: `${Math.round(vbWidth * MOBILE_SCALE)}px`,
			minWidth: "100%",
			maxWidth: "none",
		},
	},
});

export const SwipeHint = () => (
	<Text
		mt={2}
		fontFamily="var(--font-mono)"
		fontSize="11px"
		fontWeight="700"
		letterSpacing=".08em"
		textTransform="uppercase"
		color="text.muted"
		aria-hidden="true">
		Swipe to see the whole diagram →
	</Text>
);
