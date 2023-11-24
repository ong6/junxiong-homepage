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
	<Layout title="Amuze">
		<Box>
			<Title>
				A-Muze <Badge>Dec 2021 - Jan 2022</Badge>
			</Title>
			<P>
				First Runner-up at NUS Fintech Month Hackathon 2022 (10k Prize). Amuze
				is a museum experience built with NFT and Blockchain technologies. It
				helps to facilitate collectors to list their historical assets onto the
				blockchain, promoting the culture of ownership. This enables these
				Unique and maybe forgotten pieces of history to be found digitally
				regardless of location, Convenience for users to view these museums,
				anytime and anywhere. I was in charge of the Full-stack development of
				the project.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link href="https://amuze.vercel.app/" target="_blank">
						https://amuze.vercel.app/ <ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Presentation Slides</Meta>
					<Link
						href="	https://docs.google.com/presentation/d/1ELMGX2O2zSgMe_jo-t0f0Val5YJ7-Qlv/edit?usp=sharing&ouid=118156243590926955681&rtpof=true&sd=true"
						target="_blank">
						https://docs.google.com/presentation/d/1ELMGX2O2zSgMe_jo-t0f0Val5YJ7-Qlv/edit?usp=sharing&ouid=118156243590926955681&rtpof=true&sd=true
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Online website, Web3 (Metamask needed)</span>
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
				<WorkImage src="/images/works/amuze_03.png" alt="amuze" />
				<WorkImage src="/images/works/amuze_01.png" alt="amuze" />
				<WorkImage src="/images/works/amuze_02.png" alt="amuze" />
			</div>
		</Box>
	</Layout>
);

export default Work;
