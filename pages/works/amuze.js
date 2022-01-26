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
	<Layout title="A-Muze">
		<Box>
			<Title>
				A-Muze <Badge>Dec 2021 - Present</Badge>
			</Title>
			<P>
				A-muze is a museum experience built with NFT and Blockchain technologies. It helps to facilitate collectors to list their historical assets onto the blockchain, promoting the culture of ownership. This enables these Unique and maybe forgotten pieces of history to be found digitally regardless of location, Convenience for users to view these museums, anytime and anywhere
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://amuze.vercel.app/" target="_blank">
						https://amuze.vercel.app/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Online website, Web3 (Metamask needed)</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>
						Next.js, TailwindCSS, Solidity, Etherscan, Alchemy, Node.js, Vercel, AWS
					</span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/amuze_01.png" alt="the dex dao" />
				<WorkImage src="/images/works/amuze_02.png" alt="the dex dao" />
			</div>
		</Box>
	</Layout>
);

export default Work;
