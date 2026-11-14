import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import OutArrow from "./OutArrow";
import NextLink from "next/link";
import ProjectLinks from "./ProjectLinks";
import { Eyebrow } from "./ArticleParts";

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
					data-contents-skip
					data-group
					data-reveal
					data-hover="card"
					mt={{ base: 4, md: 5 }}
					bg="surface.raised"
					border="1px solid"
					borderColor="border.subtle"
					borderRadius="6px"
					px={5}
					py={5}>
					<Eyebrow>NEXT</Eyebrow>
					<Heading as="h2" mt={3} fontSize="24px" lineHeight="heading">
						<LinkOverlay
							as={NextLink}
							href={next.href}
							prefetch={false}
							color="inherit"
							display="inline-flex"
							alignItems="center"
							minH="44px">
							{next.name}
							<OutArrow ml={2} color="brand.solid" />
						</LinkOverlay>
					</Heading>
					{next.detail && (
						<Text mt={2} color="text.muted" fontSize="16px" lineHeight="text">
							{next.detail}
						</Text>
					)}
				</LinkBox>
			)}

			<Box h={{ base: 12, md: 20 }} />
		</Box>
	);
}
