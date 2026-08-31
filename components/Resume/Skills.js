import { Box, Flex, Text } from "@chakra-ui/react";
import TermHeading from "../TermHeading";

const skills = [
	{
		label: "AI systems",
		value: "MCP · A2A · LangGraph · LlamaIndex · RAG · agentic workflows",
	},
	{
		label: "Backend",
		value: "Go · TypeScript · Python · Java · gRPC · REST · Kafka · Redis",
	},
	{
		label: "Data & infra",
		value: "MySQL · PostgreSQL · ClickHouse · Hive · Docker · Kubernetes · AWS",
	},
	{
		label: "Product",
		value: "React · Next.js · distributed systems · client delivery · technical scoping",
	},
];

export default function Skills() {
	return (
		<Box>
			<TermHeading>technical spine</TermHeading>
			{skills.map((skill) => (
				<Flex
					key={skill.label}
					direction={{ base: "column", smmd: "row" }}
					gap={{ base: 1, smmd: 4 }}
					py={1.5}>
					<Text w={{ smmd: "128px" }} flexShrink={0} fontSize="15px" fontWeight="800">
						{skill.label}
					</Text>
					<Text fontSize="15px" lineHeight="1.65" opacity={0.8}>
						{skill.value}
					</Text>
				</Flex>
			))}
		</Box>
	);
}
