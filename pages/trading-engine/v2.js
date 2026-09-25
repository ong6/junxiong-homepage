import TradingVersionPage, { Code, H2, P } from "../../components/TradingVersionPage";
import * as V2 from "../../components/diagrams/trading/V2";

// Facts from docs/history/buildlog-2026-07-15-to-2026-09-17.md (lines 379–790) and
// commit a9633cf (run_daily.sh, configs.py, db.py).
const facts = [
	["dates", "28 July – 3 August 2026"],
	["new data", "Yahoo splits and dividends · 409,684 action rows"],
	["books", "16 pre-registered + 1 discretionary"],
	["new books", "turtle breakout · stopped momentum · sector momentum · low vol · 52-week high · PEAD"],
	["gate", "actions fetch warns · reconcile is fatal"],
	["first reconcile", "36 splits adjudicated · 1,839 dividends stored"],
	["backtest grid", "78 jobs, drained the same day"],
	["exit", "seven clean nightlies, 24 July – 3 August"],
];

export default function TradingEngineV2() {
	return (
		<TradingVersionPage
			v="v2"
			description="Version 2 of Ong Jun Xiong's paper-trading engine, late July 2026: split and dividend handling, a fatal reconcile gate, 16 books and a backtest farm."
			lead="v2 added six books, but the change that mattered was finding out the price history was wrong. Yahoo rewrites old prices after a split, the engine only re-fetched the last five days, and dividends were never stored."
			diagram={V2}
			caption="fig. 1 — v2. ① Yahoo now supplies splits and dividends alongside bars. ② Prices are stored as a restated cache with a watermark. ③ A reconcile stage checks the price scale and stops the night if it is broken. ④ Dividends are credited before fills. ⑤ A forward experiment logs Monday returns, and the backtest farm replays each book's own code over past years."
			facts={facts}>
			<H2>What splits and missing dividends did</H2>
			<P>
				A five-day refetch leaves a permanent break in the series after a split, so books holding
				that stock showed crashes that never happened. Missing dividends were quieter. Dual
				momentum&apos;s cash hurdle is a Treasury-bill ETF, and without dividends it had become
				&ldquo;beat zero&rdquo;. On total return that ETF made +3.72% over twelve months against
				−0.09% on price alone, and EFA moved ahead of SPY, +18.19% to +17.47%.
			</P>

			<H2>The rules I wrote down</H2>
			<P>
				Prices are a cache of Yahoo&apos;s adjusted view, restated at the break found in the stored
				series. Fills are adjusted at the ex-date, because a fill before it really did execute at
				pre-split prices. Portfolio state is a pure function of fills and dividends, with dividends
				replayed first. Fetching new actions only warns, but the reconcile stage is fatal. The log
				puts the reason better than I can: &ldquo;trading on a broken scale is strictly worse than
				skipping a night.&rdquo;
			</P>

			<H2>A ten-day stop that fired after one</H2>
			<P>
				<Code>trading_days_between</Code> counted price rows instead of sessions. With thousands of
				rows per day, the mean-reversion book&apos;s ten-day time stop fired after a single session.
				On the league table that looked like a weak strategy, not a bug. It now counts distinct dates.
			</P>

			<H2>Replaying the books</H2>
			<P>
				The farm replays each book&apos;s live code over past windows on scratch copies of the
				store, so the live database stays read-only. Only the screen is vectorised for speed; the
				strategies run exactly as the league runs them. The first grid of 78 jobs drained the same
				day without a failure, and its answer was blunt: no stock-picking book beat its own
				equal-weight benchmark over any window of three years or more. The sample leans toward
				survivors, with 1,237 eligible names in 2011 against 3,873 today, and that caveat never went
				away.
			</P>
			<P>
				That result set the bar for everything after it. A stock-picking book has to beat an
				equal-weight basket of the same names, over years, before I treat it as more than noise.
				v2 closed with seven clean nightlies in a row, from 24 July to 3 August.
			</P>
		</TradingVersionPage>
	);
}
