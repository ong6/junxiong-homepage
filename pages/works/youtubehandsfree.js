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
	<Layout title="Youtube Handsfree">
		<Box>
			<Title>
				Youtube Handsfree <Badge>Nov 2020 - Nov 2020</Badge>
			</Title>
			<P>
				A computer vision system that tracks hand movement and allows users to
				control videos using hand signs. This was made for a Hackathon 2 day
				project.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Source</Meta>
					<Link
						href="https://github.com/ong6/youtube-handsfree"
						target="_blank">
						github.com/ong6/youtube-handsfree
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web (Chrome Extension)</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>Javascript </span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage
					src="/images/works/handsfree_01.gif"
					alt="youtube handsfree"
				/>
			</div>
		</Box>
	</Layout>
);

export default Work;
