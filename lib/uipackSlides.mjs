// These editable SVG starters use the site's paper, ink, mint and Plex type roles.
export const slideThemes = {
	light: {
		paper: "#F1EEE6",
		surface: "#F8F6F0",
		ink: "#1A2420",
		muted: "#55675F",
		accent: "#205F49",
		rule: "#BAC3BC",
	},
	dark: {
		paper: "#0E1512",
		surface: "#151F1B",
		ink: "#E6EBE8",
		muted: "#A5B3AD",
		accent: "#71DCB2",
		rule: "#43544B",
	},
};

export const slideLayouts = [
	{
		id: "opening",
		title: "Opening",
		description: "A clear title, one sentence of context, and room for the author.",
	},
	{
		id: "explanation",
		title: "Explanation",
		description: "One point per slide, with the reasoning alongside it.",
	},
	{
		id: "system",
		title: "System",
		description: "A flow with labeled steps and a caption that explains the decision.",
	},
];

export function renderSlide(id, theme = "light") {
	const c = slideThemes[theme] || slideThemes.light;
	const text = (x, y, value, size = 26, color = c.ink, weight = 400, mono = false) =>
		`<text x="${x}" y="${y}" font-family="${mono ? "IBM Plex Mono, monospace" : "IBM Plex Sans, Arial, sans-serif"}" font-size="${size}" fill="${color}" font-weight="${weight}">${value}</text>`;
	const rule = (x1, y1, x2) => `<path d="M${x1} ${y1}H${x2}" stroke="${c.rule}" stroke-width="2"/>`;
	const foot =
		rule(64, 592, 1136) +
		text(64, 635, "UI Pack / Jun Xiong", 18, c.muted, 400, true) +
		text(
			960,
			635,
			`${id === "opening" ? "01" : id === "explanation" ? "02" : "03"} / 03`,
			18,
			c.muted,
			400,
			true,
		);
	let body;
	if (id === "opening") {
		body =
			text(64, 105, "Tools, interfaces, ideas", 22, c.accent, 700, true) +
			text(64, 277, "A familiar look,", 78, c.ink, 600) +
			text(64, 371, "wherever I build.", 78, c.ink, 600) +
			text(64, 457, "Shared type, colour and layout for websites and slides.", 28, c.muted);
	} else if (id === "explanation") {
		body =
			text(64, 105, "The design rule", 22, c.accent, 700, true) +
			text(64, 196, "Start with what stays the same.", 52, c.ink, 600) +
			`<rect x="64" y="264" width="440" height="256" fill="${c.surface}" stroke="${c.rule}"/>` +
			text(96, 328, "The foundation", 22, c.accent, 700, true) +
			text(96, 399, "Type. Colour. Spacing.", 30, c.ink, 600) +
			text(96, 452, "A shared starting point.", 24, c.muted) +
			text(568, 310, "Websites", 30, c.ink, 600) +
			text(568, 358, "Layouts adapt to the content and screen.", 24, c.muted) +
			text(568, 442, "Slides", 30, c.ink, 600) +
			text(568, 490, "Layouts keep one idea in focus.", 24, c.muted);
	} else {
		body =
			text(64, 105, "How it fits together", 22, c.accent, 700, true) +
			text(64, 196, "One foundation. Two ways to use it.", 52, c.ink, 600);
		const nodes = [
			[64, "Foundation", "Type and colour"],
			[456, "Layouts", "Structure and motion"],
			[848, "Output", "Websites and slides"],
		];
		for (const [x, label, sub] of nodes)
			body +=
				`<rect x="${x}" y="295" width="288" height="138" fill="${c.surface}" stroke="${c.rule}" stroke-width="2"/>` +
				text(x + 24, 351, label, 30, c.ink, 600) +
				text(x + 24, 394, sub, 20, c.muted, 400, true);
		for (const x of [366, 758])
			body += `<path d="M${x} 364h70m-10-8 10 8-10 8" fill="none" stroke="${c.accent}" stroke-width="3"/>`;
		body += text(
			64,
			521,
			"Reuse the design decisions, then choose the layout for the job.",
			27,
			c.muted,
		);
	}
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="UI Pack ${id} slide starter"><rect width="1200" height="675" fill="${c.paper}"/>${body}${foot}</svg>`;
}
