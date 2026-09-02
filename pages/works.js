import { Box, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { WorkGridItem } from "../components/GridItem";
import Layout from "../components/layouts/Articles";
import PageHeader from "../components/PageHeader";
import Section from "../components/Section";

// Importing thumbnails
import thumbAbcdao from "../public/images/works/abcdao_01.png";
import thumbAmuze from "../public/images/works/amuze_01.png";
import thumbContractMe from "../public/images/works/contractme_01.webp";
import thumbCovalent from "../public/images/works/covalent_02.webp";
import thumbFintechWebsite from "../public/images/works/fintechwebsite_03.png";
import thumbImposter from "../public/images/works/imposter_01.png";
import thumbMarkbind from "../public/images/works/markbind_01.png";
import thumbNusConnect from "../public/images/works/nusconnect_03.png";
import thumbSqueezy from "../public/images/works/squeezy_01.png";
import thumbMarkup from "../public/images/works/markup_01.png";
import thumbVitalvision from "../public/images/works/vitalvision_01.png";
import thumbCodeParty from "../public/images/works/codeparty_01.png";
import thumbDexDao from "../public/images/works/dexdao_01.png";
import thumbHandsfree from "../public/images/works/handsfree_01.webp";

const passionProjects = [
	{
		id: "codeparty",
		title: "CodeParty",
		thumbnail: thumbCodeParty,
		description:
			"Pairs you with a peer to practice interview questions in a shared editor, built for CS3219",
		delay: 0.1,
		backgroundColor: "white",
		padding: "1rem",
	},
	{
		id: "nusconnect",
		title: "NUSConnect",
		thumbnail: thumbNusConnect,
		description:
			"A learning management system for NUS with a forum, quizzes, and gamified rewards",
		delay: 0.1,
	},
	{
		id: "imposter",
		title: "imPoster",
		thumbnail: thumbImposter,
		description: "API testing tool built for CLI lovers",
		delay: 0.1,
	},
	{
		id: "fintechwebsite",
		title: "NUS Fintech Website",
		thumbnail: thumbFintechWebsite,
		description:
			"The NUS Fintech Society website: projects, events, and the team behind them",
		delay: 0.1,
	},
	{
		id: "abcdao",
		title: "ABCDao",
		thumbnail: thumbAbcdao,
		description:
			"A DAO where NUS Fintech Society members vote on club decisions with a governance token",
		delay: 0.1,
	},
	{
		id: "dexdao",
		title: "The DEX DAO",
		thumbnail: thumbDexDao,
		description:
			"A token project for decentralized exchange traders, launched with an airdrop to every trader from 2021",
		delay: 0.1,
	},
	{
		id: "youtubehandsfree",
		title: "Youtube Handsfree",
		thumbnail: thumbHandsfree,
		description:
			"A Chrome extension that controls YouTube playback with hand signs, built in a two-day hackathon",
		delay: 0.1,
	},
];

const hackathonsWon = [
	{
		id: "vitalvision",
		title: "Vital Vision (2nd Runner Up)",
		thumbnail: thumbVitalvision,
		description: "VR rehabilitation exercises for post-stroke patients, with a clinician dashboard",
		delay: 0.5,
		backgroundColor: "white",
	},
	{
		id: "markup",
		title: "Markup (2nd Runner Up)",
		thumbnail: thumbMarkup,
		description: "Generates exam questions on demand and auto-grades the answers",
		delay: 0.5,
		backgroundColor: "white",
	},
	{
		id: "amuze",
		title: "Amuze (1st Runner Up)",
		thumbnail: thumbAmuze,
		description: "A digital museum where collectors list historical pieces as NFTs",
		delay: 0.5,
	},
	{
		id: "squeezy",
		title: "Project Squeezy (1st Runner Up)",
		thumbnail: thumbSqueezy,
		description: "A smart stress ball with a companion app that tracks your stress over Bluetooth",
		delay: 0.5,
	},
];

const designProjects = [
	{
		id: "covalent",
		title: "Covalent",
		thumbnail: thumbCovalent,
		description: "A social media dashboard for video producers",
		delay: 0.6,
	},
	{
		id: "contractme",
		title: "ContractMe!",
		thumbnail: thumbContractMe,
		description: "A marketplace app for hiring contractors, taken through a full CS3240 design process",
		delay: 0.6,
	},
];

const openSourceContributions = [
	{
		id: "markbind",
		title: "Markbind",
		thumbnail: thumbMarkbind,
		description:
			"A tool for generating static websites from Markdown-like syntax.",
		delay: 0.9,
	},
];

const GroupHeading = ({ children }) => (
	<Heading
		as="h2"
		fontFamily="var(--font-mono)"
		fontSize="11px"
		fontWeight="700"
		letterSpacing=".12em"
		textTransform="uppercase"
		color={useColorModeValue("mint.700", "mint.300")}
		mt={{ base: 12, md: 16 }}
		mb={5}>
		{`// ${children}`}
	</Heading>
);

const renderProjects = (projects) =>
	projects.map((project) => (
		<Section delay={project.delay} key={project.id}>
			<WorkGridItem
				id={project.id}
				title={project.title}
				thumbnail={project.thumbnail}
				backgroundColor={project.backgroundColor}
				padding={project.padding}>
				{project.description}
			</WorkGridItem>
		</Section>
	));

const Works = () => (
	<Layout
		title="University Projects"
		description="An archive of Ong Jun Xiong's NUS-era projects, 2020 to 2023: hackathon wins, coursework, design work and open source. Current work lives on the resume.">
		<Box>
			<PageHeader eyebrow="// ARCHIVE / 2020 – 2023" title="From the archive.">
				An archive from my NUS years — hackathons, coursework and student
				society work. I keep it here for the memories; what I build these days
				lives on my resume and GitHub.
			</PageHeader>
			<GroupHeading>Passion projects</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(passionProjects)}
			</SimpleGrid>

			<GroupHeading>Hackathons won</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(hackathonsWon)}
			</SimpleGrid>

			<GroupHeading>Design projects</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(designProjects)}
			</SimpleGrid>

			<GroupHeading>Open source</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(openSourceContributions)}
			</SimpleGrid>
		</Box>
	</Layout>
);

export default Works;
