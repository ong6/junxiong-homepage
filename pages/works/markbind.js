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
	<Layout title="Markbind">
		<Box>
			<Title>
				Markbind (Contributor) <Badge>Aug 2021 - Present</Badge>
			</Title>
			<P>
				A tool for generating static websites from Markdown-like syntax.
				Optimized for content-heavy instructional websites, e.g. course
				websites, tutorials, project/product documentation, textbooks. I am a
				contributor to this repo and help to maintain it.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://markbind.org/" target="_blank">
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
							target="_blank">
							github.com/ong6/oss-progress-report/blob/main/nus-oss/markbind.md
							<ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem></ListItem>
					<Meta>Source</Meta>
					<Link href="https://github.com/MarkBind/markbind" target="_blank">
						github.com/MarkBind/markbind
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>
			<div className="space-y-8">
				<WorkImage src="/images/works/markbind_02.png" alt="Markbind" />
				<WorkImage src="/images/works/markbind_03.png" alt="Markbind" />
			</div>
		</Box>
	</Layout>
);

export default Work;
