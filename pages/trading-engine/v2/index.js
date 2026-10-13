import FactList from "../../../components/FactList";
import TradingEraPage from "../../../components/TradingEraPage";
import { H2, P } from "../../../components/TradingVersionPage";
import { ERAS } from "../../../lib/tradingVersions";

// Engine v2 before it deploys. Facts from the engine's account-engine plan and
// its review rounds (2026-10-06 to 10-10). On deploy this page becomes the
// 2.0 write-up with its diagram.
const facts = [
	["status", "being built · deploys 18 Oct 2026 · paper only"],
	["accounts", "one per strategy version · $10k, $50k or $100k paper"],
	["fills", "opening auction · closing auction · intraday from minute bars"],
	["costs", "commission and fees on every fill · effective-dated rule set"],
	["risk halts", "−20% from peak · −5% in a day · any ledger mismatch"],
	["shorting", "stocks, with borrow fees and margin"],
	["options", "designed · execution off until bid/ask data exists"],
	["reviews", "six independent read-only reviews · each held the deploy"],
];

export default function TradingEngineV2() {
	return (
		<TradingEraPage
			era={ERAS[1]}
			status="being built · deploys 18 Oct 2026"
			description="Engine v2 of Ong Jun Xiong's paper-trading engine: the engine becomes executor and ledger, and each strategy trades its own paper account with commissions on every fill."
			lead="In Engine v2 the engine stops being the strategy's simulator and becomes its broker. Each strategy gets its own paper account, submits orders the way a trader would and reads its results back. The engine fills the orders, keeps the books, charges commissions on every fill and halts an account that breaks its loss limits.">
			<H2>Why a new engine</H2>
			<P>
				In Engine v1 a strategy and its bookkeeping were the same code, so every strategy kept
				its own cash and none of them paid commissions. That made the results easy to flatter and
				hard to compare. Now the money lives in one place, every strategy pays the same costs, and a
				changed strategy runs as a new version in its own account beside the old one until one of
				them is retired.
			</P>

			<H2>What the engine now owns</H2>
			<P>
				Orders fill at the opening auction, the closing auction or intraday from minute bars.
				Commissions and regulatory fees come from one versioned rule set with the date each rate took
				effect, so buying 300 shares at $5 at the open costs $1.56. Accounts under $25k follow the
				pattern-day-trader rule. Stocks can be shorted. An account halts at 20% below its peak, a 5%
				loss in a day or any mismatch in its ledger, and stays halted until someone restarts it.
				Options are designed in but stay switched off until I have bid and ask quotes to fill them
				honestly.
			</P>

			<H2>Why it has not shipped yet</H2>
			<P>
				Each round of the build went to an independent reviewer that could read but not change the
				code. Six reviews so far have each said not to deploy. The early ones found rules enforced
				differently on different settlement paths; the later ones found bugs that only appear when
				data arrives late, such as a delayed stock split or a backdated restart. Instead of patching
				those one at a time, the current round rebuilds each account by replaying its whole history
				from the day it opened on every settle, and treats the stored rows only as a checked cache.
			</P>
			<P>
				When it deploys, this page becomes update 2.0 with its own diagram. It is still paper only:
				no broker connection and no real money.
			</P>

			<FactList facts={facts} mt={{ base: 12, md: 14 }} />
		</TradingEraPage>
	);
}
