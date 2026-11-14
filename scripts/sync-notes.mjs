// Refreshes lib/notes.snapshot.json from the notes site's RSS feed.
// Run by hand after publishing a note: `npm run sync:notes`. The site reads
// the committed snapshot, so a build never depends on the notes site being up.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const FEED = "https://notes.junxiong.dev/feed.xml";
const OUT = fileURLToPath(new URL("../lib/notes.snapshot.json", import.meta.url));

const decode = (text) =>
	text
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.trim();

const field = (item, tag) => {
	const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
	return match ? decode(match[1]) : "";
};

const response = await fetch(FEED);
if (!response.ok) throw new Error(`${FEED} returned ${response.status}`);
const xml = await response.text();

const notes = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
	const url = field(item, "link");
	return {
		slug: url.replace(/\/$/, "").split("/").pop(),
		title: field(item, "title"),
		description: field(item, "description"),
		date: new Date(field(item, "pubDate")).toISOString().slice(0, 10),
		url,
		tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(([, tag]) => decode(tag)),
	};
});

if (notes.length === 0) throw new Error("The feed has no items; snapshot left unchanged.");
notes.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
await writeFile(OUT, `${JSON.stringify(notes, null, "\t")}\n`);
console.log(`Wrote ${notes.length} notes to lib/notes.snapshot.json (newest: ${notes[0].date})`);
