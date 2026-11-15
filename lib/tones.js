// Hover colour per project category (styles/globals.css, --tone-*): the 3px
// rule a card draws along its top edge and the colour its label takes.
// Projects in the same category share a tone; every tone reads at 4.5:1 or
// better on the page and card grounds in both themes.
const TONES = {
	"/ai-tooling": "agents",
	"/workbase": "agents",
	"/groundplane": "agents",
	"/skillsmith": "agents",
	"/skills": "agents",
	"/compoze": "company",
	"/trading-engine": "research",
	"/uipack": "design",
};

export const toneFor = (href) => TONES[href] || "site";
