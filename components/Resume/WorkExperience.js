import { Box, Text } from "@chakra-ui/react";
import TermHeading from "../TermHeading";
import ResumeDetail from "./ResumeDetail";

const currentExperience = [
	{
		title: "TikTok",
		location: "Singapore",
		roles: [
			{
				subtitle: "AI Infrastructure Engineer, Global E-commerce",
				date: "Oct 2025 – present",
				description: [
					"Built the team's shared AI platform from zero: a LangGraph agent service on Google's A2A protocol, a Go MCP server exposing 16 analysis tools over the data warehouse, and a React SDK that adds streaming AI chat to a page in about five lines.",
					"Adding LLM analysis to a new surface went from a multi-file change to a single config directory, and analysis latency dropped from minutes to seconds. In daily use by operators and analysts across the team.",
					"Built the Marketing Strategy Center with operations teams across the US, Southeast Asia, and the UK: a Go/gRPC service and React console that enforces product eligibility rules and budget stop-loss continuously, replacing a daily manual review.",
				],
			},
			{
				subtitle: "Software Engineer, Backend Platforms",
				date: "Apr 2024 – Oct 2025",
				description: [
					"Shipped the Promotion Data Center analytics backend in Go with Kafka, Redis and Hive-backed OLAP: 26 statistics across 8 drill-down dimensions on 4 endpoints, serving ~13 markets with real-time alerting.",
					"Built the Video Diagnosis 2.0 recommendation backend in Go (candidate generation plus personalised ranking for creator-product matching), validated through A/B tests before rollout.",
					"Supported five owned and two contributed Go/gRPC services on the seller platform, handled 20+ on-call escalations, and added cache observability and alerting that stopped a recurring class of outages.",
				],
			},
		],
	},
	{
		title: "Compoze",
		location: "Singapore",
		roles: [
			{
				subtitle: "Founder",
				date: "Jan 2025 – Dec 2025",
				description: [
					"Built and ran a one-person AI solutions company alongside TikTok. I handled discovery, scoping, pricing, delivery, and client training.",
					"Shipped retrieval-augmented chat products with LlamaIndex, FastAPI, Next.js, and LlamaCloud. A client acquired the company at the end of 2025.",
				],
			},
		],
	},
];

const earlierExperience = [
	{
		title: "Binance",
		location: "Remote",
		roles: [
			{
				subtitle: "Software Engineering Intern, Payments & Cards",
				date: "Aug 2023 – Nov 2023",
				description: [
					"Shipped TypeScript and React UI, including the Crypto Box group-payment checkout flow with idempotent, double-confirm submission.",
				],
			},
		],
	},
	{
		title: "Thought Machine",
		location: "Singapore",
		roles: [
			{
				subtitle: "Forward Deployment Engineer (Intern)",
				date: "May 2023 – Aug 2023",
				description: [
					"Forward-deployed on core-banking (Vault) client implementations. Built a Python remediation tool over the platform REST API with dry-run preview and idempotent apply, removing 20+ hrs/week of repetitive configuration work.",
				],
			},
		],
	},
	{
		title: "DBS Bank · Tanso",
		location: "Singapore · Munich",
		roles: [
			{
				subtitle: "Backend and full-stack engineering internships",
				date: "2022",
				description: [
					"Built Java and Spring Boot services for 1,000+ daily B2B users at DBS, then a Next.js, tRPC and PostgreSQL carbon-accounting dashboard at Tanso that cut page load from 5s to under 50ms.",
				],
			},
		],
	},
];

export default function WorkExperience() {
	return (
		<Box>
			<TermHeading kicker="Roles">Experience</TermHeading>
			{currentExperience.map((detail) => (
				<ResumeDetail key={detail.title} detail={detail} />
			))}

			<Text
				mt={7}
				mb={1}
				fontFamily="var(--font-mono)"
				fontSize="12px"
				fontWeight="700"
				letterSpacing="0.08em"
				textTransform="uppercase"
				opacity={0.68}>
				Earlier experience
			</Text>
			{earlierExperience.map((detail) => (
				<ResumeDetail key={detail.title} detail={detail} compact />
			))}
		</Box>
	);
}
