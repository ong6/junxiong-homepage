// The date each page's content last changed, kept by hand: bump it when you
// edit the page. One source for the sitemap's lastmod, the structured data's
// dateModified and the visible "Updated" line.
export const PAGE_DATES = {
	"/": "2026-10-22",
	"/contact": "2026-10-22",
	"/resume": "2026-09-25",
	"/ai-tooling": "2026-10-22",
	"/compoze": "2026-10-22",
	"/groundplane": "2026-10-22",
	"/trading-engine": "2026-10-20",
	"/trading-engine/v2": "2026-11-13",
	"/skills": "2026-10-22",
	"/skillsmith": "2026-10-22",
	"/uipack": "2026-11-11",
	"/works": "2026-09-01",
	"/hobbies": "2026-10-22",
};

// Groups of generated routes share one date.
const PREFIX_DATES = [
	["/trading-engine/docs", "2026-10-02"],
	["/trading-engine/v1", "2026-11-15"],
	["/works/", "2026-08-28"],
];

export const modifiedFor = (path) => {
	const clean = path.split(/[?#]/)[0].replace(/(.)\/$/, "$1");
	if (PAGE_DATES[clean]) return PAGE_DATES[clean];
	const group = PREFIX_DATES.find(([prefix]) => clean.startsWith(prefix));
	return group ? group[1] : null;
};
