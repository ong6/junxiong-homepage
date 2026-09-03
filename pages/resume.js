import { Box } from "@chakra-ui/react";
import Layout from "../components/layouts/Articles";
import Education from "../components/Resume/Education";
import PrintHeader from "../components/Resume/PrintHeader";
import Skills from "../components/Resume/Skills";
import WorkExperience from "../components/Resume/WorkExperience";
import Section from "../components/Section";

const Resume = () => (
	<Layout
		title="Resume"
		description="Ong Jun Xiong is an AI infrastructure and backend engineer at TikTok in Singapore. Experience includes production agent platforms, global e-commerce systems, and founding Compoze.">
		<Box pt={{ base: 10, md: 16 }}>
			<PrintHeader />
			<Section delay={0.05}>
				<WorkExperience />
			</Section>
			<Section delay={0.1}>
				<Skills />
			</Section>
			<Section delay={0.15}>
				<Education />
			</Section>
		</Box>
	</Layout>
);

export default Resume;
