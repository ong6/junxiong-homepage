import { execFileSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	renameSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SECTIONS = ["Start here", "How it works", "Research", "Operations"];
const REQUIRED_FIELDS = ["title", "summary", "order", "section"];
const FORBIDDEN = ["trae", "traecli", "bytedance", "devbox", "lark", "10.199.", "jun.ong"];
const ROUTE_ROOT = "/trading-engine/docs";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDirectory, "..");
const defaultCheckout = path.join(homedir(), "engine-lanes", "docs");
const destination = path.join(siteRoot, "content", "trading-docs");

function fail(message) {
	throw new Error(`Trading docs sync failed: ${message}`);
}

function expandHome(value) {
	if (value === "~") return homedir();
	if (value.startsWith("~/")) return path.join(homedir(), value.slice(2));
	return path.resolve(value);
}

function parseArguments(args) {
	let ref = null;
	let repository = null;
	const positionals = [];

	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index];
		if (argument === "--ref" || argument === "--repo") {
			const value = args[index + 1];
			if (!value) fail(`${argument} requires a value`);
			if (argument === "--ref") ref = value;
			else repository = expandHome(value);
			index += 1;
		} else if (argument.startsWith("--")) {
			fail(`unknown option ${argument}`);
		} else {
			positionals.push(argument);
		}
	}

	if (positionals.length > 1) fail("expected at most one checkout path or git ref");
	if (ref) {
		if (positionals[0] && repository) {
			fail("pass the repository with either --repo or a positional path, not both");
		}
		return {
			mode: "git",
			ref,
			repository: positionals[0] ? expandHome(positionals[0]) : repository || defaultCheckout,
		};
	}

	if (!positionals[0]) return { mode: "local", repository: repository || defaultCheckout };
	const candidate = expandHome(positionals[0]);
	if (existsSync(candidate)) return { mode: "local", repository: candidate };
	return { mode: "git", ref: positionals[0], repository: repository || defaultCheckout };
}

function git(repository, args) {
	try {
		return execFileSync("git", ["-C", repository, ...args], {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "pipe"],
		});
	} catch (error) {
		fail(error.stderr?.trim() || error.message);
	}
}

function sourceReader(options) {
	const sourceDirectory = path.join(options.repository, "docs", "site");
	if (options.mode === "local") {
		if (!existsSync(sourceDirectory)) fail(`docs/site was not found in ${options.repository}`);
		return {
			description: sourceDirectory,
			files: () =>
				readdirSync(sourceDirectory, { withFileTypes: true })
					.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
					.map((entry) => entry.name)
					.sort(),
			read: (file) => readFileSync(path.join(sourceDirectory, file), "utf8"),
		};
	}

	git(options.repository, ["rev-parse", "--verify", `${options.ref}^{commit}`]);
	return {
		description: `${options.repository} at ${options.ref}`,
		files: () =>
			git(options.repository, ["ls-tree", "-r", "--name-only", options.ref, "docs/site"])
				.split("\n")
				.filter((file) => /^docs\/site\/[^/]+\.md$/.test(file))
				.map((file) => path.posix.basename(file))
				.sort(),
		read: (file) => git(options.repository, ["show", `${options.ref}:docs/site/${file}`]),
	};
}

function assertPublic(file, source) {
	const lower = source.toLocaleLowerCase("en-US");
	const forbidden = FORBIDDEN.find((identifier) => lower.includes(identifier));
	if (forbidden) fail(`${file} contains forbidden identifier "${forbidden}"`);
}

