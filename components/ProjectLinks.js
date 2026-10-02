import { Box, Flex, Link, Text, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
import { useId } from "react";
import OutArrow from "./OutArrow";

// Links out of a page (source, related project, notes) as one framed block
// instead of a highlighted word inside a sentence. Same row grammar as the
// "Around the site" rows on the homepage: name, detail, arrow.
//
//   links – [{ name, detail, href, external }]

function LinkRow({ name, detail, href, external, minH = "56px", py = 3 }) {
	return (
		<Link
			as={external ? undefined : NextLink}
			href={href}
			prefetch={external ? undefined : false}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			display="block"
			minH={minH}
			py={py}
			borderBottom="1px solid"
			borderColor="border.subtle"
			_last={{ borderBottom: "none" }}
			color="page.text"
			textDecoration="none"
			_hover={{ textDecoration: "none", "& [data-name]": { color: "brand.solid" } }}>
			<Flex align="center" justify="space-between" gap={3}>
				<Text as="span" data-name fontWeight="700" transition="color 160ms ease">
					{name}
				</Text>
				<OutArrow />
			</Flex>
			{external && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
			{detail && (
				<Text as="span" display="block" mt={1} color="text.muted" fontSize="14px" lineHeight="1.5">
					{detail}
				</Text>
			)}
		</Link>
	);
}

export default function ProjectLinks({ heading = "Links out", links, compact = false, ...props }) {
	const id = useId();
	if (!links || links.length === 0) return null;

	return (
		<Box
			as="aside"
			data-reveal
			aria-labelledby={id}
			bg="surface.raised"
			border="1px solid"
			borderColor="border.subtle"
			borderRadius="6px"
			px={{ base: 6, md: 8 }}
			pt={6}
			pb={3}
			{...props}>
			<Text
				id={id}
				fontFamily="var(--font-mono)"
				fontSize="12px"
				fontWeight="700"
				letterSpacing=".08em"
				textTransform="uppercase"
				color="brand.solid">
				{heading}
			</Text>
			<Box mt={3} borderTop="1px solid" borderColor="border.subtle">
				{links.map((link) => (
					<LinkRow key={link.href} {...link} minH={compact ? "48px" : "56px"} py={compact ? 2 : 3} />
				))}
			</Box>
		</Box>
	);
}
