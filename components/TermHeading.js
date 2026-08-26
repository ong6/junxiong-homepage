import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const TermHeading = ({ children, ...props }) => (
	<Heading
		as="h3"
		fontFamily="'JetBrains Mono', monospace"
		fontSize={18}
		mt={3}
		mb={4}
		{...props}>
		<Box
			as="span"
			className="term-prefix"
			color={useColorModeValue("teal.600", "#8be9b6")}
			fontWeight={700}>
			:/${" "}
		</Box>
		{children}
	</Heading>
);

export default TermHeading;
