import { Box, Container } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import JunXiong from "../Intro";
import Navbar from "../Navbar";

const Main = ({ children, router }) => {
	return (
		<Box as="main" pb={8}>
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device, initial-scale=1" />
				<meta name="description" content="Jun Xiong's homepage" />
				<meta name="author" content="Jun Xiong" />
				<meta property="og:site_name" content="Jun Xiong's Homepage" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/favicon.png" />
				<link rel="icon" href="/favicon.ico" />
				<title>Jun Xiong - Homepage</title>
			</Head>

			<Navbar path={router.asPath} />

			<Container maxW="container.md" pt={14}>
				<JunXiong />
				{children}
			</Container>
		</Box>
	);
};

export default Main;
