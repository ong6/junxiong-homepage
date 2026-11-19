import NextLink from "next/link";
import { VERSIONS } from "../lib/tradingVersions";
import OutArrow from "./OutArrow";
import styles from "./TradingVersionList.module.css";

// Engine versions in the order given: the v1 updates (newest first) by
// default, or the engine eras on the overview. The version on screen is plain
// text; every other one links out.
//
//   active – "1.7" | "v2" …
//   items  – VERSIONS (default) or ERAS

export default function TradingVersionList({ active, items = VERSIONS }) {
	return (
		<ol className={styles.list}>
			{items.map(({ v, href, when, title, body, current, building }) => (
				<li key={v} className={styles.item}>
					<p className={v === active ? `${styles.version} ${styles.versionActive}` : styles.version}>{v}</p>
					<div>
						<p className={styles.when}>
							{when}
							{current ? " · current" : ""}
							{building ? " · being built" : ""}
						</p>
						<p className={styles.title}>
							{v === active ? (
								title
							) : (
								<NextLink href={href} prefetch={false} className={`ui-link ${styles.link}`}>
									{title.split(" ").slice(0, -1).join(" ")}{" "}
									<span className={styles.last}>
										{title.split(" ").at(-1)}
										<OutArrow className={styles.arrow} />
									</span>
								</NextLink>
							)}
						</p>
						<p className={styles.body}>{body}</p>
					</div>
				</li>
			))}
		</ol>
	);
}
