import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { objectScenes, objectVariants } from "uipack/objects";
import HobbyScene from "./HobbyScene";

export default function UipackObjects() {
	const router = useRouter();
	const selected = objectScenes.some((item) => item.id === router.query.object) ? router.query.object : objectScenes[0].id;
	const variant = ["0", "1", "2"].includes(router.query.look) ? Number(router.query.look) : 0;
	const choose = (object, look = variant) => router.replace({ pathname: "/uipack", query: { ...router.query, category: "web", object, look: String(look) }, hash: "objects" }, undefined, { shallow: true, scroll: false });
	const scene = objectScenes.find((item) => item.id === selected);
	return (
		<Box as="section" id="objects" scrollMarginTop="100px" aria-label="3D object collection" my={{ base: 10, md: 14 }}>
			<Heading as="h2" fontSize={{ base: "28px", md: "36px" }}>Objects in motion</Heading>
			<Text mt={4} mb={6} maxW="680px" color="text.muted">The objects from Hobbies and Contact, collected here. Each has three looks. Choose an object and a named look, or open a larger canvas. The URL keeps your selection.</Text>
			<Flex wrap="wrap" gap={2} role="group" aria-label="Choose an object">
				{objectScenes.map((item) => <Button key={item.id} minH="44px" variant={selected === item.id ? "solid" : "outline"} aria-pressed={selected === item.id} onClick={() => choose(item.id)}>{item.title}</Button>)}
			</Flex>
			<Flex mt={4} wrap="wrap" gap={2} role="group" aria-label="Choose a look">
				{objectVariants[selected].map((name, index) => <Button key={name} minH="44px" size="sm" variant={variant === index ? "solid" : "outline"} aria-pressed={variant === index} onClick={() => choose(selected, index)}>{name}</Button>)}
			</Flex>
			<Box mt={4} h={{ base: "340px", md: "480px" }}><HobbyScene key={scene.id} kind={scene.id} label={scene.title} active controls="full" variant={variant} /></Box>
			<Text mt={3} color="text.muted">{scene.description}</Text>
		</Box>
	);
}
