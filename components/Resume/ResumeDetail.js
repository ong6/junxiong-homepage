import {
	Box,
	Flex,
	ListItem,
	Text,
	UnorderedList,
	useColorModeValue,
} from "@chakra-ui/react";

export default function ResumeDetail({ detail, compact = false }) {
	const borderColor = useColorModeValue("rgba(65,54,45,0.2)", "whiteAlpha.200");
	const muted = useColorModeValue("gray.600", "whiteAlpha.700");

	return (
		<Box
			as="section"
			py={compact ? 4 : 5}
			borderTopWidth="1px"
			borderColor={borderColor}>
			<Flex
				direction={{ base: "column", smmd: "row" }}
				justify="space-between"
				align={{ base: "flex-start", smmd: "baseline" }}
				gap={1}>
				<Text as="h3" fontSize={compact ? "17px" : "20px"} fontWeight="800">
					{detail.title}
				</Text>
				<Text
					fontFamily="var(--font-mono)"
					fontSize="11px"
					fontWeight="700"
					letterSpacing="0.06em"
					textTransform="uppercase"
					color={muted}>
					{detail.location}
				</Text>
			</Flex>

			{detail.roles.map((role) => (
				<Box key={`${detail.title}-${role.subtitle}`} mt={3}>
					<Flex
						direction={{ base: "column", smmd: "row" }}
						justify="space-between"
						align={{ base: "flex-start", smmd: "baseline" }}
						gap={1}>
						<Text as="h4" fontSize="15px" fontWeight="700">
							{role.subtitle}
						</Text>
						<Text
							fontFamily="var(--font-mono)"
							fontSize="11px"
							whiteSpace="nowrap"
							color={muted}>
							{role.date}
						</Text>
					</Flex>

					<UnorderedList mt={2} ml={5} spacing={1.5}>
						{role.description.map((description) => (
							<ListItem
								key={description}
								fontSize="15px"
								lineHeight="1.65"
								opacity={0.92}>
								{description}
							</ListItem>
						))}
					</UnorderedList>
				</Box>
			))}
		</Box>
	);
}
