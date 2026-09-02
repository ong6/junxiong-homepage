import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import TermHeading from "../TermHeading";

export default function Education() {
	const borderColor = useColorModeValue("rgba(65,54,45,0.2)", "whiteAlpha.200");

	return (
		<Box>
			<TermHeading kicker="School">education</TermHeading>
			<Flex
				direction={{ base: "column", smmd: "row" }}
				justify="space-between"
				gap={2}
				pt={4}
				borderTopWidth="1px"
				borderColor={borderColor}>
				<Box>
					<Text as="h3" fontSize="17px" fontWeight="800">
						National University of Singapore
					</Text>
					<Text fontSize="15px" lineHeight="1.65" opacity={0.82} mt={1}>
						Bachelor of Computing (Honours), Computer Science. Specialised in
						AI and software engineering; NUS Overseas Colleges in Munich.
					</Text>
				</Box>
				<Text
					fontFamily="var(--font-mono)"
					fontSize="11px"
					whiteSpace="nowrap"
					opacity={0.68}>
					2020 – 2023
				</Text>
			</Flex>
		</Box>
	);
}
