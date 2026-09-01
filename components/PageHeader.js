import { Box, Heading, Text } from "@chakra-ui/react";

// Subpage header matching the homepage grammar: mono `//` eyebrow, big
// left-aligned title, optional muted lede.
export default function PageHeader({ eyebrow, title, children }) {
	return (
		<Box pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 10 }}>
			<Text
				fontFamily="var(--font-mono)"
				fontSize="10px"
				fontWeight="700"
				letterSpacing=".12em"
				color="mint.500">
				{eyebrow}
			</Text>
			<Heading
				as="h1"
				mt={3}
				fontSize={{ base: "34px", md: "46px" }}
				letterSpacing="-.03em">
				{title}
			</Heading>
			{children && (
				<Text mt={4} maxW="640px" fontSize="16px" lineHeight="1.75" color="text.muted">
					{children}
				</Text>
			)}
		</Box>
	);
}
