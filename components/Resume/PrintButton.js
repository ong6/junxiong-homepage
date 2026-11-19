import { FiDownload } from "react-icons/fi";
import FilledButton from "../FilledButton";
import styles from "./Resume.module.css";

const PrintButton = (props) => (
	<FilledButton href="/resume/Ong-Jun-Xiong-Resume.pdf" download className={styles.download} {...props}>
		<span className={styles.downloadIcon}>
			<FiDownload aria-hidden="true" focusable="false" />
		</span>
		Download PDF
	</FilledButton>
);

export default PrintButton;
