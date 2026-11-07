import { FiDownload } from "react-icons/fi";
import FilledButton from "../FilledButton";

const PrintButton = (props) => (
	<FilledButton href="/resume/Ong-Jun-Xiong-Resume.pdf" download leftIcon={<FiDownload />} {...props}>
		Download PDF
	</FilledButton>
);

export default PrintButton;
