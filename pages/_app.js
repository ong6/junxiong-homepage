import "uipack/theme.css";
import "uipack/browser.css";
import "uipack/objects.css";
import "uipack/presentations.css";
import "uipack/docs.css";
import "../styles/globals.css";
import "../styles/print.css";
import SiteProvider from "../components/SiteProvider";
import Layout from "../components/layouts/Main";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { useEffect } from "react";
import theme from "../lib/theme";

const plexSans = IBM_Plex_Sans({
	weight: "variable",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

// Mono is only ever set at 400 or 700 (eyebrows, captions, code figures).
const plexMono = IBM_Plex_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

function MyApp({ Component, pageProps, router }) {
	// Portals (the expanded diagram, menus) mount on <body>, outside the wrapper
	// below, so the font variables also go on <html>.
	useEffect(() => {
		document.documentElement.classList.add(plexSans.variable, plexMono.variable);
	}, []);

	return (
		<div className={`${plexSans.variable} ${plexMono.variable}`}>
			<SiteProvider theme={theme}>
				<Layout router={router}>
					<Component {...pageProps} key={router.route} />
				</Layout>
			</SiteProvider>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default MyApp;
