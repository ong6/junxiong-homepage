import TradingVersionPage, { H2, P } from "../../components/TradingVersionPage";
import * as V3 from "../../components/diagrams/trading/V3";

// Facts from archive/agentic-2026-08/README.md, the charters it indexes, and
// docs/history/buildlog-2026-07-15-to-2026-09-17.md (lines 84–109, 969–1080, 1231–1422).
const facts = [
	["dates", "4–17 August 2026"],
	["AI books", "5, each paired with a frozen twin"],
	["model call", "one turn, no tools, JSON out · about 18 a week"],
	["schedule (UTC)", "news 11:00 · gaters 21:40 weekdays · tuners Sunday 10:30"],
	["gater bounds", "veto or scale 0.25–1.00 · never add · at most half the candidates"],
	["tuner bounds", "≤ 2 parameters a session · ≤ 25 % a move · within ±50 % of registered"],
	["judged at", "26 weeks, AI minus twin, net of costs (2027-02-01)"],
	["output", "1 gate file · 1 news brief · 0 scheduled tuner changes"],
	["retired", "18 August · league 25 → 18 books"],
];

export default function TradingEngineV3() {
	return (
		<TradingVersionPage
			v="v3"
			description="Version 3 of Ong Jun Xiong's paper-trading engine, August 2026: a model beside five books, bounded by written charters and scored against frozen twins, then retired."
			lead="v3 put a language model next to five of the books. The code still traded. The model could only veto entries or move parameters inside bounds written down in advance, and each AI book ran beside a twin that never changed."
			diagram={V3}
			caption="fig. 1 — v3. ① RSS headline titles feed a morning news brief. ② Two gaters read it and may veto or shrink the day's entries; three tuners may move parameters on Sundays. ③ A validator reads its bounds from each book's frozen charter and rejects anything outside them; with no gate file the book trades its plain algorithm. ④ Each AI book is compared with its untouched twin, and only the spread at 26 weeks was going to count."
			facts={facts}>
			<H2>What the model was allowed to do</H2>
			<P>
				The gaters could veto or scale down an entry, never add one, and could touch at most half
				of a day&apos;s candidates. The tuners could change at most two parameters a session, by
				no more than a quarter each, and never outside half either side of the registered value.
				The validator parsed those limits from the charter itself, rejected a tuner proposal as a
				whole if any part failed, and the model sat outside the nightly path: the strategy read a
				gate file if one existed and traded its own rules if not.
			</P>

			<H2>What actually happened</H2>
			<P>
				On 4 August the analyst wrote one brief from 133 headlines, and one gater produced one
				file: eight candidates, all marked unclear, no vetoes. Three manual tuner sessions that
				day declined to change anything. From 5 August every session failed, because the login
				the scheduled calls relied on had expired. The failures were written as{" "}
				<code>TODO:</code> lines in a log nobody read, so the layer was dead for thirteen days
				before anyone noticed.
			</P>

			<H2>Why I retired it</H2>
			<P>
				The log&apos;s own line is the one I agree with: &ldquo;The defect was not the failure, it
				was the silence.&rdquo; The model had acted in one session out of about fifteen, so any
				spread against the twins was noise, and reporting it as an AI result would have been
				dishonest. The deeper lesson was about where a model belongs. Frequent, low-stakes calls
				that a rule could decide are the worst use of one, and anything a grid can decide should
				be decided by a grid. The five books and two new twins were retired, not deleted, and the
				league went from 25 books to 18.
			</P>

			<P>
				The twin survived. Every agent result the engine reports today is scored against a paired
				control, and that habit started here. v4 replaced the model with a parameter grid and a
				stricter walk-forward.
			</P>
		</TradingVersionPage>
	);
}
