import {
	Box,
	Flex,
	Grid,
	Heading,
	Link,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";

const labelStyle = {
	fontFamily: "var(--font-mono)",
	fontSize: { base: "11px", md: "10px" },
	fontWeight: "700",
	letterSpacing: ".1em",
	textTransform: "uppercase",
};

const signals = [
	["role", "Sole founder, builder, and seller"],
	["delivery", "Six stages from discovery to training"],
	["outcome", "Sold to one of its clients in 2025"],
];

const deliveryStages = [
	"Discovery and analysis",
	"Knowledge engineering",
	"Model selection",
	"Integration and development",
	"Testing and refinement",
	"Deployment and training",
];

export default function Compoze() {
	const labelColor = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="Compoze"
			description="How Ong Jun Xiong built and sold Compoze, a one-person AI solutions company for document-grounded assistants.">
			<Box pt={{ base: 12, md: 20 }}>
				<Link as={NextLink} href="/#work" fontSize="13px" fontWeight="700">
					← Selected projects
				</Link>

				<Text mt={10} color={labelColor} sx={labelStyle}>
					2025 · side venture · sold to a client
				</Text>
				<Heading
					as="h1"
					mt={4}
					fontSize={{ base: "48px", md: "72px" }}
					lineHeight=".98"
					letterSpacing="-.06em">
					Compoze
				</Heading>
				<Text mt={6} maxW="760px" fontSize={{ base: "19px", md: "23px" }} lineHeight="1.55" fontWeight="650">
					A one-person AI solutions company I built and ran alongside TikTok.
					I handled the customer conversations, the product, the delivery, and the sale.
				</Text>
				<Text mt={5} maxW="700px" color="text.muted" fontSize="16px" lineHeight="1.8">
					Compoze sold document-grounded assistants to businesses. One of its own
					clients bought the company outright at the end of 2025. The client and
					financial terms remain private.
				</Text>
			</Box>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={0} mt={{ base: 14, md: 20 }} border="1px solid" borderColor="border.subtle">
				{signals.map(([label, value], index) => (
					<Box
						key={value}
						p={{ base: 5, md: 6 }}
						borderTop={{ base: index ? "1px solid" : "none", md: "none" }}
						borderLeft={{ base: "none", md: index ? "1px solid" : "none" }}
						borderColor="border.subtle">
						<Text color={labelColor} sx={labelStyle}>{label}</Text>
						<Text mt={3} fontSize="16px" fontWeight="700" lineHeight="1.5">{value}</Text>
					</Box>
				))}
			</SimpleGrid>

			<Grid
				as="section"
				gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1.05fr) minmax(320px, .95fr)" }}
				gap={{ base: 10, md: 16 }}
				mt={{ base: 16, md: 24 }}>
				<Box>
					<Text color={labelColor} sx={labelStyle}>{"// The product"}</Text>
					<Heading as="h2" mt={3} fontSize={{ base: "30px", md: "38px" }}>
						One product, configured per customer.
					</Heading>
					<Text mt={5} color="text.muted" lineHeight="1.8">
						The core was a retrieval-augmented assistant built with LlamaIndex and
						FastAPI, managed vector indexing on LlamaCloud, and a Next.js chat
						frontend. A pluggable tool layer supported retrieval, code execution,
						document generation, image generation, web search, and OpenAPI actions.
					</Text>
					<Text mt={4} color="text.muted" lineHeight="1.8">
						The model and embedding layer used an OpenAI-compatible interface. A
						customer could move between hosted and private endpoints through
						configuration rather than a product rewrite.
					</Text>
				</Box>

				<Box bg="#08100C" color="#E6EBE8" border="1px solid #34443C" p={{ base: 5, md: 7 }}>
					<Flex justify="space-between" color="#71DCB2" sx={labelStyle}>
						<Text>compoze / system</Text>
						<Text>Fly.io · Singapore</Text>
					</Flex>
					<Stack spacing={3} mt={7} fontFamily="var(--font-mono)" fontSize={{ base: "12px", md: "13px" }}>
						<Box border="1px solid #34443C" p={3}>customer documents</Box>
						<Text color="#71DCB2" textAlign="center">↓</Text>
						<Box border="1px solid #34443C" p={3}>LlamaCloud vector index</Box>
						<Text color="#71DCB2" textAlign="center">↓</Text>
						<Box border="1px solid #34443C" p={3}>FastAPI · LlamaIndex · tools</Box>
						<Text color="#71DCB2" textAlign="center">↓</Text>
						<Box border="1px solid #34443C" p={3}>Next.js chat · Fly.io</Box>
					</Stack>
					<Text mt={6} pt={5} borderTop="1px solid #34443C" color="#A5B3AD" fontFamily="var(--font-mono)" fontSize="11px">
						model endpoint = environment configuration
					</Text>
				</Box>
			</Grid>

			<Box as="section" mt={{ base: 16, md: 24 }}>
				<Text color={labelColor} sx={labelStyle}>{"// The work around the product"}</Text>
				<Heading as="h2" mt={3} fontSize={{ base: "30px", md: "38px" }}>
					The build was only one stage.
				</Heading>
				<Text mt={5} maxW="720px" color="text.muted" lineHeight="1.8">
					I turned delivery into a six-stage engagement and owned each part, from
					the first scoping call through customer training.
				</Text>
				<Grid templateColumns={{ base: "1fr", smmd: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap="1px" bg="border.subtle" mt={8} border="1px solid" borderColor="border.subtle">
					{deliveryStages.map((stage, index) => (
						<Box key={stage} bg="page.bg" p={5}>
							<Text color={labelColor} sx={labelStyle}>{String(index + 1).padStart(2, "0")}</Text>
							<Text mt={3} fontSize="15px" fontWeight="700">{stage}</Text>
						</Box>
					))}
				</Grid>
			</Box>
		</Layout>
	);
}
