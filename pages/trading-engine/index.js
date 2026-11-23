import CaseStudyFooter from "../../components/CaseStudyFooter";
import DiagramFigure from "../../components/DiagramFigure";
import * as Engine2 from "../../components/diagrams/trading/Engine2";
import Layout from "../../components/layouts/Articles";
import TradingVersionList from "../../components/TradingVersionList";
import { ERAS } from "../../lib/tradingVersions";
import { BackLink, MetaLine, P, H2, ARTICLE_TITLE } from "../../components/ArticleParts";
import { withNotes } from "../../lib/notes";
import { PAGE_META } from "../../lib/pageMeta";
import styles from "../../styles/CaseStudy.module.css";

// Overview of the trading engine: what it is, the engine running now, and the
// two engine eras. Each era has its own page (/trading-engine/v1, /v2); the v1
// page carries a section per update, newest first (#1-8 … #1-1).

const links = withNotes("/trading-engine", [
	{ name: "Product docs", detail: "How it works, research and operations", href: "/trading-engine/docs" },
	{ name: "Source on GitHub", detail: "Python, MIT", href: "https://github.com/ong6/trading-engine", external: true },
]);

// The page has no fact table; these rows repeat its meta line, lede and links.
const railFacts = [
	["building since", "July 2026"],
	["engine now", "Engine v2 · live on paper since 18 Oct"],
	["language", "Python"],
	["licence", "MIT"],
];

export default function TradingEngine() {
	return (
		<Layout
			contents
			facts={railFacts}
			links={links}
			title={PAGE_META["/trading-engine"].title}
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/trading-engine",
				programmingLanguage: "Python",
				license: "https://opensource.org/licenses/MIT",
			}}
			description={PAGE_META["/trading-engine"].description}>
			<div className={`ui-container chakra-container ${styles.column}`}>
				<div className={styles.top}>
					<BackLink href="/#work">Selected work</BackLink>

					<h1 className={`ui-heading ${ARTICLE_TITLE} ${styles.title}`}>Trading engine</h1>

					<MetaLine>2026 · open source · Python</MetaLine>

					<p className={styles.lede}>
						A paper-trading engine I&apos;ve been building since July 2026, to find out whether a
						strategy, or a model reading the market, makes money after costs. Every strategy goes
						through the same backtest core and the same evidence checks before it gets a paper
						portfolio. Nothing has beaten its frozen control yet.
					</p>
				</div>

				<DiagramFigure
					id="te-now"
					headingLevel={2}
					diagram={Engine2}
					caption="fig. 1 — Engine v2 with its deploy checks, live since 21 October: a fresh reviewer, replayed provider responses, a check of every scheduled job and a deploy gate. An invariant monitor, still watch-only, checks each published snapshot before reports read it."
				/>

				<H2>Two engines</H2>

				<P>
					Engine v1 was a research simulator. Every strategy ran as a paper portfolio inside it,
					through eight updates from July to October. Engine v2 has been live on paper since 18
					October and does a different job: it fills the orders, keeps the books and charges
					commissions on every fill, and each strategy gets its own paper account. Every change goes
					to a fresh reviewer that didn&apos;t write it. The checks in fig. 1 went live with the 21
					October update, and since 23 November a merged change with green CI deploys itself and
					rolls back on its own if a check fails. A new engine number means the engine&apos;s job
					changed; updates inside an engine move the number after the dot.
				</P>

				<TradingVersionList items={ERAS.filter((era) => era.v === "v2")} />

				<H2>Engine v1 updates</H2>

				<P>
					All eight updates are on one page, newest first, each with the diagram as the engine
					stood then. Update 1.8 added the shared backtest core, which Engine v2 still uses for
					research.
				</P>

				<TradingVersionList />

				{/* Placeholder (2026-11-15): the owner asked for a looking-back line to
				    be written for now. Every fact in it is from his note "Why my
				    trading strategies haven't earned real money" (in Links out);
				    replace it with his own words when he sends them. */}
				<H2>Looking back</H2>
				<P>
					I started by turning ideas from trading books and YouTube into rules I could run. Some of
					the backtests made money, and none kept a reliable advantage over its control, so no
					strategy here has earned the right to trade real money. That changed what I build next:
					an agent that makes one bounded decision inside the process, while plain code keeps risk
					and execution.
				</P>

				<CaseStudyFooter links={links} next={{ name: "Agent skills", href: "/skills", detail: "One home for coding-agent skills, linked into every repo" }} />
			</div>
		</Layout>
	);
}
