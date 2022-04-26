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
	<Layout title="ABCDAO">
		<Box>
			<Title>
				Covalent <Badge>March 2022 - April 2022</Badge>
			</Title>
			<P>
				A solo design project done for CS3240 (Interactive Design). The goal of
				the project was to design a social media manager app. I choose to focus
				on video producers and design my app based on a dashboard. View the
				website to see the full design process!
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://covalent-tau.vercel.app/" target="_blank">
						https://covalent-tau.vercel.app/
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Figma Design Files</Meta>
					<Link
						href="https://www.figma.com/file/brRhvhN3In9jbjXjRXK1GO/Covalent?node-id=0%3A1"
						target="_blank">
						https://www.figma.com/file/covalent-design
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Figma Prototype</Meta>
					<Link
						href="https://www.figma.com/proto/brRhvhN3In9jbjXjRXK1GO/Covalent?page-id=0%3A1&node-id=8%3A170&starting-point-node-id=8%3A170&scaling=scale-down"
						target="_blank">
						https://www.figma.com/covanlent-prototype
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Figma Concept</span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<iframe
					className="my-4 border-2 border-blue-300 rounded-lg w-full"
					height="600"
					src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FbrRhvhN3In9jbjXjRXK1GO%2FJun-Xiong-Prototype%3Fpage-id%3D0%253A1%26node-id%3D30%253A4415%26viewport%3D337%252C48%252C0.5%26scaling%3Dscale-down%26starting-point-node-id%3D8%253A170"
					allowFullScreen></iframe>
				<iframe
					className="my-4 border-2 border-blue-300 rounded-lg w-full"
					height="600"
					src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FbrRhvhN3In9jbjXjRXK1GO%2FJun-Xiong-Prototype%3Fnode-id%3D0%253A1"
					allowFullScreen></iframe>
			</div>
		</Box>
	</Layout>
);

export default Work;
