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
	<Layout title="Vital Vision">
		<Box>
			<Title>
				Vital Vision <Badge>Jan 2023 - Aug 2023</Badge>
			</Title>
			<P>
				Vital Vision aims to provide cutting edge Virtual Reality Rehab
				solutions tailored for post-stroke patients. Our unique offering
				includes an immersive virtual experience that aids in the recovery
				process, filling in the gap in the transition from hospital to step down
				community care. We have developed an intuitive and interactive dashboard
				that enables medical professionals to monitor patient progress and make
				the relevant adjustments to the rehabilitation process.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link
						href="https://semperstroke-dashboard.vercel.app/landing"
						target="_blank">
						https://semperstroke-dashboard.vercel.app/landing{" "}
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Featured on: </Meta>
					<Link
						href="https://www.instagram.com/p/CxaKYDbBjTK/?img_index=1"
						target="_blank">
						Instagram
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Featured on:</Meta>
					<Link
						href="https://www.comp.nus.edu.sg/news/2023-medical-grand-challenge/"
						target="_blank">
						NUS Official Website
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Platform</Meta>
					<span>Online website, Health Tech, Game - VR</span>
				</ListItem>
				<ListItem>
					<Meta>Stack</Meta>
					<span>
						Next.js, TailwindCSS, Node.js, Vercel, Unity, Oculus Quest 2
					</span>
				</ListItem>
			</List>
			<Heading as="h4" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>
			<div className="space-y-8">
				<WorkImage src="/images/works/vitalvision_02.jpg" alt="Vital Vision" />
			</div>
		</Box>
	</Layout>
);

export default Work;
