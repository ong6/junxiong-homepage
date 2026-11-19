import { Eyebrow } from "./ArticleParts";
import styles from "./TermHeading.module.css";

// Résumé section head: the site's `// LABEL` eyebrow over the h2 (it used a
// cobalt diamond until 2026-11). The 16px under the heading clears its
// descenders off the section's first rule; every résumé section opens with it.
const TermHeading = ({ children, kicker = "Selected signal" }) => (
	<div className={styles.head}>
		<Eyebrow className={styles.kicker}>{kicker}</Eyebrow>
		<h2 className={`ui-heading ${styles.title}`}>{children}</h2>
	</div>
);

export default TermHeading;
