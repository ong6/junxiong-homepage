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
		title="Markbind"
		description="Markbind is a static site generator for Markdown-like syntax, used for course sites and documentation. I am a contributor and help maintain it.">
		<Box>
			<Title>
				Markbind (Contributor) <Badge>Aug 2021 - Aug 2023</Badge>
			</Title>
			<P>
				A static site generator for content-heavy instructional sites: course
				pages, tutorials, documentation, textbooks. Markdown-like syntax in,
				finished website out. I contributed to the repo and helped maintain it
				from 2021 to 2023.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://markbind.org/" target="_blank" rel="noopener noreferrer">
						https://markbind.org/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>Vue, Javascript </span>
				</ListItem>
				<ListItem>
					<ListItem>
						<Meta>Contributions</Meta>
						<Link
							href="https://github.com/ong6/oss-progress-report/blob/main/nus-oss/markbind.md"
							target="_blank" rel="noopener noreferrer">
							github.com/ong6/oss-progress-report/blob/main/nus-oss/markbind.md
							<ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem></ListItem>
					<Meta>Source</Meta>
					<Link href="https://github.com/MarkBind/markbind" target="_blank" rel="noopener noreferrer">
						github.com/MarkBind/markbind
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>
			<div className="space-y-8">
				<WorkImage src="/images/works/markbind_02.png" alt="MarkBind documentation homepage" />
				<WorkImage src="/images/works/markbind_03.png" alt="MarkBind authoring interface" />
			</div>
		</Box>
	</Layout>
);

export default Work;
