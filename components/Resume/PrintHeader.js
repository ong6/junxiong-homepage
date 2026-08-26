import { Box, Heading, Text } from "@chakra-ui/react";

const PrintHeader = () => (
	<Box className="print-only" display="none" textAlign="center" mb={4}>
		<Heading as="h1" fontSize={22}>
			Ong Jun Xiong
		</Heading>
		<Text mt={1}>
			Software Engineer — junxiong.dev · junxiongong2@gmail.com ·
			github.com/ong6 · linkedin.com/in/junx6
		</Text>
	</Box>
);

export default PrintHeader;
