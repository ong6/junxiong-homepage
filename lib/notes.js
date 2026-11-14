import snapshot from "./notes.snapshot.json";

// Articles on notes.junxiong.dev, newest first. The list is a committed
// snapshot of the notes feed (`npm run sync:notes`), so builds never wait on
// another site. Each note: { slug, title, description, date, url, tags }.
export const NOTES_URL = "https://notes.junxiong.dev";
export const NOTES = snapshot;

export const getNote = (slug) => NOTES.find((note) => note.slug === slug);
export const latestNotes = (count = 4) => NOTES.slice(0, count);

// Notes that belong beside a page on this site, by route. Only pair a note
// that is about that project or the exact topic of the page.
export const PROJECT_NOTES = {};

export const notesFor = (path) => (PROJECT_NOTES[path] || []).map(getNote).filter(Boolean);
