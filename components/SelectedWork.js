import {
	Badge,
	Box,
	Flex,
	Grid,
	Heading,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const projects = [
	{
		label: "Production system · TikTok",
		title: "Shared AI platform",
		description:
			"The runtime, tool layer, and frontend SDK that let product teams ship streaming AI workflows without rebuilding the plumbing.",
		stack: ["A2A", "LangGraph", "Go MCP", "React"],
		visual: "platform",
	},
	{
		label: "Open source · Personal",
		title: "Singapore property intelligence",
		description:
			"A decision system that combines official transaction data, algorithmic scoring, and researched qualitative checks for condo analysis.",
		stack: ["Python", "Data pipelines", "AI agents"],
		visual: "property",
		href: "https://github.com/ong6/sg-property-analysis",
		linkLabel: "Explore the repository",
	},
	{
		label: "Founder · Acquired 2025",
		title: "Compoze",
		description:
			"A one-person AI solutions company. I took RAG products from client problem to deployed software before a client acquired the business.",
		stack: ["LlamaIndex", "FastAPI", "Next.js"],
		visual: "compoze",
	},
];

const Node = ({ children, ...props }) => (
	<Box
		border="1px solid"
		borderColor="whiteAlpha.300"
		borderRadius="6px"
		px={2.5}
		py={1.5}
		bg="blackAlpha.400"
		fontSize="10px"
		fontWeight="700"
		letterSpacing="0.04em"
		{...props}>
		{children}
	</Box>
);

function ProjectVisual({ type }) {
	if (type === "property") {
		return (
			<Flex h="118px" align="center" justify="center" gap={3}>
				<Box>
					<Text fontSize="10px" opacity={0.65} textTransform="uppercase">
						condo score
					</Text>
					<Text fontSize="34px" fontWeight="800" lineHeight="1">
						742
					</Text>
				</Box>
				<Box h="52px" borderLeft="1px solid" borderColor="whiteAlpha.300" />
				<Box fontSize="10px" lineHeight="1.8">
					<Text>URA transactions ✓</Text>
					<Text>relative value ✓</Text>
					<Text>agent review ✓</Text>
				</Box>
			</Flex>
		);
	}

	if (type === "compoze") {
		return (
			<Flex h="118px" align="center" justify="center" direction="column">
				<Text fontSize="10px" opacity={0.65} mb={2}>
					CLIENT QUESTION
				</Text>
				<Flex align="center" gap={2}>
					<Node>RAG</Node>
					<Text opacity={0.5}>→</Text>
					<Node>API</Node>
					<Text opacity={0.5}>→</Text>
					<Node>PRODUCT</Node>
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex h="118px" align="center" justify="center" direction="column" gap={2}>
			<Node>AGENT RUNTIME</Node>
			<Box h="12px" borderLeft="1px solid" borderColor="whiteAlpha.400" />
			<Flex align="center" gap={2}>
				<Node>TOOLS</Node>
				<Node>ARTIFACTS</Node>
				<Node>UI SDK</Node>
			</Flex>
		</Flex>
	);
}

function ProjectCard({ project }) {
	const cardBackground = useColorModeValue("rgba(255,255,255,0.42)", "#171a19");
	const borderColor = useColorModeValue("rgba(65,54,45,0.20)", "whiteAlpha.200");
	const visualBackground = useColorModeValue("#25332f", "#0d1110");

	return (
		<Flex
			minW={0}
			direction="column"
			border="1px solid"
			borderColor={borderColor}
			borderRadius="12px"
			overflow="hidden"
			bg={cardBackground}
			transition="transform 180ms ease, border-color 180ms ease"
			_hover={{ transform: "translateY(-3px)", borderColor: "teal.400" }}>
			<Box
				bg={visualBackground}
				color="#cfe8d8"
				fontFamily="'JetBrains Mono', monospace"
				px={4}>
				<ProjectVisual type={project.visual} />
			</Box>
			<Flex direction="column" p={5} flex="1">
				<Text
					fontFamily="'JetBrains Mono', monospace"
					fontSize="10px"
					fontWeight="700"
					letterSpacing="0.08em"
					textTransform="uppercase"
					opacity={0.62}>
					{project.label}
				</Text>
				<Heading as="h4" fontSize="19px" mt={2} mb={3}>
					{project.title}
				</Heading>
				<Text fontSize="14px" lineHeight="1.65" opacity={0.78} flex="1">
					{project.description}
				</Text>
				<Flex wrap="wrap" gap={2} mt={4}>
					{project.stack.map((item) => (
						<Badge key={item} variant="subtle" colorScheme="teal">
							{item}
						</Badge>
					))}
				</Flex>
				{project.href && (
					<Link
						href={project.href}
						target="_blank"
						mt={5}
						fontWeight="700"
						fontSize="14px">
						{project.linkLabel} <ExternalLinkIcon mx="2px" />
					</Link>
				)}
			</Flex>
		</Flex>
	);
}

export default function SelectedWork() {
	return (
		<Box id="selected-work" scrollMarginTop="88px" minW={0}>
			<Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
				{projects.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</Grid>
		</Box>
	);
}
