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
			lead="v2 grew the league from ten books to sixteen and fixed something v1 had missed: Yahoo rewrites old prices after a split, and the engine only re-fetched the last five days."
			diagram={V2}
			caption="fig. 1 — v2. ① Yahoo now supplies splits and dividends alongside bars. ② Prices are stored as a restated cache with a watermark. ③ A reconcile stage checks the price scale and stops the night if it is broken. ④ Dividends are credited before fills. ⑤ A forward experiment logs Monday returns, and the backtest farm replays each book's own code over past years."
			facts={facts}>
			<H2>Splits and dividends</H2>
			<P>
				A five-day refetch leaves a permanent break in the price series after a split, and held
				books showed crashes that never happened. Dividends were missing altogether, so dual
				momentum&apos;s cash hurdle, a Treasury-bill ETF, had quietly become &ldquo;beat zero&rdquo;.
				On total return the bill ETF made +3.72% over twelve months against −0.09% on price alone,
				and EFA overtook SPY, +18.19% to +17.47%.
			</P>
			<P>
				The fixes became rules. Prices are a cache of Yahoo&apos;s adjusted view, restated at the
				break found in the stored series. Fills are adjusted at the ex-date, because a fill before
				it really was executed at pre-split prices. Portfolio state is a pure function of fills and
				dividends, with dividends replayed first. Fetching actions only warns, but the reconcile is
				fatal: the log puts it as &ldquo;trading on a broken scale is strictly worse than skipping a
				night.&rdquo;
			</P>

			<H2>A ten-day stop that fired after one</H2>
			<P>
				<Code>trading_days_between</Code> counted price rows, not sessions. With thousands of rows
				per day, the mean-reversion book&apos;s ten-day time stop fired after a single session. It
				now counts distinct dates. It is the kind of bug that only shows up as a strategy looking
				worse than it should, which is why I trust the replay farm more than the live table.
			</P>

			<H2>Replaying the books</H2>
			<P>
				The farm replays each book&apos;s live code over past windows on scratch copies of the
				store, so the live database stays read-only. The screen is vectorised for speed; the
				strategies are not, so the replay runs the same decisions the league runs. The first grid
				of 78 jobs drained the same day with no failures, and its answer was plain: no
				stock-picking book beat its own equal-weight benchmark on any window of three years or
				more. The sample is biased toward survivors, with 1,237 eligible names in 2011 against
				3,873 today, and that caveat never went away.
			</P>

			<P>
				By 3 August the nightly had run seven clean nights in a row. The next step was letting a
				model adjust some of the books, which is v3.
			</P>
		</TradingVersionPage>
	);
}
