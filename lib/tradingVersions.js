// Dates come from the repo's BUILDLOG, plans and archive READMEs.
export const VERSIONS = [
	{
		v: "v1",
		href: "/trading-engine/v1",
		when: "16–27 Jul 2026",
		title: "Data and a first league",
		body: "Yahoo daily bars for about 12,200 listed names (Stooq was blocked on day one), a nightly trend screen, and ten paper books filling at the next open.",
	},
	{
		v: "v2",
		href: "/trading-engine/v2",
		when: "28 Jul – 3 Aug",
		title: "More books and a backtest farm",
		body: "Six research-based strategies took the league to 16 books, a farm replayed every book over past years, and the rules for splits and dividends were settled.",
	},
	{
		v: "v3",
		href: "/trading-engine/v3",
		when: "4–17 Aug",
		title: "AI adjusting the books",
		body: "Five books let a model veto entries or tune parameters inside fixed bounds, each paired with an untouched twin, and a news analyst wrote a morning brief. I retired all of it on 18 August.",
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
		body: "The repo went public. A nightly AI agent trades its own paper book through a locked simulator tool, hourly shadow agents watch without placing orders, a ledger scores every agent decision, and Alpaca sits behind a credential gate while SEC EDGAR capture waits for access.",
	},
	{
		v: "v6",
		href: "/trading-engine",
		when: "25 Sep",
		title: "TradingView for research",
		body: "TradingView quotes and bars now reach the intraday agents as research input. They never touch prices, fills or orders.",
		current: true,
	},
];

export const CURRENT = VERSIONS.find((version) => version.current);
