import { Box, Button, Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { SlideStarter } from "uipack/presentations";
import { slideLayouts } from "../lib/uipackSlides.mjs";

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
				Each starter includes a slide, notes on what to say, a delivery cue and a suggested transition to the next slide.
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
			<Box>
				<SlideStarter slide={selected} theme={colorMode} />
				<Flex mt={4} justify="flex-end">
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
				The slide and the words stay together while you work, but only the 16:9 SVG is downloaded.
				A reusable deck template and presentation export are the next pieces to build.
			</Text>
		</Box>
	);
}
