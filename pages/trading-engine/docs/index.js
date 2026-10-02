import TradingDocsPage from "../../../components/TradingDocsPage";
import { getTradingDocPageProps } from "../../../lib/tradingDocs";

export default TradingDocsPage;

export function getStaticProps() {
	return { props: getTradingDocPageProps("index") };
}
