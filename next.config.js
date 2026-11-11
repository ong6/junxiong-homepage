const LONG_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

// Enforced on every route. Checked with a production build in Playwright across
// every route type (embeds, 3D scenes, docs, résumé) with zero violations.
//
//   script-src   Next's inline runtime and Chakra's colour-mode script; Vercel
//                Analytics and Speed Insights (same-origin /_vercel/* on Vercel,
//                va.vercel-scripts.com in dev); 'wasm-unsafe-eval' for three's
//                meshopt decoder, which uipack's tennis model needs (WebAssembly
//                only; it does not allow eval())
//   style-src    Emotion injects styles inline
//   img-src      next/image, data: for blur placeholders
//   font-src     next/font self-hosts Google Fonts
//   connect-src  Analytics and Speed Insights beacons
//   frame-src    YouTube and Figma embeds on /works/*
const CSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://va.vercel-scripts.com",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	"connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
	"frame-src https://www.youtube.com https://www.youtube-nocookie.com https://embed.figma.com https://www.figma.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
].join("; ");

module.exports = {
	reactStrictMode: true,
	// AGENTS.md is hand-written; stop `next dev` appending its managed block.
	agentRules: false,
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [{ type: "host", value: "www.junxiong.dev" }],
				destination: "https://junxiong.dev/:path*",
				permanent: true,
			},
			{ source: "/skill-eval-pack", destination: "/skillsmith", permanent: true },
			{ source: "/skillpack", destination: "/skills", permanent: true },
			// The old v3–v7 pages are now Engine v1 updates 1.3–1.7; /v2 is the Engine v2 page and
			// Engine v1 has no index of its own: the overview lists its updates.
			{ source: "/trading-engine/v1", destination: "/trading-engine/v1/1.8", permanent: true },
			{ source: "/trading-engine/v3", destination: "/trading-engine/v1/1.3", permanent: true },
			{ source: "/trading-engine/v4", destination: "/trading-engine/v1/1.4", permanent: true },
			{ source: "/trading-engine/v5", destination: "/trading-engine/v1/1.5", permanent: true },
			{ source: "/trading-engine/v6", destination: "/trading-engine/v1/1.6", permanent: true },
			{ source: "/trading-engine/v7", destination: "/trading-engine/v1/1.7", permanent: true },
			// The asset browser moved to the uipack docs site.
			{ source: "/assets", destination: "https://ui.junxiong.dev/gallery", permanent: true },
			{
				source: "/jobforge",
				destination: "https://github.com/ong6/skills/tree/main/skills/interview-prep",
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{ key: "Content-Security-Policy", value: CSP },
				],
			},
			// Images keep mutable filenames, so `immutable` would strand a replaced
			// file in caches. A day of freshness plus a week of SWR is the safe swap.
			{
				source: "/images/:path*",
				headers: [{ key: "Cache-Control", value: LONG_CACHE }],
			},
			{
				source: "/favicon.ico",
				headers: [{ key: "Cache-Control", value: LONG_CACHE }],
			},
			{
				source: "/apple-touch-icon.png",
				headers: [{ key: "Cache-Control", value: LONG_CACHE }],
			},
		];
	},
};
