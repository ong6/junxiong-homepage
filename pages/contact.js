import NextLink from "next/link";
import HobbyScene from "../components/HobbyScene";
import Layout from "../components/layouts/Articles";
import { PAGE_META } from "../lib/pageMeta";
import OutArrow from "../components/OutArrow";
import FilledButton from "../components/FilledButton";
import { BackLink, Eyebrow, LANDING_TITLE } from "../components/ArticleParts";
import styles from "../styles/Contact.module.css";

const links = [
	{
		label: "LinkedIn",
		detail: "My work history and what I do now.",
		href: "https://www.linkedin.com/in/junx6/",
		external: true,
	},
	{
		label: "GitHub",
		detail: "Source code and the projects I maintain.",
		href: "https://github.com/ong6",
		external: true,
	},
	{
		label: "Resume",
		detail: "Roles, experience and the printable PDF.",
		href: "/resume",
	},
	{
		label: "Notes",
		detail: "Longer write-ups about systems I am building.",
		href: "https://notes.junxiong.dev",
		external: true,
	},
];

export default function Contact() {
	return (
		<Layout
			{...PAGE_META["/contact"]}>
			<div className={styles.hero}>
				<div>
					<BackLink href="/">Home</BackLink>
					<Eyebrow className={styles.eyebrow}>CONTACT / SINGAPORE</Eyebrow>
					<h1 className={`ui-heading ${LANDING_TITLE} ${styles.h1}`}>Contact</h1>
					<p className={styles.lede}>Email is the easiest way to reach me.</p>
					<FilledButton href="mailto:junxiongong2@gmail.com" className={styles.email} data-group>
						Email me <OutArrow className={styles.arrow} />
					</FilledButton>
					<p className={styles.address}>junxiongong2@gmail.com</p>
				</div>

				<div className={styles.scene}>
					<HobbyScene kind="contact" label="Contact signals" active />
				</div>
			</div>

			<section aria-labelledby="contact-links" className={styles.elsewhere}>
				<Eyebrow>ELSEWHERE</Eyebrow>
				<h2 id="contact-links" className={`ui-heading ${styles.h2}`}>
					Work and writing
				</h2>
				{/* Same row grammar as the Links out block: name, arrow pinned to the
				    row's right edge, detail below. Columns sit 24px apart. */}
				<div className={styles.rows}>
					{links.map((item) => {
						const newTab = Boolean(item.external && item.href.startsWith("http"));
						const Anchor = item.external ? "a" : NextLink;
						return (
							<Anchor
								key={item.label}
								href={item.href}
								target={newTab ? "_blank" : undefined}
								rel={newTab ? "noopener noreferrer" : undefined}
								className={`ui-link ${styles.row}`}>
								<div className={styles.line}>
									<span>{item.label}</span>
									<OutArrow newTab={newTab} />
								</div>
								<p className={styles.detail}>{item.detail}</p>
							</Anchor>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
