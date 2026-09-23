import { Box, Heading, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const tools = [
	{
		name: "Skillpack",
		href: "/skillpack",
		stage: "01 · instruct",
		detail: "The reusable instructions my agents load.",
	},
	{
		name: "Skillsmith",
		href: "/skillsmith",
		stage: "02 · make + prove",
		detail: "Drafts a skill from the repo, then a blind test decides whether it stays.",
	},
	{
		name: "Groundplane",
		href: "/groundplane",
		stage: "03 · check",
		detail: "Checks agent output against recorded tool results.",
	},
];

export default function AiToolFamily({ current }) {
	const headingId = `${current.replace(/^\//, "")}-family-heading`;
	return (
		<Box as="section" aria-labelledby={headingId} mt={{ base: 12, md: 16 }}>
			<Text
				color="brand.solid"
				fontFamily="var(--font-mono)"
				fontSize="11px"
				fontWeight="700"
				letterSpacing=".1em"
				textTransform="uppercase">
				{"// AI TOOLCHAIN"}
			</Text>
			<Heading id={headingId} as="h2" mt={2} fontSize={{ base: "22px", md: "24px" }}>
				How these tools fit together
			</Heading>
			<SimpleGrid columns={{ base: 1, md: 3 }} mt={5} gap={3}>
				{tools.map((tool) => {
					const active = tool.href === current;
					return (
						<LinkBox
							key={tool.href}
							as="article"
							p={4}
							minH="152px"
							border="1px solid"
							borderColor={active ? "brand.solid" : "border.subtle"}
							borderRadius="4px"
							bg={active ? "accent.soft" : "surface.raised"}>
							<Text color="text.muted" fontFamily="var(--font-mono)" fontSize="11px" textTransform="uppercase">
								{tool.stage}
							</Text>
							<Heading as="h3" mt={3} fontSize="18px" lineHeight="1.2">
								<LinkOverlay as={NextLink} href={tool.href} aria-current={active ? "page" : undefined}>
									{tool.name}
								</LinkOverlay>
							</Heading>
							<Text mt={2} color="text.muted" fontSize="15px" lineHeight="1.55">
								{tool.detail}
							</Text>
						</LinkBox>
					);
				})}
			</SimpleGrid>
		</Box>
	);
}
