import { Button } from "@chakra-ui/react";
import { IoPrint } from "react-icons/io5";

const PrintButton = () => (
	<Button
		className="print-hide"
		leftIcon={<IoPrint />}
		colorScheme="teal"
		size="sm"
		onClick={() => window.print()}>
		Print resume
	</Button>
);

export default PrintButton;
