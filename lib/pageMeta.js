// The title and meta description of each top-level page with no data module
// of its own. One source: the page passes it to its layout and the ⌘K search
// (lib/siteIndex.js) lists it. Change a page's description here.
// The homepage keeps DEFAULT_DESCRIPTION (components/layouts/Main.js); the AI
// tools read lib/aiTooling.js.
export const PAGE_META = {
	"/ai-tooling": {
		title: "AI tooling",
		description:
			"Open-source tools for AI agents, by layer: Workbase for memory, Agent skills for context, Skillsmith for evaluation and Groundplane for runtime checks.",
	},
	"/compoze": {
		title: "Compoze",
		description:
			"Compoze built document-grounded assistants for businesses. I ran it alone alongside a full-time job in 2025, until a client bought the company.",
	},
	"/trading-engine": {
		title: "Trading engine",
		description: "A paper-trading research engine where every strategy runs through one shared backtest core and one evidence path.",
	},
	"/uipack": {
		title: "UiPack",
		description:
			"UiPack brings reusable web design, animation and presentation systems into one place, including slide layouts and the words used to present them.",
	},
	"/resume": {
		title: "Resume",
		description:
			"Résumé of Ong Jun Xiong, AI infrastructure and backend engineer at TikTok in Singapore: agent platforms, e-commerce systems and founding Compoze.",
	},
	"/hobbies": {
		title: "Hobbies",
		description:
			"Coding and experimenting with AI are Ong Jun Xiong’s main hobbies, alongside tennis, trading, home servers, travel and reading.",
	},
	"/contact": {
		title: "Contact",
		description: "Contact Ong Jun Xiong by email, or find his work on GitHub, LinkedIn and notes.",
	},
	"/works": {
		title: "Archive",
		description:
			"Archive of Ong Jun Xiong's NUS projects, 2020 to 2023: hackathons, coursework, design work and open source. Current projects are on the homepage.",
	},
};
