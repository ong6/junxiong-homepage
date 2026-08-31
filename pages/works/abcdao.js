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
		title="ABCDAO"
		description="ABCDAO is a decentralized autonomous organization for NUS Fintech's Blockchain Department, with an ERC20 governance token and on-chain voting.">
		<Box>
			<Title>
				$ABCDao <Badge>Aug 2021 - Dec 2021</Badge>
			</Title>
			<P>
				The NUS Fintech Society’s Blockchain Department has been transformed
				into a DAO with the members calling the shots on all major decisions. We
				even have our own ERC20 governance token called ABCDao and we might be
				airdropping it. We aim to democratize the decision making process and
				remove biases in the university co-curricular activity space.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link
						href="https://nus-fintech-society.github.io/BC_DAO_frontend/#/"
						target="_blank" rel="noopener noreferrer">
						https://nus-fintech-society.github.io/BC_DAO_frontend/#/
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Source</Meta>
					<Link
						href="https://github.com/NUS-Fintech-Society/BC_DAO_frontend"
						target="_blank" rel="noopener noreferrer">
						https://github.com/NUS-Fintech-Society/BC_DAO_frontend
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Presentation</Meta>
					<Link
						href="https://fintechlab.nus.edu.sg/nus-fintech-society-blockchain-department-project-showcase/"
						target="_blank" rel="noopener noreferrer">
						Blockchain DAO Project Showcase
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Web3, Requires MetaMask</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>React, tailwindCSS, Solidity, Javascript, ethers </span>
				</ListItem>
			</List>

			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>

			<div className="space-y-8">
				<WorkImage src="/images/works/abcdao_01.png" alt="ABCDAO governance homepage" />
				<WorkImage src="/images/works/abcdao_02.png" alt="ABCDAO proposal voting interface" />
			</div>
		</Box>
	</Layout>
);

export default Work;
