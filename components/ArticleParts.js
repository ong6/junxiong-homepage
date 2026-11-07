import { Box, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

// The shared parts of every article page (STYLE.md, Layout: Article): the back
// link above the h1, prose paragraphs, section heads and inline code. One copy
// here so the pages cannot drift apart.

// A 44px target (the touch floor) whose negative margin keeps the old 20px
// line in the layout.
export function BackLink({ href, children }) {
	return (
		<Link
			as={NextLink}
			href={href}
			display="inline-flex"
			alignItems="center"
			minH="44px"
			my={-3}
			fontSize="13px"
			fontWeight="700">
			← {children}
		</Link>
	);
}

export const P = (props) => <Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />;

export const H2 = (props) => <Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />;

export const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;
