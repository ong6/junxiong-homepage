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

export const P = (props) => <Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="prose" {...props} />;

export const H2 = (props) => <Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />;

export const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// The h1 scale, one size per page type (STYLE.md, Type). Landing pages (home,
// Contact, Hobbies) share the display size; every article, archive and docs
// page uses the article size.
export const LANDING_TITLE = { base: "46px", smmd: "58px", lg: "74px" };
export const ARTICLE_TITLE = { base: "40px", md: "52px" };

// The site's one mono label: `// LABEL` in the accent (STYLE.md, Ornaments).
// Pass the words without the slashes.
export function Eyebrow({ children, ...props }) {
	return (
		<Text
			fontFamily="var(--font-mono)"
			fontSize="12px"
			fontWeight="700"
			letterSpacing=".08em"
			textTransform="uppercase"
			color="brand.solid"
			{...props}>
			{"// "}
			{children}
		</Text>
	);
}
