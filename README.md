# junxiong.dev

The source for [junxiong.dev](https://junxiong.dev), Ong Jun Xiong's personal site.
It presents my personal projects and work in AI infrastructure, backend platforms, and product
engineering through a restrained terminal-inspired interface.

## What is here

- A project-first homepage with selected work and personal context
- A public case study for Compoze, with client identity and financial terms kept private
- A browser and print-friendly resume
- An archive of university projects
- Light and dark themes with reduced-motion support
- Search and social metadata, a sitemap, and structured `Person` data

## Stack

Next.js 15, React 18, Chakra UI, Emotion, and Framer Motion. Vercel deploys the `main` branch to
[junxiong.dev](https://junxiong.dev).

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Verify a production build

```bash
npm run build
npm start
```

## Structure

```text
pages/          Routes and page content
components/     Shared layout, navigation, resume, and work components
public/         Images, robots.txt, and sitemap.xml
lib/theme.js    Chakra theme and colour-mode configuration
```

## License

The source is available for reference. Personal copy, work history, and images remain the property
of Ong Jun Xiong.
