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
	<Layout
		title="NUS Fintech Website"
		description="The NUS Fintech Society website: blockchain and machine learning research, projects and events for over 200 members.">
		<Box>
			<Title>
				NUS Fintech Website <Badge>Nov 2020 - Jan 2021</Badge>
			</Title>
			<P>
				NUS FinTech Society is a School of Computing club that does blockchain
				and machine learning research, with over 200 members. I built the
				society&apos;s website — the public face for its projects, events, and
				team.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://fintechsociety.comp.nus.edu.sg/" target="_blank" rel="noopener noreferrer">
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

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage
					src="/images/works/fintechwebsite_01.png"
					alt="NUS FinTech Society homepage"
				/>
				<WorkImage
					src="/images/works/fintechwebsite_02.png"
					alt="NUS FinTech Society project showcase"
				/>
			</div>
		</Box>
	</Layout>
);

export default Work;
