import NextLink from "next/link";
import { useId } from "react";
import OutArrow from "./OutArrow";
import styles from "./ProjectLinks.module.css";

// Links out of a page (source, related project, notes) as one framed block
// instead of a highlighted word inside a sentence. Same row grammar as the
// "Around the site" rows on the homepage: name, detail, arrow.
//
//   links – [{ name, detail, href, external }]

function LinkRow({ name, detail, href, external, compact }) {
	const Anchor = external ? "a" : NextLink;
	return (
		<Anchor
			href={href}
			prefetch={external ? undefined : false}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			data-hover="row"
			className={`ui-link ${styles.row} ${compact ? styles.compact : ""}`}>
			<div className={styles.line}>
				<span data-name className={styles.name}>
					{name}
				</span>
				<OutArrow />
			</div>
			{external && <span className="visually-hidden"> (opens in a new tab)</span>}
			{detail && <span className={styles.detail}>{detail}</span>}
		</Anchor>
	);
}

export default function ProjectLinks({ heading = "Links out", links, compact = false, id: anchor, className }) {
	const id = useId();
	if (!links || links.length === 0) return null;

	return (
		<aside data-reveal aria-labelledby={id} id={anchor} className={className ? `project-links ${className}` : "project-links"}>
			<p id={id} className="eyebrow">
				{heading}
			</p>
			<div className={styles.list}>
				{links.map((link) => (
					<LinkRow key={link.href} {...link} compact={compact} />
				))}
			</div>
		</aside>
	);
}
