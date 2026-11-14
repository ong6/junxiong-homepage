import { Box, Button, Heading, Text, useColorMode } from "@chakra-ui/react";
import { useThemeToggle } from "../lib/themeChoice";
import { flushSync } from "react-dom";
import { withPaintTransition } from "uipack/web";

// Gallery entry for UiPack's page-level motion: the paint-drizzle theme change
// (the site's own toggle uses a halftone instead, lib/themeTransition.js) and
// the drifting gutters (visible in this page's own margins on wide screens).
export default function UipackWebMotion() {
	const { colorMode } = useColorMode();
	const toggleColorMode = useThemeToggle();
	return (
		<Box as="section" id="page-motion" scrollMarginTop="100px" aria-labelledby="page-motion-heading" my={{ base: 10, md: 14 }}>
			<Heading id="page-motion-heading" as="h2" fontSize={{ base: "22px", md: "24px" }}>
				Page motion
			</Heading>
			<Text mt={3} maxW="680px" color="text.muted">
				UiPack&apos;s paint theme change pours the new theme down the page, with new drips every time; this button runs it. On a wide screen, the dotted grid drifting in this page&apos;s side margins is the other piece.
			</Text>
			<Button mt={6} minH="44px" px={4} colorScheme="mint" onClick={() => withPaintTransition(() => flushSync(toggleColorMode))}>
				Pour the {colorMode === "light" ? "dark" : "light"} theme
			</Button>
		</Box>
	);
}
