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
		title="Markup"
		description="Markup is an AI web app that generates exam questions and auto-grades the responses.">
		<Box>
			<Title>
				Markup <Badge>June 2023 - Aug 2023</Badge>
			</Title>
			<P>
				An AI-powered web app that levels the playing field in education by
				automating exam question generation and instant auto-grading. Our app
				uses advanced natural language processing to generate high quality,
				frequently updated exam questions on demand, while instantly grading
				student responses. This makes quality assessment resources accessible to
				all students regardless of their school and background. By replacing
				manual exam creation and paper-based submissions, we save teachers time
				and provide data-driven insights into student performance.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Presentation Slides</Meta>
					<Link
						href="https://docs.google.com/presentation/d/1Sp1yHuupdsB_QyIpKAaQisAKY6uAZsAiop0jfxhgaUM/edit?usp=sharing"
						target="_blank" rel="noopener noreferrer">
						Google Slides
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Online website, AI</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>Next.js, TailwindCSS, Node.js, Vercel, Open AI</span>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/markup_01.png" alt="Markup question-generation interface" />
			</div>
		</Box>
	</Layout>
);

export default Work;
