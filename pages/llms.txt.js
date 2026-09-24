import { DEFAULT_DESCRIPTION, SITE_URL } from "../components/layouts/Main";

// llms.txt (https://llmstxt.org): a plain-markdown map of the site for agents
// that read it on someone's behalf. Every line restates copy already on the
// linked page; when a page's summary changes, change it here too.
const LLMS = `# Ong Jun Xiong

> ${DEFAULT_DESCRIPTION}

Software engineer at TikTok in Singapore, building AI infrastructure for e-commerce. Before that, Go services for TikTok's seller platform. Founded and ran Compoze alongside TikTok in 2025 until a client bought it. Studied at the National University of Singapore and the Technical University of Munich.

Contact: email via ${SITE_URL}/contact. GitHub: https://github.com/ong6. LinkedIn: https://www.linkedin.com/in/junx6/.

## Work history

- [Résumé](${SITE_URL}/resume): roles, teams, dates and skills; mirrors LinkedIn
- [Résumé PDF](${SITE_URL}/resume/Ong-Jun-Xiong-Resume.pdf): one-page print version

## Projects

- [Groundplane](${SITE_URL}/groundplane): open-source Python library that checks declared fields in agent output against recorded tool facts, with deterministic checks and errors that include provenance. Code: https://github.com/ong6/groundplane
- [Compoze](${SITE_URL}/compoze): document-grounded assistants for businesses, built and run solo in 2025; a client bought the company at the end of that year
- [Trading engine](${SITE_URL}/trading-engine): paper-trading research engine run nightly on real US market data, with pre-registered strategies and a fill model that cannot see the future. Code: https://github.com/ong6/trading-engine
- [Skillsmith](${SITE_URL}/skillsmith): makes an agent skill from a repo and keeps it only when it beats a no-skill baseline on heldout tasks. Code: https://github.com/ong6/skillsmith
- [Skillpack](${SITE_URL}/skillpack): Claude Code and Codex skills shared across repos as a two-way git subtree. Code: https://github.com/ong6/skillpack
- [Jobforge](${SITE_URL}/jobforge): Claude Code plugin for coding-interview prep that grades the plan said out loud. Code: https://github.com/ong6/jobforge
- [UI Pack](${SITE_URL}/uipack): shared web figures, motion and slide starters used across these projects. Code: https://github.com/ong6/uipack

## Writing

- [Notes](https://notes.junxiong.dev): longer working notes on AI systems and projects

## Optional

- [Hobbies](${SITE_URL}/hobbies): coding and AI, tennis, trading, home servers, travel, reading
- [Archive](${SITE_URL}/works): university-era projects, 2020 to 2023
`;

export const getServerSideProps = async ({ res }) => {
	res.setHeader("Content-Type", "text/markdown; charset=utf-8");
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
	res.write(LLMS);
	res.end();

	return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
const LlmsTxt = () => null;

export default LlmsTxt;
