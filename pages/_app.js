import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts/Main";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import theme from "../lib/theme";

const plexSans = IBM_Plex_Sans({
	weight: "variable",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

function MyApp({ Component, pageProps, router }) {
	return (
		<div className={`${plexSans.variable} ${plexMono.variable}`}>
			<ChakraProvider theme={theme}>
				<Layout router={router}>
					<Component {...pageProps} key={router.route} />
				</Layout>
			</ChakraProvider>
			<SpeedInsights />
		</div>
	);
}

export default MyApp;
