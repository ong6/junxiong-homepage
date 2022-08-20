import { extendTheme } from "@chakra-ui/react";
import { mode, createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
	sm: "320px",
	smmd: "500px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
});

const styles = {
	global: (props) => ({
		body: {
			bg: mode("#EEE2DC", "#202023")(props),
		},
		html: {
			scrollBehavior: "smooth",
		},
	}),
};

const components = {
	Heading: {
		variants: {
			"section-title": {
				textDecoration: "underline",
				fontSize: 20,
				textUnderlineOffset: 6,
				textDecorationColor: "#525252",
				textDecorationThickness: 4,
				marginTop: 3,
				marginBottom: 4,
			},
		},
	},
	Link: {
		baseStyle: (props) => ({
			color: mode("#3d7aed", "#ff63c3")(props),
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
