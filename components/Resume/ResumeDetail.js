import styles from "./Resume.module.css";

export default function ResumeDetail({ detail, compact = false }) {
	return (
		<section className={compact ? `${styles.detail} ${styles.detailCompact}` : styles.detail}>
			<div className={styles.line}>
				<h3 className={compact ? `${styles.employer} ${styles.employerCompact}` : styles.employer}>
					{detail.title}
				</h3>
				<p className={styles.location}>
					{detail.location}
				</p>
			</div>

			{detail.roles.map((role) => (
				<div key={`${detail.title}-${role.subtitle}`} className={styles.roleBlock}>
					<div className={styles.line}>
						<h4 className={styles.subtitle}>
							{role.subtitle}
						</h4>
						<p className={styles.date}>
							{role.date}
						</p>
					</div>

					<ul role="list" className={styles.list}>
						{role.description.map((description) => (
							<li
								key={description}
								className={styles.item}>
								{description}
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}
