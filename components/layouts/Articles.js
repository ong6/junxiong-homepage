import Head from "next/head";
import { useRouter } from "next/router";
import { BUILD_DATE, SITE_URL, canonicalFor, ogImageFor } from "./Main";
import { useRef } from "react";
import SideBackdrop from "../SideBackdrop";
import ArticleContents, { SectionMenu } from "../ArticleContents";
import { modifiedFor } from "../../lib/pageDates";

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
//   headline     – the page's h1 text for the JSON-LD headline, when it is
//                  not the same as `title` (defaults to `title`)
//   contents     – a long article: the page's h2s become the contents list in
//                  the wide-screen side rail and the "On this page" control
//                  below 1200px (each needs three sections or more)
//   facts        – [label, value] rows for the side rail, picked from the
//                  page's own fact table or meta line (never new facts)
//   links        – the page's links out (with its paired notes, see
//                  withNotes in lib/notes.js) for the side rail; the page
//                  repeats them at its end through CaseStudyFooter
//
// The homepage renders without any of these and keeps the defaults from Main.
// Overrides work by `key`: next/head dedupes tags that share one, and this
// layout's <Head> renders after Main's, so its entries win.

const PERSON = { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Ong Jun Xiong", url: `${SITE_URL}/` };
const WEBSITE = { "@id": `${SITE_URL}/#website` };

const pageSchema = ({ canonical, name, headline, description, schema, image }) => {
	const base = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": canonical,
		url: canonical,
		name,
		description,
		isPartOf: WEBSITE,
		dateModified: modifiedFor(canonical.slice(SITE_URL.length) || "/") || BUILD_DATE,
	};

	if (!schema) return { ...base, about: PERSON, primaryImageOfPage: image };

	const { type, ...fields } = schema;
	return {
		...base,
		"@type": type,
		headline,
		image,
		author: PERSON,
		publisher: PERSON,
		mainEntityOfPage: canonical,
		...fields,
	};
};

const Layout = ({ children, title, headline, description, schema, noindex = false, animate = true, contents = false, facts, links }) => {
	const router = useRouter();
	const articleRef = useRef(null);
	const pageTitle = title ? `${title} — Ong Jun Xiong` : null;
	const canonical = canonicalFor(router?.asPath);
	const image = ogImageFor(canonical);

	return (
		<article ref={articleRef} className={animate ? "page-rise" : undefined} style={{ position: "relative" }}>
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
									pageSchema({ canonical, name: pageTitle, headline: headline || title, description, schema, image }),
								),
							}}
						/>
					)}
				</Head>
			)}
			{schema && <div className="scroll-progress" aria-hidden="true" />}
			{/* Home and Hobbies (animate={false}) carry their own motion. */}
			{animate && <SideBackdrop />}
			{contents && <SectionMenu containerRef={articleRef} />}
			{children}
			{(contents || facts || links) && <ArticleContents containerRef={articleRef} contents={contents} facts={facts} links={links} />}
		</article>
	);
};

export default Layout;
