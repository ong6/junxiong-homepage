import NextLink from "next/link";
import CaseStudyFooter from "../components/CaseStudyFooter";
import OutArrow from "../components/OutArrow";
import Layout from "../components/layouts/Articles";
import { PAGE_META } from "../lib/pageMeta";
import { AI_TOOLING } from "../lib/aiTooling";
import { BackLink, MetaLine, P, ARTICLE_TITLE } from "../components/ArticleParts";
import caseStudy from "../styles/CaseStudy.module.css";
import styles from "../styles/AiTooling.module.css";

// One framed column, a row per layer, so the page reads as a stack. The layer
// sits above the name rather than in a side column, so every row shares one left edge.
function Layer({ tool, index }) {
	const overlayProps = tool.external
		? { href: tool.href, target: "_blank", rel: "noopener noreferrer" }
		: { href: tool.href, prefetch: false };
	const Overlay = tool.external ? "a" : NextLink;
	return (
		<article
			data-group
			data-reveal
			data-hover="row"
			style={{ "--i": index }}
			className={`ui-linkbox ${styles.layer} ${index ? styles.layerRuled : ""}`}>
			<p className={styles.layerLabel}>
				{String(index + 1).padStart(2, "0")} · {tool.layer}
				<span className={styles.layerWhen}>
					{" · "}
					{tool.when}
				</span>
			</p>
			<h2 data-contents-title={tool.name} className={`ui-heading ${styles.layerName}`}>
				<Overlay {...overlayProps} className={`ui-linkoverlay ${styles.overlay}`}>
					{tool.name}
					{tool.external && <span className="visually-hidden"> (opens in a new tab)</span>}
					<OutArrow className={styles.overlayArrow} />
				</Overlay>
			</h2>
			<p className={styles.layerDetail}>{tool.detail}</p>
			<p className={styles.layerMeta}>{tool.meta}</p>
		</article>
	);
}

export default function AiTooling() {
	return (
		<Layout
			contents
			{...PAGE_META["/ai-tooling"]}>
			<div className={`ui-container chakra-container ${caseStudy.column}`}>
				<div className={caseStudy.top}>
					<BackLink href="/#work">Selected work</BackLink>

					<h1 className={`ui-heading ${ARTICLE_TITLE} ${caseStudy.title}`}>AI tooling</h1>

					<MetaLine>2026 · open source · {AI_TOOLING.length} tools</MetaLine>

					<p className={caseStudy.lede}>
						I use coding agents every day and build them at work, and these are the tools I ended up
						writing around them. They&apos;re ordered by where they sit in an agent&apos;s run, from
						what it reads before it starts to checking what it says at the end.
					</p>
				</div>

				<section
					aria-label="Tools by layer"
					// Room for the last layer's hover rule on the frame's bottom border
					// (styles/globals.css, Card hover); Chrome snaps the clip 1px in.
					className={styles.stack}>
					{AI_TOOLING.map((tool, index) => (
						<Layer key={tool.href} tool={tool} index={index} />
					))}
				</section>

				{/* Placeholder (2026-11-15): the owner asked for a looking-back line to
				    be written for now. Every fact in it is from the four tool pages;
				    replace it with his own words when he sends them. */}
				<P className={styles.lookingBack}>
					Most of these came from taking something away. Workbase is what was left of a 27-skill
					setup at work once I kept only the parts I used. The skills repo replaced eight copies
					that had drifted apart. Groundplane moves a ranking out of the model and into code, and
					Skillsmith is how I decide whether a skill stays.
				</P>

				<CaseStudyFooter
					next={{
						name: "Compoze",
						href: "/compoze",
						detail: "Document-grounded assistants, a company I ran alone and sold to a client",
					}}
				/>
			</div>
		</Layout>
	);
}
