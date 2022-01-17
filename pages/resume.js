import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	Link,
	ListItem,
	SimpleGrid,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { WorkGridItem } from "../components/GridItem";
import Layout from "../components/layouts/Articles";
import {
	Databases,
	ProficientLanguage,
	TechCurve,
	TechFintech,
	TechMaha,
	TechTeach,
	ToolsAndFramework,
} from "../components/Resume";
import Section from "../components/Section";
import thumbMarkbind from "../public/images/works/markbind_01.png";
import thumbNusConnect from "../public/images/works/nusconnect_03.png";
import thumbSqueezy from "../public/images/works/squeezy_01.png";

const Works = () => (
	<Layout title="Resume">
		<Box>
			<Section delay={0.1}>
				<Education />
			</Section>
			<Section delay={0.3}>
				<Technical />
			</Section>
			<Section delay={0.5}>
				<WorkExperience />
			</Section>
			<Section delay={0.7}>
				<Projects />
			</Section>
		</Box>
	</Layout>
);

const Projects = () => {
	return (
		<>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Projects
			</Heading>
			<SimpleGrid columns={[1, 2, 3]} gap={6}>
				<WorkGridItem
					id="squeezy"
					thumbnail={thumbSqueezy}
					title="Project Squeezy">
					Squeeze your stress away with this smart Stress-Ball!
				</WorkGridItem>
				<WorkGridItem
					id="nusconnect"
					title="NUSConnect"
					thumbnail={thumbNusConnect}>
					A gamified learning management system that is accessible to all and
					easy to use
				</WorkGridItem>
				<WorkGridItem id="markbind" thumbnail={thumbMarkbind} title="Markbind">
					A tool for generating static websites from Markdown-like syntax.
				</WorkGridItem>
			</SimpleGrid>
			<Box align="center" my={4}>
				<NextLink href="/works">
					<Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
						View All Works
					</Button>
				</NextLink>
			</Box>
		</>
	);
};

const WorkExperience = () => {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Experience
			</Heading>
			<Box className="space-y-8">
				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							NUS Fintech Society, Senior Software Developer
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Sep 2020 - Present
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Collaborated with a team of 4 members to develop a full-stack
							website for{" "}
							<NextLink href={"/works/fintechwebsite"}>
								<Link>NUS Fintech Society.</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							Developed and designed a{" "}
							<NextLink href={"/works/abcdao"}>
								<Link>Decentralized Autonomous Organization (DAO)</Link>
							</NextLink>
							, to serve more than 200 fintech society members.
						</ListItem>
						<ListItem>
							Represented fintech society to{" "}
							<Link
								href={
									"https://fintechlab.nus.edu.sg/nus-fintech-society-blockchain-department-project-showcase/"
								}
								target="_blank">
								present
							</Link>{" "}
							and advocate our DAO project on a global stage during Singapore
							Fintech Month.
						</ListItem>
					</UnorderedList>
					<TechFintech />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							MahaChem, Mobile App Developer
						</Text>
						<Text fontSize={18} fontWeight="bold">
							May 2021 - Sep 2021
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Developed and designed a{" "}
							<Link
								href={"https://appadvice.com/app/myassistant-2-0/1500392856"}
								target="_blank">
								Flutter Application
							</Link>{" "}
							to assist on site sales team with showcasing of products.
						</ListItem>
						<ListItem>
							Automated the conversion of products data into SQL database for
							further analysis and managed the creation of API endpoints to be
							used by the client app.
						</ListItem>
						<ListItem>
							Organized SCRUM meetings and collaborated with other departments
							to discover and troubleshoot current bugs in the App.
						</ListItem>
					</UnorderedList>
					<TechMaha />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							Curveseries, Software Engineer Intern
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Jan 2020 - Apr 2020
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Organized refinery maintenance data to be set up for predictive
							analysis
						</ListItem>
						<ListItem>
							Performed formula-based charting on futures across various oil
							products
						</ListItem>
						<ListItem>
							Conceptualized and developed Java Application to collect RSS News
							feeds and stored them in a SQL database for further analysis
						</ListItem>
					</UnorderedList>
					<TechCurve />
				</Box>

				<Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<Text fontSize={18} fontWeight="bold">
							Teaching Assistant (NUS)
						</Text>
						<Text fontSize={18} fontWeight="bold">
							Jan 2021 - Present
						</Text>
					</Box>
					<UnorderedList pl={8} fontSize={18} fontWeight="medium">
						<ListItem>
							Conduct weekly tutorials, code review and marking.
						</ListItem>
						<ListItem>Guided over 60 students across various modules.</ListItem>
						<ListItem>
							Organized SCRUM meetings and collaborated with other departments
							to discover and troubleshoot current bugs in the App.
						</ListItem>
					</UnorderedList>
					<TechTeach />
				</Box>
			</Box>
		</Box>
	);
};

const Technical = () => {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Technical Proficiency
			</Heading>
			<Box fontSize={18} fontWeight="bold">
				<Text pb={3}>Proficient Languages</Text>
				<ProficientLanguage />
				<Text pb={3}>Tools and Frameworks</Text>
				<ToolsAndFramework />
				<Text pb={3}>Database and Cloud</Text>
				<Databases />
			</Box>
		</Box>
	);
};

const Education = () => {
	return (
		<Box mb={8}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Education
			</Heading>
			<Box display="flex" alignItems="center" justifyContent="space-between">
				<Text fontSize={18} fontWeight="bold">
					National University of Singapore (NUS)
				</Text>
				<Text fontSize={18} fontWeight="bold">
					Aug 2020 - Present
				</Text>
			</Box>
			<Text fontSize={18} fontWeight="semibold">
				Bachelor of Computing in Computer Science (Hons)
			</Text>
			<UnorderedList pl={8} fontSize={18} fontWeight="medium">
				<ListItem>
					Relevant course work: Object-Oriented Programming, Software
					engineering, Data structures and algorithms, Computer organization
				</ListItem>
			</UnorderedList>
		</Box>
	);
};

export default Works;
