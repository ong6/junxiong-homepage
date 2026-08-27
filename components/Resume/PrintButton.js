import { Button } from "@chakra-ui/react";
import { IoPrint } from "react-icons/io5";

const PrintButton = () => (
	<Button
		className="print-hide"
		leftIcon={<IoPrint />}
		colorScheme="teal"
		size="sm"
		onClick={() => window.print()}>
		Save as PDF / print
	</Button>
);

export default PrintButton;
