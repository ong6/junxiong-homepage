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
		title="The DEX DAO"
		description="The DEX DAO is a token project for decentralized exchange traders, launched with an airdrop to every trader from 2021.">
		<Box>
			<Title>
				The DEX DAO <Badge>Dec 2021 - Jan 2022</Badge>
			</Title>
			<P>
				$DEX was a token experiment for the decentralized-exchange crowd. We
				airdropped it to every wallet that traded on a DEX in 2021 — the
				simplest honest definition of &ldquo;the community&rdquo; we could find.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Twitter</Meta>
					<Link href="https://twitter.com/The_DexDAO" target="_blank" rel="noopener noreferrer">
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

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/dexdao_03.png" alt="The Dex DAO homepage" />
				<WorkImage src="/images/works/dexdao_02.webp" alt="The Dex DAO token dashboard" />
				{/* <WorkImage src="/images/works/dex_01.png" alt="the dex dao" /> */}
			</div>
		</Box>
	</Layout>
);

export default Work;
