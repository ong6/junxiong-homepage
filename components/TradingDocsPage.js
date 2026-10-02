import Head from "next/head";
import { useColorMode } from "@chakra-ui/react";
import { DocsLayout, DocsMarkdown } from "uipack/docs";

export default function TradingDocsPage({ page, sections, previous, next }) {
	const { colorMode } = useColorMode();
	const title = `${page.title} — Trading engine docs — Ong Jun Xiong`;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={page.summary} />
				<meta key="og:title" property="og:title" content={title} />
				<meta key="og:description" property="og:description" content={page.summary} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={page.summary} />
			</Head>
			<DocsLayout
				productTitle="Trading engine"
				productHref="/trading-engine"
				docsTitle="Product docs"
				sections={sections}
				activeHref={page.href}
				onThisPage={page.onThisPage}
				previous={previous}
				next={next}
				theme={colorMode}>
				<DocsMarkdown source={page.content} />
			</DocsLayout>
		</>
	);
}
