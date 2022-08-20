import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function Education() {
	return (
		<Box mb={8}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Education
			</Heading>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Text fontSize={18} fontWeight="bold">
					National University of Singapore (NUS)
				</Text>
				<Text fontSize={18} fontWeight="bold">
					Aug 2020 - Present
				</Text>
			</Box>
			<Text fontSize={18} fontWeight="semibold">
				Bachelor of Computing in Computer Science (Hons)
			</Text>
			<UnorderedList pl={8} fontSize={18} fontWeight="medium">
				<ListItem>
					Relevant course work: Object-Oriented Programming, Software
					engineering, Data structures and algorithms, Computer organization
				</ListItem>
			</UnorderedList>
		</Box>
	);
}
