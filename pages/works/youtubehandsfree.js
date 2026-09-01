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
		title="Youtube Handsfree"
		description="Youtube Handsfree is a computer vision Chrome extension that controls YouTube playback with hand signs.">
		<Box>
			<Title>
				Youtube Handsfree <Badge>Nov 2020 - Nov 2020</Badge>
			</Title>
			<P>
				A computer-vision system that tracks your hand through the webcam and
				maps signs to YouTube controls: pause, seek, volume. Built in a two-day
				hackathon, mostly to see if it could be done.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Source</Meta>
					<Link
						href="https://github.com/ong6/youtube-handsfree"
						target="_blank" rel="noopener noreferrer">
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

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage
					src="/images/works/handsfree_01.webp"
					alt="YouTube Handsfree gesture controls in action"
				/>
			</div>
		</Box>
	</Layout>
);

export default Work;
