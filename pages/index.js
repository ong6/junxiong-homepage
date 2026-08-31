import {
	Box,
	Flex,
	Grid,
	Heading,
	Image,
	Link,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import SelectedWork from "../components/SelectedWork";

const utilityLinkProps = {
	fontFamily: "var(--font-mono)",
	fontSize: "11px",
	fontWeight: "700",
	letterSpacing: ".04em",
	textDecoration: "underline",
	textUnderlineOffset: "4px",
};

function Introduction() {
	const portraitBorder = useColorModeValue(
		"rgba(26,36,32,.18)",
		"rgba(230,235,232,.18)"
	);

	return (
		<Box as="section" id="about" scrollMarginTop="96px" pt={{ base: 12, md: 20 }}>
			<Text
				fontFamily="var(--font-mono)"
				fontSize="10px"
				fontWeight="700"
				letterSpacing=".12em"
				color="mint.500">
				{"// JUNXIONG.DEV / SINGAPORE"}
			</Text>

			<Grid
				gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1.35fr) minmax(260px, .65fr)" }}
				gap={{ base: 10, md: 14, lg: 20 }}
				alignItems="end"
				mt={5}>
				<Box maxW="720px">
					<Heading
						as="h1"
						fontSize={{ base: "46px", smmd: "58px", lg: "74px" }}
						lineHeight=".98"
						letterSpacing="-.06em">
						Ong Jun Xiong
					</Heading>
					<Text
						mt={5}
						fontSize={{ base: "19px", md: "23px" }}
						lineHeight="1.45"
						fontWeight="650">
						AI infrastructure engineer at TikTok. I make reliable systems and
						small tools for problems I cannot leave alone.
					</Text>
					<Text mt={5} maxW="640px" fontSize="16px" lineHeight="1.75" color="text.muted">
						Most of my work sits somewhere between backend infrastructure and the
						people using it: agent runtimes, tool servers, data products, and the
						occasional two-day experiment. This is where I keep the things I have made.
					</Text>
					<Flex mt={6} wrap="wrap" gapX={6} gapY={3}>
						<Link href="https://github.com/ong6" target="_blank" rel="noopener noreferrer" {...utilityLinkProps}>
							GitHub ↗
						</Link>
						<Link as={NextLink} href="/resume" {...utilityLinkProps}>
							Résumé
						</Link>
						<Link href="mailto:junxiongong2@gmail.com" {...utilityLinkProps}>
							Email
						</Link>
					</Flex>
				</Box>

				<Box justifySelf={{ md: "end" }} w="100%" maxW={{ base: "330px", md: "310px" }}>
					<Box border="1px solid" borderColor={portraitBorder} bg="surface.raised" p={3} transform={{ md: "rotate(1.5deg)" }}>
						<Image
							src="/images/junxiong.webp"
							alt="Ong Jun Xiong, AI infrastructure engineer in Singapore"
							w="100%"
							aspectRatio="4 / 3"
							objectFit="cover"
							objectPosition="center 28%"
							loading="eager"
							fetchPriority="high"
						/>
						<Flex mt={3} justify="space-between" color="text.muted" fontFamily="var(--font-mono)" fontSize="9px">
							<Text>JX / 2026</Text>
							<Text>ENGINEER + BUILDER</Text>
						</Flex>
					</Box>
				</Box>
			</Grid>
		</Box>
	);
}

function Now() {
	return (
		<Box id="now" scrollMarginTop="96px" pt={{ base: 20, md: 28 }}>
			<Text
				fontFamily="var(--font-mono)"
				fontSize="10px"
				fontWeight="700"
				letterSpacing=".12em"
				color="mint.500">
				{"// NOW"}
			</Text>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 16 }} mt={5}>
				<Box>
					<Heading as="h2" fontSize={{ base: "25px", md: "31px" }}>At work</Heading>
					<Text mt={3} color="text.muted" fontSize="15px" lineHeight="1.75">
						I build shared AI infrastructure at TikTok in Singapore: an A2A and
						LangGraph runtime, a Go MCP server, a React chat SDK, and the backend
						systems around them.
					</Text>
					<Link as={NextLink} href="/resume" display="inline-block" mt={4} {...utilityLinkProps}>
						Work history →
					</Link>
				</Box>
				<Box>
					<Heading as="h2" fontSize={{ base: "25px", md: "31px" }}>Away from work</Heading>
					<Text mt={3} color="text.muted" fontSize="15px" lineHeight="1.75">
						I play tennis, keep a written trading journal, overthink home-server
						hardware, and build software for decisions I would otherwise make badly.
					</Text>
					<Link as={NextLink} href="/hobbies" display="inline-block" mt={4} {...utilityLinkProps}>
						The non-work page →
					</Link>
				</Box>
			</SimpleGrid>
		</Box>
	);
}

export default function Home() {
	return (
		<Layout>
			<Introduction />

			<Section>
				<Box id="work" scrollMarginTop="96px" pt={{ base: 20, md: 28 }}>
					<Text
						fontFamily="var(--font-mono)"
						fontSize="10px"
						fontWeight="700"
						letterSpacing=".12em"
						color="mint.500">
						{"// SELECTED PROJECTS"}
					</Text>
					<Heading as="h2" mt={3} mb={{ base: 7, md: 10 }} fontSize={{ base: "34px", md: "46px" }}>
						Things I have made.
					</Heading>
					<SelectedWork />
				</Box>
			</Section>

			<Section>
				<Now />
			</Section>
		</Layout>
	);
}
