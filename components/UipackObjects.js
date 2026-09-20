import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { objectScenes } from "uipack/objects";
import HobbyScene from "./HobbyScene";

export default function UipackObjects() {
	const [selected, setSelected] = useState(objectScenes[0].id);
	const scene = objectScenes.find((item) => item.id === selected);
	return (
		<Box as="section" aria-label="3D object collection" my={{ base: 10, md: 14 }}>
			<Heading as="h2" fontSize={{ base: "28px", md: "36px" }}>Objects in motion</Heading>
			<Text mt={4} mb={6} maxW="680px" color="text.muted">The objects from Hobbies and Contact, collected here. Each has three looks. Choose an object, try another look or open a larger canvas.</Text>
			<Flex wrap="wrap" gap={2} role="group" aria-label="Choose an object">
				{objectScenes.map((item) => <Button key={item.id} minH="44px" variant={selected === item.id ? "solid" : "outline"} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.title}</Button>)}
			</Flex>
			<Box mt={4} h={{ base: "340px", md: "480px" }}><HobbyScene key={scene.id} kind={scene.id} label={scene.title} active /></Box>
			<Text mt={3} color="text.muted">{scene.description}</Text>
		</Box>
	);
}
