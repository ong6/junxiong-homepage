import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = {
	sm: "320px",
	smmd: "500px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
};

const colors = {
	graphite: {
		50: "#F6F3EE",
		100: "#E8E2DA",
		200: "#CEC4BA",
		300: "#AEA198",
		400: "#85776E",
		500: "#655C55",
		600: "#4B433D",
		700: "#37302B",
		800: "#211D1A",
		900: "#151311",
	},
	cobalt: {
		50: "#EEF3FF",
		100: "#DCE6FF",
		200: "#BFCFFF",
		300: "#9AB6FF",
		400: "#7194ED",
		500: "#4B70CF",
		600: "#315DB6",
		700: "#234EA2",
		800: "#203F7E",
		900: "#1D3566",
	},
	terracotta: {
		50: "#FFF2EC",
		100: "#F8DDD1",
		200: "#EEBBA7",
		300: "#DE9074",
		400: "#C96B4B",
		500: "#B45132",
		600: "#963D25",
		700: "#7E321F",
		800: "#672C20",
		900: "#56271F",
	},
	// Backward-compatible alias for existing case-study components.
	mint: {
		50: "#EEF3FF",
		100: "#DCE6FF",
		200: "#BFCFFF",
		300: "#9AB6FF",
		400: "#7194ED",
		500: "#4B70CF",
		600: "#315DB6",
		700: "#234EA2",
		800: "#203F7E",
		900: "#1D3566",
	},
	warm: {
		50: "#FBF8F2",
		100: "#F3EFE7",
		200: "#E7DED2",
		300: "#D4C7B9",
	},
	accent: "#234EA2",
	accentDark: "#9AB6FF",
};

// Three.js cannot read Chakra's CSS variables directly as numeric colours.
// Keep the hobbies scene palette beside the tokens it mirrors so a theme
// change cannot silently leave WebGL behind.
export const hobbyScenePalettes = {
	light: { accent: 0x234ea2, ink: 0x29231f, muted: 0x85776e, paper: 0xfbf8f2 },
	dark: { accent: 0x9ab6ff, ink: 0xf2ece3, muted: 0x85776e, paper: 0x4b433d },
};

const styles = {
	global: (props) => ({
		":root": {
			colorScheme: mode("light", "dark")(props),
		},
		html: {
			scrollBehavior: "smooth",
		},
		body: {
			bg: mode("#F3EFE7", "#151311")(props),
			color: mode("#29231F", "#F2ECE3")(props),
			fontFamily: "var(--font-sans)",
			fontSize: "16px",
			lineHeight: 1.65,
		},
		"::selection": {
			bg: mode("#BFCFFF", "#315DB6")(props),
			color: mode("#151311", "#FBF8F2")(props),
		},
	}),
};

const components = {
	Button: {
		baseStyle: {
			borderRadius: "4px",
			fontWeight: 700,
			letterSpacing: "-0.01em",
			transitionProperty: "transform, background-color, border-color, color, box-shadow",
			transitionDuration: "160ms",
			_focusVisible: {
				boxShadow: "0 0 0 3px var(--focus-ring)",
			},
		},
		// Chakra's solid mint would be white on mint.500 (3.0:1). Light mode sits
		// on mint.700 (7.5:1); dark mode flips to ink on mint.300 (11:1).
		variants: {
			solid: (props) =>
				props.colorScheme === "mint"
					? {
							bg: mode("mint.700", "mint.300")(props),
							color: mode("white", "graphite.900")(props),
							_hover: {
								bg: mode("mint.800", "mint.200")(props),
								_disabled: { bg: mode("mint.700", "mint.300")(props) },
							},
							_active: { bg: mode("mint.900", "mint.400")(props) },
					  }
					: {},
		},
	},
	Heading: {
		baseStyle: {
			fontFamily: "var(--font-sans)",
			fontWeight: 720,
			letterSpacing: "-0.035em",
		},
	},
	Link: {
		baseStyle: (props) => ({
			color: mode("accent", "accentDark")(props),
			textDecoration: "underline",
			textDecorationThickness: "1px",
			textUnderlineOffset: "3px",
			_focusVisible: {
				outline: "2px solid",
				outlineColor: mode("cobalt.600", "cobalt.300")(props),
				outlineOffset: "3px",
				borderRadius: "2px",
			},
		}),
	},
};

const fonts = {
	heading: "var(--font-sans)",
	body: "var(--font-sans)",
	mono: "var(--font-mono)",
};

const config = {
	initialColorMode: "system",
	useSystemColorMode: true,
};

const semanticTokens = {
	colors: {
		"page.bg": { default: "#F3EFE7", _dark: "#151311" },
		"page.text": { default: "#29231F", _dark: "#F2ECE3" },
		"surface.raised": { default: "#FBF8F2", _dark: "#211D1A" },
		"surface.quiet": { default: "#E7DED2", _dark: "#2B2521" },
		"border.subtle": { default: "rgba(41,35,31,.18)", _dark: "rgba(242,236,227,.16)" },
		"border.strong": { default: "rgba(35,78,162,.48)", _dark: "rgba(154,182,255,.56)" },
		"text.muted": { default: "#655C55", _dark: "#BDB3A8" },
		"brand.solid": { default: "#234EA2", _dark: "#9AB6FF" },
		"brand.ink": { default: "#FBF8F2", _dark: "#151311" },
		"accent.terracotta": { default: "#963D25", _dark: "#EEBBA7" },
		"accent.soft": { default: "#F8DDD1", _dark: "#56271F" },
		"preview.canvas": { default: "#F6F2EA", _dark: "#191716" },
		"preview.panel": { default: "#FFFDFC", _dark: "#28231F" },
		"preview.shadow": { default: "#D9CFC3", _dark: "#0D0C0B" },
		"status.error": { default: "#963D25", _dark: "#F1A58B" },
		"project.groundplane": { default: "#101A16", _dark: "#16291F" },
		"project.compoze": { default: "#F0DCCF", _dark: "#271F1A" },
		"project.jobforge": { default: "#E7E2F4", _dark: "#211E2C" },
		"project.skillpack": { default: "#EFE8D6", _dark: "#272317" },
		"project.property": { default: "#DDEAF5", _dark: "#182631" },
		"project.tradingengine": { default: "#D8E8E4", _dark: "#14262A" },
	},
};

// Chakra ships ~20 default color scales and emits a CSS custom property for
// every shade into the inline <style> of each page. This site only ever uses
// the brand scales above plus gray/alpha, so the rest are dropped after the
// merge to keep the inline variable dump small.
// `green` is kept: components/Work.js still renders <Badge colorScheme="green">.
const unusedDefaultScales = [
	"red",
	"orange",
	"yellow",
	"teal",
	"blue",
	"cyan",
	"purple",
	"pink",
	"linkedin",
	"facebook",
	"messenger",
	"whatsapp",
	"twitter",
	"telegram",
];

const theme = extendTheme({
	config,
	styles,
	components,
	fonts,
	colors,
	semanticTokens,
	breakpoints,
});

for (const scale of unusedDefaultScales) {
	delete theme.colors[scale];
}

export default theme;
