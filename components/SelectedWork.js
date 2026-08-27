import {
	Badge,
	Box,
	Flex,
	Heading,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const projects = [
	{
		meta: "2026 · open source",
		title: "Singapore property intelligence",
		description:
			"A decision system for buying a home in Singapore. It pulls official URA transaction data, scores every condo on comparable-unit value, and runs AI agents over the qualitative checks a spreadsheet can't hold — tenure, lease decay, surrounding supply. Built to make my own search a data problem instead of an agent's opinion.",
		stack: ["Python", "Data pipelines", "AI agents", "URA API"],
		href: "https://github.com/ong6/sg-property-analysis",
		linkLabel: "Repository",
	},
	{
		meta: "2025 · side venture, sold",
		title: "Compoze",
		description:
			"A one-person AI solutions company I ran on nights and weekends alongside the day job — retrieval-augmented chat products built for clients on LlamaIndex and FastAPI, with Next.js frontends and vector indexing on LlamaCloud. I did the discovery calls, the scoping, the build, the pricing and the training. Sold to one of its clients at the end of 2025.",
		stack: ["LlamaIndex", "FastAPI", "Next.js", "Fly.io"],
	},
];

function ProjectRow({ project, isLast }) {
	const borderColor = useColorModeValue("rgba(65,54,45,0.18)", "whiteAlpha.200");

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			gap={{ base: 2, md: 8 }}
			py={6}
			borderBottomWidth={isLast ? 0 : "1px"}
			borderColor={borderColor}>
			<Text
				w={{ base: "auto", md: "170px" }}
				flexShrink={0}
				fontFamily="'JetBrains Mono', monospace"
				fontSize="11px"
				fontWeight="700"
				letterSpacing="0.07em"
				textTransform="uppercase"
				opacity={0.7}
				pt={{ md: 1.5 }}>
				{project.meta}
			</Text>

			<Box minW={0} flex="1">
				<Flex align="baseline" wrap="wrap" gap={3}>
					<Heading as="h3" fontSize="20px">
						{project.title}
					</Heading>
					{project.href && (
						<Link
							href={project.href}
							target="_blank"
							fontSize="13px"
							fontWeight="700"
							opacity={0.8}>
							{project.linkLabel} <ExternalLinkIcon mx="1px" mb="2px" />
						</Link>
					)}
				</Flex>

				<Text fontSize="15px" lineHeight="1.7" opacity={0.78} mt={2}>
					{project.description}
				</Text>

				<Flex wrap="wrap" gap={2} mt={3}>
					{project.stack.map((item) => (
						<Badge key={item} variant="subtle" colorScheme="teal">
							{item}
						</Badge>
					))}
				</Flex>
			</Box>
		</Flex>
	);
}

export default function SelectedWork() {
	return (
		<Box id="selected-work" scrollMarginTop="88px" minW={0}>
			{projects.map((project, i) => (
				<ProjectRow
					key={project.title}
					project={project}
					isLast={i === projects.length - 1}
				/>
			))}
		</Box>
	);
}
