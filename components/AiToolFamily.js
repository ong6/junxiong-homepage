import NextLink from "next/link";
import OutArrow from "./OutArrow";
import { AI_TOOLING } from "../lib/aiTooling";
import { Eyebrow } from "./ArticleParts";
import styles from "./AiToolFamily.module.css";

export default function AiToolFamily({ current }) {
	const headingId = `${current.replace(/^\//, "")}-family-heading`;
	return (
		<section aria-labelledby={headingId} className={styles.family}>
			<Eyebrow>AI TOOLING</Eyebrow>
			<h2 id={headingId} className={`ui-heading ${styles.heading}`}>
				<NextLink href="/ai-tooling" className={`ui-link ${styles.all}`}>
					All four layers
					<OutArrow className={styles.arrow} />
				</NextLink>
			</h2>
			<div className={styles.grid}>
				{AI_TOOLING.map((tool, index) => {
					const active = tool.href === current;
					const Anchor = tool.external ? "a" : NextLink;
					return (
						<article
							key={tool.href}
							data-hover="card"
							data-tone="agents"
							className={`ui-linkbox ${styles.card} ${active ? styles.current : ""}`}>
							<p data-tone-label className={styles.layer}>
								{String(index + 1).padStart(2, "0")} · {tool.layer}
							</p>
							<h3 className={`ui-heading ${styles.name}`}>
								<Anchor
									href={tool.href}
									target={tool.external ? "_blank" : undefined}
									rel={tool.external ? "noopener noreferrer" : undefined}
									aria-current={active ? "page" : undefined}
									className={`ui-linkoverlay ${styles.overlay}`}>
									{tool.name}
									{tool.external && <span className="visually-hidden"> (opens in a new tab)</span>}
								</Anchor>
							</h3>
							<p className={styles.short}>{tool.short}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}
