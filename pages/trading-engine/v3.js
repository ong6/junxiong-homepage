import TradingVersionPage, { Code, H2, P } from "../../components/TradingVersionPage";
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
			lead="v3 was my first attempt at putting a language model in the trading loop, and the most useful thing it produced was a reason to take it out. The model sat beside five books, could only veto entries or move parameters inside bounds written down in advance, and each of those books ran next to a twin that never changed."
			diagram={V3}
			caption="fig. 1 — v3. ① RSS headline titles feed a morning news brief. ② Two gaters read it and may veto or shrink the day's entries; three tuners may move parameters on Sundays. ③ A validator reads its bounds from each book's frozen charter and rejects anything outside them; with no gate file the book trades its plain algorithm. ④ Each AI book is compared with its untouched twin, and only the spread at 26 weeks was going to count."
			facts={facts}>
			<H2>What the model was allowed to do</H2>
			<P>
				A gater could veto or shrink an entry but never add one, and it could touch at most half of
				a day&apos;s candidates. A tuner could change at most two parameters in a session, by no more
				than a quarter each, and never beyond half either side of the registered value. The
				validator read those limits from each book&apos;s charter and threw out a tuner proposal
				whole if any part of it failed. The model also sat outside the nightly path: the strategy
				used a gate file if one existed and traded its own rules if it did not.
			</P>

			<H2>What actually happened</H2>
			<P>
				On 4 August the analyst wrote one brief from 133 headlines, and one gater produced one file:
				eight candidates, all marked unclear, no vetoes. Three manual tuner sessions that day
				declined to change anything. From 5 August every scheduled session failed because the login
				they depended on had expired. The failures went into <Code>TODO:</Code> lines in a log
				nobody read, and the layer stayed dead for thirteen days before anyone noticed.
			</P>

			<H2>Why I retired it</H2>
			<P>
				I agree with the log&apos;s own verdict: &ldquo;The defect was not the failure, it was the
				silence.&rdquo; The model acted in one session out of about fifteen, so any spread against
				the twins was noise, and calling it an AI result would have been dishonest. The more
				lasting lesson was about where a model belongs. Frequent, low-stakes calls that a rule could
				make are the worst use of one, and anything a grid can decide should be decided by a grid.
				The five books and the two twins created for them were retired, not deleted, and the league
				went from 25 books to 18.
			</P>
			<P>
				v4 replaced the model with a parameter grid and a stricter walk-forward. The twin idea
				stayed. Every agent result the engine reports today sits next to a paired control.
			</P>
		</TradingVersionPage>
	);
}
