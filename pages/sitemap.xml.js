import { workSlugs } from "../lib/works";
import { getTradingDocRoutes } from "../lib/tradingDocs";
import { VERSIONS } from "../lib/tradingVersions";
import { modifiedFor } from "../lib/pageDates";

const SITE = "https://junxiong.dev";

// Top-level routes, in priority order. `lastmod` comes from lib/pageDates.js
// (bump the date there when you edit a page). Work detail pages are appended
// from lib/works.js so the sitemap can never drift from the actual routes.
const topRoutes = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/contact", changefreq: "monthly", priority: "0.7" },
	{ path: "/resume", changefreq: "weekly", priority: "0.9" },
	{ path: "/ai-tooling", changefreq: "monthly", priority: "0.8" },
	{ path: "/compoze", changefreq: "yearly", priority: "0.8" },
	{ path: "/groundplane", changefreq: "yearly", priority: "0.8" },
	{ path: "/trading-engine", changefreq: "yearly", priority: "0.8" },
	...getTradingDocRoutes().map((path) => ({
		path,
		changefreq: "monthly",
		priority: path === "/trading-engine/docs" ? "0.7" : "0.6",
	})),
	{ path: "/trading-engine/v2", changefreq: "weekly", priority: "0.6" },
	...VERSIONS.map(({ href }) => ({
		path: href,
		changefreq: "yearly",
		priority: "0.4",
	})),
	{ path: "/skills", changefreq: "yearly", priority: "0.8" },
	{ path: "/skillsmith", changefreq: "yearly", priority: "0.8" },
	{ path: "/workbase", changefreq: "yearly", priority: "0.8" },
	{ path: "/uipack", changefreq: "monthly", priority: "0.6" },
	{ path: "/works", changefreq: "monthly", priority: "0.7" },
	{ path: "/hobbies", changefreq: "monthly", priority: "0.5" },
];

const urls = [
	...topRoutes,
	...workSlugs.map((slug) => ({
		path: `/works/${slug}`,
		changefreq: "yearly",
		priority: "0.3",
	})),
].map((url) => ({ ...url, lastmod: modifiedFor(url.path) }));

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ path, lastmod, changefreq, priority }) => `	<url>
		<loc>${SITE}${path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`,
	)
	.join("\n")}
</urlset>`;

// The pages router cannot emit a non-HTML body from getStaticProps, so this
// stays a (cached) server route. Everything it writes is computed at module
// load; the function only sets headers and streams the string.
export const getServerSideProps = async ({ res }) => {
	res.setHeader("Content-Type", "application/xml; charset=utf-8");
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
	res.write(SITEMAP);
	res.end();

	return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
const Sitemap = () => null;

export default Sitemap;
