import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../lib/theme";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content="#F1EEE6" media="(prefers-color-scheme: light)" />
					<meta name="theme-color" content="#0E1512" media="(prefers-color-scheme: dark)" />
				</Head>
				<body>
					{/* Must run before any React output so the first paint already
					    carries the stored or system colour mode. */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
