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
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSyncExternalStore } from "react";
import UipackSlides from "../components/UipackSlides";
import Layout from "../components/layouts/Articles";
// Load the animated gallery only after the selected category is known.
const UipackWebGallery = dynamic(() => import("../components/UipackWebGallery"), {
	loading: () => (
		<Text py={8} color="text.muted">
			Loading figures…
		</Text>
	),
});

const UipackObjects = dynamic(() => import("../components/UipackObjects"));

const P = (props) => (
	<Text mt={5} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" {...props} />
);
const H2 = (props) => (
	<Heading as="h2" mt={{ base: 12, md: 16 }} fontSize={{ base: "22px", md: "24px" }} {...props} />
);
const Code = (props) => <Box as="code" fontFamily="var(--font-mono)" fontSize="0.9em" {...props} />;
const subscribeToHydration = () => () => {};

export default function Uipack() {
	const accent = useColorModeValue("mint.700", "mint.300");
	const router = useRouter();
	const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
	const category = router.query.category === "slides" ? 1 : 0;
	const changeCategory = (index) => {
		router.push({ pathname: "/uipack", query: { category: index ? "slides" : "web" } }, undefined, {
			shallow: true,
			scroll: false,
		});
	};

	return (
		<Layout
			title="UI Pack"
			schema={{
				type: "SoftwareSourceCode",
				codeRepository: "https://github.com/ong6/uipack",
				programmingLanguage: "TypeScript",
				license: "https://opensource.org/licenses/MIT",
			}}
			description="UI Pack brings reusable web design, animation and presentation systems into one place, including slide layouts and the words used to present them.">
			<Container maxW="1088px" px={0} ml={0}>
				<Box maxW="680px" pt={{ base: 10, md: 16 }}>
					<Link
						as={NextLink}
						href="/"
						display="inline-flex"
						alignItems="center"
						minH="32px"
						my={-1.5}
						fontSize="13px"
						fontWeight="700">
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
						{"// design across projects"}
					</Text>

					<Heading
						as="h1"
						mt={3}
						fontSize={{ base: "40px", md: "52px" }}
						lineHeight="1"
						letterSpacing="-.045em">
						UI Pack
					</Heading>

					<Text
						mt={4}
						color={accent}
						fontFamily="var(--font-mono)"
						fontSize="11px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase">
						2026 · open source · react + svg
					</Text>

					<Text mt={8} fontSize={{ base: "19px", md: "21px" }} lineHeight="1.6" fontWeight="600">
						The pack for the UI I keep making: websites, animations and slides. I want my projects
						and presentations to share a style, without deciding on type, colours and spacing every
						time.
					</Text>
					<P color="text.muted">
						It started with the diagrams on this site. I&apos;m building it out in two directions:
						web design for my projects, and presentations for the things I need to explain. The
						first slide starters now keep the visual and the talk track together.
					</P>
					<Link
						href="https://github.com/ong6/uipack"
						isExternal
						display="inline-flex"
						alignItems="center"
						minH="44px"
						mt={3}
						fontWeight="600">
						Source on GitHub
					</Link>
				</Box>

				<Tabs
					id="uipack-categories"
					index={category}
					onChange={changeCategory}
					isLazy
					lazyBehavior="unmount"
					mt={{ base: 8, md: 12 }}
					colorScheme="mint">
					<TabList aria-label="UI Pack categories" borderColor="border.subtle">
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
									A shared set of visual building blocks for my websites. The working library covers
									figures, icons, backgrounds and animation; reusable page layouts are the next
									layer.
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
							{hydrated && router.isReady && category === 0 && <><UipackObjects /><UipackWebGallery /></>}

							<Box maxW="680px">
								<H2>Assets</H2>
								<P>
									Every part, icon, motion token, background and mark is catalogued with a rendered
									preview and a copy action, so I can find what I have before I draw it again. Open
									the{" "}
									<Link as={NextLink} href="/assets">
										asset browser
									</Link>
									.
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
							Paper, ink and mint. Light and dark.
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
						<Text mt={2} fontSize="15px" lineHeight="1.7" color="text.muted">
							Clear hierarchy, room to read, and motion that explains what changed.
						</Text>
					</Box>
				</Grid>
			</Container>
		</Layout>
	);
}
