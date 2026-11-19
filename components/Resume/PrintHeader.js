import PrintButton from "./PrintButton";
import OutArrow from "../OutArrow";
import { ARTICLE_TITLE, Eyebrow } from "../ArticleParts";
import styles from "./Resume.module.css";

const contactLinks = [
	{ label: "Email", href: "mailto:junxiongong2@gmail.com" },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
];

export default function PrintHeader() {

	return (
		<div className={styles.header}>
			<div className={styles.headerRow}>
				<div className={styles.intro}>
					<Eyebrow>Singapore · résumé</Eyebrow>
					<h1 className={`ui-heading ${ARTICLE_TITLE} ${styles.name}`}>Ong Jun Xiong</h1>
					<p className={styles.role}>AI Infrastructure &amp; Backend Engineer</p>
				</div>
				<PrintButton />
			</div>

			<p className={styles.summary}>
				I build production agent runtimes, tool servers, and backend platforms.
				At TikTok, my work spans the shared AI layer and the Go services beneath
				global e-commerce operations.
			</p>

			<div className={styles.links}>
				<a href="https://junxiong.dev" className={`ui-link ${styles.homeLink}`}>
					junxiong.dev
				</a>
				{contactLinks.map((link) => (
					<a
						key={link.label}
						href={link.href}
						className={`ui-link ${styles.contactLink}`}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
						{link.label}
						{link.href.startsWith("http") && <OutArrow newTab className={styles.arrow} />}
					</a>
				))}
			</div>
		</div>
	);
}
