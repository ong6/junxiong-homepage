import TermHeading from "../TermHeading";
import styles from "./Resume.module.css";

export default function Education() {
	return (
		<div>
			<TermHeading kicker="School">Education</TermHeading>
			<div className={styles.school}>
				<div>
					<h3 className={styles.schoolName}>
						National University of Singapore
					</h3>
					<p className={styles.schoolDetail}>
						Bachelor of Computing (Honours), Computer Science. Specialised in
						AI and software engineering; NUS Overseas Colleges in Munich.
					</p>
				</div>
				<p className={styles.schoolDates}>
					2020 – 2023
				</p>
			</div>
		</div>
	);
}
