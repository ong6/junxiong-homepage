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
		title="Vital Vision"
		description="Vital Vision is VR rehabilitation for post-stroke patients, with a dashboard that lets clinicians monitor progress.">
		<Box>
			<Title>
				Vital Vision <Badge>Jan 2023 - Aug 2023</Badge>
			</Title>
			<P>
				VR rehabilitation for post-stroke patients, aimed at the gap between
				hospital discharge and community care, where guided recovery work often
				stops. Patients run their exercises inside an immersive environment;
				clinicians follow progress on a dashboard and adjust the program from
				there.
			</P>
			<List ml={4} my={4}>
				<ListItem>
					<Meta>Website</Meta>
					<Link
						href="https://semperstroke-dashboard.vercel.app/landing"
						target="_blank" rel="noopener noreferrer">
						https://semperstroke-dashboard.vercel.app/landing{" "}
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Featured on: </Meta>
					<Link
						href="https://www.instagram.com/p/CxaKYDbBjTK/?img_index=1"
						target="_blank" rel="noopener noreferrer">
						Instagram
						<ExternalLinkIcon mx="2px" />
					</Link>
				</ListItem>
				<ListItem>
					<Meta>Featured on:</Meta>
					<Link
						href="https://www.comp.nus.edu.sg/news/2023-medical-grand-challenge/"
						target="_blank" rel="noopener noreferrer">
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
			<Heading as="h3" fontSize={16} my={8}>
				<Center>Project Showcase</Center>
			</Heading>
			<div className="space-y-8">
				<WorkImage src="/images/works/vitalvision_02.webp" alt="Vital Vision clinician dashboard" />
			</div>
		</Box>
	</Layout>
);

export default Work;
