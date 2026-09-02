const LONG_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

module.exports = {
	reactStrictMode: true,
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
		];
	},
};
