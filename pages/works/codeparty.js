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
import Document from "./../_document";

// https://www.figma.com/file/rWDRhrZmCD2SsVzisNQHH6/PeerPrep?type=design&node-id=1509-1035&mode=design&t=0ueA4Qsn7kLyWJzQ-0
// https://docs.google.com/presentation/d/1CbiiCUi9Sq9yVgMjhTKZeJQ3E5jKd1cQE_3clSYkWiY/edit?usp=sharing
// https://docs.google.com/document/d/1sb4gFP5xFQs2hCUGsVNRfetcjbK61MfjpuwXIqnWCac/edit?usp=sharing

const Work = () => (
	<Layout title="CodeParty">
		<Box>
			<Title>
				CodeParty <Badge>Aug 2023 - Nov 2023</Badge>
			</Title>
			<P>
				The CodeParty project aims to create a comprehensive platform that
				enables users to prepare collaboratively for interviews or other forms
				of assessments by connecting peers, facilitating real-time
				collaboration, and providing a rich repository of questions. The
				platform is founded on a microservices architecture to ensure
				scalability, maintainability, and agility in rolling out new features.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://www.codeparty.org/" target="_blank">
						https://www.codeparty.org/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Figma</Meta>
					<Link
						href="https://www.figma.com/file/rWDRhrZmCD2SsVzisNQHH6/PeerPrep?type=design&node-id=1509-1035&mode=design&t=0ueA4Qsn7kLyWJzQ-0"
						target="_blank">
						Figma
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Presentation Slides</Meta>
					<Link
						href="https://docs.google.com/presentation/d/1CbiiCUi9Sq9yVgMjhTKZeJQ3E5jKd1cQE_3clSYkWiY/edit?usp=sharing"
						target="_blank">
						Google Slides
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Documentation</Meta>
					<Link
						href="https://docs.google.com/document/d/1sb4gFP5xFQs2hCUGsVNRfetcjbK61MfjpuwXIqnWCac/edit?usp=sharing"
						target="_blank">
						Docs
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Online website</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>Next.js, TailwindCSS, Express.js, Node.js, Vercel</span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/codeparty_03.png" alt="codeparty" />
				<WorkImage src="/images/works/codeparty_02.png" alt="codeparty" />
			</div>
		</Box>
	</Layout>
);

export default Work;
