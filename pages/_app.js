import "uipack/theme.css";
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
import Head from "next/head";
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

const fontRoles = `:root{--font-sans:${plexSans.style.fontFamily};--font-mono:${plexMono.style.fontFamily}}`;

function MyApp({ Component, pageProps, router }) {
	return (
		<div className={`site-root ${plexSans.variable} ${plexMono.variable}`}>
			{/* The faces are named on :root in the document itself: <body> sets the
			    font and portals mount outside the wrapper, and a class added after
			    hydration painted every page in the fallback face first. */}
			<Head>
				<style
					key="font-roles"
					dangerouslySetInnerHTML={{ __html: fontRoles }}
				/>
			</Head>
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
