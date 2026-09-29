// Dates come from the repo's BUILDLOG, plans and archive READMEs.
export const VERSIONS = [
	{
		v: "v1",
		href: "/trading-engine/v1",
		when: "16–27 Jul 2026",
		title: "Data and the first paper portfolios",
		body: "Yahoo daily bars for about 12,200 listed names (Stooq was blocked on day one), a nightly trend screen, and ten paper portfolios filling at the next open.",
	},
	{
		v: "v2",
		href: "/trading-engine/v2",
		when: "28 Jul – 3 Aug",
		title: "More portfolios and a backtest farm",
		body: "Six research-based strategies took the count to 16 paper portfolios, a farm replayed every portfolio over past years, and the rules for splits and dividends were settled.",
	},
	{
		v: "v3",
		href: "/trading-engine/v3",
		when: "4–17 Aug",
		title: "AI adjusting the portfolios",
		body: "Five portfolios let a model veto entries or tune parameters inside fixed bounds, each paired with an untouched twin, and a news analyst wrote a morning brief. I retired all of it on 18 August.",
	},
	{
		v: "v4",
		href: "/trading-engine/v4",
		when: "18 Aug – 17 Sep",
		title: "Evidence first",
		body: "Ten-fold walk-forward tests, audits of the fill model and the data sources, and frozen forward monitors that can only continue or kill a strategy. An audit on 2 September found seven simulator bugs.",
	},
	{
		v: "v5",
		href: "/trading-engine/v5",
		when: "18–24 Sep",
		title: "An agent in the loop",
		body: "The repo went public. A nightly AI agent trades its own paper portfolio through a locked simulator tool, hourly agents watch without placing orders, a ledger scores every agent decision, and Alpaca is not connected yet while SEC EDGAR capture waits for access.",
	},
	{
		v: "v6",
		href: "/trading-engine/v6",
		when: "25 Sep",
		title: "TradingView for research",
		body: "TradingView quotes and bars reached the intraday agents as research input. They never touched prices, fills or orders.",
	},
	{
		v: "v7",
		href: "/trading-engine",
		when: "26–29 Sep",
		title: "Scoring every candidate",
		body: "The model now scores every nightly candidate next to a fixed rule, three test portfolios trade those scores, and a paired test decides on fixed check dates. A challenger lab is built but switched off, and new strategy research moved to a private repo.",
		current: true,
	},
];

export const CURRENT = VERSIONS.find((version) => version.current);
