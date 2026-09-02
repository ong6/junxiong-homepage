import { Button } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";

const PrintButton = (props) => (
	<Button
		as="a"
		href="/resume/Ong-Jun-Xiong-Resume.pdf"
		download
		leftIcon={<FiDownload />}
		colorScheme="mint"
		size="sm"
		{...props}>
		Download PDF
	</Button>
);

export default PrintButton;
