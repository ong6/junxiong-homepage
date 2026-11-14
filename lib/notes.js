import snapshot from "./notes.snapshot.json";
import { formatDate } from "./pageDates";

// Articles on notes.junxiong.dev, newest first. The list is a committed
// snapshot of the notes feed (`npm run sync:notes`), so builds never wait on
// another site. Each note: { slug, title, description, date, url, tags }.
export const NOTES_URL = "https://notes.junxiong.dev";
export const NOTES = snapshot;

export const getNote = (slug) => NOTES.find((note) => note.slug === slug);
export const latestNotes = (count = 4) => NOTES.slice(0, count);

// Notes that belong beside a page on this site, by route (a Hobbies chapter
// is `/hobbies#<chapter id>`). Only pair a note that is about that project or
// the exact topic of the page; a page with no match keeps its generic Notes
// row, if it has one.
export const PROJECT_NOTES = {
	// The note's own `project` link points at this case study.
	"/trading-engine": ["why-my-trading-strategies-havent-earned-real-money"],
	// Two skills from the ong6/skills repo, each written up with its eval.
	"/skills": ["council-skill", "decide-skill"],
	// How the six chapter objects on this page were built; its `project` link is /hobbies.
	"/hobbies": ["accessible-performant-3d-on-the-web"],
	// Speccing the inference box: memory and bandwidth, the two phases, model size.
	"/hobbies#home-servers": ["local-inference-hardware", "prefill-vs-decode", "quantization-what-it-costs"],
	// What the strategies tested in the trading engine showed.
	"/hobbies#trading": ["why-my-trading-strategies-havent-earned-real-money"],
};

export const notesFor = (path) => (PROJECT_NOTES[path] || []).map(getNote).filter(Boolean);

// A paired note as a Links out row: its real title, then when it was written.
export const noteLink = (note) => ({
	name: note.title,
	detail: `Note · ${formatDate(note.date)}`,
	href: note.url,
	external: true,
});

// A page's links out with its paired notes. The notes replace the generic
// "Notes" row (a link to the notes root) when the page has any; otherwise
// the links are returned unchanged.
export const withNotes = (path, links = []) => {
	const notes = notesFor(path);
	if (!notes.length) return links;
	return [...links.filter((link) => link.href !== NOTES_URL), ...notes.map(noteLink)];
};
