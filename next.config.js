module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/resume",
				destination: "/",
				permanent: true,
			},
		];
	},
};
