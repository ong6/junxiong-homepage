import {
	Box,
	Flex,
	Grid,
	Heading,
	Link,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import codePartyImage from "../public/images/works/codeparty_03.webp";
import handsfreeImage from "../public/images/works/handsfree-card.webp";
import nusConnectImage from "../public/images/works/nusconnect_01.webp";

const tagStyle = {
	fontFamily: "var(--font-mono)",
	fontSize: { base: "11px", md: "10px" },
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase",
};

function ProjectHeading({ href, external, children }) {
	const heading = (
		<Heading as="h3" fontSize={{ base: "27px", md: "32px" }} lineHeight="1.08">
			{children}
		</Heading>
	);

	if (!href) return heading;

	return (
		<LinkOverlay
			as={external ? undefined : NextLink}
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}>
			{heading}
		</LinkOverlay>
	);
}

function ProjectCard({ children, span, bg, color = "page.text", minH = "440px" }) {
	return (
		<LinkBox
			as="article"
			gridColumn={{ base: "1 / -1", md: `span ${span}` }}
			minH={{ base: "auto", md: minH }}
			bg={bg}
			color={color}
			border="1px solid"
			borderColor="border.subtle"
			overflow="hidden"
			display="flex"
			flexDirection="column"
			transition="transform 180ms ease, box-shadow 180ms ease"
			_hover={{
				transform: "translateY(-4px)",
				boxShadow: "0 24px 56px -36px rgba(0,0,0,.8)",
			}}>
			{children}
		</LinkBox>
	);
}

function GroundplaneCard() {
	return (
		<ProjectCard span={7} bg="#101A16" color="#E6EBE8" minH="520px">
			<Box p={{ base: 6, md: 8 }} pb={4}>
				<Flex justify="space-between" gap={4} color="#71DCB2" sx={tagStyle}>
					<Text>Open source · 2026</Text>
					<Text>Python</Text>
				</Flex>
				<Box mt={4}>
					<ProjectHeading href="/groundplane">Groundplane</ProjectHeading>
				</Box>
				<Text mt={3} maxW="570px" color="#A5B3AD" fontSize="15px" lineHeight="1.7">
					A deterministic boundary for agent output. Tool results become typed
					facts, and any ranking, total or relationship those facts do not support
					gets blocked before it reaches the user.
				</Text>
			</Box>

			<Box mt="auto" px={{ base: 6, md: 8 }} pb={{ base: 6, md: 8 }}>
				<Box border="1px solid #34443C" bg="#08100C" p={{ base: 4, md: 5 }}>
					<Flex
						justify="space-between"
						fontFamily="var(--font-mono)"
						fontSize="10px"
						color="#7D9187">
						<Text>groundplane / boundary.py</Text>
						<Text>169 tests</Text>
					</Flex>
					<Box mt={5} fontFamily="var(--font-mono)" fontSize={{ base: "10px", md: "12px" }} lineHeight="1.9">
						<Text color="#A5B3AD">reg.record_ranking(&quot;campaign_ctr&quot;, rows, key=&quot;ctr&quot;, ...)</Text>
						<Text color="#E6EBE8">with boundary(reg, facts=[...], checks=[superlative(...)]) as b:</Text>
						<Text color="#E6EBE8" pl={4}>{'b.submit({"winner": "north"})'}</Text>
						<Text color="#F09A8E">UnsupportedClaim: registered facts support &apos;harbour&apos;</Text>
					</Box>
				</Box>
				<Flex mt={4} wrap="wrap" columnGap={4} rowGap={1} color="#7D9187" sx={tagStyle}>
					<Text>Argmax</Text>
					<Text>Order</Text>
					<Text>Aggregate</Text>
					<Text>Entity</Text>
					<Text>Row</Text>
				</Flex>
			</Box>
		</ProjectCard>
	);
}

function PropertyCard() {
	const tracks = "rgba(16,35,60,.11)";
	return (
		<ProjectCard span={5} bg="#DDEAF5" color="#10233C" minH="520px">
			<Box p={{ base: 6, md: 8 }}>
				<Flex justify="space-between" gap={4} color="#3B6087" sx={tagStyle}>
					<Text>Personal tool · 2026</Text>
					<Text>Data + agents</Text>
				</Flex>
				<Box mt={4}>
					<ProjectHeading href="https://github.com/ong6/sg-property-analysis" external>
						Property intelligence ↗
					</ProjectHeading>
				</Box>
				<Text mt={3} color="#3B526C" fontSize="15px" lineHeight="1.7">
					Scores Singapore property listings against official transactions, cost models
					and agent research. I built it because comparing units by hand in a
					spreadsheet was miserable.
				</Text>
			</Box>

			<Box mt="auto" mx={{ base: 6, md: 8 }} mb={{ base: 6, md: 8 }} bg="#F7FBFE" border="1px solid rgba(16,35,60,.15)" p={5}>
				<Flex justify="space-between" align="end" pb={4} borderBottom="1px solid rgba(16,35,60,.15)">
					<Box>
						<Text sx={tagStyle} color="#536C86">Sample report</Text>
						<Text mt={1} fontSize="18px" fontWeight="750">Comparable unit</Text>
					</Box>
					<Box bg="#255B89" color="white" px={3} py={1.5} sx={tagStyle}>Buy</Box>
				</Flex>
				<Stack spacing={4} mt={5}>
					{[
						["relative value", "78%"],
						["liquidity", "64%"],
						["hold fit", "86%"],
					].map(([label, width]) => (
						<Box key={label}>
							<Flex justify="space-between" color="#536C86" sx={tagStyle} mb={1.5}>
								<Text>{label}</Text>
								<Text>{width}</Text>
							</Flex>
							<Box h="6px" bg={tracks}>
								<Box h="100%" w={width} bg="#3D79A8" />
							</Box>
						</Box>
					))}
				</Stack>
			</Box>
		</ProjectCard>
	);
}

