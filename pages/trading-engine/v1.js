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
			lead="The first version was one cron job on one Linux box. It pulled the market, screened it, and let ten paper books trade what the screen found, filling at the next morning's open."
			diagram={V1}
			caption="fig. 1 — v1. ① Nasdaq's symbol list and Yahoo's daily bars are the only inputs; Stooq never worked from this host. ② One writer owns DuckDB. ③ The screen runs the Minervini trend template with a relative-strength rank. ④ Orders fill at the next open, and a small UI can add risk-gated discretionary tickets that fill the same way."
			facts={facts}>
			<H2>One price source from the first day</H2>
			<P>
				I planned for two price sources and got one. On 16 July Stooq answered with a JavaScript
				anti-bot page and Nasdaq&apos;s FTP server timed out, so Yahoo through yfinance became the
				only source of daily bars and Nasdaq Trader&apos;s symbol list over HTTPS became the
				universe. The first load parsed 13,053 symbols, kept 12,209, and 4,118 passed the
				liquidity floor of a $3 close and $5M median dollar volume. The backfill wrote 19.8
				million rows, some going back to 1962.
			</P>

			<H2>The fill rule came before the strategies</H2>
			<P>
				Every order signalled at a close fills at the next session&apos;s open. Slippage is the
				larger of half the spread tier and 5 bp, plus another 5 bp, with the tier set by 60-day
				median dollar volume. An order above one percent of that volume is rejected rather than
				partly filled, and an order whose bar never arrives is rejected after three days. Ten
				pre-registered books started on 17 July with $39,000 each, alongside one discretionary
				book fed by tickets from a local UI.
			</P>

			<H2>Four nights that rolled back</H2>
			<P>
				From 20 to 23 July every nightly failed at the league stage with{" "}
				<Code>KeyError: &apos;discretionary&apos;</Code>. The UI had created that book at runtime,
				and the strategy registry had no entry for it. Each day-step runs in one transaction, so
				every night rolled back cleanly and the league sat frozen at 17 July with 42 orders
				pending. The fix was small and the four days were replayed. The lesson I kept from the log
				is that a copy used to prove a go-live has to include every row the system creates at
				runtime, not just the ones the code creates at install.
			</P>

			<P>
				v1 got the shape right: one writer, one fill rule, one nightly. It had too few kinds of
				strategy to learn much from, and it had no answer yet for splits and dividends. That is
				where v2 started.
			</P>
		</TradingVersionPage>
	);
}
