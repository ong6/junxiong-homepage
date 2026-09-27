import { ColorModeProvider, CSSReset, EnvironmentProvider, GlobalStyle, ThemeProvider } from "@chakra-ui/react";

// Chakra's ChakraProvider minus its ToastProvider. The site shows no toasts,
// and the toast layer pulls framer-motion into every page's first load.
// Same composition as Chakra's internal Provider (ThemeProvider → colour mode
// → CSS reset + global styles → environment).
export default function SiteProvider({ theme, children }) {
	return (
		<ThemeProvider theme={theme}>
			<ColorModeProvider options={theme.config}>
				<CSSReset />
				<GlobalStyle />
				<EnvironmentProvider>{children}</EnvironmentProvider>
			</ColorModeProvider>
		</ThemeProvider>
	);
}
