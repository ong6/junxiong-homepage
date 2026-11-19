import OutArrow from "./OutArrow";
import NextLink from "next/link";
import ProjectLinks from "./ProjectLinks";
import { Eyebrow } from "./ArticleParts";
import { toneFor } from "../lib/tones";
import styles from "./CaseStudyFooter.module.css";

// The deliberate end of a case study: the links out (the only copy in the
// reading order; the wide-screen rail repeats them for the eye), then one
// door to the next project. Replaces the bare spacer before the footer.
//
//   links – passed to ProjectLinks (optional)
//   next  – { name, href, detail }

export default function CaseStudyFooter({ links, next }) {
	return (
		<div className={styles.end}>
			{links && links.length > 0 && <ProjectLinks id="links-out" links={links} />}

			{next && (
				<section
					aria-label="Next project"
					data-contents-skip
					data-group
					data-reveal
					data-hover="card"
					data-tone={toneFor(next.href)}
					className={`ui-linkbox ${styles.next}`}>
					<Eyebrow data-tone-label>NEXT</Eyebrow>
					<h2 className={`ui-heading ${styles.title}`}>
						<NextLink href={next.href} prefetch={false} className={`ui-linkoverlay ${styles.overlay}`}>
							{next.name}
							<OutArrow className={styles.arrow} />
						</NextLink>
					</h2>
					{next.detail && <p className={styles.detail}>{next.detail}</p>}
				</section>
			)}

			<div className={styles.spacer} />
		</div>
	);
}
