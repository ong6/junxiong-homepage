module.exports = {
	reactStrictMode: true,
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
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
};
