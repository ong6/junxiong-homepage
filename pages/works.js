import { Container, Heading, SimpleGrid, Divider, Box } from "@chakra-ui/react";
import Layout from "../components/layouts/Articles";
import Section from "../components/Section";
import { WorkGridItem } from "../components/GridItem";

import thumbNusConnect from "../public/images/works/nusconnect_03.png";
import thumbCovalent from "../public/images/works/covalent_02.png";
import thumbDexDao from "../public/images/works/dexdao_01.png";
import thumbImposter from "../public/images/works/imposter_01.png";
import thumbFintechWebsite from "../public/images/works/fintechwebsite_03.png";
import thumbAbcdao from "../public/images/works/abcdao_01.png";
import thumbSqueezy from "../public/images/works/squeezy_01.png";
import thumbHandsfree from "../public/images/works/handsfree_02.png";
import thumbMarkbind from "../public/images/works/markbind_01.png";
import thumbAmuze from "../public/images/works/amuze_01.png";
import thumbContractMe from "../public/images/works/contractme_01.png";

const Works = () => (
	<Layout title="Works">
		<Box>
			<Heading as="h3" fontSize={20} mb={4}>
				Passion Projects
			</Heading>
			<SimpleGrid columns={[1, 1, 2]} gap={6}>
				<Section delay={0.1}>
					<WorkGridItem
						id="nusconnect"
						title="NUSConnect"
						thumbnail={thumbNusConnect}>
						A gamified learning management system that is accessible to all and
						easy to use
					</WorkGridItem>
				</Section>
				{/* <Section delay={0.1}>
					<WorkGridItem id="dexdao" title="The DEX DAO" thumbnail={thumbDexDao}>
						A DAO with the goal of unifying the L2 DEX community
					</WorkGridItem>
				</Section> */}
				<Section delay={0.1}>
					<WorkGridItem
						id="imposter"
						title="imPoster"
						thumbnail={thumbImposter}>
						API testing tool built for CLI lovers
					</WorkGridItem>
				</Section>
				<Section delay={0.1}>
					<WorkGridItem
						id="fintechwebsite"
						title="NUS Fintech Website"
						thumbnail={thumbFintechWebsite}>
						A website built for NUS Fintech Society to showcase its projects and
						events
					</WorkGridItem>
				</Section>
				<Section delay={0.1}>
					<WorkGridItem id="abcdao" thumbnail={thumbAbcdao} title="ABCDao">
						A decentralized autonomous organization that aims to provide a way
						for NUS fintech society members to vote on topics
					</WorkGridItem>
				</Section>
			</SimpleGrid>

			<Section delay={0.3}>
				<Divider my={6} />
				<Heading as="h3" fontSize={20} mb={4}>
					Hackathons Won
				</Heading>
			</Section>

			<SimpleGrid columns={[1, 1, 2]} gap={6}>
				<Section delay={0.5}>
					<WorkGridItem
						id="amuze"
						title="Amuze (1st Runner Up)"
						thumbnail={thumbAmuze}>
						The NFT museum for collectors rent, mint and earn!
					</WorkGridItem>
				</Section>
				<Section delay={0.5}>
					<WorkGridItem
						id="squeezy"
						thumbnail={thumbSqueezy}
						title="Project Squeezy (1st Runner Up)">
						Squeeze your stress away with this smart Stress-Ball!
					</WorkGridItem>
				</Section>
				{/* <Section delay={0.5}>
					<WorkGridItem
						id="youtubehandsfree"
						thumbnail={thumbHandsfree}
						title="Youtube-Handsfree (Participation)">
						A AR Tool for watching youtube Handsfree!
					</WorkGridItem>
				</Section> */}
			</SimpleGrid>

			<Section delay={0.6}>
				<Divider my={6} />
				<Heading as="h3" fontSize={20} mb={4}>
					Design Projects
				</Heading>
			</Section>

			<SimpleGrid columns={[1, 1, 2]} gap={6}>
				<Section delay={0.6}>
					<WorkGridItem
						id="covalent"
						title="Covalent"
						thumbnail={thumbCovalent}>
						A social media dashboard for video producers
					</WorkGridItem>
				</Section>
				<Section delay={0.6}>
					<WorkGridItem
						id="contractme"
						thumbnail={thumbContractMe}
						title="ContractMe!">
						Hiring contractors has never been so easy!
					</WorkGridItem>
				</Section>
			</SimpleGrid>

			<Section delay={0.7}>
				<Divider my={6} />
				<Heading as="h3" fontSize={20} mb={4}>
					Open Source Contributions
				</Heading>
			</Section>

			<SimpleGrid columns={[1, 1, 2]} gap={6}>
				<Section delay={0.9}>
					<WorkGridItem
						id="markbind"
						thumbnail={thumbMarkbind}
						title="Markbind">
						A tool for generating static websites from Markdown-like syntax.
					</WorkGridItem>
				</Section>
			</SimpleGrid>
		</Box>
	</Layout>
);

export default Works;
