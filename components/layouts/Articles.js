import Head from "next/head";
import { GridItemStyle } from "../GridItem";

// `title` gets the site suffix appended; `description` overrides the site-wide
// one from the Main layout for this route only. Both are optional — the
// homepage renders without either and keeps the defaults.
const Layout = ({ children, title, description }) => {
	const pageTitle = title ? `${title} — Ong Jun Xiong` : null;

	return (
		<article className="fade-up" style={{ position: "relative" }}>
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
		</article>
	);
};

export default Layout;
