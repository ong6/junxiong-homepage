import TradingVersionPage, { Code, H2, P } from "../../components/TradingVersionPage";
import * as V1 from "../../components/diagrams/trading/V1";

// Facts from docs/history/buildlog-2026-07-15-to-2026-09-17.md (lines 59–363) and
// commit ead678e (run_daily.sh, sim/fills.py, sim/strategies/configs.py).
const facts = [
	["dates", "16–27 July 2026"],
	["price source", "Yahoo daily bars via yfinance"],
	["universe", "Nasdaq Trader symbol list · 12,209 kept · 4,118 liquid"],
	["blocked", "Stooq (anti-bot page) · Nasdaq FTP (timed out)"],
	["history", "19.8M rows, back to 1962"],
	["books", "10 pre-registered + 1 discretionary · $39,000 each"],
	["fill model", "next open · 5–25 bp spread tier + 5 bp · ≤ 1 % of volume"],
	["schedule", "cron 22:30 UTC, weekdays"],
];

export default function TradingEngineV1() {
	return (
		<TradingVersionPage
			v="v1"
			description="Version 1 of Ong Jun Xiong's paper-trading engine, July 2026: Yahoo daily bars, a Minervini screen, ten paper books and a next-open fill rule."
			lead="Most of what went wrong in the first version had nothing to do with trading. It was one cron job on one Linux box: pull the market, screen it, and let ten paper books trade whatever passed, filling at the next morning’s open."
			diagram={V1}
			caption="fig. 1 — v1. ① Nasdaq's symbol list and Yahoo's daily bars are the only inputs; Stooq never worked from this host. ② One writer owns DuckDB. ③ The screen runs the Minervini trend template with a relative-strength rank. ④ Orders fill at the next open, and a small UI can add risk-gated discretionary tickets that fill the same way."
			facts={facts}>
			<H2>Yahoo became the only price source</H2>
			<P>
				The plan had Stooq as the price source and Yahoo as the fallback. On 16 July Stooq returned a JavaScript
				anti-bot page and Nasdaq&apos;s FTP server timed out, so Yahoo, through yfinance, supplied
				every daily bar, and Nasdaq Trader&apos;s symbol list over HTTPS defined the universe. The
				first load parsed 13,053 symbols and kept 12,209. Of those, 4,118 cleared the liquidity
				floor of a $3 close and $5M median dollar volume, and the backfill wrote 19.8 million rows,
				some reaching back to 1962. Relying on one source is why a later version added a verifier
				that checks Yahoo, rather than a second feed that quietly replaces it.
			</P>

			<H2>How an order fills</H2>
			<P>
				An order signalled at a close fills at the next session&apos;s open. Slippage is the larger
				of half the spread tier and 5 basis points, plus another 5, and the tier comes from 60-day
				median dollar volume. An order bigger than one percent of that volume is rejected instead of
				partly filled, and an order whose bar never arrives is rejected after three days. Ten
				pre-registered books started on 17 July with $39,000 each. A local UI could add a
				discretionary book, fed by risk-gated tickets that filled the same way.
			</P>

			<H2>Four nights of rollbacks</H2>
			<P>
				That discretionary book broke the engine. From 20 to 23 July every nightly failed at the
				league stage with <Code>KeyError: &apos;discretionary&apos;</Code>, because the UI had created
				the book at runtime and the strategy registry had never heard of it. Each day-step runs in one
				transaction, so every night rolled back cleanly and the league sat frozen at 17 July with 42
				orders pending. The fix was small, and the four days were replayed.
			</P>
			<P>
				The rule I took from it is in the log: a copy used to prove a go-live has to include every row
				the system creates at runtime, not only what the installer creates. I kept that rule. What v1
				still had no answer for was splits and dividends, and v2 found out how much that mattered.
			</P>
		</TradingVersionPage>
	);
}
