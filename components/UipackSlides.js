import { Box, Button, Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { renderSlide, slideLayouts } from "../lib/uipackSlides.mjs";

export default function UipackSlides() {
	const [active, setActive] = useState("opening");
	const { colorMode } = useColorMode();
	const selected = slideLayouts.find(({ id }) => id === active);
	return (
		<Box>
			<Heading as="h2" fontSize={{ base: "28px", md: "36px" }}>
				Slide creation
			</Heading>
			<Text mt={4} maxW="680px" fontSize="17px" lineHeight="1.75" color="text.muted">
				I want my decks to feel like my projects. These starter layouts share the site&apos;s type,
				colours and spacing, with room for an opening, an explanation or a system.
			</Text>
			<Flex role="group" aria-label="Slide layout" wrap="wrap" gap={2} mt={6} mb={4}>
				{slideLayouts.map(({ id, title }) => (
					<Button
						key={id}
						variant="outline"
						minH="44px"
						borderRadius="sm"
						aria-pressed={active === id}
						onClick={() => setActive(id)}
						bg={active === id ? "brand.solid" : "transparent"}
						color={active === id ? "brand.ink" : "page.text"}
						_hover={{ bg: active === id ? "brand.solid" : "surface.quiet" }}
						_focusVisible={{
							outline: "2px solid",
							outlineColor: "brand.solid",
							outlineOffset: "3px",
						}}>
						{title}
					</Button>
				))}
			</Flex>
			<Box as="figure" m={0}>
				<Box
					border="1px solid"
					borderColor="border.subtle"
					overflow="hidden"
					sx={{
						"& svg": { display: "block", width: "100%", height: "auto" },
						"& svg text": { fontFamily: "var(--font-sans)" },
						'& svg text[font-family^="IBM Plex Mono"]': { fontFamily: "var(--font-mono)" },
					}}
					dangerouslySetInnerHTML={{ __html: renderSlide(active, colorMode) }}
				/>
				<Flex
					as="figcaption"
					mt={4}
					gap={4}
					justify="space-between"
					align={{ md: "center" }}
					direction={{ base: "column", md: "row" }}>
					<Box aria-live="polite">
						<Text fontWeight="700">{selected.title}</Text>
						<Text mt={1} fontSize="16px" color="text.muted">
							{selected.description}
						</Text>
					</Box>
					<Link
						href={`/uipack-slides/${active}-${colorMode}.svg`}
						download
						display="inline-flex"
						alignItems="center"
						minH="44px"
						flexShrink={0}
						fontWeight="600">
						Download {selected.title.toLowerCase()} SVG
					</Link>
				</Flex>
			</Box>
			<Text mt={8} maxW="680px" fontSize="16px" lineHeight="1.75" color="text.muted">
				These are editable 16:9 SVG starters in light and dark themes. They use IBM Plex Sans and
				IBM Plex Mono, with system fallbacks. A reusable deck template and presentation export are
				the next pieces to build.
			</Text>
		</Box>
	);
}
