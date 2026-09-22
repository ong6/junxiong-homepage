import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ObjectGallery, objectScenes, parseObjectVariant } from "uipack/objects";
import { hobbyScenePalettes } from "../lib/theme";

export default function UipackObjects() {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const selected = objectScenes.some((item) => item.id === router.query.object) ? router.query.object : objectScenes[0].id;
	const variant = parseObjectVariant(router.query.look);
	const edition = ["0", "1", "2"].includes(router.query.edition) ? Number(router.query.edition) : 0;
	const choose = (object, look, finish) => router.replace({ pathname: "/uipack", query: { ...router.query, category: "web", object, look: String(look), edition: String(finish) }, hash: "objects" }, undefined, { shallow: true, scroll: false });
	return (
		<Box as="section" id="objects" scrollMarginTop="100px" aria-label="3D object collection" my={{ base: 10, md: 14 }}>
			<Heading as="h2" fontSize={{ base: "28px", md: "36px" }}>Objects in motion</Heading>
			<Text mt={3} mb={6} maxW="680px" color="text.muted">Pick an object, explore six art directions, and open the canvas for a closer look. The original editions live inside Studio.</Text>
			<ObjectGallery kind={selected} variant={variant} edition={edition} theme={colorMode} palette={hobbyScenePalettes[colorMode]} onChange={choose} />
		</Box>
	);
}