function listedPages(readme) {
	const pages = [];
	const link = /\[[^\]]+\]\((?:\.\/)?([^\s)#?]+\.md)(?:[?#][^\s)]*)?\)/g;
	let match;
	while ((match = link.exec(readme)) !== null) {
		const file = path.posix.basename(match[1]);
		if (file !== "README.md" && !pages.includes(file)) pages.push(file);
	}
	if (!pages.length) fail("docs/site/README.md does not list any pages");
	return pages;
}

function parseScalar(value, file, field) {
	const trimmed = value.trim();
	if (!trimmed) fail(`${file} has an empty ${field} value`);
	if (trimmed.startsWith('"')) {
		try {
			return JSON.parse(trimmed);
		} catch {
			fail(`${file} has invalid double-quoted YAML for ${field}`);
		}
	}
	if (trimmed.startsWith("'")) {
		if (!trimmed.endsWith("'")) fail(`${file} has invalid single-quoted YAML for ${field}`);
		return trimmed.slice(1, -1).replace(/''/g, "'");
	}
	return trimmed;
}

function parseFrontmatter(file, source, { allowZeroOrder = false } = {}) {
	const normalized = source.replace(/\r\n/g, "\n");
	if (!normalized.startsWith("---\n")) fail(`${file} must start with YAML frontmatter`);
	const closing = normalized.indexOf("\n---\n", 4);
	if (closing === -1) fail(`${file} has unterminated YAML frontmatter`);
	const data = {};
	for (const line of normalized.slice(4, closing).split("\n")) {
		if (!line.trim() || line.trimStart().startsWith("#")) continue;
		const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
		if (!match) fail(`${file} has unsupported YAML line: ${line}`);
		if (Object.hasOwn(data, match[1])) fail(`${file} repeats frontmatter field ${match[1]}`);
		data[match[1]] = parseScalar(match[2], file, match[1]);
	}

	for (const field of REQUIRED_FIELDS) {
		if (!Object.hasOwn(data, field)) fail(`${file} is missing frontmatter field ${field}`);
	}
	if (typeof data.title !== "string" || !data.title.trim()) fail(`${file} title must be a non-empty string`);
	if (typeof data.summary !== "string" || !data.summary.trim()) fail(`${file} summary must be a non-empty string`);
	data.order = Number(data.order);
	if (!Number.isInteger(data.order) || data.order < (allowZeroOrder ? 0 : 1)) {
		fail(`${file} order must be ${allowZeroOrder ? "a non-negative" : "a positive"} integer`);
	}
	if (!SECTIONS.includes(data.section)) fail(`${file} section must be one of: ${SECTIONS.join(", ")}`);

	return { data, body: normalized.slice(closing + 5), frontmatterEnd: closing + 5 };
}

function routeFor(file) {
	const slug = path.posix.basename(file, ".md");
	return slug === "index" ? ROUTE_ROOT : `${ROUTE_ROOT}/${slug}`;
}

function rewriteRelativeLinks(file, body, knownFiles) {
	const rewriteDestination = (raw) => {
		const destination = /^(<[^>]+>|\S+)([\s\S]*)$/.exec(raw.trim());
		if (!destination) return raw;
		const wrapped = destination[1].startsWith("<");
		const value = wrapped ? destination[1].slice(1, -1) : destination[1];
		if (value.startsWith("/") || value.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(value)) return raw;
		const markdown = /^([^?#]+\.md)([?#].*)?$/.exec(value);
		if (!markdown) return raw;
		const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), markdown[1]));
		if (!knownFiles.has(target)) fail(`${file} links to missing page ${markdown[1]}`);
		const rewritten = `${routeFor(target)}${markdown[2] || ""}`;
		return `${wrapped ? `<${rewritten}>` : rewritten}${destination[2]}`;
	};

	const inline = body.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (full, opening, target, closing) =>
		opening.startsWith("!") ? full : `${opening}${rewriteDestination(target)}${closing}`,
	);
	return inline.replace(
		/^(\s{0,3}\[[^\]]+\]:\s*)(\S+(?:\s+.+)?)$/gm,
		(_full, opening, target) => `${opening}${rewriteDestination(target)}`,
	);
}

function writeOutput(pages) {
	const staging = path.join(path.dirname(destination), `.trading-docs-sync-${process.pid}`);
	rmSync(staging, { recursive: true, force: true });
	mkdirSync(staging, { recursive: true });
	for (const page of pages) writeFileSync(path.join(staging, page.file), page.source, "utf8");
	writeFileSync(
		path.join(staging, "_manifest.json"),
		`${JSON.stringify({ sections: SECTIONS, pages: pages.map(({ source: _source, ...page }) => page) }, null, 2)}\n`,
		"utf8",
	);
	rmSync(destination, { recursive: true, force: true });
	renameSync(staging, destination);
}

function main() {
	const options = parseArguments(process.argv.slice(2));
	const source = sourceReader(options);
	const available = source.files();
	if (!available.includes("README.md")) fail("docs/site/README.md is required");
	const readme = source.read("README.md");
	assertPublic("README.md", readme);
	parseFrontmatter("README.md", readme, { allowZeroOrder: true });
	const listed = listedPages(readme);
	const contentFiles = available.filter((file) => file !== "README.md");
	const unlisted = contentFiles.filter((file) => !listed.includes(file));
	const missing = listed.filter((file) => !contentFiles.includes(file));
	if (unlisted.length || missing.length) {
		fail([
			unlisted.length ? `unlisted pages: ${unlisted.join(", ")}` : null,
			missing.length ? `missing pages: ${missing.join(", ")}` : null,
		].filter(Boolean).join("; "));
	}
	if (!listed.includes("index.md")) fail("README.md must list index.md");

	const knownFiles = new Set(listed);
	const pages = listed.map((file) => {
		const original = source.read(file).replace(/\r\n/g, "\n");
		assertPublic(file, original);
		const parsed = parseFrontmatter(file, original);
		const slug = path.posix.basename(file, ".md");
		return {
			file,
			slug,
			href: routeFor(file),
			title: parsed.data.title,
			summary: parsed.data.summary,
			order: parsed.data.order,
			section: parsed.data.section,
			source: `${original.slice(0, parsed.frontmatterEnd)}${rewriteRelativeLinks(file, parsed.body, knownFiles)}`.replace(/\n*$/, "\n"),
		};
	});
	const orders = pages.map((page) => page.order);
	const repeated = orders.filter((order, index) => orders.indexOf(order) !== index);
	if (repeated.length) fail(`page order values must be unique; repeated: ${[...new Set(repeated)].join(", ")}`);

	writeOutput(pages);
	console.log(`Synced ${pages.length} trading docs pages from ${source.description}.`);
}

try {
	main();
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
}
