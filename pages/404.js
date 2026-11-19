import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import { ARTICLE_TITLE } from "../components/ArticleParts";
import caseStudy from "../styles/CaseStudy.module.css";
import styles from "../styles/NotFound.module.css";

const NotFound = () => (
	<Layout title="Page not found" noindex>
		<div className={`ui-container chakra-container ${caseStudy.column}`}>
			<div className={caseStudy.top}>
				<p className={styles.code}>404</p>
				<h1 className={`ui-heading ${ARTICLE_TITLE} ${styles.title}`}>Page not found</h1>
				<p className={styles.text}>
					There is nothing at this address. The page may have moved, or the link was never right.{" "}
					<NextLink href="/" className="ui-link">
						Back to the homepage
					</NextLink>
					.
				</p>
			</div>
		</div>
	</Layout>
);

export default NotFound;
