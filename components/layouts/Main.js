import { Box, Container } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import JunXiong from "../Intro";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Main = ({ children, router }) => {
	return (
		<Box as="main" pb={8}>
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Ong Jun Xiong — software engineer at TikTok in Singapore working on AI infrastructure and backend platforms. Projects, resume and writing."
				/>
				<meta name="author" content="Jun Xiong" />
				<meta property="og:site_name" content="Jun Xiong Homepage" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Jun Xiong - Homepage" />
				<meta
					property="og:description"
					content="Ong Jun Xiong — software engineer at TikTok in Singapore working on AI infrastructure and backend platforms. Projects, resume and writing."
				/>
				<meta property="og:url" content="https://junxiong.dev" />
				<meta
					property="og:image"
					content="https://junxiong.dev/images/junxiong.png"
				/>
				<meta name="twitter:card" content="summary" />
				<link rel="canonical" href="https://junxiong.dev" />
				<link rel="icon" href="/favicon.ico" />
				<title>Jun Xiong - Homepage</title>
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
				<JunXiong />

				{children}

				<Footer />
			</Container>
		</Box>
	);
};

export default Main;
