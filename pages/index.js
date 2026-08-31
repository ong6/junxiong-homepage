import {
	Box,
	Button,
	Flex,
	Image,
	Link,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiArrowUpRight, FiDownload, FiMail } from "react-icons/fi";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import SelectedWork from "../components/SelectedWork";
import TerminalHero from "../components/TerminalHero";
import TermHeading from "../components/TermHeading";
import Timeline from "../components/Timeline";

const proof = [
	{
		label: "Platform",
		value: "Built from zero",
		detail: "Agent runtime, Go MCP server, and React SDK",
	},
	{
		label: "Adoption",
		value: "In daily use",
		detail: "Operations teams across the US, Southeast Asia, and UK",
	},
	{
		label: "Backend reach",
		value: "13+ markets",
		detail: "Promotion and analytics systems on Go, gRPC, and OLAP",
	},
	{
		label: "Founder signal",
		value: "Client-acquired",
		detail: "Ran Compoze from discovery through deployment and training",
	},
];

const experience = [
	{
		period: "Oct 2025 – now",
		title: "TikTok · AI Infrastructure Engineer",
		blurb:
			"Promoted after 18 months across promotion, creator, and seller systems. Built the team's shared agent platform from zero: an A2A and LangGraph runtime, a Go MCP server, and a React chat SDK other product teams build on.",
	},
	{
		period: "Apr 2024 – Oct 2025",
		title: "TikTok · Software Engineer",
		blurb:
			"Built Go and gRPC promotion backends, creator systems, and seller analytics on ClickHouse and Hive, serving campaigns across more than 13 markets.",
	},
	{
		period: "2025",
		tag: "alongside TikTok",
		title: "Compoze · Founder",
		blurb:
			"Ran a one-person AI solutions company from customer discovery and pricing through product delivery and training. One of its clients acquired the company at the end of 2025.",
	},
	{
		period: "before TikTok",
		title: "Client engineering, fintech, and product",
		blurb:
			"Thought Machine, Binance, Tanso, and DBS. Computer Science (Honours) at NUS, including teaching software engineering and leading the Fintech Society.",
	},
];

const skills = [
	{
		label: "AI systems",
		items: "Agent runtimes · MCP · A2A · LangGraph · LlamaIndex · RAG",
	},
	{
		label: "Backend",
		items: "Go · TypeScript · Python · gRPC · Kafka · Redis · distributed systems",
	},
	{
		label: "Data & infra",
		items: "MySQL · PostgreSQL · ClickHouse · Hive · Docker · Kubernetes · AWS",
	},
	{
		label: "Product delivery",
		items: "React · Next.js · technical scoping · client training · cross-region rollout",
	},
];

function ProofLedger() {
	return (
		<SimpleGrid
			columns={{ base: 1, smmd: 2, lg: 4 }}
			borderY="1px solid"
			borderColor="border.subtle">
			{proof.map((item, index) => (
				<Box
					key={item.label}
					py={{ base: 5, md: 6 }}
					px={{ base: 0, smmd: 5 }}
					borderLeftWidth={{
						base: 0,
						smmd: index % 2 === 0 ? 0 : "1px",
						lg: index === 0 ? 0 : "1px",
					}}
					borderTopWidth={{
						base: index === 0 ? 0 : "1px",
						smmd: index > 1 ? "1px" : 0,
						lg: 0,
					}}
					borderColor="border.subtle">
					<Text
						fontFamily="var(--font-mono)"
						fontSize="9px"
						fontWeight="700"
						letterSpacing=".11em"
						textTransform="uppercase"
						color="text.muted">
						{item.label}
					</Text>
					<Text mt={2} fontSize={{ base: "21px", md: "23px" }} fontWeight="750" letterSpacing="-.03em">
						{item.value}
					</Text>
					<Text mt={2} maxW="240px" fontSize="13px" lineHeight="1.55" color="text.muted">
						{item.detail}
					</Text>
				</Box>
			))}
		</SimpleGrid>
	);
}

function About() {
	const portraitBorder = useColorModeValue(
		"rgba(26,36,32,.16)",
		"rgba(230,235,232,.18)"
	);

	return (
		<SimpleGrid
			columns={{ base: 1, md: 2 }}
			gap={{ base: 9, md: 14, lg: 20 }}
			alignItems="center">
			<Box maxW="650px">
				<TermHeading kicker="How I work">
					Infrastructure that reaches the user.
				</TermHeading>
				<Text
					mt={6}
					fontSize={{ base: "16px", md: "18px" }}
					lineHeight="1.78"
					color="text.muted">
					I like the layer where infrastructure becomes a product. That means
					working from ambiguous operational problems through protocols,
					services, data, interfaces, and adoption, then staying close enough
					to see where the system breaks in real use.
				</Text>
				<Text
					mt={4}
					fontSize={{ base: "16px", md: "18px" }}
					lineHeight="1.78"
					color="text.muted">
					Outside work I build tools for problems I actually have, play tennis,
					and keep a written trading journal. The common thread is short
					feedback loops and evidence over opinion.
				</Text>
			</Box>
			<Box justifySelf={{ md: "end" }}>
				<Box
					position="relative"
					maxW={{ base: "360px", md: "390px" }}
					border="1px solid"
					borderColor={portraitBorder}
					bg="surface.raised"
					p={3}>
					<Image
						src="/images/junxiong.webp"
						alt="Ong Jun Xiong"
						w="100%"
						aspectRatio="4 / 3"
						objectFit="cover"
						objectPosition="center 28%"
						loading="lazy"
					/>
					<Flex
						justify="space-between"
						mt={3}
						fontFamily="var(--font-mono)"
						fontSize="9px"
						color="text.muted">
						<Text>SINGAPORE</Text>
						<Text>ENGINEER / BUILDER</Text>
					</Flex>
				</Box>
			</Box>
		</SimpleGrid>
	);
}

