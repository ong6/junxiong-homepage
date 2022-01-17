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
	<Layout title="NUS Connect">
		<Box>
			<Title>
				NUSConnect <Badge>May 2021 - Aug 2021</Badge>
			</Title>
			<P>
				A custom LMS (Learning Management System) for NUS students and teaching
				assistants to connect with each other through a easy to use forum and
				quiz system. This LMS is designed to encourage students to be more
				active in their peer to peer interactions and has a gamified learning
				system which rewards its users as they complete more and more quizzes.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://nus-connect.vercel.app/" target="_blank">
						https://nus-connect.vercel.app/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Documentation</Meta>
					<Link
						href="https://notawakestudio.github.io/NUSConnect-Docs/"
						target="_blank">
						https://notawakestudio.github.io/NUSConnect-Docs/
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Presentation</Meta>
					<Link
						href="https://www.youtube.com/watch?v=lYMwwFo2hoU"
						target="_blank">
						What is NUS Connect?
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>
						Next.js, Typescript, TailwindCSS, ChakraUI, Firebase, Flask, Jest
					</span>
				</ListItem>
				<ListItem>
					<Meta>Source</Meta>
					<Link
						href="https://github.com/notawakestudio/NUSConnect"
						target="_blank">
						github.com/notawakestudio/NUSConnect
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} mt={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/nusconnect_02.png" alt="Nusconnect" />
				<Box>
					<iframe
						alt="Nusconnect"
						src="https://www.youtube.com/embed/5p1V0kUZNzQ"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						width="100%"
						height="400"
						frameBorder="0"
						allowFullScreen
					/>
				</Box>
				<WorkImage src="/images/works/nusconnect_01.png" alt="Nusconnect" />
			</div>
		</Box>
	</Layout>
);

export default Work;
