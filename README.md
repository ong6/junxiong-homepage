# junxiong.dev

The source for [junxiong.dev](https://junxiong.dev), Ong Jun Xiong's personal site.
It presents my personal projects and work in AI infrastructure, backend platforms, and product
engineering through a restrained terminal-inspired interface.

## What is here

- A single-surface homepage led by Groundplane and Compoze, with the rest of the site exposed through global navigation
- Case studies for Groundplane (`/groundplane`, a Python boundary for agent output), Skillpack
  (`/skillpack`, shared Claude Code and Codex skills), Skillsmith (`/skillsmith`, makes a skill
  from a repo, then gates it against a blind no-skill baseline) and Jobforge (`/jobforge`, a Claude Code interview-prep plugin)
- A public case study for Compoze, with client identity and financial terms kept private
- A case study for the trading engine (`/trading-engine`, a paper-trading research engine with
  pre-registered strategies and a next-open fill model), with the nightly-loop diagram
- A browser and print-friendly resume
- UI Pack with Web design and Slide creation views, shared styling, downloadable SVG starters and
  speaker guides for what to say, how to deliver it and how to enter the next slide
- A Contact page with email, LinkedIn, GitHub, résumé and notes around a shared UI Pack 3D scene
- A Hobbies page with procedural Three.js scenes, native scroll and readable fallbacks; 3D loads
  when a chapter reaches the centre of the viewport and unloads when you return to the introduction
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

Slide examples live in `lib/uipackSlides.mjs`; layout, SVG rendering and speaker guidance come from
`uipack/presentations`. After editing the examples, run
`node scripts/build-uipack-slides.mjs` to refresh `public/uipack-slides/`.

## License

The source is available for reference. Personal copy, work history, and images remain the property
of Ong Jun Xiong.

## UI Pack first

Significant visuals are authored and registered in [UI Pack](../uipack/docs/component-first.md) before use here. Run `npm run check:ui-ownership` to verify the shared imports and renderer boundary. `ui-inventory.json` tracks collection ownership and existing page-specific compositions. The six hobby scenes are imported from `uipack/objects` and previewed in `/uipack`.


## Object variants

The shared object gallery supports stable review links such as
[/uipack?category=web&object=travel&look=1#objects](https://junxiong.dev/uipack?category=web&object=travel&look=1#objects).
Use object IDs ai, contact, tennis, trading, server, travel or reading, and look 0–2.
The named look buttons preserve the choice in the URL across reloads.
