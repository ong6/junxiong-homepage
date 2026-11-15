import { Box } from "@chakra-ui/react";
import Layout from "../components/layouts/Articles";
import { PAGE_META } from "../lib/pageMeta";
import Education from "../components/Resume/Education";
import PrintHeader from "../components/Resume/PrintHeader";
import Skills from "../components/Resume/Skills";
import WorkExperience from "../components/Resume/WorkExperience";
import Section from "../components/Section";

const Resume = () => (
	<Layout
		{...PAGE_META["/resume"]}>
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
