import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import ProjectLinks from "./ProjectLinks";

// The deliberate end of a case study: the links out once more, then one
// door to the next project. Replaces the bare spacer before the footer.
//
//   links – passed to ProjectLinks (optional)
//   next  – { name, href, detail }

export default function CaseStudyFooter({ links, next }) {
	return (
		<Box mt={{ base: 12, md: 16 }}>
			{links && links.length > 0 && <ProjectLinks links={links} />}

			{next && (
				<LinkBox
					as="section"
					aria-label="Next project"
					mt={{ base: 4, md: 5 }}
					bg="surface.raised"
					border="1px solid"
					borderColor="border.subtle"
					borderRadius="6px"
					px={5}
					py={5}
					transition="transform 160ms ease, border-color 160ms ease"
					_hover={{ borderColor: "border.strong", transform: "translateY(-2px)", "& [data-arrow]": { transform: "translateX(4px)" } }}
					sx={{
						"@media (prefers-reduced-motion: reduce)": {
							transition: "none",
							"& [data-arrow]": { transition: "none" },
							"&:hover": { transform: "none" },
							"&:hover [data-arrow]": { transform: "none" },
						},
					}}>
					<Text
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".08em"
						textTransform="uppercase"
						color="brand.solid">
						{"// NEXT"}
					</Text>
					<Heading as="h2" mt={3} fontSize="24px" lineHeight="1.1">
						<LinkOverlay
							as={NextLink}
							href={next.href}
							prefetch={false}
							color="inherit"
							display="inline-flex"
							alignItems="center"
							minH="44px">
							{next.name}
							<Box
								as="span"
								data-arrow
								aria-hidden="true"
								ml={2}
								color="brand.solid"
								display="inline-block"
								transition="transform 160ms ease">
								→
							</Box>
						</LinkOverlay>
					</Heading>
					{next.detail && (
						<Text mt={2} color="text.muted" fontSize="16px" lineHeight="1.6">
							{next.detail}
						</Text>
					)}
				</LinkBox>
			)}

			<Box h={{ base: 12, md: 20 }} />
		</Box>
	);
}
