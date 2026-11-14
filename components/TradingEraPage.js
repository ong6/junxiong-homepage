import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Layout from "./layouts/Articles";
import { BackLink, MetaLine, ARTICLE_TITLE } from "./ArticleParts";

// One engine era (/trading-engine/v1, /trading-engine/v2): back link, title,
// mono eyebrow and a bold lead, then the page's own sections.
//
//   era    – an entry of ERAS
//   status – mono eyebrow after "Engine vN · "
//   facts  – rows for the wide-screen side rail (layouts/Articles.js)
//   links  – links out for the side rail, if the page has any

export default function TradingEraPage({ era, status, description, lead, facts, links, children }) {
	return (
		<Layout
			title={`Trading engine ${era.v}: ${era.title}`}
			headline={era.title}
			description={description}
			schema={{ type: "TechArticle" }}
			contents
			facts={facts}
			links={links}>
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<BackLink href="/trading-engine">Trading engine</BackLink>
					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						{era.title}
					</Heading>
					<MetaLine>
						Engine {era.v} · {status}
					</MetaLine>
					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="lede" fontWeight="600">
						{lead}
					</Text>
				</Box>
				{children}
			</Container>
		</Layout>
	);
}
