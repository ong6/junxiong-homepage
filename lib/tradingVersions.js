// Dates come from the repo's BUILDLOG, plans and archive READMEs.
// Engine v1: the research simulator. Each update is 1.N; the old v1–v8
// routes redirect here (next.config.js).
export const VERSIONS = [
	{
		v: "1.1",
		href: "/trading-engine/v1/1.1",
		when: "16–27 Jul 2026",
		title: "Data and the first paper portfolios",
		body: "Yahoo daily bars for about 12,200 listed names (Stooq was blocked on day one), a nightly trend screen, and ten paper portfolios filling at the next open.",
	},
	{
		v: "1.2",
		href: "/trading-engine/v1/1.2",
		when: "28 Jul – 3 Aug",
		title: "More portfolios and a backtest farm",
		body: "Six research-based strategies took the count to 16 paper portfolios, a farm replayed every portfolio over past years, and the rules for splits and dividends were settled.",
	},
	{
		v: "1.3",
		href: "/trading-engine/v1/1.3",
		when: "4–17 Aug",
		title: "AI adjusting the portfolios",
		body: "Five portfolios let a model veto entries or tune parameters inside fixed bounds, each paired with an untouched twin, and a news analyst wrote a morning brief. I retired all of it on 18 August.",
	},
	{
		v: "1.4",
		href: "/trading-engine/v1/1.4",
		when: "18 Aug – 17 Sep",
		title: "Evidence first",
		body: "Ten-fold walk-forward tests, audits of the fill model and the data sources, and frozen forward monitors that can only continue or kill a strategy. An audit on 2 September found seven simulator bugs.",
	},
	{
		v: "1.5",
		href: "/trading-engine/v1/1.5",
		when: "18–24 Sep",
		title: "An agent in the loop",
		body: "The repo went public. A nightly AI agent trades its own paper portfolio through a locked simulator tool, hourly agents watch without placing orders, a ledger scores every agent decision, and Alpaca is not connected yet while SEC EDGAR capture waits for access.",
	},
	{
		v: "1.6",
		href: "/trading-engine/v1/1.6",
		when: "25 Sep",
		title: "TradingView for research",
		body: "TradingView quotes and bars reached the intraday agents as research input. They never touched prices, fills or orders.",
	},
	{
		v: "1.7",
		href: "/trading-engine/v1/1.7",
		when: "26–29 Sep",
		title: "Scoring every candidate",
		body: "The model now scores every nightly candidate next to a fixed rule, three test portfolios trade those scores, and a paired test decides on fixed check dates. A challenger lab is built but switched off, and new strategy research moved to a private repo.",
	},
	{
		v: "1.8",
		href: "/trading-engine/v1/1.8",
		when: "2 Oct 2026",
		title: "One shared backtest core",
		body: "Every strategy is now a short specification over one no-peeking evaluator, with native event and portfolio simulation, one evidence path and much faster full-market runs.",
	},
];

// The latest Engine v1 update.
export const CURRENT = VERSIONS[VERSIONS.length - 1];

// An era is a change in what the engine is responsible for; updates inside an
// era bump the number after the dot.
export const ERAS = [
	{
		v: "v1",
		href: "/trading-engine/v1/1.8",
		when: "Jul – Oct 2026",
		title: "A research simulator",
		body: "Strategies ran as simulated paper portfolios inside the engine, judged by walk-forward tests, frozen forward monitors and, from 1.8, one shared backtest core. Eight updates, 1.1 to 1.8.",
	},
	{
		v: "v2",
		href: "/trading-engine/v2",
		when: "Since 18 Oct 2026",
		title: "Executor and ledger",
		body: "The engine fills the orders, keeps the books and charges commissions on every fill, behind checks that every change must pass before it deploys. Live on paper since 18 October.",
		current: true,
	},
];
