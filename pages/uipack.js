import { Box, Container, Heading, Link, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { CodeBlock, CodeFigure } from "../components/CodeBlock";
import Layout from "../components/layouts/Articles";
import HabitatFigure from "../components/uipack/HabitatFigure";
import PartsFigure, { StaticFigure } from "../components/uipack/PartsFigure";

// The component library page: not a case study. Prose stays in the 680px
// column; figures take the full 1040px so the wide drawings read at size.

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);

const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);

const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;

// Figures break out of the prose column to the main container width, like
// every case-study figure.
const Wide = (props) => <Box my={{ base: 10, md: 14 }} w="min(100vw - 32px, 1088px)" maxW="none" {...props} />;

const COMPONENTS = [
	["Figure", "number · eyebrow · title · caption · legend · controls · viewBox · narrow · narrowViewBox · alt", "the frame: header, legend, Pause and Replay, dotted canvas, wide and narrow drawings swapped at 720px. Owns the SVG timeline."],
	["Legend", "items[{ label, kind, shape }]", "shape-coded key. Figure renders it; exported for use elsewhere."],
	["Lane", "x · w · y · title · h", "mono uppercase column header, optional faint rule."],
	["Group", "x · y · w · h · title · variant solid|dashed · accent", "a boxed service or a dashed environment boundary."],
	["Node", "x · y · w · h · label · sub · icon · align · accent · dashed", "a box with a label, a mono second line and an icon slot."],
	["Chip", "x · y · w · h · label · dashed · kind", "a pill: a connection slot, a queued request, a status flag."],
	["Connector", "points · defs · arrow boolean|both · dashed · kind · radius", "a rounded polyline with arrowheads coloured by token kind."],
	["Packet", "points · kind · shape · dur · delay · reverse · at · r", "a token that rides the same points, looping."],
	["Badge", "cx · cy · text · accent", "a circled step number."],
	["Label", "x · y · text · anchor · font · accent", "text with a page-coloured underlay so it can sit on a line."],
	["Defs", "id", "arrowhead markers, one per token kind. One per SVG."],
	["Token", "kind · shape · r · cx · cy", "the shape itself: square for request, circle for response, diamond for change."],
];

const HELPERS = "anchor(box, side, t) · route(from, to, via) · pathFromPoints(points, radius) · pointAlong(points, t) · icons (9 line glyphs)";

const INSTALL = [
	["$ npm install github:ong6/uipack", "muted"],
	[""],
	['import "uipack/theme.css";'],
	['import { Figure, Defs, Node, Connector, Packet, route } from "uipack";'],
	[""],
	["const path = route([216, 60], [400, 140], \"h\");"],
	[""],
	["<Figure number=\"Figure 01\" eyebrow=\"Request flow\" title=\"One client, one service\""],
	["        legend={[{ label: \"Request\", kind: \"request\" }]} viewBox=\"0 0 640 200\" alt=\"…\">"],
	["  <Defs id=\"rf\" />"],
	["  <Node x={16} y={40} w={200} h={40} label=\"Client\" icon=\"client\" />"],
	["  <Node x={400} y={120} w={200} h={40} label=\"Service\" icon=\"service\" />"],
	["  <Connector points={path} defs=\"rf\" kind=\"request\" />"],
	["  <Packet points={path} kind=\"request\" dur={2} />", "hot"],
	["</Figure>"],
];

const THEME = [
	[".uipack {", "muted"],
	["  --uipack-fg · --uipack-bg · --uipack-surface · --uipack-border · --uipack-accent"],
	["  --uipack-token-request · --uipack-token-response · --uipack-token-change"],
	["  --uipack-mono · --uipack-sans"],
	["}", "muted"],
	["/* dark: prefers-color-scheme, or data-theme=\"dark\" on <html> or the figure */", "muted"],
];

const facts = [
	["package", "uipack 0.1.0 · ESM + CJS + types"],
	["runtime deps", "0 · React 18 peer"],
	["size", "24 KB ESM, 5.5 KB gzipped · 8 KB theme.css"],
	["tests", "20 vitest · 12 Playwright (6 × Chromium, WebKit)"],
	["motion", "SMIL animateMotion · static under reduced motion"],
	["on this site", "every architecture figure, 5 diagrams"],
	["status", "MIT · github.com/ong6/uipack"],
];