export default function Home() {
	return (
		<Layout>
			<TerminalHero />

			<Section>
				<ProofLedger />
			</Section>

			<Section>
				<Box id="work" scrollMarginTop="96px" pt={{ base: 20, md: 28 }}>
					<Box maxW="720px" mb={{ base: 5, md: 8 }}>
						<TermHeading kicker="Selected work">
							Evidence, not a project wall.
						</TermHeading>
						<Text
							mt={5}
							fontSize={{ base: "16px", md: "18px" }}
							lineHeight="1.7"
							color="text.muted">
							Three systems that show how I think: deterministic AI
							infrastructure, a data-heavy decision product, and customer
							delivery from first call to production.
						</Text>
					</Box>
					<SelectedWork />
				</Box>
			</Section>

			<Section>
				<Box
					id="experience"
					scrollMarginTop="96px"
					pt={{ base: 20, md: 28 }}>
					<Flex
						direction={{ base: "column", smmd: "row" }}
						justify="space-between"
						align={{ smmd: "flex-end" }}
						gap={4}
						mb={9}>
						<TermHeading kicker="Experience">
							Production systems and customer range.
						</TermHeading>
						<Link
							as={NextLink}
							href="/resume"
							fontSize="14px"
							fontWeight="700">
							Full résumé →
						</Link>
					</Flex>
					<Box maxW="820px">
						<Timeline items={experience} />
					</Box>
				</Box>
			</Section>

			<Section>
				<Box pt={{ base: 20, md: 28 }}>
					<TermHeading kicker="Technical spine">
						Depth before keyword count.
					</TermHeading>
					<SimpleGrid columns={{ base: 1, md: 2 }} gapX={14} gapY={0} mt={7}>
						{skills.map((row) => (
							<Box
								key={row.label}
								py={5}
								borderTop="1px solid"
								borderColor="border.subtle">
								<Text fontWeight="750" fontSize="15px">
									{row.label}
								</Text>
								<Text mt={2} fontSize="14px" lineHeight="1.7" color="text.muted">
									{row.items}
								</Text>
							</Box>
						))}
					</SimpleGrid>
				</Box>
			</Section>

			<Section>
				<Box id="about" scrollMarginTop="96px" pt={{ base: 20, md: 28 }}>
					<About />
				</Box>
			</Section>

			<Section>
				<Box
					id="contact"
					scrollMarginTop="96px"
					mt={{ base: 20, md: 28 }}
					px={{ base: 6, md: 10 }}
					py={{ base: 9, md: 12 }}
					bg="graphite.900"
					color="warm.50"
					border="1px solid"
					borderColor="graphite.700">
					<Text
						fontFamily="var(--font-mono)"
						fontSize="10px"
						fontWeight="700"
						letterSpacing=".12em"
						color="mint.300">
						START A CONVERSATION
					</Text>
					<Text
						mt={4}
						maxW="760px"
						fontSize={{ base: "30px", md: "45px" }}
						lineHeight="1.12"
						fontWeight="750"
						letterSpacing="-.04em">
						Building serious AI infrastructure or backend platforms?
					</Text>
					<Text
						mt={4}
						maxW="690px"
						fontSize={{ base: "15px", md: "17px" }}
						lineHeight="1.7"
						color="graphite.200">
						I am interested in AI infrastructure, backend platform, and
						forward-deployed engineering roles in Singapore.
					</Text>
					<Stack direction={{ base: "column", smmd: "row" }} spacing={3} mt={7}>
						<Button
							as="a"
							href="mailto:junxiongong2@gmail.com"
							leftIcon={<FiMail />}
							bg="mint.300"
							color="graphite.900"
							_hover={{ bg: "mint.200", transform: "translateY(-2px)" }}>
							Email me
						</Button>
						<Button
							as="a"
							href="/resume/Ong-Jun-Xiong-Resume.pdf"
							download
							leftIcon={<FiDownload />}
							variant="outline"
							borderColor="graphite.500"
							color="warm.50"
							_hover={{ bg: "graphite.800", transform: "translateY(-2px)" }}>
							Download résumé
						</Button>
						<Button
							as="a"
							href="https://www.linkedin.com/in/junx6/"
							target="_blank"
							rel="noopener noreferrer"
							rightIcon={<FiArrowUpRight />}
							variant="ghost"
							color="warm.50"
							_hover={{ bg: "graphite.800" }}>
							LinkedIn
						</Button>
					</Stack>
				</Box>
			</Section>
		</Layout>
	);
}
