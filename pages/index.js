import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	Link,
	List,
	ListItem,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import NextLink from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import Layout from "../components/layouts/Articles";
import Paragraph from "../components/Paragraph";
import Section from "../components/Section";
import TerminalHero from "../components/TerminalHero";
import Education from "../components/Resume/Education";
import Extracurricular from "../components/Resume/Extracurricular";
import PrintButton from "../components/Resume/PrintButton";
import PrintHeader from "../components/Resume/PrintHeader";
import WorkExperience from "../components/Resume/WorkExperience";

const printStyles = css`
	.print-only {
		display: none;
	}

	@media print {
		@page {
			margin: 1.5cm;
		}

		/* Kill animations everywhere — framer-motion leaves inline
		   opacity/transform that would hide content in print. */
		* {
			opacity: 1 !important;
			transform: none !important;
			animation: none !important;
			transition: none !important;
			box-shadow: none !important;
			text-shadow: none !important;
		}

		/* Layout-owned chrome: fixed navbar (with theme toggle), and the
		   intro/avatar + footer, which are the Container's non-article
		   children inside the Main layout. */
		nav {
			display: none !important;
		}
		main > div > *:not(article) {
			display: none !important;
		}

		/* Screen-only sections. */
		.print-hide {
			display: none !important;
		}
		/* Per-job tech icon rows inside resume details. */
		#resume-print-root .flex-wrap {
			display: none !important;
		}

		/* The full-CV block, hidden on screen. */
		.print-only {
			display: block !important;
		}

		/* Clean page: white background, black text (Chakra sets color-mode
		   backgrounds via CSS vars on body — override them too). */
		html,
		body {
			background: #fff !important;
			--chakra-colors-chakra-body-bg: #fff;
			--chakra-colors-chakra-body-text: #000;
		}
		body,
		#resume-print-root,
		#resume-print-root * {
			background: transparent !important;
			color: #000 !important;
			font-family: Georgia, "Times New Roman", Times, serif;
		}
		body {
			background: #fff !important;
		}

		/* Typography. */
		#resume-print-root {
			font-size: 11pt;
		}
		#resume-print-root p,
		#resume-print-root li {
			font-size: 11pt !important;
			line-height: 1.4 !important;
		}
		#resume-print-root h1 {
			font-size: 16pt !important;
		}
		#resume-print-root h3 {
			font-size: 13pt !important;
		}
		#resume-print-root a {
			color: #000 !important;
			text-decoration: none !important;
		}
		#resume-print-root hr {
			border-color: #aaa !important;
		}

		/* Keep an individual role/detail block on one page. */
		#resume-print-root .mb-2,
		#resume-print-root .mb-2 > div {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
`;

const experience = [
	{
		period: "2024 – now",
		title: "TikTok · AI Infrastructure Engineer",
		blurb:
			"Agent platform for Global E-commerce: A2A + LangGraph runtime, a Go MCP server, and a React chat SDK other teams build on. Before that, promotion backends in Go/gRPC and seller analytics on OLAP pipelines.",
	},
	{
		period: "2025",
		title: "Compoze · Founder",
		blurb:
			"Solo AI solutions company — RAG chat products on LlamaIndex, FastAPI and Next.js. Acquired by one of its clients, Dec 2025.",
	},
	{
		period: "before",
		title: "Internships & school",
		blurb:
			"Binance, Thought Machine, DBS and Tanso (Munich). Computer Science (Hons) at NUS, where I also TA'd and ran the Fintech Society.",
	},
];

const skills = [
	{ label: "Languages", items: "Go · TypeScript · Python · Java · SQL" },
	{
		label: "Backend",
		items: "gRPC · Kafka · Redis · MySQL · ClickHouse · microservices",
	},
	{
		label: "AI systems",
		items: "MCP · A2A · LangGraph · RAG · agentic workflows",
	},
	{
		label: "Frontend & infra",
		items: "React · Next.js · Docker · Kubernetes · AWS · CI/CD",
	},
];

const TermHeading = ({ children }) => (
	<Heading
		as="h3"
		fontFamily="'JetBrains Mono', monospace"
		fontSize={18}
		mt={3}
		mb={4}>
		<Box
			as="span"
			color={useColorModeValue("teal.600", "#8be9b6")}
			fontWeight={700}>
			:/${" "}
		</Box>
		{children}
	</Heading>
);

export default function Home() {
	return (
		<Layout>
			<Container maxW="full" id="resume-print-root">
				<Global styles={printStyles} />

				<Box className="print-hide">
					<TerminalHero />
					<Section delay={0.1}>
						<TermHeading>about</TermHeading>
						<Paragraph>
							I&apos;m a software engineer at TikTok in Singapore, building AI
							infrastructure for Global E-commerce — agent runtimes, MCP
							tooling and Go/gRPC services used across the org. In 2025 I
							founded Compoze, an AI solutions company that was acquired by one
							of its clients. Off the clock I climb, trade with a written
							playbook, and over-engineer my personal tooling.
						</Paragraph>
					</Section>

					<Section delay={0.2}>
						<Flex justify="space-between" align="baseline">
							<TermHeading>experience</TermHeading>
							<PrintButton />
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

					<Section delay={0.3}>
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

					<Section delay={0.4}>
						<TermHeading>education</TermHeading>
						<Paragraph>
							BComp (Hons) in Computer Science, National University of
							Singapore, specialising in AI and software engineering, with an
							exchange semester at TU Munich under NUS Overseas Colleges. I
							taught OOP and software engineering as a TA (Student Mentor
							Award) and was President of the NUS Fintech Society.
						</Paragraph>
					</Section>

					<Section delay={0.5}>
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

					<Section delay={0.6}>
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

				{/* Full CV, print only — the on-screen page stays compact. */}
				<Box className="print-only">
					<PrintHeader />
					<Education />
					<WorkExperience />
					<Extracurricular />
				</Box>
			</Container>
		</Layout>
	);
}
