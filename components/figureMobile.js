import { useEffect, useState } from "react";
import styles from "./figureMobile.module.css";

// Phones get the wide drawing, not a squeezed or re-laid-out one. It renders
// at MOBILE_SCALE of its designed width and the canvas scrolls sideways, so the
// layout stays intact. Labels never render below MOBILE_MIN_FONT, UiPack's 11px
// figure type floor. Until 2026-11 phones drew at 0.85 with a 9.5px floor;
// raising the floor at 0.85 enlarged labels past their boxes, so phones now
// draw at the designed size, exactly as on desktop, and swipe a little further.
// Used by DiagramFigure (case studies) and the /uipack gallery.
export const MOBILE_QUERY = "(max-width: 720px)";
export const MOBILE_SCALE = 1;
export const MOBILE_MIN_FONT = 11;

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

// Props for the element wrapping a uipack Figure: on a phone the wide drawing
// keeps its designed width and the canvas scrolls (figureMobile.module.css).
export const mobileScrollProps = (vbWidth) => ({
	className: styles.mobileScroll,
	style: { "--figure-wide-w": `${Math.round(vbWidth * MOBILE_SCALE)}px` },
});

export const SwipeHint = () => (
	<p className={styles.swipeHint} aria-hidden="true">
		Swipe to see the whole diagram →
	</p>
);
