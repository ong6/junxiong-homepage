import { Box, Button, Heading, Text, useColorMode } from "@chakra-ui/react";
import { flushSync } from "react-dom";
import { withPaintTransition } from "uipack/web";

// Gallery entry for the page-level motion this site uses from UI Pack: the
// paint-drizzle theme change and the drifting gutters (visible in this page's
// own margins on wide screens).
export default function UipackWebMotion() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box as="section" id="page-motion" scrollMarginTop="100px" aria-labelledby="page-motion-heading" my={{ base: 10, md: 14 }}>
			<Heading id="page-motion-heading" as="h2" fontSize={{ base: "28px", md: "36px" }}>
				Page motion
			</Heading>
			<Text mt={3} maxW="680px" color="text.muted">
				A theme change pours down the page as paint, with new drips every time. On a wide screen, the dotted grid drifting in this page&apos;s side margins is the other piece.
			</Text>
			<Button mt={6} minH="44px" px={4} colorScheme="mint" onClick={() => withPaintTransition(() => flushSync(toggleColorMode))}>
				Pour the {colorMode === "light" ? "dark" : "light"} theme
			</Button>
		</Box>
	);
}
