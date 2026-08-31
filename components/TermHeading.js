import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const TermHeading = ({ children, kicker = "Selected signal", ...props }) => (
	<Box {...props}>
		<Flex align="center" gap={3} mb={2}>
			<Box w="7px" h="7px" bg="mint.500" transform="rotate(45deg)" aria-hidden="true" />
			<Text
				fontFamily="var(--font-mono)"
				fontSize="10px"
				fontWeight="700"
				letterSpacing=".11em"
				textTransform="uppercase"
				color="text.muted">
				{kicker}
			</Text>
		</Flex>
		<Heading as="h2" fontSize={{ base: "32px", md: "44px" }} lineHeight="1.08">
			{children}
		</Heading>
	</Box>
);

export default TermHeading;
