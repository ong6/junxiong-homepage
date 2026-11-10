# junxiong.dev: agent guide

Next.js 16 (pages router), React 18, Chakra UI v2 + Emotion, `uipack` from its GitHub release tarball (`npm install https://github.com/ong6/uipack/releases/download/vX.Y.Z/uipack-X.Y.Z.tgz`; never `npm i uipack`, an unrelated package). Node >= 20.
Pushing to `main` deploys to production on Vercel; CI (`.github/workflows/ci.yml`) runs verify + build.

## Commands
- `npm ci` · `npm run dev` (port 3000) · `npm run build` · `npm start`
- `npm run verify`: lint + UI-ownership check (no local `<canvas>` or `three` imports; `ui-inventory.json` imports resolve)
- `npm run test:e2e`: full Playwright suite; builds and serves on port 3011 (outside CI it reuses a server already on 3011, so restart that after changes)
- One spec: `npx playwright test e2e/hobbies.spec.js`; one test: add `-g "<title words>"`
- Screenshot specs run only with `SHOTS=1`

## Layout
- `pages/`: routes; `works/[slug].js` and `trading-engine/docs/[slug].js` are data-driven; `sitemap.xml.js`, `llms.txt.js` are generated routes
- `components/`: layout, nav, article parts, `DiagramFigure.js`; `components/diagrams/`: figure modules (`trading/` for engine versions); `components/Resume/`: résumé page and its LaTeX PDF source
- `lib/`: `theme.js` (Chakra theme), `works.js` (university projects), `tradingDocs.js`, `tradingVersions.js`, `tones.js`, uipack gallery data
- `content/trading-docs/`: synced docs Markdown · `scripts/`: build and sync scripts · `e2e/`: Playwright specs · `styles/`: `globals.css`, `print.css`, `Hobbies.module.css`

## Recipes (files to touch)
- New case study: `pages/<slug>.js` (copy `pages/skillsmith.js`), `components/diagrams/<Name>Architecture.js`, `components/Navbar.js` (`activePaths`), `components/layouts/Main.js` (`OG_CARDS`), `lib/tones.js`, `pages/sitemap.xml.js`, `pages/llms.txt.js`, `scripts/build-og-cards.mjs` then `node scripts/build-og-cards.mjs <slug>` (writes `public/images/og/<slug>.jpg`), `e2e/figures.spec.js` (`PAGES`), README "What is here"
- University project: an entry in `lib/works.js` + images in `public/images/works/` (sitemap and routes follow)
- New diagram: a module in `components/diagrams/` exporting `meta`, `CLAIM`, `Wide({ id })` from uipack parts (`parts.js`, `sequence.js`, `userflow.js` or `uipack/presets`); render with `<DiagramFigure id diagram caption />`
- Style edit: Chakra props in the component, tokens in `lib/theme.js`, global CSS in `styles/globals.css`. Read `STYLE.md` first for any visual change (colour, type, spacing, motion, new component or page layout)
- New 3D or custom rendering: belongs in uipack, not here (`check:ui-ownership` fails otherwise)

## Generated: never hand-edit (and skip reading)
- `content/trading-docs/`: `npm run sync:trading-docs` from the engine repo's `docs/site`; needs the gitignored `scripts/.forbidden-terms.local`
- `public/uipack-slides/`: from `lib/uipackSlides.mjs` via `node scripts/build-uipack-slides.mjs`
- `public/uipack-assets/`: gitignored, copied from uipack by `predev`/`prebuild`
- `package-lock.json`: change only through npm · `docs/ui-review-2026-11.md`: a dated review, history only
- `AGENTS.md` stays hand-written: `agentRules: false` in `next.config.js` stops `next dev` appending its block

## Verify loop
`npm run verify` → `npm run build` → the relevant spec (or `npm run test:e2e` before pushing). Push only when green; it deploys.
