import {
	Box,
	Flex,
	Heading,
	Link,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const projects = [
	{
		key: "groundplane",
		eyebrow: "Open source · v0 in development",
		title: "Groundplane",
		intro:
			"A deterministic boundary for agent output: tool results become typed facts, and unsupported model claims fail loudly.",
		problem:
			"An agent can call the right tools and still name the wrong winner, invent a total, or swap values between rows.",
		ownership:
			"Designed and built the dependency-free Python core, five relational check families, CI, and optional LangGraph and MCP adapters.",
		outcome:
			"93 tests run across Python 3.10–3.13. Wrong rankings, aggregates, entities, and row relationships raise before output ships.",
		stack: "Python · LangGraph · MCP · CI",
		href: "https://github.com/ong6/groundplane",
		linkLabel: "Explore the repository",
		visual: "groundplane",
	},
	{
		key: "property",
		eyebrow: "Personal data product · 2026",
		title: "Singapore property intelligence",
		intro:
			"A repeatable decision system for a noisy, high-stakes home search, built from listing data, official transactions, and structured research.",
		problem:
			"Comparable sales, investment costs, listing quality, and qualitative risks lived across incompatible sources.",
		ownership:
			"Built the ingestion, official URA-data enrichment, MMR scoring, agent-research workflow, evaluation memory, and local interfaces.",
		outcome:
			"The pipeline produces a traceable Buy, Neutral, or Avoid report while keeping algorithmic evidence separate from agent judgment.",
		stack: "Python · Data pipelines · Browser automation · AI agents",
		href: "https://github.com/ong6/sg-property-analysis",
		linkLabel: "Explore the repository",
		visual: "property",
	},
	{
		key: "compoze",
		eyebrow: "Founder · acquired by a client · 2025",
		title: "Compoze",
		intro:
			"A one-person AI solutions company delivering document-grounded assistants to business customers.",
		problem:
			"Customers needed useful AI over private knowledge, integrated and deployed as a product rather than a demo.",
		ownership:
			"Owned discovery, scoping, pricing, product engineering, deployment, and customer training end to end alongside my TikTok role.",
		outcome:
			"Built the RAG product on FastAPI, LlamaIndex, and Next.js. One of its clients acquired the company at the end of 2025.",
		stack: "FastAPI · LlamaIndex · Next.js · Fly.io",
		visual: "compoze",
	},
];

function GroundplaneVisual() {
	const muted = useColorModeValue("graphite.500", "graphite.300");
	const activeCellBg = useColorModeValue("mint.50", "rgba(113,220,178,.08)");
	const activeCellColor = useColorModeValue("mint.800", "mint.200");
	return (
		<Box aria-hidden="true" h="100%" minH="252px" display="flex" flexDirection="column" justifyContent="center">
			<Flex align="center" gap={2} fontFamily="var(--font-mono)" fontSize="10px">
				{["tool results", "typed facts", "boundary"].map((item, index) => (
					<Flex key={item} align="center" gap={2} minW={0} flex={index === 1 ? 1 : "initial"}>
						<Box
							px={2.5}
							py={2}
							border="1px solid"
							borderColor={index === 2 ? "mint.400" : "border.subtle"}
							bg={index === 2 ? activeCellBg : "surface.raised"}
							color={index === 2 ? activeCellColor : muted}
							whiteSpace="nowrap">
							{item}
						</Box>
						{index < 2 && <Text color={muted}>→</Text>}
					</Flex>
				))}
			</Flex>
			<Box mt={5} p={4} bg="#08100C" border="1px solid #34443C" boxShadow="inset 0 0 28px rgba(0,0,0,.7)">
				<Text fontFamily="var(--font-mono)" fontSize="10px" color="#A5B3AD">
					claim.winner
				</Text>
				<Flex mt={2} justify="space-between" gap={3} fontFamily="var(--font-mono)" fontSize="11px">
					<Text color="#F09A8E">model: north</Text>
					<Text color="#71DCB2">facts: harbour</Text>
				</Flex>
				<Box mt={3} pt={3} borderTop="1px solid rgba(113,220,178,.16)">
					<Text fontFamily="var(--font-mono)" fontSize="10px" color="#F09A8E">
						× UnsupportedClaim · output blocked
					</Text>
				</Box>
			</Box>
			<Flex mt={4} gap={2} wrap="wrap">
				{["ARGMAX", "ORDER", "TOTAL", "ENTITY", "ROW"].map((check) => (
					<Box
						key={check}
						fontFamily="var(--font-mono)"
						fontSize="9px"
						letterSpacing=".08em"
						color="text.muted">
						✓ {check}
					</Box>
				))}
			</Flex>
		</Box>
	);
}

function PropertyVisual() {
	const tracks = useColorModeValue("rgba(26,36,32,.09)", "rgba(230,235,232,.08)");
	const rows = [
		["relative value", "78%"],
		["liquidity", "64%"],
		["hold fit", "86%"],
	];

	return (
		<Box aria-hidden="true" minH="252px" display="flex" flexDirection="column" justifyContent="center">
			<Flex justify="space-between" align="flex-end" pb={3} borderBottom="1px solid" borderColor="border.subtle">
				<Box>
					<Text fontFamily="var(--font-mono)" fontSize="9px" color="text.muted" letterSpacing=".08em">
						DECISION PIPELINE / SAMPLE
					</Text>
					<Text mt={1} fontWeight="700" fontSize="16px">Comparable unit</Text>
				</Box>
				<Box px={3} py={1.5} bg="mint.600" color="white" fontFamily="var(--font-mono)" fontSize="10px" fontWeight="700">
					BUY
				</Box>
			</Flex>
			<Stack spacing={4} mt={5}>
				{rows.map(([label, width], index) => (
					<Box key={label}>
						<Flex justify="space-between" fontFamily="var(--font-mono)" fontSize="10px" color="text.muted" mb={1.5}>
							<Text>{label}</Text>
							<Text>{["URA + peer sales", "transactions", "cost model"][index]}</Text>
						</Flex>
						<Box h="5px" bg={tracks}>
							<Box h="100%" w={width} bg={index === 2 ? "mint.400" : "mint.600"} />
						</Box>
					</Box>
				))}
			</Stack>
			<Flex mt={5} pt={4} borderTop="1px solid" borderColor="border.subtle" gap={2} align="center">
				<Text fontFamily="var(--font-mono)" fontSize="9px" color="mint.500">ALGO</Text>
				<Text color="text.muted">→</Text>
				<Text fontFamily="var(--font-mono)" fontSize="9px" color="mint.500">RESEARCH</Text>
				<Text color="text.muted">→</Text>
				<Text fontFamily="var(--font-mono)" fontSize="9px" color="mint.500">VERDICT</Text>
			</Flex>
		</Box>
	);
}

function CompozeVisual() {
	const steps = ["discover", "scope", "build", "deploy", "train"];
	const acquisitionBg = useColorModeValue("graphite.800", "mint.300");
	const acquisitionColor = useColorModeValue("warm.50", "graphite.900");
	return (
		<Box aria-hidden="true" minH="252px" display="flex" flexDirection="column" justifyContent="center">
			<Box position="relative" py={5}>
				<Box position="absolute" left="8%" right="8%" top="50%" h="1px" bg="border.subtle" />
				<Flex position="relative" justify="space-between">
					{steps.map((step, index) => (
						<Box key={step} textAlign="center">
							<Box
								w={{ base: "26px", smmd: "32px" }}
								h={{ base: "26px", smmd: "32px" }}
								mx="auto"
								display="grid"
								placeItems="center"
								bg={index === steps.length - 1 ? "mint.500" : "surface.raised"}
								color={index === steps.length - 1 ? "white" : "text.muted"}
								border="1px solid"
								borderColor={index === steps.length - 1 ? "mint.500" : "border.subtle"}
								fontFamily="var(--font-mono)"
								fontSize="9px">
								{index + 1}
							</Box>
							<Text mt={2} fontFamily="var(--font-mono)" fontSize={{ base: "8px", smmd: "9px" }} color="text.muted">
								{step}
							</Text>
						</Box>
					))}
				</Flex>
			</Box>
			<SimpleGrid columns={3} gap={2} mt={4}>
				{[
					["KNOWLEDGE", "LlamaIndex"],
					["SERVICE", "FastAPI"],
					["INTERFACE", "Next.js"],
				].map(([label, value]) => (
					<Box key={label} p={{ base: 2, smmd: 3 }} bg="surface.raised" border="1px solid" borderColor="border.subtle">
						<Text fontFamily="var(--font-mono)" fontSize="8px" color="text.muted">{label}</Text>
						<Text mt={1} fontSize={{ base: "10px", smmd: "12px" }} fontWeight="700">{value}</Text>
					</Box>
				))}
			</SimpleGrid>
			<Flex mt={4} px={3} py={2.5} bg={acquisitionBg} color={acquisitionColor} justify="space-between" fontFamily="var(--font-mono)" fontSize="9px">
				<Text>END-TO-END OWNERSHIP</Text>
				<Text>ACQUIRED 2025</Text>
			</Flex>
		</Box>
	);
}

const visuals = {
	groundplane: GroundplaneVisual,
	property: PropertyVisual,
	compoze: CompozeVisual,
};

function Detail({ label, children }) {
	return (
		<Box>
			<Text
				fontFamily="var(--font-mono)"
				fontSize="9px"
				fontWeight="700"
				letterSpacing=".11em"
				color="text.muted"
				textTransform="uppercase"
				mb={1}>
				{label}
			</Text>
			<Text fontSize="14px" lineHeight="1.65">
				{children}
			</Text>
		</Box>
	);
}

function ProjectCaseStudy({ project, index }) {
	const Visual = visuals[project.visual];
	const visualBg = useColorModeValue("rgba(231,225,215,.62)", "rgba(26,36,32,.72)");

	return (
		<Box
			as="article"
			borderTop="1px solid"
			borderColor="border.subtle"
			py={{ base: 10, md: 14 }}>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12, lg: 18 }} alignItems="center">
				<Box order={{ base: 2, md: index % 2 === 0 ? 1 : 2 }}>
					<Text
						fontFamily="var(--font-mono)"
						fontSize="10px"
						fontWeight="700"
						letterSpacing=".1em"
						textTransform="uppercase"
						color="mint.500">
						{project.eyebrow}
					</Text>
					<Heading as="h3" fontSize={{ base: "29px", md: "36px" }} mt={2}>
						{project.title}
					</Heading>
					<Text mt={3} fontSize={{ base: "16px", md: "17px" }} lineHeight="1.65" color="text.muted">
						{project.intro}
					</Text>
					<Stack spacing={4} mt={6}>
						<Detail label="Problem">{project.problem}</Detail>
						<Detail label="Ownership">{project.ownership}</Detail>
						<Detail label="Outcome">{project.outcome}</Detail>
					</Stack>
					<Flex mt={6} gap={4} align="center" wrap="wrap">
						{project.href && (
							<Link href={project.href} target="_blank" rel="noopener noreferrer" fontSize="14px" fontWeight="700">
								{project.linkLabel} <ExternalLinkIcon mx="1px" mb="2px" />
							</Link>
						)}
						<Text fontFamily="var(--font-mono)" fontSize="10px" color="text.muted">
							{project.stack}
						</Text>
					</Flex>
				</Box>
				<Box
					order={{ base: 1, md: index % 2 === 0 ? 2 : 1 }}
					bg={visualBg}
					border="1px solid"
					borderColor="border.subtle"
					p={{ base: 5, smmd: 7, md: 6, lg: 8 }}>
					<Visual />
				</Box>
			</SimpleGrid>
		</Box>
	);
}

export default function SelectedWork() {
	return (
		<Box>
			{projects.map((project, index) => (
				<ProjectCaseStudy key={project.key} project={project} index={index} />
			))}
		</Box>
	);
}
