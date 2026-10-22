import {
	Box,
	Heading,
	Link,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Text,
	VisuallyHidden,
} from "@chakra-ui/react";
import NextLink from "next/link";
import OutArrow from "./OutArrow";
import { AI_TOOLING } from "../lib/aiTooling";

export default function AiToolFamily({ current }) {
	const headingId = `${current.replace(/^\//, "")}-family-heading`;
	return (
		<Box as="section" aria-labelledby={headingId} mt={{ base: 12, md: 16 }}>
			<Text
				color="brand.solid"
				fontFamily="var(--font-mono)"
				fontSize="12px"
				fontWeight="700"
				letterSpacing=".1em"
				textTransform="uppercase">
				{"// AI TOOLING"}
			</Text>
			<Heading id={headingId} as="h2" mt={2} fontSize={{ base: "22px", md: "24px" }}>
				<Link
					as={NextLink}
					href="/ai-tooling"
					color="inherit"
					display="inline-flex"
					alignItems="center"
					minH="44px"
					textDecoration="none">
					All four layers
					<OutArrow ml={2} color="brand.solid" />
				</Link>
			</Heading>
			<SimpleGrid columns={{ base: 1, md: 2 }} mt={5} gap={3}>
				{AI_TOOLING.map((tool, index) => {
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
							<Text
								color="text.muted"
								fontFamily="var(--font-mono)"
								fontSize="12px"
								textTransform="uppercase">
								{String(index + 1).padStart(2, "0")} · {tool.layer}
							</Text>
							<Heading as="h3" mt={3} fontSize="18px" lineHeight="1.2">
								<LinkOverlay
									{...(tool.external
										? { href: tool.href, target: "_blank", rel: "noopener noreferrer" }
										: { as: NextLink, href: tool.href })}
									aria-current={active ? "page" : undefined}>
									{tool.name}
									{tool.external && <VisuallyHidden> (opens in a new tab)</VisuallyHidden>}
								</LinkOverlay>
							</Heading>
							<Text mt={2} color="text.muted" fontSize="15px" lineHeight="1.55">
								{tool.short}
							</Text>
						</LinkBox>
					);
				})}
			</SimpleGrid>
		</Box>
	);
}
