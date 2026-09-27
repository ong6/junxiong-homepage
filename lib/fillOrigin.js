// The card hover fill (styles/globals.css, [data-fill]) grows from where the
// pointer entered the card.
export function trackFillOrigin() {
	const onOver = (event) => {
		const card = event.target.closest?.("[data-fill]");
		if (!card || card.contains(event.relatedTarget)) return;
		const rect = card.getBoundingClientRect();
		card.style.setProperty("--x", `${event.clientX - rect.left}px`);
		card.style.setProperty("--y", `${event.clientY - rect.top}px`);
	};
	document.addEventListener("pointerover", onOver);
	return () => document.removeEventListener("pointerover", onOver);
}
