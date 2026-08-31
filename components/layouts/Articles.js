import { motion, useReducedMotion } from "framer-motion";
import Head from "next/head";
import { GridItemStyle } from "../GridItem";

const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: -0, y: 20 },
};

// `title` gets the site suffix appended; `description` overrides the site-wide
// one from the Main layout for this route only. Both are optional — the
// homepage renders without either and keeps the defaults.
const Layout = ({ children, title, description }) => {
	const pageTitle = title ? `${title} — Ong Jun Xiong` : null;
	const reduceMotion = useReducedMotion();

	return (
		<motion.article
			initial={false}
			animate="enter"
			exit={reduceMotion ? undefined : "exit"}
			variants={variants}
			transition={
				reduceMotion
					? { duration: 0 }
					: { duration: 0.25, type: "easeInOut" }
			}
			style={{ position: "relative" }}>
			<>
				{(pageTitle || description) && (
					<Head>
						{pageTitle && <title>{pageTitle}</title>}
						{pageTitle && (
							<meta name="twitter:title" content={pageTitle} />
						)}
						{pageTitle && <meta key="og:title" property="og:title" content={pageTitle} />}
						{description && (
							<meta name="description" content={description} />
						)}
						{description && (
							<meta
								key="og:description"
								property="og:description"
								content={description}
							/>
						)}
						{description && (
							<meta name="twitter:description" content={description} />
						)}
					</Head>
				)}
				{children}

				<GridItemStyle />
			</>
		</motion.article>
	);
};

export default Layout;
