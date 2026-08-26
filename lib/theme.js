import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = {
	sm: "320px",
	smmd: "500px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
};

const styles = {
	global: (props) => ({
		body: {
			bg: mode("#EEE2DC", "#202023")(props),
			color: mode("gray.800", "whiteAlpha.900")(props),
		},
		html: {
			scrollBehavior: "smooth",
		},
	}),
};

const components = {
	Heading: {
		variants: {
			"section-title": (props) => ({
				textDecoration: "underline",
				fontSize: 20,
				textUnderlineOffset: 6,
				textDecorationColor: mode("accent", "accentDark")(props),
				textDecorationThickness: 4,
				marginTop: 3,
				marginBottom: 4,
			}),
		},
	},
	Link: {
		baseStyle: (props) => ({
			color: mode("accent", "accentDark")(props),
			textUnderlineOffset: 3,
		}),
	},
};

const fonts = {
	heading: "'M PLUS Rounded 1c'",
};

const colors = {
	lightPink: "#EDC7B7",
	lightGray: "#EEE2DC",
	darkGray: "#BAB2B5",
	darkBlue: "#123C69",
	hotPink: "#AC3B61",
	// Semantic accents: use these for links, underlines and hovers so the
	// palette stays consistent across color modes.
	accent: "#AC3B61", // light mode — 4.6:1 on #EEE2DC (AA)
	accentDark: "#ff63c3", // dark mode — matches existing pink on #202023
};

const config = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const theme = extendTheme({
	config,
	styles,
	components,
	fonts,
	colors,
	breakpoints,
});
export default theme;
