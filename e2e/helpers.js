// Centre of the first animated packet on the page, in its SVG's user units,
// so scroll position and viewport scale never matter.
const SEL = 'figure.uipack svg.uipack--wide [data-uipack="packet"]';

async function packetCentre(page) {
	return page.evaluate((sel) => {
		const g = document.querySelector(sel);
		const svg = g.closest("svg");
		const s = svg.getBoundingClientRect();
		const k = s.width / svg.viewBox.baseVal.width;
		const r = g.getBoundingClientRect();
		return { x: (r.left + r.width / 2 - s.left) / k, y: (r.top + r.height / 2 - s.top) / k };
	}, SEL);
}

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// Console lines the site already knows about on localhost.
const KNOWN = [/speed-insights/i, /Speed Insights/, /upgrade-insecure-requests/, /_vercel/];
function collectErrors(page) {
	const errors = [];
	page.on("console", (m) => {
		if (m.type() !== "error") return;
		const where = (m.location() && m.location().url) || "";
		if (KNOWN.some((k) => k.test(m.text()) || k.test(where))) return;
		errors.push(`${m.text()} @ ${where}`);
	});
	page.on("pageerror", (e) => errors.push(e.message));
	return errors;
}

module.exports = { SEL, packetCentre, dist, collectErrors };
