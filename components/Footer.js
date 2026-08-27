import { Box } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Box align="center" opacity={0.7} fontSize="sm" pt={8}>
			&copy; {new Date().getFullYear()} Ong Jun Xiong
		</Box>
	);
};

export default Footer;
