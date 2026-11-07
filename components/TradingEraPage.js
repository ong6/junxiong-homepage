import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Layout from "./layouts/Articles";
import { BackLink, ARTICLE_TITLE } from "./ArticleParts";

// One engine era (/trading-engine/v1, /trading-engine/v2): back link, title,
// mono eyebrow and a bold lead, then the page's own sections.
//
//   era    – an entry of ERAS
//   status – mono eyebrow after "Engine vN · "

export default function TradingEraPage({ era, status, description, lead, children }) {
	const accent = useColorModeValue("mint.700", "mint.300");
	return (
		<Layout title={`Trading engine ${era.v}: ${era.title}`} description={description} schema={{ type: "TechArticle" }} contents>
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<BackLink href="/trading-engine">Trading engine</BackLink>
					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						{era.title}
					</Heading>
					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700" letterSpacing=".08em" textTransform="uppercase">
						Engine {era.v} · {status}
					</Text>
					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						{lead}
					</Text>
				</Box>
				{children}
			</Container>
		</Layout>
	);
}