const MonoTable = ({ rows, cols = "140px 1fr" }) => (
	<Box as="dl" mt={{ base: 6, md: 8 }} borderTop="1px solid" borderColor="border.subtle">
		{rows.map(([k, v, note]) => (
			<Box
				key={k}
				display="grid"
				gridTemplateColumns={{ base: "1fr", md: cols }}
				columnGap={6}
				rowGap={1}
				py={3}
				borderBottom="1px solid"
				borderColor="border.subtle">
				<Text as="dt" fontFamily="var(--font-mono)" fontSize="12px" fontWeight="700" letterSpacing=".04em">
					{k}
				</Text>
				<Box as="dd" m={0}>
					<Text fontFamily="var(--font-mono)" fontSize="12px" lineHeight="1.6" color="text.muted">
						{v}
					</Text>
					{note ? (
						<Text mt={1} fontSize="14px" lineHeight="1.6">
							{note}
						</Text>
					) : null}
				</Box>
			</Box>
		))}
	</Box>
);

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
			description="uipack is the React and SVG component library behind every diagram on this site: framed figures, lanes, nodes, connectors, and packets that move along them.">
			<Container maxW="680px" px={0} ml={0}>
				<Box maxW="680px" pt={{ base: 10, md: 16 }}>
					<Link as={NextLink} href="/" display="inline-flex" alignItems="center" minH="32px" my={-1.5} fontSize="13px" fontWeight="700">
						← Home
					</Link>

					<Text
						mt={{ base: 8, md: 10 }}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						{"// components"}
					</Text>

					<Heading as="h1" mt={3} fontSize={{ base: "40px", md: "52px" }} lineHeight="1" letterSpacing="-.045em">
						uipack
					</Heading>

					<Text mt={4} color={accent} fontFamily="var(--font-mono)" fontSize="11px" fontWeight="700" letterSpacing=".1em" textTransform="uppercase">
						2026 · open source · react + svg
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						Every diagram on this site comes from one place. I wanted the figures from
						OpenAI&apos;s Habitat post: a mono eyebrow, one title, one caption, a shape-coded
						legend, Pause and Replay, a dotted grid, and small tokens riding the arrows. I
						already had hand-laid SVG primitives on an 8px grid, and archify had shown me
						what typed, validated figures look like. uipack is the mix: those primitives,
						extended until they draw that figure, with the frame and the motion added. Code on{" "}
						<Link href="https://github.com/ong6/uipack" isExternal>
							GitHub
						</Link>
						.
					</Text>
				</Box>

				<Box maxW="680px">
					<H2>The reference</H2>
				</Box>

				<Wide>
					<HabitatFigure />
				</Wide>

				<Box maxW="680px">
					<H2>Every part</H2>
					<P>
						Twelve components and four geometry helpers. Everything is drawn in{" "}
						<Code>currentColor</Code> with one accent per figure, so a drawing reads the same
						in light and dark. Props below in mono.
					</P>
				</Box>

				<Wide>
					<PartsFigure />
				</Wide>

				<Box maxW="680px">
					<MonoTable rows={COMPONENTS} cols="120px 1fr" />
					<Text mt={4} fontFamily="var(--font-mono)" fontSize="12px" lineHeight="1.7" color="text.muted">
						helpers · {HELPERS}
					</Text>

					<H2>Motion</H2>
					<P>
						Packets move with SMIL <Code>animateMotion</Code>. I picked it over CSS{" "}
						<Code>offset-path</Code> because the Figure can then drive the whole SVG timeline:
						Pause calls <Code>pauseAnimations()</Code>, Replay calls{" "}
						<Code>setCurrentTime(0)</Code>, and every packet keeps its offset after a
						replay with no JavaScript per frame. Chromium and WebKit both pass the browser
						suite on it.
					</P>
					<P>
						Under <Code>prefers-reduced-motion</Code> a packet renders once at the path
						midpoint and never moves, and the controls disappear. The figure below is that
						frame, drawn by hand so you can see it without changing a setting.
					</P>
				</Box>

				<Box my={{ base: 10, md: 14 }}>
					<StaticFigure />
				</Box>

				<Box maxW="680px">
					<H2>Install</H2>
					<P>
						Not on npm yet. Someone else holds the name. Install from
						GitHub; <Code>dist/</Code> is committed so there is no build step on your side.
					</P>
					<CodeFigure caption="fig. 4 — the smallest useful figure: two nodes, one connector, one packet.">
						<CodeBlock title="RequestFlow.jsx" lines={INSTALL} />
					</CodeFigure>

					<H2>Theming</H2>
					<P>
						Every colour is a CSS custom property on <Code>.uipack</Code>, so a host restyles
						by setting variables on any ancestor. This site maps them to its own tokens in
						one rule, and Chakra&apos;s colour mode flips them with the page.
					</P>
					<CodeFigure caption="fig. 5 — the variables. Strokes are currentColor, so a figure inherits the page text colour.">
						<CodeBlock title="theme.css" lines={THEME} />
					</CodeFigure>

					<H2>Facts</H2>
					<MonoTable rows={facts} />

					<P mt={10}>
						Next: stepped stories, the 01 / 02 / 03 tabs that change the scene. Then counters
						on nodes, and export to PNG and video for slides.
					</P>
				</Box>
			</Container>
		</Layout>
	);
}
