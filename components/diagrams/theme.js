import { defineDiagramTheme } from "uipack";

// The site's diagram theme (STYLE.md, Component looks): UiPack's Blueprint
// grammar in the site's warm paper and cobalt. One object for every figure;
// pages/_document.js writes it to :root. Values are literal so a static export
// matches, and mirror the tokens in lib/theme.js.
export const sitePaper = defineDiagramTheme({
	name: "site-paper",
	light: {
		ink: "#29231F",
		"ink-2": "#655C55",
		surface: "#F3EFE7",
		"surface-raised": "#FBF8F2",
		"surface-2": "#E7DED2",
		line: "rgba(41, 35, 31, 0.18)",
		"line-soft": "rgba(26, 36, 32, 0.14)",
		accent: "#234EA2",
		"flow-request": "#3d63d9",
		"flow-response": "#2fa778",
		"flow-change": "#8a55d6",
		"flow-error": "#c2392b",
	},
	dark: {
		ink: "#F2ECE3",
		"ink-2": "#BDB3A8",
		surface: "#151311",
		"surface-raised": "#211D1A",
		"surface-2": "#2B2521",
		line: "rgba(242, 236, 227, 0.16)",
		"line-soft": "rgba(230, 235, 232, 0.14)",
		accent: "#9AB6FF",
		"flow-request": "#8ea4ff",
		"flow-response": "#5fd39b",
		"flow-change": "#c39aff",
		"flow-error": "#ff8c7a",
	},
	fonts: { text: "var(--font-sans)", label: "var(--font-mono)", heading: "var(--font-sans)" },
	canvas: "dots",
});
