import NextLink from "next/link";
import { useRouter } from "next/router";
import { formatDate, modifiedFor } from "../lib/pageDates";

// The shared parts of every article page (STYLE.md, Layout: Article): the back
// link above the h1, prose paragraphs, section heads and inline code. One copy
// here so the pages cannot drift apart. Their looks are global classes in
// styles/parts.css, so a caller's CSS-module class (passed as className)
// always overrides them.

const cx = (...names) => names.filter(Boolean).join(" ");

// A 44px target (the touch floor) whose negative margin keeps the old 20px
// line in the layout.
export function BackLink({ href, children }) {
	return (
		<NextLink href={href} className="ui-link article-back">
			← {children}
		</NextLink>
	);
}

export const P = ({ className, ...props }) => <p className={cx("article-p", className)} {...props} />;

export const H2 = ({ className, ...props }) => <h2 className={cx("ui-heading article-h2", className)} {...props} />;

export const Code = ({ className, ...props }) => <code className={cx("article-code", className)} {...props} />;

// The h1 scale, one size per page type (STYLE.md, Type), as class names (the
// sizes are in styles/parts.css). Landing pages (home, Contact, Hobbies) share
// the display size; every article, archive and docs page uses the article size.
export const LANDING_TITLE = "title-landing";
export const ARTICLE_TITLE = "title-article";

// The mono meta line under an article's h1 (`2026 · open source · python`),
// closed by the date the page last changed, from lib/pageDates.js (the same
// date as the sitemap's lastmod and the JSON-LD dateModified). The date sits
// in muted ink and never wraps inside itself.
export function MetaLine({ children, className }) {
	const router = useRouter();
	const date = modifiedFor(router?.asPath || "/");
	return (
		<p className={cx("article-meta", className)}>
			{children}
			{date && (
				<>
					<span className="article-meta-dot">{" · "}</span>
					{/* Its own line on phones, so the line never breaks inside the meta. */}
					<span className="article-meta-date">
						Updated <time dateTime={date}>{formatDate(date)}</time>
					</span>
				</>
			)}
		</p>
	);
}

// The site's one mono label: `// LABEL` in the accent (STYLE.md, Ornaments).
// Pass the words without the slashes.
export function Eyebrow({ children, className, ...props }) {
	return (
		<p className={cx("eyebrow", className)} {...props}>
			{"// "}
			{children}
		</p>
	);
}
