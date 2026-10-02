import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import { DocsLayout, DocsMarkdown, extractDocsHeadings } from "uipack/docs";

const source = `# Product documentation

A reusable shell keeps navigation and context around a measured reading column.

## Start with the map

Pages stay grouped by section while the current article keeps its own heading links.

> **Note:** On mobile, navigation moves into a disclosure and the right-hand contents rail is hidden.

## Keep prose readable

Tables, \`code spans\`, callouts, and adjacent-page links use the same light and dark tokens.

### Link every heading

Anchors are visible on hover and keyboard focus.
`;

const sections = [
	{
		title: "Start here",
		items: [
			{ title: "Overview", href: "#docs-layout" },
			{ title: "Getting started", href: "#docs-layout" },
		],
	},
	{
		title: "How it works",
		items: [{ title: "System overview", href: "#docs-layout" }],
	},
];

export default function UipackDocs() {
	const { colorMode } = useColorMode();
	const onThisPage = extractDocsHeadings(source)
		.filter(({ level }) => level === 2 || level === 3)
		.map(({ id, level, title }) => ({ id, level, title }));

	return (
		<Box id="docs-layout" mt={{ base: 12, md: 16 }}>
			<Heading as="h2" fontSize={{ base: "22px", md: "24px" }}>
				Product docs layout
			</Heading>
			<Text mt={3} maxW="680px" color="text.muted" lineHeight="1.75">
				The shared docs renderer, responsive navigation, local contents, and prose treatment.
			</Text>
			<DocsLayout
				productTitle="Example product"
				productHref="#docs-layout"
				sections={sections}
				activeHref="#docs-layout"
				onThisPage={onThisPage}
				next={{ title: "Getting started", href: "#docs-layout" }}
				theme={colorMode}>
				<DocsMarkdown source={source} />
			</DocsLayout>
		</Box>
	);
}
