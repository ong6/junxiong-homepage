import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";

const NotFound = () => (
	<Layout title="Page not found" noindex>
		<Container maxW="680px" px={0} ml={0}>
			<Box pt={{ base: 10, md: 16 }}>
				<Text
					fontFamily="var(--font-mono)"
					fontSize="11px"
					fontWeight="700"
					letterSpacing=".1em"
					textTransform="uppercase"
					color="text.muted">
					404
				</Text>
				<Heading as="h1" mt={4} fontSize={{ base: "26px", md: "32px" }}>
					There is nothing at this address.
				</Heading>
				<Text mt={4} fontSize="16px" lineHeight="1.7" color="text.muted">
					The page may have moved, or the link was never right.{" "}
					<Link as={NextLink} href="/">
						Back to the homepage
					</Link>
					.
				</Text>
			</Box>
		</Container>
	</Layout>
);

export default NotFound;
