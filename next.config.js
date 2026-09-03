const LONG_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

// Enforced today: only the clickjacking half, which nothing on the site can
// trip. The full policy ships report-only until the browser console on every
// route has been clean for a while; then move it to Content-Security-Policy.
//
//   script-src   Next's inline runtime and Vercel Speed Insights (same-origin
//                on Vercel, va.vercel-scripts.com in dev)
//   style-src    Emotion injects styles inline
//   img-src      next/image, data: for blur placeholders
//   font-src     next/font self-hosts Google Fonts
//   connect-src  Speed Insights beacons
//   frame-src    YouTube and Figma embeds on /works/*
const CSP_ENFORCED = "frame-ancestors 'none'";
const CSP_REPORT_ONLY = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	"connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
	"frame-src https://www.youtube.com https://www.youtube-nocookie.com https://embed.figma.com https://www.figma.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"upgrade-insecure-requests",
].join("; ");

module.exports = {
	reactStrictMode: true,
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
					{ key: "Content-Security-Policy", value: CSP_ENFORCED },
					{ key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
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
