import TradingDocsPage from "../../../components/TradingDocsPage";
import { getTradingDocPageProps, getTradingDocSlugs } from "../../../lib/tradingDocs";

export default TradingDocsPage;

export function getStaticPaths() {
	return {
		paths: getTradingDocSlugs().map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

export function getStaticProps({ params }) {
	const props = getTradingDocPageProps(params.slug);
	return props ? { props } : { notFound: true };
}
