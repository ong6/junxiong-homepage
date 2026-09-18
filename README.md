# junxiong.dev

The source for [junxiong.dev](https://junxiong.dev), Ong Jun Xiong's personal site.
It presents my personal projects and work in AI infrastructure, backend platforms, and product
engineering through a restrained terminal-inspired interface.

## What is here

- A single-surface homepage led by Groundplane and Compoze, with the rest of the site exposed through global navigation
- Case studies for Groundplane (`/groundplane`, a Python boundary for agent output), Jobforge
  (`/jobforge`, a Claude Code interview-prep plugin) and Skillpack (`/skillpack`, the shared
  Claude Code and Codex skills with two-way subtree sync that defers around unrelated edits)
- A public case study for Compoze, with client identity and financial terms kept private
- A case study for the trading engine (`/trading-engine`, a paper-trading research engine with
  pre-registered strategies and a next-open fill model), with the nightly-loop diagram
- A browser and print-friendly resume
- UI Pack with Web design and Slide creation views, shared styling and downloadable SVG slide starters
- An immersive Hobbies page with procedural Three.js scenes, native scroll and readable fallbacks
- An archive of university projects
- Light and dark themes with reduced-motion support
- Search and social metadata, a sitemap, and structured `Person` data

## Stack

Next.js 16, React 18, Chakra UI v2 and Emotion. Vercel deploys the `main` branch to
[junxiong.dev](https://junxiong.dev).

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Verify a production build

```bash
npm run lint
npm run build
npm start
```

For the full browser suite, leave port 3011 free and run:

```bash
CI=1 npm run test:e2e -- --reporter=line
```

Lint, build, and browser checks run manually before publishing. Vercel deploys pushes to `main`;
the repository does not configure an automatic test gate for those deployments.

## Structure

```text
pages/          Routes and page content
components/     Shared layout, navigation, resume, and work components
public/         Images, robots.txt, and sitemap.xml
lib/theme.js    Chakra theme and colour-mode configuration
```

Slide starters are generated from `lib/uipackSlides.mjs`. After editing them, run
`node scripts/build-uipack-slides.mjs` to refresh `public/uipack-slides/`.

## License

The source is available for reference. Personal copy, work history, and images remain the property
of Ong Jun Xiong.
