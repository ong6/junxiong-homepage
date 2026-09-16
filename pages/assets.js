import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { AssetBrowser } from "uipack/browser";
import manifest from "uipack/assets/manifest.json";
import Layout from "../components/layouts/Articles";

// Unlisted: noindex, not in the sitemap, not in the nav or footer. The only
// way in is the link on /uipack. Previews are copied from the uipack package
// into public/uipack-assets at build time (scripts/copy-uipack-assets.mjs).

export default function Assets() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout title="Assets" noindex description="My own asset browser for the uipack figure parts.">
			<Container maxW="680px" px={0} ml={0}>
				<Box maxW="680px" pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/uipack" display="inline-flex" alignItems="center" minH="32px" my={-1.5} fontSize="13px" fontWeight="700">
						← Components
					</Link>

					<Text mt={{ base: 8, md: 10 }} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						{"// assets"}
					</Text>

					<Heading as="h1" mt={3} fontSize={{ base: "40px", md: "52px" }} lineHeight="1" letterSpacing="-.045em">
						Assets
					</Heading>

					<Text mt={6} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8">
						Everything uipack can draw, with a preview and a copy button. This page is for me
						and is unlisted; it is here so I can check what exists before drawing it again.
					</Text>
				</Box>

				<Box mt={{ base: 8, md: 12 }} w="min(100vw - 32px, 1088px)" maxW="none">
					<AssetBrowser manifest={manifest} base="/uipack-assets/" />
				</Box>
			</Container>
		</Layout>
	);
}
