import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const SITE_URL = "https://junxiong.dev";

export const DEFAULT_TITLE = "Ong Jun Xiong — AI Infrastructure & Backend Engineer";
export const DEFAULT_DESCRIPTION =
	"Ong Jun Xiong — software engineer at TikTok in Singapore working on AI infrastructure and backend platforms. Selected work, resume and how to reach me.";

const OG_IMAGE = `${SITE_URL}/images/junxiong.png`;

// One canonical per route. Strip the hash and query so `/#selected-work` and
// `/works?x=1` do not become separate canonicals, and keep the apex host with
// no trailing slash (except the homepage, which is `https://junxiong.dev/`).
export const canonicalFor = (asPath) => {
	const path = (asPath || "/").split("#")[0].split("?")[0];
	const clean = path.replace(/\/+$/, "");
	return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: "Ong Jun Xiong",
	alternateName: ["Jun Xiong Ong", "Jun Xiong", "ong6"],
	url: SITE_URL,
	image: OG_IMAGE,
	jobTitle: "AI Infrastructure Engineer",
	description: DEFAULT_DESCRIPTION,
	worksFor: {
		"@type": "Organization",
		name: "TikTok",
	},
	alumniOf: [
		{
			"@type": "CollegeOrUniversity",
			name: "National University of Singapore",
		},
		{
			"@type": "CollegeOrUniversity",
			name: "Technical University of Munich",
		},
	],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Singapore",
		addressCountry: "SG",
	},
	knowsAbout: [
		"AI infrastructure",
		"Agent platforms",
		"Model Context Protocol",
		"Go",
		"TypeScript",
		"Distributed systems",
		"Backend engineering",
	],
	sameAs: ["https://github.com/ong6", "https://www.linkedin.com/in/junx6/"],
};

const Main = ({ children, router }) => {
	const canonical = canonicalFor(router?.asPath);

	return (
		<Box as="main" pb={8} overflowX="hidden">
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="robots"
					content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
				/>
				<meta name="description" content={DEFAULT_DESCRIPTION} />
				<meta name="author" content="Ong Jun Xiong" />
				<meta property="og:site_name" content="Ong Jun Xiong" />
				<meta property="og:locale" content="en_SG" />
				<meta property="og:type" content="website" />
				<meta key="og:title" property="og:title" content={DEFAULT_TITLE} />
				<meta key="og:description" property="og:description" content={DEFAULT_DESCRIPTION} />
				<meta property="og:url" content={canonical} />
				<meta property="og:image" content={OG_IMAGE} />
				<meta property="og:image:width" content="2459" />
				<meta property="og:image:height" content="2459" />
				<meta property="og:image:alt" content="Ong Jun Xiong" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={DEFAULT_TITLE} />
				<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
				<meta name="twitter:image" content={OG_IMAGE} />
				<meta name="twitter:image:alt" content="Ong Jun Xiong" />
				<link rel="canonical" href={canonical} />
				<link rel="icon" href="/favicon.ico" />
				<title>{DEFAULT_TITLE}</title>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
