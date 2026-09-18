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
		50: "#F5F7F6",
		100: "#E6EBE8",
		200: "#C9D2CE",
		300: "#A5B3AD",
		400: "#778A82",
		500: "#55675F",
		600: "#3E4D47",
		700: "#2A3732",
		800: "#1A2420",
		900: "#0E1512",
	},
	mint: {
		50: "#E9FAF3",
		100: "#C9F3E1",
		200: "#9BE8CA",
		300: "#71DCB2",
		400: "#45C696",
		500: "#2FA778",
		600: "#247F5D",
		700: "#205F49",
		800: "#1D4C3C",
		900: "#193F33",
	},
	warm: {
		50: "#F8F6F0",
		100: "#F1EEE6",
		200: "#E7E1D7",
		300: "#D5CDC0",
	},
	accent: "#205F49",
	accentDark: "#71DCB2",
};

// Three.js cannot read Chakra's CSS variables directly as numeric colours.
// Keep the hobbies scene palette beside the tokens it mirrors so a theme
// change cannot silently leave WebGL behind.
export const hobbyScenePalettes = {
	light: { accent: 0x205f49, ink: 0x1a2420, muted: 0x778a82, paper: 0xf8f6f0 },
	dark: { accent: 0x71dcb2, ink: 0xe6ebe8, muted: 0x778a82, paper: 0x3e4d47 },
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
			bg: mode("#F1EEE6", "#0E1512")(props),
			color: mode("#1A2420", "#E6EBE8")(props),
			fontFamily: "var(--font-sans)",
			fontSize: "16px",
			lineHeight: 1.65,
		},
		"::selection": {
			bg: mode("#9BE8CA", "#247F5D")(props),
			color: mode("#0E1512", "#F8F6F0")(props),
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
				outlineColor: mode("mint.600", "mint.300")(props),
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
		"page.bg": { default: "#F1EEE6", _dark: "#0E1512" },
		"page.text": { default: "#1A2420", _dark: "#E6EBE8" },
		"surface.raised": { default: "#F8F6F0", _dark: "#151F1B" },
		"surface.quiet": { default: "#E7E1D7", _dark: "#1A2420" },
		"border.subtle": { default: "rgba(26,36,32,.16)", _dark: "rgba(230,235,232,.14)" },
		"text.muted": { default: "#55675F", _dark: "#A5B3AD" },
		"brand.solid": { default: "#205F49", _dark: "#71DCB2" },
		"brand.ink": { default: "#F8F6F0", _dark: "#0E1512" },
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
