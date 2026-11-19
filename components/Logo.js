import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = () => {
	// Both marks are in the HTML and CSS shows the theme's, so a dark visit
	// never paints the light one first.
	return (
		<Link href="/" aria-label="Ong Jun Xiong — home">
			<span className={styles.logo}>
				<p className={styles.name}>Jun Xiong</p>
				<Image className="theme-light-only" src="/images/Brackets.png" width={20} height={20} alt="" style={{ marginLeft: "8px" }} />
				<Image className="theme-dark-only" src="/images/Brackets-dark.png" width={20} height={20} alt="" style={{ marginLeft: "8px" }} />
			</span>
		</Link>
	);
};

export default Logo;
