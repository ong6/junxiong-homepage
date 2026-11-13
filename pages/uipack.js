import {
	Box,
	Container,
	Flex,
	Grid,
	Heading,
	Link,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSyncExternalStore } from "react";
import UipackSlides from "../components/UipackSlides";
import Layout from "../components/layouts/Articles";
import CaseStudyFooter from "../components/CaseStudyFooter";
import ProjectLinks from "../components/ProjectLinks";
import LazyMount from "../components/LazyMount";
import UipackDocs from "../components/UipackDocs";
import { BackLink, P, H2, ARTICLE_TITLE, Eyebrow } from "../components/ArticleParts";
// Load the animated gallery only after the selected category is known.
const UipackWebGallery = dynamic(() => import("../components/UipackWebGallery"), {
	loading: () => (
		<Text py={8} color="text.muted">
			Loading figures…
		</Text>
	),
});

const UipackObjects = dynamic(() => import("../components/UipackObjects"));
const UipackWebMotion = dynamic(() => import("../components/UipackWebMotion"));

const subscribeToHydration = () => () => {};

// Everything that changes with a release (install, parts, API, the asset list)
// lives on the docs site, so this page never needs a version bump.
const DOCS = "https://ui.junxiong.dev";
const GALLERY = `${DOCS}/gallery`;

const links = [
	{ name: "Docs", detail: "The current parts, install steps and API", href: DOCS, external: true },
	{ name: "Asset gallery", detail: "Every icon, motion token, background and mark, with a preview", href: GALLERY, external: true },
	{ name: "Source on GitHub", detail: "ong6/uipack", href: "https://github.com/ong6/uipack", external: true },
];

export default function Uipack() {
	const accent = "brand.solid";
	const router = useRouter();
	const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
	const category = router.query.category === "slides" ? 1 : 0;
	// A link that names an object (or the #objects anchor) mounts the 3D
	// gallery at once; otherwise it mounts as the reader scrolls near it.
	const objectsLinked = ["object", "look", "edition"].some((key) => router.query[key] !== undefined) || router.asPath.includes("#objects");
	const changeCategory = (index) => {
		router.push({ pathname: "/uipack", query: { category: index ? "slides" : "web" } }, undefined, {
			shallow: true,
			scroll: false,
		});
	};

	return (
		<Layout
			title="UiPack"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/uipack",
				programmingLanguage: "TypeScript",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="UiPack brings reusable web design, animation and presentation systems into one place, including slide layouts and the words used to present them.">
			<Container maxW="1088px" px={0} ml={0}>
				<Box maxW="680px" pt={{ base: 10, md: 16 }}>
					<BackLink href="/#work">Selected work</BackLink>

					<Eyebrow mt={{ base: 8, md: 10 }}>design across projects</Eyebrow>

					<Heading
						as="h1"
						mt={3}
						fontSize={ARTICLE_TITLE}
						lineHeight="1"
						letterSpacing="-.045em">
						UiPack
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="12px"
						fontWeight="700"
						letterSpacing=".08em"
						textTransform="uppercase">
						2026 · open source · react + svg
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="lede" fontWeight="600">
						I keep the diagrams, animations and slide starters I reuse in UiPack. It lets my projects share type, colours and spacing without setting them up again each time.
					</Text>
					<P color="text.muted">
						It started with the diagrams on this site. I&apos;m building it out in two directions:
						web design for my projects, and presentations for the things I need to explain. Each slide starter includes speaker notes alongside the visual.
					</P>
				</Box>

				<ProjectLinks links={links} mt={{ base: 8, md: 10 }} />

				<Tabs
					id="uipack-categories"
					index={category}
					onChange={changeCategory}
					isLazy
					lazyBehavior="unmount"
					mt={{ base: 8, md: 12 }}
					colorScheme="mint">
					<TabList aria-label="UiPack categories" borderColor="border.subtle">
						{["Web design", "Slide creation"].map((label) => (
							<Tab
								key={label}
								minH="52px"
								px={{ base: 4, md: 6 }}
								fontSize={{ base: "17px", md: "19px" }}
								fontWeight="600"
								_selected={{ color: "brand.solid", borderColor: "brand.solid" }}
								_focusVisible={{
									outline: "2px solid",
									outlineColor: "brand.solid",
									outlineOffset: "-3px",
								}}>
								{label}
							</Tab>
						))}
					</TabList>
					<TabPanels>
						<TabPanel px={0} py={{ base: 8, md: 10 }}>
							<Box maxW="680px">
								<Heading as="h2" fontSize={{ base: "28px", md: "36px" }}>
									Web design
								</Heading>
								<P color="text.muted">
									A shared set of visual building blocks for my websites: figures, icons, backgrounds
									and animation.
								</P>
								<H2>Figures &amp; motion</H2>
								<P>
									These examples use my own projects. Hover a node or legend entry to follow a flow.
									Pause and Replay control the animation; reduced motion keeps it still.
								</P>
								<P color="text.muted">
									The figure style grew from OpenAI&apos;s Habitat post and archify&apos;s approach
									to typed figures, adapted to the type and colours I use here.
								</P>
							</Box>
							<UipackDocs />
							{hydrated && router.isReady && category === 0 && <><LazyMount id="objects" eager={objectsLinked} my={{ base: 10, md: 14 }} minH={{ base: "1077px", md: "1088px", xl: "730px" }}><UipackObjects /></LazyMount><UipackWebMotion /><UipackWebGallery /></>}

							<Box maxW="680px">
								<H2>Assets</H2>
								<P>
									Every icon, motion token, background and mark is catalogued with a rendered
									preview, so I can find what I have before I draw it again. Open the{" "}
									<Link href={GALLERY} isExternal>
										asset gallery
									</Link>
									.
								</P>

								<H2>Docs</H2>
								<P>
									The{" "}
									<Link href={DOCS} isExternal>
										docs
									</Link>{" "}
									have the parts, the install steps and the API; the source is on{" "}
									<Link href="https://github.com/ong6/uipack" isExternal>
										GitHub
									</Link>
									.
								</P>
							</Box>
						</TabPanel>
						<TabPanel px={0} py={{ base: 8, md: 10 }}>
							<UipackSlides />
						</TabPanel>
					</TabPanels>
				</Tabs>
				<Grid
					templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
					gap={6}
					mt={8}
					py={6}
					borderTop="1px solid"
					borderBottom="1px solid"
					borderColor="border.subtle">
					<Box>
						<Text fontWeight="700">Same palette</Text>
						<Flex gap={2} mt={3} aria-hidden="true">
							{["page.bg", "page.text", "brand.solid"].map((color) => (
								<Box
									key={color}
									bg={color}
									w="28px"
									h="28px"
									borderRadius="full"
									border="1px solid"
									borderColor="border.subtle"
								/>
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
