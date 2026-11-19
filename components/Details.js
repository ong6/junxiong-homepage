import styles from "./Details.module.css";

// A native disclosure for supporting inventories under a case study. The body's
// last ruled row drops its rule so it never doubles the disclosure's own.
//
//   title – the summary line

export default function Details({ title, children }) {
	return (
		<details className={styles.details}>
			<summary className={styles.summary}>{title}</summary>
			<div className={`case-study-details-body ${styles.body}`}>{children}</div>
		</details>
	);
}
