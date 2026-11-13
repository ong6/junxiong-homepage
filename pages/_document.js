import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { GROUND, themeScript } from "../lib/themeChoice";

// The ground from the first byte (STYLE.md, Theme): the theme script sets
// data-theme before any stylesheet or component arrives, and this rule paints
// the ground for it, so no frame shows the other theme or a white canvas.
const groundStyle = `html{background:${GROUND.light};color-scheme:light}html[data-theme=dark]{background:${GROUND.dark};color-scheme:dark}`;

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content={GROUND.light} media="(prefers-color-scheme: light)" />
					<meta name="theme-color" content={GROUND.dark} media="(prefers-color-scheme: dark)" />
					<script id="theme-script" dangerouslySetInnerHTML={{ __html: themeScript }} />
					<style id="theme-ground" dangerouslySetInnerHTML={{ __html: groundStyle }} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
