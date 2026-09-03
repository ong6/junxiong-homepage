import { workSlugs } from "../lib/works";

const SITE = "https://junxiong.dev";

// Top-level routes, in priority order. `lastmod` is the date the page's
// content last changed, kept by hand: bump it when you edit the page. Work
// detail pages are appended from lib/works.js so the sitemap can never drift
// from the actual routes.
const topRoutes = [
	{ path: "/", lastmod: "2026-09-03", changefreq: "weekly", priority: "1.0" },
	{ path: "/resume", lastmod: "2026-09-01", changefreq: "weekly", priority: "0.9" },
	{ path: "/compoze", lastmod: "2026-09-03", changefreq: "yearly", priority: "0.8" },
	{ path: "/groundplane", lastmod: "2026-09-03", changefreq: "yearly", priority: "0.8" },
	{ path: "/jobforge", lastmod: "2026-09-03", changefreq: "yearly", priority: "0.8" },
	{ path: "/works", lastmod: "2026-09-01", changefreq: "monthly", priority: "0.7" },
	{ path: "/hobbies", lastmod: "2026-09-01", changefreq: "monthly", priority: "0.5" },
];

const WORKS_LASTMOD = "2026-08-28";

const urls = [
	...topRoutes,
	...workSlugs.map((slug) => ({
		path: `/works/${slug}`,
		lastmod: WORKS_LASTMOD,
		changefreq: "yearly",
		priority: "0.3",
	})),
];

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
