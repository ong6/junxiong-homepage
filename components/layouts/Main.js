import { Box, Container } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Main = ({ children, router }) => {
	return (
		<Box as="main" pb={8} overflowX="hidden">
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Ong Jun Xiong — software engineer at TikTok in Singapore working on AI infrastructure and backend platforms. Selected work, resume and how to reach me."
				/>
				<meta name="author" content="Jun Xiong" />
				<meta property="og:site_name" content="Ong Jun Xiong" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Ong Jun Xiong — AI Infrastructure & Backend Engineer"
				/>
				<meta
					property="og:description"
					content="Ong Jun Xiong — software engineer at TikTok in Singapore working on AI infrastructure and backend platforms. Selected work, resume and how to reach me."
				/>
				<meta property="og:url" content="https://junxiong.dev" />
				<meta
					property="og:image"
					content="https://junxiong.dev/images/junxiong.png"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Ong Jun Xiong — AI Infrastructure & Backend Engineer"
				/>
				<meta
					name="twitter:description"
					content="Software engineer at TikTok in Singapore building AI infrastructure and backend platforms."
				/>
				<meta name="twitter:image" content="https://junxiong.dev/images/junxiong.png" />
				<link rel="canonical" href="https://junxiong.dev" />
				<link rel="icon" href="/favicon.ico" />
				<title>Ong Jun Xiong — AI Infrastructure & Backend Engineer</title>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							name: "Ong Jun Xiong",
							url: "https://junxiong.dev",
							jobTitle: "Software Engineer",
							worksFor: {
								"@type": "Organization",
								name: "TikTok",
							},
							sameAs: [
								"https://github.com/ong6",
								"https://www.linkedin.com/in/junx6/",
							],
						}),
					}}
				/>
			</Head>

			<Navbar path={router.asPath} />

			<Container maxW="container.md" pt={14}>
				{children}

				<Footer />
			</Container>
		</Box>
	);
};

export default Main;
