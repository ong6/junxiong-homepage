import { useEffect, useState } from "react";

// True once the page has loaded and the browser has a spare moment. Heavy,
// decorative work (3D scenes) waits for it so the page is readable and
// interactive first; the scene appears a beat later instead of blocking.
export function useIdleAfterLoad(timeout = 1500) {
	const [idle, setIdle] = useState(false);
	useEffect(() => {
		let handle;
		const go = () => setIdle(true);
		const schedule = () => {
			handle = "requestIdleCallback" in window ? window.requestIdleCallback(go, { timeout }) : window.setTimeout(go, 200);
		};
		if (document.readyState === "complete") schedule();
		else window.addEventListener("load", schedule, { once: true });
		return () => {
			window.removeEventListener("load", schedule);
			if (handle !== undefined) ("cancelIdleCallback" in window ? window.cancelIdleCallback : window.clearTimeout)(handle);
		};
	}, [timeout]);
	return idle;
}
