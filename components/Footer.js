import NextLink from "next/link";
import OutArrow from "./OutArrow";
import styles from "./Footer.module.css";

const links = [
	{ label: "Contact", href: "/contact", internal: true },
	{ label: "Hobbies", href: "/hobbies", internal: true },
	{ label: "Archive", href: "/works", internal: true },
	{ label: "Notes", href: "https://notes.junxiong.dev" },
	{ label: "UiPack", href: "/uipack", internal: true },
	{ label: "GitHub", href: "https://github.com/ong6" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/junx6/" },
	{ label: "Source", href: "https://github.com/ong6/junxiong-homepage" },
];

const Footer = () => (
	<div className={styles.footer}>
		<div className={styles.row}>
			<div>
				<p className={styles.name}>Ong Jun Xiong</p>
				<p className={styles.role}>SOFTWARE ENGINEER · SINGAPORE</p>
			</div>
			<div className={styles.links}>
				{links.map((link) => {
					const external = link.href.startsWith("http");
					const Anchor = link.internal ? NextLink : "a";
					return (
						<Anchor
							key={link.label}
							href={link.href}
							target={external ? "_blank" : undefined}
							rel={external ? "noopener noreferrer" : undefined}
							className={`ui-link ${styles.link}`}>
							{link.label}
							{external && <OutArrow newTab className={styles.arrow} />}
						</Anchor>
					);
				})}
			</div>
		</div>
		<p className={styles.copyright}>© {new Date().getFullYear()} Ong Jun Xiong</p>
	</div>
);

export default Footer;
