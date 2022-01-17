import {
	Box,
	Badge,
	Link,
	List,
	ListItem,
	Heading,
	Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/Work";
import P from "../../components/Paragraph";
import Layout from "../../components/layouts/Articles";

const Work = () => (
	<Layout title="NUS Fintech Website">
		<Box>
			<Title>
				NUS Fintech Website <Badge>Nov 2020 - Jan 2021</Badge>
			</Title>
			<P>
				NUS FinTech Society was founded under NUS School of Computing by a group
				of like-minded individuals with a passion in pursuing research and
				driving applications in the realms of Blockchain and Machine Learning.
				We currently have over 200 members, each with a strong grasp of their
				individual research areas. This website was built to showcase our
				projects, events and team.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://fintechsociety.comp.nus.edu.sg/" target="_blank">
						https://fintechsociety.comp.nus.edu.sg/
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>React, SCSS, Flask, Javascript </span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage
					src="/images/works/fintechwebsite_01.png"
					alt="fintech website"
				/>
				<WorkImage
					src="/images/works/fintechwebsite_02.png"
					alt="fintech website"
				/>
			</div>
		</Box>
	</Layout>
);

export default Work;
