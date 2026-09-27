// Hover-fill colour per project category (styles/globals.css, --tone-*).
// Projects in the same category share a tone; every tone keeps page-bg text
// at 4.5:1 or better in both themes.
const TONES = {
	"/groundplane": "agents",
	"/skillsmith": "agents",
	"/skillpack": "agents",
	"/compoze": "company",
	"/trading-engine": "research",
	"/uipack": "design",
	"/jobforge": "practice",
};

export const toneFor = (href) => TONES[href] || "site";
