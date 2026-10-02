import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import TermHeading from "../TermHeading";

const skills = [
	{
		label: "AI systems",
		value: "MCP · A2A · LangGraph · LlamaIndex · RAG · agentic workflows",
	},
	{
		label: "Backend",
		value: "Go · TypeScript · Python · Java · gRPC · REST · distributed systems",
	},
	{
		label: "Data & infra",
		value: "MySQL · PostgreSQL · ClickHouse · Hive · Kafka · Redis · Docker · Kubernetes · AWS",
	},
	{
		label: "Frontend",
		value: "React · Next.js",
	},
	{
		label: "Delivery",
		value: "client delivery · technical scoping",
	},
];

export default function Skills() {
	const borderColor = useColorModeValue("rgba(65,54,45,0.2)", "whiteAlpha.200");

	// Opens on the same rule and 24px inset as Experience and Education
	// (16px here plus each row's 8px).
	return (
		<Box>
			<TermHeading kicker="Tools">Skills</TermHeading>
			<Box pt={4} borderTopWidth="1px" borderColor={borderColor}>
				{skills.map((skill) => (
					<Flex
						key={skill.label}
						direction={{ base: "column", smmd: "row" }}
						gap={{ base: 1, smmd: 4 }}
						py={2}>
						<Text w={{ smmd: "128px" }} flexShrink={0} fontSize="15px" fontWeight="800">
							{skill.label}
						</Text>
						<Text fontSize="15px" lineHeight="1.65" opacity={0.92}>
							{skill.value}
						</Text>
					</Flex>
				))}
			</Box>
		</Box>
	);
}
