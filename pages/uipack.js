import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { agentLoop, beforeAfter, pipeline, serviceMap, skillLifecycle, syncLoop } from "uipack/presets";
import Layout from "../components/layouts/Articles";
import { connectorRule, deploy, fieldpack, groundplane, skillforge, skillpack } from "../lib/uipackGallery";

// The component library page, kept as a showcase: a gallery of full figures
// built from uipack presets and fed with my own projects. No props tables, no
// per-part detail; that is the README's job. Prose stays in the 680px column,
// figures take the main container width so the wide drawings read at size.

// Playwright cases in e2e/*.spec.js, quoted in Figure 05. Update with the
// suite.
export const E2E_CASES = 52;

const P = (props) => <Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />;
const H2 = (props) => <Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />;
const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// A figure breaks out of the prose column to the main container width, like
// every case-study figure.
const Wide = ({ note, children }) => (
	<Box as="figure" my={{ base: 10, md: 14 }} mx={0} w="min(100vw - 32px, 1088px)" maxW="none">
		{children}
		{note ? (
			<Text as="figcaption" mt={3} fontFamily="var(--font-mono)" fontSize="11px" lineHeight="1.6" color="text.muted">
				{note}
			</Text>
		) : null}
	</Box>
);

const GALLERY = [
	{
		id: "gp",
		render: () => agentLoop(groundplane, "gp"),
		note: "fig. 1 — groundplane. Hover the agent or a tool: the flow it belongs to lights up, the rest dims.",
	},
	{
		id: "sp",
		render: () => syncLoop(skillpack, "sp"),
		note: "fig. 2 — skillpack. The pull and push are two connectors; each carries one head and one packet direction.",
	},
	{
		id: "sf",
		render: () => skillLifecycle(skillforge, "sf"),
		note: "fig. 3 — skillforge. The dashed edge is feedback. It runs against the loop on purpose.",
	},
	{
		id: "fp",
		render: () => serviceMap(fieldpack, "fp"),
		note: "fig. 4 — fieldpack. A bus on each side of the platform. Stubs carry no heads, the junction dot marks the join.",
	},
	{
		id: "dp",
		render: () => pipeline(deploy(E2E_CASES), "dp"),
		note: "fig. 5 — this site. The queue is the browser suite; a change sits there until every case passes.",
	},
	{
		id: "cr",
		render: () => beforeAfter(connectorRule, "cr"),
		note: "fig. 6 — the rule the earlier figures broke. The changed stages and their inbound edges are in accent.",
	},
];

export default function Uipack() {
	const accent = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Components"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/uipack",
				programmingLanguage: "TypeScript",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="uipack is the React and SVG component library behind every diagram on this site: framed figures, lanes, nodes, connectors, packets that move, and hover that follows a flow.">
			<Container maxW="680px" px={0} ml={0}>
				<Box maxW="680px" pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/" display="inline-flex" alignItems="center" minH="32px" my={-1.5} fontSize="13px" fontWeight="700">
						← Home
					</Link>

					<Text mt={{ base: 8, md: 10 }} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						{"// components"}
					</Text>

					<Heading as="h1" mt={3} fontSize={{ base: "40px", md: "52px" }} lineHeight="1" letterSpacing="-.045em">
						uipack
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						2026 · open source · react + svg
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						Every diagram on this site comes from one library. The look comes from the figures
						in OpenAI&apos;s Habitat post. The bones are my old hand-laid SVG primitives and what
						archify taught me about typed, validated figures. uipack is the mix, with the frame,
						the motion and the hover added. Below, six of its presets drawn with my own
						projects. Code on{" "}
						<Link href="https://github.com/ong6/uipack" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<Box maxW="680px">
					<H2>Figures</H2>
					<P>
						Each one is a preset fed with a small spec. Hover a node to see the flow it belongs
						to; hover a legend entry to see every packet of that kind. Pause and Replay drive
						the whole SVG timeline.
					</P>
				</Box>

				{GALLERY.map(({ id, render, note }) => (
					<Wide key={id} note={note}>
						{render()}
					</Wide>
				))}

				<Box maxW="680px">
					<H2>Assets</H2>
					<P>
						Every part, icon, motion token, background and mark is catalogued with a rendered
						preview and a copy action, so I can find what I have before I draw it again. The
						browser is at{" "}
						<Link as={NextLink} href="/assets">
							/assets
						</Link>
						, unlisted on purpose.
					</P>

					<H2>Install</H2>
					<P>
						Not on npm yet, so it installs from GitHub with <Code>dist/</Code> committed:{" "}
						<Code>npm install github:ong6/uipack</Code>. The README on{" "}
						<Link href="https://github.com/ong6/uipack" isExternal>
							GitHub
						</Link>{" "}
						has the parts, the connector rule, the hover API and the presets.
					</P>
				</Box>
			</Container>
		</Layout>
	);
}
