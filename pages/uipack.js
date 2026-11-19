import NextLink from "next/link";
import CaseStudyFooter from "../components/CaseStudyFooter";
import HobbyScene from "../components/HobbyScene";
import LazyMount from "../components/LazyMount";
import OutArrow from "../components/OutArrow";
import UipackFigure from "../components/UipackFigure";
import UipackSlide from "../components/UipackSlide";
import Layout from "../components/layouts/Articles";
import { BackLink, MetaLine, P, H2, ARTICLE_TITLE } from "../components/ArticleParts";
import { PAGE_META } from "../lib/pageMeta";
import { withNotes } from "../lib/notes";
import caseStudy from "../styles/CaseStudy.module.css";
import styles from "../styles/Uipack.module.css";

// A short showcase: one example of each thing UiPack does, each pointing at
// its page on the docs site. Everything that changes with a release (parts,
// install, API, the full catalogue) lives there, so this page never needs a
// version bump. Old links (`?category=slides`, `?object=…`) load this page
// and the parameters are ignored; `#objects` still lands on the 3D section.
const DOCS = "https://ui.junxiong.dev";

const links = withNotes("/uipack", [
	{ name: "Docs", detail: "The current parts, install steps and API", href: DOCS, external: true },
	{ name: "Asset gallery", detail: "Every icon, motion token, background and mark, with a preview", href: `${DOCS}/gallery`, external: true },
	{ name: "Source on GitHub", detail: "ong6/uipack", href: "https://github.com/ong6/uipack", external: true },
]);

// The 3D object's frame (styles/Uipack.module.css): compact, in the prose column.

// The links under each example: 44px targets, ↗ on each.
function MoreLinks({ items }) {
	return (
		<ul className={styles.moreLinks}>
			{items.map(({ name, href, external }) => {
				const content = (
					<>
						{name}
						<OutArrow className={styles.moreArrow} newTab={external} />
					</>
				);
				return (
					<li key={href}>
						{external ? (
							<a href={href} target="_blank" rel="noopener noreferrer" data-group className={`ui-link ${styles.moreLink}`}>
								{content}
							</a>
						) : (
							<NextLink href={href} prefetch={false} data-group className={`ui-link ${styles.moreLink}`}>
								{content}
							</NextLink>
						)}
					</li>
				);
			})}
		</ul>
	);
}

export default function Uipack() {
	return (
		<Layout
			{...PAGE_META["/uipack"]}
			contents
			links={links}
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/uipack",
				programmingLanguage: "TypeScript",
				license: "https://opensource.org/licenses/MIT",
			}}>
			<div className={`ui-container chakra-container ${caseStudy.column}`}>
				<div className={caseStudy.top}>
					<BackLink href="/#work">Selected work</BackLink>

					<h1 className={`ui-heading ${ARTICLE_TITLE} ${caseStudy.title}`}>UiPack</h1>

					<MetaLine>2026 · open source · react + svg</MetaLine>

					<p className={caseStudy.lede}>
						I keep the diagrams, animations and slide starters I reuse in UiPack. It lets my projects share type, colours and spacing without setting them up again each time.
					</p>
					<P className={styles.muted}>
						It started with the diagrams on this site. I&apos;m building it out in two directions: web design for my projects, and presentations for the things I need to explain. Each slide starter includes speaker notes alongside the visual.
					</P>
				</div>

				<section aria-labelledby="figures">
					<H2 id="figures">Figures and motion</H2>
					<UipackFigure className={styles.figure} />
					<P>
						This is Groundplane, one of my projects, drawn with UiPack&apos;s agent-loop preset. Hover a node or legend entry to follow a flow; Pause and Replay control the animation.
					</P>
					<P className={styles.muted}>
						The figure style grew from OpenAI&apos;s Habitat post and archify&apos;s approach to typed figures, adapted to the type and colours I use here.
					</P>
					<MoreLinks items={[{ name: "Architecture diagrams on the docs site", href: `${DOCS}/components/diagrams`, external: true }]} />
				</section>

				<section aria-labelledby="objects">
					<H2 id="objects">3D objects</H2>
					{/* The WebGL scene mounts as the reader nears it; the placeholder
					    holds its height. */}
					<div className={styles.demo}>
						<LazyMount className={styles.objectHolder} rootMargin="400px">
							<div className={styles.objectFrame}>
								<HobbyScene kind="ai" label="Agent session" />
							</div>
						</LazyMount>
					</div>
					<P>
						The 3D objects on my Hobbies and Contact pages come from UiPack. This is the one from Coding &amp; AI; Hobbies shows all six.
					</P>
					<MoreLinks
						items={[
							{ name: "3D object scenes on the docs site", href: `${DOCS}/components/objects`, external: true },
							{ name: "All six on Hobbies", href: "/hobbies" },
						]}
					/>
				</section>

				<section aria-labelledby="slides">
					<H2 id="slides">Slide starters</H2>
					<div className={styles.demo}>
						<UipackSlide />
					</div>
					<P>This is the opening starter: the slide, then what to say, a delivery cue and the transition to the next slide.</P>
					<MoreLinks items={[{ name: "Slide starters on the docs site", href: `${DOCS}/presentations`, external: true }]} />
				</section>

				<div className={styles.traits}>
					<div>
						<p className={styles.traitHead}>Same palette</p>
						<div className={styles.swatches} aria-hidden="true">
							{["page", "text", "brand"].map((tone) => (
								<div key={tone} className={`${styles.swatch} ${styles[tone]}`} />
							))}
						</div>
						<p className={styles.traitNote}>
							Paper, ink and cobalt, in light and dark themes.
						</p>
					</div>
					<div>
						<p className={styles.traitHead}>Same type</p>
						<p className={styles.typeSans}>
							IBM Plex Sans
						</p>
						<p className={styles.typeMono}>
							IBM Plex Mono for labels
						</p>
					</div>
					<div>
						<p className={styles.traitHead}>Same habits</p>
						<p className={styles.traitBody}>
							Clear hierarchy, room to read, and motion that explains what changed.
						</p>
					</div>
				</div>

				{/* Placeholder (2026-11-15): the owner asked for a looking-back line to
				    be written for now. Both facts are checkable (the notes repo pins
				    uipack and draws its figures from it); replace it with his own
				    words when he sends them. */}
				<div className={styles.closing}>
					<P>
						This site and my notes site both draw their figures from UiPack now, so a fix to how a
						figure looks is made once instead of in each repo.
					</P>
				</div>

				<CaseStudyFooter links={links} next={{ name: "Trading engine", href: "/trading-engine", detail: "A paper-trading engine that tests ideas against rules set in advance" }} />
			</div>
		</Layout>
	);
}
