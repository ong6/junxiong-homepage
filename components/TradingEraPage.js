import Layout from "./layouts/Articles";
import { BackLink, MetaLine, ARTICLE_TITLE } from "./ArticleParts";
import styles from "../styles/CaseStudy.module.css";

// One engine era (/trading-engine/v1, /trading-engine/v2): back link, title,
// mono eyebrow and a bold lead, then the page's own sections.
//
//   era    – an entry of ERAS
//   status – mono eyebrow after "Engine vN · "
//   facts  – rows for the wide-screen side rail (layouts/Articles.js)
//   links  – links out for the side rail, if the page has any

export default function TradingEraPage({ era, status, description, lead, facts, links, children }) {
	return (
		<Layout
			title={`Trading engine ${era.v}: ${era.title}`}
			headline={era.title}
			description={description}
			schema={{ type: "TechArticle" }}
			contents
			facts={facts}
			links={links}>
			<div className={`ui-container chakra-container ${styles.column}`}>
				<div className={styles.top}>
					<BackLink href="/trading-engine">Trading engine</BackLink>
					<h1 className={`ui-heading ${ARTICLE_TITLE} ${styles.title}`}>{era.title}</h1>
					<MetaLine>
						Engine {era.v} · {status}
					</MetaLine>
					<p className={styles.lede}>{lead}</p>
				</div>
				{children}
			</div>
		</Layout>
	);
}
