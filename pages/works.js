import {
	Box,
	Flex,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Layout from "../components/layouts/Articles";
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

// A dated ledger, newest year first. Years come from the dateRange in
// lib/works.js; an entry sits under the year it started.
const ledger = [
	{
		year: "2023",
		entries: [
			{
				id: "codeparty",
				title: "CodeParty",
				note: "CS3219",
				thumbnail: thumbCodeParty,
				background: "white",
				padding: "4px",
				description:
					"Pairs you with a peer to practice interview questions in a shared editor",
			},
			{
				id: "markup",
				title: "Markup",
				note: "Hackathon · 2nd runner up",
				thumbnail: thumbMarkup,
				background: "white",
				description:
					"Generates exam questions on demand and auto-grades the answers",
			},
			{
				id: "vitalvision",
				title: "Vital Vision",
				note: "Hackathon · 2nd runner up",
				thumbnail: thumbVitalvision,
				background: "white",
				description:
					"VR rehabilitation exercises for post-stroke patients, with a clinician dashboard",
			},
		],
	},
	{
		year: "2022",
		entries: [
			{
				id: "covalent",
				title: "Covalent",
				note: "Design",
				thumbnail: thumbCovalent,
				description: "A social media dashboard for video producers",
			},
			{
				id: "contractme",
				title: "ContractMe!",
				note: "Design · CS3240",
				thumbnail: thumbContractMe,
				description:
					"A marketplace app for hiring contractors, taken through a full CS3240 design process",
			},
		],
	},
	{
		year: "2021",
		entries: [
			{
				id: "dexdao",
				title: "The DEX DAO",
				thumbnail: thumbDexDao,
				description:
					"A token project for decentralized exchange traders, launched with an airdrop to every trader from 2021",
			},
			{
				id: "amuze",
				title: "Amuze",
				note: "Hackathon · 1st runner up",
				thumbnail: thumbAmuze,
				description: "A digital museum where collectors list historical pieces as NFTs",
			},
			{
				id: "squeezy",
				title: "Project Squeezy",
				note: "Hackathon · 1st runner up",
				thumbnail: thumbSqueezy,
				description:
					"A smart stress ball with a companion app that tracks your stress over Bluetooth",
			},
			{
				id: "markbind",
				title: "Markbind",
				note: "Open source · through 2023",
				thumbnail: thumbMarkbind,
				description:
					"A tool for generating static websites from Markdown-like syntax",
			},
			{
				id: "abcdao",
				title: "ABCDao",
				note: "NUS Fintech Society",
				thumbnail: thumbAbcdao,
				description:
					"A DAO where NUS Fintech Society members vote on club decisions with a governance token",
			},
			{
				id: "nusconnect",
				title: "NUSConnect",
				thumbnail: thumbNusConnect,
				description:
					"A learning management system for NUS with a forum, quizzes, and gamified rewards",
			},
			{
				id: "imposter",
				title: "imPoster",
				thumbnail: thumbImposter,
				description: "API testing tool built for CLI lovers",
			},
		],
	},
	{
		year: "2020",
		entries: [
			{
				id: "youtubehandsfree",
				title: "Youtube Handsfree",
				note: "Hackathon · two days",
				thumbnail: thumbHandsfree,
				description:
					"A Chrome extension that controls YouTube playback with hand signs",
			},
			{
				id: "fintechwebsite",
				title: "NUS Fintech Website",
				note: "NUS Fintech Society",
				thumbnail: thumbFintechWebsite,
				description:
					"The NUS Fintech Society website: projects, events, and the team behind them",
			},
		],
	},
];

const Row = ({ entry, rule }) => (
	<Flex
		as={NextLink}
		href={`/works/${entry.id}`}
		align="flex-start"
		gap={4}
		py={4}
		borderTopWidth="1px"
		borderColor={rule}
		role="group"
		_hover={{ bg: "surface.raised" }}
		transitionProperty="background-color"
		transitionDuration="140ms">
		<Box
			position="relative"
			flexShrink={0}
			w={{ base: "56px", md: "72px" }}
			h={{ base: "36px", md: "46px" }}
			rounded="md"
			overflow="hidden"
			bg={entry.background || "surface.quiet"}>
			<Image
				src={entry.thumbnail}
				alt=""
				fill
				sizes="72px"
				style={{ objectFit: "contain", padding: entry.padding || "0" }}
			/>
		</Box>
		<Box minW={0}>
			<Flex align="baseline" wrap="wrap" columnGap={3} rowGap={0}>
				<Text
					fontSize={{ base: "16px", md: "17px" }}
					fontWeight="700"
					_groupHover={{ textDecoration: "underline" }}
					textUnderlineOffset="3px">
					{entry.title}
				</Text>
				{entry.note && (
					<Text
						fontFamily="var(--font-mono)"
						fontSize="11px"
						color="text.muted"
						whiteSpace="nowrap">
						{entry.note}
					</Text>
				)}
			</Flex>
			<Text fontSize="15px" lineHeight="1.6" color="text.muted" mt={1}>
				{entry.description}
			</Text>
		</Box>
	</Flex>
);

const Works = () => {
	const rule = useColorModeValue("rgba(26,36,32,.16)", "rgba(230,235,232,.14)");
	const yearColor = useColorModeValue("mint.700", "mint.300");

	return (
		<Layout
			title="University Projects"
			description="A dated ledger of Ong Jun Xiong's NUS projects, 2020 to 2023: hackathons, coursework, design work and open source. Current work lives on the resume.">
			<Box pt={{ base: 10, md: 14 }}>
				<Flex align="baseline" justify="space-between" wrap="wrap" gap={2}>
					<Heading as="h1" fontSize={{ base: "26px", md: "30px" }}>
						University projects, 2020&ndash;2023
					</Heading>
					<Text fontFamily="var(--font-mono)" fontSize="11px" color="text.muted">
						14 entries
					</Text>
				</Flex>
				<Text mt={3} maxW="620px" fontSize="15px" lineHeight="1.7" color="text.muted">
					Everything I built during my NUS years. I keep the list as a record
					of what we made back then. What I work on now is on my resume.
				</Text>

				<Box mt={{ base: 8, md: 12 }}>
					{ledger.map((group, i) => (
						<Section key={group.year} delay={0.05 * (i + 1)}>
							<Flex
								direction={{ base: "column", md: "row" }}
								align="flex-start"
								gap={{ base: 2, md: 6 }}
								mb={{ base: 8, md: 10 }}>
								<Text
									fontFamily="var(--font-mono)"
									fontSize={{ base: "13px", md: "14px" }}
									fontWeight="700"
									letterSpacing=".06em"
									color={yearColor}
									w={{ md: "72px" }}
									flexShrink={0}
									pt={{ md: 4 }}>
									{group.year}
								</Text>
								<Box flex="1" minW={0} w="100%">
									{group.entries.map((entry) => (
										<Row key={entry.id} entry={entry} rule={rule} />
									))}
								</Box>
							</Flex>
						</Section>
					))}
				</Box>
			</Box>
		</Layout>
	);
};

export default Works;
