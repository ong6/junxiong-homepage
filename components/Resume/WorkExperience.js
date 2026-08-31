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
					"Built the team's agent platform from zero: an A2A and LangGraph runtime, a Go MCP server, and a React chat SDK that other product teams build on.",
					"Put the platform into daily use with operations teams across the US, Southeast Asia, and the UK. Multi-step workflows that took minutes now complete in under 30 seconds.",
				],
			},
			{
				subtitle: "Software Engineer, Backend Platforms",
				date: "Apr 2024 – Oct 2025",
				description: [
					"Built Go and gRPC promotion backends and React tools serving campaigns across more than 13 markets.",
					"Worked on seller analytics and creator systems backed by ClickHouse and Hive, including Campaign Workbench and video diagnosis products.",
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
				subtitle: "Frontend Engineering Intern, Payments",
				date: "Aug 2023 – Nov 2023",
				description: [
					"Built TypeScript and React payment experiences for Crypto Box and checkout systems on a platform serving more than 128 million users.",
				],
			},
		],
	},
	{
		title: "Thought Machine",
		location: "Singapore",
		roles: [
			{
				subtitle: "Client Engineering Intern",
				date: "May 2023 – Aug 2023",
				description: [
					"Built a Python remediation tool and worked with engineers and analysts to deliver tailored core-banking products.",
				],
			},
		],
	},
	{
		title: "Tanso · DBS Bank",
		location: "Munich · Singapore",
		roles: [
			{
				subtitle: "Full-stack and backend engineering internships",
				date: "2022",
				description: [
					"Built a TypeScript and Next.js carbon-accounting dashboard at Tanso, then Java and Spring Boot transaction-banking services at DBS.",
				],
			},
		],
	},
];

export default function WorkExperience() {
	return (
		<Box>
			<TermHeading>experience</TermHeading>
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
