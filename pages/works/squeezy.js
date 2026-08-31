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
		title="Project Squeezy"
		description="Project Squeezy is a smart stress ball that reports stress levels over Bluetooth to a React Native app.">
		<Box>
			<Title>
				Project Squeezy <Badge>Nov 2021 - Jan 2022</Badge>
			</Title>
			<P>
				First Runner-up for NUS Makerthon 2022 (3K prize)! Project Squeezy is a
				joint hardware and software project. Squeezy is designed to be a smart
				stress ball with a companion app that can help you track your stress
				levels. I was in charge of building the app with React Native and
				connecting it to the ball via Bluetooth.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://linktr.ee/projectsqueezy" target="_blank" rel="noopener noreferrer">
						https://linktr.ee/projectsqueezy <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Poster</Meta>
					<Link href="https://i.imgur.com/ZZ92PxS.jpg" target="_blank" rel="noopener noreferrer">
						Project Squeezy Poster
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Showcase Booth</Meta>
					<Link
						href="https://uvents.nus.edu.sg/event/make2022/module/MAK2022/project/16"
						target="_blank" rel="noopener noreferrer">
						View us at Makerbooth 2022!
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Android, Physical</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>ReactNative, Arduino Nano 33 IoT</span>
				</ListItem>
				<ListItem>
					<Meta>Source</Meta>
					<Link href="https://github.com/ong6/squeezy_app" target="_blank" rel="noopener noreferrer">
						github.com/ong6/squeezy_app
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/squeezy_04.png" alt="Project Squeezy companion app" />
				<Box>
					<iframe
						title="Project Squeezy demonstration"
						loading="lazy"
						src="https://www.youtube.com/embed/nHkiPQZP4-U"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						width="100%"
						height="400"
						frameBorder="0"
						allowFullScreen
					/>
				</Box>
				<WorkImage src="/images/works/squeezy_02.png" alt="Project Squeezy stress history view" />
				<WorkImage src="/images/works/squeezy_03.png" alt="Project Squeezy Bluetooth pairing flow" />
			</div>
		</Box>
	</Layout>
);

export default Work;
