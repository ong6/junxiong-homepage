import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Layout from "../components/layouts/Articles";
import {
	Databases,
	ProficientLanguage,
	ToolsAndFramework,
} from "../components/Resume/Icons";
import Education from "../components/Resume/Education";
import Projects from "../components/Resume/Projects";
import WorkExperience from "../components/Resume/WorkExperience";
import Section from "../components/Section";

const Works = () => (
	<Layout title="Resume">
		<Box>
			<Section delay={0.1}>
				<Education />
			</Section>
			<Section delay={0.3}>
				<Technical />
			</Section>
			<Section delay={0.5}>
				<WorkExperience />
			</Section>
			<Section delay={0.7}>
				<Projects />
			</Section>
		</Box>
	</Layout>
);

const Technical = () => {
	return (
		<Box mb={4}>
			<Heading as="h3" variant="section-title" fontSize={24}>
				Technical Proficiency
			</Heading>
			<Box fontSize={18} fontWeight="bold">
				<Text pb={3}>Proficient Languages</Text>
				<ProficientLanguage />
				<Text pb={3}>Tools and Frameworks</Text>
				<ToolsAndFramework />
				<Text pb={3}>Database and Cloud</Text>
				<Databases />
			</Box>
		</Box>
	);
};

export default Works;
