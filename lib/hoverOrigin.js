// The hover rule on cards and rows (styles/globals.css, "Card hover: tone
// edge") draws from the side the pointer came in: --ox is where it entered,
// as a share of the element's width.
export function trackHoverOrigin() {
	const onOver = (event) => {
		const el = event.target.closest?.("[data-hover]");
		if (!el || el.contains(event.relatedTarget)) return;
		const rect = el.getBoundingClientRect();
		if (!rect.width) return;
		const share = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
		el.style.setProperty("--ox", `${Math.round(share * 100)}%`);
	};
	document.addEventListener("pointerover", onOver);
	return () => document.removeEventListener("pointerover", onOver);
}
