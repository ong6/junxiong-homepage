import Head from "next/head";
import { useRouter } from "next/router";
import { BUILD_DATE, SITE_URL, canonicalFor, ogImageFor } from "./Main";

// Page-level metadata for every route except the homepage.
//
//   title        – gets the site suffix appended
//   description  – overrides the site-wide description for this route only
//   schema       – { type, ...fields } for the page's JSON-LD. `type` is a
//                  schema.org CreativeWork subtype (Article, TechArticle,
//                  SoftwareSourceCode); extra fields are spread onto the node.
//                  Setting it also switches og:type to `article`. Without it
//                  the page is a plain WebPage.
//   noindex      – keep the page out of search engines (404, drafts)
//
// The homepage renders without any of these and keeps the defaults from Main.
// Overrides work by `key`: next/head dedupes tags that share one, and this
// layout's <Head> renders after Main's, so its entries win.

const PERSON = { "@id": `${SITE_URL}/#person` };
const WEBSITE = { "@id": `${SITE_URL}/#website` };

const pageSchema = ({ canonical, name, description, schema, image }) => {
	const base = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": canonical,
		url: canonical,
		name,
		description,
		isPartOf: WEBSITE,
		dateModified: BUILD_DATE,
	};

	if (!schema) return { ...base, about: PERSON, primaryImageOfPage: image };

	const { type, ...fields } = schema;
	return {
		...base,
		"@type": type,
		headline: name,
		image,
		author: PERSON,
		publisher: PERSON,
		mainEntityOfPage: canonical,
		...fields,
	};
};

const Layout = ({ children, title, description, schema, noindex = false, animate = true }) => {
	const router = useRouter();
	const pageTitle = title ? `${title} — Ong Jun Xiong` : null;
	const canonical = canonicalFor(router?.asPath);
	const image = ogImageFor(canonical);

	return (
		<article className={animate ? "fade-up" : undefined} style={{ position: "relative" }}>
			{(pageTitle || description || noindex) && (
				<Head>
					{pageTitle && <title>{pageTitle}</title>}
					{pageTitle && <meta name="twitter:title" content={pageTitle} />}
					{pageTitle && <meta key="og:title" property="og:title" content={pageTitle} />}
					{description && <meta name="description" content={description} />}
					{description && (
						<meta key="og:description" property="og:description" content={description} />
					)}
					{description && <meta name="twitter:description" content={description} />}
					{schema && <meta key="og:type" property="og:type" content="article" />}
					{pageTitle && <meta key="og:image" property="og:image" content={image} />}
					{pageTitle && <meta key="twitter:image" name="twitter:image" content={image} />}
					{noindex && <meta key="robots" name="robots" content="noindex, nofollow" />}
					{pageTitle && !noindex && (
						<script
							key="ld-page"
							type="application/ld+json"
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(
									pageSchema({ canonical, name: pageTitle, description, schema, image }),
								),
							}}
						/>
					)}
				</Head>
			)}
			{children}
		</article>
	);
};

export default Layout;
