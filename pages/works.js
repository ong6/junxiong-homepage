import {
	Box,
	Divider,
	Heading,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { WorkGridItem } from "../components/GridItem";
import Intro from "../components/Intro";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";

// Importing thumbnails
import thumbAbcdao from "../public/images/works/abcdao_01.png";
import thumbAmuze from "../public/images/works/amuze_01.png";
import thumbContractMe from "../public/images/works/contractme_01.png";
import thumbCovalent from "../public/images/works/covalent_02.png";
import thumbFintechWebsite from "../public/images/works/fintechwebsite_03.png";
import thumbImposter from "../public/images/works/imposter_01.png";
import thumbMarkbind from "../public/images/works/markbind_01.png";
import thumbNusConnect from "../public/images/works/nusconnect_03.png";
import thumbSqueezy from "../public/images/works/squeezy_01.png";
import thumbMarkup from "../public/images/works/markup_01.png";
import thumbVitalvision from "../public/images/works/vitalvision_01.png";
import thumbCodeParty from "../public/images/works/codeparty_01.png";
import thumbDexDao from "../public/images/works/dexdao_01.png";
import thumbHandsfree from "../public/images/works/handsfree_01.gif";

const passionProjects = [
	{
		id: "codeparty",
		title: "CodeParty",
		thumbnail: thumbCodeParty,
		description:
			"A leetcode clone built for CS3219 with the aim of helping students to prepare for technical interviews",
		delay: 0.1,
		backgroundColor: "white",
		padding: "1rem",
	},
	{
		id: "nusconnect",
		title: "NUSConnect",
		thumbnail: thumbNusConnect,
		description:
			"A gamified learning management system that is accessible to all and easy to use",
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
			"A website built for NUS Fintech Society to showcase its projects and events",
		delay: 0.1,
	},
	{
		id: "abcdao",
		title: "ABCDao",
		thumbnail: thumbAbcdao,
		description:
			"A decentralized autonomous organization that aims to provide a way for NUS fintech society members to vote on topics",
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
		description: "Gamify stroke rehabilitation with VR!",
		delay: 0.5,
		backgroundColor: "white",
	},
	{
		id: "markup",
		title: "Markup (2nd Runner Up)",
		thumbnail: thumbMarkup,
		description: "Mark smart, with Markup!",
		delay: 0.5,
		backgroundColor: "white",
	},
	{
		id: "amuze",
		title: "Amuze (1st Runner Up)",
		thumbnail: thumbAmuze,
		description: "The NFT museum for collectors rent, mint and earn!",
		delay: 0.5,
	},
	{
		id: "squeezy",
		title: "Project Squeezy (1st Runner Up)",
		thumbnail: thumbSqueezy,
		description: "Squeeze your stress away with this smart Stress-Ball!",
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
		description: "Hiring contractors has never been so easy!",
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

const TermHeading = ({ children, suffix }) => (
	<Heading
		as="h2"
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
		{suffix && (
			<Box as="span" opacity={0.5} fontWeight={400}>
				{" "}
				{suffix}
			</Box>
		)}
	</Heading>
);

const GroupHeading = ({ children }) => (
	<Heading
		as="h3"
		fontFamily="'JetBrains Mono', monospace"
		fontSize={15}
		fontWeight={500}
		opacity={0.7}
		mb={4}>
		{`:/$ ls ${children}`}
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
			<Intro />
			<TermHeading suffix="(2020 – 2023)">university-archive</TermHeading>
			<Text mb={6} opacity={0.8}>
				An archive from my NUS years — hackathons, coursework and student
				society work. I keep it here for the memories; what I build these days
				lives on my resume and GitHub.
			</Text>
			<GroupHeading>passion-projects/</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(passionProjects)}
			</SimpleGrid>

			<Divider my={6} />
			<GroupHeading>hackathons-won/</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(hackathonsWon)}
			</SimpleGrid>

			<Divider my={6} />
			<GroupHeading>design-projects/</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(designProjects)}
			</SimpleGrid>

			<Divider my={6} />
			<GroupHeading>open-source/</GroupHeading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(openSourceContributions)}
			</SimpleGrid>
		</Box>
	</Layout>
);

export default Works;
