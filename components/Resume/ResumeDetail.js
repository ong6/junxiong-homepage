import {
	Box,
	Flex,
	ListItem,
	Spacer,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import React from "react";

export default function ResumeDetail({ detail }) {
	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				flexDir={{ sm: "column", smmd: "row" }}>
				<Text fontSize={18} fontWeight="bold">
					{detail.title}
				</Text>
				<Text fontSize={18} fontWeight="bold">
					{detail.location}
				</Text>
			</Box>
			{detail.roles.map((role, index) => (
				<Box key={index}>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						flexDir={{ sm: "column", smmd: "row" }}
						mb={{ sm: 4, smmd: 1 }}>
						<Text
							fontSize={18}
							fontWeight="semibold"
							fontStyle="italic"
							textAlign={{ sm: "center", smmd: "left" }}>
							{role.subtitle}
						</Text>
						<Text fontSize={18} fontWeight="semibold">
							{role.date}
						</Text>
					</Flex>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium" mb={2}>
						{role.description.map((description, index) => (
							<ListItem key={index}>{description}</ListItem>
						))}
					</UnorderedList>
				</Box>
			))}
			<Spacer pb={2} />
			{detail.tech}
		</>
	);
}
