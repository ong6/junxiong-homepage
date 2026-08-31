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
		title="imPoster"
		description="imPoster is a desktop app for exploring, testing and building APIs, aimed at people new to API development.">
		<Box>
			<Title>
				imPoster <Badge>Feb 2021 - April 2021</Badge>
			</Title>
			<P>
				imPoster is a desktop application for beginners of API development to
				quickly go hands-on with the basics. Whether you are looking to explore,
				test, or build your very own APIs, the simple and minimalistic style of
				imPoster will quickly get you up and going.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Documentation</Meta>
					<Link
						href="https://ay2021s2-cs2103t-t12-4.github.io/tp/"
						target="_blank" rel="noopener noreferrer">
						https://ay2021s2-cs2103t-t12-4.github.io/tp/
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Source</Meta>
					<Link
						href="https://github.com/AY2021S2-CS2103T-T12-4/tp"
						target="_blank" rel="noopener noreferrer">
						github.com/ong6/imposter
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Windows, Mac, Linux</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>Java, CSS, Shell, Gradle</span>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} mt={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/imposter_02.webp" alt="imPoster API request workspace" />
				<WorkImage src="/images/works/imposter_03.png" alt="imPoster API response viewer" />
			</div>
		</Box>
	</Layout>
);

export default Work;
