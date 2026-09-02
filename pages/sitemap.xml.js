import { workSlugs } from "../lib/works";

const SITE = "https://junxiong.dev";

// Top-level routes, in priority order. Work detail pages are appended from
// lib/works.js so the sitemap can never drift from the actual routes.
const topRoutes = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/resume", changefreq: "weekly", priority: "0.9" },
	{ path: "/compoze", changefreq: "yearly", priority: "0.8" },
	{ path: "/groundplane", changefreq: "yearly", priority: "0.8" },
	{ path: "/works", changefreq: "monthly", priority: "0.7" },
	{ path: "/hobbies", changefreq: "monthly", priority: "0.5" },
];

const buildSitemap = (lastmod) => {
	const urls = [
		...topRoutes,
		...workSlugs.map((slug) => ({
			path: `/works/${slug}`,
			changefreq: "yearly",
			priority: "0.3",
		})),
	];

	const body = urls
		.map(
			({ path, changefreq, priority }) => `	<url>
		<loc>${SITE}${path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
};

export const getServerSideProps = async ({ res }) => {
	const lastmod = new Date().toISOString().slice(0, 10);

	res.setHeader("Content-Type", "application/xml; charset=utf-8");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate=604800"
	);
	res.write(buildSitemap(lastmod));
	res.end();

	return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
const Sitemap = () => null;

export default Sitemap;
