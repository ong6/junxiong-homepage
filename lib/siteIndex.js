// Everything the ⌘K menu can open, composed from the modules the pages already
// render from, so a new page, tool, update, Archive entry or note shows up here
// without an edit. Loaded only with the menu (components/CommandMenu.js); it
// never ships in a page's initial JavaScript.
//
// An item: { id, title, description, href, external, tags, meta }.
import { DEFAULT_DESCRIPTION } from "../components/layouts/Main";
import docsManifest from "../content/trading-docs/_manifest.json";
import { AI_TOOLING } from "./aiTooling";
import { NOTES, NOTES_URL } from "./notes";
import { PAGE_META } from "./pageMeta";
import { ERAS, VERSIONS } from "./tradingVersions";
import works from "./works";

// The one place an Archive entry's URL is built.
export const archiveHref = (slug) => `/works#${slug}`;

const page = (href) => ({ href, ...PAGE_META[href] });

const items = (group, list) =>
	list.map((item, i) => ({
		...item,
		// Two items may share a URL (an era opens on its latest update).
		id: `${group}-${i}:${item.href}`,
		tags: item.tags || [],
	}));

// lib/tradingDocs.js reads this manifest with fs at build time; the menu runs
// in the browser, so it takes the same manifest directly.
const tradingDocs = docsManifest.pages
	.slice()
	.sort((a, b) => a.order - b.order)
	.map(({ href, title, summary, section }) => ({ href, title, description: summary, tags: [section] }));

export const SEARCH_GROUPS = [
	{
		label: "Pages",
		items: items("pages", [
			{ href: "/", title: "Home", description: DEFAULT_DESCRIPTION },
			page("/resume"),
			page("/hobbies"),
			page("/contact"),
			page("/works"),
			{ href: NOTES_URL, title: "Notes", description: `${NOTES.length} articles on notes.junxiong.dev`, external: true },
		]),
	},
	{
		label: "Projects",
		items: items("projects", [
			page("/ai-tooling"),
			...AI_TOOLING.map(({ name, href, external, short, layer }) => ({
				href,
				title: name,
				description: short,
				external: Boolean(external),
				tags: [layer, "AI tooling"],
			})),
			page("/compoze"),
			page("/trading-engine"),
			page("/uipack"),
		]),
	},
	{
		label: "Trading engine updates",
		items: items("trading", [
			...ERAS.slice()
				.reverse()
				.map(({ v, href, title, body, when }) => ({ href, title: `Engine ${v}: ${title}`, description: body, meta: when })),
			...VERSIONS.map(({ v, href, title, body, when }) => ({ href, title: `${v} ${title}`, description: body, meta: when })),
		]),
	},
	{ label: "Trading engine docs", items: items("docs", tradingDocs) },
	{
		label: "Notes",
		items: items(
			"notes",
			NOTES.map(({ title, description, url, tags, date }) => ({ href: url, title, description, tags, meta: date, external: true })),
		),
	},
	{
		label: "Archive",
		items: items(
			"archive",
			Object.entries(works).map(([slug, { title, summary, note, year }]) => ({
				href: archiveHref(slug),
				title,
				description: summary,
				tags: [note, year].filter(Boolean),
				meta: year,
			})),
		),
	},
];

// ── Matching ─────────────────────────────────────────────────────────────
// Every word typed has to appear in the title, a tag, the description or the
// group's name; a hit in the title ranks above one in a tag, then the
// description. Accents and punctuation are ignored ("resume" finds "Résumé").
const normalize = (text) =>
	` ${String(text || "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9.]+/g, " ")
		.trim()} `;

const FIELDS = new Map(
	SEARCH_GROUPS.flatMap(({ label, items: list }) =>
		list.map((item) => [
			item.id,
			{
				title: normalize(item.title),
				tags: normalize(item.tags.join(" ")),
				description: normalize(item.description),
				group: normalize(label),
			},
		]),
	),
);

const wordScore = (f, word) => {
	if (f.title.startsWith(` ${word}`)) return 1;
	if (f.title.includes(` ${word}`)) return 0.9;
	if (word.length > 2 && f.title.includes(word)) return 0.7;
	if (f.tags.includes(` ${word}`)) return 0.5;
	if (f.description.includes(` ${word}`)) return 0.3;
	if (word.length > 3 && f.description.includes(word)) return 0.2;
	if (f.group.includes(` ${word}`)) return 0.1;
	return 0;
};

// cmdk's filter signature: (value, search) → 0 hides the item, higher ranks first.
export function matchScore(id, search) {
	const f = FIELDS.get(id);
	const words = normalize(search).trim().split(" ").filter(Boolean);
	if (!f) return 0;
	if (!words.length) return 1;
	let total = 0;
	for (const word of words) {
		const score = wordScore(f, word);
		if (!score) return 0;
		total += score;
	}
	return total / words.length;
}
