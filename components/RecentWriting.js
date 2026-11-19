import OutArrow from "./OutArrow";
import { Eyebrow } from "./ArticleParts";
import { NOTES_URL, latestNotes } from "../lib/notes";
import styles from "./RecentWriting.module.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11-05" → "5 Nov 2026", the trading pages' date form. Parsed by hand so
// the server and the browser print the same string in any time zone.
const formatDate = (iso) => {
	const [year, month, day] = iso.split("-").map(Number);
	return `${day} ${MONTHS[month - 1]} ${year}`;
};

// The newest articles on notes.junxiong.dev, as links out. Not a blog: the
// writing lives on the notes site; this is a ruled list in the Links out
// grammar (date, title, one line, the arrow flush with the rule).
export default function RecentWriting() {
	const notes = latestNotes(4);
	return (
		<section id="writing" aria-labelledby="writing-heading" className={styles.section}>
			<Eyebrow>Notes</Eyebrow>
			<h2 id="writing-heading" className={`ui-heading ${styles.heading}`}>
				Recent writing
			</h2>
			<ul className={styles.list}>
				{notes.map((note, index) => (
					<li key={note.slug}>
						<a
							href={note.url}
							target="_blank"
							rel="noopener noreferrer"
							data-reveal
							data-group
							data-hover="row"
							style={{ "--i": index }}
							className={`ui-link ${styles.row}`}>
							<time dateTime={note.date} className={styles.date}>
								{formatDate(note.date)}
							</time>
							<p className={styles.title}>{note.title}</p>
							<div className={styles.arrowBox}>
								<OutArrow newTab />
							</div>
							{note.description ? <p className={styles.detail}>{note.description}</p> : null}
						</a>
					</li>
				))}
			</ul>
			<a href={NOTES_URL} target="_blank" rel="noopener noreferrer" className={`ui-link ${styles.all}`}>
				All notes <OutArrow newTab className={styles.allArrow} />
			</a>
		</section>
	);
}
