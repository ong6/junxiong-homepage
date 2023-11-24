import { Box, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import { WorkGridItem } from "../components/GridItem";
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
	<Layout title="Works">
		<Box>
			<Heading as="h3" fontSize={20} mb={4}>
				Passion Projects
			</Heading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(passionProjects)}
			</SimpleGrid>

			<Divider my={6} />
			<Heading as="h3" fontSize={20} mb={4}>
				Hackathons Won
			</Heading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(hackathonsWon)}
			</SimpleGrid>

			<Divider my={6} />
			<Heading as="h3" fontSize={20} mb={4}>
				Design Projects
			</Heading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(designProjects)}
			</SimpleGrid>

			<Divider my={6} />
			<Heading as="h3" fontSize={20} mb={4}>
				Open Source Contributions
			</Heading>
			<SimpleGrid columns={[1, 1, 1, 2]} gap={6}>
				{renderProjects(openSourceContributions)}
			</SimpleGrid>
		</Box>
	</Layout>
);

export default Works;
