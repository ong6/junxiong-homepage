import { Box, Container, Link } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const SITE_URL = "https://junxiong.dev";

export const DEFAULT_TITLE = "Ong Jun Xiong | AI Infrastructure Engineer in Singapore";
export const DEFAULT_DESCRIPTION =
	"Ong Jun Xiong is an AI infrastructure engineer at TikTok in Singapore. Explore his agent systems, backend platforms, open-source tools, and personal software projects.";

const OG_IMAGE = `${SITE_URL}/images/og-card.jpg`;

// One canonical per route. Strip the hash and query so `/#selected-work` and
// `/works?x=1` do not become separate canonicals, and keep the apex host with
// no trailing slash (except the homepage, which is `https://junxiong.dev/`).
export const canonicalFor = (asPath) => {
	const path = (asPath || "/").split("#")[0].split("?")[0];
	const clean = path.replace(/\/+$/, "");
	return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};

const personSchema = {
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: "Ong Jun Xiong",
	alternateName: ["Jun Xiong Ong", "Jun Xiong", "ong6"],
	url: `${SITE_URL}/`,
	image: `${SITE_URL}/images/junxiong.webp`,
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

// Evaluated once at module load. Pages are prerendered at build time, so this
// stamps the build date rather than a stale hardcoded one.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const profileSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: `${SITE_URL}/`,
			name: "Ong Jun Xiong",
			alternateName: "Jun Xiong",
			publisher: { "@id": `${SITE_URL}/#person` },
		},
		{
			"@type": "ProfilePage",
			"@id": `${SITE_URL}/#profile`,
			url: `${SITE_URL}/`,
			name: DEFAULT_TITLE,
			description: DEFAULT_DESCRIPTION,
			dateModified: BUILD_DATE,
			isPartOf: { "@id": `${SITE_URL}/#website` },
			mainEntity: { "@id": `${SITE_URL}/#person` },
		},
		{
			...personSchema,
			mainEntityOfPage: { "@id": `${SITE_URL}/#profile` },
		},
	],
};

const Main = ({ children, router }) => {
	const canonical = canonicalFor(router?.asPath);
	const structuredData =
		canonical === `${SITE_URL}/`
			? profileSchema
			: {
					"@context": "https://schema.org",
					"@type": "WebPage",
					"@id": canonical,
					url: canonical,
					isPartOf: { "@id": `${SITE_URL}/#website` },
					dateModified: BUILD_DATE,
					about: { "@id": `${SITE_URL}/#person` },
					primaryImageOfPage: OG_IMAGE,
			  };

	return (
		<Box pb={8} overflowX="hidden">
			<Head>
				<meta
					name="google-site-verification"
					content="xEfOIDuq7sNtCuAVI0fO7WCZUCk02TUXpGGwmq--LoI"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
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
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta
					property="og:image:alt"
					content="Ong Jun Xiong — AI infrastructure and backend engineer"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={DEFAULT_TITLE} />
				<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
				<meta name="twitter:image" content={OG_IMAGE} />
				<meta
					name="twitter:image:alt"
					content="Ong Jun Xiong — AI infrastructure and backend engineer"
				/>
				<link rel="canonical" href={canonical} />
				<link rel="icon" href="/favicon.ico" />
				<title>{DEFAULT_TITLE}</title>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
			</Head>

			<Link
				href="#main-content"
				position="fixed"
				top={3}
				left={3}
				zIndex={2000}
				px={4}
				py={2.5}
				borderRadius="md"
				bg="gray.900"
				color="white"
				fontWeight="700"
				transform="translateY(-160%)"
				transition="transform 0.15s ease"
				_focus={{ transform: "translateY(0)", outline: "3px solid", outlineColor: "mint.300" }}>
				Skip to content
			</Link>

			<Box as="header">
				<Navbar path={router.asPath} />
			</Box>

			<Container as="main" id="main-content" maxW="1120px" pt={14}>
				{children}
			</Container>

			<Container as="footer" maxW="1120px">
				<Footer />
			</Container>
		</Box>
	);
};

export default Main;
