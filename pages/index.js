import {
	Box,
	Flex,
	Grid,
	Heading,
	Link,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import SelectedWork from "../components/SelectedWork";

const utilityLinkProps = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: ".04em",
	textDecoration: "underline",
	textUnderlineOffset: "4px",
};

function Eyebrow({ children }) {
	return (
		<Text
			fontFamily="var(--font-mono)"
			fontSize={{ base: "11px", md: "12px" }}
			fontWeight="700"
			letterSpacing=".12em"
			color={useColorModeValue("mint.700", "mint.300")}>
			{children}
		</Text>
	);
}

function Introduction() {
	const portraitBorder = useColorModeValue(
		"rgba(26,36,32,.18)",
		"rgba(230,235,232,.18)"
	);

	return (
		<Box as="section" id="about" scrollMarginTop="96px" pt={{ base: 14, md: 20 }}>
			<Eyebrow>{"// JUNXIONG.DEV / SINGAPORE"}</Eyebrow>

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
						AI infrastructure engineer at TikTok in Singapore. I build backend
						systems for production AI, and a lot of small tools nobody asked for.
					</Text>
					<Text mt={5} maxW="640px" fontSize="16px" lineHeight="1.75" color="text.muted">
						Agent runtimes, tool servers, data products, and the occasional two-day
						experiment. Some of it is work. Most of the rest started because
						something annoyed me enough to write code about it.
					</Text>
					<Flex mt={6} wrap="wrap" columnGap={6} rowGap={3}>
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
						<NextImage
							src="/images/junxiong.webp"
							alt="Ong Jun Xiong, AI infrastructure engineer in Singapore"
							width={768}
							height={768}
							priority
							sizes="(max-width: 48em) 330px, 310px"
							style={{
								width: "100%",
								height: "auto",
								aspectRatio: "4 / 3",
								objectFit: "cover",
								objectPosition: "center 28%",
							}}
						/>
						<Flex mt={3} justify="space-between" color="text.muted" fontFamily="var(--font-mono)" fontSize={{ base: "11px", md: "12px" }}>
							<Text>JX / 2026</Text>
							<Text>SINGAPORE</Text>
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
			<Flex align="baseline" wrap="wrap" columnGap={4} rowGap={1}>
				<Eyebrow>{"// NOW"}</Eyebrow>
				<Text fontFamily="var(--font-mono)" fontSize={{ base: "11px", md: "12px" }} color="text.muted">
					as of 2026-09
				</Text>
			</Flex>
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
						Tennis, a trading journal I actually keep up, and far too much
						reading about home-server hardware I have not bought. I also build
						small tools for decisions I would otherwise wing.
					</Text>
					<Link as={NextLink} href="/hobbies" display="inline-block" mt={4} {...utilityLinkProps}>
						Hobbies →
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
					<Eyebrow>{"// PROJECTS"}</Eyebrow>
					<Heading as="h2" mt={3} mb={{ base: 8, md: 10 }} fontSize={{ base: "34px", md: "46px" }}>
						Stuff I built
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