function CompozeCard() {
	return (
		<ProjectCard span={5} bg="#F0DCCF" color="#342119" minH="430px">
			<Box p={{ base: 6, md: 8 }}>
				<Flex justify="space-between" gap={4} color="#7A4936" sx={tagStyle}>
					<Text>Company · 2025</Text>
					<Text>Sold to a client</Text>
				</Flex>
				<Box mt={4}>
					<ProjectHeading href="/compoze">Compoze</ProjectHeading>
				</Box>
				<Text mt={3} color="#684737" fontSize="15px" lineHeight="1.7">
					A one-person AI studio I ran alongside TikTok. I did the selling and the
					pricing, built the document-grounded assistants, shipped them, and then
					sat with clients until they could use the thing without me.
				</Text>
			</Box>

			<Grid mt="auto" templateColumns="repeat(3, 1fr)" borderTop="1px solid rgba(52,33,25,.16)">
				{[
					["knowledge", "LlamaIndex"],
					["service", "FastAPI"],
					["interface", "Next.js"],
				].map(([label, value], index) => (
					<Box
						key={label}
						p={{ base: 3, md: 4 }}
						borderLeft={index ? "1px solid rgba(52,33,25,.16)" : undefined}>
						<Text color="#7A4936" sx={tagStyle}>{label}</Text>
						<Text mt={2} fontSize={{ base: "11px", md: "13px" }} fontWeight="700">{value}</Text>
					</Box>
				))}
			</Grid>
		</ProjectCard>
	);
}

function HandsfreeCard() {
	return (
		<ProjectCard span={7} bg="#E7E2F4" color="#28213E" minH="430px">
			<Box position="relative" minH={{ base: "250px", md: "290px" }} bg="#181421" overflow="hidden">
				<Image
					src={handsfreeImage}
					alt="YouTube Handsfree gesture controls"
					fill
					sizes="(max-width: 768px) 100vw, 58vw"
					style={{ objectFit: "cover", objectPosition: "center" }}
				/>
			</Box>
			<Box p={{ base: 6, md: 8 }}>
				<Text color="#675C89" sx={tagStyle}>Two-day hackathon · computer vision</Text>
				<Box mt={3}>
					<ProjectHeading href="/works/youtubehandsfree">YouTube Handsfree</ProjectHeading>
				</Box>
				<Text mt={3} color="#5A526E" fontSize="15px" lineHeight="1.7">
					Chrome extension that pauses and seeks YouTube with hand signs.
				</Text>
			</Box>
		</ProjectCard>
	);
}

const archiveProjects = [
	{
		title: "CodeParty",
		year: "2023",
		description: "Interview practice with a collaborative editor, built as a distributed system.",
		href: "/works/codeparty",
		image: codePartyImage,
		position: "center",
	},
	{
		title: "NUSConnect",
		year: "2021",
		description: "Gamified, accessible learning platform. Our NUS Orbital project.",
		href: "/works/nusconnect",
		image: nusConnectImage,
		position: "top",
	},
];

function ArchiveCard({ project }) {
	return (
		<LinkBox as="article" border="1px solid" borderColor="border.subtle" bg="surface.raised" overflow="hidden">
			<Box position="relative" aspectRatio="16 / 10" bg="surface.quiet" overflow="hidden">
				<Image
					src={project.image}
					alt={`${project.title} interface`}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					style={{ objectFit: "cover", objectPosition: project.position }}
				/>
			</Box>
			<Box p={5}>
				<Flex justify="space-between" align="baseline" gap={3}>
					<LinkOverlay as={NextLink} href={project.href} fontSize="18px" fontWeight="750">
						{project.title}
					</LinkOverlay>
					<Text color="text.muted" sx={tagStyle}>{project.year}</Text>
				</Flex>
				<Text mt={2} color="text.muted" fontSize="13px" lineHeight="1.6">
					{project.description}
				</Text>
			</Box>
		</LinkBox>
	);
}

export default function SelectedWork() {
	const quietLabel = useColorModeValue("graphite.500", "graphite.300");

	return (
		<Box>
			<Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ base: 5, md: 6 }}>
				<GroundplaneCard />
				<PropertyCard />
				<CompozeCard />
				<HandsfreeCard />
			</Grid>

			<Flex mt={{ base: 14, md: 20 }} mb={5} justify="space-between" align="end" gap={5}>
				<Box>
					<Text color={quietLabel} sx={tagStyle}>2021 – 2023</Text>
					<Heading as="h3" mt={2} fontSize={{ base: "24px", md: "29px" }}>Older projects</Heading>
				</Box>
				<Link as={NextLink} href="/works" fontSize="13px" fontWeight="700">
					All university projects →
				</Link>
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				{archiveProjects.map((project) => (
					<ArchiveCard key={project.title} project={project} />
				))}
			</SimpleGrid>
		</Box>
	);
}
