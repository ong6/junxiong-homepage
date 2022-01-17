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
	<Layout title="The DEX DAO">
		<Box>
			<Title>
				The DEX DAO <Badge>Dec 2021 - Jan 2022</Badge>
			</Title>
			<P>
				$DEX aims to unify the DEX community, creators and markets to create an
				ecosystem. To gather us together, we have chosen all traders from 2021
				to conduct our airdrop.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://www.thedexdao.com/" target="_blank">
						https://www.thedexdao.com/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Twitter</Meta>
					<Link href="https://twitter.com/The_DexDAO" target="_blank">
						@The_DexDAO
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web3 (Metamask needed)</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>
						Next.js, TailwindCSS, Solidity, Etherscan, Alchemy, Node.js, Vercel
					</span>
				</ListItem>
			</List>

			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/dexdao_03.png" alt="the dex dao" />
				<WorkImage src="/images/works/dexdao_02.png" alt="the dex dao" />
				{/* <WorkImage src="/images/works/dex_01.png" alt="the dex dao" /> */}
			</div>
		</Box>
	</Layout>
);

export default Work;
