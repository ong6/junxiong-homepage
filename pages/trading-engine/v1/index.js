import TradingEraPage from "../../../components/TradingEraPage";
import { H2, P } from "../../../components/TradingVersionPage";
import TradingVersionList from "../../../components/TradingVersionList";
import { ERAS } from "../../../lib/tradingVersions";

export default function TradingEngineV1() {
	return (
		<TradingEraPage
			era={ERAS[0]}
			status="Jul – Oct 2026 · 8 updates"
			description="Engine v1 of Ong Jun Xiong's paper-trading engine, July to October 2026: a research simulator, in eight updates from a nightly screen to one shared backtest core."
			lead="Engine v1 was a research simulator. Every strategy ran as a paper portfolio inside the engine, and the engine decided its fills, its cash and its verdict. Over eight updates it went from a nightly trend screen to one shared backtest core that every strategy has to pass through.">
			<H2>Updates</H2>
			<P>
				Each update has its own page with the diagram as the engine stood then. Update 1.8 still runs
				every night until Engine v2 takes over.
			</P>
			<TradingVersionList />
		</TradingEraPage>
	);
}
