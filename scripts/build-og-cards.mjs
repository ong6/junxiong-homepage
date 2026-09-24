// Renders the 1200×630 social cards in public/images/og/ from the site tokens,
// pairing each title with its Blender diorama from scripts/og/renders/
// (regenerate those with `blender -b --factory-startup -P scripts/og/scenes.py`).
// Run after changing a project's name or summary: `node scripts/build-og-cards.mjs`.
// Needs network for the Plex fonts; outputs are committed like other images.
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const OUT = new URL("../public/images/og/", import.meta.url);

// Summaries repeat the homepage and case-study copy; keep them in step.
const cards = [
	{
		slug: "home",
		eyebrow: "JUNXIONG.DEV / SINGAPORE",
		title: "Ong Jun Xiong",
		summary: "Software engineer at TikTok, building AI infrastructure for e\u2011commerce. Plus what I build on my own time.",
	},
	{
		slug: "groundplane",
		eyebrow: "OPEN SOURCE / PYTHON",
		title: "Groundplane",
		summary: "Checks the winner or total an agent reports against the tool results it actually got.",
	},
	{
		slug: "compoze",
		eyebrow: "COMPANY / 2025",
		title: "Compoze",
		summary: "Assistants that answer from company documents. I built and ran it alone until a client bought it.",
	},
	{
		slug: "trading-engine",
		eyebrow: "RESEARCH SYSTEM / PAPER ONLY",
		title: "Trading engine",
		summary: "Tests trading ideas overnight on US market data, with the rules fixed before results come in.",
	},
	{
		slug: "skillsmith",
		eyebrow: "AGENT SKILLS / PYTHON",
		title: "Skillsmith",
		summary: "Makes an agent skill from a repo, then keeps it only if it beats the agent without it.",
	},
	{
		slug: "skillpack",
		eyebrow: "AGENT TOOLING / CLAUDE + CODEX",
		title: "Skillpack",
		summary: "The agent skills I use in every repo, shared as a git subtree that syncs both ways.",
	},
	{
		slug: "jobforge",
		eyebrow: "INTERVIEW PRACTICE / LOCAL FIRST",
		title: "Jobforge",
		summary: "Coding drills that grade the plan I say out loud before I touch the keyboard.",
	},
	{
		slug: "uipack",
		eyebrow: "DESIGN SYSTEM / TYPESCRIPT",
		title: "UI Pack",
		summary: "The web figures, motion rules and slide starters I reuse across my projects.",
	},
];

const escape = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

const RENDERS = new URL("og/renders/", import.meta.url);

const html = ({ eyebrow, title, summary, art }) => `<!doctype html>
<html><head>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&family=IBM+Plex+Sans:wght@400;700&display=block" rel="stylesheet">
<style>
	* { box-sizing: border-box; margin: 0; }
	body { width: 1200px; height: 630px; background: #F3EFE7; color: #29231F; font-family: "IBM Plex Sans"; overflow: hidden; position: relative; }
	.art { position: absolute; right: -10px; top: 0; width: 630px; height: 630px; }
	.copy { position: absolute; left: 72px; top: 72px; bottom: 64px; width: 540px; display: flex; flex-direction: column; }
	.eyebrow { font-family: "IBM Plex Mono"; font-weight: 600; font-size: 21px; letter-spacing: .12em; color: #234EA2; }
	h1 { margin-top: 30px; font-size: ${title.length > 12 ? 76 : 92}px; line-height: .98; letter-spacing: -.05em; font-weight: 700; }
	p { margin-top: 26px; font-size: 30px; line-height: 1.36; color: #5E554D; }
	.foot { margin-top: auto; font-family: "IBM Plex Mono"; font-weight: 600; font-size: 19px; letter-spacing: .08em; color: #5E554D; }
	.foot b { color: #A4532F; font-weight: 600; }
</style></head>
<body>
	<img class="art" src="${art}" alt="">
	<div class="copy">
		<div class="eyebrow">// ${escape(eyebrow)}</div>
		<h1>${escape(title)}</h1>
		<p>${escape(summary)}</p>
		<div class="foot">JUNXIONG.DEV <b>→</b></div>
	</div>
</body></html>`;

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
	const png = await readFile(new URL(`${card.slug}.png`, RENDERS));
	const art = `data:image/png;base64,${png.toString("base64")}`;
	await page.setContent(html({ ...card, art }), { waitUntil: "networkidle" });
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: new URL(`${card.slug}.jpg`, OUT).pathname, type: "jpeg", quality: 88 });
	console.log(`og/${card.slug}.jpg`);
}
await browser.close();
