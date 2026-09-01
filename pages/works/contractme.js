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
import { Title, Meta } from "../../components/Work";
import P from "../../components/Paragraph";
import Layout from "../../components/layouts/Articles";

const Work = () => (
	<Layout
		title="ContractMe!"
		description="ContractMe! is a marketplace app designed through a full design process from user research to evaluation as a CS3240 project.">
		<Box>
			<Title>
				ContractMe! <Badge>February 2022 - April 2022</Badge>
			</Title>
			<P>
				A team project for CS3240 (Interactive Design): take one app through the
				whole design process, user research to user evaluation. We picked a
				marketplace for hiring contractors and called it ContractMe. The
				repository and prototype preserve every stage of that process.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Source</Meta>
					<Link href="https://github.com/ong6/ContractMe" target="_blank" rel="noopener noreferrer">
						github.com/ong6/ContractMe
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Figma Design Files</Meta>
					<Link
						href="https://www.figma.com/file/cOeKMKw3s5ijxGPxupQQDn/Contract-Me!?node-id=14855%3A5765"
						target="_blank" rel="noopener noreferrer">
						https://www.figma.com/file/contractme-design
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Figma Prototype</Meta>
					<Link
						href="https://www.figma.com/proto/cOeKMKw3s5ijxGPxupQQDn/Contract-Me!?page-id=14855%3A5765&node-id=14870%3A14239&viewport=337%2C48%2C0.1&scaling=scale-down&starting-point-node-id=14869%3A13739&show-proto-sidebar=1"
						target="_blank" rel="noopener noreferrer">
						https://www.figma.com/contractme-prototype
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Figma Concept</span>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<iframe
					title="Interactive ContractMe prototype"
					loading="lazy"
					className="w-full my-4 border-2 border-blue-300 rounded-lg"
					height="600"
					src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FcOeKMKw3s5ijxGPxupQQDn%2FContract-Me!%3Fpage-id%3D14855%253A5765%26node-id%3D14870%253A14239%26viewport%3D337%252C48%252C0.1%26scaling%3Dscale-down%26starting-point-node-id%3D14869%253A13739%26show-proto-sidebar%3D1"
					allowFullScreen></iframe>
				<iframe
					title="ContractMe design file"
					loading="lazy"
					className="w-full my-4 border-2 border-blue-300 rounded-lg"
					height="600"
					src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FcOeKMKw3s5ijxGPxupQQDn%2FContract-Me!%3Fnode-id%3D14855%253A5765"
					allowFullScreen></iframe>
			</div>
		</Box>
	</Layout>
);

export default Work;
