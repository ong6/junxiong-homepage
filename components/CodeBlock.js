import styles from "./CodeBlock.module.css";

// Code rendered as text, not an image, so it stays selectable and readable in
// both themes. `tone` marks the one line the figure is about. Lines wider than
// the column scroll sideways; a scroll shadow on the right edge (pure CSS, the
// background-attachment trick) shows there is more, and disappears once the
// reader has scrolled to the end.
export const CodeBlock = ({ title, lines }) => (
	// Tokens, so the first paint is in the right theme: the ground is the
	// preview canvas (a warm neutral in both themes), the marked line the accent.
	<div className={styles.block}>
		<p className={styles.title}>{title}</p>
		<div className={styles.scroller} tabIndex={0} aria-label={`${title}, scrolls sideways`}>
			<pre className={styles.pre}>
				{lines.map(([text, tone], i) => (
					<span key={i} className={tone === "muted" ? styles.muted : tone === "hot" ? styles.hot : styles.line}>
						{text || " "}
					</span>
				))}
			</pre>
		</div>
	</div>
);

export const CodeFigure = ({ caption, children }) => (
	<figure className={styles.figure}>
		{children}
		<figcaption className={styles.caption}>{caption}</figcaption>
	</figure>
);
