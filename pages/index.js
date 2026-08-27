import {
	Box,
	Button,
	Container,
	Flex,
	Icon,
	Link,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import Layout from "../components/layouts/Articles";
import Paragraph from "../components/Paragraph";
import Section from "../components/Section";
import SelectedWork from "../components/SelectedWork";
import TerminalHero from "../components/TerminalHero";
import TermHeading from "../components/TermHeading";

const experience = [
	{
		period: "Oct 2025 – now",
		title: "TikTok · AI Infrastructure Engineer",
		blurb:
			"Promoted into the AI infra role after 18 months on promotion and seller backends. Built the team's agent platform from zero: an A2A + LangGraph runtime, a Go MCP server, and a React chat SDK other teams build on. In daily use by operations teams across the US, SEA and UK.",
	},
	{
		period: "Apr 2024 – Oct 2025",
		title: "TikTok · Software Engineer",
		blurb:
			"Go/gRPC promotion backends and seller analytics on OLAP pipelines (ClickHouse, Hive), serving campaigns across 13+ markets.",
	},
	{
		period: "2025 · alongside TikTok",
		title: "Compoze · Founder (sold)",
		blurb:
			"A side venture I built and ran on nights and weekends: RAG chat products for clients on LlamaIndex, FastAPI and Next.js. Sold to one of its clients at the end of 2025.",
	},
	{
		period: "before",
		title: "Internships & school",
		blurb:
			"Binance, Thought Machine, DBS and Tanso (Munich). Computer Science (Hons) at NUS, where I also TA'd and ran the Fintech Society.",
	},
];

const skills = [
	{
		label: "Languages",
		items: "Go · TypeScript · JavaScript · Python · Java · SQL · Bash",
	},
	{
		label: "Backend",
		items: "gRPC · Kafka · Redis · Node.js · Spring Boot · REST · microservices",
	},
	{
		label: "Data",
		items: "MySQL · PostgreSQL · MongoDB · ClickHouse · Hive · Spark · OLAP · ETL",
	},
	{
		label: "AI systems",
		items:
			"MCP · A2A · LangGraph · LlamaIndex · RAG · prompt engineering · agentic workflows",
	},
	{
		label: "Frontend",
		items: "React · Next.js · Vue · Redux · Tailwind",
	},
	{
		label: "Infra",
		items: "Docker · Kubernetes · AWS · Linux · Jenkins · CI/CD · Git",
	},
];

export default function Home() {
	return (
		<Layout>
			<Container maxW="full">
				<Box>
					<TerminalHero />
					<Section delay={0.1}>
						<TermHeading>about</TermHeading>
						<Paragraph>
							I write Go and TypeScript at TikTok in Singapore, on the team
							that builds AI infrastructure for Global E-commerce. My job is
							the plumbing: the agent runtime, the tool servers, and the SDK
							that other engineers ship on — it is in daily use by operations
							teams across the US, SEA and UK. Alongside the day job I ran
							Compoze, a one-person AI shop, on nights and weekends until one
							of its clients bought it in 2025. Evenings otherwise mean a
							climbing wall or my trading journal.
						</Paragraph>
					</Section>

					<Section delay={0.2}>
						<TermHeading>selected work</TermHeading>
						<SelectedWork />
					</Section>

					<Section delay={0.3}>
						<Flex justify="space-between" align="baseline">
							<TermHeading>experience</TermHeading>
							<Link as={NextLink} href="/resume" fontSize={15}>
								full resume →
							</Link>
						</Flex>
						{experience.map((row) => (
							<Flex key={row.title} gap={4} py={3} borderBottomWidth="1px">
								<Text
									w={{ base: "90px", md: "120px" }}
									flexShrink={0}
									opacity={0.6}
									fontSize={15}>
									{row.period}
								</Text>
								<Box>
									<Text fontWeight="bold">{row.title}</Text>
									<Text fontSize={15} opacity={0.75} mt={1}>
										{row.blurb}
									</Text>
								</Box>
							</Flex>
						))}
					</Section>

					<Section delay={0.4}>
						<TermHeading>skills</TermHeading>
						{skills.map((row) => (
							<Flex key={row.label} gap={4} py={1.5}>
								<Text
									w={{ base: "110px", md: "140px" }}
									flexShrink={0}
									fontWeight="bold"
									fontSize={15}>
									{row.label}
								</Text>
								<Text fontSize={15} opacity={0.8}>
									{row.items}
								</Text>
							</Flex>
						))}
					</Section>

					<Section delay={0.5}>
						<TermHeading>education</TermHeading>
						<Paragraph>
							BComp (Hons) in Computer Science, National University of
							Singapore, specialising in AI and software engineering, with an
							exchange semester at TU Munich under NUS Overseas Colleges. I
							taught OOP and software engineering as a TA (Student Mentor
							Award) and was President of the NUS Fintech Society.
						</Paragraph>
					</Section>

					<Section delay={0.6}>
						<TermHeading>tinkering</TermHeading>
						<Paragraph>
							Side projects live on{" "}
							<Link href="https://github.com/ong6" target="_blank">
								GitHub
							</Link>
							: a{" "}
							<Link
								href="https://github.com/ong6/sg-property-analysis"
								target="_blank">
								Singapore property data-analysis project
							</Link>
							, agent tooling for myself, and a markdown life-admin repo tended
							by an AI agent. This site is open source too. More on the{" "}
							<Link as={NextLink} href="/hobbies">
								hobbies page
							</Link>
							, and my university-era work is in the{" "}
							<Link as={NextLink} href="/works">
								archive
							</Link>
							.
						</Paragraph>
					</Section>

					<Section delay={0.7}>
						<TermHeading>contact</TermHeading>
						<List>
							<ListItem>
								<Link href="https://github.com/ong6" target="_blank">
									<Button
										variant="ghost"
										colorScheme="teal"
										leftIcon={<Icon as={IoLogoGithub} />}>
										@ong6
									</Button>
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.linkedin.com/in/junx6/"
									target="_blank">
									<Button
										variant="ghost"
										colorScheme="teal"
										leftIcon={<Icon as={IoLogoLinkedin} />}>
										@Jun Xiong
									</Button>
								</Link>
							</ListItem>
							<ListItem>
								<Link href="mailto:junxiongong2@gmail.com" target="_blank">
									<Button
										variant="ghost"
										colorScheme="teal"
										leftIcon={<Icon as={AiTwotoneMail} />}>
										@junxiongong2@gmail.com
									</Button>
								</Link>
							</ListItem>
						</List>
					</Section>
				</Box>
			</Container>
		</Layout>
	);
}
