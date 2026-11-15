import { Box, Container, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import CaseStudyFooter from "../components/CaseStudyFooter";
import HobbyScene from "../components/HobbyScene";
import LazyMount from "../components/LazyMount";
import OutArrow from "../components/OutArrow";
import UipackFigure from "../components/UipackFigure";
import UipackSlide from "../components/UipackSlide";
import Layout from "../components/layouts/Articles";
import { BackLink, MetaLine, P, H2, ARTICLE_TITLE } from "../components/ArticleParts";
import { PAGE_META } from "../lib/pageMeta";
import { withNotes } from "../lib/notes";

// A short showcase: one example of each thing UiPack does, each pointing at
// its page on the docs site. Everything that changes with a release (parts,
// install, API, the full catalogue) lives there, so this page never needs a
// version bump. Old links (`?category=slides`, `?object=…`) load this page
// and the parameters are ignored; `#objects` still lands on the 3D section.
const DOCS = "https://ui.junxiong.dev";

const links = withNotes("/uipack", [
	{ name: "Docs", detail: "The current parts, install steps and API", href: DOCS, external: true },
	{ name: "Asset gallery", detail: "Every icon, motion token, background and mark, with a preview", href: `${DOCS}/gallery`, external: true },
	{ name: "Source on GitHub", detail: "ong6/uipack", href: "https://github.com/ong6/uipack", external: true },
]);

// The 3D object's frame: compact, in the prose column.
const OBJECT_H = { base: "320px", md: "420px" };

// The links under each example: 44px targets, ↗ on each.
function MoreLinks({ items }) {
	return (
		<Flex as="ul" listStyleType="none" m={0} mt={3} wrap="wrap" columnGap={6}>
			{items.map(({ name, href, external }) => (
				<Box as="li" key={href}>
					<Link
						as={external ? undefined : NextLink}
						href={href}
						prefetch={external ? undefined : false}
						target={external ? "_blank" : undefined}
						rel={external ? "noopener noreferrer" : undefined}
						data-group
						display="inline-flex"
						alignItems="center"
						minH="44px"
						fontWeight="600">
						{name}
						<OutArrow ml={2} newTab={external} />
					</Link>
				</Box>
			))}
		</Flex>
	);
}

export default function Uipack() {
	return (
		<Layout
			{...PAGE_META["/uipack"]}
			contents
			links={links}
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/uipack",
				programmingLanguage: "TypeScript",
				license: "https://opensource.org/licenses/MIT",
			}}>
			<Container maxW="680px" px={0} ml={0}>
				<Box pt={{ base: 10, md: 16 }}>
					<BackLink href="/#work">Selected work</BackLink>

					<Heading as="h1" mt={{ base: 8, md: 10 }} fontSize={ARTICLE_TITLE} lineHeight="1" letterSpacing="-.045em">
						UiPack
					</Heading>

					<MetaLine>2026 · open source · react + svg</MetaLine>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="lede" fontWeight="600">
						I keep the diagrams, animations and slide starters I reuse in UiPack. It lets my projects share type, colours and spacing without setting them up again each time.
					</Text>
					<P color="text.muted">
						It started with the diagrams on this site. I&apos;m building it out in two directions: web design for my projects, and presentations for the things I need to explain. Each slide starter includes speaker notes alongside the visual.
					</P>
				</Box>

				<Box as="section" aria-labelledby="figures">
					<H2 id="figures">Figures and motion</H2>
					<UipackFigure mt={6} />
					<P>
						This is Groundplane, one of my projects, drawn with UiPack&apos;s agent-loop preset. Hover a node or legend entry to follow a flow; Pause and Replay control the animation.
					</P>
					<P color="text.muted">
						The figure style grew from OpenAI&apos;s Habitat post and archify&apos;s approach to typed figures, adapted to the type and colours I use here.
					</P>
					<MoreLinks items={[{ name: "Architecture diagrams on the docs site", href: `${DOCS}/components/diagrams`, external: true }]} />
				</Box>

				<Box as="section" aria-labelledby="objects">
					<H2 id="objects">3D objects</H2>
					{/* The WebGL scene mounts as the reader nears it (Kinetic, the look
					    Hobbies gives this object); the placeholder holds its height. */}
					<Box mt={6}>
						<LazyMount minH={OBJECT_H} rootMargin="400px">
							<Box h={OBJECT_H} minW={0}>
								<HobbyScene kind="ai" label="Agent session" variant={2} />
							</Box>
						</LazyMount>
					</Box>
					<P>
						The 3D objects on my Hobbies and Contact pages come from UiPack. This is the one from Coding &amp; AI; Hobbies shows all six.
					</P>
					<MoreLinks
						items={[
							{ name: "3D object scenes on the docs site", href: `${DOCS}/components/objects`, external: true },
							{ name: "All six on Hobbies", href: "/hobbies" },
						]}
					/>
				</Box>

				<Box as="section" aria-labelledby="slides">
					<H2 id="slides">Slide starters</H2>
					<Box mt={6}>
						<UipackSlide />
					</Box>
					<P>This is the opening starter: the slide, then what to say, a delivery cue and the transition to the next slide.</P>
					<MoreLinks items={[{ name: "Slide starters on the docs site", href: `${DOCS}/presentations`, external: true }]} />
				</Box>

				<Grid
					templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
					gap={6}
					mt={{ base: 12, md: 16 }}
					py={6}
					borderTop="1px solid"
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Box>
						<Text fontWeight="700">Same palette</Text>
						<Flex gap={2} mt={3} aria-hidden="true">
							{["page.bg", "page.text", "brand.solid"].map((color) => (
								<Box key={color} bg={color} w="28px" h="28px" borderRadius="full" border="1px solid" borderColor="border.subtle" />
							))}
						</Flex>
						<Text mt={2} color="text.muted" fontSize="15px">
							Paper, ink and cobalt, in light and dark themes.
						</Text>
					</Box>
					<Box>
						<Text fontWeight="700">Same type</Text>
						<Text mt={2} fontSize="22px">
							IBM Plex Sans
						</Text>
						<Text mt={1} fontFamily="var(--font-mono)" fontSize="15px" color="text.muted">
							IBM Plex Mono for labels
						</Text>
					</Box>
					<Box>
						<Text fontWeight="700">Same habits</Text>
						<Text mt={2} fontSize="15px" lineHeight="text" color="text.muted">
							Clear hierarchy, room to read, and motion that explains what changed.
						</Text>
					</Box>
				</Grid>

				<CaseStudyFooter links={links} next={{ name: "Trading engine", href: "/trading-engine", detail: "A paper-trading engine that tests ideas against rules set in advance" }} />
			</Container>
		</Layout>
	);
}
