import fs from "node:fs";
import path from "node:path";
import { extractDocsHeadings } from "uipack/docs";

const docsDirectory = path.join(process.cwd(), "content", "trading-docs");

function contentWithoutFrontmatter(source, file) {
	const normalized = source.replace(/\r\n/g, "\n");
	if (!normalized.startsWith("---\n")) throw new Error(`${file} is missing frontmatter`);
	const closing = normalized.indexOf("\n---\n", 4);
	if (closing === -1) throw new Error(`${file} has unterminated frontmatter`);
	return normalized.slice(closing + 5);
}

export function getTradingDocs() {
	const manifestPath = path.join(docsDirectory, "_manifest.json");
	if (!fs.existsSync(manifestPath)) {
		throw new Error("Trading docs are missing. Run npm run sync:trading-docs before building.");
	}
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

	return manifest.pages
		.map((page) => {
			const source = fs.readFileSync(path.join(docsDirectory, page.file), "utf8");
			const content = contentWithoutFrontmatter(source, page.file);
			const headings = extractDocsHeadings(content);
			return {
				...page,
				content,
				onThisPage: headings
					.filter(({ level }) => level === 2 || level === 3)
					.map(({ id, level, title }) => ({ id, level, title })),
			};
		})
		.sort((first, second) => first.order - second.order);
}

export function getTradingDocSlugs() {
	return getTradingDocs()
		.filter(({ slug }) => slug !== "index")
		.map(({ slug }) => slug);
}

export function getTradingDocRoutes() {
	return getTradingDocs().map(({ href }) => href);
}

export function getTradingDocPageProps(slug) {
	const pages = getTradingDocs();
	const titles = [...new Set(pages.map(({ section }) => section))];
	// Previous and next follow the sidebar: section by section, in page order.
	const reading = titles.flatMap((title) => pages.filter((page) => page.section === title));
	const index = reading.findIndex((page) => page.slug === slug);
	if (index === -1) return null;
	const sections = titles.map((title) => ({
		title,
		items: pages
			.filter((page) => page.section === title)
			.map(({ title: itemTitle, href }) => ({ title: itemTitle, href })),
	}));
	const adjacent = (page) => (page ? { title: page.title, href: page.href } : null);

	return {
		page: reading[index],
		sections,
		previous: adjacent(reading[index - 1]),
		next: adjacent(reading[index + 1]),
	};
}
